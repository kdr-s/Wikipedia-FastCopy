function handleKeydownEvent(event) {
    if (event.key === 'c') {
        // 入力要素から帰属テキストを取得
        var attributionInput = document.getElementById('ooui-2');
        var attributionText = attributionInput ? attributionInput.value : '';

        // テキストと画像のURLを組み合わせる
        var combinedText = "出典：" + attributionText;

        // 組み合わせたテキストをクリップボードにコピー
        navigator.clipboard.writeText(combinedText).then(function () {
            console.log('Copied to clipboard successfully!');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });

    } else if (event.key === 'd') {
        // d キーが押されたときの処理
        var detailsButton = document.querySelector('.mw-mmv-description-page-button');
        if (detailsButton) {
            // リンクのクリックイベントを発火させる
            detailsButton.click();
        } else {
            console.log('詳細ボタンが見つかりませんでした。');
        }
    }
}

function register(downloadButton) {
    if (downloadButton) {
        // 要素のクリックイベントを発火させる
        downloadButton.click();
        document.removeEventListener('keydown', handleKeydownEvent);
        document.addEventListener('keydown', handleKeydownEvent);
        // ポップアップを非表示にさせる
        document.body.click()
    } else {
        console.log('ダウンロードボタンが見つかりませんでした。');
    }
}

function unregister() {
    document.removeEventListener('keydown', handleKeydownEvent);
}

function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
        var downloadButton = document.querySelector('.mw-mmv-download-button');
        if (downloadButton) {
            register(downloadButton);
        } else {
            unregister();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function startExtension() {
    var downloadButton = document.querySelector('.mw-mmv-download-button');
    if (downloadButton) {
        register(downloadButton);
    }
    observeDOMChanges();
}

if (document.readyState === 'complete') {
    setTimeout(startExtension, 300);
} else {
    window.onload = setTimeout(startExtension, 300);
}
