// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbx58koZDlftZR_L4YubF_x2tMPOBJQJBr_J8-rJgEkjloa2ka3klGObHdIglJjco_zS/exec";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }
  try {
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const json = await gasRes.json();
    res.status(200).json(json);
  } catch (err) {
    console.error("🛠️ Proxy error:", err);
    res.status(500).json({ error: "proxy_failure" });
  }
}
