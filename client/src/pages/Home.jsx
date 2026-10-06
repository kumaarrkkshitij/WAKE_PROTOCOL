// Calculate streak and consistency metrics
function getConsistencyData(alarms = []) {
  const stored =
    JSON.parse(localStorage.getItem('wakeConsistency')) || {}

  const today = new Date()

  // No enabled alarms means there is no consistency to track
  const hasEnabledAlarms = alarms.some(
    (alarm) => alarm.enabled
  )

  if (!hasEnabledAlarms) {
    return {
      currentStreak: 0,
      personalBest: 0,
      lastSevenDays: Array(7).fill(false),
    }
  }

  // Check whether a specific date was successfully completed.
  // A day only counts if:
  // 1. An enabled alarm was scheduled for that day.
  // 2. That alarm was actually completed.
  const isCompletedDay = (date) => {
    const dateKey = getLocalDateKey(date)

    const hasAlarm =
      hasScheduledAlarm(alarms, date)

    const wasCompleted =
      stored[dateKey] === 'completed'

    return hasAlarm && wasCompleted
  }

  // Calculate current streak.
  // Today must be completed for the current streak to begin.
  let currentStreak = 0

  for (let offset = 0; offset < 365; offset++) {
    const date = new Date(today)

    date.setDate(
      today.getDate() - offset
    )

    if (isCompletedDay(date)) {
      currentStreak++
    } else {
      break
    }
  }

  // Calculate personal best from actual
  // completed alarm days.
  let personalBest = 0
  let runningStreak = 0

  for (let offset = 364; offset >= 0; offset--) {
    const date = new Date(today)

    date.setDate(
      today.getDate() - offset
    )

    if (isCompletedDay(date)) {
      runningStreak++

      personalBest = Math.max(
        personalBest,
        runningStreak
      )
    } else {
      runningStreak = 0
    }
  }

  // Display the most recent 7 days.
  // First bar = today
  // Second bar = yesterday
  // Third bar = 2 days ago
  // etc.
  const lastSevenDays = []

  for (let offset = 0; offset < 7; offset++) {
    const date = new Date(today)

    date.setDate(
      today.getDate() - offset
    )

    lastSevenDays.push(
      isCompletedDay(date)
    )
  }

  return {
    currentStreak,
    personalBest,
    lastSevenDays,
  }
}