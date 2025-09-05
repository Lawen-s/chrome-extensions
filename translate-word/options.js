// Save API key to chrome.storage when save button is clicked
document.getElementById("saveButton").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value;
  chrome.storage.sync.set({ googleApiKey: apiKey }, () => {
    const status = document.getElementById("status");
    status.textContent = "API key has been saved.";
    setTimeout(() => {
      status.textContent = "";
    }, 2000);
  });
});

// Save language settings when language save button is clicked
document.getElementById("saveLanguageButton").addEventListener("click", () => {
  const targetLanguage = document.getElementById("targetLanguageSelect").value;
  chrome.storage.sync.set({ targetLanguage: targetLanguage }, () => {
    const languageStatus = document.getElementById("languageStatus");
    languageStatus.textContent = "Language settings have been saved.";
    setTimeout(() => {
      languageStatus.textContent = "";
    }, 2000);
  });
});

// Load saved settings when options page opens
document.addEventListener("DOMContentLoaded", () => {
  // Load API key
  chrome.storage.sync.get("googleApiKey", (data) => {
    if (data.googleApiKey) {
      document.getElementById("apiKeyInput").value = data.googleApiKey;
    }
  });
  
  // Load target language
  chrome.storage.sync.get("targetLanguage", (data) => {
    if (data.targetLanguage) {
      document.getElementById("targetLanguageSelect").value = data.targetLanguage;
    } else {
      // Set auto-detect as default
      document.getElementById("targetLanguageSelect").value = "auto";
    }
  });
});
