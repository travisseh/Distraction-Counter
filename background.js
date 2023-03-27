let count = parseInt(localStorage.getItem("count")) || 0;
let currentTabId = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.startsWith("http")) {

    const websiteNames = ["twitter.com", "linkedin.com", "instagram.com", "facebook.com", "youtube.com", "tiktok.com", "reddit.com"];

if (websiteNames.some(name => changeInfo.url.includes(name))) {
  if (tabId !== currentTabId) {
    currentTabId = tabId;
    count++;
    localStorage.setItem("count", count);
  }
}
  }

  // Update the extension icon with a notification badge
  chrome.browserAction.setBadgeText({ text: count.toString() });
  chrome.browserAction.setBadgeBackgroundColor({ color: "#FFF" });
});


chrome.alarms.create("resetCount", {
  when: getMidnight().getTime() + getTimeInSeconds("03:00:00") * 1000,
  periodInMinutes: 1440 // once per day
});

function getMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  return midnight;
}

function getTimeInSeconds(time) {
  const [hours, minutes, seconds] = time.split(':');
  return (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
}

// Listen for the alarm to go off and reset the count
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "resetCount") {
    count = 0;
    localStorage.setItem("count", count);
  }
});



