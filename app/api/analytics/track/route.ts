import {
  handleAnalyticsEnd,
  handleAnalyticsHeartbeat,
  handleAnalyticsTrack,
} from "@/lib/firebase/analytics-server";

export async function POST(request: Request) {
  return handleAnalyticsTrack(request);
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
