import { ethers } from "npm:ethers@6";

export default async function (req: Request): Promise<Response> {
  // POSTリクエスト（GASからの送信）以外は弾く
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // GASから送られてきたユーザーのウォレットアドレスを受け取る
    const { userAddress } = await req.json();
    if (!userAddress) {
      return new Response("Missing userAddress", { status: 400 });
    }

    // 1. 環境変数からGanjaBotの秘密鍵を読み込む
    const pk = process.env.PRIVATE_KEY || Deno.env.get("PRIVATE_KEY");
    if (!pk) {
      return new Response("Server Error: Missing Private Key", { status: 500 });
    }

    // 2. 🔥【本番環境】Flare Mainnetに接続するプロバイダーを設定
    const provider = new ethers.JsonRpcProvider(
      "https://flare-api.flare.network/ext/bc/C/rpc",
    );

    // 3. GanjaBotの署名ウォレットを生成
    const wallet = new ethers.Wallet(pk, provider);

    // 4. 🔥【本番環境】新しくデプロイした本番プールスマコンの情報をセット
    const contractAddress = "0x5BA557F1D8CA0977EaBe579406A88454798D4153";
    const abi = [
      "function claimReward(address _winner, uint256 _amount) external",
    ];
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // 5. 本番の賞金枚数を設定（10000枚。18桁のdecimalsを自動計算）
    const amount = ethers.parseUnits("10000", 18);

    console.log(`[Mainnet] Sending 10000 $GANJA to: ${userAddress}...`);

    // 🔥 スマコンの「claimReward」関数を実行して本物の自動送金の引き金を引く！
    const tx = await contract.claimReward(userAddress, amount);

    // ブロックチェーンに書き込まれる（着金する）まで数秒待機
    const receipt = await tx.wait();

    console.log(`Success! Mainnet Tx Hash: ${tx.hash}`);

    return new Response(
      JSON.stringify({ status: "success", txHash: tx.hash }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("Mainnet Error details:", error);
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
