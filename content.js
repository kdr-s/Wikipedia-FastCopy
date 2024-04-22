function handleKeydownEvent(event) {
    switch (event.key) {
        case 'c':
        case ',':
            copyAttributionText();
            break;
        case 'd':
        case 'k':
            clickDetailsButton();
            break;
    }
}

function copyAttributionText() {
    var attributionInput = document.getElementById('ooui-2');
    var attributionText = attributionInput ? attributionInput.value : '';
    var combinedText = "出典：" + attributionText;

    navigator.clipboard.writeText(combinedText).then(function () {
        console.log('Copied to clipboard successfully!');
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}

function clickDetailsButton() {
    var detailsButton = document.querySelector('.mw-mmv-description-page-button');
    if (detailsButton) {
        detailsButton.target = '_blank';
        detailsButton.click();
    } else {
        console.log('詳細ボタンが見つかりませんでした。');
    }
}

function registerKeydownListener() {
    document.addEventListener('keydown', handleKeydownEvent);
}

function unregisterKeydownListener() {
    document.removeEventListener('keydown', handleKeydownEvent);
}

function clickCitation(citationButton) {
    citationButton.click();
    // ポップアップを非表示にさせる
    document.body.click();
}

function processEventHandler(){
    var citationButton = document.querySelector('.mw-mmv-download-button');
    if (citationButton) {
        clickCitation(citationButton);
        registerKeydownListener();
    } else {
        unregisterKeydownListener()
    }
}

function startExtension() {
    processEventHandler();
    observeDOMChanges();
}

function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
        processEventHandler();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'complete') {
    setTimeout(startExtension, 300);
} else {
    window.onload = setTimeout(startExtension, 300);
}
