-- The complete shape of the database. Safe to run against an empty database,
-- and safe to run twice.
--
-- This file is committed on purpose. Your schema is a fact about your
-- application, not a runtime concern: it should be readable by opening a file
-- rather than by connecting to a server. It is also what lets you move to a
-- hosted database in one command.

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

-- Helps queries that filter alarms by their enabled/disabled state.
CREATE INDEX IF NOT EXISTS alarms_enabled_idx
  ON alarms (enabled);