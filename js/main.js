var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        document.getElementById('sms_download').addEventListener('click', function (e) {
            var sms_ura = document.getElementById('sms_select').checked;
            chrome.tabs.executeScript({
                    code: 'var param1 = ' + sms_ura
                },
                function () {
                    chrome.tabs.executeScript({
                        file: 'js/sms_helper.js'
                    })
                });
        });
    }
}, 10);
