// app/api/contact/route.ts
import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwlcEGaNqp1kgBEfOeanVyouRGEXzG0ybQOuPEUWr6kqT64ul3xQ9JXURZrCJxwKdU0Fg/exec"!;

export async function POST(request: Request) {
  try {
    const form = await request.json();

    // Forward to Google Apps Script
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // Read raw text
    const text = await res.text();

    // Try to parse JSON, otherwise log and return error
    let result: any;
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      console.error("GAS returned non-JSON:", text);
      return NextResponse.json(
        { success: false, error: "Invalid response from server." },
        { status: 502 }
      );
    }

    return NextResponse.json(result, { status: res.ok ? 200 : 500 });
  } catch (err) {
    console.error("API Route error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
