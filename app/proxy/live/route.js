import { NextResponse } from "next/server";
import match from "./match.json";

const DUMMY_JSON = [
  {
    success: "true",
    livescore: {
      title: "Data Not Found",
      update: "Match Stats will Update Soon...",
      current: "Data Not Found",
      runrate: "Data Not Found",
      batsman: "Data Not Found",
      batsmanrun: "Data Not Found",
      ballsfaced: "(Data Not Found)",
      sr: "Data Not Found",
      batsmantwo: "Data Not Found",
      batsmantworun: "Data Not Found",
      batsmantwoballfaced: "(Data Not Found)",
      batsmantwosr: "Data Not Found",
      bowler: "Data Not Found",
      bowlerover: "Data Not Found",
      bowlerruns: "Data Not Found",
      bowlerwickets: "Data Not Found",
      bowlereconomy: "Data Not Found",
      bowlertwo: "Data Not Found",
      bowlertwoover: "Data Not Found",
      bowlertworuns: "Data Not Found",
      bowlertwowickets: "Data Not Found",
      bowlertwoeconomy: "Data Not Found",
    },
  },
];

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  const MATCH_API = process.env.MATCH_API;
  if (!MATCH_API) {
    console.error("❌ Error: MATCH_API environment variable is missing.");
    return NextResponse.json(DUMMY_JSON, { status: 500, headers: SECURITY_HEADERS });
  }

  try {
    const apiUrl = `${MATCH_API}${match.live}`;
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.warn(`⚠️ Warning: API returned ${response.status} - ${response.statusText}`);
      return NextResponse.json(DUMMY_JSON, { status: response.status, headers: SECURITY_HEADERS });
    }

    const scoreData = await response.json();
    return NextResponse.json(scoreData, {
      status: 200,
      headers: SECURITY_HEADERS,
    });
  } catch (error) {
    console.error("❌ Error fetching match data:", error);
    return NextResponse.json(DUMMY_JSON, { status: 500, headers: SECURITY_HEADERS });
  }
}

const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=63072000",
};
