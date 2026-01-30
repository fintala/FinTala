const profile = document.getElementById('header-outer');
const prIcon = document.getElementById('pr-Icon');
const strecher = document.getElementById('strecher');
const subButton = document.getElementById('subContainer');
const subS = document.getElementById('subscribe');
const strechUp = document.getElementById('strech-up');

let strechClick = 1;

function closeBox() {
  setTimeout ( () => {
    profile.style.cssText = `
    animation: 3s vamos forwards;
    `;
    dashOverlay.style.display = 'none';
  }, 400);
}

prIcon.addEventListener("click", (e)=> {
  e.stopPropagation();
  profile.style.cssText = `
  display: block;
  animation: 0.7s zoomIn forwards;
  `;
  dashAlert.style.cssText = `
  display: flex;
  animation: 0.7s zoomIn forwards;
  `;
  dashOverlay.style.display = 'block';
  daField.textContent = 'The FinTala team is working on bringing more features. Profile details coming soon.';
});

function strechBox() {
  
  if (strechClick === 1) {
    subButton.style.cssText = `
    display: flex;
    `;
    strechUp.style.cssText = `
      transform-origin: center;
      transform: rotate(180deg);
    `;
    profile.style.height = 'calc(60vh + 8rem)'
    strechClick = 2;
  }else if (strechClick === 2) {
    subButton.style.cssText = `
    display: none;
    `;
    strechUp.style.cssText = `
      transform-origin: center;
      transform: rotate(0);
    `;
    profile.style.height = '60vh';
    strechClick = 1;
  }
}

// ======================
//    alert & overlay
// ======================
const dashAlert = document.getElementById('dash-alert');
const daField = document.getElementById('dashAlert-field');
const closedashAlert = document.getElementById('close-dashAlert');
const dashOverlay = document.getElementById('dash-overlay');

closedashAlert.addEventListener("click", () => {
  dashAlert.style.display = 'none';
});

// =======================
//  Nickname input logic
// =======================
const openInput = document.getElementById('nickName');
const closeInput = document.getElementById('nickname-close');
const inputBox = document.getElementById('nickname-child');
const nicknameEntry = document.getElementById('nickname-field');
const nicknameSbt = document.getElementById('nickname-submit');
const dashName = document.getElementById('pr-Name');


openInput.addEventListener("click", (e) => {
  setTimeout ( () => {
    openInput.textContent = 'Editing...';
    profile.style.height = '63vh';
    inputBox.style.display = 'flex';
    subButton.style.display = 'none';
    strechUp.style.cssText = `
      transform-origin: center;
      transform: rotate(0);
    `;
    strechClick = 1;
  }, 400);
});

closeInput.addEventListener("click", () => {
  setTimeout ( () => {
    pushUsername();
    profile.style.height = '63vh';
    inputBox.style.display = 'none';
    subButton.style.display = 'none';
    strechUp.style.cssText = `
      transform-origin: center;
      transform: rotate(0);
    `;
    strechClick = 1;
  }, 400);
});

// =========================
//  Correcting the username
// =========================

let savedText = [];

nicknameEntry.addEventListener("input", (e) => {
  e.stopPropagation();
  let extractedText = e.target.value;
  nicknameSbt.addEventListener('click', (e) => {
    openInput.textContent = extractedText;
    savedText = extractedText;
    nicknameEntry.value = '';
    localStorage.setItem("fintala_logged_in", savedText);
    pushUsername();
  });
  
});

function pushUsername() {
  setTimeout ((e) => {
      dashName.textContent = localStorage.getItem("fintala_logged_in", savedText);
      
      let namecopy = dashName.textContent;

      function copyName() {
        setTimeout(() => {
          if (dashName.textContent === "") {
            openInput.textContent = '[Click to edit nickname]';
          } else {
            openInput.textContent = namecopy;
          }
        }, 300);
      }
      copyName();
      
    }, 300);
}
pushUsername();

// ===========================
//  Activating Volume Widget
// ===========================
const volWidget = document.getElementById('volume-overview');
const volOverlay = document.getElementById('overview-overlay');
const volDetail = document.getElementById('vol-detail');
const closeVolDetail = document.getElementById('close-volDet');

volWidget.addEventListener('click', (e)=> {
  volOverlay.style.display = 'block';
  setTimeout( () => {
    volOverlay.style.display = 'none';
  }, 3000);
  
  volOverlay.addEventListener('click', () => {
    const dashSect = document.querySelector('body');
    e.stopPropagation();
    setTimeout (() => {
      volDetail.style.display = 'block';
      dashSect.style.overflow = 'hidden';
    }, 300);
    
    closeVolDetail.addEventListener('click', () => {
      e.stopPropagation();
      dashSect.style.cssText = `
      overflow-x: hidden;
      `;
      setTimeout (() => {
      volDetail.style.display = 'none';
    }, 300);
    });
  });
});

// ===========================
//   Activating Value Trends
// ===========================
const valueTrends = document.getElementById('sector-comparison');
const valTwidget = document.getElementById('valTrnd-widget');
const closeValTrnd = document.getElementById('close-valTrnd');
const valHelp = document.getElementById('val-help');
const valExplainer = document.getElementById('val-helpText');
const valOverlay = document.getElementById('valTrnd-overlay');

valTwidget.addEventListener('click', (e) => {
  const lockBody = document.querySelector('body');
  valOverlay.style.display = 'block';
  setTimeout( () => {
    valOverlay.style.display = 'none';
  }, 3000);
  
  valOverlay.addEventListener('click', () => {
    e.stopPropagation();
    setTimeout(()=> {
      valueTrends.style.display = 'block'
      lockBody.style.cssText = `
      overflow: hidden;
      `;
    }, 300);
    
    valHelp.addEventListener('click', () => {
      e.stopPropagation();
      setTimeout(()=> {
        valExplainer.style.display = 'flex'
      }, 300);
      setTimeout(()=> {
        valExplainer.style.display = 'none'
      }, 7000);
    });
    
    closeValTrnd.addEventListener('click', () => {
      e.stopPropagation();
      setTimeout(()=> {
        valueTrends.style.display = 'none';
        lockBody.style.cssText = `
          overflow-x: hidden;
          `;
      }, 300);
    });
  });
});


// ===========================
//  Pushing Data to Watchlist
// ===========================
let startIndex = 0;

function parseBhl() {
  setTimeout (() => {
    const bhlPrice = document.getElementById('bhlPrice');
    const bhlChange = document.getElementById('bhlChange');
    
    fetch('data/ohlc/bh.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      bhlPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      bhlChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          bhlChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          bhlChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          bhlChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 2000);
};
parseBhl();

function parseAmw() {
  setTimeout (() => {
    const amwPrice = document.getElementById('amwPrice');
    const amwChange = document.getElementById('amwChange');
  
    fetch('data/ohlc/airtelmw.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      amwPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      amwChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          amwChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          amwChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          amwChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1900);
};
parseAmw();

function parseNbm() {
  setTimeout (() => {
    const nbmPrice = document.getElementById('nbmPrice');
    const nbmChange = document.getElementById('nbmChange');
  
    fetch('data/ohlc/nbm.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      nbmPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      // =====================
      //   Updating Change %
      // =====================
      nbmChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          nbmChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          nbmChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          nbmChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1950);
};
parseNbm();

function parseIll() {
  setTimeout (() => {
    const illPrice = document.getElementById('illPrice');
    const illChange = document.getElementById('illChange');
  
    fetch('data/ohlc/illovo.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      illPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      illChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          illChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          illChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          illChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1950);
};
parseIll();

function parseTnm() {
  setTimeout (() => {
    const tnmPrice = document.getElementById('tnmPrice');
    const tnmChange = document.getElementById('tnmChange');
  
    fetch('data/ohlc/tnm.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      tnmPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      tnmChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          tnmChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          tnmChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          tnmChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1880);
};
parseTnm();

function parseNitl() {
  setTimeout (() => {
    const nitlPrice = document.getElementById('nitlPrice');
    const nitlChange = document.getElementById('nitlChange');
  
    fetch('data/ohlc/nitl.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      nitlPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      nitlChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          nitlChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          nitlChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          nitlChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1880);
};
parseNitl();

function parseNico() {
  setTimeout (() => {
    const nicoPrice = document.getElementById('nicoPrice');
    const nicoChange = document.getElementById('nicoChange');
  
    fetch('data/ohlc/nico.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      nicoPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      nicoChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          nicoChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          nicoChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          nicoChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1800);
};
parseNico();

function parseNbs() {
  setTimeout (() => {
    const nbsPrice = document.getElementById('nbsPrice');
    const nbsChange = document.getElementById('nbsChange');
  
    fetch('data/ohlc/nbs.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      nbsPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      nbsChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          nbsChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          nbsChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          nbsChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 2050);
};
parseNbs();

function parseOmu() {
  setTimeout (() => {
    const omuPrice = document.getElementById('omuPrice');
    const omuChange = document.getElementById('omuChange');
  
    fetch('data/ohlc/oldmutual.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      omuPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      omuChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          omuChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          omuChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          omuChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1750);
};
parseOmu();

function parseFdhb() {
  setTimeout (() => {
    const fdhbPrice = document.getElementById('fdhbPrice');
    const fdhbChange = document.getElementById('fdhbChange');
  
    fetch('data/ohlc/fdh.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      fdhbPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      fdhbChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          fdhbChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          fdhbChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          fdhbChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1750);
};
parseFdhb();

function parseFmb() {
  setTimeout (() => {
    const fmbPrice = document.getElementById('fmbPrice');
    const fmbChange = document.getElementById('fmbChange');
  
    fetch('data/ohlc/fmbch.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      fmbPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      fmbChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          fmbChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          fmbChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          fmbChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1750);
};
parseFmb();

function parseIcon() {
  setTimeout (() => {
    const iconPrice = document.getElementById('iconPrice');
    const iconChange = document.getElementById('iconChange');
  
    fetch('data/ohlc/icon_properties.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      iconPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      iconChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          iconChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          iconChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          iconChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1750);
};
parseIcon();

function parseMpico() {
  setTimeout (() => {
    const mpicoPrice = document.getElementById('mpicoPrice');
    const mpicoChange = document.getElementById('mpicoChange');
  
    fetch('data/ohlc/mpico.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      mpicoPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      mpicoChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          mpicoChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          mpicoChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          mpicoChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1750);
};
parseMpico();

function parsePcl() {
  setTimeout (() => {
    const pclPrice = document.getElementById('pclPrice');
    const pclChange = document.getElementById('pclChange');
  
    fetch('data/ohlc/press_corp.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      pclPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      pclChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          pclChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          pclChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          pclChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1750);
};
parsePcl();

function parseStd() {
  setTimeout (() => {
    const stdPrice = document.getElementById('stdPrice');
    const stdChange = document.getElementById('stdChange');
  
    fetch('data/ohlc/std_bank.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      stdPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      stdChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          stdChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          stdChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          stdChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1950);
};
parseStd();

function parseSunbird() {
  setTimeout (() => {
    const sunbirdPrice = document.getElementById('sunbirdPrice');
    const sunbirdChange = document.getElementById('sunbirdChange');
  
    fetch('data/ohlc/sunbird.json')
      .then(res => res.json())
      .then(raw => {
        data = raw.ohlc.map(d => ({
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: d.close
        }));
      
        window.__listData = data; // 👈 cache once
        
        initList(data);
      });
      
    function initList(data) {
      startIndex = Math.max(data.length - 1, data.length);
      push(window.__listData);
    }
    
    function  push() {
      const visibleData = data.slice(
        startIndex - 1,
        startIndex
      );
      
      const previousClose = data.slice(startIndex - 2, startIndex - 1);
      
      let currentPrice = visibleData.map(d=>d.close);
      let initialPrice = previousClose.map(d=>d.close);
      
      // =====================
      //    Updating Price
      // =====================
      sunbirdPrice.textContent = "MwK " + (visibleData.map(d => d.close)[0]/1).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      
      // =====================
      //   Updating Change %
      // =====================
      sunbirdChange.textContent = (((currentPrice - initialPrice) / currentPrice) * 100).toFixed(2) + " %";
      
      // -----------------------
      //   setting color state
      // -----------------------
      function pn() {
        if (currentPrice < initialPrice) {
          sunbirdChange.style.color = '#b00020';
        }
        if (currentPrice == initialPrice) {
          sunbirdChange.style.color = 'dimgray';
        }
        if (currentPrice > initialPrice) {
          sunbirdChange.style.color = 'mediumpurple';
        }
      }
      pn();
    };
  }, 1750);
};
parseSunbird();
// =========================
//  CHECKING USERTYPE
// =========================
//------------ New User Alert
let userId = localStorage.getItem("userId", "olduser");
if (userId !== "olduser") {
  setTimeout (() => {
    dashAlert.style.cssText = `
    display: flex;
    height: 20rem;
    `;
    daField.textContent = "Kindly note that the most recent price-data on this platform, is based on the previous business day's closing-information.                  You're strongly advised to visit the MSE site, if you want to refer to current price data.";
  }, 100);
  
  dashOverlay.style.display = 'block';
  closedashAlert.addEventListener('click', () => {
    localStorage.setItem("userId", "olduser");
    dashOverlay.style.display = 'none';
    dashAlert.style.display = 'none';
  });
}

subS.addEventListener("click", () => {
  dashOverlay.style.display = 'block';
  dashAlert.style.display = 'flex';
  daField.textContent = 'The FinTala team is working on bringing more features. Subscription coming soon.';
  closedashAlert.addEventListener('click', () => {
    dashOverlay.style.display = 'none';
    dashAlert.style.display = 'none';
  });
});

// =======================
//     Install Logic
// =======================
let deferredPrompt = null;

const overlay = document.getElementById("install-overlay");
const installBtn = document.getElementById("install-btn");

// Guard: never show again after install
if (localStorage.getItem("fintala-installed") === "true") {
  overlay.hidden = true;
}

// Capture install eligibility
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Optional delay so it doesn’t jump instantly
  setTimeout(() => {
    if (!localStorage.getItem("fintala-installed")) {
      overlay.hidden = false;
    }
  }, 6000);
});

// Install button logic
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    overlay.hidden = true;
  }

  deferredPrompt = null;
});

// Final confirmation from the browser
window.addEventListener("appinstalled", () => {
  localStorage.setItem("fintala-installed", "true");
  overlay.hidden = true;
});
