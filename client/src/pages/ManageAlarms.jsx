import { useEffect, useState } from 'react'

export default function ManageAlarms({ onCreate, onEdit }) {
  const [alarms, setAlarms] = useState([])
  const [filter, setFilter] = useState('all')
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
        const mappedAlarms = data.map((alarm) => ({
          ...alarm,
          days: alarm.repeat_days?.join(', ') || '',
          challenge: alarm.challenge_type,
        }))
      
        setAlarms(mappedAlarms)
      })

      .catch((error) => {
        console.error('Failed to load alarms:', error)
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleAlarm = async (id) => {
    const alarm = alarms.find((item) => item.id === id)
  
    if (!alarm) return
  
    const updatedEnabled = !alarm.enabled
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/alarms/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            time: alarm.time,
            period: alarm.period,
            name: alarm.name,
            repeat_days: alarm.repeat_days || [],
            challenge_type: alarm.challenge_type,
            music: alarm.music || '',
            enabled: updatedEnabled,
          }),
        }
      )
  
      if (!response.ok) {
        throw new Error('Failed to update alarm')
      }
  
      const updatedAlarm = await response.json()
  
      setAlarms((currentAlarms) =>
        currentAlarms.map((item) =>
          item.id === id
            ? {
                ...item,
                ...updatedAlarm,
                days: updatedAlarm.repeat_days?.join(', ') || '',
                challenge: updatedAlarm.challenge_type,
              }
            : item
        )
      )
    } catch (error) {
      console.error('Failed to toggle alarm:', error)
    }
  }

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id))
  }

  const filteredAlarms = alarms.filter((alarm) => {
    if (filter === 'all') return true
  
    if (filter === 'inactive') {
      return !alarm.enabled
    }
  
    if (filter === 'workdays') {
      const workdays = ['M', 'T', 'W', 'TH', 'F']
  
      return workdays.some((day) =>
        alarm.repeat_days?.includes(day)
      )
    }
  
    if (filter === 'weekend') {
      const weekend = ['SA', 'SU']
  
      return weekend.some((day) =>
        alarm.repeat_days?.includes(day)
      )
    }
  
    return true
  })

  const sortedAlarms = [...filteredAlarms].sort((a, b) => {
    const toMinutes = (alarm) => {
      const [hours, minutes] = alarm.time.split(':').map(Number)
  
      let hour24 = hours
  
      if (alarm.period === 'AM') {
        hour24 = hours === 12 ? 0 : hours
      } else {
        hour24 = hours === 12 ? 12 : hours + 12
      }
  
      return hour24 * 60 + minutes
    }
  
    return toMinutes(a) - toMinutes(b)
  })

  return (
    <>
      {/* Same Header as Home */}
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
        <div className="manage-content">

          {/* Header Module */}
          <section className="manage-hero">
            <div>
              <div className="next-alarm-label">
                <span className="status-dot" />
                Next Alarm in 7h 14m
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
              ['all', `All (${alarms.length})`],
              ['workdays', 'Workdays'],
              ['weekend', 'Weekend'],
              ['inactive', `Inactive (${alarms.filter((a) => !a.enabled).length})`],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`filter-chip ${filter === value ? 'active' : ''}`}
                onClick={() => setFilter(value)}
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
                  !alarm.enabled ? 'inactive' : ''
                }`}
                key={alarm.id}
              >
                <div className="alarm-card-top">
                  <div>
                    <div className="manage-alarm-time">
                      {alarm.time}
                      <span>{alarm.period}</span>
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
                      alarm.enabled ? 'active' : ''
                    }`}
                    onClick={() => toggleAlarm(alarm.id)}
                    aria-label="Toggle alarm"
                    aria-pressed={alarm.enabled}
                  >
                    <span />
                  </button>
                </div>

                <div className="mission-box">
                  <div className="mission-icon">
                    {alarm.challenge.startsWith('Math') ? '∑' : '⌨'}
                  </div>

                  <div className="mission-info">
                    <strong>Mission Required</strong>
                    <span>{alarm.challenge}</span>
                  </div>

                  <span className="mission-lock">🔒</span>
                </div>

                <div className="alarm-card-footer">
                  <span className="music-label">
                    ♪ Music: {alarm.music}
                  </span>

                  <div className="alarm-actions">
                  <button
                    title="Edit Alarm"
                    onClick={() => onEdit(alarm)}
                  >
                    ✎
                  </button> 

                    <button
                      title="Delete Alarm"
                      onClick={() => deleteAlarm(alarm.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Motivation */}
          <section className="motivation-card">
            <div className="motivation-icon">⚡</div>

            <div>
              <span>WAKEUP STREAK</span>
              <strong>14 Days Perfect</strong>
              <p>
                Your protocol prevented 18 snooze cycles this week.
              </p>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}