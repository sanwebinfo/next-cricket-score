import { NextResponse } from "next/server"
import match from "./match.json"

const dummy_json = [{"success":"true","livescore":{"title":"Data Not Found","update":"Match Stats will Update Soon...","current":"Data Not Found","runrate":"Data Not Found","batsman":"Data Not Found","batsmanrun":"Data Not Found","ballsfaced":"(Data Not Found)","sr":"Data Not Found","batsmantwo":"Data Not Found","batsmantworun":"Data Not Found","batsmantwoballfaced":"(Data Not Found)","batsmantwosr":"Data Not Found","bowler":"Data Not Found","bowlerover":"Data Not Found","bowlerruns":"Data Not Found","bowlerwickets":"Data Not Found","bowlereconomy":"Data Not Found","bowlertwo":"Data Not Found","bowlertwoover":"Data Not Found","bowlertworuns":"Data Not Found","bowlertwowickets":"Data Not Found","bowlertwoeconomy":"Data Not Found"}}]

export const fetchCache = 'force-no-store'
export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const str = process.env.MATCH_API + match.live
    const response = await fetch(str, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 0 }
    })

    const score_data = await response.json()

    if (response.status == 200) {
      return NextResponse.json(score_data, {
        status: 200,
        headers: {
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
          "X-Content-Type-Options": "nosniff",
          "Strict-Transport-Security": "max-age=63072000",
        },
      })
    } else {
      return NextResponse.json(dummy_json, {
        status: 404,
        headers: {
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
          "X-Content-Type-Options": "nosniff",
          "Strict-Transport-Security": "max-age=63072000",
        },
      })
    }
  } catch (error) {
    return NextResponse.json(dummy_json, {
      status: 404,
      headers: {
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=63072000",
      },
    })
  }
}