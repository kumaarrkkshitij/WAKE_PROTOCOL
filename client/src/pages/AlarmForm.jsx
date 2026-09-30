import { useState } from 'react'

const days = [
  { key: 'M', label: 'M' },
  { key: 'T', label: 'T' },
  { key: 'W', label: 'W' },
  { key: 'TH', label: 'T' },
  { key: 'F', label: 'F' },
  { key: 'SA', label: 'S' },
  { key: 'SU', label: 'S' },
]

export default function AlarmForm({ mode = 'create', alarm = null, onCancel, onSave }) {
  const [time, setTime] = useState(alarm?.time || '06:30')
  const [period, setPeriod] = useState(alarm?.period || 'AM')
  const [name, setName] = useState(
    alarm?.name || 'Work Morning Power Wake'
  )
  const [repeatDays, setRepeatDays] = useState(
    alarm?.repeatDays || alarm?.repeat_days || ['M', 'T', 'W', 'TH', 'F']
  )
  const [challenge, setChallenge] = useState(
    alarm?.challengeType || 'Math'
  )
  const [music, setMusic] = useState(alarm?.music || '')

  const toggleDay = (day) => {
    setRepeatDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day]
    )
  }

  const handleMusicChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setMusic(file.name)
    }
  }

  const handleSave = async () => {
    try {
      const alarmData = {
        time,
        period,
        name,
        repeat_days: repeatDays,
        challenge_type: challenge,
        music,
        enabled: alarm?.enabled ?? true,
      }
  
      if (mode === 'create') {
        const response = await fetch('http://localhost:3000/api/alarms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alarmData),
        })
  
        if (!response.ok) {
          throw new Error('Failed to create alarm')
        }
  
        const savedAlarm = await response.json()
  
        console.log('Alarm created:', savedAlarm)
        onSave(savedAlarm)
        return
      }
  
      const response = await fetch(
        `http://localhost:3000/api/alarms/${alarm.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alarmData),
        }
      )
  
      if (!response.ok) {
        throw new Error('Failed to update alarm')
      }
  
      const updatedAlarm = await response.json()
  
      console.log('Alarm updated:', updatedAlarm)
      onSave(updatedAlarm)
    } catch (error) {
      console.error('Failed to save alarm:', error)
    }
  }

  return (
    <>
      <header className="top-bar">
        <div className="brand">
          <button
            className="back-button"
            onClick={onCancel}
            aria-label="Go back"
          >
            ←
          </button>

          <div className="brand-text">
            <span className="protocol-label">
              <span className="status-dot" />
              WAKE // PROTOCOL
            </span>
            <h1>{mode === 'edit' ? 'EDIT ALARM' : 'CREATE ALARM'}</h1>
          </div>
        </div>

        <div className="live-time">
          <span>10:42</span>
          <small>PM</small>
        </div>
      </header>

      <main className="main-content">
        <div className="alarm-form-content">

          <div className="form-actions">
            <button
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <span className="config-label">
              ● ALARM CONFIG
            </span>

            <button
              className="save-button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>

          {/* Time */}
            <section className="form-card time-card">
            <span className="form-label">ALARM TIME</span>

            <div className="roller-time-picker">

              {/* Hour */}
              <div className="time-column">
                <button
                  type="button"
                  className="roller-value faded"
                  onClick={() => {
                    const currentHour = Number(time.split(':')[0])
                    const previousHour = currentHour === 1 ? 12 : currentHour - 1

                    setTime(
                      `${String(previousHour).padStart(2, '0')}:${time.split(':')[1]}`
                    )
                  }}
                >
                  {(() => {
                    const currentHour = Number(time.split(':')[0])
                    return String(currentHour === 1 ? 12 : currentHour - 1).padStart(2, '0')
                  })()}
                </button>

                <div className="roller-selected">
                  {time.split(':')[0]}
                </div>

                <button
                  type="button"
                  className="roller-value faded"
                  onClick={() => {
                    const currentHour = Number(time.split(':')[0])
                    const nextHour = currentHour === 12 ? 1 : currentHour + 1

                    setTime(
                      `${String(nextHour).padStart(2, '0')}:${time.split(':')[1]}`
                    )
                  }}
                >
                  {(() => {
                    const currentHour = Number(time.split(':')[0])
                    return String(currentHour === 12 ? 1 : currentHour + 1).padStart(2, '0')
                  })()}
                </button>
              </div>

              <span className="time-separator">:</span>

              {/* Minute */}
              <div className="time-column">
                <button
                  type="button"
                  className="roller-value faded"
                  onClick={() => {
                    const [hours, minutes] = time.split(':')
                    const previousMinute = Number(minutes) === 0 ? 59 : Number(minutes) - 1

                    setTime(
                      `${hours}:${String(previousMinute).padStart(2, '0')}`
                    )
                  }}
                >
                  {(() => {
                    const minutes = Number(time.split(':')[1])
                    return String(minutes === 0 ? 59 : minutes - 1).padStart(2, '0')
                  })()}
                </button>

                <div className="roller-selected">
                  {time.split(':')[1]}
                </div>

                <button
                  type="button"
                  className="roller-value faded"
                  onClick={() => {
                    const [hours, minutes] = time.split(':')
                    const nextMinute = Number(minutes) === 59 ? 0 : Number(minutes) + 1

                    setTime(
                      `${hours}:${String(nextMinute).padStart(2, '0')}`
                    )
                  }}
                >
                  {(() => {
                    const minutes = Number(time.split(':')[1])
                    return String(minutes === 59 ? 0 : minutes + 1).padStart(2, '0')
                  })()}
                </button>
              </div>

              {/* AM / PM */}
              <div className="roller-period">
                <button
                  type="button"
                  className={period === 'AM' ? 'selected' : ''}
                  onClick={() => setPeriod('AM')}
                >
                  AM
                </button>

                <button
                  type="button"
                  className={period === 'PM' ? 'selected' : ''}
                  onClick={() => setPeriod('PM')}
                >
                  PM
                </button>
              </div>

            </div>

            <div className="time-helper">
              Tap the values above or below to adjust
            </div>
            </section>

          {/* Repeat */}
          <section className="form-card">
            <div className="form-section-header">
              <span className="form-label">REPEAT CYCLE</span>
              <span className="form-value">
                {repeatDays.length === 5 ? 'Every Weekday' : 'Custom'}
              </span>
            </div>

            <div className="day-picker">
              {days.map((day) => (
                <button
                  key={day.key}
                  className={
                    repeatDays.includes(day.key) ? 'selected' : ''
                  }
                  onClick={() => toggleDay(day.key)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </section>

          {/* Alarm Name */}
          <section className="form-card">
            <label
              className="form-label"
              htmlFor="alarm-name"
            >
              ALARM NAME
            </label>

            <input
              id="alarm-name"
              className="text-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter alarm name"
            />
          </section>

          {/* Challenge */}
          <section className="form-card">
            <div className="form-section-header">
              <span className="form-label">DISARM MISSION</span>
              <span className="required-label">REQUIRED</span>
            </div>

            <div className="challenge-options">
              <button
                className={challenge === 'Math' ? 'selected' : ''}
                onClick={() => setChallenge('Math')}
              >
                <span>🧮</span>
                <strong>Math</strong>
                <small>Solve equations</small>
              </button>

              <button
                className={challenge === 'Typing' ? 'selected' : ''}
                onClick={() => setChallenge('Typing')}
              >
                <span>⌨</span>
                <strong>Typing</strong>
                <small>Type the phrase</small>
              </button>
            </div>
          </section>

          {/* Music */}
          <section className="form-card">
            <span className="form-label">ALARM MUSIC</span>

            <label className="music-picker">
              <span className="music-icon">♪</span>

              <div>
                <strong>
                  {music || 'Choose local music'}
                </strong>

                <small>
                  Select an audio file from your device
                </small>
              </div>

              <input
                type="file"
                accept="audio/*"
                onChange={handleMusicChange}
              />
            </label>
          </section>

          <button
            className="save-alarm-button"
            onClick={handleSave}
          >
            ✓ Save Alarm Protocol
          </button>

          <p className="form-footer">
            WAKE Protocol • Alarm Configuration
          </p>

        </div>
      </main>
    </>
  )
}