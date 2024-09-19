document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        document.getElementById('selected-text').textContent = selection[0];
    });

    document.getElementById('process-btn').addEventListener('click', function () {

        chrome.storage.sync.get(['parameters'], (result) => {
            let storedParams = result.parameters;
            var api = ''
            var key = ''
            var years = ''
            var language = ''
            

            if (storedParams) {
                api = storedParams.API || '';
                key = storedParams.Key || '';
                years = storedParams.Years || '';
                language = storedParams.Language || '';
            } else {
                console.error('Error: No patameters.');
            }
            let syscontent = "You are a helpful model. Always answer in " + language;
            
            let selectedText = document.getElementById('selected-text').textContent;
            let usercontent = 'Describe this text for me if I was '+years+' years old: ' + selectedText
            
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+key,
                },
                body: JSON.stringify({
                    model: 'openai/gpt-3.5-turbo',
                    temperature: 0.888,
                    max_tokens: 2048,
                    top_p: 1,
                    messages: [{ role: "system", content: syscontent }, { role: "user", content:  usercontent}]
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.choices && data.choices.length > 0) {
                        //document.getElementById('outputText').innerText = data.choices[0].message.content;
                        document.getElementById('result').textContent = data.choices[0].message.content;
                    } else {
                        console.error('Error: Unable to decrypt the text. Please try again.');
                    }
                })
                .catch(error => console.error('Error during decryption:', error));

        });
    });
});