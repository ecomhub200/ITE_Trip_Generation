/**
 * ITE Trip Generation Calculator
 * Calculation engine for ITE trip generation analysis
 *
 * Based on ITE Trip Generation Manual, 12th Edition
 * Implements decision tree from claude.md instructions
 */

class ITECalculator {
  constructor() {
    this.database = ITE_DATABASE;
    this.thresholds = HENRICO_THRESHOLDS;
  }

  /**
   * Main calculation function
   * @param {string} iteCode - The ITE land use code
   * @param {number} size - The size/quantity of development
   * @returns {object} Complete trip generation analysis
   */
  calculate(iteCode, size) {
    const data = this.database[iteCode];

    if (!data) {
      return {
        success: false,
        error: `ITE Code ${iteCode} not found in database`
      };
    }

    if (!size || size <= 0) {
      return {
        success: false,
        error: "Size must be a positive number"
      };
    }

    // Calculate trips for each time period
    const weekdayResult = this.calculatePeriod(data.weekday, size, "weekday");
    const amPeakResult = this.calculatePeriod(data.am_peak, size, "am_peak", data.am_peak.entering, data.am_peak.exiting);
    const pmPeakResult = this.calculatePeriod(data.pm_peak, size, "pm_peak", data.pm_peak.entering, data.pm_peak.exiting);

    // Determine data quality
    const quality = this.assessDataQuality(data);

    // Check thresholds
    const thresholdCheck = this.checkThresholds(weekdayResult.trips, amPeakResult.trips, pmPeakResult.trips);

    return {
      success: true,
      iteCode: data.code,
      landUseName: data.name,
      category: data.category,
      size: size,
      unit: data.unit,
      source: data.source,
      pageRef: data.page_ref,
      weekday: weekdayResult,
      amPeak: amPeakResult,
      pmPeak: pmPeakResult,
      quality: quality,
      thresholds: thresholdCheck,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate trips for a specific time period
   */
  calculatePeriod(periodData, size, periodType, enteringPct = 50, exitingPct = 50) {
    let trips, method, formula, caution = false;

    // Decision tree from claude.md
    if (periodData.r_squared >= this.thresholds.r_squared_good && periodData.equation) {
      // R² >= 0.75 AND Equation exists: USE Fitted Curve Equation (MOST ACCURATE)
      trips = this.useFittedCurve(periodData.equation, size);
      method = "Fitted Curve Equation";
      formula = this.getFormulaString(periodData.equation, size);
    } else if (periodData.r_squared >= this.thresholds.r_squared_fair && periodData.equation) {
      // R² >= 0.50 AND Equation exists: USE Fitted Curve Equation with caution
      trips = this.useFittedCurve(periodData.equation, size);
      method = "Fitted Curve Equation (with caution)";
      formula = this.getFormulaString(periodData.equation, size);
      caution = true;
    } else if (periodData.rate) {
      // Use Average Rate
      trips = this.useAverageRate(periodData.rate, size);
      method = "Average Rate";
      formula = `${size} x ${periodData.rate} = ${trips.toFixed(2)}`;
    } else {
      // Insufficient data
      return {
        trips: null,
        method: "Insufficient Data",
        formula: null,
        entering: null,
        exiting: null,
        error: "Manual review needed"
      };
    }

    // Round trips (can't have fractional vehicle trips)
    trips = Math.round(trips);

    // Calculate directional splits
    const entering = Math.round(trips * (enteringPct / 100));
    const exiting = Math.round(trips * (exitingPct / 100));

    return {
      trips: trips,
      method: method,
      formula: formula,
      rate: periodData.rate,
      r_squared: periodData.r_squared,
      sample_size: periodData.sample_size,
      entering: entering,
      exiting: exiting,
      enteringPct: enteringPct,
      exitingPct: exitingPct,
      caution: caution
    };
  }

  /**
   * Calculate trips using fitted curve equation
   */
  useFittedCurve(equation, size) {
    if (!equation) return null;

    switch (equation.type) {
      case "linear":
        // T = a*X + b
        return equation.a * size + (equation.b || 0);

      case "log":
        // Ln(T) = a*Ln(X) + b
        // T = e^(a*ln(X) + b) = X^a * e^b
        if (size <= 0) return 0;
        return Math.exp(equation.a * Math.log(size) + equation.b);

      case "polynomial":
        // T = a*X^2 + b*X + c
        return equation.a * Math.pow(size, 2) + equation.b * size + (equation.c || 0);

      default:
        return null;
    }
  }

  /**
   * Calculate trips using average rate
   */
  useAverageRate(rate, size) {
    return rate * size;
  }

  /**
   * Generate formula string for display
   */
  getFormulaString(equation, size) {
    if (!equation) return null;

    switch (equation.type) {
      case "linear":
        const intercept = equation.b ? ` + ${equation.b}` : "";
        const result = equation.a * size + (equation.b || 0);
        return `T = ${equation.a}(${size})${intercept} = ${result.toFixed(2)}`;

      case "log":
        const logResult = Math.exp(equation.a * Math.log(size) + equation.b);
        return `Ln(T) = ${equation.a}*Ln(${size}) + ${equation.b} => T = ${logResult.toFixed(2)}`;

      default:
        return null;
    }
  }

  /**
   * Assess data quality based on sample size and R²
   */
  assessDataQuality(data) {
    const sampleSize = data.weekday.sample_size || 0;
    const rSquared = data.weekday.r_squared || 0;

    let sampleQuality, correlationQuality, confidenceLevel;

    // Sample size assessment
    if (sampleSize >= 30) {
      sampleQuality = "Good";
    } else if (sampleSize >= this.thresholds.sample_size_warning) {
      sampleQuality = "Adequate";
    } else if (sampleSize >= this.thresholds.sample_size_unreliable) {
      sampleQuality = "Low";
    } else {
      sampleQuality = "Very Unreliable";
    }

    // R² assessment
    if (rSquared >= this.thresholds.r_squared_good) {
      correlationQuality = "Good";
    } else if (rSquared >= this.thresholds.r_squared_fair) {
      correlationQuality = "Fair";
    } else if (rSquared >= this.thresholds.r_squared_poor) {
      correlationQuality = "Poor";
    } else if (rSquared > 0) {
      correlationQuality = "No Correlation";
    } else {
      correlationQuality = "N/A";
    }

    // Overall confidence
    if (sampleQuality === "Good" && correlationQuality === "Good") {
      confidenceLevel = "High";
    } else if (sampleQuality === "Very Unreliable" || correlationQuality === "No Correlation") {
      confidenceLevel = "Low";
    } else {
      confidenceLevel = "Medium";
    }

    return {
      sampleSize: sampleSize,
      sampleQuality: sampleQuality,
      rSquared: rSquared,
      correlationQuality: correlationQuality,
      confidenceLevel: confidenceLevel
    };
  }

  /**
   * Check against Henrico County thresholds
   */
  checkThresholds(weekdayTrips, amPeakTrips, pmPeakTrips) {
    const results = {
      peakHourWarning: false,
      dailyWarning: false,
      tiaRequired: false,
      overallStatus: "PASS",
      warnings: [],
      details: []
    };

    // Check AM peak
    if (amPeakTrips > this.thresholds.peak_hour_warning) {
      results.peakHourWarning = true;
      results.warnings.push(`AM Peak Hour (${amPeakTrips}) exceeds ${this.thresholds.peak_hour_warning} trips/hour`);
    }

    // Check PM peak
    if (pmPeakTrips > this.thresholds.peak_hour_warning) {
      results.peakHourWarning = true;
      results.warnings.push(`PM Peak Hour (${pmPeakTrips}) exceeds ${this.thresholds.peak_hour_warning} trips/hour`);
    }

    // Check daily trips
    if (weekdayTrips > this.thresholds.daily_warning) {
      results.dailyWarning = true;
      results.warnings.push(`Weekday Daily (${weekdayTrips}) exceeds ${this.thresholds.daily_warning} trips/day`);
    }

    // Check TIA requirement
    if (weekdayTrips >= this.thresholds.tia_required) {
      results.tiaRequired = true;
      results.warnings.push(`TIA Required: ${weekdayTrips} vpd >= ${this.thresholds.tia_required} vpd threshold`);
    }

    // Set overall status
    if (results.tiaRequired) {
      results.overallStatus = "TIA REQUIRED";
    } else if (results.warnings.length > 0) {
      results.overallStatus = "WARNING";
    }

    // Add threshold details
    results.details = [
      {
        threshold: "Peak Hour Warning",
        value: this.thresholds.peak_hour_warning,
        unit: "trips/hour",
        amPeak: amPeakTrips,
        pmPeak: pmPeakTrips,
        status: results.peakHourWarning ? "EXCEEDED" : "PASS"
      },
      {
        threshold: "Daily Warning",
        value: this.thresholds.daily_warning,
        unit: "trips/day",
        actual: weekdayTrips,
        status: results.dailyWarning ? "EXCEEDED" : "PASS"
      },
      {
        threshold: "TIA Required (County)",
        value: this.thresholds.tia_required,
        unit: "vpd",
        actual: weekdayTrips,
        status: results.tiaRequired ? "REQUIRED" : "NOT REQUIRED"
      },
      {
        threshold: "VDOT Threshold",
        value: this.thresholds.vdot_threshold,
        unit: "vpd",
        actual: weekdayTrips,
        status: weekdayTrips >= this.thresholds.vdot_threshold ? "EXCEEDED" : "PASS"
      }
    ];

    return results;
  }

  /**
   * Search for ITE codes by name or code
   */
  search(query) {
    const results = [];
    const searchTerm = query.toLowerCase();

    for (const [code, data] of Object.entries(this.database)) {
      if (
        code.includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        data.category.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          code: code,
          name: data.name,
          category: data.category,
          unit: data.unit
        });
      }
    }

    return results.sort((a, b) => a.code.localeCompare(b.code));
  }

  /**
   * Get all ITE codes grouped by category
   */
  getByCategory() {
    const grouped = {};

    for (const [category, codes] of Object.entries(ITE_CATEGORIES)) {
      grouped[category] = codes.map(code => ({
        code: code,
        name: this.database[code]?.name || "Unknown",
        unit: this.database[code]?.unit || "Unknown"
      }));
    }

    return grouped;
  }

  /**
   * Get details for a specific ITE code
   */
  getDetails(iteCode) {
    return this.database[iteCode] || null;
  }

  /**
   * Generate executive summary text
   */
  generateExecutiveSummary(result, parcelId) {
    if (!result.success) {
      return `Error: ${result.error}`;
    }

    const unitText = result.unit.toLowerCase().includes("dwelling") ?
      `${result.size} residential units` :
      `${result.size.toLocaleString()} ${result.unit}`;

    const totalIn = Math.round((result.weekday.trips * 50) / 100);
    const totalOut = result.weekday.trips - totalIn;

    let summary = `For ${parcelId}, the following is the approximate number of new trips expected `;
    summary += `by the proposed development of ${unitText}: `;
    summary += `Total Weekday trips = ${result.weekday.trips.toLocaleString()} `;
    summary += `(${totalIn.toLocaleString()} in and ${totalOut.toLocaleString()} out).`;

    if (result.thresholds.warnings.length > 0) {
      summary += `\n\nWARNINGS:\n`;
      result.thresholds.warnings.forEach(warning => {
        summary += `- ${warning}\n`;
      });
    }

    return summary;
  }
}

// Create global calculator instance
const calculator = new ITECalculator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ITECalculator, calculator };
}
