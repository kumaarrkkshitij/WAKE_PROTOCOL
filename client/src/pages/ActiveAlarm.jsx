import { useState } from 'react'

export default function ActiveAlarm({ challengeType = 'Math', onDismiss }) {
  const [answer, setAnswer] = useState('')
  const isTyping = challengeType === 'Typing'

  const handleKey = (value) => {
    setAnswer((current) => `${current}${value}`.slice(0, 4))
  }

  const handleBackspace = () => {
    setAnswer((current) => current.slice(0, -1))
  }

  return (
    <main className="active-alarm-screen">

      {/* Ambient HUD Lighting */}
      <div className="active-glow active-glow-top" />
      <div className="active-glow active-glow-bottom" />

      {/* Status Header */}
      <section className="active-status-bar">
        <div className="active-status-left">
          <span className="status-dot" />
          <span>WAKE PROTOCOL ACTIVE</span>
        </div>

        <div className="active-gain">
          <span>◉</span>
          <span>100% GAIN LOCK</span>
        </div>
      </section>

      {/* Alarm Time */}
      <section className="active-time-section">
        <div className="active-time-display">
          <span>06:30</span>
          <strong>AM</strong>
        </div>

        <div className="active-lock-badge">
          <span>◆</span>
          TACTICAL LOCKDOWN • DISARM REQUIRED
        </div>
      </section>

      {/* Challenge Card */}
      <section className="challenge-card">

        <div className="challenge-header">
          <div className="challenge-title">
            <span className="challenge-symbol">
              {isTyping ? '⌨' : '∑'}
            </span>

            <span>
              {isTyping ? 'Typing Mission' : 'Math Mission'}
            </span>
          </div>

          <span className="stage-badge">
            STAGE 02 / 03
          </span>
        </div>

        {/* Progress */}
        <div className="challenge-progress">
          <span className="complete" />
          <span className="complete" />
          <span />
        </div>

        {isTyping ? (
          <>
            {/* Typing Challenge */}
            <div className="challenge-prompt">
              <span>S TYPE TO DEACTIVATE</span>

              <div className="typing-phrase">
                WAKE UP AND START STRONG
              </div>

              <input
                className="typing-input"
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type the phrase..."
                autoComplete="off"
                autoCapitalize="characters"
              />
            </div>

            <button
              className="typing-submit"
              type="button"
              onClick={() => setAnswer('')}
            >
              ✓ SUBMIT
            </button>
          </>
        ) : (
          <>
            {/* Math Challenge */}
            <div className="challenge-prompt">
              <span>SOLVE TO DEACTIVATE</span>

              <div className="math-equation">
                (47 + 28) − 19 = ?
              </div>

              <div className="answer-display">
                {answer || ' '}
                <span className="answer-caret" />
              </div>
            </div>

            {/* Keypad */}
            <div className="number-keypad">

              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => handleKey(number)}
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                className="keypad-special"
                onClick={handleBackspace}
              >
                ⌫
              </button>

              <button
                type="button"
                onClick={() => handleKey(0)}
              >
                0
              </button>

              <button
                type="button"
                className="keypad-submit"
                onClick={() => {}}
              >
                ✓
              </button>

            </div>
          </>
        )}

      </section>

      {/* Bottom Information */}
      <section className="active-bottom">

        <div className="alarm-music-status">
          <span className="music-wave">♪</span>

          <div>
            <strong>ALARM MUSIC</strong>
            <span>Playing selected alarm audio</span>
          </div>

          <span className="playing-indicator">●</span>
        </div>

        <div className="active-disclaimer">
          <span>◆</span>

          <p>
            {isTyping
              ? 'Type the complete phrase correctly to silence the alarm.'
              : 'Solve all 3 equations correctly to silence the alarm.'}
          </p>
        </div>

      </section>

    </main>
  )
}