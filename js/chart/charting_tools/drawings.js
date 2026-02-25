// =====================
// Moving Averages
// =====================
let counterName = localStorage.getItem("symbol");
const maConfigKey = `maConfig_${counterName}`;
let mAConfig = JSON.parse(localStorage.getItem(maConfigKey)) || { name: counterName, averages: [] };
let editingMA = null;
let acceptableLoad = "Yes";
  setTimeout(()=>{
    acceptableLoad = "No";
  }, 400);

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
        const index = mAConfig.averages.findIndex(a => 
            a.name === editingMA.name && 
            a.period === editingMA.period && 
            a.type === editingMA.type && 
            a.color === editingMA.color && 
            a.offset === editingMA.offset
          );
          mAConfig.averages[index] = newMA;
      } else {
        mAConfig.averages.push(newMA);
      }
      localStorage.setItem(maConfigKey, JSON.stringify(mAConfig));
      document.getElementById('ma-inputs').style.display = 'none';
      editingMA = null;
      document.querySelectorAll('#ma-wrap .average').forEach(el => el.remove());
      renderObjects();
      
      axisLayer.select("rect").remove();
      axisLayer.select("text.close-text").remove();
      root.selectAll(".y-axes").remove();
      root.selectAll(".x-axes").remove();
      chartLayer.selectAll(".volume-body").remove();
      root.selectAll(".volume-line").remove();
      root.selectAll(".volume-rect").remove();
      stealData();
      dataFetch();
    }
  };
};

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
  candleLayer.selectAll(`.ma-ema-${ma.period}`).remove();
  candleLayer.selectAll(`.ma-sma-${ma.period}`).remove();
  document.querySelectorAll('#ma-wrap .average').forEach(el => el.remove());
      renderObjects();
      
  axisLayer.select("rect").remove();
  axisLayer.select("text.close-text").remove();
  root.selectAll(".y-axes").remove();
  root.selectAll(".x-axes").remove();
  chartLayer.selectAll(".volume-body").remove();
  root.selectAll(".volume-line").remove();
  root.selectAll(".volume-rect").remove();
  stealData();
  dataFetch();
}
function closeCard(div) {
  document.getElementById('action-card').style.display = 'none';
}

const maiColors = [
  "#FF5733", // Orange
  "#FF0000", // Red
  "#00FF00", // Lime
  "#000000", // Midnight Black
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#00FFFF", // Cyan (Aqua)
  "#FF00FF", // Magenta
  "#C0C0C0", // Silver
  "#808080", // Gray
  "#800000", // Maroon
  "#808000", // Olive
  "#008000", // Green
  "#800080", // Purple
  "#008080", // Teal
  "#000080"  // Navy
];

function maInputsOn(ma) {
  const maInputBox = document.getElementById('ma-inputs');
  maInputBox.style.display = 'flex';
  maInputBox.innerHTML = `
    <input id='mai-text' type='text' placeholder='Enter Moving Average Name' value='untitled_M.A'></input>
    <input class='mai-period' id='mai-period' type='number' placeholder='Period' value='' min='5' max='2000'></input>
    <span id="periodErrorMsg" style="color: red; display: none;">Value must be between 5 and 2000</span>
    <input class="mai-offset" id="mai-offset" placeholder="Offset" value="0" type="number" min="-20" max="20"></input>
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
      
    axisLayer.select("rect").remove();
    axisLayer.select("text.close-text").remove();
    root.selectAll(".y-axes").remove();
    root.selectAll(".x-axes").remove();
    chartLayer.selectAll(".volume-body").remove();
    root.selectAll(".volume-line").remove();
      root.selectAll(".volume-rect").remove();
    stealData();
    dataFetch();
  });
}

let averageParameters = mAConfig.averages;

function renderObjects() {
  // Drawing Objects
  mAConfig = JSON.parse(localStorage.getItem(maConfigKey)) || { name: counterName, averages: [] };
  const averagesList = document.getElementById('ma-wrap');
  const averagesHead = document.querySelector('.ma-head');
  
  // Removing existing averages
  averagesList.querySelectorAll('.average').forEach(el => el.remove());
  
  mAConfig.averages.forEach(average => {
    const div = document.createElement('div');
    div.classList.add('average');
    div.innerHTML = `
      <div class="average-name">${average.name}</div>
      <div class="average-pd">${average.period}</div>
      <div class="average-type">${average.type}</div>
      <div class="average-clr" style="background: ${average.color};"></div>
    `;
    averagesList.appendChild(div)
    div.onclick = () => showActionCard(average, div);
  });
}
renderObjects();

// -------------------------
//  Drawing Moving Averages
// -------------------------
let maDataCache = null;

function drawMovingAverages() {
  // Drawing MAs
  const width = screenWidth;
  const height = screenHeight;
  const dates = data.map(d => d.date);
  startIndex = Math.max(0, Math.min(startIndex, data.length - visibleCount));
  const visibleData = data.slice(startIndex, startIndex + visibleCount);
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
    .range([height - (margin.bottom + (volumeActive === "on" ? 105 : 50)), margin.top]);

  // Axes
  axisLayer.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .style("display", "none")
    .call(d3.axisBottom(maX)
      .tickValues(visibleData.filter((_, i) => i % 10 === 0).map(d => d.date))
      .tickFormat(d3.timeFormat("%d %b '%y")));
  axisLayer.append("g")
    .attr("transform", `translate(${width - margin.right},0)`)
    .style("opacity", "0")
    .call(d3.axisRight(maY)
      .tickFormat(d => d3.format(".2f")(d)));
  
  maDataCache = calculateMAData();
  const visibleMAData = {
    SMAs: maDataCache.SMAs.map((ma) => ({
      ...ma,
      values: ma.values.slice(Math.max(0, startIndex - ma.period + 1), startIndex + visibleCount),
    })),
    EMAs: maDataCache.EMAs.map((ma) => ({
      ...ma,
      values: ma.values.slice(Math.max(0, startIndex - ma.period + 1), startIndex + visibleCount),
    })),
  };

  // Using visibleMAData to draw the lines
  visibleMAData.SMAs.forEach((ma) => {
    const line = d3.line()
      .x(d => maX(d.date))
      .y(d => maY(d.value))
      .curve(d3.curveLinear);
    candleLayer.selectAll(`.ma-sma-${ma.period}`)
      .data([ma.values])
      .join(
        enter => enter.append("path")
          .attr("class", `ma-sma-${ma.period}`)
          .attr("fill", "none")
          .attr("stroke", ma.color)
          .attr("stroke-width", ma.width),
        update => update,
        exit => exit.remove()
      )
      .attr("d", line);
  });
  
  visibleMAData.EMAs.forEach((ma) => {
    const line = d3.line()
      .x(d => maX(d.date))
      .y(d => maY(d.value))
      .curve(d3.curveLinear);
    candleLayer.selectAll(`.ma-ema-${ma.period}`)
      .data([ma.values])
      .join(
        enter => enter.append("path")
          .attr("class", `ma-ema-${ma.period}`)
          .attr("fill", "none")
          .attr("stroke", ma.color)
          .attr("stroke-width", ma.width),
        update => update,
        exit => exit.remove()
      )
      .attr("d", line);
  });
  
}

function calculateMAData() {
  mAConfig = JSON.parse(localStorage.getItem(maConfigKey)) || { name: counterName, averages: [] };
  const mathData = data.slice(0, data.length);
  const maData = {
    SMAs: [],
    EMAs: [],
  };
  mAConfig.averages.forEach((params) => {
    const maValues = calculateMA(mathData, params.period, params.type);
    const firstNonNullIndex = maValues.findIndex((value) => value !== null);
    const maValuesWithDate = maValues.slice(firstNonNullIndex).map((value, i) => ({ date: mathData[i + firstNonNullIndex].date, value }));
    if (params.type === 'SMA') {
      maData.SMAs.push({
        name: params.name,
        period: params.period,
        offset: params.offset,
        type: params.type,
        color: params.color,
        values: maValuesWithDate,
      });
    } else if (params.type === 'EMA') {
      maData.EMAs.push({
        name: params.name,
        period: params.period,
        offset: params.offset,
        type: params.type,
        color: params.color,
        values: maValuesWithDate,
      });
    }
  });
  return maData;
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