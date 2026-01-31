/**
 * ITE Trip Generation Tool - UI Controller
 * Handles all user interface interactions
 */

// Global state
let currentResult = null;
let selectedIteCode = null;

// DOM Elements
const elements = {
  form: document.getElementById('trip-form'),
  iteSearch: document.getElementById('ite-search'),
  iteResults: document.getElementById('ite-results'),
  iteCode: document.getElementById('ite-code'),
  iteSelected: document.getElementById('ite-selected'),
  sizeInput: document.getElementById('size'),
  unitDisplay: document.getElementById('unit-display'),
  calculateBtn: document.getElementById('calculate-btn'),
  clearBtn: document.getElementById('clear-btn'),
  // Mode selection checkboxes
  modeVehicle: document.getElementById('mode-vehicle'),
  modePerson: document.getElementById('mode-person'),
  modeWalk: document.getElementById('mode-walk'),
  modeBicycle: document.getElementById('mode-bicycle'),
  modeTransit: document.getElementById('mode-transit'),
  modeHelper: document.getElementById('mode-helper'),
  resultsSection: document.getElementById('results-section'),
  resultsSubtitle: document.getElementById('results-subtitle'),
  thresholdStatus: document.getElementById('threshold-status'),
  resultsSummary: document.getElementById('results-summary'),
  tripDetails: document.getElementById('trip-details'),
  executiveSummaryText: document.getElementById('executive-summary-text'),
  qualityGrid: document.getElementById('quality-grid'),
  thresholdTbody: document.getElementById('threshold-tbody'),
  calculationDetails: document.getElementById('calculation-details'),
  exportExcelBtn: document.getElementById('export-excel-btn'),
  printBtn: document.getElementById('print-btn'),
  newAnalysisBtn: document.getElementById('new-analysis-btn'),
  toggleReference: document.getElementById('toggle-reference'),
  iteReference: document.getElementById('ite-reference'),
  browseAllBtn: document.getElementById('browse-all-btn'),
  iteCategories: document.getElementById('ite-categories'),
  currentYear: document.getElementById('current-year'),
  // Storage-related elements
  saveAnalysisBtn: document.getElementById('save-analysis-btn'),
  savedCount: document.getElementById('saved-count'),
  toggleSaved: document.getElementById('toggle-saved'),
  clearAllBtn: document.getElementById('clear-all-btn'),
  savedAnalysesContent: document.getElementById('saved-analyses-content'),
  savedAnalysesList: document.getElementById('saved-analyses-list'),
  savedSearch: document.getElementById('saved-search'),
  toast: document.getElementById('toast'),
  dialogOverlay: document.getElementById('dialog-overlay'),
  dialogTitle: document.getElementById('dialog-title'),
  dialogMessage: document.getElementById('dialog-message'),
  dialogCancel: document.getElementById('dialog-cancel'),
  dialogConfirm: document.getElementById('dialog-confirm'),
  // Hourly distribution elements
  hourlyDistributionSection: document.getElementById('hourly-distribution-section'),
  todSourceBadge: document.getElementById('tod-source-badge'),
  todDescription: document.getElementById('tod-description'),
  dayTypeSelector: document.getElementById('day-type-selector'),
  dayTypeSelect: document.getElementById('day-type-select'),
  hourlyChart: document.getElementById('hourly-chart'),
  hourlyTbody: document.getElementById('hourly-tbody'),
  amPeakTime: document.getElementById('am-peak-time'),
  amPeakTrips: document.getElementById('am-peak-trips'),
  amPeakSplit: document.getElementById('am-peak-split'),
  pmPeakTime: document.getElementById('pm-peak-time'),
  pmPeakTrips: document.getElementById('pm-peak-trips'),
  pmPeakSplit: document.getElementById('pm-peak-split'),
  overallPeakTime: document.getElementById('overall-peak-time'),
  overallPeakTrips: document.getElementById('overall-peak-trips'),
  overallPeakSplit: document.getElementById('overall-peak-split')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Set current year
  elements.currentYear.textContent = new Date().getFullYear();

  // Event listeners
  elements.form.addEventListener('submit', handleFormSubmit);
  elements.iteSearch.addEventListener('input', handleIteSearch);
  elements.iteSearch.addEventListener('focus', handleIteSearch);
  elements.clearBtn.addEventListener('click', handleClearForm);
  elements.exportExcelBtn.addEventListener('click', handleExportExcel);
  elements.printBtn.addEventListener('click', handlePrint);
  elements.newAnalysisBtn.addEventListener('click', handleNewAnalysis);
  elements.toggleReference.addEventListener('click', handleToggleReference);
  elements.browseAllBtn.addEventListener('click', handleBrowseAll);

  // Storage event listeners
  elements.saveAnalysisBtn.addEventListener('click', handleSaveAnalysis);
  elements.toggleSaved.addEventListener('click', handleToggleSaved);
  elements.clearAllBtn.addEventListener('click', handleClearAllAnalyses);
  elements.savedSearch.addEventListener('input', handleSavedSearch);
  elements.dialogCancel.addEventListener('click', hideDialog);
  elements.dialogOverlay.addEventListener('click', (e) => {
    if (e.target === elements.dialogOverlay) hideDialog();
  });

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ite-search-container')) {
      elements.iteResults.classList.remove('active');
    }
  });

  // Initialize ITE reference
  renderIteReference();

  // Initialize saved analyses count
  updateSavedCount();

  // Day type selector for hourly distribution
  if (elements.dayTypeSelect) {
    elements.dayTypeSelect.addEventListener('change', handleDayTypeChange);
  }

  // Mode selector change listeners
  initializeModeSelectors();
}

/**
 * Initialize mode selector checkboxes and event listeners
 */
function initializeModeSelectors() {
  const modeCheckboxes = ['modeVehicle', 'modePerson', 'modeWalk', 'modeBicycle', 'modeTransit'];

  modeCheckboxes.forEach(modeKey => {
    if (elements[modeKey]) {
      elements[modeKey].addEventListener('change', updateModeHelper);
    }
  });

  // Ensure vehicle is always checked (it's the primary mode)
  if (elements.modeVehicle) {
    elements.modeVehicle.addEventListener('change', (e) => {
      // Always keep vehicle checked
      if (!e.target.checked) {
        e.target.checked = true;
        showToast('Vehicle mode is always required', 'warning');
      }
    });
  }
}

/**
 * Update mode helper text based on selected modes
 */
function updateModeHelper() {
  const modes = getSelectedModes();
  const modeNames = {
    'vehicle': 'Vehicle',
    'person': 'Person',
    'walk': 'Pedestrian',
    'bicycle': 'Bicycle',
    'transit': 'Transit'
  };

  const selectedNames = modes.map(m => modeNames[m] || m);
  if (elements.modeHelper) {
    if (modes.length === 1) {
      elements.modeHelper.textContent = 'Vehicle mode selected (default). Select additional modes for multi-modal analysis.';
    } else {
      elements.modeHelper.textContent = `Selected modes: ${selectedNames.join(', ')}`;
    }
  }
}

/**
 * Get array of selected mode values
 * @returns {string[]} Array of selected mode strings
 */
function getSelectedModes() {
  const modes = [];
  if (elements.modeVehicle?.checked) modes.push('vehicle');
  if (elements.modePerson?.checked) modes.push('person');
  if (elements.modeWalk?.checked) modes.push('walk');
  if (elements.modeBicycle?.checked) modes.push('bicycle');
  if (elements.modeTransit?.checked) modes.push('transit');
  return modes.length > 0 ? modes : ['vehicle'];
}

/**
 * Handle day type change for hourly distribution
 */
function handleDayTypeChange(e) {
  if (!currentResult || !currentResult.iteCode) return;

  const dayType = e.target.value;
  const distribution = calculator.getHourlyDistribution(
    currentResult.iteCode,
    currentResult.weekday.trips,
    dayType
  );

  renderHourlyDistribution(distribution, currentResult);
}

// ITE Code Search
function handleIteSearch(e) {
  const query = e.target.value.trim();

  if (query.length < 1) {
    elements.iteResults.classList.remove('active');
    return;
  }

  const results = calculator.search(query);
  renderSearchResults(results);
}

// Browse All ITE Codes
function handleBrowseAll() {
  const grouped = calculator.getByCategory();
  renderBrowseAllResults(grouped);
}

function renderBrowseAllResults(grouped) {
  let html = '';

  for (const [category, codes] of Object.entries(grouped)) {
    html += `<div class="ite-search-category-header">${category}</div>`;
    html += codes.map(item => `
      <div class="ite-search-item" data-code="${item.code}">
        <div class="ite-search-item-main">
          <span class="ite-search-item-code">${item.code}</span>
          <span class="ite-search-item-name">${item.name}</span>
        </div>
        <div class="ite-search-item-meta">
          <span class="ite-search-item-unit">${item.unit}</span>
        </div>
      </div>
    `).join('');
  }

  elements.iteResults.innerHTML = html;
  elements.iteResults.classList.add('active');

  // Add click handlers
  elements.iteResults.querySelectorAll('.ite-search-item[data-code]').forEach(item => {
    item.addEventListener('click', () => selectIteCode(item.dataset.code));
  });

  // Focus on search input for filtering
  elements.iteSearch.focus();
}

function renderSearchResults(results) {
  if (results.length === 0) {
    elements.iteResults.innerHTML = `
      <div class="ite-search-item ite-search-empty">
        <p class="text-muted">No matching ITE codes found</p>
      </div>
    `;
    elements.iteResults.classList.add('active');
    return;
  }

  // Group results by category
  const grouped = {};
  const limitedResults = results.slice(0, 25);

  limitedResults.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });

  // Build HTML with category headers
  let html = '';
  for (const [category, items] of Object.entries(grouped)) {
    html += `<div class="ite-search-category-header">${category}</div>`;
    html += items.map(item => `
      <div class="ite-search-item" data-code="${item.code}">
        <div class="ite-search-item-main">
          <span class="ite-search-item-code">${item.code}</span>
          <span class="ite-search-item-name">${item.name}</span>
        </div>
        <div class="ite-search-item-meta">
          <span class="ite-search-item-unit">${item.unit}</span>
        </div>
      </div>
    `).join('');
  }

  elements.iteResults.innerHTML = html;
  elements.iteResults.classList.add('active');

  // Add click handlers
  elements.iteResults.querySelectorAll('.ite-search-item[data-code]').forEach(item => {
    item.addEventListener('click', () => selectIteCode(item.dataset.code));
  });
}

function selectIteCode(code) {
  const data = calculator.getDetails(code);
  if (!data) return;

  selectedIteCode = code;
  elements.iteCode.value = code;
  elements.iteSearch.value = `${code} - ${data.name}`;
  elements.iteSelected.innerHTML = `
    <strong class="text-primary">Selected:</strong>
    ${code} - ${data.name}
    <span class="badge badge-info">${data.category}</span>
  `;

  // Update unit display
  elements.unitDisplay.innerHTML = `<option value="${data.unit}">${data.unit}</option>`;
  elements.unitDisplay.disabled = true;

  elements.iteResults.classList.remove('active');
  elements.sizeInput.focus();
}

// Form Handling
async function handleFormSubmit(e) {
  e.preventDefault();

  if (!selectedIteCode) {
    alert('Please select an ITE land use code');
    elements.iteSearch.focus();
    return;
  }

  const size = parseFloat(elements.sizeInput.value);
  if (!size || size <= 0) {
    alert('Please enter a valid development size');
    elements.sizeInput.focus();
    return;
  }

  // Wait for time-of-day data to load (fixes race condition)
  if (!calculator.isDataLoaded()) {
    elements.calculateBtn.textContent = 'Loading data...';
    elements.calculateBtn.disabled = true;
    await calculator.waitForData();
    elements.calculateBtn.textContent = 'Generate Trip Analysis';
    elements.calculateBtn.disabled = false;
  }

  // Get parcel info
  const parcelType = document.getElementById('parcel-type').value;
  const parcelNumber = document.getElementById('parcel-number').value;
  const devName = document.getElementById('dev-name').value;

  // Get selected modes
  const selectedModes = getSelectedModes();

  // Calculate with modes
  currentResult = calculator.calculate(selectedIteCode, size, selectedModes);
  currentResult.parcelType = parcelType;
  currentResult.parcelNumber = parcelNumber;
  currentResult.devName = devName;
  currentResult.parcelId = `${parcelType}#${parcelNumber}`;

  // Reset day type selector to weekday for new calculation
  if (elements.dayTypeSelect) {
    elements.dayTypeSelect.value = 'weekday';
  }

  // Render results
  renderResults(currentResult);

  // Show results section
  elements.resultsSection.classList.add('active');
  elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function handleClearForm() {
  elements.form.reset();
  selectedIteCode = null;
  elements.iteCode.value = '';
  elements.iteSelected.innerHTML = 'No ITE code selected';
  elements.unitDisplay.innerHTML = '<option value="">Select ITE code first</option>';
  elements.resultsSection.classList.remove('active');
  currentResult = null;
}

function handleNewAnalysis() {
  handleClearForm();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Results
function renderResults(result) {
  if (!result.success) {
    alert(`Error: ${result.error}`);
    return;
  }

  // Subtitle
  elements.resultsSubtitle.textContent =
    `${result.parcelId} | ${result.landUseName} | ${result.size.toLocaleString()} ${result.unit}`;

  // Threshold Status Box
  renderThresholdStatus(result.thresholds);

  // Summary Stats
  renderSummaryStats(result);

  // Trip Details
  renderTripDetails(result);

  // Executive Summary
  const parcelId = result.parcelId;
  elements.executiveSummaryText.innerHTML = formatExecutiveSummary(result, parcelId);

  // Quality Grid
  renderQualityGrid(result.quality);

  // Threshold Table
  renderThresholdTable(result.thresholds.details);

  // Calculation Details
  renderCalculationDetails(result);

  // Modal Results (if multi-modal analysis)
  renderModalResults(result);

  // Hourly Distribution (Enhanced Accuracy)
  renderHourlyDistributionSection(result);
}

function renderThresholdStatus(thresholds) {
  let statusClass, statusIcon, statusTitle, statusMessage;

  if (thresholds.overallStatus === 'TIA REQUIRED') {
    statusClass = 'status-box-danger';
    statusIcon = '!';
    statusTitle = 'TIA REQUIRED';
    statusMessage = 'This development exceeds the Traffic Impact Analysis threshold';
  } else if (thresholds.overallStatus === 'WARNING') {
    statusClass = 'status-box-warning';
    statusIcon = '!';
    statusTitle = 'WARNING';
    statusMessage = 'This development exceeds one or more warning thresholds';
  } else {
    statusClass = 'status-box-pass';
    statusIcon = 'OK';
    statusTitle = 'PASS';
    statusMessage = 'This development is within all threshold limits';
  }

  elements.thresholdStatus.innerHTML = `
    <div class="status-box ${statusClass} fade-in">
      <div class="status-icon">${statusIcon}</div>
      <h3 class="status-title">${statusTitle}</h3>
      <p>${statusMessage}</p>
    </div>
  `;
}

function renderSummaryStats(result) {
  elements.resultsSummary.innerHTML = `
    <div class="summary-stat fade-in">
      <div class="summary-stat-value">${result.weekday.trips.toLocaleString()}</div>
      <div class="summary-stat-label">Weekday Daily Trips</div>
    </div>
    <div class="summary-stat fade-in">
      <div class="summary-stat-value">${result.amPeak.trips.toLocaleString()}</div>
      <div class="summary-stat-label">AM Peak Hour Trips</div>
    </div>
    <div class="summary-stat fade-in">
      <div class="summary-stat-value">${result.pmPeak.trips.toLocaleString()}</div>
      <div class="summary-stat-label">PM Peak Hour Trips</div>
    </div>
    <div class="summary-stat fade-in">
      <div class="summary-stat-value">${result.quality.confidenceLevel}</div>
      <div class="summary-stat-label">Confidence Level</div>
    </div>
  `;
}

function renderTripDetails(result) {
  elements.tripDetails.innerHTML = `
    <div class="trip-card fade-in">
      <div class="trip-card-header">
        <span class="trip-card-title">Weekday Daily</span>
        <span class="badge badge-info">${result.weekday.method}</span>
      </div>
      <div class="trip-card-value">${result.weekday.trips.toLocaleString()} trips</div>
      <div class="method-display">
        <div class="method-label">Calculation</div>
        ${result.weekday.formula}
      </div>
    </div>

    <div class="trip-card fade-in">
      <div class="trip-card-header">
        <span class="trip-card-title">AM Peak Hour</span>
        <span class="badge badge-info">${result.amPeak.method}</span>
      </div>
      <div class="trip-card-value">${result.amPeak.trips.toLocaleString()} trips</div>
      <div class="trip-card-breakdown">
        <span class="trip-entering">Entering: ${result.amPeak.entering} (${result.amPeak.enteringPct}%)</span>
        <span class="trip-exiting">Exiting: ${result.amPeak.exiting} (${result.amPeak.exitingPct}%)</span>
      </div>
    </div>

    <div class="trip-card fade-in">
      <div class="trip-card-header">
        <span class="trip-card-title">PM Peak Hour</span>
        <span class="badge badge-info">${result.pmPeak.method}</span>
      </div>
      <div class="trip-card-value">${result.pmPeak.trips.toLocaleString()} trips</div>
      <div class="trip-card-breakdown">
        <span class="trip-entering">Entering: ${result.pmPeak.entering} (${result.pmPeak.enteringPct}%)</span>
        <span class="trip-exiting">Exiting: ${result.pmPeak.exiting} (${result.pmPeak.exitingPct}%)</span>
      </div>
    </div>
  `;
}

function formatExecutiveSummary(result, parcelId) {
  const unitText = result.unit.toLowerCase().includes('dwelling') ||
                   result.unit.toLowerCase().includes('unit') ?
    `<strong>${result.size.toLocaleString()} residential units</strong>` :
    `<strong>${result.size.toLocaleString()} ${result.unit}</strong>`;

  const totalIn = Math.round(result.weekday.trips / 2);
  const totalOut = result.weekday.trips - totalIn;

  let html = `For <strong>${parcelId}</strong>, the following is the approximate number of new trips expected `;
  html += `by the proposed development of ${unitText}: `;
  html += `Total Weekday trips = <strong>${result.weekday.trips.toLocaleString()}</strong> `;
  html += `(<strong>${totalIn.toLocaleString()} in</strong> and <strong>${totalOut.toLocaleString()} out</strong>).`;

  if (result.devName) {
    html = `Development: <strong>${result.devName}</strong><br><br>` + html;
  }

  return html;
}

function renderQualityGrid(quality) {
  const rSquaredClass = quality.correlationQuality === 'Good' ? 'text-success' :
                        quality.correlationQuality === 'Fair' ? 'text-warning' : 'text-danger';
  const sampleClass = quality.sampleQuality === 'Good' || quality.sampleQuality === 'Adequate' ? 'text-success' :
                      quality.sampleQuality === 'Low' ? 'text-warning' : 'text-danger';
  const confidenceClass = quality.confidenceLevel === 'High' ? 'text-success' :
                          quality.confidenceLevel === 'Medium' ? 'text-warning' : 'text-danger';

  elements.qualityGrid.innerHTML = `
    <div class="quality-item fade-in">
      <div class="quality-label">Sample Size</div>
      <div class="quality-value ${sampleClass}">${quality.sampleSize} sites</div>
      <div class="text-muted">${quality.sampleQuality}</div>
    </div>
    <div class="quality-item fade-in">
      <div class="quality-label">R-Squared</div>
      <div class="quality-value ${rSquaredClass}">${quality.rSquared ? quality.rSquared.toFixed(2) : 'N/A'}</div>
      <div class="text-muted">${quality.correlationQuality}</div>
    </div>
    <div class="quality-item fade-in">
      <div class="quality-label">Confidence</div>
      <div class="quality-value ${confidenceClass}">${quality.confidenceLevel}</div>
    </div>
    <div class="quality-item fade-in">
      <div class="quality-label">Data Source</div>
      <div class="quality-value">ITE 12th Ed</div>
    </div>
  `;
}

function renderThresholdTable(details) {
  elements.thresholdTbody.innerHTML = details.map(d => {
    const statusClass = d.status === 'PASS' || d.status === 'NOT REQUIRED' ? 'text-success' :
                        d.status === 'EXCEEDED' || d.status === 'REQUIRED' ? 'text-danger' : 'text-warning';
    const badgeClass = d.status === 'PASS' || d.status === 'NOT REQUIRED' ? 'badge-success' :
                       d.status === 'EXCEEDED' || d.status === 'REQUIRED' ? 'badge-danger' : 'badge-warning';

    let actualValue = d.actual !== undefined ? d.actual.toLocaleString() :
                      `AM: ${d.amPeak}, PM: ${d.pmPeak}`;

    return `
      <tr>
        <td>${d.threshold}</td>
        <td>${d.value.toLocaleString()} ${d.unit}</td>
        <td>${actualValue}</td>
        <td><span class="badge ${badgeClass}">${d.status}</span></td>
      </tr>
    `;
  }).join('');
}

function renderCalculationDetails(result) {
  elements.calculationDetails.innerHTML = `
    <div class="info-box mb-2">
      <div class="info-box-icon">i</div>
      <div class="info-box-content">
        <strong>ITE Code:</strong> ${result.iteCode} - ${result.landUseName}<br>
        <strong>Category:</strong> ${result.category}<br>
        <strong>Size:</strong> ${result.size.toLocaleString()} ${result.unit}<br>
        <strong>Location Type:</strong> Suburban (Henrico County Default)<br>
        <strong>Page Reference:</strong> ${result.pageRef}
      </div>
    </div>

    <div class="method-display">
      <div class="method-label">Weekday Daily Calculation</div>
      <strong>Method:</strong> ${result.weekday.method}<br>
      <strong>Rate:</strong> ${result.weekday.rate} trips/${result.unit}<br>
      <strong>R-Squared:</strong> ${result.weekday.r_squared || 'N/A'}<br>
      <strong>Formula:</strong> ${result.weekday.formula}
      ${result.weekday.caution ? '<br><span class="text-warning"><strong>Note:</strong> Use with caution (R² between 0.50-0.75)</span>' : ''}
    </div>

    <div class="method-display mt-2">
      <div class="method-label">AM Peak Hour Calculation</div>
      <strong>Method:</strong> ${result.amPeak.method}<br>
      <strong>Rate:</strong> ${result.amPeak.rate} trips/${result.unit}<br>
      <strong>Directional Split:</strong> ${result.amPeak.enteringPct}% entering, ${result.amPeak.exitingPct}% exiting
    </div>

    <div class="method-display mt-2">
      <div class="method-label">PM Peak Hour Calculation</div>
      <strong>Method:</strong> ${result.pmPeak.method}<br>
      <strong>Rate:</strong> ${result.pmPeak.rate} trips/${result.unit}<br>
      <strong>Directional Split:</strong> ${result.pmPeak.enteringPct}% entering, ${result.pmPeak.exitingPct}% exiting
    </div>
  `;
}

/**
 * Render modal results section for multi-modal analysis
 * @param {object} result - Calculation result
 */
function renderModalResults(result) {
  // Find or create modal results container
  let modalContainer = document.getElementById('modal-results-section');
  if (!modalContainer) {
    // Create the section if it doesn't exist
    const calculationDetails = document.getElementById('calculation-details');
    if (calculationDetails) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'modal-results-section';
      modalContainer.className = 'mt-4';
      calculationDetails.parentNode.insertBefore(modalContainer, calculationDetails.nextSibling);
    } else {
      return; // Can't render without container
    }
  }

  // Check if multi-modal analysis was requested
  if (!result.modalResults || !result.selectedModes || result.selectedModes.length <= 1) {
    modalContainer.innerHTML = '';
    modalContainer.style.display = 'none';
    return;
  }

  modalContainer.style.display = 'block';

  const modeNames = {
    'vehicle': 'Vehicle Trips',
    'person': 'Person Trips',
    'walk': 'Pedestrian Trips',
    'bicycle': 'Bicycle Trips',
    'transit': 'Transit Trips'
  };

  const modeIcons = {
    'vehicle': '&#128663;',
    'person': '&#128694;',
    'walk': '&#128694;',
    'bicycle': '&#128690;',
    'transit': '&#128652;'
  };

  const modeSources = {
    'vehicle': '11th Ed',
    'person': '12th Ed',
    'walk': '12th Ed',
    'bicycle': '12th Ed',
    'transit': '12th Ed'
  };

  let html = `<h3>Multi-Modal Trip Analysis</h3>`;
  html += `<p class="text-muted mb-2">Comparing trip generation across selected transportation modes.</p>`;
  html += `<div class="modal-results-grid">`;

  for (const mode of result.selectedModes) {
    const modeResult = result.modalResults[mode];
    const modeName = modeNames[mode] || mode;
    const modeIcon = modeIcons[mode] || '';
    const modeSource = modeSources[mode] || '';

    if (!modeResult || !modeResult.available) {
      html += `
        <div class="modal-result-card modal-unavailable fade-in">
          <div class="modal-result-header">
            <span class="modal-icon">${modeIcon}</span>
            <span class="modal-name">${modeName}</span>
            <span class="badge badge-secondary">${modeSource}</span>
          </div>
          <div class="modal-result-body">
            <p class="text-muted">No data available for this land use code</p>
          </div>
        </div>
      `;
      continue;
    }

    // Get trip values (use weekday if available, otherwise AM/PM peak)
    const weekdayTrips = modeResult.weekday?.trips ?? 'N/A';
    const amPeakTrips = modeResult.amPeak?.trips ?? 'N/A';
    const pmPeakTrips = modeResult.pmPeak?.trips ?? 'N/A';

    const isPrimary = mode === 'vehicle';

    html += `
      <div class="modal-result-card ${isPrimary ? 'modal-primary' : ''} fade-in">
        <div class="modal-result-header">
          <span class="modal-icon">${modeIcon}</span>
          <span class="modal-name">${modeName}</span>
          <span class="badge ${isPrimary ? 'badge-primary' : 'badge-info'}">${modeSource}</span>
        </div>
        <div class="modal-result-body">
          <div class="modal-stat">
            <div class="modal-stat-label">Weekday Daily</div>
            <div class="modal-stat-value">${typeof weekdayTrips === 'number' ? weekdayTrips.toLocaleString() : weekdayTrips}</div>
          </div>
          <div class="modal-stat">
            <div class="modal-stat-label">AM Peak</div>
            <div class="modal-stat-value">${typeof amPeakTrips === 'number' ? amPeakTrips.toLocaleString() : amPeakTrips}</div>
            ${modeResult.amPeak ? `<div class="modal-stat-split">${modeResult.amPeak.enteringPct}% in / ${modeResult.amPeak.exitingPct}% out</div>` : ''}
          </div>
          <div class="modal-stat">
            <div class="modal-stat-label">PM Peak</div>
            <div class="modal-stat-value">${typeof pmPeakTrips === 'number' ? pmPeakTrips.toLocaleString() : pmPeakTrips}</div>
            ${modeResult.pmPeak ? `<div class="modal-stat-split">${modeResult.pmPeak.enteringPct}% in / ${modeResult.pmPeak.exitingPct}% out</div>` : ''}
          </div>
        </div>
        <div class="modal-result-footer">
          <span class="text-muted">Source: ${modeResult.source || 'ITE Data'}</span>
        </div>
      </div>
    `;
  }

  html += `</div>`;

  // Add mode comparison summary
  if (result.selectedModes.length > 1 && result.modalResults.vehicle?.available) {
    const vehicleTrips = result.modalResults.vehicle.weekday?.trips || 0;
    html += `<div class="info-box mt-2">
      <div class="info-box-icon">i</div>
      <div class="info-box-content">
        <strong>Note:</strong> Vehicle trips (${vehicleTrips.toLocaleString()} daily) are the primary metric for traffic impact analysis.
        Modal data from ITE 12th Edition provides additional context for multi-modal planning and transportation demand management.
      </div>
    </div>`;
  }

  modalContainer.innerHTML = html;
}

// Export and Print
function handleExportExcel() {
  if (!currentResult) {
    alert('Please generate an analysis first');
    return;
  }

  exportToExcel(currentResult);
}

function handlePrint() {
  window.print();
}

// ITE Reference Toggle
function handleToggleReference() {
  const isHidden = elements.iteReference.classList.contains('hidden');
  elements.iteReference.classList.toggle('hidden');
  elements.toggleReference.textContent = isHidden ? 'Hide All Codes' : 'Show All Codes';
}

function renderIteReference() {
  const categories = calculator.getByCategory();
  let html = '';

  for (const [category, codes] of Object.entries(categories)) {
    html += `
      <div class="mb-3">
        <h4 class="mb-1">${category}</h4>
        <div class="table-wrapper">
          <table class="table table-compact">
            <thead>
              <tr>
                <th>Code</th>
                <th>Land Use</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${codes.map(c => `
                <tr>
                  <td><strong>${c.code}</strong></td>
                  <td>${c.name}</td>
                  <td>${c.unit}</td>
                  <td>
                    <button type="button" class="btn btn-sm btn-outline"
                            onclick="selectIteCode('${c.code}'); handleToggleReference();">
                      Select
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  elements.iteCategories.innerHTML = html;
}

// ============================================
// Storage Functions
// ============================================

/**
 * Save current analysis to IndexedDB
 */
async function handleSaveAnalysis() {
  if (!currentResult) {
    showToast('Please generate an analysis first', 'warning');
    return;
  }

  try {
    const id = await ITEStorage.saveAnalysis(currentResult);
    showToast('Analysis saved successfully!', 'success');
    updateSavedCount();

    // If saved analyses section is visible, refresh it
    if (!elements.savedAnalysesContent.classList.contains('hidden')) {
      renderSavedAnalyses();
    }
  } catch (error) {
    console.error('Error saving analysis:', error);
    showToast('Failed to save analysis', 'error');
  }
}

/**
 * Toggle saved analyses section visibility
 */
async function handleToggleSaved() {
  const isHidden = elements.savedAnalysesContent.classList.contains('hidden');

  if (isHidden) {
    elements.savedAnalysesContent.classList.remove('hidden');
    elements.toggleSaved.textContent = 'Hide Saved';
    elements.clearAllBtn.classList.remove('hidden');
    await renderSavedAnalyses();
  } else {
    elements.savedAnalysesContent.classList.add('hidden');
    elements.toggleSaved.textContent = 'Show Saved';
    elements.clearAllBtn.classList.add('hidden');
  }
}

/**
 * Search saved analyses
 */
async function handleSavedSearch(e) {
  const query = e.target.value.trim();

  if (query.length === 0) {
    await renderSavedAnalyses();
    return;
  }

  try {
    const results = await ITEStorage.searchAnalyses(query);
    renderSavedAnalysesList(results);
  } catch (error) {
    console.error('Error searching analyses:', error);
  }
}

/**
 * Clear all saved analyses with confirmation
 */
function handleClearAllAnalyses() {
  showDialog(
    'Clear All Analyses',
    'Are you sure you want to delete all saved analyses? This action cannot be undone.',
    async () => {
      try {
        await ITEStorage.clearAllAnalyses();
        showToast('All analyses cleared', 'success');
        updateSavedCount();
        renderSavedAnalyses();
      } catch (error) {
        console.error('Error clearing analyses:', error);
        showToast('Failed to clear analyses', 'error');
      }
    }
  );
}

/**
 * Delete a single analysis
 * @param {number} id - Analysis ID to delete
 */
function handleDeleteAnalysis(id) {
  showDialog(
    'Delete Analysis',
    'Are you sure you want to delete this analysis?',
    async () => {
      try {
        await ITEStorage.deleteAnalysis(id);
        showToast('Analysis deleted', 'success');
        updateSavedCount();
        renderSavedAnalyses();
      } catch (error) {
        console.error('Error deleting analysis:', error);
        showToast('Failed to delete analysis', 'error');
      }
    }
  );
}

/**
 * Load a saved analysis
 * @param {number} id - Analysis ID to load
 */
async function handleLoadAnalysis(id) {
  try {
    const analysis = await ITEStorage.getAnalysis(id);
    if (!analysis) {
      showToast('Analysis not found', 'error');
      return;
    }

    // Populate form fields
    document.getElementById('parcel-type').value = analysis.parcelType || 'REZ';
    document.getElementById('parcel-number').value = analysis.parcelNumber || '';
    document.getElementById('dev-name').value = analysis.devName || '';

    // Set ITE code
    if (analysis.iteCode) {
      selectIteCode(analysis.iteCode);
    }

    // Set size
    elements.sizeInput.value = analysis.size || '';

    // Set current result and render
    currentResult = analysis;
    renderResults(currentResult);

    // Show results section
    elements.resultsSection.classList.add('active');

    // Scroll to results
    elements.resultsSection.scrollIntoView({ behavior: 'smooth' });

    showToast('Analysis loaded', 'success');
  } catch (error) {
    console.error('Error loading analysis:', error);
    showToast('Failed to load analysis', 'error');
  }
}

/**
 * Render saved analyses list
 */
async function renderSavedAnalyses() {
  try {
    const analyses = await ITEStorage.getAllAnalyses();
    renderSavedAnalysesList(analyses);
  } catch (error) {
    console.error('Error rendering saved analyses:', error);
    elements.savedAnalysesList.innerHTML = `
      <div class="empty-state">
        <p class="text-danger">Error loading saved analyses</p>
      </div>
    `;
  }
}

/**
 * Render the list of saved analyses
 * @param {Array} analyses - Array of analysis objects
 */
function renderSavedAnalysesList(analyses) {
  if (!analyses || analyses.length === 0) {
    elements.savedAnalysesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">&#128451;</div>
        <p>No saved analyses yet</p>
        <p class="text-muted">Run an analysis and click "Save Analysis" to store it here</p>
      </div>
    `;
    return;
  }

  const html = analyses.map(analysis => {
    const statusClass = getStatusClass(analysis.thresholds?.overallStatus);
    const statusText = analysis.thresholds?.overallStatus || 'N/A';

    return `
      <div class="saved-analysis-item fade-in">
        <div class="saved-analysis-info">
          <div class="saved-analysis-title">
            <span>${analysis.parcelId || 'No Parcel ID'}</span>
            <span class="saved-analysis-status ${statusClass}">${statusText}</span>
          </div>
          <div class="saved-analysis-meta">
            <span><strong>ITE:</strong> ${analysis.iteCode} - ${truncateText(analysis.landUseName, 30)}</span>
            <span><strong>Size:</strong> ${analysis.size?.toLocaleString() || 'N/A'} ${analysis.unit || ''}</span>
            <span><strong>Trips:</strong> ${analysis.weekday?.trips?.toLocaleString() || 'N/A'}/day</span>
            <span><strong>Saved:</strong> ${ITEStorage.formatDate(analysis.savedAt)}</span>
          </div>
          ${analysis.devName ? `<div class="text-muted mt-1">${analysis.devName}</div>` : ''}
        </div>
        <div class="saved-analysis-actions">
          <button type="button" class="btn btn-sm btn-primary" onclick="handleLoadAnalysis(${analysis.id})">
            Load
          </button>
          <button type="button" class="btn btn-sm btn-outline" onclick="handleDeleteAnalysis(${analysis.id})">
            Delete
          </button>
        </div>
      </div>
    `;
  }).join('');

  elements.savedAnalysesList.innerHTML = html;
}

/**
 * Update the saved analyses count badge
 */
async function updateSavedCount() {
  try {
    const count = await ITEStorage.getCount();
    elements.savedCount.textContent = `(${count})`;
  } catch (error) {
    console.error('Error getting count:', error);
    elements.savedCount.textContent = '(0)';
  }
}

/**
 * Get CSS class for status badge
 * @param {string} status - Status string
 * @returns {string} CSS class name
 */
function getStatusClass(status) {
  switch (status) {
    case 'PASS':
      return 'pass';
    case 'WARNING':
      return 'warning';
    case 'TIA REQUIRED':
      return 'tia-required';
    default:
      return '';
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// ============================================
// Hourly Distribution Rendering
// ============================================

/**
 * Render the hourly distribution section
 * @param {object} result - The calculation result
 */
function renderHourlyDistributionSection(result) {
  if (!result.hourlyDistribution) return;

  const distribution = result.hourlyDistribution;

  // Update source badge and description
  if (result.hasTimeOfDayData) {
    elements.todSourceBadge.textContent = 'ITE Data';
    elements.todSourceBadge.className = 'badge badge-success';
    elements.todDescription.innerHTML = `
      Hourly breakdown based on <strong>ITE Time-of-Day data</strong> from ${distribution.dataSites || 'N/A'} study sites.
      This provides more accurate traffic analysis than simple peak hour estimates.
    `;
  } else {
    elements.todSourceBadge.textContent = 'Default Pattern';
    elements.todSourceBadge.className = 'badge badge-warning';
    elements.todDescription.innerHTML = `
      Using <strong>default suburban pattern</strong> (no ITE time-of-day data available for this land use).
      Consider manual adjustment based on local conditions.
    `;
  }

  // Update day type selector based on available periods
  updateDayTypeSelector(result.availablePeriods);

  // Render the distribution
  renderHourlyDistribution(distribution, result);
}

/**
 * Update day type selector options
 * @param {string[]} availablePeriods - Array of available periods
 */
function updateDayTypeSelector(availablePeriods) {
  if (!elements.dayTypeSelect) return;

  const options = elements.dayTypeSelect.options;
  const periods = availablePeriods || ['weekday'];

  // Enable/disable options based on available data
  for (let i = 0; i < options.length; i++) {
    const value = options[i].value;
    options[i].disabled = !periods.includes(value);
  }

  // Reset to weekday if current selection is not available
  if (!periods.includes(elements.dayTypeSelect.value)) {
    elements.dayTypeSelect.value = 'weekday';
  }

  // Hide selector if only weekday is available
  if (periods.length === 1 && periods[0] === 'weekday') {
    elements.dayTypeSelector.style.display = 'none';
  } else {
    elements.dayTypeSelector.style.display = 'block';
  }
}

/**
 * Render the hourly distribution chart and table
 * @param {object} distribution - Hourly distribution data
 * @param {object} result - Full calculation result
 */
function renderHourlyDistribution(distribution, result) {
  if (!distribution || !distribution.hourly) return;

  // Render bar chart
  renderHourlyChart(distribution);

  // Render peak summary
  renderPeakSummary(distribution);

  // Render hourly table
  renderHourlyTable(distribution);
}

/**
 * Render the hourly bar chart
 * @param {object} distribution - Hourly distribution data
 */
function renderHourlyChart(distribution) {
  if (!elements.hourlyChart) return;

  const hourly = distribution.hourly;
  const maxTrips = Math.max(...hourly.map(h => h.total));
  const chartHeight = 180; // Max bar height in pixels

  const barsHtml = hourly.map(hour => {
    const barHeight = maxTrips > 0 ? (hour.total / maxTrips) * chartHeight : 0;
    const isAmPeak = distribution.amPeak && hour.hour === distribution.amPeak.hour;
    const isPmPeak = distribution.pmPeak && hour.hour === distribution.pmPeak.hour;
    const isPeak = distribution.peakHour && hour.hour === distribution.peakHour.hour;

    let barClass = 'hourly-bar-fill';
    if (isAmPeak) barClass += ' am-peak';
    else if (isPmPeak) barClass += ' pm-peak';
    else if (isPeak) barClass += ' peak-bar';

    const shortTime = getShortTimeLabel(hour.hour);
    const enteringPct = hour.total > 0 ? Math.round((hour.entering / hour.total) * 100) : 50;
    const exitingPct = 100 - enteringPct;

    return `
      <div class="hourly-bar">
        <div class="${barClass}" style="height: ${barHeight}px;"
             title="${hour.time}: ${hour.total} trips">
        </div>
        <div class="hourly-bar-tooltip">
          <strong>${hour.time}</strong><br>
          Total: ${hour.total} trips<br>
          In: ${hour.entering} (${enteringPct}%)<br>
          Out: ${hour.exiting} (${exitingPct}%)
        </div>
        <div class="hourly-bar-label">${shortTime}</div>
      </div>
    `;
  }).join('');

  elements.hourlyChart.innerHTML = barsHtml;
}

/**
 * Get short time label for chart
 * @param {number} hour - Hour (0-23)
 * @returns {string} Short label
 */
function getShortTimeLabel(hour) {
  if (hour === 0) return '12a';
  if (hour < 12) return hour + 'a';
  if (hour === 12) return '12p';
  return (hour - 12) + 'p';
}

/**
 * Render peak hour summary
 * @param {object} distribution - Hourly distribution data
 */
function renderPeakSummary(distribution) {
  // AM Peak
  if (distribution.amPeak) {
    const amPeak = distribution.amPeak;
    const amEnteringPct = amPeak.total > 0 ? Math.round((amPeak.entering / amPeak.total) * 100) : 50;
    elements.amPeakTime.textContent = amPeak.time;
    elements.amPeakTrips.textContent = `${amPeak.total.toLocaleString()} trips`;
    elements.amPeakSplit.textContent = `${amEnteringPct}% in / ${100 - amEnteringPct}% out`;
  }

  // PM Peak
  if (distribution.pmPeak) {
    const pmPeak = distribution.pmPeak;
    const pmEnteringPct = pmPeak.total > 0 ? Math.round((pmPeak.entering / pmPeak.total) * 100) : 50;
    elements.pmPeakTime.textContent = pmPeak.time;
    elements.pmPeakTrips.textContent = `${pmPeak.total.toLocaleString()} trips`;
    elements.pmPeakSplit.textContent = `${pmEnteringPct}% in / ${100 - pmEnteringPct}% out`;
  }

  // Overall Peak
  if (distribution.peakHour) {
    const peak = distribution.peakHour;
    const peakEnteringPct = peak.total > 0 ? Math.round((peak.entering / peak.total) * 100) : 50;
    elements.overallPeakTime.textContent = peak.time;
    elements.overallPeakTrips.textContent = `${peak.total.toLocaleString()} trips`;
    elements.overallPeakSplit.textContent = `${peakEnteringPct}% in / ${100 - peakEnteringPct}% out`;
  }
}

/**
 * Render hourly table
 * @param {object} distribution - Hourly distribution data
 */
function renderHourlyTable(distribution) {
  if (!elements.hourlyTbody) return;

  const hourly = distribution.hourly;
  const totalTrips = distribution.totalTrips || hourly.reduce((sum, h) => sum + h.total, 0);

  const rowsHtml = hourly.map(hour => {
    const isAmPeak = distribution.amPeak && hour.hour === distribution.amPeak.hour;
    const isPmPeak = distribution.pmPeak && hour.hour === distribution.pmPeak.hour;
    const isPeak = distribution.peakHour && hour.hour === distribution.peakHour.hour;

    let rowClass = '';
    if (isAmPeak) rowClass = 'am-peak-row';
    else if (isPmPeak) rowClass = 'pm-peak-row';
    else if (isPeak) rowClass = 'peak-row';

    const pctOfDaily = totalTrips > 0 ? ((hour.total / totalTrips) * 100).toFixed(1) : '0.0';

    return `
      <tr class="${rowClass}">
        <td>${hour.time}</td>
        <td>${hour.total.toLocaleString()}</td>
        <td>${hour.entering.toLocaleString()}</td>
        <td>${hour.exiting.toLocaleString()}</td>
        <td>${pctOfDaily}%</td>
      </tr>
    `;
  }).join('');

  elements.hourlyTbody.innerHTML = rowsHtml;
}

// ============================================
// Toast Notifications
// ============================================

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type: 'success', 'error', 'warning'
 */
function showToast(message, type = 'success') {
  elements.toast.textContent = message;
  elements.toast.className = `toast toast-${type} show`;

  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}

// ============================================
// Confirmation Dialog
// ============================================

let dialogCallback = null;

/**
 * Show a confirmation dialog
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {Function} onConfirm - Callback when confirmed
 */
function showDialog(title, message, onConfirm) {
  elements.dialogTitle.textContent = title;
  elements.dialogMessage.textContent = message;
  dialogCallback = onConfirm;

  elements.dialogOverlay.classList.add('show');

  // Set up confirm handler
  elements.dialogConfirm.onclick = async () => {
    hideDialog();
    if (dialogCallback) {
      await dialogCallback();
    }
  };
}

/**
 * Hide the confirmation dialog
 */
function hideDialog() {
  elements.dialogOverlay.classList.remove('show');
  dialogCallback = null;
}

// ============================================
// Segment Analysis Section
// ============================================

/**
 * Initialize segment analysis UI handlers
 */
function initializeSegmentAnalysis() {
  const analyzeBtn = document.getElementById('analyze-segments-btn');
  const clearMinCrashesBtn = document.getElementById('clear-min-crashes');

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', handleAnalyzeSegments);
  }

  if (clearMinCrashesBtn) {
    clearMinCrashesBtn.addEventListener('click', () => {
      document.getElementById('segment-min-crashes').value = '';
    });
  }
}

/**
 * Handle segment analysis button click
 */
async function handleAnalyzeSegments() {
  const statusDiv = document.getElementById('segment-analysis-status');
  const statusText = document.getElementById('segment-status-text');
  const resultsDiv = document.getElementById('segment-analysis-results');
  const errorDiv = document.getElementById('segment-analysis-error');
  const errorText = document.getElementById('segment-error-text');
  const analyzeBtn = document.getElementById('analyze-segments-btn');

  // Hide previous results/errors
  resultsDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');

  // Show loading status
  statusDiv.classList.remove('hidden');
  statusText.textContent = 'Fetching road network data from OpenStreetMap...';
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyzing...';

  try {
    // Get parameters from form
    const startDate = document.getElementById('segment-start-date').value || null;
    const endDate = document.getElementById('segment-end-date').value || null;
    const minCrashes = parseInt(document.getElementById('segment-min-crashes').value) || 20;
    const rateThreshold = parseFloat(document.getElementById('segment-rate-threshold').value) || 1.5;
    const functionalClass = document.getElementById('segment-functional-class').value || null;

    // Default bounds for Henrico County, Virginia area
    // In production, this would come from user selection or crash data extent
    const bounds = {
      south: 37.45,
      west: -77.65,
      north: 37.70,
      east: -77.30
    };

    statusText.textContent = 'Querying Overpass API for road segments...';

    // Run analysis
    const results = await segmentAnalysis.analyzeOverRepSegments({
      bounds,
      crashData: [], // In production, this would be actual crash data
      minCrashes,
      rateThreshold,
      minSegmentLength: 0.25,
      functionalClass,
      startDate,
      endDate
    });

    statusDiv.classList.add('hidden');

    if (!results.success) {
      throw new Error(results.error || 'Analysis failed');
    }

    // Render results
    renderSegmentAnalysisResults(results);
    resultsDiv.classList.remove('hidden');

  } catch (error) {
    console.error('[SegmentAnalysis] Error:', error);
    statusDiv.classList.add('hidden');
    errorText.textContent = error.message;
    errorDiv.classList.remove('hidden');

  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze Segments';
  }
}

/**
 * Render segment analysis results
 * @param {object} results - Analysis results from segmentAnalysis.analyzeOverRepSegments
 */
function renderSegmentAnalysisResults(results) {
  const summaryDiv = document.getElementById('segment-summary');
  const tbody = document.getElementById('segment-results-tbody');

  // Render summary stats
  summaryDiv.innerHTML = `
    <div class="summary-stat fade-in">
      <div class="summary-stat-value">${results.summary.totalSegments.toLocaleString()}</div>
      <div class="summary-stat-label">Total Segments</div>
    </div>
    <div class="summary-stat fade-in">
      <div class="summary-stat-value">${results.summary.eligibleSegments.toLocaleString()}</div>
      <div class="summary-stat-label">Eligible Segments</div>
    </div>
    <div class="summary-stat fade-in">
      <div class="summary-stat-value">${results.summary.totalMiles}</div>
      <div class="summary-stat-label">Total Miles</div>
    </div>
    <div class="summary-stat fade-in">
      <div class="summary-stat-value ${results.summary.overRepresentedCount > 0 ? 'highlight' : ''}">${results.summary.overRepresentedCount}</div>
      <div class="summary-stat-label">Over-Represented</div>
    </div>
  `;

  // Render results table
  if (results.overRepresentedSegments.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted">
          No over-represented segments found with current parameters.
          Try lowering the rate threshold or minimum crashes value.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = results.overRepresentedSegments.map(segment => {
    const ratioValue = parseFloat(segment.rateRatio);
    const ratioClass = ratioValue >= 2.0 ? 'rate-ratio-high' : ratioValue >= 1.5 ? 'rate-ratio-medium' : '';

    return `
      <tr>
        <td title="${segment.osmId}">${truncateText(segment.name, 40)}</td>
        <td>${segment.functionalClass}</td>
        <td>${segment.length.toFixed(2)}</td>
        <td>${segment.crashes}</td>
        <td>${segment.segmentRate}</td>
        <td>${segment.classRate}</td>
        <td class="${ratioClass}">${segment.rateRatio}x</td>
      </tr>
    `;
  }).join('');
}

// Initialize segment analysis on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeSegmentAnalysis();
});
