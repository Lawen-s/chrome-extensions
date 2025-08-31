# 드래그하면 영어로 번역할 수 있는 익스텐션입니다.

## 📖 프로젝트 개요

Medium Global Translator는 Medium 웹사이트에서 텍스트를 드래그하면 Google Translate API를 사용하여 한국어로 번역해주는 Chrome 확장 프로그램입니다.

## ✨ 주요 기능

- **드래그 번역**: Medium 웹페이지에서 텍스트를 드래그하면 자동으로 번역
- **Google Translate API 연동**: 정확한 번역 결과 제공
- **사용자 친화적 UI**: 깔끔한 팝업으로 번역 결과 표시
- **API 키 설정**: 개인 Google Cloud API 키로 안전한 사용
- **중복 요청 방지**: 동일한 텍스트의 중복 번역 요청 방지

## 🚀 설치 및 사용법

### 1. 설치

1. 이 저장소를 클론하거나 다운로드
2. Chrome 브라우저에서 `chrome://extensions/` 접속
3. "개발자 모드" 활성화
4. "압축해제된 확장 프로그램을 로드합니다" 클릭
5. 프로젝트 폴더 선택

### 2. API 키 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Cloud Translation API 활성화
3. API 키 생성
4. 확장 프로그램 아이콘 클릭 → "번역기 옵션 설정하기"
5. 생성된 API 키 입력 후 저장

### 3. 사용법

1. Medium 웹사이트 접속
2. 번역하고 싶은 영어 텍스트 드래그
3. 자동으로 번역 팝업이 나타남
4. 번역 결과 확인 후 "확인" 버튼 클릭

## 🏗️ 프로젝트 구조

```
translate-word/
├── manifest.json          # 확장 프로그램 설정 파일
├── background.js          # 백그라운드 서비스 워커
├── content.js            # 웹페이지에 주입되는 스크립트
├── options.html          # API 키 설정 페이지
├── options.js            # 옵션 페이지 로직
├── icons/                # 확장 프로그램 아이콘
│   └── icon.png
└── README.md             # 프로젝트 설명서
```

## 🔧 기술 스택

- **Chrome Extension Manifest V3**: 최신 확장 프로그램 표준
- **Google Cloud Translation API**: 정확한 번역 서비스
- **Vanilla JavaScript**: 순수 자바스크립트로 구현
- **Chrome Storage API**: 설정 데이터 저장
- **Service Worker**: 백그라운드 작업 처리

## 📁 파일별 역할

### `manifest.json`

- 확장 프로그램의 메타데이터 및 권한 설정
- Medium 웹사이트에서만 동작하도록 제한
- 필요한 권한 및 호스트 권한 정의

### `background.js`

- Google Translate API와의 통신 처리
- 사용자 언어 설정에 따른 번역 요청
- API 키 검증 및 에러 처리

### `content.js`

- 웹페이지에서 텍스트 선택 감지
- 번역 요청 및 결과 표시
- 커스텀 팝업 UI 구현
- 중복 요청 방지 로직

### `options.html` & `options.js`

- Google API 키 설정 인터페이스
- Chrome Storage를 통한 설정 저장/로드

## 🔐 보안 및 개인정보

- **API 키 보안**: 사용자의 개인 Google Cloud API 키만 사용
- **데이터 전송**: 선택된 텍스트만 Google 서버로 전송
- **권한 최소화**: 필요한 최소한의 권한만 요청

## 📝 문제 해결

### API 키 오류

- Google Cloud Console에서 API 키가 올바르게 생성되었는지 확인
- Cloud Translation API가 활성화되었는지 확인
- API 키에 적절한 제한사항이 설정되었는지 확인

### 번역이 작동하지 않는 경우

- 확장 프로그램이 Medium 웹사이트에서만 동작
- 개발자 도구 콘솔에서 에러 메시지 확인
- 확장 프로그램 재로드 시도

## 📝 라이선스

이 프로젝트는 개인 학습 및 사용 목적으로 제작되었습니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 이슈로 등록해주세요.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈로 남겨주세요.
