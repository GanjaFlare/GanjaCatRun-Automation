function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('GanjaCatRun')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 🎮 ゲームからスコアとウォレットアドレスを受け取るメイン関数
function submitScoreFromGame(twitterId, score, mode, walletAddress) {
  try {
    var scoreNum = Number(score);
    
    // 【不正対策】100点が満点クリアなので、100を超えるスコアは100に固定
    if (scoreNum > 100) {
      scoreNum = 100;
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("2-Week_Ranking");
    var now = new Date();
    
    // 後からの確認用に、D列にウォレットアドレスも一緒に記録
    sheet.appendRow([now, twitterId, scoreNum, walletAddress || "Not Provided"]);
    
    // 🎉【自動送金の引き金】
    // 🌟 100点満点を達成し、かつウォレットアドレスが存在する場合のみVal Townへ転送
    if (scoreNum >= 100 && walletAddress) { 
      sendRewardViaRelay(walletAddress);
    }
    
    return { "status": "success" };
    
  } catch(error) {
    return { "status": "error", "message": error.toString() };
  }
}

// 🌐 中継API（Val Town）を呼び出して、安全にスマコンの送金をキックする関数
function sendRewardViaRelay(walletAddress) {
  // 確定したVal TownのURL
  var relayApiUrl = "https://ganjaflare--f86dd2407a6411f1abe91607ee4eb77e.web.val.run";
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({
      "userAddress": walletAddress
    }),
    "muteHttpExceptions": true
  };
  
  // 中継APIへ「このアドレスに送金して！」とリクエストを送信
  var response = UrlFetchApp.fetch(relayApiUrl, options);
  Logger.log("Relay Response: " + response.getContentText());
}
