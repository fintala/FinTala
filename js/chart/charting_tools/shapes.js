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

const drawingState = {
  mode: "idle",      // "idle" | "trendline"
  phase: null,       // null | "armed" | "anchored"
  draft: null
};

//Trendline Edit On
const trendlineToolBtn = document.getElementById("trendline");

trendlineToolBtn.addEventListener("click", () => {
  openAlert();
  alertField.innerText = "The FinTala team is working on bringing more features. Trendline coming soon."
  //startTrendlineDrawing();
});