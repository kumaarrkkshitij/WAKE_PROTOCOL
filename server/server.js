import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { pool } from './db/pool.js'
import * as alarms from './alarmsRepo.js'
import { mathChallenges, typingChallenges } from './challenges.js'

const app = express()

// Configure middleware
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(helmet())
app.use(express.json({ limit: '100kb' }))

// Check server health
app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

// Check database connectivity
app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')
    response.json({ ok: true, db: 'up' })
  } catch (error) {
    console.error('readyz failed:', error.message)
    response.status(503).json({ ok: false, db: 'down' })
  }
})

// Get random math challenge
app.get('/api/challenges/math', (request, response) => {
  const challenge =
    mathChallenges[Math.floor(Math.random() * mathChallenges.length)]

  response.json(challenge)
})

// Get random typing challenge
app.get('/api/challenges/typing', (request, response) => {
  const phrase =
    typingChallenges[Math.floor(Math.random() * typingChallenges.length)]

  response.json({ phrase })
})

// Fetch all alarms
app.get('/api/alarms', async (request, response, next) => {
  try {
    response.json(await alarms.getAll(pool))
  } catch (error) {
    next(error)
  }
})

// Fetch alarm by ID
app.get('/api/alarms/:id', async (request, response, next) => {
  try {
    const alarm = await alarms.getById(pool, request.params.id)

    if (!alarm) {
      return response.status(404).json({ error: 'Not found' })
    }

    response.json(alarm)
  } catch (error) {
    next(error)
  }
})

// Fetch all math challenges
app.get('/api/challenges/math/all', (request, response) => {
  response.json(mathChallenges)
})

// Fetch all typing challenges
app.get('/api/challenges/typing/all', (request, response) => {
  response.json(
    typingChallenges.map((phrase) => ({ phrase }))
  )
})

// Validate alarm request data
function validate(body) {
  const errors = []

  const time = typeof body.time === 'string' ? body.time.trim() : ''
  const period = typeof body.period === 'string' ? body.period.trim() : ''
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const repeat_days = Array.isArray(body.repeat_days)
    ? body.repeat_days
    : []
  const challenge_type =
    typeof body.challenge_type === 'string'
      ? body.challenge_type.trim()
      : ''
  const music = typeof body.music === 'string' ? body.music.trim() : ''
  const enabled =
    typeof body.enabled === 'boolean' ? body.enabled : true

  if (!time) errors.push('time is required')
  if (!/^\d{2}:\d{2}$/.test(time)) {
    errors.push('time must use HH:MM format')
  }

  if (!['AM', 'PM'].includes(period)) {
    errors.push('period must be AM or PM')
  }

  if (!name) errors.push('name is required')
  if (name.length > 120) {
    errors.push('name must be 120 characters or fewer')
  }

  if (!['Math', 'Typing'].includes(challenge_type)) {
    errors.push('challenge_type must be Math or Typing')
  }

  return {
    errors,
    value: {
      time,
      period,
      name,
      repeat_days,
      challenge_type,
      music,
      enabled,
    },
  }
}

// Create a new alarm
app.post('/api/alarms', async (request, response, next) => {
  const { errors, value } = validate(request.body ?? {})

  if (errors.length > 0) {
    return response.status(400).json({
      error: errors.join('; '),
    })
  }

  try {
    const alarm = await alarms.create(pool, value)
    response.status(201).json(alarm)
  } catch (error) {
    next(error)
  }
})

// Update an existing alarm
app.put('/api/alarms/:id', async (request, response, next) => {
  const { errors, value } = validate(request.body ?? {})

  if (errors.length > 0) {
    return response.status(400).json({
      error: errors.join('; '),
    })
  }

  try {
    const alarm = await alarms.update(pool, request.params.id, value)

    if (!alarm) {
      return response.status(404).json({ error: 'Not found' })
    }

    response.json(alarm)
  } catch (error) {
    next(error)
  }
})

// Delete an alarm
app.delete('/api/alarms/:id', async (request, response, next) => {
  try {
    const removed = await alarms.remove(pool, request.params.id)

    if (!removed) {
      return response.status(404).json({ error: 'Not found' })
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Handle 404 routes
app.use((request, response) => {
  response.status(404).json({ error: 'No such route' })
})

// Handle global errors
app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ error: 'Something went wrong on the server' })
})

// Start server
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
  console.log(`CORS allows: ${allowedOrigins.join(', ')}`)
})