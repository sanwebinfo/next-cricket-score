"use client"

import { useState, useEffect } from "react"

export default function Index2() {
  const [matchData, setMatchData] = useState({
    title: "Match Name...",
    score: "Live Score Data...",
    batsman: "Batsman Data...",
    batsmanRun: "",
    batsmanBalls: "",
    bowler: "",
    bowlerRuns: "",
    bowlerOver: "",
    bowlerWickets: "",
    runRate: "Fetching Run rate...",
    update: "Match Update",
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchMatchData = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/proxy/live")
      if (!response.ok) throw new Error("Failed to fetch match data")

      const data = await response.json()
      setMatchData({
        title: data.livescore.title,
        score: data.livescore.current,
        batsman: data.livescore.batsman,
        batsmanRun: data.livescore.batsmanrun,
        batsmanBalls: data.livescore.ballsfaced,
        bowler: data.livescore.bowler,
        bowlerOver: data.livescore.bowlerover,
        bowlerRuns: data.livescore.bowlerruns,
        bowlerWickets: data.livescore.bowlerwickets,
        runRate: data.livescore.runrate,
        update: data.livescore.update,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatchData()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-700 text-gray-900 px-4">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-200 to-gray-100 p-5 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-xl font-bold text-blue-700 mb-3">{matchData.title}</h2>

        <div className="bg-white p-5 rounded-md shadow-md border border-gray-300">
          {loading ? (
            <p className="text-gray-600 text-center animate-pulse text-sm">Fetching match data...</p>
          ) : error ? (
            <p className="text-red-500 text-sm text-center">{error}</p>
          ) : matchData.batsman === "Data Not Found" ? (
            <p className="text-gray-800 text-sm">
              🏏 {matchData.title}
              <br />
              📊 {matchData.update}
            </p>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-900 text-center">{matchData.update}</p>

              <div className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm border border-gray-400">
                <p className="text-lg font-bold text-green-700 text-center">🔴 {matchData.score}</p>
                <p className="text-sm text-gray-900">
                  🏏 <span className="font-semibold">{matchData.batsman}</span>:{" "}
                  <span className="text-green-600 font-semibold">{matchData.batsmanRun} Runs</span> 
                  (<span className="text-gray-700">{matchData.batsmanBalls} Balls</span>)
                </p>
                <p className="text-sm text-gray-900">
                  🥎 <span className="font-semibold">{matchData.bowler}</span>:{" "}
                  <span className="text-blue-600 font-semibold">{matchData.bowlerOver} Overs</span>,{" "}
                  <span className="text-red-600 font-semibold">{matchData.bowlerRuns} Runs</span>,{" "}
                  <span className="text-purple-600 font-semibold">{matchData.bowlerWickets} Wickets</span>
                </p>
                <p className="text-sm text-gray-600">📉 Run Rate: {matchData.runRate}</p>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className="py-2 px-5 bg-blue-600 text-white text-sm rounded-md shadow-md hover:bg-blue-700 transition"
                  onClick={fetchMatchData}
                >
                  Refresh ▶
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
