// =====================
// Moving Averages
// =====================
let counterName = localStorage.getItem("symbol");
const maConfigKey = `maConfig_${counterName}`;
let mAConfig = JSON.parse(localStorage.getItem(maConfigKey)) || { name: counterName, averages: [] };
let editingMA = null;

// Action card handler
function showActionCard(ma, div) {
  const card = document.getElementById('action-card');
  const cardWrap = document.getElementById('actioncard-wrap');
  card.style.display = 'flex';
  cardWrap.innerHTML = `
    <button class="card-btn" id="edit-btn">Edit</button>
    <button class="card-btn" id="delete-btn">Delete</button>
    <button id="cardclose-btn">×</button>
  `;
  
  document.getElementById('edit-btn').onclick = () => editMA(ma);
  document.getElementById('delete-btn').onclick = () => deleteMA(ma, div);
  document.getElementById('cardclose-btn').onclick = () => closeCard(div);
}

function handleMAInput(ma = null) {
  editingMA = ma;
  maInputsOn(ma);
  document.getElementById('mai-text').value = ma ? ma.name : '';
  document.getElementById('mai-period').value = ma ? ma.period : '';
  document.getElementById('mai-offset').value = ma ? ma.offset : '';

  document.querySelectorAll('.mai-typeSelection').forEach(el => {
    el.style.cssText = `border: 1px solid rgba(0, 0, 0, 0.2)`;
  });
  if (ma) {
    if (ma.type === 'SMA') smoothMa.style.cssText = `border: 2px solid rgba(0, 0, 0, 0.3)`;
    if (ma.type === 'EMA') expMa.style.cssText = `border: 2px solid rgba(0, 0, 0, 0.3)`;
  }

  document.querySelector('.maicolor-header').style.cssText = ma ? `background: ${ma.color}` : '';
  document.getElementById('mai-submit').onclick = () => {
    const newMA = {
      name: document.getElementById('mai-text').value,
      period: parseFloat(document.getElementById('mai-period').value),
      offset: parseFloat(document.getElementById('mai-offset').value),
      type: document.querySelector('.mai-typeSelection[style*="border: 2px"]').id === 'smoothMa' ? 'SMA' : 'EMA',
      color: document.querySelector('.maicolor-header').style.background,
    };

    if (!mAConfig) mAConfig = { name: counterName, averages: [] };

    const exists = mAConfig.averages.some(ma =>
      ma.name == newMA.name && ma.period == newMA.period && ma.type == newMA.type && ma.color == newMA.color && ma.offset == newMA.offset
    );
    if (exists) {
      alert('Moving average already exists');
    } else {
      if (editingMA) {
        const index = mAConfig.averages.indexOf(editingMA);
        mAConfig.averages[index] = newMA;
      } else {
        mAConfig.averages.push(newMA);
      }
      localStorage.setItem(maConfigKey, JSON.stringify(mAConfig));
      document.getElementById('ma-inputs').style.display = 'none';
      editingMA = null;
      renderObjects();
      drawMovingAverages();
    }
  };
}

function addMA() {
  handleMAInput();
}
  
function editMA(ma) {
  handleMAInput(ma);
  if (editingMA) {
    closeCard();
  }
}

function deleteMA(ma, div) {
  mAConfig.averages = mAConfig.averages.filter(a =>
    a.name !== ma.name || a.period !== ma.period || a.offset !== ma.offset || a.type !== ma.type || a.color !== ma.color
  );
  localStorage.setItem(maConfigKey, JSON.stringify(mAConfig));
  div.remove();
  document.getElementById('action-card').style.display = 'none';
  render();
}
function closeCard(div) {
  document.getElementById('action-card').style.display = 'none';
}

const maiColors = [
  "#FF5733", // Orange
  "#1E90FF", // Dodger Blue
  "#32CD32", // Lime Green
  "#00000", // Midnight Black
  "#8A2BE2", // Blue Violet
  "#FF69B4", // Hot Pink
  "#00CED1", // Turquoise
  "#FFA07A", // Light Salmon
  "#6A5ACD", // Slate Blue
  "#ADFF2F", // Green Yellow
  "#DB7093", // Pale Violet Red
  "#4682B4", // Steel Blue
  "#FF8C00", // Dark Orange
  "#3CB371", // Medium Sea Green
  "#BA55D3", // Medium Orchid
  "#c1ff72"  // Fintala Green
];

function maInputsOn(ma) {
  const maInputBox = document.getElementById('ma-inputs');
  maInputBox.style.display = 'flex';
  maInputBox.innerHTML = `
    <input id='mai-text' type='text' placeholder='Enter Moving Average Name' value='untitled_M.A'></input>
    <input class='mai-period' id='mai-period' type='number' placeholder='Period' value='' min='5' max='2000'></input>
    <span id="periodErrorMsg" style="color: red; display: none;">Value must be between 5 and 2000</span>
    <input class="mai-offset" id="mai-offset" placeholder="Offset" value="" type="number" min="-20" max="20">
    <span id="offsetErrorMsg" style="color: red; display: none;">Value must be between -20 and 20</span>
    <div class='mai-typeSelector'>
      <div id='smoothMa' class='mai-typeSelection'>EMA</div>
      <div id='expMa' class='mai-typeSelection'>SMA</div>
      <div class='mai-typeSelection'></div>
      <div class='mai-typeSelection'></div>
    </div>
    <div class='mai-colorSelector'>
      <div class='maicolor-header'>Pick a color</div>
      <div class='maicolors-box'></div>
    </div>
    <div class="mai-buttons">
      <button class="mai-button" id='mai-cancel'>Cancel</button>
      <button class="mai-button" id='mai-submit'>Submit</button>
    </div
  `;
  
  
  const maTypeSelector = document.querySelectorAll('.mai-typeSelection');
  const selectColor = document.querySelector('.mai-colorSelector');
  const maColorsBox = document.querySelector('.maicolors-box');
  const maColorClone = document.querySelector('.maicolor-header');
  const maPeriodSelector = document.getElementById('mai-period');
  const maOffsetSelector = document.getElementById('mai-offset');
  const periodErrorMsg = document.getElementById('periodErrorMsg');
  const offsetErrorMsg = document.getElementById('offsetErrorMsg');
  const smoothMa = document.getElementById('smoothMa');
  const expMa = document.getElementById('expMa');
  const maiCancel = document.getElementById('mai-cancel');
  
  // Inputing Figures
  maPeriodSelector.addEventListener('input', () => {
    const val = parseFloat(maPeriodSelector.value);
      if (val < 5 || val > 2000) {
        periodErrorMsg.style.display = 'inline';
        offsetErrorMsg.style.display = 'none';
      } else {
        periodErrorMsg.style.display = 'none';
      }
  });
  maOffsetSelector.addEventListener('input', () => {
    const val = parseFloat(maOffsetSelector.value);
      if (val < -20 || val > 20) {
        offsetErrorMsg.style.display = 'inline';
        periodErrorMsg.style.display = 'none';
      } else {
        offsetErrorMsg.style.display = 'none';
      }
  });
  
  //selecting MA type
  maTypeSelector.forEach(typeSelection => {
    typeSelection.addEventListener('click', (e)=>{
      e.stopPropagation();
      maTypeSelector.forEach(typeSelection => {
        typeSelection.style.cssText = `
          border: 1px solid rgba(0, 0, 0, 0.2)`;
      });
    });
  });
  expMa.addEventListener('click', ()=>{
    expMa.style.cssText = `
      border: 2px solid rgba(0, 0, 0, 0.3)`;
  });
  smoothMa.addEventListener('click', ()=>{
    smoothMa.style.cssText = `
      border: 2px solid rgba(0, 0, 0, 0.3)`;
  });
  
  //selecting a color
  selectColor.addEventListener('click', (e)=> {
    e.stopPropagation();
    maColorsBox.style.display = 'grid';
  });
  const maiColorsDiv = document.querySelector('.maicolors-box');
  maiColors.forEach(arrayColor => {
   const arrayColorDiv = document.createElement('div');
    arrayColorDiv.classList.add('array-color');
    arrayColorDiv.style.cssText = `
      background: ${arrayColor};
    `;
    arrayColorDiv.addEventListener('click', (e)=> {
      e.stopPropagation();
      maColorClone.style.cssText = `
        background: ${arrayColor};
      `;
      setTimeout(()=>{
        maColorsBox.style.display = 'none';
      }, 100);
    });
    maiColorsDiv.appendChild(arrayColorDiv);
  });
  
  // closing the input card
  maiCancel.addEventListener('click', (e)=>{
    e.stopPropagation();
    maInputBox.style.display = 'none';
  });
};

let startingIndex = 0;
mAConfig = JSON.parse(localStorage.getItem(maConfigKey)) || { averages: [] };
let averageParameters = mAConfig.averages;
const averagesList = document.getElementById('ma-wrap');
function renderObjects() {
  mAConfig.averages.forEach(average => {
    const div = document.createElement('div');
    div.classList.add('average');
    div.innerHTML = `
      <div class="average-name">${average.name}</div>
      <div class="average-pd">${average.period}</div>
      <div class="average-type">${average.type}</div>
      <div class="average-clr" style="background: ${average.color};"></div>
    `;
    averagesList.appendChild(div);
    div.onclick = () => showActionCard(average, div);
  });
}
renderObjects();

// -------------------------
//  Drawing Moving Averages
// -------------------------
function drawMovingAverages() {
  // Drawing MAs
  const width = screenWidth;
  const height = screenHeight;
  const dates = data.map(d => d.date);
  startingIndex = Math.max(0, Math.min(startingIndex, data.length - visibleCount));
  visibleCount = 55;
  const visibleData = data.slice(startingIndex, startingIndex + visibleCount);

  const maX = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);

  const minY = d3.min(visibleData, d => d.low);
  const maxY = d3.max(visibleData, d => d.high);
  const padding = (maxY - minY) * 0.1; // 10% padding
  
  const maY = d3.scaleLinear()
    .domain([minY - padding, maxY + padding])
    .nice()
    .range([height - (margin.bottom + (volumeActive === "on" ? 75 : 15)), margin.top]);

  // Axes
  axisLayer.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .style("opacity", "0")
    .call(d3.axisBottom(maX)
      .tickValues(visibleData.filter((_, i) => i % 5 === 0).map(d => d.date))
      .tickFormat(d3.timeFormat("%d %b '%y")));

  axisLayer.append("g")
    .attr("transform", `translate(${width - margin.right},0)`)
    .style("opacity", "0")
    .call(d3.axisRight(maY)
      .tickFormat(d => d3.format(".2f")(d)));

  // Calculate & draw MAs
  averageParameters.forEach((params, i) => {
  const maValues = calculateMA(data, params.period, params.type);
  const maData = visibleData.map((d, idx) => ({
    date: d.date,
    value: maValues[startIndex + idx]
  })).filter(d => d.value !== null); // Remove nulls

    const maLine = d3.line()
      .x(d => maX(d.date))
      .y(d => maY(d.value))
      .curve(d3.curveLinear);

    candleLayer.append("path")
      .datum(maData)
      .attr("fill", "none")
      .attr("stroke", params.color)
      .attr("stroke-width", 1.3)
      .attr("d", maLine);
  });
}

function calculateMA(data, period, type) {
  const maValues = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      maValues.push(null);
      continue;
    }
    const slice = data.slice(i - period + 1, i + 1).map(d => d.close);
    if (type === 'SMA') {
      maValues.push(d3.mean(slice));
    } else if (type === 'EMA') {
      const prevEMA = maValues[i-1] || d3.mean(slice);
      const multiplier = 2 / (period + 1);
      maValues.push((data[i].close * multiplier) + (prevEMA * (1 - multiplier)));
    }
  }
  return maValues;
}
