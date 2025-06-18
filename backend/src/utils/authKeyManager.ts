export const fetchAndStoreAuthKey = async () => {
  const oemId = process.env.OEM_ID;
  const oemKey = process.env.OEM_KEY;

  if (!oemId || !oemKey) {
    console.warn("OEM認証情報が .env に設定されていません。authKey は空になります。");
    return;
  }

  const form = new FormData();
  form.append("json", JSON.stringify({ oemId, oemKey }));

  try {
    const response = await fetch("https://i1.mvno.net/emptool/api/authOem/", {
      method: "POST",
      body: form as any,
    });

    const text = await response.text();
    const data = JSON.parse(text);

    if (data.resultCode === "100") {
      process.env.AUTH_KEY = data.authKey;
      console.log("✅ authKey を取得して .env に保存しました");
    } else {
      throw new Error("authKey取得失敗：" + JSON.stringify(data));
    }
  } catch (error) {
    console.error("❌ authKey の取得と保存に失敗:", error);
    process.env.AUTH_KEY = ""; // 空に設定
  }
};
