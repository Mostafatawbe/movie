import type { Metadata } from 'next'
import {
  Users,
  Film,
  Tv,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  MoreVertical,
} from 'lucide-react'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Admin Dashboard — Cinephile',
  description: 'Manage users, content, and system settings.',
}

const STATS = [
  { label: 'Total Users', value: '128.9k', trend: '+12%', icon: Users },
  { label: 'Total Media', value: '14,204', trend: '+3%', icon: Film },
  { label: 'Total Reviews', value: '284.3k', trend: '+18%', icon: MessageSquare },
  { label: 'Active Reports', value: '12', trend: '-5%', icon: AlertTriangle, critical: true },
]

const RECENT_REPORTS = [
  { id: '1', type: 'Spam Review', target: 'Echoes of Tomorrow', user: 'bot_user123', status: 'Pending', time: '10m ago' },
  { id: '2', type: 'Inappropriate Content', target: 'Discussion: Hot take', user: 'angryfan99', status: 'Pending', time: '1h ago' },
  { id: '3', type: 'Incorrect Data', target: 'Neon Requiem (Release Date)', user: 'CinemaScholar', status: 'Resolved', time: '2h ago' },
]

export default function AdminDashboardPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Admin"
        title="Dashboard"
        description="Platform overview, metrics, and content moderation."
        className="mb-8"
      >
        <Button>Generate Report</Button>
      </PageHeader>

      {/* Metrics */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col rounded-2xl border border-border bg-card/50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
              <s.icon className={`size-4 ${s.critical ? 'text-destructive' : 'text-primary'}`} />
            </div>
            <p className="mt-3 text-3xl font-bold font-display">{s.value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="size-3 text-green-500" />
              <span className="text-green-500">{s.trend}</span> from last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Main section */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold font-display">Recent Reports</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Target</th>
                    <th className="px-4 py-3 font-medium">Reporter</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {RECENT_REPORTS.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{r.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.target}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.user}</td>
                      <td className="px-4 py-3">
                        <Badge variant={r.status === 'Resolved' ? 'secondary' : 'default'} className={r.status === 'Pending' ? 'bg-amber-500 hover:bg-amber-600' : ''}>
                          {r.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
             <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold font-display">System Health</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
               <div className="rounded-xl border border-border p-4 bg-card/50">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">API Latency (TMDB)</h3>
                  <div className="flex items-end gap-2">
                     <p className="text-2xl font-bold font-display">124<span className="text-sm font-normal text-muted-foreground">ms</span></p>
                     <span className="text-xs text-green-500 mb-1">Operational</span>
                  </div>
               </div>
               <div className="rounded-xl border border-border p-4 bg-card/50">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Database Load</h3>
                  <div className="flex items-end gap-2">
                     <p className="text-2xl font-bold font-display">42<span className="text-sm font-normal text-muted-foreground">%</span></p>
                     <span className="text-xs text-green-500 mb-1">Normal</span>
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
           <div className="rounded-2xl border border-border bg-card/50 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
               <Button variant="outline" className="justify-start gap-2 h-10"><Film className="size-4" /> Add Movie/TV Show</Button>
               <Button variant="outline" className="justify-start gap-2 h-10"><Tv className="size-4" /> Manage Anime/Manga</Button>
               <Button variant="outline" className="justify-start gap-2 h-10"><Users className="size-4" /> Manage Users</Button>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  )
}
