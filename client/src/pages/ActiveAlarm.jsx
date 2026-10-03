import { useEffect, useRef, useState } from 'react'
import {
  getAllMathChallenges,
  getAllTypingChallenges,
} from '../api'
import { getAlarmMusic } from '../utils/alarmMusic'

function saveConsistencyResult(result) {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  const dateKey = `${year}-${month}-${day}`

  const stored =
    JSON.parse(localStorage.getItem('wakeConsistency')) || {}

  stored[dateKey] = result

  localStorage.setItem(
    'wakeConsistency',
    JSON.stringify(stored)
  )

  window.dispatchEvent(
    new Event('wake-consistency-updated')
  )
}

function getChallengeKey(challenge, isTyping) {
  if (!challenge) {
    return ''
  }

  return isTyping
    ? challenge.phrase
    : `${challenge.question}|${challenge.answer}`
}

function shuffleArray(items) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    )

    ;[shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ]
  }

  return shuffled
}

export default function ActiveAlarm({
  alarm,
  challengeType = 'Math',
  onDismiss,
}) {
  const [answer, setAnswer] = useState('')
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [completed, setCompleted] = useState(false)

  const audioRef = useRef(null)
  const audioUrlRef = useRef(null)

  const isTyping = challengeType === 'Typing'

  const handleAudioEnded = () => {
    if (completed) {
      return
    }

    saveConsistencyResult('missed')
    onDismiss?.()
  }

  useEffect(() => {
    let cancelled = false

    const loadChallenge = async () => {
      setLoading(true)
      setError('')
      setAnswer('')
      setChallenge(null)
      setCompleted(false)

      try {
        const storageKey = isTyping
          ? `wakeUsedTypingChallenges_${alarm?.id}`
          : `wakeUsedMathChallenges_${alarm?.id}`

        const poolKey = isTyping
          ? 'wakeTypingChallengePool'
          : 'wakeMathChallengePool'

        let usedChallenges = []

        try {
          const storedUsed =
            JSON.parse(
              sessionStorage.getItem(storageKey)
            ) || []

          if (Array.isArray(storedUsed)) {
            usedChallenges = storedUsed
          }
        } catch {
          usedChallenges = []
        }

        let challengePool = []

        try {
          const storedPool =
            JSON.parse(
              sessionStorage.getItem(poolKey)
            ) || []

          if (Array.isArray(storedPool)) {
            challengePool = storedPool
          }
        } catch {
          challengePool = []
        }

        /*
         * Load the complete 400-question pool if it
         * is not already available in this session.
         */
        if (challengePool.length === 0) {
          challengePool = isTyping
            ? await getAllTypingChallenges()
            : await getAllMathChallenges()

          challengePool = shuffleArray(challengePool)

          sessionStorage.setItem(
            poolKey,
            JSON.stringify(challengePool)
          )
        }

        /*
         * Find the first challenge from the shuffled
         * pool that this alarm has not used yet.
         */
        const usedSet = new Set(usedChallenges)

        let nextChallenge = null
        let nextIndex = -1

        for (
          let index = 0;
          index < challengePool.length;
          index += 1
        ) {
          const candidate = challengePool[index]
          const candidateKey =
            getChallengeKey(candidate, isTyping)

          if (!usedSet.has(candidateKey)) {
            nextChallenge = candidate
            nextIndex = index
            break
          }
        }

        /*
         * If this alarm has already used every challenge,
         * start a new shuffled cycle.
         */
        if (!nextChallenge) {
          challengePool = shuffleArray(challengePool)

          sessionStorage.setItem(
            poolKey,
            JSON.stringify(challengePool)
          )

          usedChallenges = []

          nextChallenge = challengePool[0]
          nextIndex = 0
        }

        if (nextChallenge) {
          const challengeKey =
            getChallengeKey(
              nextChallenge,
              isTyping
            )

          usedChallenges.push(challengeKey)

          sessionStorage.setItem(
            storageKey,
            JSON.stringify(usedChallenges)
          )

          /*
           * Move the selected challenge to the end
           * of the pool. This keeps the remaining
           * challenges available for future alarms.
           */
          if (nextIndex > -1) {
            const selected =
              challengePool.splice(nextIndex, 1)[0]

            challengePool.push(selected)

            sessionStorage.setItem(
              poolKey,
              JSON.stringify(challengePool)
            )
          }
        }

        if (!cancelled) {
          setChallenge(nextChallenge)
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError.message ||
              'Unable to load challenge.'
          )
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
  }, [isTyping, alarm?.id])

  useEffect(() => {
    let cancelled = false

    const loadMusic = async () => {
      const audio = audioRef.current

      if (!audio || !alarm?.id) {
        return
      }

      try {
        const musicFile =
          await getAlarmMusic(alarm.id)

        if (cancelled) {
          return
        }

        if (!musicFile) {
          console.warn(
            'No uploaded music found for this alarm.'
          )
          return
        }

        const audioUrl =
          URL.createObjectURL(musicFile)

        audioUrlRef.current = audioUrl
        audio.src = audioUrl

        await audio.play()
      } catch (musicError) {
        if (!cancelled) {
          console.error(
            'Failed to load or play alarm music:',
            musicError
          )
        }
      }
    }

    loadMusic()

    return () => {
      cancelled = true

      const audio = audioRef.current

      if (audio) {
        audio.pause()
        audio.currentTime = 0
        audio.removeAttribute('src')
        audio.load()
      }

      if (audioUrlRef.current) {
        URL.revokeObjectURL(
          audioUrlRef.current
        )

        audioUrlRef.current = null
      }
    }
  }, [alarm?.id])

  useEffect(() => {
    if (!completed) {
      return
    }

    const timer = setTimeout(() => {
      onDismiss?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [completed, onDismiss])

  const handleKey = (value) => {
    setAnswer((current) =>
      `${current}${value}`.slice(0, 4)
    )
  }

  const handleBackspace = () => {
    setAnswer((current) =>
      current.slice(0, -1)
    )
  }

  const handleMathSubmit = () => {
    if (!challenge) {
      return
    }

    if (
      Number(answer) ===
      Number(challenge.answer)
    ) {
      saveConsistencyResult('completed')

      setCompleted(true)

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    } else {
      setAnswer('')
    }
  }

  const handleTypingSubmit = () => {
    if (!challenge) {
      return
    }

    if (
      answer.trim() ===
      challenge.phrase.trim()
    ) {
      saveConsistencyResult('completed')

      setCompleted(true)

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    } else {
      setAnswer('')
    }
  }

  return (
    <main className="active-alarm-screen">
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      <div className="active-glow active-glow-top" />
      <div className="active-glow active-glow-bottom" />

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

      <section className="active-time-section">
        <div className="active-time-display">
          <span>{alarm?.time || '06:30'}</span>
          <strong>
            {alarm?.period || 'AM'}
          </strong>
        </div>

        <div className="active-lock-badge">
          <span>◆</span>
          TACTICAL LOCKDOWN • DISARM REQUIRED
        </div>
      </section>

      <section className="challenge-card">
        <div className="challenge-header">
          <div className="challenge-title">
            <span className="challenge-symbol">
              {isTyping ? '⌨' : '∑'}
            </span>

            <span>
              {isTyping
                ? 'Typing Mission'
                : 'Math Mission'}
            </span>
          </div>
        </div>

        <div className="challenge-progress">
          <span className="complete" />
        </div>

        {completed ? (
          <div className="challenge-prompt">
            <span>ALARM DISENGAGED</span>

            <div className="math-equation">
              ✓ WAKE PROTOCOL COMPLETE
            </div>
          </div>
        ) : loading ? (
          <div className="challenge-prompt">
            <span>LOADING CHALLENGE</span>

            <div className="math-equation">
              Please wait...
            </div>
          </div>
        ) : error ? (
          <div className="challenge-prompt">
            <span>CHALLENGE ERROR</span>

            <div className="math-equation">
              {error}
            </div>
          </div>
        ) : isTyping ? (
          <>
            <div className="challenge-prompt">
              <span>
                TYPE TO DEACTIVATE
              </span>

              <div className="typing-phrase">
                {challenge?.phrase}
              </div>

              <input
                className="typing-input"
                type="text"
                value={answer}
                onChange={(event) =>
                  setAnswer(
                    event.target.value
                  )
                }
                placeholder="Type the phrase..."
                autoComplete="off"
              />
            </div>

            <button
              className="typing-submit"
              type="button"
              onClick={
                handleTypingSubmit
              }
            >
              ✓ SUBMIT
            </button>
          </>
        ) : (
          <>
            <div className="challenge-prompt">
              <span>
                SOLVE TO DEACTIVATE
              </span>

              <div className="math-equation">
                {challenge?.question} = ?
              </div>

              <div className="answer-display">
                {answer || ' '}
                <span className="answer-caret" />
              </div>
            </div>

            <div className="number-keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() =>
                      handleKey(number)
                    }
                  >
                    {number}
                  </button>
                )
              )}

              <button
                type="button"
                className="keypad-special"
                onClick={handleBackspace}
              >
                ⌫
              </button>

              <button
                type="button"
                onClick={() =>
                  handleKey(0)
                }
              >
                0
              </button>

              <button
                type="button"
                className="keypad-submit"
                onClick={
                  handleMathSubmit
                }
              >
                ✓
              </button>
            </div>
          </>
        )}
      </section>

      <section className="active-bottom">
        <div className="alarm-music-status">
          <span className="music-wave">♪</span>

          <div>
            <strong>ALARM MUSIC</strong>

            <span>
              {completed
                ? 'Alarm disengaged'
                : 'Playing selected alarm audio'}
            </span>
          </div>

          <span className="playing-indicator">
            {completed ? '✓' : '●'}
          </span>
        </div>
      </section>
    </main>
  )
}