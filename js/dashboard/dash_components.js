// List of JSON file paths
const files = ['data/ohlc/airtelmw.json', 'data/ohlc/bh.json', 'data/ohlc/illovo.json', 'data/ohlc/nbm.json', 'data/ohlc/tnm.json', 'data/ohlc/nitl.json', 'data/ohlc/nico.json', 'data/ohlc/nbs.json', 'data/ohlc/oldmutual.json', 'data/ohlc/fdh.json', 'data/ohlc/fmbch.json', 'data/ohlc/icon_properties.json', 'data/ohlc/mpico.json', 'data/ohlc/press_corp.json', 'data/ohlc/std_bank.json', 'data/ohlc/sunbird.json'];

const wFiles = ['data/ohlc/w_ohlc/airtelmw.json', 'data/ohlc/w_ohlc/bh.json', 'data/ohlc/w_ohlc/fdh.json', 'data/ohlc/w_ohlc/fmbch.json', 'data/ohlc/w_ohlc/icon_properties.json', 'data/ohlc/w_ohlc/illovo.json', 'data/ohlc/w_ohlc/mpico.json', 'data/ohlc/w_ohlc/nbm.json', 'data/ohlc/w_ohlc/nbs.json', 'data/ohlc/w_ohlc/nico.json', 'data/ohlc/w_ohlc/nitl.json', 'data/ohlc/w_ohlc/oldmutual.json', 'data/ohlc/w_ohlc/press_corp.json', 'data/ohlc/w_ohlc/std_bank.json', 'data/ohlc/w_ohlc/sunbird.json', 'data/ohlc/w_ohlc/tnm.json'];

let pull = [];
let volTime = sessionStorage.getItem("volumeTimeframe");

function  pushSource() {
  if (volTime === "W1") {
    pull = wFiles;
  }
  else if (volTime === "M1") {
    pull = 0;
  }
  else {
    pull = files;
  }
  
  console.log(volTime);
}
pushSource();

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
    
    const svg = d3.select('#vol-container')
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

  function drawVolumeChart() {
    
        svg.selectAll('rect').remove();
    
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
          
        svg.selectAll('g').remove();
    
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
          
    }
    const volWeek = document.getElementById('volDb');
volWeek.addEventListener('click', () => {
  sessionStorage.setItem("volumeTimeframe", "W1");
  pushSource();
  setTimeout(() => {
    drawVolumeChart();
  }, 100);
});
    
  })
  .catch(error => console.error(error));
  
// --------------------
//  Timeframe Buttons
// --------------------


  
// =============================
//   SECTOR COMPARISON SECTION
// =============================
const visibleCount = 20;

// Fetch data from JSON files
Promise.all([
  d3.json('data/ohlc/airtelmw.json'),
  d3.json('data/ohlc/tnm.json')
]).then(([data1, data2]) => {
  // Extract close and date arrays
  const dates = data1.ohlc.map(d => d.date);
  const values1 = data1.ohlc.map(d => d.close * d.volume);
  const values2 = data2.ohlc.map(d => d.close * d.volume);


  // Calculate sector average
  const sectorValueAvg = dates.map((date, i) => (values1[i] + values2[i]) / 2);

  // Select one company (e.g., data1)
  let selectedCompany = data2.ohlc;
  const companyValues = selectedCompany.map(d => d.close * d.volume);
  
  const divergence = companyValues - sectorValueAvg;

  // Create chart data
  const chartData = dates.map((date, i) => ({
  date,
  divergence: companyValues[i] - sectorValueAvg[i]
}));

  // Render chart
  createDivergingChart(chartData);
  createWidgetChart(chartData);
});


function createDivergingChart(data) {
  const margin = { top: 20, right: 60, bottom: 10, left: 30 };
  const width = 350 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  
  
  startIndex = Math.max(
  0,
  Math.min(startIndex, data.length - visibleCount)
  );
  
  
  const visibleData = data.slice(-visibleCount);
  
  const svg = d3.select('#sect-container')
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
    .attr('fill', d => d.divergence > 0 ? 'magenta' : 'red')
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
    
    
      const maxVal = Math.max(...visibleData.map(d => Math.abs(d.divergence))) || 1;
      
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
        .attr('fill', d => d.divergence > 0 ? 'magenta' : 'red')
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
    .attr('fill', d => d.divergence > 0 ? 'magenta' : 'red')
    .attr("stroke", "black")
    .attr("stroke-width", "0.3");
}




