<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>GanjaCatRun - Ultimate Edition</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      background-color: #1a0933;
      background-image: 
        linear-gradient(135deg, #2d0b5a 25%, transparent 25%), 
        linear-gradient(225deg, #2d0b5a 25%, transparent 25%), 
        linear-gradient(45deg, #2d0b5a 25%, transparent 25%), 
        linear-gradient(315deg, #2d0b5a 25%, #1a0933 25%);
      background-position: 40px 0, 40px 0, 0 0, 0 0;
      background-size: 80px 80px;
      background-repeat: repeat;
      
      background-image: 
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 5C30 5 28 15 25 18C22 21 12 18 12 18C12 18 20 23 22 26C24 29 17 37 17 37C17 37 25 33 28 35C31 37 30 48 30 48C30 48 29 37 32 35C35 33 43 37 43 37C43 37 36 29 38 26C40 23 48 18 48 18C48 18 38 21 35 18C32 15 30 5 30 5Z' fill='%234d129a' fill-opacity='0.25'/%3E%3C/svg%3E"),
        radial-gradient(circle, #2a0845 0%, #0f021a 100%);
      
      font-family: 'Courier New', Courier, monospace; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      height: 100dvh; 
      user-select: none; 
      -webkit-user-select: none; 
      overflow: hidden;
    }
    
    .game-container { display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; }
    .game-wrapper { width: 340px; height: 680px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); transform-origin: center center; flex-shrink: 0; }
    
    .gameboy-body { width: 100%; height: 100%; background: #cfcfc4; border-radius: 10px 10px 40px 10px; box-shadow: inset -5px -5px 0px #999, inset 5px 5px 0px #fff, 0 20px 40px rgba(0,0,0,0.8); display: flex; flex-direction: column; align-items: center; padding: 25px 15px; box-sizing: border-box; position: relative; }
    
    .gb-screen-border { width: 92%; height: 230px; background: #777773; border-radius: 5px 5px 25px 5px; border: 3px solid #555; display: flex; justify-content: center; align-items: center; position: relative; margin-top: 10px; }
    #gameCanvas { background: #8b956d; border: 4px solid #555; image-rendering: pixelated; }
    
    .gb-title { width: 92%; text-align: left; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 21px; font-weight: bold; color: #232323; margin-top: 10px; margin-bottom: 5px; padding-left: 6px; box-sizing: border-box; letter-spacing: -0.3px; }

    .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.98); z-index: 100; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; text-align: center; border-radius: 10px 10px 40px 10px;}
    
    .input-wrapper { position: relative; width: 80%; margin-bottom: 8px; display: flex; align-items: center; }
    .input-at { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #10b981; font-size: 16px; font-weight: bold; pointer-events: none; z-index: 10; }
    input[type="text"] { width: 100%; padding: 12px 35px; border-radius: 5px; border: 2px solid #10b981; background: #0f172a; color: #fff; font-size: 16px; text-align: left; box-sizing: border-box; }
    .clear-btn { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #ef4444; font-size: 20px; font-weight: bold; cursor: pointer; z-index: 10; }
    
    .remember-wrapper { width: 80%; text-align: left; margin-bottom: 12px; display: flex; align-items: center; gap: 5px; font-size: 11px; }
    .remember-wrapper label { cursor: pointer; }

    .mode-buttons { display: flex; gap: 8px; width: 80%; flex-direction: column; }
    .start-btn { color: white; border: none; padding: 10px 20px; font-size: 13px; font-weight: bold; cursor: pointer; border-radius: 5px; width: 100%; touch-action: manipulation; }
    .normal-btn { background: #3b82f6; box-shadow: 0 4px 0 #2563eb; }
    .normal-btn:active { transform: translateY(4px); box-shadow: 0 0px 0 #2563eb; }
    .boost-btn { background: #ef4444; box-shadow: 0 4px 0 #dc2626; }
    .boost-btn:active { transform: translateY(4px); box-shadow: 0 0px 0 #dc2626; }
    .hell-btn { background: #7f1d1d; box-shadow: 0 4px 0 #450a0a; }
    .hell-btn:active { transform: translateY(4px); box-shadow: 0 0px 0 #450a0a; }

    .official-site-link {
      color: #10b981; 
      font-size: 10px; 
      text-decoration: underline; 
      margin-top: 15px; 
      font-weight: bold; 
      cursor: pointer; 
      transition: color 0.2s;
      display: inline-block;
    }

    .dpad { position: absolute; left: 35px; bottom: 180px; width: 80px; height: 80px; cursor: pointer; z-index: 5; }
    .dpad-axis { position: absolute; background: #2b2b2b; border-radius: 3px; box-shadow: 0 4px 0 #111; }
    .dpad-h { top: 27px; left: 0; width: 80px; height: 26px; }
    .dpad-v { top: 0; left: 27px; width: 26px; height: 80px; }
    
    .gb-buttons { position: absolute; right: 35px; bottom: 195px; display: flex; gap: 15px; transform: rotate(-25deg); z-index: 5; }
    .gb-btn { width: 44px; height: 44px; background: #a32249; border-radius: 50%; box-shadow: 0 4px 0 #5c1126, inset -2px -2px 3px rgba(0,0,0,0.3); display: flex; justify-content: center; align-items: center; color: rgba(255,255,255,0.7); font-size: 14px; font-weight: bold; cursor: pointer; }
    .gb-btn:active { transform: translateY(4px); box-shadow: 0 0px 0 #5c1126; }

    .gb-menu { position: absolute; bottom: 110px; left: 50%; transform: translateX(-50%); display: flex; gap: 25px; z-index: 5; }
    .gb-menu-btn { width: 45px; height: 10px; background: #7b7b77; border-radius: 5px; box-shadow: 0 2px 0 #444; position: relative; cursor: pointer; }
    .gb-menu-label { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); font-size: 9px; color: #555; font-weight: bold; font-family: 'Courier New', monospace; }

    .gb-speaker { position: absolute; right: 30px; bottom: 45px; width: 50px; height: 45px; display: flex; gap: 6px; transform: rotate(-28deg); }
    .gb-speaker-line { width: 4px; height: 100%; background: #9a9a91; border-radius: 2px; box-shadow: inset 1px 1px 0px rgba(0,0,0,0.2); }

    #statusMessage { position: absolute; color: #333; font-size: 11px; bottom: 20px; font-weight: bold; width: 80%; text-align: center; z-index: 200; pointer-events: none;}

    .share-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.7);
      padding: 6px;
      font-size: 0;
      cursor: pointer;
      z-index: 120;
      border-radius: 4px;
      display: none;
      box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      line-height: 0;
      transition: background 0.2s;
    }
    .share-btn:active {
      transform: translateY(1px);
      box-shadow: 0px 0px 0px rgba(0,0,0,0);
      background: rgba(0, 0, 0, 0.8);
    }
  </style>
</head>
<body>
  <div class="game-container">
    <div id="gameWrapper" class="game-wrapper">
      <div class="gameboy-body">
        <div class="gb-screen-border">
          <canvas id="gameCanvas" width="240" height="160"></canvas>
          <button id="shareButton" class="share-btn" title="Share">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>
        
        <div class="gb-title">Ganja Cat Run</div>

        <div id="statusMessage"></div>
        
        <div id="dpadControl" class="dpad">
          <div class="dpad-axis dpad-h"></div>
          <div class="dpad-axis dpad-v"></div>
        </div>
        
        <div class="gb-buttons">
          <div id="btnB" class="gb-btn">B</div>
          <div id="btnA" class="gb-btn">A</div>
        </div>
        
        <div class="gb-menu">
          <div id="btnSelect" class="gb-menu-btn"><span class="gb-menu-label">SELECT</span></div>
          <div id="btnStart" class="gb-menu-btn"><span class="gb-menu-label">START</span></div>
        </div>
        
        <div class="gb-speaker">
          <div class="gb-speaker-line"></div>
          <div class="gb-speaker-line"></div>
          <div class="gb-speaker-line"></div>
          <div class="gb-speaker-line"></div>
        </div>

        <div id="setupOverlay" class="overlay">
          <h1 style="color:#10b981; font-size: 28px; margin-bottom: 5px;">GanjaCatRun</h1>
          <p style="font-size: 11px; margin-bottom: 15px;">Enter X (Twitter) ID to Start</p>
          
          <div class="input-wrapper">
            <span class="input-at">@</span>
            <input type="text" id="twitterInput" placeholder="YourUsername">
            <span id="btnClearId" class="clear-btn" title="Clear ID">×</span>
          </div>
          
          <div class="remember-wrapper">
            <input type="checkbox" id="rememberId" checked>
            <label for="rememberId">IDを記憶する</label>
          </div>

          <div class="mode-buttons">
            <button id="btnNormal" class="start-btn normal-btn">NORMAL MODE (+1)</button>
            <button id="btnBoost" class="start-btn boost-btn">BOOST MODE (+2)</button>
            <button id="btnHell" class="start-btn hell-btn">HELL MODE (+10)</button>
            <a href="https://sites.google.com/view/ganjaflareen/home?authuser=0" target="_blank" rel="noopener noreferrer" class="official-site-link">
              GanjaFlare Official Website
            </a>
          </div>
        </div>

        <!-- 💰 本番：100点満点達成時用の報酬請求オーバーレイ 💰 -->
        <div id="rewardOverlay" class="overlay" style="display: none;">
          <h1 style="color:#ffd700; font-size: 24px; margin-bottom: 5px;">🎉 CLEAR!! 🎉</h1>
          <p style="font-size: 11px; margin-bottom: 15px; color: #fff;">100点達成！報酬を獲得しました！</p>
          
          <div class="input-wrapper" style="width: 85%;">
            <input type="text" id="walletInput" placeholder="0x... (Wallet Address)" style="padding: 12px 15px; border: 2px solid #ffd700;">
          </div>
          
          <div class="mode-buttons" style="width: 85%;">
            <button id="btnClaim" class="start-btn" style="background: #ffd700; color: #000; box-shadow: 0 4px 0 #b8860b; font-weight: bold;">
              CLAIM REWARD & SAVE
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <script>
    window.addEventListener('error', function(e) {
      const msgDiv = document.getElementById('statusMessage');
      if (msgDiv) {
        msgDiv.innerText = 'Error: ' + e.message;
        msgDiv.style.color = '#ff4444';
      }
    });
    window.addEventListener('unhandledrejection', function(e) {
      const msgDiv = document.getElementById('statusMessage');
      if (msgDiv) {
        msgDiv.innerText = 'Promise Err: ' + e.reason;
        msgDiv.style.color = '#ff4444';
      }
    });

    const canvas = document.getElementById("gameCanvas"); 
    const ctx = canvas.getContext("2d");
    let audioCtx = null;
    let twitterId="", isPlaying=false, gameOver=false, score=0, hiScore=0, playerY=115, playerVelocityY=0, isJumping=false, obstacles=[], coins=[], gameSpeed=4.5, frameCount=0;
    let isSaving = false;
    let hellLives = 3;
    let hitFlashFrames = 0;
    let gameMode = 'NORMAL';
    let coinValue = 1;
    let currentLevel = 1;
    let obstacleSpawnChance = 0.009;
    const speedMap = [0, 4.5, 6.3, 7.5, 8.4, 9.6, 10.8, 12.0, 13.5, 14.5, 16.5];
    let isPaused = false;
    let pauseFrame = null;
    let showLeaderboard = false;
    let isLoadingLeaderboard = false;
    let leaderboardCurrentPage = 0; 
    let leaderboardData = [null, null, null];
    let clouds = [];
    let groundDots = [];
    let particles = [];
    let isExploding = false;

    function initializeEvents() {
      try {
        if (typeof window.localStorage !== 'undefined' && window.localStorage) {
          const savedId = window.localStorage.getItem('ganjaCatRunId');
          if (savedId) {
            const tInput = document.getElementById('twitterInput');
            const rId = document.getElementById('rememberId');
            if (tInput) tInput.value = savedId;
            if (rId) rId.checked = true;
          }
        }
      } catch (e) {
        console.warn("localStorage is blocked or not available");
      }

      resizeGame();

      function attachStartBtn(btnId, modeStr) {
        const btn = document.getElementById(btnId);
        if(!btn) return;
        btn.addEventListener("click", function(e) {
          e.preventDefault();
          initAudioAndStart(modeStr);
        });
        btn.addEventListener("touchstart", function(e) {
          e.preventDefault();
          initAudioAndStart(modeStr);
        }, {passive: false});
      }

      attachStartBtn("btnNormal", "NORMAL");
      attachStartBtn("btnBoost", "BOOST");
      attachStartBtn("btnHell", "HELL");

      const btnClearId = document.getElementById("btnClearId");
      if (btnClearId) {
        btnClearId.addEventListener("click", clearSavedId);
        btnClearId.addEventListener("touchstart", function(e){ e.preventDefault(); clearSavedId(); }, {passive: false});
      }

      const dpad = document.getElementById("dpadControl");
      if (dpad) {
        dpad.addEventListener("mousedown", handleDpadClick);
        dpad.addEventListener("touchstart", function(e){ e.preventDefault(); handleDpadClick(e); }, {passive: false});
      }

      const bBtn = document.getElementById("btnB");
      const aBtn = document.getElementById("btnA");
      if (bBtn) { bBtn.addEventListener("mousedown", triggerJump); bBtn.addEventListener("touchstart", function(e){ e.preventDefault(); triggerJump(); }, {passive: false}); }
      if (aBtn) { aBtn.addEventListener("mousedown", triggerJump); aBtn.addEventListener("touchstart", function(e){ e.preventDefault(); triggerJump(); }, {passive: false}); }

      const selectBtn = document.getElementById("btnSelect");
      if (selectBtn) { selectBtn.addEventListener("click", showLeaderboardScreen); selectBtn.addEventListener("touchstart", function(e){ e.preventDefault(); showLeaderboardScreen(); }, {passive: false}); }

      const startBtn = document.getElementById("btnStart");
      if (startBtn) { startBtn.addEventListener("click", togglePause); startBtn.addEventListener("touchstart", function(e){ e.preventDefault(); togglePause(); }, {passive: false}); }

      const shareBtn = document.getElementById("shareButton");
      if (shareBtn) {
        shareBtn.addEventListener("click", shareOnX);
      }

      // 報酬請求ボタンのイベント登録
      const btnClaim = document.getElementById("btnClaim");
      if (btnClaim) {
        const claimHandler = function(e) {
          e.preventDefault();
          const walletInput = document.getElementById("walletInput");
          const walletAddress = walletInput ? walletInput.value.trim() : "";
          
          if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
            alert("有効なウォレットアドレス（0xから始まる42桁）を入力してください。");
            return;
          }
          
          // オーバーレイを閉じる
          document.getElementById("rewardOverlay").style.display = "none";
          
          // Canvas側にクリア確定時のロード画面を描画
          ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0,0,240,160);
          ctx.textAlign = "center";
          ctx.fillStyle = "#FFD700"; ctx.font = "bold 18px 'Courier New'";
          ctx.fillText("GAME CLEAR!!", 120, 60);
          ctx.font = "bold 11px 'Courier New'";
          ctx.fillText(`YOU SCORED ${score} POINTS`, 120, 82);
          ctx.fillStyle = "#ffffff";
          ctx.fillText("SENDING CLAIM SIGNAL...", 120, 122);
          ctx.textAlign = "left";
          
          // 新しい4つ引数版のGAS関数をコール
          sendScoreToGAS(twitterId, score, gameMode, walletAddress);
        };
        btnClaim.addEventListener("click", claimHandler);
        btnClaim.addEventListener("touchstart", claimHandler, {passive: false});
      }
    }

    if (document.getElementById("btnNormal")) {
      initializeEvents();
    } else {
      window.addEventListener('DOMContentLoaded', initializeEvents);
      window.addEventListener('load', initializeEvents);
    }

    function clearSavedId() {
      try {
        if (typeof window.localStorage !== 'undefined' && window.localStorage) {
           window.localStorage.removeItem('ganjaCatRunId');
        }
      } catch (e) {}
      const tInput = document.getElementById('twitterInput');
      if (tInput) tInput.value = '';
    }

    function initAudioAndStart(mode) { 
      gameMode = mode;
      if (mode === 'BOOST') { 
        coinValue = 2; 
        obstacleSpawnChance = 0.01;
      }
      else if (mode === 'HELL') { 
        coinValue = 10; // 🌟 テスト用の50から、本来の10ポイント獲得へ修正
        obstacleSpawnChance = 0.038;
      }
      else { 
        coinValue = 1; 
        obstacleSpawnChance = 0.009;
      }
      
      const tInput = document.getElementById("twitterInput");
      let rawInput = tInput ? tInput.value.trim() : "";
      if (rawInput.startsWith('@')) { rawInput = rawInput.slice(1); }
      
      try {
        if (typeof window.localStorage !== 'undefined' && window.localStorage) {
           const rId = document.getElementById('rememberId');
           if (rId && rId.checked && rawInput) {
              window.localStorage.setItem('ganjaCatRunId', rawInput);
           } else if (rId && !rId.checked) {
              window.localStorage.removeItem('ganjaCatRunId');
           }
        }
      } catch (e) {
        console.warn("localStorage access denied.");
      }

      twitterId = rawInput ? "@" + rawInput : "@Guest";
      
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass && !audioCtx) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          let promise = audioCtx.resume();
          if (promise !== undefined) {
            promise.catch(function(err) { console.warn("Audio resume error:", err); });
          }
        }
      } catch (e) {
        console.warn("AudioContext setup failed or blocked.");
      }
      
      startGame(); 
    }

    function playSound(type) {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator(); 
        const gain = audioCtx.createGain();
        osc.connect(gain); 
        gain.connect(audioCtx.destination);
        
        if (type === 'jump') { 
          osc.type = 'square'; osc.frequency.setValueAtTime(400, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1); 
          gain.gain.setValueAtTime(0.1, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime + 0.1);
        }
        else if (type === 'coin') { 
          osc.type = 'triangle'; osc.frequency.setValueAtTime(900, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.1); 
          gain.gain.setValueAtTime(0.1, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime + 0.1);
        }
        else if (type === 'hit') { 
          osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, audioCtx.currentTime); 
          gain.gain.setValueAtTime(0.2, audioCtx.currentTime); osc.start();
          osc.stop(audioCtx.currentTime + 0.4); 
        }
        else if (type === 'deflect') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(150, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
          osc.start(); osc.stop(audioCtx.currentTime + 0.2);
        }
        else if (type === 'explosion') {
          osc.type = 'sawtooth'; 
          osc.frequency.setValueAtTime(150, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.8);
          
          const osc2 = audioCtx.createOscillator();
          osc2.type = 'square';
          osc2.frequency.setValueAtTime(50, audioCtx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(5, audioCtx.currentTime + 0.8);
          osc2.connect(gain);
          osc2.start(); osc2.stop(audioCtx.currentTime + 0.8);

          gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
          osc.start(); osc.stop(audioCtx.currentTime + 0.8);
        }
      } catch (e) {
      }
    }

    function shareOnX(e) {
      e.stopPropagation(); 
      const lines = [
        "Played Ganja Cat Run and earned points! 🔥🐈",
        "",
        "Let's aim for victory together! 🏆",
        "https://script.google.com/macros/s/AKfycbynwDqLFmF0lG4Ree0WWVEdm3Twl98SYd7Mtdi8fI7iMun3G9zAzoXA5Ohwy-t2RhJU/exec",
        "",
        "$GANJA $FLR #FlareNetwork"
      ];
      const tweetText = lines.join("\n");
      
      const dataUrl = canvas.toDataURL('image/png');
      try {
        fetch(dataUrl).then(function(response) {
          return response.blob();
        }).then(function(blob) {
          const file = new File([blob], 'ganjacat_score.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ text: tweetText, files: [file] }).catch(function(err){});
          } else {
            const twUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
            window.open(twUrl, '_blank');
          }
        }).catch(function(err) {
          const twUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
          window.open(twUrl, '_blank');
        });
      } catch (err) {
        const twUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
        window.open(twUrl, '_blank');
      }
    }

    function drawGanjaCat(x, y, state, frame) {
      if (isExploding) return; 
      
      const isHell = (gameMode === 'HELL');
      const isBoost = (gameMode === 'BOOST');

      const bodyColor = isHell ? "#1a1a1a" : "#87CEEB"; 
      const stripeColor = isHell ? "#333333" : "#4169E1";  
      const eyeColor = isHell ? "#ff0000" : "#ffffff";
      const subEyeColor = isHell ? "#990000" : "#00FFFF";

      const hx = isBoost ? x + 5 : x + 16;
      const hy = isBoost ? y - 14 : y - 10;

      if (isBoost) {
        ctx.fillStyle = bodyColor; ctx.fillRect(x + 7, y - 2, 10, 16);
        ctx.fillStyle = stripeColor; ctx.fillRect(x + 7, y + 2, 10, 3); ctx.fillRect(x + 7, y + 9, 10, 3);
      } else {
        ctx.fillStyle = bodyColor; ctx.fillRect(x, y, 22, 14); 
        ctx.fillStyle = stripeColor; ctx.fillRect(x + 4, y, 3, 14); ctx.fillRect(x + 11, y, 3, 14);
      }

      ctx.fillStyle = bodyColor; ctx.fillRect(hx, hy, 12, 12); 
      ctx.fillStyle = stripeColor; ctx.fillRect(hx + 4, hy, 2, 4);
      ctx.fillStyle = bodyColor; ctx.fillRect(hx + 2, hy - 3, 3, 3); ctx.fillRect(hx + 9, hy - 3, 3, 3); 
      
      if (state === 'hit') {
        ctx.fillStyle = isHell ? "#ff0000" : "#fff"; 
        ctx.fillRect(hx+3, hy+3, 2, 1); ctx.fillRect(hx+4, hy+4, 1, 1); ctx.fillRect(hx+3, hy+5, 2, 1); 
        ctx.fillRect(hx+8, hy+3, 2, 1); ctx.fillRect(hx+8, hy+4, 1, 1); ctx.fillRect(hx+8, hy+5, 2, 1); 
        ctx.fillRect(hx+5, hy+8, 4, 3); ctx.fillStyle = stripeColor; ctx.fillRect(hx+6, hy+9, 2, 1);
      } else {
        ctx.fillStyle = eyeColor; ctx.fillRect(hx + 2, hy + 2, 4, 4);
        ctx.fillStyle = "#FF69B4"; ctx.fillRect(hx + 2, hy + 2, 2, 1); ctx.fillRect(hx + 2, hy + 3, 1, 2); 
        ctx.fillStyle = "#FFD700"; ctx.fillRect(hx + 4, hy + 2, 2, 1); ctx.fillRect(hx + 5, hy + 3, 1, 2); 
        ctx.fillStyle = subEyeColor; ctx.fillRect(hx + 3, hy + 4, 2, 1); ctx.fillRect(hx + 4, hy + 5, 1, 1); 
        ctx.fillStyle = "#9370DB"; ctx.fillRect(hx + 3, hy + 3, 1, 1); 
        
        ctx.fillStyle = eyeColor; ctx.fillRect(hx + 7, hy + 2, 4, 4);
        ctx.fillStyle = "#FF69B4"; ctx.fillRect(hx + 7, hy + 2, 2, 1); ctx.fillRect(hx + 7, hy + 3, 1, 2); 
        ctx.fillStyle = "#FFD700"; ctx.fillRect(hx + 9, hy + 2, 2, 1); ctx.fillRect(hx + 10, hy + 3, 1, 2); 
        ctx.fillStyle = subEyeColor; ctx.fillRect(hx + 8, hy + 4, 2, 1); ctx.fillRect(hx + 9, hy + 5, 1, 1); 
        ctx.fillStyle = "#9370DB"; ctx.fillRect(hx + 8, hy + 3, 1, 1); 
      }

      if (state !== 'hit') {
        if (isBoost) {
          ctx.fillStyle = isHell ? "#333" : "#ffffff"; ctx.fillRect(hx + 10, hy + 8, 6, 2); 
          ctx.fillStyle = "#ff0000"; ctx.fillRect(hx + 15, hy + 8, 1, 2); 
        } else {
          ctx.fillStyle = isHell ? "#333" : "#ffffff"; ctx.fillRect(x + 28, y - 2, 6, 2); 
          ctx.fillStyle = "#ff0000"; ctx.fillRect(x + 33, y - 2, 1, 2); 
        }
      }
      
      ctx.fillStyle = bodyColor;
      if (isBoost) {
        if (state === 'jump') {
          ctx.fillRect(x + 7, y + 14, 3, 6); ctx.fillRect(x + 14, y + 14, 3, 6);
        } else if (state === 'hit') {
          ctx.fillRect(x + 3, y + 14, 5, 3); ctx.fillRect(x + 15, y + 14, 5, 3); 
        } else {
          if (frame % 20 < 10) { 
            ctx.fillRect(x + 7, y + 14, 3, 6); ctx.fillRect(x + 14, y + 12, 3, 4); 
          } else { 
            ctx.fillRect(x + 7, y + 12, 3, 4); ctx.fillRect(x + 14, y + 14, 3, 6); 
          }
        }
      } else {
        if (state === 'jump') {
          ctx.fillRect(x, y + 14, 3, 5); ctx.fillRect(x + 6, y + 14, 3, 5); 
          ctx.fillRect(x + 13, y + 14, 3, 5); ctx.fillRect(x + 19, y + 14, 3, 5);
        } else if (state === 'hit') {
          ctx.fillRect(x, y + 14, 5, 3); ctx.fillRect(x + 17, y + 14, 5, 3); 
        } else {
          if (frame % 20 < 10) { 
            ctx.fillRect(x+1, y + 14, 4, 4); ctx.fillRect(x + 12, y + 14, 4, 4); 
          } else { 
            ctx.fillRect(x+5, y + 14, 4, 4); ctx.fillRect(x + 17, y + 14, 4, 4); 
          }
        }
      }
    }

    function drawRock(x, y) { ctx.fillStyle = "#444"; ctx.fillRect(x, y, 20, 16); ctx.fillStyle = "#666"; ctx.fillRect(x+2, y+2, 6, 6); ctx.fillRect(x+12, y+8, 5, 5); ctx.fillStyle = "#222"; ctx.fillRect(x+5, y+10, 8, 4); }
    function drawCrow(x, y, frame) { ctx.fillStyle = "#111"; ctx.fillRect(x, y, 16, 8); ctx.fillRect(x - 5, y - 2, 6, 6); ctx.fillStyle="#ff8c00"; ctx.fillRect(x-8, y, 3, 2); ctx.fillStyle = "#111"; if (frame % 30 < 15) { ctx.fillRect(x+3, y - 6, 10, 6); } else { ctx.fillRect(x+3, y + 4, 10, 6); } }
    function drawGanjaCoin(x, y) { ctx.fillStyle = "#ffd700"; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "#b8860b"; ctx.lineWidth=1; ctx.stroke(); ctx.fillStyle = "#10b981"; ctx.fillRect(x-1, y-6, 2, 12); ctx.fillRect(x-5, y-2, 10, 2); ctx.fillRect(x-4, y-4, 2, 2); ctx.fillRect(x+2, y-4, 2, 2); ctx.fillRect(x-3, y+2, 2, 2); ctx.fillRect(x+1, y+2, 2, 2); }

    function drawClouds() {
      ctx.fillStyle = (gameMode === 'HELL') ? "rgba(255, 100, 100, 0.15)" : "rgba(255, 255, 255, 0.4)";
      clouds.forEach(function(c) {
        ctx.fillRect(c.x, c.y, c.width, 10);
        ctx.fillRect(c.x + 5, c.y - 5, c.width - 10, 5);
        ctx.fillRect(c.x + 10, c.y - 10, c.width - 20, 5);
        if (!isPaused && !gameOver) c.x -= c.speed;
        if (c.x + c.width < 0) {
          c.x = 240 + Math.random() * 50;
          c.y = 15 + Math.random() * 30;
        }
      });
    }

    function drawGround() {
      ctx.fillStyle="#444"; ctx.fillRect(0, 133, 240, 27); 
      ctx.fillStyle="#333"; ctx.fillRect(0, 133, 240, 2);
      ctx.fillStyle = (gameMode === 'HELL') ? "#111" : "#222";
      groundDots.forEach(function(d) {
        ctx.fillRect(d.x, d.y, d.width, 2);
        if (!isPaused && !gameOver) d.x -= gameSpeed;
        if (d.x < -10) d.x = 240 + Math.random() * 20;
      });
    }

    function startGame() { 
      const overlay = document.getElementById("setupOverlay");
      if (overlay) overlay.style.display = "none";
      const rewardOverlay = document.getElementById("rewardOverlay");
      if (rewardOverlay) rewardOverlay.style.display = "none";
      resetGame(); 
      isPlaying = true; 
      gameLoop(); 
    }
    
    function returnToTitle() {
      const overlay = document.getElementById("setupOverlay");
      if (overlay) overlay.style.display = "flex";
      const rewardOverlay = document.getElementById("rewardOverlay");
      if (rewardOverlay) rewardOverlay.style.display = "none";
      isPlaying = false;
      gameOver = false;
      isExploding = false;
    }
    
    function resetGame() { 
      gameOver = false;
      isPaused = false; showLeaderboard = false; 
      score = 0; currentLevel = 1; playerY = 115; obstacles = [];
      coins = []; 
      frameCount = 0; gameSpeed = speedMap[1]; 
      
      const statusMsg = document.getElementById("statusMessage");
      if (statusMsg) {
        statusMsg.innerText = "";
        statusMsg.style.color = "#333";
      }
      
      const sBtn = document.getElementById("shareButton");
      if (sBtn) sBtn.style.display = "none";
      
      const rewardOverlay = document.getElementById("rewardOverlay");
      if (rewardOverlay) rewardOverlay.style.display = "none";

      hellLives = 3;
      hitFlashFrames = 0;
      isExploding = false;
      particles = [];

      clouds = [];
      for(let i=0; i<4; i++) clouds.push({x: Math.random()*240, y: 15 + Math.random()*30, speed: 0.2 + Math.random()*0.4, width: 20 + Math.random()*20});
      groundDots = [];
      for(let i=0; i<30; i++) groundDots.push({x: Math.random()*240, y: 135 + Math.random()*20, width: 1 + Math.random()*3});
    }
    
    function triggerJump() { 
      if (!isPlaying || isPaused) return; 
      if (gameOver) { 
        if (isSaving) return;
        const statusMsg = document.getElementById("statusMessage");
        if (statusMsg) statusMsg.innerText = ""; 
        startGame(); 
        return;
      } 
      if (playerY === 115) { 
        playerVelocityY = -11.8; 
        isJumping=true; 
        playSound('jump');
      } 
    }
    
    function handleDpadClick(event) {
      if (showLeaderboard) {
        changeLeaderboardPage(1); 
      } else {
        triggerJump();
      }
    }

    function changeLeaderboardPage(dir) {
      if (!showLeaderboard) return;
      leaderboardCurrentPage += dir;
      if (leaderboardCurrentPage < 0) leaderboardCurrentPage = 2;
      if (leaderboardCurrentPage > 2) leaderboardCurrentPage = 0;
      drawPauseScreen();
    }

    function togglePause() {
      if (!isPlaying || gameOver) return;
      isPaused = !isPaused;
      if (isPaused) {
        showLeaderboard = false; 
        leaderboardCurrentPage = 0; 
        pauseFrame = ctx.getImageData(0, 0, 240, 160); 
        drawPauseScreen();
      } else {
        requestAnimationFrame(gameLoop);
      }
    }

    function showLeaderboardScreen() {
      if (gameOver) {
        returnToTitle();
        return;
      }
      if (!isPaused || showLeaderboard) return;
      showLeaderboard = true; 
      isLoadingLeaderboard = true;
      leaderboardCurrentPage = 0; 
      leaderboardData = [null, null, null]; 
      drawPauseScreen();
      
      try {
        google.script.run.withSuccessHandler(function(data) { 
          leaderboardData[0] = data; checkLeaderboardLoad(); 
        }).getWinnerData(); 
        
        google.script.run.withSuccessHandler(function(data) { 
          leaderboardData[1] = data; checkLeaderboardLoad(); 
        }).getPlayCountData(); 
        
        google.script.run.withSuccessHandler(function(data) { 
          leaderboardData[2] = data; checkLeaderboardLoad(); 
        }).getLegendData(); 
      } catch(e) {
        isLoadingLeaderboard = false;
        drawPauseScreen();
      }
    }
    
    function checkLeaderboardLoad() {
      isLoadingLeaderboard = false; 
      drawPauseScreen();
    }

    function drawPauseScreen() {
      if (!isPaused) return;
      ctx.putImageData(pauseFrame, 0, 0);
      ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, 0, 240, 160);
      
      if (!showLeaderboard) {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 22px 'Courier New'"; ctx.textAlign = "center"; ctx.fillText("PAUSE", 120, 75);
        ctx.font = "bold 9px 'Courier New'";
        ctx.fillText("Press SELECT for LEADERBOARD", 120, 105);
      } else {
        ctx.fillStyle = "#ccc";
        ctx.font = "bold 12px 'Courier New'"; ctx.textAlign = "center"; 
        ctx.fillText("<", 15, 85); ctx.fillText(">", 225, 85);
        
        let titles = ["--- 2WEEKS SCORE ---", "--- 2WEEKS PLAYS ---", "--- LEGEND ---"];
        ctx.fillStyle = (leaderboardCurrentPage === 2) ? "#FFD700" : "#10b981";
        ctx.font = "bold 11px 'Courier New'"; ctx.fillText(titles[leaderboardCurrentPage], 120, 25);
        
        ctx.textAlign = "left";
        ctx.font = "bold 9px 'Courier New'";
        
        let currentData = leaderboardData[leaderboardCurrentPage];
        
        if (isLoadingLeaderboard && !currentData) { 
          ctx.fillStyle = "#fff";
          ctx.font = "bold 14px 'Courier New'"; ctx.fillText("Loading...", 80, 85);
        } else if (currentData && currentData.length > 0) {
          for (let i = 0; i < Math.min(3, currentData.length); i++) { 
            if (currentData[i]) { 
              ctx.fillStyle = "#fff";
              ctx.fillText(currentData[i][0], 25, 45 + (i * 33)); 
              ctx.fillStyle = "#ffd700";
              let valStr = currentData[i][1];
              if (currentData[i][2]) valStr += " (" + currentData[i][2] + ")";
              ctx.fillText(valStr, 35, 58 + (i * 33));
            } 
          }
        } else {
          ctx.fillStyle = "#fff";
          ctx.fillText("No Data / Loading...", 25, 85);
        }
        
        ctx.fillStyle = "#ccc";
        ctx.textAlign = "center"; ctx.font = "bold 8px 'Courier New'"; ctx.fillText("Press START to resume", 120, 150);
      }
      ctx.textAlign = "left";
    }

    function gameLoop() {
      if (gameOver || isPaused) return;
      frameCount++;
      
      if (gameMode === 'HELL') {
        ctx.fillStyle = "#2d0202";
        ctx.fillRect(0, 0, 240, 160);
        currentLevel = (score < 50) ? 1 : 2;
        gameSpeed = (currentLevel === 1) ? 16.5 : 20.0;
      } else {
        ctx.fillStyle = "#8b956d";
        ctx.fillRect(0, 0, 240, 160);
        currentLevel = Math.min(10, Math.floor(score / 10) + 1);
        gameSpeed = speedMap[currentLevel];
      }

      drawClouds();
      drawGround();

      let catState = 'run'; if (playerY < 115) catState = 'jump';
      
      if (hitFlashFrames > 0) {
        hitFlashFrames--;
        if (Math.floor(hitFlashFrames / 4) % 2 === 0) {
          ctx.globalCompositeOperation = 'lighter';
          drawGanjaCat(20, playerY, catState, frameCount);
          ctx.globalCompositeOperation = 'source-over';
        }
      } else {
        drawGanjaCat(20, playerY, catState, frameCount);
      }
      
      let canSpawn = true;
      if (obstacles.length > 0) {
        let requiredDistance = 30 * gameSpeed;
        if ((240 - obstacles[obstacles.length - 1].x) < requiredDistance) {
          canSpawn = false;
        }
      }

      if (canSpawn && Math.random() < obstacleSpawnChance) { 
        let type = Math.random() < 0.7 ? "rock" : "crow"; 
        obstacles.push({x:240, y:type==="rock"?118:60, type:type, width:type==="rock"?20:16, height:type==="rock"?16:10}); 
      }
      if (frameCount % 75 === 0) coins.push({x:240, y:Math.random()>0.5?100:60, collected:false});
      
      for (let i = obstacles.length - 1; i >= 0; i--) {
        let o = obstacles[i];
        o.x -= gameSpeed;
        if (o.type === "rock") drawRock(o.x, o.y); else drawCrow(o.x, o.y, frameCount);
        
        if (o.x < 20+22 && o.x+o.width > 20+2 && playerY+14 > o.y && playerY < o.y+o.height) { 
          if (hitFlashFrames > 0) {
          } else if (gameMode === 'HELL' && hellLives > 1) {
            hellLives--;
            hitFlashFrames = 30; 
            playSound('deflect');
          } else {
            endGame(false); 
            return;
          }
        }
        if (o.x < -30) obstacles.splice(i, 1);
      }

      for (let i = coins.length - 1; i >= 0; i--) {
        let c = coins[i];
        if(!c.collected){
          c.x -= gameSpeed; drawGanjaCoin(c.x, c.y);
          if (c.x < 20+28 && c.x > 20-5 && playerY+14 > c.y-9 && playerY-10 < c.y+9) { 
            c.collected=true;
            score += coinValue; 
            if(score>hiScore) hiScore=score; 
            playSound('coin'); 
            
            // 🌟 100点満点達成でクリア
            if (score >= 100) { 
              score = 100;      
              if (gameMode === 'HELL') currentLevel = 2; else currentLevel = 10;
              endGame(true);
              return;
            }
          }
        }
        if (c.x < -20) coins.splice(i, 1);
      }

      ctx.fillStyle = (gameMode === 'HELL') ? "#ff0000" : "#000"; 
      ctx.font = "bold 11px 'Courier New'"; 
      let lvText = (gameMode === 'HELL') ? `HELL LV:${currentLevel}` : `LV:${currentLevel}`;
      ctx.fillText(`SCORE:${score} HI:${hiScore} ${lvText}`, 5, 18);

      playerVelocityY += 1.0; playerY += playerVelocityY;
      if (playerY >= 115) { playerY = 115;
      playerVelocityY = 0; isJumping=false; }
      requestAnimationFrame(gameLoop);
    }

    function explosionLoop() {
      if (!isExploding) return;
      
      ctx.fillStyle = "#2d0202"; ctx.fillRect(0, 0, 240, 160);
      drawClouds(); 
      drawGround();
      obstacles.forEach(function(o) { if (o.type === "rock") drawRock(o.x, o.y); else drawCrow(o.x, o.y, frameCount); });
      coins.forEach(function(c) { if (!c.collected) drawGanjaCoin(c.x, c.y); });

      let aliveParticles = false;
      particles.forEach(function(p) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.6; 
        if (p.y < 160) {
          aliveParticles = true;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });

      ctx.fillStyle = "#ff0000"; ctx.font = "bold 11px 'Courier New'"; 
      ctx.fillText(`SCORE:${score} HI:${hiScore} HELL LV:${currentLevel}`, 5, 18);

      if (aliveParticles) {
        requestAnimationFrame(explosionLoop);
      } else {
        isExploding = false;
        showGameOverUI(false); 
      }
    }

    function endGame(isClear) {
      gameOver = true;
      isSaving = true;

      if (!isClear) {
        if (gameMode === 'HELL') {
          isExploding = true;
          playSound('explosion');
          particles = [];
          for (let i = 0; i < 40; i++) {
            particles.push({
              x: 20 + 11, y: playerY + 7, 
              vx: (Math.random() - 0.5) * 14,
              vy: (Math.random() - 1.5) * 10,
              size: Math.random() * 4 + 1,
              color: Math.random() > 0.3 ? "#1a1a1a" : "#ff0000" 
            });
          }
          explosionLoop();
          return;
        } else {
          playSound('hit');
          drawGanjaCat(20, playerY, 'hit', frameCount);
        }
      }
      showGameOverUI(isClear);
    }

    function showGameOverUI(isClear) {
      // 🌟 100点満点クリア時は、自動送信せず「報酬受け取り用オーバーレイ」を出す
      if (isClear) {
        const rewardOverlay = document.getElementById("rewardOverlay");
        if (rewardOverlay) {
          rewardOverlay.style.display = "flex";
          return; 
        }
      }

      // 以下は通常のゲームオーバー（100点未満）の処理
      ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0,0,240,160);
      ctx.textAlign = "center";
      
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px 'Courier New'"; ctx.fillText("GAME OVER", 120, 60);
      
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 12px 'Courier New'";
      ctx.fillText(`YOU SCORED ${score} POINTS`, 120, 82);

      ctx.fillStyle = "#00FF00"; 
      ctx.font = "bold 10px 'Courier New'";
      
      try {
        let actualLevel = typeof currentLevel !== 'undefined' ? currentLevel : 1;
        if (gameMode === "HELL") {
          ctx.fillText(`[ HELL LV.${actualLevel} ]`, 120, 98);
        } else {
          ctx.fillText(`[ LV.${actualLevel} ]`, 120, 98);
        }
      } catch (err) {}

      isSaving = true;

      ctx.font = "bold 10px 'Courier New'"; 
      ctx.fillStyle = "#ffffff";
      ctx.fillText("NOW SAVING SCORE...", 120, 122);
      ctx.textAlign = "left"; 
      
      // 通常のゲームオーバー時は、ウォレットアドレスを空（""）にしてGASへ自動送信
      sendScoreToGAS(twitterId, score, gameMode, "");
    }

    // 🚀 GASにデータを叩き込む共通の送信関数
    function sendScoreToGAS(tId, sc, mode, wallet) {
      isSaving = true;
      try {
        google.script.run.withSuccessHandler(function(){
          finishScoreSave();
        }).submitScoreFromGame(tId, sc, mode, wallet); 
      } catch (e) {
        setTimeout(function() { 
          finishScoreSave();
        }, 1000);
      }
    }

    // 🚀 GASへの送信が完了した後の共通処理
    function finishScoreSave() {
      isSaving = false; 
      ctx.save();
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(0,0,0,0.7)"; ctx.fillRect(0, 106, 240, 54); 
      ctx.fillStyle = "#ccc"; ctx.font = "bold 10px 'Courier New'";
      ctx.fillText("A / SPACE : REPLAY", 120, 118);
      ctx.fillText("SELECT    : MODE MENU", 120, 133);
      ctx.restore();
      
      const sBtn = document.getElementById("shareButton");
      if (sBtn) sBtn.style.display = "block";
    }

    function resizeGame() {
      const wrapper = document.getElementById("gameWrapper");
      if (!wrapper) return;
      const scale = Math.min(window.innerWidth / 340, window.innerHeight / 680);
      wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    window.addEventListener("resize", resizeGame);
    
    window.addEventListener("keydown", function(e) { 
      if (e.code === "Space" || e.code === "ArrowUp") {
          if (!showLeaderboard) triggerJump(); 
      }
      if (e.code === "Enter") togglePause();
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") showLeaderboardScreen();
      
      if (showLeaderboard) {
        if (e.code === "ArrowLeft") changeLeaderboardPage(-1);
        if (e.code === "ArrowRight") changeLeaderboardPage(1);
      }
    });

    function handleCanvasInteraction(e) {
        if (showLeaderboard) {
            const rect = canvas.getBoundingClientRect();
            let clientX = e.clientX;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
            }
            const x = clientX - rect.left;
            if (x < rect.width / 2) {
                changeLeaderboardPage(-1); 
            } else {
                changeLeaderboardPage(1);  
            }
        } else {
            triggerJump();
        }
    }

    canvas.addEventListener("mousedown", handleCanvasInteraction);
    canvas.addEventListener("touchstart", function(e) {
      e.preventDefault(); 
      handleCanvasInteraction(e);
    }, { passive: false });
  </script>
</body>
</html>
