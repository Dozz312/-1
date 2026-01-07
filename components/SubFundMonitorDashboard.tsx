
import React, { useState } from 'react';
import { 
    Radar, 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ScatterChart,
    Scatter,
    Cell
} from 'recharts';
import { 
    Target, 
    AlertTriangle, 
    TrendingUp, 
    Activity, 
    ShieldCheck, 
    HelpCircle,
    ChevronDown,
    Crosshair,
    Users,
    Network,
    History,
    Lightbulb,
    CheckCircle2,
    Building2,
    Landmark,
    GraduationCap,
    Banknote,
    Zap,
    Timer,
    Shield,
    Coins
} from 'lucide-react';
import { mockSubFundMonitorData } from '../services/mockData';

const ResourceNode = ({ type, label, verified }: { type: string, label: string, verified: boolean }) => {
    const colors = {
        'Gov': 'bg-blue-600 border-blue-400',
        'Industry': 'bg-emerald-600 border-emerald-400',
        'Academic': 'bg-purple-600 border-purple-400',
        'Finance': 'bg-amber-600 border-amber-400'
    };
    const icons = {
        'Gov': <Landmark size={14} />,
        'Industry': <Building2 size={14} />,
        'Academic': <GraduationCap size={14} />,
        'Finance': <Banknote size={14} />
    };

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors[type as keyof typeof colors] || 'bg-slate-700 border-slate-500'} text-white text-xs font-bold shadow-lg`}>
            {icons[type as keyof typeof icons]}
            {label}
            {verified && <CheckCircle2 size={12} className="text-white ml-1" />}
        </div>
    );
};

const SubFundMonitorDashboard = () => {
    const [selectedFundId, setSelectedFundId] = useState(mockSubFundMonitorData[0].id);
    const data = mockSubFundMonitorData.find(f => f.id === selectedFundId) || mockSubFundMonitorData[0];

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header with Fund Selector */}
            <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Crosshair size={32} className="text-indigo-500" />
                        子基金全景监控 (Sub-fund Monitor)
                    </h2>
                    <p className="text-lg text-slate-400 mt-2">
                        穿透式监控定位偏差、风格漂移与回报可持续性
                    </p>
                </div>
                <div className="relative">
                    <select 
                        value={selectedFundId}
                        onChange={(e) => setSelectedFundId(e.target.value)}
                        className="appearance-none bg-slate-800 text-white pl-5 pr-10 py-3 rounded-xl border border-slate-700 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-700 transition-colors"
                    >
                        {mockSubFundMonitorData.map(fund => (
                            <option key={fund.id} value={fund.id}>{fund.name}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                </div>
            </div>

            {/* Row 1: Role Clarity & Return Sustainability */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. Role Clarity Radar */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Target size={20} className="text-blue-500" />
                            定位雷达 (Role Clarity)
                        </h3>
                    </div>
                    
                    <div className="flex-1 min-h-[300px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.radar}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="目标" dataKey="target" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" fillOpacity={0} />
                                <Radar name="实际" dataKey="actual" stroke="#6366f1" strokeWidth={3} fill="#6366f1" fillOpacity={0.3} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} itemStyle={{ color: '#e2e8f0' }}/>
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Return Sustainability Panel */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <ShieldCheck size={20} className="text-emerald-500" />
                            长期回报兑现能力 (Sustainability)
                        </h3>
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                            <HelpCircle size={16} className="text-indigo-400" />
                            <span className="text-sm text-slate-300 font-bold">可解释度评分:</span>
                            <span className={`text-xl font-bold font-['PingFang_SC'] ${data.explainabilityScore >= 80 ? 'text-emerald-400' : data.explainabilityScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                                {data.explainabilityScore}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 flex gap-6">
                        <div className="flex-1 min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.returns}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                    <XAxis dataKey="year" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                                    <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} itemStyle={{ color: '#e2e8f0' }}/>
                                    <Bar dataKey="dpi" stackId="a" name="DPI (已落袋)" fill="#10b981" barSize={40} />
                                    <Bar dataKey="rvpi" stackId="a" name="RVPI (账面)" fill="#6366f1" barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-64 p-5 bg-slate-800 rounded-xl border border-slate-700 flex flex-col gap-2">
                            <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                                <Activity size={16} className="text-indigo-400"/>
                                回报归因分析
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed mb-2 flex-1">
                                {data.explainabilityAnalysis}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Strategy Consistency */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <TrendingUp size={20} className="text-amber-500" />
                        策略一致性监控 (Strategy Consistency)
                    </h3>
                    <div className={`px-4 py-1.5 rounded-lg border font-bold text-sm flex items-center gap-2 ${
                        data.driftIndex.status === 'Stable' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50' :
                        data.driftIndex.status === 'Warning' ? 'bg-amber-900/30 text-amber-400 border-amber-900/50' :
                        'bg-rose-900/30 text-rose-400 border-rose-900/50'
                    }`}>
                        {data.driftIndex.status === 'Breach' && <AlertTriangle size={14} />}
                        漂移指数: {data.driftIndex.score} / 100
                    </div>
                </div>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.allocationHistory}>
                            <defs>
                                <linearGradient id="colTech" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                                <linearGradient id="colBio" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                                <linearGradient id="colNewEnergy" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                            </defs>
                            <XAxis dataKey="month" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                            <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} unit="%" />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} itemStyle={{ color: '#e2e8f0' }}/>
                            <Area type="monotone" dataKey="tech" stackId="1" name="科技" stroke="#3b82f6" fill="url(#colTech)" />
                            <Area type="monotone" dataKey="bio" stackId="1" name="医疗" stroke="#10b981" fill="url(#colBio)" />
                            <Area type="monotone" dataKey="newEnergy" stackId="1" name="新能源" stroke="#f59e0b" fill="url(#colNewEnergy)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row 3: LP Alignment & Strategic Collaboration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LP Alignment Scorecard */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                        <Users size={20} className="text-purple-500" />
                        LP 适配度评分 (LP Alignment)
                    </h3>
                    
                    <div className="flex items-center gap-8 mb-8">
                        <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center shrink-0 ${
                            data.lpScorecard.verdict === 'Recommend' ? 'border-emerald-500 text-emerald-500' :
                            data.lpScorecard.verdict === 'Watch' ? 'border-amber-500 text-amber-500' : 'border-rose-500 text-rose-500'
                        }`}>
                            <span className="text-4xl font-black">{data.lpScorecard.overallScore}</span>
                            <span className="text-xs font-bold uppercase">{data.lpScorecard.verdict}</span>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            {data.lpScorecard.metrics.map((m, idx) => (
                                <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs text-slate-400">{m.label}</span>
                                        <span className={`text-xs font-bold ${
                                            m.status === 'Good' ? 'text-emerald-400' : m.status === 'Fair' ? 'text-amber-400' : 'text-rose-400'
                                        }`}>{m.score}</span>
                                    </div>
                                    <div className="w-full bg-slate-700 h-1.5 rounded-full">
                                        <div className={`h-1.5 rounded-full ${
                                            m.status === 'Good' ? 'bg-emerald-500' : m.status === 'Fair' ? 'bg-amber-500' : 'bg-rose-500'
                                        }`} style={{width: `${m.score * 10}%`}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-auto p-4 bg-slate-800/30 rounded-xl border border-slate-700 text-center">
                        <span className="text-sm font-bold text-slate-300">CEO结论：</span>
                        <span className={`text-lg font-bold ml-2 ${
                            data.lpScorecard.verdict === 'Recommend' ? 'text-emerald-400' :
                            data.lpScorecard.verdict === 'Watch' ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                            {data.lpScorecard.verdict === 'Recommend' ? '建议继续配置 (Top Pick)' :
                             data.lpScorecard.verdict === 'Watch' ? '需列入重点观察名单' : '建议逐步退出'}
                        </span>
                    </div>
                </div>

                {/* Strategic Collaboration Matrix */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Crosshair size={20} className="text-blue-400" />
                            策略定位与协同 (Collaboration)
                        </h3>
                        <div className="flex gap-2">
                            {data.collaboration.synergyStats.map((s, i) => (
                                <div key={i} className="px-3 py-1 bg-slate-800 rounded border border-slate-700 text-xs">
                                    <span className="text-slate-400 mr-1">{s.label}:</span>
                                    <span className="text-white font-bold">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <ResponsiveContainer width="100%" height={250}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" dataKey="x" name="Industry Focus" unit="%" tick={false} label={{ value: '行业聚焦度', position: 'bottom', fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis type="number" dataKey="y" name="Stage" unit="%" tick={false} label={{ value: '风险偏好', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} />
                                <Scatter name="Funds" data={data.collaboration.positioning} fill="#8884d8">
                                    {data.collaboration.positioning.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={
                                            entry.type === 'Self' ? '#6366f1' : 
                                            entry.type === 'Target' ? '#10b981' : '#94a3b8'
                                        } />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                        <div className="absolute top-2 right-2 text-xs text-slate-500 bg-slate-900/80 p-2 rounded border border-slate-700">
                            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> 本基金</div>
                            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 目标画像</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400"></div> 竞品</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 4: Resources & Value & Track Record */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Local Resource & Value Conversion - Enhanced */}
                <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 pb-2 relative z-10">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Network size={20} className="text-indigo-400" />
                            资源生态与价值转化
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">本地网络资源分布及其对投资结果的量化贡献 (RVI)</p>
                    </div>
                    
                    {/* Visual Network Representation */}
                    <div className="relative h-[220px] w-full flex items-center justify-center bg-slate-900/50">
                        {/* Center Hub */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="w-14 h-14 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center shadow-2xl">
                                <span className="text-[10px] font-bold text-white text-center leading-tight">{data.name.slice(0,4)}</span>
                            </div>
                        </div>

                        {/* Nodes */}
                        {data.resources.nodes.map((node, i) => {
                            const angle = (i / data.resources.nodes.length) * 2 * Math.PI;
                            const radius = 90;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            
                            return (
                                <React.Fragment key={node.id}>
                                    <div 
                                        className={`absolute top-1/2 left-1/2 h-0.5 origin-left ${node.depth === 'Strategic' ? 'bg-indigo-500 opacity-80' : 'bg-slate-700 opacity-40 dashed'}`}
                                        style={{ width: `${radius}px`, transform: `rotate(${angle * (180/Math.PI)}deg)` }}
                                    ></div>
                                    <div 
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                                        style={{ marginTop: y, marginLeft: x }}
                                    >
                                        <ResourceNode type={node.type} label={node.label} verified={node.isVerified} />
                                    </div>
                                </React.Fragment>
                            );
                        })}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900/0 to-slate-900/0 pointer-events-none"></div>
                    </div>

                    {/* Resource Value Index (RVI) Panel */}
                    <div className="flex-1 bg-gradient-to-br from-indigo-950/30 to-slate-900 border-t border-slate-800 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <Zap size={14} className="text-amber-400" />
                                Resource-to-Value Index (RVI)
                            </h4>
                            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
                                行业均值: {data.rvi.benchMarkAverage}
                            </span>
                        </div>

                        <div className="flex gap-6">
                            {/* Score Display */}
                            <div className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-indigo-500/20 w-32 shrink-0">
                                <div className="text-4xl font-black text-indigo-400 font-['PingFang_SC'] mb-1">
                                    {data.rvi.score}
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700">
                                    {data.rvi.rank}
                                </div>
                            </div>

                            {/* Impact Metrics Grid */}
                            <div className="flex-1 grid grid-cols-2 gap-3">
                                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-700/50">
                                    <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><TrendingUp size={10}/> IRR 贡献</div>
                                    <div className="text-sm font-bold text-emerald-400">+{data.rvi.impact.irrContribution}%</div>
                                </div>
                                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-700/50">
                                    <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Timer size={10}/> 退出加速</div>
                                    <div className="text-sm font-bold text-indigo-400">{data.rvi.impact.exitSpeedup} Mos</div>
                                </div>
                                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-700/50">
                                    <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Shield size={10}/> 风险缓释</div>
                                    <div className="text-sm font-bold text-white">{data.rvi.impact.riskMitigation}/10</div>
                                </div>
                                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-700/50">
                                    <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Coins size={10}/> 政策补贴</div>
                                    <div className="text-sm font-bold text-amber-400">¥{data.rvi.conversionMetrics.subsidyAmount}M</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Theme Track Record */}
                <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                        <History size={20} className="text-amber-500" />
                        历史主题与认知验证 (Track Record)
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="relative border-l-2 border-slate-700 ml-4 pl-8 space-y-8">
                            {data.themeRecord.themes.map((theme, idx) => (
                                <div key={idx} className="relative group">
                                    <span className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-slate-900 ${
                                        theme.timing === 'Early' ? 'bg-emerald-500' : theme.timing === 'Sync' ? 'bg-blue-500' : 'bg-slate-500'
                                    }`}></span>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-sm font-bold text-slate-500 mb-1">{theme.period}</div>
                                            <div className="text-lg font-bold text-white">{theme.name}</div>
                                            <div className="text-sm text-indigo-400 mt-1 flex items-center gap-1">
                                                <CheckCircle2 size={12} /> 代表作: {theme.project}
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                                            theme.timing === 'Early' ? 'bg-emerald-900/30 border-emerald-900/50 text-emerald-400' : 
                                            theme.timing === 'Sync' ? 'bg-blue-900/30 border-blue-900/50 text-blue-400' : 
                                            'bg-slate-800 border-slate-700 text-slate-400'
                                        }`}>
                                            {theme.timing === 'Early' ? '领先市场' : theme.timing === 'Sync' ? '同步市场' : '跟随者'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tech Insight Box */}
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex gap-4">
                            <div className="p-2 bg-amber-900/20 text-amber-500 rounded-lg h-fit">
                                <Lightbulb size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white mb-2">核心认知验证</h4>
                                {data.themeRecord.techInsight.map((insight, i) => (
                                    <div key={i} className="text-sm text-slate-300 leading-relaxed">
                                        <span className="text-slate-500">判断:</span> {insight.trend} <span className="mx-2">|</span>
                                        <span className="text-slate-500">提前:</span> <span className="text-emerald-400 font-bold">{insight.leadTime}</span> <span className="mx-2">|</span>
                                        <span className="text-slate-500">结果:</span> {insight.result}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubFundMonitorDashboard;
