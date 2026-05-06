import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'L', xp: 150 },
  { day: 'M', xp: 280 },
  { day: 'M', xp: 0 },
  { day: 'J', xp: 220 },
  { day: 'V', xp: 310 },
  { day: 'S', xp: 450 },
  { day: 'D', xp: 180 },
];

export function WeeklyChart() {
  const totalXP = data.reduce((sum, d) => sum + d.xp, 0);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm border border-border text-card-foreground">
      <h3 className="font-bold mb-4">XP cette semaine</h3>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'currentColor' }}
          />
          <Bar
            dataKey="xp"
            fill="#8B5CF6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center mt-3">
        <div className="text-2xl font-bold">{totalXP} XP</div>
        <div className="text-sm text-muted-foreground">Total gagné</div>
      </div>
    </div>
  );
}
