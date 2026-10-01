import type { ServiceKey } from "@/data/projects";

export type EstimateRequest = {
  service: ServiceKey;
  stage: string;
  budget?: string;
  name: string;
  phone: string;
  email?: string;
  zip?: string;
  description?: string;
};

/**
 * Single client-side integration point for estimate requests.
 * The default posts to /api/estimate, which can forward to a webhook
 * (Zapier, GoHighLevel, HubSpot, Make…) via ESTIMATE_WEBHOOK_URL.
 * To use Formspree directly instead, set NEXT_PUBLIC_FORM_ENDPOINT.
 */
export async function submitEstimate(data: EstimateRequest): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/estimate";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...data, source: "website", submittedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Estimate request failed (${res.status})`);
}
