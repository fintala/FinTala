// ==============
//  Trendlines
// ==============
const tlConfigKey = `tlConfig_${counterName}`;
let tlConfig = JSON.parse(localStorage.getItem(tlConfigKey)) || { name: counterName, trendlines: [] };

let points = [];
let ycordinate1 = "";
let ycordinate2 = "";
let drawing = false;
let dragAccumulatedX;
let dragAccumulatedY;

// Effective drawing area
const width = screenWidth;
const height = screenHeight;

let tlAnchorA = null;
let tlAnchorB = null;
function drawTrendlines() {
  screenWidth > screenHeight;
  
  startIndex = Math.max(
  0,
  Math.min(startIndex, data.length - visibleCount)
  );
  const visibleData = data.slice(
    startIndex,
    startIndex + visibleCount
  );
  
  const xScale = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);
  
  const minY = d3.min(visibleData, d => d.low);
  const maxY = d3.max(visibleData, d => d.high);
  const padding = (maxY - minY) * 0.1; // 10% padding
  
  const yScale = d3.scaleLinear()
    .domain([minY - padding, maxY + padding])
    .range([height - (margin.bottom + (volumeActive === "on" ? 105 : 50)), margin.top]);

  // Remove old circles
  root.selectAll("circle.highlight").remove();
  root.selectAll("line.highlight").remove();
    
    root.on('click', (event) => {
    if (!drawing) return;
    const [xPos, yPos] = d3.pointer(event);
    const date = xScale.domain()[Math.floor((xPos - margin.left) / xScale.step())];
    const value = (yScale.invert(yPos)).toFixed(2);
    points.push({ x: xScale(date) + xScale.bandwidth() / 2, y: yPos, date: date });

    if (points.length === 1) {
      tlAnchorA = root.append("circle")
        .attr("class", "highlight")
        .attr("cx", points[0].x)
        .attr("cy", points[0].y)
        .attr("r", 5)
        .attr("fill", "red")
        .attr("stroke", "transparent")
        .attr("stroke-width", "32");
    
      recter = svg.append("rect")
        .attr("x", margin.left + 60)
        .attr("y", 2)
        .attr("width", margin.left + 300)
        .attr("height", points[0].x + 20)
        .attr("fill", "transparent");
    
      const dragA = d3.drag()
        .on("start", function(event, d) {
          tlAnchorA.style("cursor", "grabbing");
          this.dragging = true;
        })
        .on("drag", function(event, d) {
          
          if (this.dragging && points[0].x <= (points[1].x - 20) && points[0].x > 18.37 && points[0].y > 13.01 && points [0].y < 295) {
            const date = xScale.domain()[Math.floor((event.x - margin.left)/xScale.step())];
            points[0].x = xScale(date) + xScale.bandwidth()/2;
            points[0].y = event.y;
            points[0].date = date;
            tlAnchorA.attr("cx", event.x).attr("cy", event.y);
            if (points.length === 2) {
              previewLine();
            }
          }
        })
        .on("end", function(event, d) {
          tlAnchorA.style("cursor", "grab");
          this.dragging = false;
          if (recter) recter.remove();
          if (points[0].x >= (points[1].x - 20)) {
            points[0].x = points[0].x - 30;
          }
          if (points[0].x <= 18.37) {
            points[0].x = points[0].x + 15;
            points[1].x = points[1].x + 15;
          }
          if (points[0].y <= 13.01) {
            points[0].y = points[0].y + 3;
          }
          if (points[0].y >= 295 ){
            points[0].y = points[0].y - 3;
          }
          tlAnchorA.attr("cx", points[0].x).attr("cy", points[0].y);
          tlAnchorB.attr("cx", points[1].x).attr("cy", points[1].y);
          previewLine();
          ycordinate1 = yScale.invert((points[0].y).toFixed(2));
          ycordinate2 = yScale.invert((points[1].y).toFixed(2));
        });
    
      tlAnchorA.call(dragA);
    }
    
    if (points.length === 2) {
      tlAnchorB = root.append("circle")
        .attr("class", "highlight")
        .attr("cx", points[1].x)
        .attr("cy", points[1].y)
        .attr("r", 5)
        .attr("fill", "blue")
        .attr("stroke", "transparent")
        .attr("stroke-width", "32");
        
      ycordinate1 = yScale.invert((points[0].y).toFixed(2));
      ycordinate2 = yScale.invert((points[1].y).toFixed(2));
      
      recter.remove();
      drawing = false;
      inputTL();
      previewLine();
    
      const dragB = d3.drag()
        .on("start", function(event, d) {
          tlAnchorB.style("cursor", "grabbing");
          this.dragging = true;
        })
        .on("drag", function(event, d) {
          if (this.dragging && (points[0].x + 20) <= points[1].x && points[1].x < 535.54 && points[1].y > 13.01 && points[1].y < 295) {
            const date = xScale.domain()[Math.floor((event.x - margin.left) / xScale.step())];
            points[1].x = xScale(date) + xScale.bandwidth() / 2;
            points[1].y = event.y;
            points[1].date = date;
            tlAnchorB.attr("cx", event.x).attr("cy", event.y);
            if (points.length === 2) {
              previewLine();
            }
          }
        })
        .on("end", function(event, d) {
          tlAnchorB.style("cursor", "grab");
          this.dragging = false;
          if (recter) recter.remove();
          if ((points[0].x + 20) >= points[1].x) {
            points[1].x = points[1].x + 30;
          }
          if(points[1].x >= 535.54){
            points[0].x = points[0].x - 15;
            points[1].x = points[1].x - 15;
          }
          if (points[1].y <= 13.01) {
            points[1].y = points[1].y + 3;
          }
          if (points[1].y >= 295 ){
            points[1].y = points[1].y - 3;
          }
          tlAnchorA.attr("cx", points[0].x).attr("cy", points[0].y);
          tlAnchorB.attr("cx", points[1].x).attr("cy", points[1].y);
          previewLine();
          ycordinate1 = yScale.invert((points[0].y).toFixed(2));
          ycordinate2 = yScale.iinvert((points[1].y).toFixed(2));
        });
    
      tlAnchorB.call(dragB);
    }
  });
};

let tlClick = 0;
let extension = "";
let tlColor = "#000000";
let tlWidth = "2";
let x1, y1, x2, y2;


function inputTL(tl) {
  const trendlineEditor = document.getElementById('tlcomposer');
  trendlineEditor.style.display = 'flex'
  trendlineEditor.innerHTML = `
    <input id="tl-name" type="text" placeholder="Name (e.g. Daily resistance)"/>
      
    <div class="tl-row">
      <label>Extend</label>
      <div class="tl-extend">
        <button id='tlenone' class="extend-button" data-ext='none'>
          <span class="lineHeight">—</span>
        </button>
        <button id='tleleft' class="extend-button" data-ext='left'>
          <span>←</span>
        </button>
        <button id='tleright' class="extend-button" data-ext='right'>
          <span>→</span>
        </button>
        <button id='tleboth' class="extend-button" data-ext='both'>
          <span>↔</span>
        </button>
      </div>
    </div>
        
    <div class="tl-row">
      <label>Color</label>
      <input id="tl-color" type="color" value="${tlColor}" />
    </div>
        
    <div class="tl-row">
      <label>Stroke Width</label>
      <input id="tl-width" type="range" min="1" max="4" step="0.5" value="${tlWidth}" />
    </div>
      
    <div class="tl-ctrl">
      <button id="tl-move">Shift↑↓</button>
      <button id="tl-cancel">Cancel</button>
      <button id="tl-save">Submit</button>
    </div>
  `;
  
  document.getElementById("tl-move").onclick = (e) => {
      e.stopPropagation();
      tlClick = 1 - tlClick; // toggle 0 <-> 1
      trendlineEditor.style.transform = `translateY(${tlClick ? '-300px' : '0'})`;
    };
  document.getElementById("tl-cancel").onclick = (e) => {
      e.stopPropagation();
      preview.remove();
      root.selectAll("circle").remove();
      trendlineEditor.style.display = 'none';
      updateTrendlines();
    };
  document.querySelectorAll(".extend-button").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".extend-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        extension = btn.dataset.ext;
        previewLine();
      };
    });
  document.getElementById("tl-color").oninput = (e) =>{
    tlColor = e.target.value;
    previewLine();
  }
  document.getElementById("tl-width").oninput = (e) => {
    tlWidth = e.target.value;
    previewLine();
  }
  document.getElementById("tl-save").onclick = () => {
      const tlData = {
        name: document.getElementById("tl-name").value.trim() || "untitled_T.L",
        x1: points[0].date,
        y1: ycordinate1,
        x2: points[1].date,
        y2: ycordinate2,
        extension,
        color: document.getElementById("tl-color").value,
        width: document.getElementById("tl-width").value,
      };
      const trendlineData = calculateTrendlineData(tlData);
      tlData.slope = trendlineData.slope;
      tlData.intercept = trendlineData.intercept;
      
      preview.remove();
      root.selectAll("circle").remove();
      tlConfig.trendlines.push(tlData);
      localStorage.setItem(tlConfigKey, JSON.stringify(tlConfig));
      trendlineEditor.style.display = 'none';
      points.length = 0;
      updateTrendlines();
      rendertlObjects();
    };
}

let preview;
function previewLine() {
  if (preview) preview.remove();

  const x1 = points[0].x;
  const y1 = points[0].y;
  const x2 = points[1].x;
  const y2 = points[1].y;

  const slope = (y2 - y1) / (x2 - x1);
  let xStart = x1, yStart = y1;
  let xEnd = x2, yEnd = y2;

  if (extension === 'right' || extension === 'both') {
    xEnd = width - margin.right;
    yEnd = y1 + slope * (xEnd - x1);
  }

  if (extension === 'left' || extension === 'both') {
    xStart = margin.left;
    yStart = y1 - slope * (x1 - xStart);
  }

  preview = root.append("line")
    .attr("class", "highlight")
    .attr("x1", xStart)
    .attr("y1", yStart)
    .attr("x2", xEnd)
    .attr("y2", yEnd)
    .attr("stroke", tlColor)
    .attr("stroke-width", tlWidth)
    .style("opacity", "0.7");
  
}

let trendlineParameters = tlConfig.trendlines;

function rendertlObjects() {
  // Drawing Objects
  tlConfig = JSON.parse(localStorage.getItem(tlConfigKey)) || { name: counterName, trendlines: [] };
  const trendlinesList = document.getElementById('tl-wrap');
  const trendlinesHead = document.querySelector('.tl-head');
  
  trendlinesList.querySelectorAll('.average').forEach(el => el.remove());
  
  tlConfig.trendlines.forEach(trendline => {
    const div = document.createElement('div');
    div.classList.add('average');
    div.innerHTML = `
      <div class="trendline-name">${trendline.name}</div>
      <div class="trendline-extesion">${trendline.extension}</div>
      <div class="trendline-width">${trendline.width}</div>
      <div class="trendline-clr" style="background: ${trendline.color};"></div>
    `;
    trendlinesList.appendChild(div)
    div.onclick = () => showtlActionCard(trendline, div);
  });
}
rendertlObjects();

function closetlCard(div) {
  document.getElementById('tlaction-card').style.display = 'none';
}

// Action card handler
function showtlActionCard(trendline, div) {
  const card = document.getElementById('tlaction-card');
  const cardWrap = document.getElementById('tlactioncard-wrap');
  card.style.display = 'flex';
  cardWrap.innerHTML = `
    <button class="card-btn" id="delete-btn">Delete</button>
    <button id="cardclose-btn">×</button>
  `;
  document.getElementById('delete-btn').onclick = () => {
    deleteTL(trendline, div);
    showTrendlines();
  };
  document.getElementById('cardclose-btn').onclick = () => closetlCard(div);
}

function deleteTL(trendline, div) {
  root.selectAll(".renders").remove();
  tlConfig.trendlines = tlConfig.trendlines.filter(a =>
    a.name !== trendline.name || a.extension !== trendline.extension || a.x1 !== trendline.x1 || a.y1 !== trendline.y1 || a.x2 !== trendline.x2 || a.y2 !== trendline.y2 || a.width !== trendline.width
  );
  localStorage.setItem(tlConfigKey, JSON.stringify(tlConfig));
  div.remove();
  document.getElementById('tlaction-card').style.display = 'none';
}

function updateTrendlines() {
  // 
  showTrendlines();
  rendertlObjects();
}

function showTrendlines() {
  tlConfig = JSON.parse(localStorage.getItem(tlConfigKey)) || { name: counterName, trendlines: [] };
  trendlineParameters = tlConfig.trendlines;

  // Drawing MAs
  screenWidth > screenHeight;
  startIndex = Math.max(0, Math.min(startIndex, data.length - visibleCount));
  const visibleData = data.slice(startIndex, startIndex + visibleCount);

  const tlX = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);

  const min = d3.min(visibleData.map(d => d.low));
  const max = d3.max(visibleData.map(d => d.high));
  const padding = (max - min) * 0.1;
  const tlY = d3.scaleLinear()
    .domain([min - padding, max + padding])
    .range([height - (margin.bottom + (volumeActive === "on" ? 105 : 50)), margin.top]);

  // Axes
  axisLayer.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .style("opacity", "0")
    .call(d3.axisBottom(tlX)
      .tickValues(visibleData.filter((_, i) => i % 10 === 0).map(d => d.date)));
  axisLayer.append("g")
    .attr("transform", `translate(${width - margin.right},0)`)
    .style("opacity", "0")
    .call(d3.axisRight(tlY)
      .tickFormat(d => d3.format(".2f")(d)));

  root.selectAll(".renders").remove();

  function getAngle(x1, y1, x2, y2) {
    const x1Px = tlX(x1);
    const y1Px = tlY(y1);
    const x2Px = tlX(x2);
    const y2Px = tlY(y2);
    if (x1Px === x2Px) {
      return 0; // or some other default value
    }
    const slope = (y2Px - y1Px) / (x2Px - x1Px);
    return Math.atan(slope) * (180 / Math.PI);
  }

  trendlineParameters.forEach(tl => {
    const { slope, intercept, x1, x2, y1, y2 } = tl;
    let xStart = new Date(x1);
    let yStart = parseFloat(y1);
    let xEnd = new Date(x2);
    let yEnd = parseFloat(y2);

    // Apply extension logic
    if (tl.extension === 'left' || tl.extension === 'both') {
      xStart = new Date(tlX.domain()[0]);
      yStart = slope * (xStart.getTime() / 86400000) + intercept;
    }
    if (tl.extension === 'right' || tl.extension === 'both') {
      xEnd = new Date(tlX.domain()[tlX.domain().length - 1]);
      yEnd = slope * (xEnd.getTime() / 86400000) + intercept;
    }

    // Clip to visible range
    const visibleStart = new Date(visibleData[0].date);
    const visibleEnd = new Date(visibleData[visibleData.length - 1].date);
    if (xStart < visibleStart) {
      xStart = visibleStart;
      yStart = slope * (xStart.getTime() / 86400000) + intercept;
    } else if (xStart > visibleEnd) {
      xStart = visibleEnd;
      yStart = slope * (xStart.getTime() / 86400000) + intercept;
    }
    if (xEnd < visibleStart) {
      xEnd = visibleStart;
      yEnd = slope * (xEnd.getTime() / 86400000) + intercept;
    } else if (xEnd > visibleEnd) {
      xEnd = visibleEnd;
      yEnd = slope * (xEnd.getTime() / 86400000) + intercept;
    }

    const tltl = root.append("line")
      .attr("class", "renders")
      .attr("x1", tlX(xStart))
      .attr("x2", tlX(xEnd))
      .attr("y1", tlY(yStart))
      .attr("y2", tlY(yEnd))
      .attr("stroke", tl.color)
      .attr("stroke-width", tl.width);

    // Calculating midpoint
  const midX = (tlX(xStart) + tlX(xEnd)) / 2;
  const midY = (tlY(yStart) + tlY(yEnd)) / 2;

  // Calculate angle
  const angle = getAngle(xStart, yStart, xEnd, yEnd)

  // Append text at midpoint
  const text = root.append("text")
    .attr("class", "renders")
    .attr("x", midX)
    .attr("y", midY)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", tl.color)
    .attr("transform", `rotate(${angle} ${midX} ${midY})`)
    .text(tl.name);

  // Append text background
  const textBBox = text.node().getBBox();
  root.append("rect")
    .attr("class", "renders")
    .attr("x", textBBox.x - 2)
    .attr("y", textBBox.y - 2)
    .attr("width", textBBox.width + 4)
    .attr("height", textBBox.height + 4)
    .attr("fill", "white")
    .attr("opacity", 0.8)
    .attr("transform", `rotate(${angle} ${midX} ${midY})`);
  });

  if (volumeActive == "on") {
    svg.append("defs")
      .append("clipPath")
      .attr("id", "clipp")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.right)
      .attr("height", height - margin.top - margin.bottom - 105);
  } else {
    svg.append("defs")
      .append("clipPath")
      .attr("id", "clipp")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.right)
      .attr("height", height - margin.top - margin.bottom - 50);
  }

  root.selectAll(".renders").attr("clip-path", "url(#clipp)");
}
const  forceTls = showTrendlines();
if (!forceTls) {
  showTrendlines();
}

function calculateTrendlineData(tlData) {
  const x1 = new Date(tlData.x1);
  const x2 = new Date(tlData.x2);
  const y1 = parseFloat(tlData.y1);
  const y2 = parseFloat(tlData.y2);
  const slope = (y2 - y1) / ((x2 - x1) / (86400000));
  const intercept = y1 - slope * (x1.getTime() / 86400000);
  return { slope, intercept };
}

// ==================
//  Horizontal Lines
// ==================
const hlConfigKey = `hlConfig_${counterName}`;
let hlConfig = JSON.parse(localStorage.getItem(hlConfigKey)) || { name: counterName, horLines: [] };

let hPoints = [];
let ycord = "";
let hDrawing = false;
let hlAnchorA = null;
let hlAnchorB = null;
let hlAnchorC = null;
let hlExtension = "";

function drawHorLines() {
  screenWidth > screenHeight;
  startIndex = Math.max(0, Math.min(startIndex, data.length - visibleCount));
  const visibleData = data.slice(startIndex, startIndex + visibleCount);

  const xScale = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);

  const minY = d3.min(visibleData, d => d.low);
  const maxY = d3.max(visibleData, d => d.high);
  const padding = (maxY - minY) * 0.1;
  const yScale = d3.scaleLinear()
    .domain([minY - padding, maxY + padding])
    .range([height - (margin.bottom + (volumeActive === "on" ? 105 : 50)), margin.top]);

  root.on('click', (event) => {
    if (!hDrawing) return;
    const [xPos, yPos] = d3.pointer(event);
    const date = xScale.domain()[Math.floor((xPos - margin.left) / xScale.step())];
    const value = (yScale.invert(yPos)).toFixed(2);

    if (hPoints.length === 0) {
      hPoints.push({ x: xScale(date) + xScale.bandwidth() / 2, y: yPos, date: date });
      ycord = hPoints[0].y;
      hlAnchorA = root.append("circle")
        .attr("class", "h-line")
        .attr("cx", hPoints[0].x)
        .attr("cy", hPoints[0].y)
        .attr("r", 5)
        .attr("fill", "blue")
        .attr("stroke", "transparent")
        .attr("stroke-width", "32");

      const dragA = d3.drag()
        .on("start", function(event, d) {
          hlAnchorA.style("cursor", "grabbing");
          this.dragging = true;
        })
        .on("drag", function(event, d) {
          if (this.dragging) {
            const newX = Math.max(margin.left + 15, Math.min(event.x, width - margin.right - 15));
            const newY = Math.max(13.01 + 10, Math.min(event.y, 295 - 10));
            const deltaX = newX - hPoints[0].x;
            const deltaY = newY - hPoints[0].y;
            hPoints[0].x = newX;
            hPoints[0].y = newY;
            hPoints[1].x = Math.max(margin.left, Math.min(hPoints[1].x + deltaX, hPoints[0].x - 30));
            hPoints[1].y = newY;
            hPoints[2].x = Math.min(width - margin.right, Math.max(hPoints[2].x + deltaX, hPoints[0].x + 30));
            hPoints[2].y = newY;
            hlAnchorA.attr("cx", hPoints[0].x).attr("cy", hPoints[0].y);
            hlAnchorB.attr("cx", hPoints[1].x).attr("cy", hPoints[1].y);
            hlAnchorC.attr("cx", hPoints[2].x).attr("cy", hPoints[2].y);
            ycord = hPoints[0].y;
            previewHLine(hlExtension);
          }
        })
        .on("end", function(event, d) {
          hlAnchorA.style("cursor", "grab");
          this.dragging = false;
        });
      hlAnchorA.call(dragA);
    }
    
    if (hPoints.length === 1) {
      hPoints.push({ x: hPoints[0].x - 30, y: hPoints[0].y, date: date });
      hlAnchorB = root.append("circle")
        .attr("class", "h-line")
        .attr("cx", hPoints[1].x)
        .attr("cy", hPoints[1].y)
        .attr("r", 5)
        .attr("fill", "red")
        .attr("stroke", "transparent")
        .attr("stroke-width", "32");
      
      hPoints.push({ x: hPoints[0].x + 30, y: hPoints[0].y, date: date });
      hlAnchorC = root.append("circle")
        .attr("class", "h-line")
        .attr("cx", hPoints[2].x)
        .attr("cy", hPoints[2].y)
        .attr("r", 5)
        .attr("fill", "red")
        .attr("stroke", "transparent")
        .attr("stroke-width", "32");
      
      const dragB = d3.drag()
        .on("start", function(event, d) {
          hlAnchorB.style("cursor", "grabbing");
          this.dragging = true;
        })
        .on("drag", function(event, d) {
          if (this.dragging) {
            const newX = Math.max(margin.left, Math.min(event.x, hPoints[0].x - 30));
            hPoints[1].x = newX;
            hPoints[1].y = hPoints[0].y;
            hlAnchorB.attr("cx", hPoints[1].x).attr("cy", hPoints[1].y);
            previewHLine(hlExtension);
          }
        })
        .on("end", function(event, d) {
          hlAnchorB.style("cursor", "grab");
          this.dragging = false;
        });
      
      const dragC = d3.drag()
        .on("start", function(event, d) {
          hlAnchorC.style("cursor", "grabbing");
          this.dragging = true;
        })
        .on("drag", function(event, d) {
          if (this.dragging) {
            const newX = Math.max(hPoints[0].x + 30, Math.min(event.x, width - margin.right));
            hPoints[2].x = newX;
            hPoints[2].y = hPoints[0].y;
            hlAnchorC.attr("cx", hPoints[2].x).attr("cy", hPoints[2].y);
            previewHLine(hlExtension);
          }
        })
        .on("end", function(event, d) {
          hlAnchorC.style("cursor", "grab");
          this.dragging = false;
        });
        
      previewHLine(hlExtension);
      inputHL();
      hlAnchorB.call(dragB);
      hlAnchorC.call(dragC);
    }
  });
}

let hlClick = 0;
let hlColor = "#000000";
let hlWidth = "2";

function inputHL(hl) {
  const horLineEditor = document.getElementById('hlcomposer');
  horLineEditor.style.display = 'flex'
  horLineEditor.innerHTML = `
    <input id="hl-name" type="text" placeholder="Name (e.g. Price level)"/>
    
    <div class="tl-row">
      <label>Extend</label>
      <div class="tl-extend">
        <button id='tlenone' class="hl-extend-button" data-ext='none'>
          <span class="lineHeight">—</span>
        </button>
        <button id='tleleft' class="hl-extend-button" data-ext='left'>
          <span>←</span>
        </button>
        <button id='tleright' class="hl-extend-button" data-ext='right'>
          <span>→</span>
        </button>
        <button id='tleboth' class="hl-extend-button" data-ext='both'>
          <span>↔</span>
        </button>
      </div>
    </div>
        
    <div class="hl-row">
      <label>Color</label>
      <input id="hl-color" type="color" value="${hlColor}" />
    </div>
        
    <div class="hl-row">
      <label>Stroke Width</label>
      <input id="hl-width" type="range" min="1" max="4" step="0.5" value="${hlWidth}" />
    </div>
      
    <div class="hl-ctrl">
      <button id="hl-move">Shift↑↓</button>
      <button id="hl-cancel">Cancel</button>
      <button id="hl-save">Submit</button>
    </div>
  `;
  startIndex = Math.max(0, Math.min(startIndex, data.length - visibleCount));
  const visibleData = data.slice(startIndex, startIndex + visibleCount);
  
  const xScale = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);

  const minY = d3.min(visibleData, d => d.low);
  const maxY = d3.max(visibleData, d => d.high);
  const padding = (maxY - minY) * 0.1;
  const yScale = d3.scaleLinear()
    .domain([minY - padding, maxY + padding])
    .range([height - (margin.bottom + (volumeActive === "on" ? 105 : 50)), margin.top]);
  
  document.getElementById("hl-move").onclick = (e) => {
      e.stopPropagation();
      hlClick = 1 - hlClick; // toggle 0 <-> 1
      horLineEditor.style.transform = `translateY(${hlClick ? '-300px' : '0'})`;
    };
  document.getElementById("hl-cancel").onclick = (e) => {
      e.stopPropagation();
      hPreview.remove();
      root.selectAll("circle").remove();
      horLineEditor.style.display = 'none';
      updateHorLines();
    };
  document.querySelectorAll(".hl-extend-button").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".hl-extend-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        hlExtension = btn.dataset.ext;
        previewHLine(hlExtension);
      };
    });
  document.getElementById("hl-color").oninput = (e) =>{
    hlColor = e.target.value;
    previewHLine(hlExtension);
  }
  document.getElementById("hl-width").oninput = (e) => {
    hlWidth = e.target.value;
    previewHLine(hlExtension);
  }
  document.getElementById("hl-save").onclick = () => {
      const x1Date = xScale.domain()[Math.floor((hPoints[1].x - margin.left) / xScale.step())];
      const x2Date = xScale.domain()[Math.floor((hPoints[2].x - margin.left) / xScale.step())];
    
      const hlData = {
        name: document.getElementById("hl-name").value.trim() || "untitled_H.L",
        x1: x1Date,
        y: yScale.invert(ycord),
        x2: x2Date,
        hlExtension,
        color: document.getElementById("hl-color").value,
        width: document.getElementById("hl-width").value,
      };
      
      hPreview.remove();
      root.selectAll("circle").remove();
      hlConfig.horLines.push(hlData);
      localStorage.setItem(hlConfigKey, JSON.stringify(hlConfig));
      horLineEditor.style.display = 'none';
      points.length = 0;
      updateHorLines();
      renderhlObjects();
    };
}

let hPreview;
function previewHLine(hlExtension) {
  startIndex = Math.max(0, Math.min(startIndex, data.length - visibleCount));
  const visibleData = data.slice(startIndex, startIndex + visibleCount);

  const hlX = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);

  const min = d3.min(visibleData.map(d => d.low));
  const max = d3.max(visibleData.map(d => d.high));
  const padding = (max - min) * 0.1;
  const hlY = d3.scaleLinear()
    .domain([min - padding, max + padding])
    .range([height - (margin.bottom + (volumeActive === "on" ? 105 : 50)), margin.top]);
  
  if (hPreview) hPreview.remove();
  if (hPoints.length < 3) return;
  let x1 = hPoints[1].x;
  let y1 = hPoints[0].y;
  let x2 = hPoints[2].x;
  let y2 = hPoints[0].y;
  // Applying extension logic
  if (hlExtension === 'left' || hlExtension === 'both') {
    x1 = hlX(hlX.domain()[0]);
  }
  if (hlExtension === 'right' || hlExtension === 'both') {
    x2 = hlX(hlX.domain()[hlX.domain().length - 1]);
  }
  hPreview = root.append("line")
    .attr("class", "hLine-preview")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", hlColor)
    .attr("stroke-width", hlWidth)
    .style("opacity", "0.7");
}

let horLineParameters = hlConfig.horLines;

function renderhlObjects() {
  // Drawing Objects
  hlConfig = JSON.parse(localStorage.getItem(hlConfigKey)) || { name: counterName, horLines: [] };
  const horLinesList = document.getElementById('hl-wrap');
  const horLinesHead = document.querySelector('.hl-head');
  horLinesList.querySelectorAll('.line').forEach(el => el.remove());
  hlConfig.horLines.forEach(horLine => {
    const div = document.createElement('div');
    div.classList.add('line');
    div.innerHTML = `
      <div class="hor-line-name">${horLine.name}</div>
      <div class="trendline-extesion">${horLine.hlExtension}</div>
      <div class="hor-line-width">${horLine.width}</div>
      <div class="hor-line-clr" style="background: ${horLine.color};"></div>
    `;
    horLinesList.appendChild(div)
    div.onclick = () => showhlActionCard(horLine, div);
  });
}
renderhlObjects();

function closehlCard(div) {
  document.getElementById('hlaction-card').style.display = 'none';
}

// Action card handler
function showhlActionCard(horLine, div) {
  const card = document.getElementById('hlaction-card');
  const cardWrap = document.getElementById('hlactioncard-wrap');
  card.style.display = 'flex';
  cardWrap.innerHTML = `
    <button class="card-btn" id="delete-btn">Delete</button>
    <button id="cardclose-btn">×</button>
  `;
  document.getElementById('delete-btn').onclick = () => {
    deleteHL(horLine, div);
    showHorLines();
  };
  document.getElementById('cardclose-btn').onclick = () => closehlCard(div);
}

function deleteHL(horLine, div) {
  root.selectAll(".hLine-preview").remove();
  root.selectAll(".hRenders").remove();
  hlConfig.horLines = hlConfig.horLines.filter(a =>
    a.name !== horLine.name || a.hlExtension !== horLine.hlExtension|| a.x1 !== horLine.x1 || a.x2 !== horLine.x2 || a.x3 !== horLine.x3 || a.y !== horLine.y || a.width !== horLine.width
  );
  localStorage.setItem(hlConfigKey, JSON.stringify(hlConfig));
  div.remove();
  document.getElementById('hlaction-card').style.display = 'none';
  showHorLines();
}

function updateHorLines() {
  // 
  showHorLines();
  renderhlObjects();
}

function showHorLines() {
  hlConfig = JSON.parse(localStorage.getItem(hlConfigKey)) || { name: counterName, horLines: [] };
  horLineParameters = hlConfig.horLines;

  // Drawing 
  screenWidth > screenHeight;
  startIndex = Math.max(0, Math.min(startIndex, data.length - visibleCount));
  const visibleData = data.slice(startIndex, startIndex + visibleCount);

  const hlX = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([margin.left, width - margin.right - 15])
    .paddingInner(0.3)
    .paddingOuter(0.15);

  const min = d3.min(visibleData.map(d => d.low));
  const max = d3.max(visibleData.map(d => d.high));
  const padding = (max - min) * 0.1;
  const hlY = d3.scaleLinear()
    .domain([min - padding, max + padding])
    .range([height - (margin.bottom + (volumeActive === "on" ? 105 : 50)), margin.top]);

  // Axes
  axisLayer.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .style("opacity", "0")
    .call(d3.axisBottom(hlX)
      .tickValues(visibleData.filter((_, i) => i % 10 === 0).map(d => d.date)));
  axisLayer.append("g")
    .attr("transform", `translate(${width - margin.right},0)`)
    .style("opacity", "0")
    .call(d3.axisRight(hlY)
      .tickFormat(d => d3.format(".2f")(d)));

  root.selectAll(".renders").remove();
  root.selectAll(".hlText").remove();
  root.selectAll(".hlRect").remove();

  horLineParameters.forEach(hl => {
    let xStart = new Date(hl.x1);
    let ycordinate = parseFloat(hl.y);
    let xEnd = new Date(hl.x2);
    
    // Applying extension logic
    if (hl.hlExtension === 'left' || hl.hlExtension === 'both') {
      xStart = new Date(hlX.domain()[0]);
    }
    if (hl.hlExtension === 'right' || hl.hlExtension === 'both') {
      xEnd = new Date(hlX.domain()[hlX.domain().length - 1]);
    }
    
    // Clipping to visible range
    const visibleStart = new Date(visibleData[0].date);
    const visibleEnd = new Date(visibleData[visibleData.length - 1].date);
    if (xStart < visibleStart) {
      xStart = visibleStart;
    } else if (xStart > visibleEnd) {
      xStart = visibleEnd;
    }
    if (xEnd < visibleStart) {
      xEnd = visibleStart;
    } else if (xEnd > visibleEnd) {
      xEnd = visibleEnd;
    }
    
    root.selectAll(".hRenders").remove()

    const hlhl = root.append("line")
      .attr("class", "hRenders")
      .attr("x1", hlX(xStart))
      .attr("x2", hlX(xEnd))
      .attr("y1", hlY(ycordinate))
      .attr("y2", hlY(ycordinate))
      .attr("stroke", hl.color)
      .attr("stroke-width", hl.width);

    // Calculating midpoint
  const midX = (hlX(xStart) + hlX(xEnd)) / 2;
  const midY = hlY(ycordinate);

  // Appending text at midpoint
  const text = root.append("text")
    .attr("class", "hlText")
    .attr("x", midX)
    .attr("y", midY)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "hsl(0, 100%, 0%)")
    .text(hl.name);

  // Appending text background
  const textBBox = text.node().getBBox();
  root.append("rect")
    .attr("class", "hlRect")
    .attr("x", textBBox.x - 2)
    .attr("y", textBBox.y - 2)
    .attr("width", textBBox.width + 4)
    .attr("height", textBBox.height + 4)
    .attr("fill", "rgba(255, 255, 255, 0.8)");
  });

  if (volumeActive == "on") {
    svg.append("defs")
      .append("clipPath")
      .attr("id", "clipp")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.right)
      .attr("height", height - margin.top - margin.bottom - 105);
  } else {
    svg.append("defs")
      .append("clipPath")
      .attr("id", "clipp")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.right)
      .attr("height", height - margin.top - margin.bottom - 50);
  }

  root.selectAll(".hRenders").attr("clip-path", "url(#clipp)");
}
