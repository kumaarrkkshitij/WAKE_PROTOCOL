// HTTP client for backend API communication

const BASE = import.meta.env.VITE_API_BASE_URL || ''

// Send HTTP request to backend
async function request(path, options) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`

    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
    }

    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

// Alarm API endpoints

export const listAlarms = () =>
  request('/api/alarms')

export const getAlarm = (id) =>
  request(`/api/alarms/${id}`)

export const createAlarm = (input) =>
  request('/api/alarms', {
    method: 'POST',
    body: JSON.stringify(input),
  })

export const updateAlarm = (id, input) =>
  request(`/api/alarms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })

export const deleteAlarm = (id) =>
  request(`/api/alarms/${id}`, {
    method: 'DELETE',
  })

// Challenge API endpoints

export const getMathChallenge = () =>
  request('/api/challenges/math')

export const getTypingChallenge = () =>
  request('/api/challenges/typing')

export const getAllMathChallenges = () =>
  request('/api/challenges/math/all')

export const getAllTypingChallenges = () =>
  request('/api/challenges/typing/all')