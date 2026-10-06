-- Define alarms table schema
CREATE TABLE IF NOT EXISTS alarms (
  id             SERIAL PRIMARY KEY,
  time           TEXT        NOT NULL,
  period         TEXT        NOT NULL CHECK (period IN ('AM', 'PM')),
  name           TEXT        NOT NULL,
  repeat_days    TEXT[]      NOT NULL DEFAULT '{}',
  challenge_type TEXT        NOT NULL CHECK (challenge_type IN ('Math', 'Typing')),
  music          TEXT        NOT NULL DEFAULT '',
  enabled        BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for filtering alarms by status
CREATE INDEX IF NOT EXISTS alarms_enabled_idx
  ON alarms (enabled);