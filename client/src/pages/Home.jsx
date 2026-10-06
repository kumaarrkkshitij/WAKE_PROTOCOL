import { useEffect, useRef, useState } from 'react'
import { listAlarms } from '../api/index.js'

const dayKeys = ['SU', 'M', 'T', 'W', 'TH', 'F', 'SA']

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Clear old test consistency data once
function initializeConsistencyStorage() {
  const resetKey = 'wakeConsistencyInitialized'

  if (
    localStorage.getItem(resetKey) === 'true'
  ) {
    return
  }

  localStorage.removeItem('wakeConsistency')
  localStorage.setItem(
    resetKey,
    'true'
  )
}

function getConsistencyData() {
  initializeConsistencyStorage()

  const stored =
    JSON.parse(localStorage.getItem('wakeConsistency')) || {}

  const today = new Date()

  const isCompletedDay = (date) => {
    const dateKey = getLocalDateKey(date)

    return stored[dateKey] === 'completed'
  }

  let currentStreak = 0

  for (let offset = 0; offset < 365; offset++) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)

    if (isCompletedDay(date)) {
      currentStreak++
    } else {
      break
    }
  }

  let personalBest = 0
  let runningStreak = 0

  for (let offset = 364; offset >= 0; offset--) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)

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

  const lastSevenDays = []

  for (let offset = 6; offset >= 0; offset--) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)

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

function getNextAlarm(alarmList) {
  const now = new Date()
  const currentDay = now.getDay()
  const currentMinutes =
    now.getHours() * 60 + now.getMinutes()

  const candidates = []

  alarmList
    .filter((alarm) => alarm.enabled)
    .forEach((alarm) => {
      const [hours, minutes] =
        alarm.time.split(':').map(Number)

      let hour24 = hours

      if (alarm.period === 'AM') {
        hour24 = hours === 12 ? 0 : hours
      } else {
        hour24 =
          hours === 12 ? 12 : hours + 12
      }

      const alarmMinutes =
        hour24 * 60 + minutes

      const repeatDays =
        alarm.repeat_days || []

      for (let offset = 0; offset < 7; offset++) {
        const targetDay =
          (currentDay + offset) % 7

        const targetDayKey =
          dayKeys[targetDay]

        if (
          !repeatDays.includes(
            targetDayKey
          )
        ) {
          continue
        }

        if (
          offset === 0 &&
          alarmMinutes <= currentMinutes
        ) {
          continue
        }

        candidates.push({
          alarm,
          minutesUntil:
            offset * 24 * 60 +
            alarmMinutes -
            currentMinutes,
        })

        break
      }
    })

  candidates.sort(
    (a, b) =>
      a.minutesUntil -
      b.minutesUntil
  )

  return candidates[0] || null
}

function getTargetSleep(nextAlarm) {
  if (!nextAlarm) {
    return null
  }

  const [hours, minutes] =
    nextAlarm.alarm.time
      .split(':')
      .map(Number)

  let hour24 = hours

  if (nextAlarm.alarm.period === 'AM') {
    hour24 = hours === 12 ? 0 : hours
  } else {
    hour24 =
      hours === 12 ? 12 : hours + 12
  }

  const sleepMinutes =
    (
      hour24 * 60 +
      minutes -
      8 * 60 +
      24 * 60
    ) %
    (24 * 60)

  const sleepHour24 =
    Math.floor(
      sleepMinutes / 60
    )

  const sleepMinute =
    sleepMinutes % 60

  const period =
    sleepHour24 >= 12
      ? 'PM'
      : 'AM'

  const displayHour =
    sleepHour24 === 0
      ? 12
      : sleepHour24 > 12
        ? sleepHour24 - 12
        : sleepHour24

  return {
    time: `${displayHour}:${String(
      sleepMinute
    ).padStart(2, '0')}`,
    period,
  }
}

function formatRepeatDays(repeatDays) {
  if (
    !repeatDays ||
    repeatDays.length === 0
  ) {
    return 'No repeat days'
  }

  if (
    repeatDays.length === 5 &&
    ['M', 'T', 'W', 'TH', 'F'].every(
      (day) =>
        repeatDays.includes(day)
    )
  ) {
    return 'Mon — Fri'
  }

  if (repeatDays.length === 7) {
    return 'Every Day'
  }

  return repeatDays.join(' · ')
}

export default function Home({
  onAlarmStart,
}) {
  const [alarms, setAlarms] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [currentTime, setCurrentTime] =
    useState(new Date())

  const [consistency, setConsistency] =
    useState(getConsistencyData())

  const triggeredAlarmRef = useRef(
    sessionStorage.getItem(
      'wakeTriggeredAlarm'
    ) || null
  )

  useEffect(() => {
    listAlarms()
      .then((data) => {
        setAlarms(data)

        setConsistency(
          getConsistencyData()
        )
      })
      .catch((error) => {
        console.error(
          'Failed to load alarms:',
          error
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const timer =
      setInterval(() => {
        setCurrentTime(
          new Date()
        )
      }, 1000)

    return () =>
      clearInterval(timer)
  }, [])

  useEffect(() => {
    const updateConsistency =
      () => {
        setConsistency(
          getConsistencyData()
        )
      }

    window.addEventListener(
      'wake-consistency-updated',
      updateConsistency
    )

    window.addEventListener(
      'storage',
      updateConsistency
    )

    return () => {
      window.removeEventListener(
        'wake-consistency-updated',
        updateConsistency
      )

      window.removeEventListener(
        'storage',
        updateConsistency
      )
    }
  }, [alarms])

  useEffect(() => {
    if (!alarms.length) {
      return
    }

    const currentDay =
      currentTime.getDay()

    const currentHour =
      currentTime.getHours()

    const currentMinute =
      currentTime.getMinutes()

    alarms
      .filter(
        (alarm) => alarm.enabled
      )
      .forEach((alarm) => {
        const [hours, minutes] =
          alarm.time
            .split(':')
            .map(Number)

        let hour24 = hours

        if (alarm.period === 'AM') {
          hour24 =
            hours === 12
              ? 0
              : hours
        } else {
          hour24 =
            hours === 12
              ? 12
              : hours + 12
        }

        const repeatDays =
          alarm.repeat_days || []

        const dayKey =
          dayKeys[currentDay]

        const isScheduledNow =
          repeatDays.includes(
            dayKey
          ) &&
          hour24 === currentHour &&
          minutes === currentMinute

        const occurrenceKey =
          `${alarm.id}-${currentTime.toDateString()}-${alarm.time}-${alarm.period}`

        if (
          isScheduledNow &&
          triggeredAlarmRef.current !==
            occurrenceKey
        ) {
          triggeredAlarmRef.current =
            occurrenceKey

          sessionStorage.setItem(
            'wakeTriggeredAlarm',
            occurrenceKey
          )

          onAlarmStart?.(alarm)
        }
      })
  }, [
    alarms,
    currentTime,
    onAlarmStart,
  ])

  const nextAlarm =
    getNextAlarm(alarms)

  const targetSleep =
    getTargetSleep(nextAlarm)

  return (
    <>
      <header className="top-bar">
        <div className="brand">
          <div className="wake-logo">
            W
          </div>

          <div className="brand-text">
            <span className="protocol-label">
              <span className="status-dot" />
              WAKE // PROTOCOL
            </span>

            <h1>WAKE HUD</h1>
          </div>
        </div>

        <div className="live-time">
          <span>
            {currentTime
              .toLocaleTimeString(
                [],
                {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                }
              )
              .split(' ')[0]}
          </span>

          <small>
            {currentTime
              .toLocaleTimeString(
                [],
                {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                }
              )
              .split(' ')[1]}
          </small>
        </div>
      </header>

      <main className="main-content">
        <div className="home-content">

          {/* Next Alarm */}
          <section
            className="alarm-hero"
            onClick={() =>
              nextAlarm &&
              onAlarmStart?.(
                nextAlarm.alarm
              )
            }
          >
            <div className="ambient-glow glow-top" />
            <div className="ambient-glow glow-bottom" />

            <div className="hero-content">
              {loading ? (
                <div className="hero-status-row">
                  <div className="status-badge">
                    <span className="status-dot" />
                    Loading alarms...
                  </div>
                </div>
              ) : nextAlarm ? (
                <>
                  <div className="hero-status-row">
                    <div className="status-badge">
                      <span className="status-dot" />
                      Next Alarm
                    </div>

                    <span className="repeat-label">
                      {formatRepeatDays(
                        nextAlarm
                          .alarm
                          .repeat_days
                      )}
                    </span>
                  </div>

                  <div className="alarm-time-row">
                    <div className="alarm-time">
                      <span>
                        {
                          nextAlarm
                            .alarm
                            .time
                        }
                      </span>

                      <strong>
                        {
                          nextAlarm
                            .alarm
                            .period
                        }
                      </strong>
                    </div>

                    <div className="alarm-icon-box">
                      <span>⏰</span>
                    </div>
                  </div>

                  <div className="challenge-row">
                    <div className="challenge-pill">
                      <span>⌁</span>
                      {
                        nextAlarm
                          .alarm
                          .challenge_type
                      }
                    </div>
                  </div>
                </>
              ) : (
                <div className="hero-status-row">
                  <div className="status-badge">
                    <span className="status-dot" />
                    No Active Alarms
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Consistency */}
          <section className="stat-card">
            <div className="stat-header">
              <span>
                CONSISTENCY
              </span>

              <span className="stat-icon">
                🔥
              </span>
            </div>

            <div className="stat-value">
              <strong>
                {
                  consistency
                    .currentStreak
                }
              </strong>

              <span>
                days
              </span>
            </div>

            <div className="streak-bars">
              {[
                ...consistency
                  .lastSevenDays,
              ]
                .reverse()
                .map(
                  (
                    completed,
                    index
                  ) => (
                    <span
                      key={index}
                      className={
                        completed
                          ? 'completed'
                          : ''
                      }
                    />
                  )
                )}
            </div>

            <span className="stat-footer">
              Personal best:{' '}
              {
                consistency
                  .personalBest
              }
              d
            </span>
          </section>

          {/* Sleep Window */}
          <section className="sleep-card">
            <div className="sleep-header">
              <div className="status-badge">
                <span className="status-dot" />
                Protocol Status // Optimal Sleep
                Window
              </div>

              <span className="stat-icon">
                ☾
              </span>
            </div>

            <div className="sleep-main">
              <div>
                <div className="target-sleep">
                  <span>
                    Target Sleep:
                  </span>

                  {targetSleep ? (
                    <>
                      <strong>
                        {
                          targetSleep
                            .time
                        }
                      </strong>

                      <b>
                        {
                          targetSleep
                            .period
                        }
                      </b>
                    </>
                  ) : (
                    <strong>
                      --:--
                    </strong>
                  )}
                </div>

                <p>
                  8h calculated rest cycle
                </p>
              </div>

              <div className="sleep-icon-box">
                ☾
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}