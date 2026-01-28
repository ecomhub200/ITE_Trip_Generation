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
  iteCategories: document.getElementById('ite-categories'),
  currentYear: document.getElementById('current-year')
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

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ite-search-container')) {
      elements.iteResults.classList.remove('active');
    }
  });

  // Initialize ITE reference
  renderIteReference();
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

function renderSearchResults(results) {
  if (results.length === 0) {
    elements.iteResults.innerHTML = `
      <div class="ite-search-item">
        <p class="text-muted">No matching ITE codes found</p>
      </div>
    `;
    elements.iteResults.classList.add('active');
    return;
  }

  const html = results.slice(0, 20).map(item => `
    <div class="ite-search-item" data-code="${item.code}">
      <span class="ite-search-item-code">${item.code}</span> -
      <span class="ite-search-item-name">${item.name}</span>
      <div class="ite-search-item-category">${item.category} | ${item.unit}</div>
    </div>
  `).join('');

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
function handleFormSubmit(e) {
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

  // Get parcel info
  const parcelType = document.getElementById('parcel-type').value;
  const parcelNumber = document.getElementById('parcel-number').value;
  const zoningCode = document.getElementById('zoning-code').value;
  const devName = document.getElementById('dev-name').value;

  // Calculate
  currentResult = calculator.calculate(selectedIteCode, size);
  currentResult.parcelType = parcelType;
  currentResult.parcelNumber = parcelNumber;
  currentResult.zoningCode = zoningCode;
  currentResult.devName = devName;
  currentResult.parcelId = `${parcelType}#${parcelNumber}`;

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
