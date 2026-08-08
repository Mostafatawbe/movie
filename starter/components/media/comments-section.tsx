'use client'

import { useState } from 'react'
import { Heart, MessageSquare, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Comment {
  id: string
  author: string
  handle: string
  time: string
  content: string
  likes: number
}

const SEED_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Maya Chen',
    handle: '@mayawatches',
    time: '2h ago',
    content: 'The pacing in the final act completely floored me. Easily one of the best things I have seen this year.',
    likes: 34,
  },
  {
    id: 'c2',
    author: 'Devin Park',
    handle: '@dpark',
    time: '5h ago',
    content: 'Gorgeous cinematography, but I wish they had spent more time with the side characters. Still a solid watch.',
    likes: 12,
  },
  {
    id: 'c3',
    author: 'Sam Rivera',
    handle: '@samr',
    time: '1d ago',
    content: 'Rewatched it last night and noticed so many details I missed the first time. Holds up beautifully.',
    likes: 58,
  },
]

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS)
  const [value, setValue] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const text = value.trim()
    if (!text) return
    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        author: 'Jordan Diaz',
        handle: '@jordan',
        time: 'Just now',
        content: text,
        likes: 0,
      },
      ...prev,
    ])
    setValue('')
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="size-5 text-primary" />
        <h2 className="text-xl font-semibold font-display">Comments</h2>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </div>

      <form onSubmit={submit} className="mb-6 flex gap-3">
        <Avatar className="size-9 shrink-0">
          <AvatarImage src="/placeholder-user.jpg" alt="Your avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="resize-none"
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" size="sm" className="gap-1.5" disabled={!value.trim()}>
              <Send className="size-4" /> Post
            </Button>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {comments.map((c) => (
          <article key={c.id} className="flex gap-3">
            <Avatar className="size-9 shrink-0">
              <AvatarFallback>{c.author.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{c.author}</span>
                <span className="text-xs text-muted-foreground">{c.handle}</span>
                <span className="text-xs text-muted-foreground">· {c.time}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.content}</p>
              <button className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary">
                <Heart className="size-3.5" /> {c.likes}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
