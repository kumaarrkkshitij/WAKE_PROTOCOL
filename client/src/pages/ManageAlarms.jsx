import { useEffect, useState } from 'react'

export default function ManageAlarms({ onCreate, onEdit }) {
  const [alarms, setAlarms] = useState([])
  const [filter, setFilter] = useState('all')

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
  }, [])

  const toggleAlarm = (id) => {
    setAlarms(
      alarms.map((alarm) =>
        alarm.id === id
          ? { ...alarm, enabled: !alarm.enabled }
          : alarm
      )
    )
  }

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id))
  }

  const filteredAlarms = alarms.filter((alarm) => {
    if (filter === 'all') return true
    if (filter === 'inactive') return !alarm.enabled
    return alarm.category === filter
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
          <span>10:42</span>
          <small>PM</small>
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
            {filteredAlarms.map((alarm) => (
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