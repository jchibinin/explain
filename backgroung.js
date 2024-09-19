chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getSelectedText") {
        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            chrome.tabs.sendMessage(sender.tab.id, { action: "returnSelectedText", selectedText: selection[0] });
        });
    }
});

let defaultParams = {
    API: '',
    Key: '',
    Years: '',
    Language: ''
};