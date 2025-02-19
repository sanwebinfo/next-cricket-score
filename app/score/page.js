"use client"

import { useState, useEffect, useCallback } from "react"

export default function Score() {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  const matchId = searchParams.get("id") || "12345"

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
  const [autoRefresh, setAutoRefresh] = useState(false)

  const fetchMatchData = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/proxy/match/${matchId}`)
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
  }, [matchId])

  useEffect(() => {
    fetchMatchData()
    if (autoRefresh) {
      const interval = setInterval(fetchMatchData, 30000)
      return () => clearInterval(interval)
    }
  }, [fetchMatchData, autoRefresh])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-zinc-700 text-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      {/* Match ID Input */}
      <form method="GET" className="flex w-full max-w-md mb-4">
        <input
          id="id"
          name="id"
          className="flex-1 px-4 py-2 text-gray-900 bg-white rounded-l-lg border border-gray-400 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Match ID"
          defaultValue={matchId}
          autoComplete="off"
          maxLength={30}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
        >
          GET
        </button>
      </form>

      {/* Match Data Card */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-300">
        {loading ? (
          <p className="text-center animate-pulse text-gray-700">Fetching match data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : matchData.batsman === "Data Not Found" ? (
          <p className="text-gray-800">
            🏏 {matchData.title}
            <br />
            📊 {matchData.update}
          </p>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-900">🏏 {matchData.title}</p>
            <p className="text-gray-700">{matchData.update}</p>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-400">
              <p className="text-xl font-bold text-green-700 text-center">🔴 {matchData.score}</p>
              <p className="text-md text-gray-900">
                🏏 <span className="font-semibold">{matchData.batsman}</span>:{" "}
                <span className="text-green-600 font-bold">{matchData.batsmanRun} Runs</span> 
                (<span className="text-gray-700">{matchData.batsmanBalls} Balls</span>)
              </p>
              <p className="text-md text-gray-900">
                🥎 <span className="font-semibold">{matchData.bowler}</span>:{" "}
                <span className="text-blue-600 font-semibold">{matchData.bowlerOver} Overs</span>,{" "}
                <span className="text-red-600 font-semibold">{matchData.bowlerRuns} Runs</span>,{" "}
                <span className="text-purple-600 font-semibold">{matchData.bowlerWickets} Wickets</span>
              </p>
              <p className="text-md text-gray-600">📉 Run Rate: {matchData.runRate}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col mt-4 gap-3">
              <button
                className="w-full py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                onClick={fetchMatchData}
              >
                Refresh ▶
              </button>
              <button
                className={`w-full py-2 text-white rounded-md shadow-md ${
                  autoRefresh ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"
                } transition`}
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? "Stop Auto-Refresh ⏸" : "Enable Auto-Refresh 🔄"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
