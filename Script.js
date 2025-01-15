const tips = [
  "Turn off notifications on your phone and computer.",
  "Create a dedicated and clean study space.",
  "Use noise-canceling headphones or play instrumental music.",
  "Set small, achievable goals for each session.",
  "Practice the Pomodoro technique: 25 minutes study, 5 minutes break.",
  "Remove unnecessary tabs and distractions from your browser.",
  "Reward yourself for completing tasks!"
];

let currentTipIndex = 0;

// Function to display dynamic tips
function showDynamicTips() {
  const tipElement = document.getElementById("dynamic-tip");
  tipElement.innerText = tips[currentTipIndex];
  currentTipIndex = (currentTipIndex + 1) % tips.length;
  setTimeout(showDynamicTips, 4000); // Change tip every 4 seconds
}

// Function to calculate study time
function calculateStudyTime() {
  const content = document.getElementById("content").value;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 250); // Assuming 250 words/min
  document.getElementById("result").innerText = `Estimated study time: ${minutes} minute(s).`;
}

// Function to extract text from an uploaded image
document.getElementById("file-input").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      Tesseract.recognize(reader.result, 'eng', { logger: (info) => console.log(info) })
        .then(({ data: { text } }) => {
          document.getElementById("content").value = text;
        })
        .catch((error) => {
          alert("Error processing image. Please try again.");
          console.error(error);
        });
    };
    reader.readAsDataURL(file);
  }
});

// Start the dynamic tips on page load
window.onload = showDynamicTips;
