import { useEffect, useState } from 'react'
import {
  listAlarms,
  updateAlarm,
  deleteAlarm as deleteAlarmRequest,
} from '../api/index.js'
import { deleteAlarmMusic } from '../utils/alarmMusic'

const dayKeys = ['SU', 'M', 'T', 'W', 'TH', 'F', 'SA']

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

        if (!repeatDays.includes(targetDayKey)) {
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
    (a, b) => a.minutesUntil - b.minutesUntil
  )

  return candidates[0] || null
}

function formatNextAlarm(minutesUntil) {
  if (minutesUntil === null) {
    return null
  }

  const days = Math.floor(
    minutesUntil / (24 * 60)
  )

  const hours = Math.floor(
    (minutesUntil % (24 * 60)) / 60
  )

  const minutes = minutesUntil % 60

  if (days > 0) {
    return `${days}d ${hours}h`
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  return `${minutes}m`
}

export default function ManageAlarms({ onCreate, onEdit }) {
  const [alarms, setAlarms] = useState([])
  const [filter, setFilter] = useState('all')
  const [currentTime, setCurrentTime] =
    useState(new Date())

  useEffect(() => {
    listAlarms()
      .then((data) => {
        const mappedAlarms = data.map((alarm) => ({
          ...alarm,
          days:
            alarm.repeat_days?.join(', ') || '',
          challenge: alarm.challenge_type,
        }))

        setAlarms(mappedAlarms)
      })
      .catch((error) => {
        console.error(
          'Failed to load alarms:',
          error
        )
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleAlarm = async (id) => {
    const alarm = alarms.find(
      (item) => item.id === id
    )

    if (!alarm) return

    const updatedEnabled = !alarm.enabled

    try {
      const updatedAlarm = await updateAlarm(
        id,
        {
          time: alarm.time,
          period: alarm.period,
          name: alarm.name,
          repeat_days:
            alarm.repeat_days || [],
          challenge_type:
            alarm.challenge_type,
          music: alarm.music || '',
          enabled: updatedEnabled,
        }
      )

      setAlarms((currentAlarms) =>
        currentAlarms.map((item) =>
          item.id === id
            ? {
                ...item,
                ...updatedAlarm,
                days:
                  updatedAlarm.repeat_days?.join(
                    ', '
                  ) || '',
                challenge:
                  updatedAlarm.challenge_type,
              }
            : item
        )
      )
    } catch (error) {
      console.error(
        'Failed to toggle alarm:',
        error
      )
    }
  }

  const deleteAlarm = async (id) => {
    try {
      await deleteAlarmRequest(id)

      await deleteAlarmMusic(id)

      setAlarms((currentAlarms) =>
        currentAlarms.filter(
          (alarm) => alarm.id !== id
        )
      )
    } catch (error) {
      console.error(
        'Failed to delete alarm:',
        error
      )
    }
  }

  const filteredAlarms = alarms.filter(
    (alarm) => {
      if (filter === 'all') return true

      if (filter === 'inactive') {
        return !alarm.enabled
      }

      const repeatDays =
        alarm.repeat_days || []

      if (filter === 'workdays') {
        const workdays = [
          'M',
          'T',
          'W',
          'TH',
          'F',
        ]

        return repeatDays.some((day) =>
          workdays.includes(day)
        )
      }

      if (filter === 'weekend') {
        const weekend = ['SA', 'SU']

        return repeatDays.some((day) =>
          weekend.includes(day)
        )
      }

      return true
    }
  )

  const sortedAlarms = [
    ...filteredAlarms,
  ].sort((a, b) => {
    const toMinutes = (alarm) => {
      const [hours, minutes] =
        alarm.time.split(':').map(Number)

      let hour24 = hours

      if (alarm.period === 'AM') {
        hour24 =
          hours === 12 ? 0 : hours
      } else {
        hour24 =
          hours === 12 ? 12 : hours + 12
      }

      return hour24 * 60 + minutes
    }

    return toMinutes(a) - toMinutes(b)
  })

  const nextAlarm = getNextAlarm(alarms)

  const nextAlarmText = nextAlarm
    ? formatNextAlarm(
        nextAlarm.minutesUntil
      )
    : null

  return (
    <>
      {/* Same Header as Home */}
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
              .toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .split(' ')[0]}
          </span>

          <small>
            {currentTime
              .toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .split(' ')[1]}
          </small>
        </div>
      </header>

      <main className="main-content">
        <div className="manage-content">

          {/* Header Module */}
          <section className="manage-hero">
            <div>
              <div className="next-alarm-label">
                <span className="status-dot" />

                {nextAlarm
                  ? `Next Alarm in ${nextAlarmText}`
                  : 'No Active Alarms'}
              </div>

              <h2>Active Protocol</h2>
            </div>

            <button
              className="new-alarm-button"
              onClick={onCreate}
            >
              + New Alarm
            </button>
          </section>

          {/* Filters */}
          <div className="filter-bar">
            {[
              [
                'all',
                `All (${alarms.length})`,
              ],
              ['workdays', 'Workdays'],
              ['weekend', 'Weekend'],
              [
                'inactive',
                `Inactive (${
                  alarms.filter(
                    (a) => !a.enabled
                  ).length
                })`,
              ],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`filter-chip ${
                  filter === value
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setFilter(value)
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Alarm List */}
          <div className="manage-alarm-list">
            {sortedAlarms.map((alarm) => (
              <section
                className={`manage-alarm-card ${
                  !alarm.enabled
                    ? 'inactive'
                    : ''
                }`}
                key={alarm.id}
              >
                <div className="alarm-card-top">
                  <div>
                    <div className="manage-alarm-time">
                      {alarm.time}
                      <span>
                        {alarm.period}
                      </span>
                    </div>

                    <div className="manage-alarm-name">
                      {alarm.name}
                    </div>

                    <div className="alarm-days">
                      📅 {alarm.days}
                    </div>
                  </div>

                  <button
                    className={`alarm-toggle ${
                      alarm.enabled
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      toggleAlarm(alarm.id)
                    }
                    aria-label="Toggle alarm"
                    aria-pressed={
                      alarm.enabled
                    }
                  >
                    <span />
                  </button>
                </div>

                <div className="mission-box">
                  <div className="mission-icon">
                    {alarm.challenge.startsWith(
                      'Math'
                    )
                      ? '∑'
                      : '⌨'}
                  </div>

                  <div className="mission-info">
                    <strong>
                      Mission Required
                    </strong>

                    <span>
                      {alarm.challenge}
                    </span>
                  </div>

                  <span className="mission-lock">
                    🔒
                  </span>
                </div>

                <div className="alarm-card-footer">
                  <span className="music-label">
                    ♪ Music: {alarm.music}
                  </span>

                  <div className="alarm-actions">
                    <button
                      title="Edit Alarm"
                      onClick={() =>
                        onEdit(alarm)
                      }
                    >
                      ✎
                    </button>

                    <button
                      title="Delete Alarm"
                      onClick={() =>
                        deleteAlarm(alarm.id)
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </div>

        </div>
      </main>
    </>
  )
}