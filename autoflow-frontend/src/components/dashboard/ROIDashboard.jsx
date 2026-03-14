import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Activity, MessageCircle, CheckCircle, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

const data = [
    { name: 'Mon', queries: 40, solved: 35 },
    { name: 'Tue', queries: 80, solved: 72 },
    { name: 'Wed', queries: 110, solved: 105 },
    { name: 'Thu', queries: 147, solved: 140 },
    { name: 'Fri', queries: 0, solved: 0 },
    { name: 'Sat', queries: 0, solved: 0 },
    { name: 'Sun', queries: 0, solved: 0 },
];

const MetricCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className={clsx("absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 opacity-10 transition-transform group-hover:scale-150",
            color === 'blue' ? "bg-blue-500" : color === 'purple' ? "bg-purple-500" : "bg-green-500")} />

        <div>
            <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">{title}</p>
            <h3 className="text-4xl font-extrabold text-gray-900 mt-3">{value}</h3>
            <p className={clsx("text-sm mt-2 flex items-center gap-1 font-medium",
                color === 'blue' ? "text-blue-600" : color === 'purple' ? "text-purple-600" : "text-green-600")}>
                <ArrowUpRight size={16} strokeWidth={3} />
                {subtext}
            </p>
        </div>
        <div className={clsx("p-4 rounded-xl shadow-sm z-10",
            color === 'blue' ? "bg-blue-50 text-blue-600" : color === 'purple' ? "bg-purple-50 text-purple-600" : "bg-green-50 text-green-600")}>
            <Icon size={28} strokeWidth={2.5} />
        </div>
    </div>
);

export const ROIDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Professional Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Agent Runs"
                    value="1,240"
                    subtext="Total Workflows Executed"
                    icon={Activity}
                    color="blue"
                />
                <MetricCard
                    title="Queries Answered"
                    value="8,542"
                    subtext="Customer Interactions"
                    icon={MessageCircle}
                    color="purple"
                />
                <MetricCard
                    title="Requests Solved"
                    value="8,105"
                    subtext="95% Success Rate"
                    icon={CheckCircle}
                    color="green"
                />
            </div>

            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 size={20} className="text-gray-400" />
                            Resolution Analytics
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">Tracking queries vs. successful resolutions over time</p>
                    </div>
                </div>

                <div className="h-80 w-full" style={{ minHeight: '320px' }}>
                    <ResponsiveContainer width="99%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                            />
                            <Area type="monotone" dataKey="queries" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorQueries)" name="Queries In" />
                            <Area type="monotone" dataKey="solved" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorSolved)" name="Resolved" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
