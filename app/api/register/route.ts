// app/api/register/route.ts
import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbw-SZzwebzLYaVmesJxdVLOnwUR9VN5oiGEQ1ERBGBc8eSvADxe0_X9dI2nGzJ-c2gQ/exec"; // <-- replace with your /exec URL

export async function GET() {
  return NextResponse.json({ ok: true, msg: "API route is live" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // grab raw text first
    const text = await gasRes.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("🛠️ GAS returned non‑JSON:", text);
      return NextResponse.json(
        { error: "bad_gas_response", detail: text },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("🛠️ Proxy error:", err);
    return NextResponse.json(
      { error: "proxy_failure", detail: err.message },
      { status: 500 }
    );
  }
}
