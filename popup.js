

function updateCount() {
  document.addEventListener("DOMContentLoaded", function() {
    // Code to access DOM element here
    console.log("hello 1");
    var count = localStorage.getItem("count") || 0;
    console.log("count: ", count);
    document.getElementById("count").textContent = count;
  });
}

updateCount();


chrome.browserAction.onClicked.addListener(() => {
  updateCount();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && "count" in changes) {
    updateCount();
  }
});
