let engagementData = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "logPageData") {
    engagementData.push(message.data); // Simply append in the order of visits
    chrome.storage.local.set({ engagementData });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getEngagementReport") {
    chrome.storage.local.get("engagementData", (result) => {
      sendResponse({ data: result.engagementData || [] }); // Retrieve data in original order
    });
    return true;
  }
});
