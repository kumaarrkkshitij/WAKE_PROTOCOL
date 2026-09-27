export async function getAll(pool) {
  const result = await pool.query(
    'SELECT * FROM alarms ORDER BY created_at DESC'
  )
  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query(
    'SELECT * FROM alarms WHERE id = $1',
    [id]
  )
  return result.rows[0] ?? null
}

export async function create(
  pool,
  { time, period, name, repeat_days, challenge_type, music, enabled }
) {
  const result = await pool.query(
    `INSERT INTO alarms
      (time, period, name, repeat_days, challenge_type, music, enabled)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      time,
      period,
      name,
      repeat_days ?? [],
      challenge_type,
      music ?? '',
      enabled ?? true,
    ]
  )

  return result.rows[0]
}

export async function update(
  pool,
  id,
  { time, period, name, repeat_days, challenge_type, music, enabled }
) {
  const result = await pool.query(
    `UPDATE alarms
     SET time = $1,
         period = $2,
         name = $3,
         repeat_days = $4,
         challenge_type = $5,
         music = $6,
         enabled = $7
     WHERE id = $8
     RETURNING *`,
    [
      time,
      period,
      name,
      repeat_days ?? [],
      challenge_type,
      music ?? '',
      enabled ?? true,
      id,
    ]
  )

  return result.rows[0] ?? null
}

export async function remove(pool, id) {
  const result = await pool.query(
    'DELETE FROM alarms WHERE id = $1 RETURNING id',
    [id]
  )

  return result.rowCount > 0
}