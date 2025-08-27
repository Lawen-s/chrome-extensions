
// 번역 요청 중복 방지를 위한 플래그
let isTranslating = false;

// 사용자가 마우스 버튼을 놓는 순간(mouseup)에 실행될 이벤트를 등록합니다.
document.addEventListener('mouseup', function(event) {
    // 이미 번역 중이면 무시
    if (isTranslating) {
      return;
    }

    // 현재 페이지에서 선택된(드래그된) 텍스트를 가져옵니다.
    // .trim()은 양 끝의 공백을 제거해 줍니다.
    const selectedText = window.getSelection().toString().trim();
  
    // 선택된 텍스트가 있을 경우에만 아래 로직을 실행합니다.
    // (단순히 페이지를 클릭만 한 경우는 무시합니다)
    if (selectedText) {
      // 디버깅을 위해 콘솔에 선택된 텍스트를 출력합니다. (F12 > Console 탭에서 확인 가능)
      console.log("Selected Text:", selectedText);
      
      // 텍스트 선택을 즉시 해제하여 중복 요청 방지
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
        console.log('텍스트 선택 즉시 해제됨');
      }
      
      // 번역 시작 플래그 설정
      isTranslating = true;
  
      // background.js로 메시지를 보내 번역을 요청합니다.
      // 요청 데이터: { text: selectedText }
      // 응답 처리: function(response) { ... }
      chrome.runtime.sendMessage({ text: selectedText }, function(response) {
        // background.js로부터 응답을 받지 못하는 등 에러가 발생한 경우
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          showCustomPopup('번역 요청에 실패했습니다. 익스텐션 옵션에서 API 키가 올바르게 설정되었는지 확인해주세요.', 'error', selectedText);
          // 에러 발생 시에도 플래그 해제
          isTranslating = false;
          return;
        }
  
        // 응답이 성공적으로 오면, 커스텀 팝업으로 번역 결과를 보여줍니다.
        if (response && response.translatedText) {
          showCustomPopup(response.translatedText, 'success', selectedText);
        }
        
        // 번역 완료 후 플래그 해제
        isTranslating = false;
      });
    }
  });

// 커스텀 팝업을 생성하고 표시하는 함수
function showCustomPopup(text, type = 'success', sourceText = '') {
  // 기존 팝업이 있다면 제거
  const existingPopup = document.getElementById('translate-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // 팝업 제거 함수
  const removePopup = () => {
    console.log('팝업 제거 함수 실행');
    
    if (popup && popup.parentNode) {
      popup.parentNode.removeChild(popup);
      console.log('팝업이 DOM에서 제거됨');
    } else {
      console.log('팝업 또는 부모 노드를 찾을 수 없음');
    }
  };

  // 팝업 컨테이너 생성
  const popup = document.createElement('div');
  popup.id = 'translate-popup';
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    padding: 24px;
    max-width: 400px;
    width: 90%;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border: 1px solid #e1e5e9;
  `;

  // 팝업 내용 생성
  const content = document.createElement('div');
  
  if (type === 'success') {
    // 성공 시: 원본 텍스트와 번역 결과 표시
    const domain = window.location.hostname;
    
    content.innerHTML = `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 14px; color: #666; margin-bottom: 8px;">${domain} 내용:</div>
        <div style="font-size: 16px; color: #333; background: #f8f9fa; padding: 12px; border-radius: 8px; border-left: 4px solid #007bff;">${sourceText}</div>
      </div>
      <div style="margin-bottom: 20px;">
        <div style="font-size: 14px; color: #666; margin-bottom: 8px;">번역 결과:</div>
        <div style="font-size: 18px; color: #2c3e50; font-weight: 500; line-height: 1.4;">${text}</div>
      </div>
    `;
  } else {
    // 에러 시: 에러 메시지만 표시
    content.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div style="font-size: 16px; color: #dc3545; text-align: center;">⚠️ ${text}</div>
      </div>
    `;
  }

  // 확인 버튼 생성
  const confirmButton = document.createElement('button');
  confirmButton.textContent = '확인';
  confirmButton.style.cssText = `
    background: #28a745;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s;
  `;
  
  confirmButton.addEventListener('mouseenter', () => {
    confirmButton.style.background = '#218838';
  });
  
  confirmButton.addEventListener('mouseleave', () => {
    confirmButton.style.background = '#28a745';
  });

  // 팝업 닫기 이벤트
  confirmButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('확인 버튼 클릭됨');
    removePopup();
  });

  // ESC 키로 팝업 닫기
  const closeOnEsc = function(e) {
    if (e.key === 'Escape') {
      console.log('ESC 키 눌림');
      removePopup();
      document.removeEventListener('keydown', closeOnEsc);
    }
  };
  document.addEventListener('keydown', closeOnEsc);

  // 팝업 외부 클릭으로 닫기
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      console.log('팝업 외부 클릭');
      removePopup();
    }
  });

  // 요소들을 팝업에 추가
  popup.appendChild(content);
  popup.appendChild(confirmButton);

  // 페이지에 팝업 추가
  document.body.appendChild(popup);

  // 애니메이션 효과
  popup.style.opacity = '0';
  popup.style.transform = 'translate(-50%, -50%) scale(0.9)';
  
  setTimeout(() => {
    popup.style.transition = 'all 0.3s ease';
    popup.style.opacity = '1';
    popup.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);
}