
import React, { useState } from 'react';
import { 
    ChevronRight, 
    AlertTriangle, 
    Share2, 
    Bot, 
    CheckCircle2, 
    Frown, 
    Users, 
    Sparkles, 
    Calendar, 
    FileText,
    Search,
    Filter,
    ArrowUpRight,
    Clock,
    MoreHorizontal,
    ShieldAlert,
    Zap,
    Lock,
    Video,
    Terminal,
    ArrowRight,
    TrendingDown,
    Mail,
    Package,
    Activity,
    User
} from 'lucide-react';
import { 
    ResponsiveContainer, 
    AreaChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ReferenceLine, 
    Area 
} from 'recharts';
import { mockAuditEvents, mockFactDeviationDetail, mockSentimentAnomalyDetail } from '../services/mockData';
import { AuditEvent, AuditType } from '../types';

// --- Icons Map ---
const TypeIcon = ({ type, size=24 }: { type: AuditType, size?: number }) => {
    switch(type) {
        case 'FactDeviation': return <FileText size={size} className="text-rose-400" />;
        case 'SentimentAnomaly': return <Frown size={size} className="text-amber-400" />;
        case 'AssetDeviation': return <Package size={size} className="text-rose-400" />;
        case 'BehaviorAnomaly': return <Activity size={size} className="text-emerald-400" />;
        default: return <AlertTriangle size={size} />;
    }
};

const SeverityBadge = ({ level }: { level: 'High' | 'Medium' | 'Low' }) => {
    const styles = {
        High: 'bg-rose-950/40 text-rose-500 border-rose-900/50',
        Medium: 'bg-amber-950/40 text-amber-500 border-amber-900/50',
        Low: 'bg-emerald-950/40 text-emerald-500 border-emerald-900/50'
    };
    const labels = { High: '严重 (HIGH)', Medium: '中等 (MED)', Low: '低 (LOW)' };
    return (
        <span className={`px-3 py-1.5 rounded text-xs font-bold border ${styles[level]}`}>
            {labels[level]}
        </span>
    );
};

// --- Sub-Components ---

// View 1: List Item
const AuditEventRow: React.FC<{ event: AuditEvent, onClick: () => void }> = ({ event, onClick }) => (
    <div 
        onClick={onClick}
        className={`group p-8 rounded-2xl border transition-all cursor-pointer relative overflow-hidden mb-6 ${
            event.severity === 'High' 
            ? 'bg-slate-900/50 border-rose-900/30 hover:border-rose-500/50' 
            : event.severity === 'Medium' 
                ? 'bg-slate-900/50 border-amber-900/30 hover:border-amber-500/50' 
                : 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/50'
        }`}
    >
        {event.severity === 'High' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500"></div>}
        {event.severity === 'Medium' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>}
        {event.severity === 'Low' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>}

        <div className="flex items-start gap-6">
            <div className={`p-5 rounded-2xl shrink-0 ${
                event.type === 'FactDeviation' || event.type === 'AssetDeviation' 
                ? 'bg-rose-900/20' 
                : event.type === 'SentimentAnomaly' ? 'bg-amber-900/20' : 'bg-emerald-900/20'
            }`}>
                <TypeIcon type={event.type} size={32} />
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                        <SeverityBadge level={event.severity} />
                    </div>
                    <div className="flex items-center gap-4">
                        {event.person && (
                            <div className="flex items-center gap-3 text-right">
                                <div className="text-sm">
                                    <div className="text-white font-bold">{event.person.name}</div>
                                    <div className="text-slate-500">{event.person.role}</div>
                                </div>
                                {event.person.avatar ? (
                                    <img src={event.person.avatar} className="w-10 h-10 rounded-full border border-slate-700" alt="" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-700">
                                        {event.person.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        )}
                        <button className="p-2 rounded-full hover:bg-slate-800 text-slate-500 transition-colors">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
                
                <p className="text-slate-300 text-base leading-relaxed mb-4 pr-16 line-clamp-2">
                    <span className="text-slate-500 font-mono text-sm mr-3">ID: #{event.id} • {event.department}</span>
                    {event.summary}
                </p>
                
                <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
                    <Clock size={14} />
                    {event.time}
                </div>
            </div>
        </div>
    </div>
);

// View 2: Fact Deviation Detail
const FactDeviationView = ({ onBack }: { onBack: () => void }) => {
    const data = mockFactDeviationDetail;

    return (
        <div className="h-full flex flex-col animate-fade-in custom-scrollbar overflow-y-auto pb-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 shrink-0">
                <div className="flex items-center gap-3 text-base text-slate-500 font-medium">
                    <span onClick={onBack} className="hover:text-white cursor-pointer transition-colors">首页</span>
                    <ChevronRight size={16} />
                    <span>审计日志</span>
                    <ChevronRight size={16} />
                    <span className="text-white">案件 #{data.reportId}</span>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold transition-colors border border-slate-700">
                        <Share2 size={16} /> 分享报告
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg transition-colors shadow-indigo-900/20">
                        <Zap size={16} /> 采取行动
                    </button>
                </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">事实偏差警报详情</h1>
            <div className="text-slate-400 text-base mb-10 font-mono flex items-center gap-3">
                <Clock size={16} /> 检测时间：{data.detectTime} 
                <span className="text-slate-600">|</span> 
                案件编号 #{data.reportId}
            </div>

            {/* Top Bar */}
            <div className="flex gap-4 mb-10">
                <div className="px-5 py-3 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-500 text-sm font-bold flex items-center gap-2">
                    <AlertTriangle size={18} /> 严重程度：严重
                </div>
                <div className="px-5 py-3 bg-emerald-900/20 border border-emerald-900/50 rounded-xl text-emerald-400 text-sm font-bold flex items-center gap-2">
                    <Lock size={18} /> 隐私协议激活
                </div>
                <div className="px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm font-bold flex items-center gap-2">
                    <Video size={18} /> 来源：{data.source}
                </div>
                <div className="px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm font-bold flex items-center gap-2">
                    <Clock size={18} /> 时长：{data.duration}
                </div>
            </div>

            {/* Split Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                {/* Reported */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 relative overflow-hidden group hover:border-slate-700 transition-colors">
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-700"></div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-slate-800 rounded-xl text-slate-400">
                            <Users size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">原始汇报</h3>
                        <span className="ml-auto text-sm text-slate-500 font-mono bg-slate-800 px-3 py-1 rounded-lg">{data.duration.split('-')[0]}</span>
                    </div>
                    
                    <div className="relative pl-8 border-l-4 border-slate-800 ml-4 mb-8">
                        <QuoteIcon className="absolute -left-5 -top-4 text-slate-700 bg-slate-900 p-1 w-10 h-10" />
                        <p className="text-slate-200 italic text-2xl leading-relaxed font-serif">
                            "{data.originalStatement}"
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                                {data.person.name.charAt(0)}
                            </div>
                            <div className="text-base text-slate-400 font-medium">
                                <span className="text-white">{data.person.name}</span>, {data.person.role}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                        <div className="text-sm text-slate-400 uppercase font-bold mb-3 flex items-center gap-2">
                            <Activity size={16} /> 语音压力分析
                        </div>
                        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 w-3/4 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-amber-400 font-bold uppercase tracking-wider">
                            <span>Normal</span>
                            <span>High Anxiety Detected</span>
                        </div>
                    </div>
                </div>

                {/* Reality */}
                <div className="bg-slate-900 rounded-3xl border border-indigo-500/30 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                                <Terminal size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">AI检测到的真实情况</h3>
                        </div>
                        <div className="px-3 py-1.5 bg-indigo-900/50 text-indigo-300 text-sm font-bold rounded-lg border border-indigo-500/30 flex items-center gap-2">
                            <Sparkles size={14} /> 99.8% 置信度
                        </div>
                    </div>

                    <div className="space-y-6 mb-8">
                        {data.verificationSteps.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start p-4 bg-slate-800/30 rounded-xl border border-slate-800">
                                <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1" />
                                <p className="text-lg text-slate-200 leading-relaxed">
                                    {step.replace(/(\d+)/g, ' $1 ')}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-800">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">差距分析 (Gap Analysis)</span>
                            <span className="text-rose-500 font-bold text-lg bg-rose-900/20 px-3 py-1 rounded-lg border border-rose-900/30">{data.gapAnalysis.diffAmount} 偏差</span>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="flex-1 bg-slate-950 border border-slate-800 p-5 rounded-2xl">
                                <span className="text-sm text-slate-500 block mb-2 font-medium">汇报值</span>
                                <span className="text-4xl font-bold text-white font-['PingFang_SC']">{data.originalValue}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <ArrowRight size={32} />
                            </div>
                            <div className="flex-1 bg-indigo-950/30 border border-indigo-500/30 p-5 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-indigo-500/5 animate-pulse pointer-events-none"></div>
                                <span className="text-sm text-indigo-300 block mb-2 font-medium">真实值</span>
                                <span className="text-4xl font-bold text-white font-['PingFang_SC']">{data.aiValue}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis & Impact Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 bg-slate-900 rounded-3xl border border-slate-800 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-purple-900/30 rounded-lg text-purple-400">
                            <Zap size={20} /> 
                        </div>
                        AI 根本原因分析
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed mb-6 font-medium">
                        {data.rootCause}
                    </p>
                    <div className="mt-4 p-4 bg-slate-800 rounded-xl text-sm text-slate-300 border border-slate-700 flex items-start gap-3">
                        <Mail size={16} className="text-slate-500 mt-0.5 shrink-0" />
                        <span className="font-mono">证据: "回复: Gamma 交易状态 - 预计延迟"</span>
                    </div>
                </div>

                <div className="md:col-span-1 bg-slate-900 rounded-3xl border border-slate-800 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-amber-900/30 rounded-lg text-amber-400">
                            <TrendingDown size={20} /> 
                        </div>
                        潜在业务影响
                    </h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
                            <span className="text-base text-slate-400">现金流风险</span>
                            <span className="text-white font-bold text-lg bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">{data.impact.cashflow}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
                            <span className="text-base text-slate-400">Q4 预算影响</span>
                            <span className="text-rose-500 font-bold text-lg bg-rose-900/20 px-3 py-1 rounded-lg border border-rose-900/30">{data.impact.budget}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
                            <span className="text-base text-slate-400">投资者信心</span>
                            <span className="text-amber-500 font-bold text-lg bg-amber-900/20 px-3 py-1 rounded-lg border border-amber-900/30">{data.impact.investorConfidence}</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 bg-slate-900 rounded-3xl border border-slate-800 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400">
                            <Users size={20} /> 
                        </div>
                        涉及部门/人员
                    </h3>
                    <div className="flex items-center gap-5 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 mb-4 hover:bg-slate-800 transition-colors">
                        <img src={data.person.avatar} className="w-14 h-14 rounded-full border-2 border-slate-600 shadow-lg" alt="" />
                        <div>
                            <div className="text-base font-bold text-white mb-1">{data.person.name}</div>
                            <div className="text-sm text-slate-500">{data.person.role}</div>
                        </div>
                        <span className="ml-auto text-xs bg-rose-950 text-rose-400 px-3 py-1.5 rounded-lg border border-rose-900/50 font-bold">主要负责</span>
                    </div>
                    <div className="flex items-center gap-5 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30 opacity-70 hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-600">SJ</div>
                        <div>
                            <div className="text-base font-bold text-white mb-1">Sarah Jenkins</div>
                            <div className="text-sm text-slate-500">销售副总裁</div>
                        </div>
                        <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-3 py-1.5 rounded-lg font-bold">被提及</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// View 3: Sentiment Anomaly Detail
const SentimentAnomalyView = ({ onBack }: { onBack: () => void }) => {
    const data = mockSentimentAnomalyDetail;

    return (
        <div className="h-full flex flex-col animate-fade-in custom-scrollbar overflow-y-auto pb-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 shrink-0">
                <div className="flex items-center gap-3 text-base text-slate-500 font-medium">
                    <span className="hover:text-white cursor-pointer transition-colors" onClick={onBack}>风险审计</span>
                    <ChevronRight size={16} />
                    <span>沟通监控</span>
                    <ChevronRight size={16} />
                    <span className="text-indigo-400">警报 #{data.eventId}</span>
                </div>
            </div>

            <div className="mb-10">
                <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">私聊情绪异常警报</h1>
                <div className="flex items-center gap-3 text-rose-500 font-bold uppercase tracking-wider text-lg bg-rose-950/20 p-4 rounded-xl border border-rose-900/30 inline-flex">
                    <AlertTriangle size={24} /> CRITICAL ALERT
                    <div className="w-px h-6 bg-rose-900/50 mx-2"></div>
                    <span className="text-slate-300 font-normal normal-case text-base font-medium">
                        AI 检测到在 <span className="text-white font-bold">“{data.relatedContext}”</span> 官方投票通过后，私聊频道中随即出现了大量负面吐槽，表里不一现象严重。
                    </span>
                </div>
            </div>

            <div className="flex gap-4 mb-10">
                <button className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-base text-white font-bold flex items-center gap-2 hover:bg-slate-700 transition-colors shadow-sm">
                    <Share2 size={18} /> 分享报告
                </button>
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-base text-white font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-900/30">
                    <Bot size={18} /> AI 介入分析
                </button>
            </div>

            {/* Four Stats Cards */}
            <div className="grid grid-cols-4 gap-8 mb-10">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <AlertTriangle size={64} className="text-rose-500" />
                    </div>
                    <div className="text-base font-bold text-slate-400 mb-2">严重程度</div>
                    <div className="text-4xl font-black text-white mb-2 tracking-tight">极高风险</div>
                    <div className="text-sm text-rose-500 font-bold bg-rose-900/20 px-2 py-1 rounded inline-block">Top 5% 风险系数</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <CheckCircle2 size={64} className="text-emerald-500" />
                    </div>
                    <div className="text-base font-bold text-slate-400 mb-2">公开投票结果</div>
                    <div className="text-4xl font-black text-white mb-2 tracking-tight">100% 通过</div>
                    <div className="text-sm text-emerald-500 font-bold bg-emerald-900/20 px-2 py-1 rounded inline-block">全票一致决定</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Frown size={64} className="text-rose-500" />
                    </div>
                    <div className="text-base font-bold text-slate-400 mb-2">私聊负面情绪</div>
                    <div className="text-4xl font-black text-white mb-2 tracking-tight">{data.negativeRatio} 负面占比</div>
                    <div className="text-sm text-amber-500 font-bold bg-amber-900/20 px-2 py-1 rounded inline-block">较平均值 +72%</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Users size={64} className="text-blue-500" />
                    </div>
                    <div className="text-base font-bold text-slate-400 mb-2">涉及范围</div>
                    <div className="text-4xl font-black text-white mb-2 tracking-tight">3 个核心部门</div>
                    <div className="text-sm text-slate-500 font-bold bg-slate-800 px-2 py-1 rounded inline-block">产研, 市场</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left: Chart */}
                <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-white text-2xl">异常事件时间点 & 相关摘要</h3>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="flex items-center gap-2 text-slate-400"><div className="w-3 h-3 bg-slate-600 rounded-full"></div> 会议中</span>
                            <span className="flex items-center gap-2 text-slate-400"><div className="w-3 h-3 bg-rose-500 rounded-full"></div> 负面吐槽爆发</span>
                        </div>
                    </div>
                    
                    <div className="h-[400px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.timelineData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5}/>
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                                <XAxis dataKey="time" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} interval={0} dy={10} />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff', padding: '12px' }} />
                                
                                <ReferenceLine x="14:15" stroke="#fbbf24" strokeDasharray="3 3" label={{ value: '私聊量激增 +400%', position: 'top', fill: '#fbbf24', fontSize: 12, className: "bg-black px-2 py-1 rounded" }} />
                                
                                <Area type="monotone" dataKey="sentiment" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorSentiment)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        
                        {/* Overlay Timeline Box */}
                        <div className="absolute bottom-10 left-[1.5%] w-[32%] h-24 border-2 border-indigo-500/30 bg-indigo-500/10 rounded-xl flex flex-col items-center justify-center text-sm text-indigo-300 backdrop-blur-[2px]">
                            <span className="font-bold text-base">会议 (1h)</span>
                            <span className="text-xs opacity-70 mt-1">13:30 - 14:30</span>
                        </div>
                    </div>
                </div>

                {/* Right: AI Analysis */}
                <div className="lg:col-span-4 bg-indigo-950/20 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden shadow-lg shadow-indigo-900/10">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Sparkles size={120} className="text-indigo-400" />
                    </div>
                    
                    <h3 className="font-bold text-white text-2xl mb-6 flex items-center gap-3">
                        <Sparkles size={24} className="text-indigo-400" />
                        AI 潜在原因分析
                    </h3>
                    
                    <div className="bg-indigo-900/20 rounded-2xl p-6 border border-indigo-500/20">
                        <p className="text-indigo-100 text-lg leading-relaxed font-medium">
                            {data.aiAnalysis}
                        </p>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-indigo-500/20">
                        <h4 className="text-indigo-300 font-bold mb-3 uppercase tracking-wider text-sm">推荐阅读</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-indigo-200 text-sm hover:text-white cursor-pointer transition-colors">
                                <FileText size={16} /> <span>组织行为学：阿比林悖论</span>
                            </div>
                            <div className="flex items-center gap-3 text-indigo-200 text-sm hover:text-white cursor-pointer transition-colors">
                                <FileText size={16} /> <span>如何营造心理安全感</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Detailed Metrics & Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {/* Keywords */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                    <h4 className="text-lg font-bold text-slate-400 mb-6 uppercase tracking-wider">检测到的负面关键词</h4>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-rose-950/40 text-rose-400 border border-rose-900/50 rounded-xl text-base font-bold shadow-sm">时间线不可能</span>
                        <span className="px-4 py-2 bg-rose-950/40 text-rose-400 border border-rose-900/50 rounded-xl text-base font-bold shadow-sm">完全不切实际</span>
                        <span className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-base">资源缺口</span>
                        <span className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-base">身心俱疲</span>
                        <span className="px-4 py-2 bg-rose-950/40 text-rose-400 border border-rose-900/50 rounded-xl text-base font-bold shadow-sm">被迫表态</span>
                        <span className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-base">Q4 预算不足</span>
                        <span className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-base">领导层脱节</span>
                    </div>
                </div>

                {/* Emotion Breakdown */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                    <h4 className="text-lg font-bold text-slate-400 mb-6 uppercase tracking-wider">情绪爆发严重程度</h4>
                    <div className="space-y-6">
                        {data.keyEmotions.map((emo, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-white">{emo.label}</span>
                                    <span className={idx === 0 ? 'text-rose-500' : idx === 1 ? 'text-amber-500' : 'text-slate-400'}>{emo.score}%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${idx === 0 ? 'bg-rose-500' : idx === 1 ? 'bg-amber-500' : 'bg-slate-500'}`} 
                                        style={{width: `${emo.score}%`}}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col">
                    <h4 className="text-lg font-bold text-slate-400 mb-6 uppercase tracking-wider">建议解决方案 & 沟通策略</h4>
                    <div className="space-y-4 flex-1">
                        {data.recommendedAction.map((action, idx) => (
                            <div key={idx} className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 hover:border-indigo-500/30 transition-all hover:bg-slate-800 cursor-pointer group shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors">{action.title}</h5>
                                    {idx === 0 ? <Calendar size={18} className="text-blue-400"/> : <FileText size={18} className="text-blue-400"/>}
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    {action.desc}
                                </p>
                                <div className="mt-3 text-xs font-bold text-indigo-500 group-hover:underline flex items-center gap-1">
                                    {idx === 0 ? '立即安排会议' : '查看话术脚本'} <ArrowRight size={12} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Dashboard Controller ---
const ComplianceAuditDashboard = () => {
    const [view, setView] = useState<'list' | 'detail_fact' | 'detail_sentiment'>('list');
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    const handleSelectEvent = (event: AuditEvent) => {
        if (event.type === 'FactDeviation') {
            setSelectedEventId(event.id);
            setView('detail_fact');
        } else if (event.type === 'SentimentAnomaly') {
            setSelectedEventId(event.id);
            setView('detail_sentiment');
        } else {
            // For other types, we stay on list or show a generic detail placeholder
            console.log('Detail view not implemented for', event.type);
        }
    };

    if (view === 'detail_fact') {
        return <FactDeviationView onBack={() => setView('list')} />;
    }

    if (view === 'detail_sentiment') {
        return <SentimentAnomalyView onBack={() => setView('list')} />;
    }

    // Default List View
    return (
        <div className="h-full flex flex-col animate-fade-in pb-4 bg-[#020617] overflow-hidden">
            
            {/* Top Stats - Image 1 Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 shrink-0">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-rose-900/20 to-transparent pointer-events-none"></div>
                    <div>
                        <div className="text-slate-400 text-xs font-bold mb-1">待处理高风险事件</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">3</span>
                            <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                                <TrendingDown className="rotate-180" size={12} /> +1 今日新增
                            </span>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-full text-rose-500">
                        <AlertTriangle size={32} />
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <div className="text-slate-400 text-xs font-bold mb-1">本周 AI 扫描次数</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">1,429</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 bg-emerald-900/30 px-2 py-0.5 rounded-full">
                                <CheckCircle2 size={10} /> 运行正常
                            </span>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-full text-slate-500">
                        <Activity size={32} />
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <div className="text-slate-400 text-xs font-bold mb-1">潜在私聊情绪异动</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">5</span>
                            <span className="text-amber-500 text-xs font-bold">需关注</span>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-full text-amber-500">
                        <Users size={32} />
                    </div>
                </div>
            </div>

            {/* List Header & Filters */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className="text-2xl font-bold text-white">事件监控台</h2>
                
                <div className="flex gap-3">
                    <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex text-xs font-bold">
                        <button className="px-4 py-1.5 bg-slate-800 text-white rounded shadow-sm">所有事件</button>
                        <button className="px-4 py-1.5 text-slate-500 hover:text-white transition-colors">未处理</button>
                        <button className="px-4 py-1.5 text-slate-500 hover:text-white transition-colors">已解决</button>
                    </div>
                    
                    <div className="w-px h-8 bg-slate-800 mx-2"></div>

                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-xs hover:text-white hover:border-slate-700 transition-colors">
                        所有严重等级 <ChevronRight className="rotate-90" size={12} />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-xs hover:text-white hover:border-slate-700 transition-colors">
                        所有类型 <ChevronRight className="rotate-90" size={12} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-lg shadow-indigo-900/20">
                        <Search size={14} /> 刷新列表
                    </button>
                </div>
            </div>

            {/* Event List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {mockAuditEvents.map(event => (
                    <AuditEventRow 
                        key={event.id} 
                        event={event} 
                        onClick={() => handleSelectEvent(event)} 
                    />
                ))}
            </div>

            {/* Pagination / Footer */}
            <div className="mt-4 flex justify-center pb-4 shrink-0">
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 hover:text-white hover:border-slate-700 transition-colors">
                        <ChevronRight className="rotate-180" size={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-lg">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-xs">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-xs">3</button>
                    <span className="text-slate-600 text-xs px-2">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 hover:text-white hover:border-slate-700 transition-colors">
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const QuoteIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H7.0166V21H5.0166Z" />
    </svg>
);

export default ComplianceAuditDashboard;
