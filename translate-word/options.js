// 저장 버튼 클릭 시 API 키를 chrome.storage에 저장
document.getElementById("saveButton").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value;
  chrome.storage.sync.set({ googleApiKey: apiKey }, () => {
    const status = document.getElementById("status");
    status.textContent = "API 키가 저장되었습니다.";
    setTimeout(() => {
      status.textContent = "";
    }, 2000);
  });
});

// 옵션 페이지가 열릴 때 저장된 키가 있으면 불러와서 보여주기
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("googleApiKey", (data) => {
    if (data.googleApiKey) {
      document.getElementById("apiKeyInput").value = data.googleApiKey;
    }
  });
});
