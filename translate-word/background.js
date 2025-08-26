chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.text) {
    // 1. chrome.storage에서 API 키를 먼저 가져옵니다.
    chrome.storage.sync.get("googleApiKey", (data) => {
      const apiKey = data.googleApiKey;

      // 2. API 키가 없으면 번역을 시도하지 않습니다.
      if (!apiKey) {
        sendResponse({
          translatedText:
            "오류: API 키가 설정되지 않았습니다. 익스텐션 옵션에서 키를 입력해주세요.",
        });
        return;
      }

      // 3. API 키가 있으면 번역을 요청합니다.
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      // ... 이하 fetch 로직은 이전과 동일 ...
    });

    return true; // 비동기 응답을 위해 필수
  }
});
