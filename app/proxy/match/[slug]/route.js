import { NextResponse } from "next/server";

const DUMMY_JSON = {
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
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request, context) {
  try {

    const params = await new Promise((resolve) => resolve(context.params));

    if (!params?.slug) {
      return NextResponse.json({ error: "Missing match ID" }, { status: 400 });
    }

    const matchId = params.slug;
    const apiUrl = `${process.env.MATCH_API}${matchId}`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(DUMMY_JSON, { status: response.status });
    }

    const scoreData = await response.json();
    return NextResponse.json(scoreData, {
      status: 200,
      headers: securityHeaders(),
    });
  } catch (error) {
    console.error("Error fetching match data:", error);
    return NextResponse.json(DUMMY_JSON, {
      status: 500,
      headers: securityHeaders(),
    });
  }
}

function securityHeaders() {
  return {
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "X-Content-Type-Options": "nosniff",
    "Strict-Transport-Security": "max-age=63072000",
  };
}
