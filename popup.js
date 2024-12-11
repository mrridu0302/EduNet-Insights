document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("date");
  const totalTimeElement = document.getElementById("total-time");
  const tableBody = document.getElementById("engagement-table");

  dateElement.textContent = new Date().toLocaleDateString();

  chrome.runtime.sendMessage({ type: "getEngagementReport" }, (response) => {
    const data = response.data;
    if (!data || data.length === 0) return;

    let totalDuration = 0;

    data.forEach((entry) => {
      totalDuration += entry.duration;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.time}</td>
        <td>${entry.url}</td>
        <td>${entry.duration.toFixed(2)} seconds</td>
        <td>${entry.scrollDepth}</td>
      `;
      tableBody.appendChild(row);
    });

    totalTimeElement.textContent = totalDuration.toFixed(2);
  });
});
