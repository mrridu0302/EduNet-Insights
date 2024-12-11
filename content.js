let startTime = Date.now();
let scrollDepth = 0;

document.addEventListener("scroll", () => {
  const currentScroll = window.scrollY + window.innerHeight;
  const pageHeight = document.body.scrollHeight;
  scrollDepth = Math.max(scrollDepth, Math.min(100, (currentScroll / pageHeight) * 100));
});

window.addEventListener("beforeunload", () => {
  const duration = Date.now() - startTime;
  const data = {
    time: new Date().toLocaleTimeString(),
    url: window.location.href,
    duration: duration / 1000, // in seconds
    scrollDepth: `${scrollDepth}%`
  };
  chrome.runtime.sendMessage({ type: "logPageData", data });
});
