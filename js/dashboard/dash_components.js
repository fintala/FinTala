// Stock Indices
const indexTimeframe= [d3.json('data/indices/market.json'), d3.json('data/indices/w_market.json'), d3.json('data/indices/m1_market.json'), d3.json('data/indices/m4_market.json'), d3.json('data/indices/y_market.json')];

Promise.allSettled(indexTimeframe).then((results) => {
    const dataArray = results.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error('Error fetching data:', result.reason);
        return null;
      }
    }).filter((data) => data !== null);
  
    if (dataArray.length === 0) {
      console.error('No data available');
      return;
    }
    
  const masi = dataArray[0].index.map(d => d.masi);
  const dsi = dataArray[0].index.map(d => d.dsi);
  const fsi = dataArray[0].index.map(d => d.fsi);
  
  const indexData = dataArray[0].index;
  
  const currentPointM = indexData[indexData.length - 1].masi;
  const previousPointM = indexData[indexData.length - 2].masi;
  
  const percentageChangeM = (((currentPointM - previousPointM)/(currentPointM))*100).toFixed(2);
  
  const currentPointD = indexData[indexData.length - 1].dsi;
  const previousPointD = indexData[indexData.length - 2].dsi;
  
  const percentageChangeD = (((currentPointD - previousPointD)/(currentPointD))*100).toFixed(2);
  
  const currentPointF = indexData[indexData.length - 1].fsi;
  const previousPointF = indexData[indexData.length - 2].fsi;
  
  const percentageChangeF = (((currentPointF - previousPointF)/(currentPointF))*100).toFixed(2);
    
    const margin = { top: 4, right: 5, bottom: 6, left: 7 };
    const width = 100 - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    
    const masiPie = d3.select('#masi-piechart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left}, ${height / 2 + margin.top}), rotate(225)`);
      const dsiPie = d3.select('#dsi-piechart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left}, ${height / 2 + margin.top}), rotate(225)`);
    const fsiPie = d3.select('#fsi-piechart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left}, ${height / 2 + margin.top}), rotate(225)`);
      
    const textColorM = percentageChangeM >= 0? 'magenta' : 'red';
    const textColorD = percentageChangeD >= 0? 'magenta' : 'red';
    const textColorF = percentageChangeF >= 0? 'magenta' : 'red';
    const colorM = percentageChangeM >= 0 ? '#660033' : 'brown';
    const colorD = percentageChangeM >= 0 ? '#660033' : 'brown';
    const colorF = percentageChangeM >= 0 ? '#660033' : 'brown';
    const dataM = [Math.abs(percentageChangeM), 10 - Math.abs(percentageChangeM)];
    const dataD = [Math.abs(percentageChangeD), 10 - Math.abs(percentageChangeD)];
    const dataF = [Math.abs(percentageChangeF), 10 - Math.abs(percentageChangeF)];
    
    const pieColorM = d3.scaleOrdinal()
      .domain(dataM)
      .range([colorM, 'white']);
    const pieColorD = d3.scaleOrdinal()
      .domain(dataD)
      .range([colorD, 'white']);
    const pieColorF = d3.scaleOrdinal()
      .domain(dataF)
      .range([colorF, 'white']);
    
    const pie = d3.pie()
      .value(d => d)
      .sort(null);
    
    const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius * 0.6);
      
  // ====================
  //   masi pie chart
  // ====================
    masiPie.selectAll('path')
      .data(pie(dataM))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => pieColorM(i));
      
    masiPie.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius * 0.6)
      .attr('fill', 'hsl(0, 100%, 98%)')
      .attr('stroke', 'lightgrey')
      .attr('stroke-width', '0.5');
    
    masiPie.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('transform', `rotate(-225), scale(0.65)`)
      .attr('fill', `${textColorM}`)
      .text(`${percentageChangeM}%`)
      .style("font-weight", "500");
      
  // ====================
  //   dsi pie chart
  // ====================
    dsiPie.selectAll('path')
      .data(pie(dataD))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => pieColorD(i));
      
    dsiPie.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius * 0.6)
      .attr('fill', 'hsl(0, 100%, 98%)')
      .attr('stroke', 'lightgrey')
      .attr('stroke-width', '0.5');
    
    dsiPie.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('transform', `rotate(-225), scale(0.65)`)
      .attr('fill', `${textColorD}`)
      .text(`${percentageChangeD}%`)
      .style("font-weight", "500");
      
  // ====================
  //   fsi pie chart
  // ====================
    fsiPie.selectAll('path')
      .data(pie(dataF))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => pieColorF(i));
      
    fsiPie.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius * 0.6)
      .attr('fill', 'hsl(0, 100%, 98%)')
      .attr('stroke', 'lightgrey')
      .attr('stroke-width', '0.5');
    
    fsiPie.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('transform', `rotate(-225), scale(0.65)`)
      .attr('fill', `${textColorF}`)
      .text(`${percentageChangeF}%`)
      .style("font-weight", "500");
      
// =======================
//  Rendering Bar Charts
// =======================
  const visibleCount = 25;
  
  const edge = { top: 20, right: 60, bottom: 10, left: 30 };
  const wIdth = 330 - edge.left - edge.right;
  const hEight = 125 - edge.top - edge.bottom;
  
  let startIndex = 0;
  
  startIndex = Math.max(
  0,
  Math.min(startIndex, indexData.length - visibleCount)
  );
  
  const visibleData = indexData.slice(-visibleCount);
  
  let masiSvg = d3.select('#masi-barchart')
      .selectAll('*')
      .remove();
      
    masiSvg = d3.select('#masi-barchart')
      .append('svg')
      .attr('width', wIdth + edge.left + edge.right)
      .attr('height', hEight + edge.top + edge.bottom)
      .append('g')
      .attr('transform', `translate(${edge.left * 0.5}, ${edge.top * 0.5})`);
      
    const x = d3.scaleBand()
      .domain(visibleData.map(d => d.date))
      .range([-8, wIdth + 20])
      .padding(0.2);
    
    const masiY = d3.scalePow()
      .exponent(26)
      .domain([1, d3.max
      (visibleData, d => d.masi) * 1.01])
      .range([hEight, -2]);
      
    const dsiY = d3.scalePow()
      .exponent(26)
      .domain([1, d3.max
      (visibleData, d => d.dsi) * 1.015])
      .range([hEight, -2]);
      
    const fsiY = d3.scalePow()
      .exponent(26)
      .domain([1, d3.max
      (visibleData, d => d.fsi) * 1.045])
      .range([hEight, -2]);
      
    let barWidth = x.bandwidth();
      
    masiSvg.append('g')
      .attr('transform', `translate(${wIdth + 20}, 0)`)
      .style('opacity', '0.7')
      .call(d3.axisRight(masiY)
      .ticks(4)
      .tickValues([1, 585000, 590000, 595000])
      .tickSize(3)
      .tickPadding(5)
    );
    
    // Add X-axis (volume)
    masiSvg.append('g')
      .attr('transform', `translate(0, ${hEight})`)
      .style('opacity', '0.7')
      .call(d3.axisBottom(x)
        .tickValues(
          visibleData.filter((_, i) => i % 2 === 0).map(d => d.date)
        )
      .tickSize(3)
    )
      .selectAll('text')
      .attr("text-anchor", "middle");
    
    masiSvg.selectAll(".body")
      .data(visibleData)
      .join("rect")
      .attr("class", "body")
      .attr("x", d => x(d.date)) // adjust x to center the bar
      .attr("y", d => masiY(d.masi))
      .attr("width", barWidth)
      .attr("height", d => Math.abs(masiY(0) - masiY(d.masi))
      )
      .attr("fill", "steelblue")
      .attr("stroke", "black")
      .attr("stroke-width", "0.5")
      .style("opacity", "0.6");
      
  let dsiSvg = d3.select('#dsi-barchart')
      .selectAll('*')
      .remove();
      
    dsiSvg = d3.select('#dsi-barchart')
      .append('svg')
      .attr('width', wIdth + edge.left + edge.right)
      .attr('height', hEight + edge.top + edge.bottom)
      .append('g')
      .attr('transform', `translate(${edge.left * 0.5}, ${edge.top * 0.5})`);
      
    dsiSvg.append('g')
      .attr('transform', `translate(${wIdth + 20}, 0)`)
      .style('opacity', '0.7')
      .call(d3.axisRight(dsiY)
      .ticks(4)
      .tickValues([1, 400000, 405000, 410000])
      .tickSize(3)
      .tickPadding(5)
    );
    
    // Add X-axis (volume)
    dsiSvg.append('g')
      .attr('transform', `translate(0, ${hEight})`)
      .style('opacity', '0.7')
      .call(d3.axisBottom(x)
        .tickValues(
          visibleData.filter((_, i) => i % 2 === 0).map(d => d.date)
        )
      .tickSize(3)
    )
      .selectAll('text')
      .attr("text-anchor", "middle");
    
    dsiSvg.selectAll(".body")
      .data(visibleData)
      .join("rect")
      .attr("class", "body")
      .attr("x", d => x(d.date)) // adjust x to center the bar
      .attr("y", d => dsiY(Math.max(0, d.dsi)))
      .attr("width", barWidth)
      .attr("height", d =>
        Math.max(1, Math.abs(dsiY(0) - dsiY(d.dsi)))
      )
      .attr("fill", "steelblue")
      .attr("stroke", "black")
      .attr("stroke-width", "0.5")
      .style("opacity", "0.6");
      
  let fsiSvg = d3.select('#fsi-barchart')
      .selectAll('*')
      .remove();
      
    fsiSvg = d3.select('#fsi-barchart')
      .append('svg')
      .attr('width', wIdth + edge.left + edge.right)
      .attr('height', hEight + edge.top + edge.bottom)
      .append('g')
      .attr('transform', `translate(${edge.left * 0.5}, ${edge.top * 0.5})`);
      
    fsiSvg.append('g')
      .attr('transform', `translate(${wIdth + 20}, 0)`)
      .style('opacity', '0.7')
      .call(d3.axisRight(fsiY)
      .ticks(4)
      .tickValues([1, 140000, 145000, 150000])
      .tickSize(3)
      .tickPadding(5)
    );
    
    // Add X-axis (volume)
    fsiSvg.append('g')
      .attr('transform', `translate(0, ${hEight})`)
      .style('opacity', '0.7')
      .call(d3.axisBottom(x)
        .tickValues(
          visibleData.filter((_, i) => i % 2 === 0).map(d => d.date)
        )
      .tickSize(3)
    )
      .selectAll('text')
      .attr("text-anchor", "middle");
    
    fsiSvg.selectAll(".body")
      .data(visibleData)
      .join("rect")
      .attr("class", "body")
      .attr("x", d => x(d.date)) // adjust x to center the bar
      .attr("y", d => fsiY(Math.max(0, d.fsi)))
      .attr("width", barWidth)
      .attr("height", d =>
        Math.max(1, Math.abs(fsiY(0) - fsiY(d.fsi)))
      )
      .attr("fill", "steelblue")
      .attr("stroke", "black")
      .attr("stroke-width", "0.5")
      .style("opacity", "0.6");
      
  // =======================
  //    Creating Events
  // =======================
  const thresholdValue = 100;
  masiSvg.append("line")
  .attr("x1", 0)
  .attr("x2", wIdth + edge.right - 35)
  .attr("y1", masiY(thresholdValue))
  .attr("y2", masiY(thresholdValue))
  .attr("stroke", "#660033")
  .attr("stroke-dasharray", "4 2")
  .style("opacity", "0.5"); // makes the line dashed

  masiSvg.append("rect")
    .attr("x", wIdth + edge.right - 35) // position it a bit to the right of the chart
    .attr("y", masiY(thresholdValue) - 5)
    .attr("width", 45)
    .attr("height", 10)
    .attr("fill", "black");
  
  masiSvg.append("text")
    .attr("x", wIdth + edge.right - 33)
    .attr("y", masiY(thresholdValue) + 7)
    .text(thresholdValue)
    .attr("fill", "lightskyblue")
    .style("font-size", "9px");
  
});

// ======================
//    Volume Widget
// ======================
const files = ['data/ohlc/airtelmw.json', 'data/ohlc/bh.json', 'data/ohlc/illovo.json', 'data/ohlc/nbm.json', 'data/ohlc/tnm.json', 'data/ohlc/nitl.json', 'data/ohlc/nico.json', 'data/ohlc/nbs.json', 'data/ohlc/oldmutual.json', 'data/ohlc/fdh.json', 'data/ohlc/fmbch.json', 'data/ohlc/icon_properties.json', 'data/ohlc/mpico.json', 'data/ohlc/press_corp.json', 'data/ohlc/std_bank.json', 'data/ohlc/sunbird.json'];

const wFiles = ['data/ohlc/w_ohlc/airtelmw.json', 'data/ohlc/w_ohlc/bh.json', 'data/ohlc/w_ohlc/fdh.json', 'data/ohlc/w_ohlc/fmbch.json', 'data/ohlc/w_ohlc/icon_properties.json', 'data/ohlc/w_ohlc/illovo.json', 'data/ohlc/w_ohlc/mpico.json', 'data/ohlc/w_ohlc/nbm.json', 'data/ohlc/w_ohlc/nbs.json', 'data/ohlc/w_ohlc/nico.json', 'data/ohlc/w_ohlc/nitl.json', 'data/ohlc/w_ohlc/oldmutual.json', 'data/ohlc/w_ohlc/press_corp.json', 'data/ohlc/w_ohlc/std_bank.json', 'data/ohlc/w_ohlc/sunbird.json', 'data/ohlc/w_ohlc/tnm.json'];

const volWeek = document.getElementById('volDb');
const volDay = document.getElementById('volDa');

let pull = [];
let volTime = "";

function pushSource() {
  if (volTime === "W1") {
    pull = wFiles;
  }
  else if (volTime === "D1") {
    pull = files;
  }
  else {
    pull = files;
    promise();
    volDay.style.cssText = `
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.5);
    `;
  }
}
pushSource();

function promise() {
// Fetch data from files
Promise.all(pull.map(file => d3.json(file)))
  .then(datasets => {
    
    // Aggregate volumes
    const aggregatedData = {};
    datasets.forEach(data => {
      data.ohlc.forEach(d => {
        aggregatedData[data.symbol] = d.volume;
      });
    });

    // Convert to array and sort
    const sortedData = Object.entries(aggregatedData)
      .map(([symbol, volume]) => ({ symbol, volume }))
      .sort((a, b) => b.volume - a.volume);
      
  
    // Create bar chart with sortedData
    const margin = { top: 20, right: 10, bottom: 20, left: 50 };
    const width = 335 - margin.left - margin.right;
    const height = 305 - margin.top - margin.bottom;
    
    let svg = d3.select('#vol-container')
      .selectAll('*')
      .remove();
      
    svg = d3.select('#vol-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
    const y = d3.scaleBand()
      .domain(sortedData.map(d => d.symbol))
      .range([0, height])
      .padding(0.2);
    
    const x = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.volume)])
      .range([0, width]);
      
    svg.selectAll('rect').remove();
    svg.selectAll('g').remove();
    
    svg.selectAll('rect')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', d => y(d.symbol))
      .attr('width', d => x(d.volume))
      .attr('height', y.bandwidth())
      .attr('stroke', 'rgba(0, 0, 0, 0.7)')
      .attr('fill', 'lightskyblue');
    
    // Add Y-axis (symbol names)
    svg.append('g')
      .call(d3.axisLeft(y)
      .tickSize(3)
      .tickPadding(5)
    );
    
    // Add X-axis (volume)
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
      .ticks(5)
      .tickSize(3)
    );
    
          
    // Get top 5 companies
    const top5 = sortedData.slice(0, 5);
      
    // Update existing elements
    const volumeCards = document.querySelectorAll('.volume-card');
      top5.forEach((company, index) => {
        const card = volumeCards[index];
        if (card) {
          card.querySelector('h3').textContent = company.symbol;
          card.querySelector('span').textContent = company.volume.toLocaleString();
        }
    });
  })
  .catch(error => console.error(error));
}
// --------------------
//  Timeframe Buttons
// --------------------
  volDay.addEventListener('click', () => {
    volTime = "D1";
    pushSource();
    promise();
    volDay.style.cssText = `
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.5);
    `;
    volWeek.style.background = '#c1ff72';
  });
  volWeek.addEventListener('click', () => {
    volTime = "W1";
    pushSource();
    promise();
    volWeek.style.cssText = `
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.5);
    `;
    volDay.style.background = '#c1ff72';
  });

  
// =============================
//   SECTOR COMPARISON SECTION
// =============================
const visibleCount = 20;

// Fetch data from JSON files
const telecomSector = [d3.json('data/ohlc/tnm.json'), d3.json('data/ohlc/airtelmw.json')];
const realEstateSector = [d3.json('data/ohlc/icon_properties.json'), d3.json('data/ohlc/mpico.json')];
const hospitalitySector = [d3.json('data/ohlc/sunbird.json'), d3.json('data/ohlc/bh.json')];
const bankingSector = [d3.json('data/ohlc/std_bank.json'), d3.json('data/ohlc/fdh.json'), d3.json('data/ohlc/nbm.json'), d3.json('data/ohlc/nbs.json'),];
const assetManagementSector = [d3.json('data/ohlc/fmbch.json'), d3.json('data/ohlc/nico.json'), d3.json('data/ohlc/nitl.json'), d3.json('data/ohlc/oldmutual.json'), d3.json('data/ohlc/press_corp.json')];
const industrialSector = [d3.json('data/ohlc/illovo.json')];

// buttons
const selectSector = document.querySelector ('.vts-button');
const sectorBox = document.getElementById('select-sector');
const corporationBox = document.getElementById('select-company');
const valueTrendTitle = document.getElementById('val-title');
const counta = document.querySelectorAll('.counta');
const telSa = document.getElementById('za');
const rESa = document.getElementById('zb');
const baSa = document.getElementById('zc');
const aMSa = document.getElementById('zd');
const hOSa = document.getElementById('zf');
const iNSa = document.getElementById('ze');

selectSector.addEventListener('click', () => {
  selectSector.style.cssText = `
    transform: translateY(0.1rem);
    background: lightgrey;
  `;
  setTimeout ( () => {
    selectSector.style.cssText = `
      transform: translateY(0);
      background: #c1ff72;
    `;
  }, 300);
  sectorBox.style.display = 'flex';
});

let sector = telecomSector;
let companyClicked = "No";
let selectedCounter = "Airtel";

  // ======================
  //   Buttons & Controls
  // ======================
  telSa.addEventListener('click', (e) => {
  e.stopPropagation();
  sectorBox.style.display = 'none';
  corporationBox.style.display = 'flex';
  const sbAirtel = document.getElementById('sa');
    sbAirtel.style.display = 'block';
    sbAirtel.addEventListener('click', (e) => {
      e.stopPropagation();
      counta.forEach(item => {
        item.style.display = 'none';
      });
      sectorBox.style.display = 'none';
      corporationBox.style.display = 'none';
      sector = telecomSector;
      selectSector.textContent = 'Airtel Mw';
      valueTrendTitle.textContent = 'Telecommunications..';
      selectedCounter = "Airtel";
      companyClicked = "Yes";
      newPromise();
    });
  const sbTnm= document.getElementById('sp');
    sbTnm.style.display = 'block';
    sbTnm.addEventListener('click', () => {
      e.stopPropagation();
      counta.forEach(item => {
        item.style.display = 'none';
      });
      sectorBox.style.display = 'none';
      corporationBox.style.display = 'none';
      sector = telecomSector;
      selectSector.textContent = 'TNM';
      valueTrendTitle.textContent = 'Telecommunications..';
      selectedCounter = "TNM";
      companyClicked = "Yes";
      newPromise();
    });
  });
  
  rESa.addEventListener('click', (e) => {
    e.stopPropagation();
    sectorBox.style.display = 'none';
    corporationBox.style.display = 'flex';
    const sbIcon = document.getElementById('se');
      sbIcon.style.display = 'block';
      sbIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = realEstateSector;
        selectSector.textContent = 'Icon';
        valueTrendTitle.textContent = 'Real Estate Sector';
        selectedCounter = "Icon";
        companyClicked = "Yes";
        newPromise();
      });
    const sbMpico = document.getElementById('sg');
      sbMpico.style.display = 'block';
      sbMpico.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = realEstateSector;
        selectSector.textContent = 'Mpico';
        valueTrendTitle.textContent = 'Real Estate Sector';
        selectedCounter = "Mpico";
        companyClicked = "Yes";
        newPromise();
      });
  });
  
  baSa.addEventListener('click', (e) => {
    e.stopPropagation();
    sectorBox.style.display = 'none';
    corporationBox.style.display = 'flex';
    const sbNBM = document.getElementById('sh');
    sbNBM.style.display = 'block';
    sbNBM.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = bankingSector;
        selectSector.textContent = 'NBM';
        valueTrendTitle.textContent = 'Banking Sector';
        selectedCounter = "NBM";
        companyClicked = "Yes";
        newPromise();
      });
    const sbNBS = document.getElementById('si');
    sbNBS.style.display = 'block';
    sbNBS.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = bankingSector;
        selectSector.textContent = 'NBS';
        valueTrendTitle.textContent = 'Banking Sector';
        selectedCounter = "NBS";
        companyClicked = "Yes";
        newPromise();
      });
    const sbFDHB = document.getElementById('sc');
    sbFDHB.style.display = 'block';
    sbFDHB.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = bankingSector;
        selectSector.textContent = 'FDHB';
        valueTrendTitle.textContent = 'Banking Sector';
        selectedCounter = "FDHB";
        companyClicked = "Yes";
        newPromise();
      });
    const sbSTDB = document.getElementById('sn');
    sbSTDB.style.display = 'block';
    sbSTDB.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = bankingSector;
        selectSector.textContent = 'STDB';
        valueTrendTitle.textContent = 'Banking Sector';
        selectedCounter = "STDB";
        companyClicked = "Yes";
        newPromise();
      });
  });
  
  aMSa.addEventListener('click', (e) => {
    e.stopPropagation();
    sectorBox.style.display = 'none';
    corporationBox.style.display = 'flex';
    const sbFmbch = document.getElementById('sd');
    sbFmbch.style.display = 'block';
    sbFmbch.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = assetManagementSector;
        selectSector.textContent = 'FMBCH';
        valueTrendTitle.textContent = 'Asset Management..';
        selectedCounter = "FMBCH";
        companyClicked = "Yes";
        newPromise();
      });
    const sbNico = document.getElementById('sj');
    sbNico.style.display = 'block';
    sbNico.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = assetManagementSector;
        selectSector.textContent = 'NICO';
        valueTrendTitle.textContent = 'Asset Management..';
        selectedCounter = "NICO";
        companyClicked = "Yes";
        newPromise();
      });
    const sbNitl = document.getElementById('sk');
    sbNitl.style.display = 'block';
    sbNitl.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = assetManagementSector;
        selectSector.textContent = 'NITL';
        valueTrendTitle.textContent = 'Asset Management..';
        selectedCounter = "NITL";
        companyClicked = "Yes";
        newPromise();
      });
    const sbPcl = document.getElementById('sm');
    sbPcl.style.display = 'block';
    sbPcl.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = assetManagementSector;
        selectSector.textContent = 'PCL';
        valueTrendTitle.textContent = 'Asset Management..';
        selectedCounter = "PCL";
        companyClicked = "Yes";
        newPromise();
      });
    const sbOlmu = document.getElementById('sl');
    sbOlmu.style.display = 'block';
    sbOlmu.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = assetManagementSector;
        selectSector.textContent = 'OLMU';
        valueTrendTitle.textContent = 'Asset Management..';
        selectedCounter = "OLMU";
        companyClicked = "Yes";
        newPromise();
      });
  });
  
  hOSa.addEventListener('click', (e) => {
    e.stopPropagation();
    sectorBox.style.display = 'none';
    corporationBox.style.display = 'flex';
    const sbBhl = document.getElementById('sb');
    sbBhl.style.display = 'block';
    sbBhl.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = hospitalitySector;
        selectSector.textContent = 'BHL';
        valueTrendTitle.textContent = 'Hospitality Sector';
        selectedCounter = "BHL";
        companyClicked = "Yes";
        newPromise();
      });
    const sbSunbird = document.getElementById('so');
    sbSunbird.style.display = 'block';
    sbSunbird.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = hospitalitySector;
        selectSector.textContent = 'Sunbird';
        valueTrendTitle.textContent = 'Hospitality Sector';
        selectedCounter = "Sunbird";
        companyClicked = "Yes";
        newPromise();
      });
  });
  
  iNSa.addEventListener('click', (e) => {
    e.stopPropagation();
    sectorBox.style.display = 'none';
    corporationBox.style.display = 'flex';
    const sbIllovo = document.getElementById('sf');
    sbIllovo.style.display = 'block';
    sbIllovo.addEventListener('click', (e) => {
        e.stopPropagation();
        counta.forEach(item => {
          item.style.display = 'none';
        });
        sectorBox.style.display = 'none';
        corporationBox.style.display = 'none';
        sector = industrialSector;
        selectSector.textContent = 'Illovo';
        valueTrendTitle.textContent = 'Industrial Sector';
        selectedCounter = "Illovo";
        companyClicked = "Yes";
        newPromise();
      });
  });

function newPromise() {
  Promise.allSettled(sector).then((results) => {
    const dataArray = results.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error('Error fetching data:', result.reason);
        return null;
      }
    }).filter((data) => data !== null);
  
    if (dataArray.length === 0) {
      console.error('No data available');
      return;
    }
  
    const dates = dataArray[0].ohlc.map(d => d.date);
    const values = dataArray.map(data => data.ohlc.map(d => d.close * d.volume));
  
    // Calculate sector average
    const sectorValueAvg = dates.map((date, i) => {
      const sum = values.reduce((acc, curr) => acc + curr[i], 0);
      return sum / values.length;
    });
  
    // Select one company (e.g., data1)
    if (selectedCounter === "Airtel") {
      let selectedCompany = dataArray[1].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "TNM") {
      let selectedCompany = dataArray[0].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "Icon") {
      let selectedCompany = dataArray[0].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "Mpico") {
      let selectedCompany = dataArray[1].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "NBM") {
      let selectedCompany = dataArray[2].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "NBS") {
      let selectedCompany = dataArray[3].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "STDB") {
      let selectedCompany = dataArray[0].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "FDHB") {
      let selectedCompany = dataArray[1].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "FMBCH") {
      let selectedCompany = dataArray[0].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "NICO") {
      let selectedCompany = dataArray[1].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "NITL") {
      let selectedCompany = dataArray[2].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "OLMU") {
      let selectedCompany = dataArray[3].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "PCL") {
      let selectedCompany = dataArray[4].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "BHL") {
      let selectedCompany = dataArray[1].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "Sunbird") {
      let selectedCompany = dataArray[0].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else if (selectedCounter === "Illovo") {
      let selectedCompany = dataArray[0].ohlc;
      const companyValues = selectedCompany.map(d => d.close * d.volume);
      const divergence = companyValues - sectorValueAvg;
      // Create chart data
      const chartData = dates.map((date, i) => ({
        date,
        divergence: companyValues[i] - sectorValueAvg[i]
      }));
      // Render chart
        createDivergingChart(chartData);
      if (companyClicked !== "Yes") {
        createWidgetChart(chartData);
      }
    }
    else {
      let selectedCompany = dataArray[1].ohlc;
    }
  });
}
newPromise();

function createDivergingChart(data) {
  const margin = { top: 20, right: 60, bottom: 10, left: 30 };
  const width = 350 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  
  
  startIndex = Math.max(
  0,
  Math.min(startIndex, data.length - visibleCount)
  );
  
  
  const visibleData = data.slice(-visibleCount);
  
  let svg = d3.select('#sect-container')
      .selectAll('*')
      .remove();
      
  svg = d3.select('#sect-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom + 20)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


  const maxVal = Math.max(...visibleData.map(d => Math.abs(d.divergence * 1.3))) || 1;
  
  const x = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([-15, width - 10])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([-maxVal, maxVal])
    .range([height - 20, 0]);

  svg.append('g')
    .attr('transform', `translate(0, ${height - 16})`)
    .call(d3.axisBottom(x)
      .tickValues(
        visibleData.filter((_, i) => i % 2 === 0).map(d => d.date)
      )
    )
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");
    
  svg.append('line')
    .attr("x1", margin.left - 45)
    .attr("x2", width)
    .attr("y1", (height/2) - 10)
    .attr("y2", (height/2) - 10)
    .attr("stroke", "black");

  svg.append('g')
    .attr('transform', `translate(${width},0)`)
    .call(d3.axisRight(y)
      .tickSize(-width - 15))
    .selectAll("line")
    .attr("stroke", "#ddd")
    .attr("stroke-opacity", 0.5);
    
  
  svg.selectAll('.line')
    .data(visibleData)
    .enter()
    .append('line')
    .style('transform', 'translateX(-15.3rem)')
    .attr("x1", d => x(d.date) * 2)
    .attr("x2", d => x(d.date) * 2)
    .attr("y1", margin.top - 20)
    .attr("y2", height - 18)
    .attr("stroke", "rgba(0, 0, 0, 0.2)")
    .attr("stroke-width", "0.2");
  
  const svgg = svg.append("g");
  svgg.selectAll('.bar')
    .data(visibleData)
    .enter()
    .append('rect')
    .attr('x', d => x(d.date))
    .attr('y', d => d.divergence > 0 ? y(d.divergence) : y(0))
    .attr('width', x.bandwidth())
    .attr('height', d => Math.abs(y(d.divergence) - y(0)))
    .attr('fill', d => d.divergence > 0 ? 'magenta' : '#660033')
    .attr("stroke", "black")
    .attr("stroke-width", "0.3");
    
    
    function updateChart(data) {
    
      const margin = { top: 20, right: 60, bottom: 10, left: 30 };
      const width = 350 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
      
      
      startIndex = Math.max(
      0,
      Math.min(startIndex, data.length - visibleCount)
      );
      
      const visibleData = data.slice(startIndex, startIndex + visibleCount);
    
    
      const maxVal = Math.max(...visibleData.map(d => Math.abs(d.divergence * 1.3))) || 1;
      
      const x = d3.scaleBand()
        .domain(visibleData.map(d => d.date))
        .range([-15, width - 10])
        .padding(0.2);
    
      const y = d3.scaleLinear()
        .domain([-maxVal, maxVal])
        .range([height - 20, 0]);
        
        svg.selectAll('g').remove();
        svg.selectAll('line').remove();
    
      svg.append('g')
        .attr('transform', `translate(0, ${height - 16})`)
        .call(d3.axisBottom(x)
          .tickValues(
            visibleData.filter((_, i) => i % 2 === 0).map(d => d.date)
          )
        )
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
        
      svg.append('line')
        .attr("x1", margin.left - 45)
        .attr("x2", width)
        .attr("y1", (height/2) - 10)
        .attr("y2", (height/2) - 10)
        .attr("stroke", "black");
    
      svg.append('g')
        .attr('transform', `translate(${width},0)`)
        .call(d3.axisRight(y)
          .tickSize(-width - 15))
        .selectAll("line")
        .attr("stroke", "#ddd")
        .attr("stroke-opacity", 0.5);
        
      
      svg.selectAll('.line')
        .data(visibleData)
        .enter()
        .append('line')
        .style('transform', 'translateX(-15.3rem)')
        .attr("x1", d => x(d.date) * 2)
        .attr("x2", d => x(d.date) * 2)
        .attr("y1", margin.top - 20)
        .attr("y2", height - 18)
        .attr("stroke", "rgba(0, 0, 0, 0.2)")
        .attr("stroke-width", "0.2");
      
      const svgg = svg.append("g");
      svgg.selectAll('.bar')
        .data(visibleData)
        .enter()
        .append('rect')
        .attr('x', d => x(d.date))
        .attr('y', d => d.divergence > 0 ? y(d.divergence) : y(0))
        .attr('width', x.bandwidth())
        .attr('height', d => Math.abs(y(d.divergence) - y(0)))
        .attr('fill', d => d.divergence > 0 ? 'magenta' : '#660033')
        .attr("stroke", "black")
        .attr("stroke-width", "0.3");
    
    }

  // drag
  const overlay = svg.append('rect')
    .attr("x", -30)
    .attr("y", -30)
    .attr("width", width + margin.left + 60)
    .attr("height", height + margin.top + margin.bottom + 40)
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
  
        const shift = Math.trunc(dragAccumulator / pixelsPerCandle);
        if (shift !== 0) {
          startIndex -= shift;
          startIndex = Math.max(
            0,
            Math.min(startIndex, data.length - visibleCount)
          );
  
          dragAccumulator -= shift * pixelsPerCandle;
         
        
          updateChart(data);
        }
      })
      .on("end", () => overlay.style("cursor", "grab"))
  );
}

// ==================
//   WIDGET VISUAL
// ==================
function createWidgetChart(data) {
  const margin = { top: 4, right: 12, bottom: 2, left: 6 };
  const width = 103 - margin.left - margin.right;
  const height = 100 - margin.top - margin.bottom;
  
  let startIndex = 0;
  
  startIndex = Math.max(
  0,
  Math.min(startIndex, data.length - visibleCount)
  );
  
  
  const visibleData = data.slice(-visibleCount);

  const svg = d3.select('#vtw-inner')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom + 20)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


  const maxVal = Math.max(...visibleData.map(d => Math.abs(d.divergence))) || 1;
  
  const x = d3.scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([-15, width - 10])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([-maxVal, maxVal])
    .range([height - 20, 0]);

  svg.append('g')
    .attr('transform', `translate(0, ${height - 16})`)
    .call(d3.axisBottom(x)
      .tickValues(
        visibleData.filter((_, i) => i % 2 === 0).map(d => d.date)
      )
    )
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");
    
  svg.append('line')
    .attr("x1", margin.left - 45)
    .attr("x2", width)
    .attr("y1", (height/2) - 10)
    .attr("y2", (height/2) - 10)
    .attr("stroke", "black");

  svg.append('g')
    .attr('transform', `translate(${width},0)`)
    .call(d3.axisRight(y)
      .tickSize(2)
    );
  
  svg.selectAll('.line')
    .data(visibleData)
    .enter()
    .append('line')
    .style('transform', 'translateX(-15.3rem)')
    .attr("x1", d => x(d.date) * 2)
    .attr("x2", d => x(d.date) * 2)
    .attr("y1", margin.top - 20)
    .attr("y2", height - 18)
    .attr("stroke", "rgba(0, 0, 0, 0.2)")
    .attr("stroke-width", "0.2");

  svg.selectAll('.bar')
    .data(visibleData)
    .enter()
    .append('rect')
    .attr('x', d => x(d.date))
    .attr('y', d => d.divergence > 0 ? y(d.divergence) : y(0))
    .attr('width', x.bandwidth())
    .attr('height', d => Math.abs(y(d.divergence) - y(0)))
    .attr('fill', d => d.divergence > 0 ? 'magenta' : '#660033')
    .attr("stroke", "black")
    .attr("stroke-width", "0.3");
}




