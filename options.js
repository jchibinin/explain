// Check if chrome.storage.sync is available before accessing it
if (chrome.storage) {
    // Retrieve stored parameters and populate the input fields when options page is opened
    chrome.storage.sync.get(['parameters'], (result) => {
        let storedParams = result.parameters;

        if (storedParams) {
            document.getElementById('apiInput').value = storedParams.API || '';
            document.getElementById('keyInput').value = storedParams.Key || '';
            document.getElementById('yearsInput').value = storedParams.Years || '';
            document.getElementById('languageInput').value = storedParams.Language || '';
        }
    });

    // Save user preferences when save button is clicked
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('saveButton').addEventListener('click', () => {
            let userParams = {
                API: document.getElementById('apiInput').value,
                Key: document.getElementById('keyInput').value,
                Years: parseInt(document.getElementById('yearsInput').value),
                Language: document.getElementById('languageInput').value
            };
            chrome.storage.sync.set({ parameters: userParams });
        });
    });
} else {
    console.log('chrome.storage is not available.');
}