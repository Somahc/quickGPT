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

async function askChatGPT(info, tab) {
    let exportResponse = '';
    const API_KEY = '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';
    console.log("askChatGPTが実行されました");
    let selection_text = info.selectionText;
    console.log(selection_text);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: selection_text}],
            max_tokens: 150, // 出力される文章量の最大値（トークン数） max:4096
            temperature: 1, // 単語のランダム性 min:0.1 max:2.0
            top_p: 1, // 単語のランダム性 min:-2.0 max:2.0
            frequency_penalty: 0.0, // 単語の再利用 min:-2.0 max:2.0
            presence_penalty: 0.6 // 単語の再利用 min:-2.0 max:2.0
            //stop: [' Human:', ' AI:'] // 途中で生成を停止する単語
        })
    })
    .then(response => response.json())
    .then(data => {
        exportResponse = data.choices[0].message;
    })

    console.log(exportResponse);
  }