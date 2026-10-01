import { useEffect, useState } from 'react'
import { getMathChallenge, getTypingChallenge } from '../api'

export default function ActiveAlarm({ alarm, challengeType = 'Math', onDismiss }) {
  const [answer, setAnswer] = useState('')
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [completed, setCompleted] = useState(false)

  const isTyping = challengeType === 'Typing'

  useEffect(() => {
    let cancelled = false

    const loadChallenge = async () => {
      setLoading(true)
      setError('')
      setAnswer('')
      setChallenge(null)
      setCompleted(false)

      try {
        const data = isTyping
          ? await getTypingChallenge()
          : await getMathChallenge()

        if (!cancelled) {
          setChallenge(data)
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message || 'Unable to load challenge.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadChallenge()

    return () => {
      cancelled = true
    }
  }, [isTyping])

  const handleKey = (value) => {
    setAnswer((current) => `${current}${value}`.slice(0, 4))
  }

  const handleBackspace = () => {
    setAnswer((current) => current.slice(0, -1))
  }

  const handleMathSubmit = () => {
    if (!challenge) return

    if (Number(answer) === Number(challenge.answer)) {
      setCompleted(true)
    } else {
      setAnswer('')
    }
  }

  const handleTypingSubmit = () => {
    if (!challenge) return

    if (answer.trim() === challenge.phrase.trim()) {
      setCompleted(true)
    } else {
      setAnswer('')
    }
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
          <span>{alarm?.time || '06:30'}</span>
          <strong>{alarm?.period || 'AM'}</strong>
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
        </div>

        {/* Progress */}
        <div className="challenge-progress">
          <span className="complete" />
        </div>

        {completed ? (
          <div className="challenge-prompt">
            <span>CHALLENGE COMPLETE</span>

            <div className="math-equation">
              ✓ ALARM DISARMED
            </div>
          </div>
        ) : loading ? (
          <div className="challenge-prompt">
            <span>CHALLENGE ERROR</span>

            <div className="math-equation">
              {error}
            </div>
          </div>
        ) : isTyping ? (
          <>
            {/* Typing Challenge */}
            <div className="challenge-prompt">
              <span>S TYPE TO DEACTIVATE</span>

              <div className="typing-phrase">
                {challenge?.phrase}
              </div>

              <input
                className="typing-input"
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type the phrase..."
                autoComplete="off"
              />
            </div>

            <button
              className="typing-submit"
              type="button"
              onClick={handleTypingSubmit}
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
                {challenge?.question} = ?
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
                onClick={handleMathSubmit}
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

      </section>

    </main>
  )
}