import { NextResponse } from "next/server";

const SERVICES = ["kitchen", "bathroom", "addition", "deck", "custom"];

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const lead = {
    service: clean(body.service, 20),
    stage: clean(body.stage, 60),
    budget: clean(body.budget, 60),
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    zip: clean(body.zip, 10),
    description: clean(body.description, 2000),
    source: clean(body.source, 40),
    submittedAt: clean(body.submittedAt, 40),
  };

  if (!SERVICES.includes(lead.service) || !lead.name || lead.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  // Forward to a CRM / automation webhook when configured.
  const webhook = process.env.ESTIMATE_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.info("[estimate] received (no ESTIMATE_WEBHOOK_URL set)", { service: lead.service, stage: lead.stage });
  }

  return NextResponse.json({ ok: true });
}
