console.log("Chart JS loaded");

let data = [];

let manualRotation = null; 
// null = follow device orientation
// true = force landscape
// false = force portrait

let volumeActive = localStorage.getItem("volume");

const drawingState = {
  mode: "idle",      // "idle" | "trendline"
  phase: null,       // null | "armed" | "anchored"
  draft: null
};

const trendlines = [];

let chartType = "candlestick";

let dragAccumulator = 0;

// ================================
// CONFIG
// ================================
const visibleCount = 45;

const svg = d3.select("#chart");

let screenWidth = window.innerHeight;
let screenHeight = window.innerWidth;

const margin = {
  top: 20,
  right: 60,
  bottom: 30,
  left: 5
};

let datafeed = [];
let ticker = []; 
let fRame = [];
const tfSpan = document.getElementById('tf-span');

  ticker = localStorage.getItem("symbol");
  fRame = sessionStorage.getItem("timeframe");
    
  let cuup = ticker;
  let timeStrech = fRame;

function  checkSession() {
    
    // handling companies
    function stealdata() {

      if (cuup === "bhl") {
        function callBhl() {
          if (cuup === "bhl" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/bh.json';
            tfSpan.textContent = 'W1';
          }
          else if (cuup === "bhl" && timeStrech === "M1") {
            datafeed = 'data/ohlc/m_ohlc/bh.json';
            tfSpan.textContent = 'M1';
          }
          else if (cuup === "bhl" && timeStrech === "Y1") {
            datafeed = 'data/ohlc/y_ohlc/bh.json';
            tfSpan.textContent = 'Y1';
          }
          else {
            datafeed = "data/ohlc/bh.json";
            tfSpan.textContent = 'D1';
          }
        }
        callBhl();
      }
      if (cuup === "amw") {
        function callAmw() {
          if (cuup === "amw" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/airtelmw.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/airtelmw.json";
          }
        }
        callAmw();
      }
      if (cuup === "nbm") {
        datafeed = "data/ohlc/nbm.json";
      }
      if (cuup === "ill") {
        function callIll() {
          if (cuup === "ill" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/illovo.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/illovo.json";
            tfSpan.textContent = 'D1';
          }
        }
        callIll();
      }
      if (cuup === "tnm") {
        function calltnm() {
          if (cuup === "tnm" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/tnm.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/tnm.json";
            tfSpan.textContent = 'D1';
          }
        }
        calltnm();
      }
      if (cuup === "nitl") {
        function callnitl() {
          if (cuup === "nitl" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/nitl.json";
            tfSpan.textContent = 'D1';
          }
        }
        callnitl();
      }
      if (cuup === "nico") {
        function callnico() {
          if (cuup === "nico" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/nico.json";
            tfSpan.textContent = 'D1';
          }
        }
        callnico();
      }
      if (cuup === "nbs") {
        function callnbs() {
          if (cuup === "nbs" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/nbs.json";
            tfSpan.textContent = 'D1';
          }
        }
        callnbs();
      }
      if (cuup === "fdhb") {
        function callfdhb() {
          if (cuup === "fdhb" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/fdh.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/fdh.json";
            tfSpan.textContent = 'D1';
          }
        }
        callfdhb();
      }
      if (cuup === "fmb") {
        function callfmb() {
          if (cuup === "fmb" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/fmbch.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/fmbch.json";
            tfSpan.textContent = 'D1';
          }
        }
        callfmb();
      }
      if (cuup === "icon") {
        function callicon() {
          if (cuup === "icon" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/icon_properties.json";
            tfSpan.textContent = 'D1';
          }
        }
        callicon();
      }
      if (cuup === "omu") {
        function callomu() {
          if (cuup === "omu" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/oldmutual.json";
            tfSpan.textContent = 'D1';
          }
        }
        callomu();
      }
      if (cuup === "mpico") {
        function callmpico() {
          if (cuup === "mpico" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/mpico.json";
            tfSpan.textContent = 'D1';
          }
        }
        callmpico();
      }
      if (cuup === "pcl") {
        function callpcl() {
          if (cuup === "pcl" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/press_corp.json";
            tfSpan.textContent = 'D1';
          }
        }
        callpcl();
      }
      if (cuup === "stdb") {
        function callstdb() {
          if (cuup === "stdb" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/std_bank.json";
            tfSpan.textContent = 'D1';
          }
        }
        callstdb();
      }
      if (cuup === "sunbird") {
        function callsunbird() {
          if (cuup === "sunbird" && timeStrech === "W1") {
            datafeed = 'data/ohlc/w_ohlc/nitl.json';
            tfSpan.textContent = 'W1';
          }
          else {
            datafeed = "data/ohlc/sunbird.json";
            tfSpan.textContent = 'D1';
          }
        }
        callsunbird();
      }
    }
    stealdata();

}
checkSession();

console.log(datafeed);


// =====================
// DATA LOADING
// =====================
fetch(datafeed)
  .then(res => res.json())
  .then(raw => {
    data = raw.ohlc.map(d => ({
      date: new Date(d.date),
      open: +d.open,
      high: +d.high,
      low: +d.low,
      close: +d.close,
      volume: +d.volume
    }));
  
    window.__chartData = data; // 👈 cache once
    
    // Re-render on resize
    window.addEventListener("resize", () => {
        requestAnimationFrame(() => render(window.__chartData));
      });

    initChart(data);
  });

// =====================
// STATE
// =====================
let startIndex = 0;

// =====================
// INIT
// =====================
function initChart(data) {
  startIndex = Math.max(0, data.length - visibleCount);
  render(window.__chartData);
  if (volumeActive == "on") {
    Indicators(window.__chartData);
  }
};

svg
    .attr("width", screenWidth)
    .attr("height", screenHeight)
    .selectAll("*")
    .remove();
   
  
  // -------- Root transform group
  const root = svg.append("g");
  
// =====================
// LAYERS
// =====================
const chartLayer = root.append("g");
const candleLayer = chartLayer.append("g");

const axisLayer = root.append("g");
root
  .attr(
    "transform",
    `translate(${screenHeight},0) rotate(90)`
  );
const overlayLayer = root.append("g");
const annotationLayer = root.append("g");
const overlay = root.append("rect");


const x = d3.scaleBand();
const y = d3.scaleLinear();
  
//______________________________________//

// Smoother Chart scrolling
   let dragAnchor = null;

// =====================
// RENDER
// =====================
function render() {
  
  screenWidth > screenHeight;
  // Effective drawing area
  const width = screenWidth;
  const height = screenHeight;
  
  startIndex = Math.max(
  0,
  Math.min(startIndex, data.length - visibleCount)
  );

  const visibleData = data.slice(
    startIndex,
    startIndex + visibleCount
  );
  
  let singleCandleIndex = data.length - 1;
  const currentCandle = data.slice(singleCandleIndex, singleCandleIndex + 1);
  
  // =====================
  // CLIP PATH
  // =====================
  if (volumeActive == "on") {
    svg.append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom - 75); // - m.b - 75)
  }else {
    svg.append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom -15); // - m.b - 75)
  }
  
  candleLayer.attr("clip-path", "url(#clip)");
  
  // =====================
  // SCALES
  // =====================
    x
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);
  
  if (volumeActive == "on") {
    y
    .domain([
      d3.min(visibleData, d => d.low),
      d3.max(visibleData, d => d.high)
    ])
    .nice()
    .range([height - (margin.bottom + 75), margin.top]);
  } else {
    y
    .domain([
      d3.min(visibleData, d => d.low),
      d3.max(visibleData, d => d.high)
    ])
    .nice()
    .range([height - (margin.bottom + 15), margin.top]);
  }
  
  const candleWidth = x.bandwidth();
  
  // =====================
  // AXES
  // =====================
  axisLayer.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(
      d3.axisBottom(x)
      .tickValues(
        visibleData.filter((_, i) => i % 5 === 0).map(d => d.date)
      )
      .tickFormat(d3.timeFormat("%d %b '%y"))
    );
  
  overlayLayer.append("line")
    .attr("x1", margin.left)
    .attr("x2", width - margin.right)
    .attr("y1", height - margin.bottom)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "black");
  
  overlayLayer.append("rect")
    .attr("x", width - margin.right)
    .attr("y", 0)
    .attr("width", margin.right)
    .attr("height", height)
    .attr("fill", "hsl(0, 0%, 96%");
    
  if (volumeActive !== "on") {
    overlayLayer.append("line")
      .attr("x1", width - margin.right)
      .attr("x2", width - margin.right)
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "black");
  }
  
  overlayLayer.append("g")
    .attr("transform", `translate(${width - margin.right},0)`)
    .call(d3.axisRight(y));
    
  candleLayer.selectAll("*").remove();
  
  const lineIcon = document.getElementById("graphA");
  const candleIcon = document.getElementById("graphB");


  if (chartType === "candlestick") {
    // =====================
    // WICKS
    // =====================
    candleLayer.selectAll(".wick")
      .data(visibleData)
      .join("line")
      .attr("class", "wick")
      .attr("x1", d => x(d.date) + candleWidth / 2)
      .attr("x2", d => x(d.date) + candleWidth / 2)
      .attr("y1", d => y(d.high))
      .attr("y2", d => y(d.low))
      .attr("stroke", "black");
    
    // =====================
    // BODIES
    // =====================
    candleLayer.selectAll(".body")
      .data(visibleData)
      .join("rect")
      .attr("class", "body")
      .attr("x", d => x(d.date))
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", candleWidth)
      .attr("height", d =>
        Math.max(1, Math.abs(y(d.open) - y(d.close)))
      )
      .attr("fill", d => d.close >= d.open ? "#c1ff72" : "#2c3e50")
      .attr("stroke", "black");
  }
  
  else {
    // ==================
    // Line Chart Logic
    // ==================
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close))
      .curve(d3.curveLinear);
  
    candleLayer.append("path")
      .datum(visibleData)
      .attr("fill", "none")
      .attr("stroke", "#2c3e50") /* #4fc3f7 */
      .attr("stroke-width", 1.5)
      .attr("d", line);
      
      
    // Switching the button icon
    lineIcon.style.display = "none";
    candleIcon.style.display = "block";
  };
  
  // appending close price tag
  candleLayer.append("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", y(d3.min(currentCandle, d => d.close)))
    .attr("y2", y(d3.min(currentCandle, d => d.close)))
    .attr("stroke", "#660033")
    .attr("stroke-dasharray", "4 2")
    .style("opacity", "0.8");
    
  overlayLayer.append("rect")
    .attr("x", width - margin.right) // position it a bit to the right of the chart
    .attr("y", y(d3.min(currentCandle, d => d.close)) - 10)
    .attr("width", margin.right - 2)
    .attr("height", 20)
    .attr("fill", "#c1ff72");
  
  overlayLayer.append("text")
    .attr("x", width - margin.right + 3)
    .attr("y", y(d3.min(currentCandle, d => d.close)) + 5)
    .text(y(d3.min(currentCandle, d => d.close)))
    .attr("fill", "black")
    .style("font-size", "11px");
      
      // Switching the button icon
      lineIcon.style.display = "block";
      candleIcon.style.display = "none";

  // =====================
  // GESTURE OVERLAY
  // =====================
  overlay
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("fill", "transparent")
    .style("cursor", "grab")
    .style("pointer-events", "all");
  
  const pixelsPerCandle =
    (width - margin.left - margin.right) / visibleCount;

  overlay.call(
    d3.drag()
      .on("start", () => {
        overlay.style("cursor", "grabbing");
        dragAccumulator = 0;
      })
      .on("drag", (event) => {
        dragAccumulator += event.dx;
  
        const shift = Math.trunc(dragAccumulator / pixelsPerCandle) * 3;
        if (shift !== 0) {
          startIndex -= shift;
          startIndex = Math.max(
            0,
            Math.min(startIndex, data.length - visibleCount)
          );
  
          dragAccumulator -= shift * pixelsPerCandle;
      
          axisLayer.selectAll("*").remove();
          chartLayer.selectAll("rect").remove();
          candleLayer.selectAll("line").remove();
          
          render(data);
          if (volumeActive == "on") {
          Indicators(data);
          }
          
        }
      })
      .on("end", () => overlay.style("cursor", "grab"))
  );

  // --------------------------
  // Trendline drawing overlay
  // --------------------------
      // ----- SAVED TRENDLINES -----
      annotationLayer.selectAll(".trendline").remove();
    
      trendlines.forEach(tl => drawTrendline(tl, false));
    
      // ----- PREVIEW TRENDLINE -----
      if (
        drawingState.mode === "trendline" &&
        drawingState.phase === "anchored" &&
        drawingState.draft?.anchors[1]
      ) {
        drawTrendline(drawingState.draft, true);
      }
      
      // ----- DRAFT ANCHORS -----
      if (drawingState.mode === "trendline" && drawingState.draft) {
        annotationLayer.selectAll(".anchor").remove();
      
        drawingState.draft.anchors.forEach((a, i) => {
          if (!a) return;
      
          annotationLayer.append("circle")
            .attr("class", "anchor")
            .attr("cx", x(a.date) + x.bandwidth() / 2)
            .attr("cy", y(a.price))
            .attr("r", 5)
            .attr("fill", i === 0 ? "black" : "blue");
        });
      }

  // =====================
  // CROSSHAIR
  // =====================
  
  overlay.on("mousemove", (event) => {
  if (drawingState.mode === "trendline") {
    handleTrendlineMove(event);
    return;
  }

  // existing crosshair logic stays here
    
    });
    
  //  console.log("visibleCount:", visibleCount, "startIndex:", startIndex);
}

// =========================
//    BOTTOM INDICATORS
// =========================
function Indicators () {
  
  screenWidth > screenHeight;
  // Effective drawing area
  const width = screenWidth;
  const height = screenHeight;
  
  startIndex = Math.max(
  0,
  Math.min(startIndex, data.length - visibleCount)
  );

  const volume = {
    top: margin.bottom + 65
  }
  
  const visibleData = data.slice(
    startIndex,
    startIndex + visibleCount
  );
  
  const xx = d3.scaleBand();
  const yy = d3.scaleLinear();
  
  // =====================
  // SCALES
  // =====================
    x
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);
  
    yy
    .domain([
      0,
      d3.max(visibleData, d => d.volume * 1.3)
    ])
    .nice()
    .range([volume.top, margin.bottom]);
  
  const barWidth = x.bandwidth();
  
  // ===========================
  //  Chart Indicator Separator
  // ===========================
  overlayLayer.append("line")
    .attr("x1", margin.left)
    .attr("x2", width - margin.right - 15)
    .attr("y1", height - volume.top)
    .attr("y2", height - volume.top)
    .attr("stroke", "darkblue");
    
  // ============
  //  Axes
  // ============
  axisLayer.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .style("color", "blue")
    .style("opacity", "0")
    .call(
      d3.axisBottom(x)
      .tickValues(
        visibleData.filter((_, i) => i % 5 === 0).map(d => d.date)
      )
      .tickFormat(d3.timeFormat("%d %b '%y"))
    );
    
  overlayLayer.append("g")
  .attr("transform", `translate(${width - margin.right}, ${volume.top + 156})`)
  .call(d3.axisRight(yy)
    .ticks(3)
    .tickSize(4)
    .tickPadding(5) // add some padding
  );
  
  // =============
  //  Bars
  // =============
  chartLayer.append("rect")
    .attr("x", margin.left)
    .attr("y", height - volume.top - 2)
    .attr("width", width - margin.left - margin.right - 14)
    .attr("height",volume.top - 29)
    .attr("fill", "rgba(255, 255, 255, 0.5)");
  
  const barLayer = chartLayer.append("g");
  barLayer.selectAll(".body")
  .data(visibleData)
  .join("rect")
  .attr("class", "body")
  .attr("x", d => x(d.date) + 4 - barWidth * 0.5) // adjust x to center the bar
  .attr("y", d => yy(0) + yy(d.volume) + volume.top + 37)
  .attr("width", barWidth)
  .attr("height", d => yy(0) - yy(d.volume))
  .attr("fill", "magenta")
  .attr("stroke", "black")
  .style("transform", "translateY(1.5rem)");

}

// ==============
// Control Panel
// ==============
const navBtn = document.getElementById('logo');
const toolsWrap = document.getElementById('toolsWrap');
const tfWrap = document.getElementById('tfWrap');
const chartOverlay = document.getElementById('chartOverlay');
const coWrap = document.getElementById('co-wrap');
const drawWrap = document.getElementById('drawWrap');
const indicatorWrap = document.getElementById('indicatorWrap');
const chartSettings = document.getElementById('chartSettings');
const overlayExit = document.createElement('div');
    overlayExit.style.cssText = `
    position: absolute;
    right: 0;
    top: 45.5vh;
    height: calc(100vh - 45.5vh);
    width: 100vw;
    background: transparent;
    `;

let initialClick = 1;
const coverClick = {one: 2, two: 1};
function callTools() {
  
  if (initialClick == 1) {
    toolsWrap.style.display = 'none';
    navBtn.style.opacity = 1;
    initialClick = coverClick.one;
    setTimeout (() => {
      navBtn.style.opacity = 0.5;
      initialClick = coverClick.two;
    }, 5000);
  } else if (initialClick == 2) {
    toolsWrap.style.display = 'block';
    tfWrap.style.display = 'none';
    navBtn.style.opacity = 1;
    setTimeout (()=> {
      navBtn.style.opacity = 0.5;
    }, 5000);
    initialClick = coverClick.two;
  }
}

navBtn.addEventListener("click", (e) => {
  
  callTools(e);
  
  // Closing the panel
  function closeTool() {
    toolsWrap.style.display = 'none';
    tfWrap.style.display = 'none';
    navBtn.style.opacity = 0.5;
  }
  
  toolsExit.addEventListener("click", (e) => { 
      e.stopPropagation();
      closeTool();
    });
  
  // Timeframe
  timeframe.addEventListener("click", (e) => {
    e.stopPropagation();
    tfWrap.style.display = 'flex';
  });
  
  const da = document.getElementById('tfwa').addEventListener ('click', (e) => {
    e.stopPropagation();
    
    window.sessionStorage.setItem("timeframe", "");
    tfSpan.textContent = 'D1';
    checkSession();
    window.location.reload();
    closeTool();
  });
  const db = document.getElementById('tfwb').addEventListener ('click', (e) => {
    e.stopPropagation();
    
    window.sessionStorage.setItem("timeframe", "W1");
    checkSession();
    window.location.reload();
      
      console.log(datafeed);
    closeTool();
  });
  const dc = document.getElementById('tfwc').addEventListener ('click', (e) => {
    e.stopPropagation();
    window.sessionStorage.setItem("timeframe", "M1");
    checkSession();
    window.location.reload();
    
    tfSpan.textContent = 'M1';
    closeTool();
  });
  const dd = document.getElementById('tfwd').addEventListener ('click', (e) => {
    e.stopPropagation();
    
    window.sessionStorage.setItem("timeframe", "Y1");
    checkSession();
    window.location.reload();
    
    closeTool();
  });
  
  // Drawings overlay
  drawingTools.addEventListener("click", (e) => {
    e.stopPropagation();
    chartOverlay.style.display = 'block';
    coWrap.style.display = 'flex';
    drawWrap.style.display = 'flex';
    indicatorWrap.style.display = 'none';
    chartOverlay.appendChild(overlayExit);
    closeTool();
    
    // Closing Overlay
    overlayExit.addEventListener("click", (e) => {
      e.stopPropagation();
      chartOverlay.style.display = 'none';
    });
  });
  
  // Indicators Overlay
  tIndicators.addEventListener("click", (e) => {
    e.stopPropagation();
    chartOverlay.style.display = 'block';
    coWrap.style.display = 'flex';
    drawWrap.style.display = 'none';
    indicatorWrap.style.display = 'flex';
    chartOverlay.appendChild(overlayExit);
    closeTool();
    
    // Closing Overlay
    overlayExit.addEventListener("click", (e) => {
      e.stopPropagation();
      chartOverlay.style.display = 'none';
    });
  });
});

// ===============
// Graph Toggle
// ===============
graph.addEventListener("click", (e) => {
  e.stopPropagation();
  chartType = chartType === "candlestick" ? "line" : "candlestick";
    toolsWrap.style.display = 'none';
    render(window.__chartData);
    if (volumeActive == "on") {
    Indicators(window.__chartData);
    }
    console.log("chartType:", chartType);
  });
  
// =================
//  Settings Button
// =================
chartSettings.addEventListener("click", (e) => {
  openAlert();
  alertField.textContent = 'The FinTala team is working on bringing more features. Chart settings coming soon.';
  alertClose();
});

// ====================
// Trendline Composer
// ====================
const composer = document.getElementById("tlcomposer");
const header = composer.querySelector(".tl-header");

let dragOffsetX = 0;
let dragOffsetY = 0;
let dragging = false;

header.addEventListener("pointerdown", (e) => {
  dragging = true;
  const rect = composer.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  header.setPointerCapture(e.pointerId);
});

header.addEventListener("pointermove", (e) => {
  if (!dragging) return;

  composer.style.left = `${e.clientX - dragOffsetX}px`;
  composer.style.top = `${e.clientY - dragOffsetY}px`;
});

header.addEventListener("pointerup", () => {
  dragging = false;
});

// ---------------------
// Show/Hide logic
// ---------------------
function showTrendlineComposer() {
  composer.classList.remove("hidden");
  chartOverlay.style.display = 'none';
  toolsWrap.style.display = 'none';
}

function hideTrendlineComposer() {
  composer.classList.add("hidden");
}

const trendlineToolBtn = document.getElementById("trendline");

trendlineToolBtn.addEventListener("click", () => {
  openAlert();
  alertField.innerText = "The FinTala team is working on bringing more features. Trendline coming soon."
  //startTrendlineDrawing();
});

// -------------
// Input Logic
// -------------
let trendlineDraft = {
  name: "",
  extension: "none",
  style: {
    color: "#000000",
    width: 1.5
  }
};

// name input
const nameInput = document.getElementById("tl-name");

nameInput.addEventListener("input", (e) => {
  trendlineDraft.name = e.target.value;
});

// extension buttons
const extendButtons = document.querySelectorAll(".tl-extend button");

extendButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    extendButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    trendlineDraft.extension = btn.dataset.ext;
  });
});

// color picker
const colorInput = document.getElementById("tl-color");

colorInput.addEventListener("input", (e) => {
  trendlineDraft.style.color = e.target.value;
});

// width slider
const widthInput = document.getElementById("tl-width");

widthInput.addEventListener("input", (e) => {
  trendlineDraft.style.width = parseFloat(e.target.value);
});

// cancel button
const cancelBtn = document.getElementById("tl-cancel");

cancelBtn.addEventListener("click", () => {
  trendlineDraft = null;
  hideTrendlineComposer();
});

// =========================
// Trendline drawing logic
// =========================
function drawTrendline(tl, preview) {
  const [a, b] = tl.anchors;
  if (!a || !b) return;

  const x1 = x(a.date) + x.bandwidth() / 2;
  const y1 = y(a.price);
  const x2 = x(b.date) - x.bandwidth() / 2;
  const y2 = y(b.price);

  annotationLayer.append("line")
    .attr("class", "trendline")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", tl.style.color)
    .attr("stroke-width", tl.style.width)
    .attr("stroke-dasharray", preview ? "4,4" : null)
    .attr("opacity", preview ? 0.6 : 1)
    .style("pointer-events", "none");
}

// -------------------
// Interaction wiring
// -------------------

// preview projection
overlay.on("click", (event) => {
  
  if (drawingState.mode !== "trendline")  return;

  const [mx, my] = d3.pointer(event, root.node());
  const index = Math.floor((mx - margin.left) / x.bandwidth());
  const date = x.domain()[index];
  if (!date) return;

  const price = y.invert(my);


  // ---- First anchor
  if (drawingState.phase === "first") {
    drawingState.draft.anchors = [{ date, price }];
    overlayLayer.selectAll(".crosshair"). remove();
    axisLayer.selectAll("*").remove();
    drawingState.phase = "second";
    render(window.__chartData);
    return;
  }

  // ---- Second anchor
  if (drawingState.phase === "second") {
    drawingState.draft.anchors[1] = { date, price };
    drawingState.draft.id = crypto.randomUUID();
    trendlines.push(drawingState.draft);

    drawingState.mode = "idle";
    drawingState.phase = null;
    drawingState.draft = null;
    
    axisLayer.selectAll("*").remove();

    render(window.__chartData);
  }
});

// Pan logic
overlay.call(
  d3.drag()
    .filter(() => drawingState.mode === "idle")
    .on("drag", (event) => {
      // your existing pan logic here
      render(window.__chartData);
    })
);

// Tool activation
function startTrendlineDrawing() {
  drawingState.mode = "trendline";
  drawingState.phase = "first"; // 👈 explicit
  drawingState.draft = {
    anchors: [],
    style: { color: "hsl(0, 0%, 70%)", width: 1.5 }
  };

  showTrendlineComposer();
}

// Trendline displacement
function handleTrendlineMove(event) {
  if (drawingState.phase !== "second") return;

  const [mx, my] = d3.pointer(event);
  const index = Math.floor((mx - margin.left) / x.bandwidth());
  const date = x.domain()[index];
  if (!date) return;

  drawingState.draft.anchors[1] = {
    date,
    price: y.invert(my)
  };

  render(window.__chartData);
}

// ==========================
//  Beta Insufficiency Alert
// ==========================

// rsi
const alertCard = document.getElementById('alert-card');
const alertField = document.getElementById('alert');
const alertClose = document.getElementById('close-alert');

function openAlert() {
  alertCard.style.display = 'flex';
  
  // Closing the card
  alertClose.addEventListener('click', () => {
    alertCard.style.display = 'none';
  });
}

//------------ New User Alert
let usertype = localStorage.getItem("usertype", "olduser");
if (usertype !== "olduser") {
  setTimeout (() => {
    openAlert();
    alertField.textContent = 'You can access the ‘navigation menu’ by clicking (twice) on the logo, near the top left corner.';
  }, 4000);
  alertClose.addEventListener('click', () => {
    localStorage.setItem("usertype", "olduser");
  });
}

const rsi = document.getElementById('rsi').addEventListener("click", (e) => {
  e.stopPropagation();
  alertField.textContent = 'The FinTala team is working on bringing more features. Relative Strength Index coming soon.';
  openAlert();
});

// moving average
const movingAverage = document.getElementById('movingAverage').addEventListener('click', (e) => {
  e.stopPropagation();
  alertField.textContent = 'The FinTala team is working on bringing more features. Moving Average coming soon.';
  openAlert();
});

const volumeIndicator = document.getElementById('volume').addEventListener('click', (e) => {
  e.stopPropagation();
  localStorage.setItem("volume", "on");
  window.location.href = 'charts.html';
  
  if (volumeActive == "on") {
    localStorage.removeItem("volume");
    window.location.href = 'charts.html';
  }
});