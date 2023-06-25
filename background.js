/**
 * 拡張機能インストール時の処理
 * インストール時のイベント関数で、コンテキストメニューを登録します。
 */
chrome.runtime.onInstalled.addListener(function() {
    const menu = chrome.contextMenus.create({
        type: "normal",
        id: "askChatGpt",
        title: "選択範囲をチャットGPTに聞く",
        contexts: ["all"] //状況に関わらず全ての右クリメニューを指定
    });
  });
  

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "askChatGpt":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: askChatGPT,
                args: [info, tab],
            });
            break;
    }
});

function askChatGPT(info, tab) {
    console.log("askChatGPTが実行されました");
    let selection_text = info.selectionText;
    console.log(selection_text);
  }