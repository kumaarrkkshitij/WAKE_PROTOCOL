// Mock API implementation using local storage

import seed from './seed.json'

const KEY = 'final-project:sightings'

// Simulated network latency delay
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

// Read stored data from local storage
function read() {
  const stored = localStorage.getItem(KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem(KEY)
    }
  }
  localStorage.setItem(KEY, JSON.stringify(seed))
  return seed
}

// Write updated data to local storage
function write(rows) {
  localStorage.setItem(KEY, JSON.stringify(rows))
  return rows
}

// Mock API endpoint handlers
export async function listSightings() {
  await delay()
  return read().slice().sort((a, b) => b.reported_at.localeCompare(a.reported_at))
}

export async function getSighting(id) {
  await delay()
  const found = read().find((row) => String(row.id) === String(id))
  if (!found) throw new Error('Not found')
  return found
}

export async function createSighting(input) {
  await delay()
  const created = {
    ...input,
    id: crypto.randomUUID(),
    reported_at: new Date().toISOString(),
  }
  write([...read(), created])
  return created
}

export async function updateSighting(id, input) {
  await delay()
  const rows = read()
  const index = rows.findIndex((row) => String(row.id) === String(id))
  if (index === -1) throw new Error('Not found')
  rows[index] = { ...rows[index], ...input }
  write(rows)
  return rows[index]
}

export async function deleteSighting(id) {
  await delay()
  write(read().filter((row) => String(row.id) !== String(id)))
}

export const getMathChallenge = async () => ({
  question: '27 - 9',
  answer: 18,
})

export const getTypingChallenge = async () => ({
  phrase: 'Wake up and remember that today is still unwritten.',
})