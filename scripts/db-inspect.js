import Database from 'better-sqlite3'

const rawPath = process.env.DATABASE_URL?.startsWith('file:')
  ? process.env.DATABASE_URL.replace(/^file:/, '')
  : process.env.DATABASE_URL || ':memory:'

const db = new Database(rawPath)
const rows = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
console.log(
  'Tables:',
  rows.map(r => r.name)
)
