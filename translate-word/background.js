// background.js (수정된 최종 버전)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text) {
    chrome.storage.sync.get('googleApiKey', (data) => {
      const apiKey = data.googleApiKey;

      if (!apiKey) {
        console.log("API 키가 설정되지 않았습니다.");
        // API 키가 없을 때도 "응답"을 보내서 채널을 닫아줌
        sendResponse({ translatedText: "오류: API 키가 설정되지 않았습니다." });
        return;
      }

      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      const targetLanguage = chrome.i18n.getUILanguage().split('-')[0];

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: request.text,
          source: 'en',
          target: targetLanguage,
          format: 'text'
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.translations) {
          const translatedText = data.data.translations[0].translatedText;
          // 성공 시 응답
          sendResponse({ translatedText: translatedText });
        } else {
          // API로부터 에러 응답이 왔을 때도 응답
          sendResponse({ translatedText: "번역 실패: " + data.error.message });
        }
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        // fetch 네트워크 에러가 발생했을 때도 응답
        sendResponse({ translatedText: "번역 중 오류가 발생했습니다." });
      });
    });

    return true; // 비동기 응답을 위해 이 줄은 필수입니다.
  }
});