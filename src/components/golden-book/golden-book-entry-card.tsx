import { memo } from 'react'
import classNames from 'classnames'

import { GoldenBookEntry } from '@/database'

export type GoldenBookEntryCardProps = {
  action?: React.ReactNode
  entry: GoldenBookEntry
}

export const GoldenBookEntryCard = memo<GoldenBookEntryCardProps>(({ action, entry }) => {
  const emoji = pickEmojiByEntry(entry)

  return (
    <div
      className={classNames(
        'bg-white groovy-container h-full p-4 rounded-md',
        'flex flex-col gap-2',
        'text-lg text-[#b71a57]'
      )}
    >
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span>{emoji}</span>

          <span className="font-bold">{entry.name}</span>
        </div>

        {action}
      </div>

      {action && entry.email && <p className="text-sm text-left">{entry.email}</p>}
      <p className="text-sm text-left">{entry.message}</p>
    </div>
  )
})

GoldenBookEntryCard.displayName = 'GoldenBookEntryCard'

const EMOJIS = ['🌻', '🌈', '☮️', '✌️', '💕', '🌸', '💮', '🪷', '🏵️']

const pickEmojiByEntry = (entry: GoldenBookEntry) => EMOJIS[Math.abs(entry.id) % EMOJIS.length]
