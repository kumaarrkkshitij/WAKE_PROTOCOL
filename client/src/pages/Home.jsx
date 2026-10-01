import { useEffect, useState } from 'react'

const dayKeys = ['SU', 'M', 'T', 'W', 'TH', 'F', 'SA']

function getNextAlarm(alarmList) {
  const now = new Date()
  const currentDay = now.getDay()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const candidates = []

  alarmList
    .filter((alarm) => alarm.enabled)
    .forEach((alarm) => {
      const [hours, minutes] = alarm.time.split(':').map(Number)

      let hour24 = hours

      if (alarm.period === 'AM') {
        hour24 = hours === 12 ? 0 : hours
      } else {
        hour24 = hours === 12 ? 12 : hours + 12
      }

      const alarmMinutes = hour24 * 60 + minutes

      const repeatDays = alarm.repeat_days || []

      for (let offset = 0; offset < 7; offset++) {
        const targetDay = (currentDay + offset) % 7
        const targetDayKey = dayKeys[targetDay]

        if (!repeatDays.includes(targetDayKey)) {
          continue
        }

        if (offset === 0 && alarmMinutes <= currentMinutes) {
          continue
        }

        candidates.push({
          alarm,
          minutesUntil: offset * 24 * 60 + alarmMinutes - currentMinutes,
        })

        break
      }
    })

  candidates.sort((a, b) => a.minutesUntil - b.minutesUntil)

  return candidates[0] || null
}

function formatRepeatDays(repeatDays) {
  if (!repeatDays || repeatDays.length === 0) {
    return 'No repeat days'
  }

  if (
    repeatDays.length === 5 &&
    ['M', 'T', 'W', 'TH', 'F'].every((day) =>
      repeatDays.includes(day)
    )
  ) {
    return 'Mon — Fri'
  }

  if (
    repeatDays.length === 7
  ) {
    return 'Every Day'
  }

  return repeatDays.join(' · ')
}

export default function Home({ onAlarmStart }) {
  const [alarms, setAlarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    fetch('http://localhost:3000/api/alarms')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load alarms')
        }

        return response.json()
      })
      .then((data) => {
        setAlarms(data)
      })
      .catch((error) => {
        console.error('Failed to load alarms:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const nextAlarm = getNextAlarm(alarms)

  return (
    <>
      <header className="top-bar">
        <div className="brand">
          <div className="wake-logo">W</div>

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
            {currentTime.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }).split(' ')[0]}
          </span>

          <small>
            {currentTime.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }).split(' ')[1]}
          </small>
        </div>
      </header>

      <main className="main-content">
        <div className="home-content">

          {/* Next Alarm */}
          <section
            className="alarm-hero"
            onClick={() => nextAlarm && onAlarmStart?.(nextAlarm.alarm)}
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
                      {formatRepeatDays(nextAlarm.alarm.repeat_days)}
                    </span>
                  </div>

                  <div className="alarm-time-row">
                    <div className="alarm-time">
                      <span>{nextAlarm.alarm.time}</span>
                      <strong>{nextAlarm.alarm.period}</strong>
                    </div>

                    <div className="alarm-icon-box">
                      <span>⏰</span>
                    </div>
                  </div>

                  <div className="challenge-row">
                    <div className="challenge-pill">
                      <span>⌁</span>
                      {nextAlarm.alarm.challenge_type}
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
              <span>CONSISTENCY</span>
              <span className="stat-icon">🔥</span>
            </div>

            <div className="stat-value">
              <strong>7</strong>
              <span>days</span>
            </div>

            <div className="streak-bars">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <span className="stat-footer">
              Personal best: 14d
            </span>
          </section>

          {/* Sleep Window */}
          <section className="sleep-card">
            <div className="sleep-header">
              <div className="status-badge">
                <span className="status-dot" />
                Protocol Status // Optimal Sleep Window
              </div>

              <span className="stat-icon">☾</span>
            </div>

            <div className="sleep-main">
              <div>
                <div className="target-sleep">
                  <span>Target Sleep:</span>
                  <strong>10:45</strong>
                  <b>PM</b>
                </div>

                <p>7h 45m calculated rest cycle</p>
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