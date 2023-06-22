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
  
  /**
    * メニューが選択されたときの処理
    * 選択されたメニューが関数の引数に渡される。
    * 複数のメニューを登録した場合は、item.menuItemIdでクリックされたメニューが取得できる
    */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "askChatGpt":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: askChatGPT,
            });
            break;
    }
});

const askChatGPT = () => {
    console.log("askChatGPTが実行されました");
}