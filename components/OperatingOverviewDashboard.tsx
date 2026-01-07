
import React, { useState, useEffect } from 'react';
import { 
    Sun, 
    CheckSquare, 
    Lightbulb, 
    AlertOctagon, 
    Briefcase, 
    TrendingUp, 
    Target, 
    DollarSign, 
    MoreHorizontal, 
    Sparkles, 
    Split, 
    ArrowRight, 
    Activity, 
    Layers, 
    BrainCircuit, 
    PlayCircle, 
    Send, 
    MessageCircle, 
    X, 
    Loader2, 
    Bot,
    Megaphone,
    ThumbsUp,
    ThumbsDown,
    Share2,
    Smile,
    Frown,
    Meh,
    FileText,
    AlertTriangle,
    ShieldAlert,
    Check,
    XCircle
} from 'lucide-react';
import { mockOperatingData, mockDailyBriefing, mockComplianceRisks } from '../services/mockData';
import { RiskLevel, OverviewConfig } from '../types';

// Tech-style background card component with gradient and decorative elements
const TechCard = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
    <div className={`relative bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl group ${className}`}>
        {/* Top-right decorative sheen/glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
        
        {/* Tech Corner Accent - Top Right */}
        <div className="absolute top-5 right-5 w-3 h-3 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-sm pointer-events-none"></div>
        {/* Tech Corner Accent - Bottom Left */}
        <div className="absolute bottom-5 left-5 w-3 h-3 border-b-2 border-l-2 border-indigo-500/30 rounded-bl-sm pointer-events-none"></div>
        
        {children}
    </div>
);

const MetricProgressBar = ({ 
    label, 
    current, 
    target, 
    unit 
}: { 
    label: string, 
    current: number, 
    target: number, 
    unit: string 
}) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100);
    const isBehind = current < target;
    
    return (
        <TechCard className="p-8 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col">
                    <h4 className="text-slate-400 text-lg font-medium font-['PingFang_SC'] tracking-wide uppercase flex items-center gap-2">
                        <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                        {label}
                    </h4>
                    <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-7xl font-bold text-white tracking-tighter drop-shadow-md font-['PingFang_SC'] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            {current}
                        </span>
                        <span className="text-2xl text-slate-500 font-medium font-['PingFang_SC']">{unit}</span>
                    </div>
                </div>
                
                {/* Circular Indicator for visual balance */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Background Circle - Added viewBox for scaling */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" 
                            strokeDasharray={226} 
                            strokeDashoffset={226 - (226 * percentage) / 100}
                            strokeLinecap="round"
                            className={`${isBehind ? 'text-indigo-500' : 'text-emerald-500'} transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]`} 
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-white">{percentage}%</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-sm text-slate-500 font-['PingFang_SC']">
                    <span>当前进度</span>
                    <span className="text-slate-400">目标: <span className="text-slate-300 font-bold">{target}</span> {unit}</span>
                </div>
                {/* Progress Bar Container */}
                <div className="relative w-full h-3 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                    <div 
                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                            percentage >= 100 
                            ? 'bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                            : 'bg-gradient-to-r from-indigo-600 via-indigo-400 to-cyan-300 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                        }`}
                        style={{ width: `${percentage}%` }}
                    >
                        {/* Shimmer overlay */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
            </div>
        </TechCard>
    );
};

const StatCard = ({ icon: Icon, label, value, colorClass, trend }: any) => (
    <TechCard className="p-8 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
        <div className="flex items-start justify-between relative z-10">
            <h4 className="text-slate-400 text-lg font-medium font-['PingFang_SC'] tracking-wide flex items-center gap-2">
                <div className={`w-1 h-4 rounded-full ${colorClass.replace('text-', 'bg-')}`}></div>
                {label}
            </h4>
            <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10 border border-white/5 backdrop-blur-md shadow-inner`}>
                <Icon size={32} className={colorClass.replace('bg-', 'text-')} />
            </div>
        </div>
        
        <div className="relative z-10">
            <div className="text-7xl font-bold text-white tracking-tighter drop-shadow-xl font-['PingFang_SC'] mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">
                {value}
            </div>
            
            {/* Simulated mini-chart/trend visualization */}
            <div className="flex items-end justify-between">
                <div className="h-8 flex gap-1 items-end">
                    {[30, 50, 45, 70, 60, 90, 75, 100].map((h, i) => (
                        <div 
                            key={i} 
                            className={`w-2 rounded-t-sm transition-all duration-500 hover:opacity-100 ${colorClass.replace('text-', 'bg-')}`} 
                            style={{ 
                                height: `${h}%`, 
                                opacity: 0.2 + (i * 0.1) 
                            }} 
                        ></div>
                    ))}
                </div>
                
                {trend && (
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-500 mb-1">同比上月</span>
                        <span className="text-emerald-400 text-base font-bold flex items-center bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                            <TrendingUp size={16} className="mr-1.5" />
                            {trend}
                        </span>
                    </div>
                )}
            </div>
        </div>
    </TechCard>
);

const AIReportSection = ({ showDecisionSupport, onOpenPR }: { showDecisionSupport: boolean, onOpenPR: (riskId: string) => void }) => {
    const { date, greetings, summary, todos, insights, decisionSupport } = mockDailyBriefing;
    const [checkedTodos, setCheckedTodos] = useState<string[]>(
        todos.filter(t => t.done).map(t => t.id)
    );
    const [showSuperviseModal, setShowSuperviseModal] = useState(false);
    const [superviseTarget, setSuperviseTarget] = useState('');
    const [superviseDraft, setSuperviseDraft] = useState('');
    const [toast, setToast] = useState<string | null>(null);

    const toggleTodo = (id: string) => {
        if (checkedTodos.includes(id)) {
            setCheckedTodos(checkedTodos.filter(tid => tid !== id));
        } else {
            setCheckedTodos([...checkedTodos, id]);
        }
    };

    const handleSuperviseClick = (insight: string) => {
        const target = '相关负责人';
        setSuperviseTarget(target);
        setSuperviseDraft(`【重要】关于${insight.slice(0, 10)}...的问询\n\n${target}：\n\n监测到上述异常情况，请于 24 小时内就上述情况提供书面说明及整改计划。\n\n集团总裁办`);
        setShowSuperviseModal(true);
    };

    const handleSendSupervision = () => {
        setShowSuperviseModal(false);
        setToast('✅ 已发送问询函。Agent 正在追踪回复，若 24 小时未回将自动升级提醒。');
        setTimeout(() => setToast(null), 5000);
    };

    return (
        <TechCard className="p-0 mb-8 border-indigo-500/20 bg-gradient-to-r from-[#111827] to-[#1e1b4b]">
            {/* Modal for Human-in-the-loop Supervision */}
            {showSuperviseModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 rounded-2xl border border-indigo-500/50 shadow-2xl w-[600px] overflow-hidden">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                            <h3 className="font-bold text-white flex items-center gap-3 text-lg">
                                <Bot size={24} className="text-indigo-400" />
                                人机协同 (Human-in-the-loop)
                            </h3>
                            <button onClick={() => setShowSuperviseModal(false)} className="text-slate-500 hover:text-slate-300">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <p className="text-slate-300 text-lg">
                                检测到 <span className="font-bold text-white">{superviseTarget}</span> 数据异常，是否通过企业微信发送以下问询？
                            </p>
                            <div className="relative">
                                <textarea 
                                    value={superviseDraft}
                                    onChange={(e) => setSuperviseDraft(e.target.value)}
                                    className="w-full h-48 bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-medium leading-relaxed"
                                />
                                <div className="absolute top-2 right-2 px-2 py-1 bg-indigo-600 text-white text-[10px] rounded uppercase font-bold">AI Draft</div>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setShowSuperviseModal(false)}
                                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 font-bold transition-colors"
                                >
                                    取消
                                </button>
                                <button 
                                    onClick={handleSendSupervision}
                                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Send size={18} />
                                    确认发送并追踪
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-8 py-4 rounded-full shadow-2xl border border-emerald-500/50 text-base font-bold flex items-center gap-4 animate-fade-in ring-4 ring-emerald-900/20">
                    <Sparkles size={24} className="text-emerald-400" />
                    {toast}
                </div>
            )}

            <div className="relative p-10 z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Background Glow */}
                <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

                {/* Left: Briefing */}
                <div className="lg:col-span-8 relative z-10">
                    <div className="flex items-center gap-3 text-indigo-300 text-sm font-bold uppercase tracking-wider mb-6 font-['PingFang_SC']">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </div>
                        AI 晨报 • {date}
                    </div>
                    
                    <h2 className="text-5xl font-bold mb-6 text-white tracking-tight font-['PingFang_SC'] leading-tight drop-shadow-lg">
                        {greetings}
                    </h2>
                    
                    <p className="text-slate-300 text-2xl leading-relaxed mb-10 font-light font-['PingFang_SC'] max-w-4xl">
                        {summary}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        {insights.map((insight, idx) => {
                            const isPRRisk = insight.includes('舆情') || insight.includes('公关');
                            
                            // Parse category if present (e.g., 【Category】)
                            const categoryMatch = insight.match(/^【(.*?)】/);
                            const category = categoryMatch ? categoryMatch[1] : null;
                            const content = category ? insight.replace(/^【.*?】/, '') : insight;

                            return (
                                <div key={idx} className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-indigo-500/30 transition-all duration-300">
                                    <div className={`p-2.5 rounded-xl shrink-0 transition-all ${isPRRisk ? 'bg-indigo-500 text-white shadow-lg' : 'bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20 group-hover:scale-110'}`}>
                                        {isPRRisk ? <Megaphone size={24} /> : <Lightbulb size={24} />}
                                    </div>
                                    <div className="flex-1 flex flex-col items-start gap-3">
                                        <span className={`text-lg font-['PingFang_SC'] leading-relaxed pt-1 block transition-colors ${isPRRisk ? 'text-indigo-200 font-bold' : 'text-slate-200 group-hover:text-white'}`}>
                                            {category && (
                                                <span className={`mr-2 ${
                                                    category.includes('高危') || category.includes('预警') ? 'text-rose-400' : 'text-indigo-400'
                                                }`}>
                                                    【{category}】
                                                </span>
                                            )}
                                            {content}
                                        </span>
                                        {/* PR Button */}
                                        {isPRRisk && (
                                            <button 
                                                onClick={() => onOpenPR('briefing_risk')}
                                                className="mt-1 flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/40"
                                            >
                                                <Megaphone size={16} />
                                                启动公关应对 (AI Crisis)
                                            </button>
                                        )}
                                        {/* Regular Supervise Button */}
                                        {!isPRRisk && (insight.includes('预警') || insight.includes('风险') || insight.includes('竞品')) && (
                                            <button 
                                                onClick={() => handleSuperviseClick(insight)}
                                                className="flex items-center gap-2 px-4 py-2 bg-rose-900/30 border border-rose-500/30 text-rose-300 rounded-lg text-sm font-bold hover:bg-rose-900/50 transition-all group-hover:translate-x-2"
                                            >
                                                <AlertOctagon size={16} />
                                                立即督办
                                                <ArrowRight size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* AI Decision Simulator - Compact & Modern */}
                    {decisionSupport && showDecisionSupport && (
                        <div className="mt-10 pt-8 border-t border-white/5 animate-fade-in">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-lg">
                                    <Split size={20} className="text-white" />
                                </div>
                                <h4 className="font-bold text-white text-xl font-['PingFang_SC']">AI 决策模拟: <span className="text-indigo-200">{decisionSupport.topic}</span></h4>
                            </div>
                            <div className="flex gap-6">
                                {decisionSupport.options.map(option => (
                                    <button key={option.id} className="flex-1 relative overflow-hidden bg-slate-800/40 border border-slate-600/30 rounded-2xl p-5 hover:bg-slate-700/40 hover:border-indigo-500/50 transition-all text-left group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-lg font-bold text-white group-hover:text-indigo-300">{option.label}</span>
                                            <div className="p-1 rounded-full bg-slate-700/50 group-hover:bg-indigo-500/20 transition-colors">
                                                <ArrowRight size={18} className="text-slate-400 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                        <p className="text-base text-slate-400 font-['PingFang_SC'] line-clamp-2">{option.predictedOutcome}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Todo List */}
                <div className="lg:col-span-4 bg-black/20 rounded-3xl p-8 border border-white/5 backdrop-blur-xl flex flex-col h-full shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <h3 className="flex items-center justify-between text-xl font-bold text-white mb-8 font-['PingFang_SC'] relative z-10">
                        <span className="flex items-center gap-3"><CheckSquare size={24} className="text-emerald-400"/> 今日待办</span>
                        <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full font-mono">{todos.length} TASKS</span>
                    </h3>
                    
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                        {todos.map(todo => {
                            const isDone = checkedTodos.includes(todo.id);
                            return (
                                <div 
                                    key={todo.id} 
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`group flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${
                                        isDone 
                                        ? 'bg-slate-900/30 border-transparent opacity-40 grayscale' 
                                        : 'bg-gradient-to-b from-slate-800/40 to-slate-900/40 border-slate-700/50 hover:border-indigo-500/40 hover:shadow-lg hover:-translate-y-0.5'
                                    }`}
                                >
                                    <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-all border-2 ${
                                        isDone ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 group-hover:border-indigo-400 bg-slate-800'
                                    }`}>
                                        {isDone && <CheckSquare size={14} className="text-white" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-lg font-['PingFang_SC'] font-medium transition-colors ${isDone ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
                                            {todo.text}
                                        </p>
                                        {todo.priority === 'High' && !isDone && (
                                            <span className="inline-flex items-center gap-1 mt-2 text-xs text-rose-300 font-bold px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded-md tracking-wider uppercase">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                                                High Priority
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </TechCard>
    );
};

// --- Contract Detail Modal ---
const ContractDetailModal = ({ 
    isOpen, 
    onClose 
}: { 
    isOpen: boolean, 
    onClose: () => void 
}) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="bg-slate-900 border border-rose-500/30 rounded-2xl w-[900px] h-[600px] shadow-2xl overflow-hidden flex flex-col relative" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <ShieldAlert className="text-rose-500" size={24} />
                            智能合同审计 (Smart Contract Audit)
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">检测到关键条款异常变更</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"><X size={24}/></button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Left: Document View */}
                    <div className="flex-1 p-8 bg-[#0f111a] overflow-y-auto border-r border-slate-800 custom-scrollbar">
                        <div className="max-w-2xl mx-auto bg-white/5 rounded-xl p-8 border border-white/10 shadow-inner">
                            <div className="mb-6 flex items-center gap-3">
                                <FileText size={32} className="text-slate-400" />
                                <div>
                                    <h4 className="text-lg font-bold text-slate-200">战略合作协议 v3.2.docx</h4>
                                    <span className="text-xs text-slate-500">最后修改: 14分钟前 by 对方法务</span>
                                </div>
                            </div>
                            
                            <div className="space-y-6 font-serif text-slate-300 leading-loose text-sm">
                                <p>... (前略) ...</p>
                                <div>
                                    <h5 className="font-bold text-white mb-2">第八条 知识产权条款 (Intellectual Property)</h5>
                                    <p className="p-4 bg-rose-900/10 border border-rose-500/30 rounded-lg">
                                        8.1 甲方同意将“云栖”系列核心专利（专利号：CN102394...）独家授权给乙方使用，授权期限为
                                        <span className="mx-1 px-1 bg-rose-500/20 text-rose-300 font-bold border-b-2 border-rose-500">三年 (3 Years)</span>
                                        （自本协议签署之日起计算）。在此期间，甲方不得将该专利授权给任何第三方使用。
                                    </p>
                                </div>
                                <p>... (后略) ...</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: AI Analysis */}
                    <div className="w-80 bg-slate-900 p-6 flex flex-col gap-6 border-l border-slate-800">
                        <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl">
                            <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                                <AlertTriangle size={18} />
                                风险提示
                            </div>
                            <p className="text-xs text-rose-200/80 leading-relaxed">
                                检测到核心利益条款发生重大变更，偏离集团标准合同模版。
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                                <Split size={16} /> 变更对比 (Diff)
                            </h4>
                            <div className="space-y-3">
                                <div className="p-3 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
                                    <span className="text-xs text-slate-500 block mb-1">标准条款 (Template)</span>
                                    <div className="text-sm font-bold text-emerald-400">授权期限: 1年</div>
                                </div>
                                <div className="flex justify-center text-slate-500"><ArrowRight size={16} className="rotate-90" /></div>
                                <div className="p-3 bg-rose-900/10 border border-rose-500/20 rounded-lg">
                                    <span className="text-xs text-slate-500 block mb-1">当前草案 (Draft)</span>
                                    <div className="text-sm font-bold text-rose-400">授权期限: 3年</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                                <Activity size={16} /> 影响评估
                            </h4>
                            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                                <li>锁定周期延长 200%，可能错失 2025 年其他战略合作机会。</li>
                                <li>若对方违约，解约成本将显著上升。</li>
                            </ul>
                        </div>

                        <div className="mt-auto space-y-3">
                            <button className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-900/20">
                                <XCircle size={18} />
                                驳回变更
                            </button>
                            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-slate-700">
                                <Check size={18} />
                                发起法务复核
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- PR Strategy Modal ---

type StrategyResult = {
    title: string;
    icon: any;
    content: string;
    winRate: number;
    trend: string;
    color: string;
};

const PRStrategyModal = ({ 
    isOpen, 
    onClose 
}: { 
    isOpen: boolean, 
    onClose: () => void 
}) => {
    const [step, setStep] = useState<'simulating' | 'results'>('simulating');
    
    const [results, setResults] = useState<Record<string, StrategyResult> | null>(null);

    useEffect(() => {
        if (isOpen) {
            setStep('simulating');
            // Simulate AI generating all three strategies at once
            setTimeout(() => {
                setResults({
                    Sincere: {
                        title: '诚恳道歉 (Sincere)',
                        icon: Smile,
                        content: "【致滨江壹号业主的公开信】\n我们听到了大家的声音。关于精装标准问题，我们不回避、不推诿。即日起成立专项整改小组，由区域总裁亲自挂帅，并在 48 小时内公示所有材料品牌与采购清单。若有违约，承诺三倍赔偿。请给我们一次修正的机会。",
                        winRate: 85,
                        trend: "舆论将从愤怒转向观望，理性声音回归，负面热度预计 24小时内下降 60%。",
                        color: 'emerald'
                    },
                    Tough: {
                        title: '强硬辟谣 (Tough)',
                        icon: Frown,
                        content: "【严正声明】\n近日网络流传的所谓“减配”视频纯属断章取义。我司所有交付标准均严格符合《商品房买卖合同》及样板间公示。对于恶意造谣、煽动闹事的个别人员，我司已固定证据并报案。网络不是法外之地！",
                        winRate: 45,
                        trend: "短期内可能激化矛盾，引发二次舆情反弹，建议慎用。",
                        color: 'rose'
                    },
                    Humorous: {
                        title: '幽默化解 (Humor)',
                        icon: Meh,
                        content: "听说大家觉得我们的装修“太素”了？这就尴尬了😅 本想走极简风，结果变成了简陋风... 既然大家不买账，那我们就“加料”！这周末售楼处直接开起“吐槽大会”，老板亲自去挨骂，还有神秘升级包派送，敢来吗？",
                        winRate: 65,
                        trend: "风险极高，可能被解读为嬉皮笑脸，但也可能因真诚自黑而圈粉，两极分化严重。",
                        color: 'amber'
                    }
                });
                setStep('results');
            }, 2500);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl w-[1100px] shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-6 border-b border-slate-800 bg-slate-900 flex justify-between items-center relative z-10">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Megaphone className="text-indigo-500" size={24} />
                            AI 公关策略中心 (Crisis Response)
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">AI 已基于全网舆情数据生成 3 种应对策略</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"><X size={24}/></button>
                </div>

                {/* Content */}
                <div className="p-8 min-h-[500px] relative">
                    {/* Background Grids */}
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

                    {step === 'simulating' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in relative z-10 py-12">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-slate-800 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                                <Bot size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" />
                            </div>
                            <div className="text-center space-y-2">
                                <h4 className="text-xl font-bold text-white">AI 正在平行推演 3 种策略走向...</h4>
                                <p className="text-slate-400 text-sm">分析 10W+ 社交媒体评论 • 模拟 50 种回应场景</p>
                            </div>
                        </div>
                    )}

                    {step === 'results' && results && (
                        <div className="grid grid-cols-3 gap-6 animate-fade-in-up relative z-10">
                            {Object.entries(results).map(([key, r]) => {
                                const result = r as StrategyResult;
                                const Icon = result.icon;
                                const isBest = result.winRate >= 80;
                                const colorStyles = {
                                    emerald: 'border-emerald-500/30 bg-emerald-900/10',
                                    rose: 'border-rose-500/30 bg-rose-900/10',
                                    amber: 'border-amber-500/30 bg-amber-900/10'
                                };
                                const btnStyles = {
                                    emerald: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30',
                                    rose: 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/30',
                                    amber: 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/30'
                                };

                                return (
                                    <div key={key} className={`relative flex flex-col rounded-2xl border p-5 ${colorStyles[result.color as keyof typeof colorStyles]} transition-all hover:-translate-y-1 hover:shadow-2xl`}>
                                        {isBest && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                <Sparkles size={10} /> AI 推荐
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                                            <div className={`p-3 rounded-full bg-slate-900/50 text-${result.color}-400`}>
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white">{result.title}</h4>
                                                <div className="text-xs text-slate-400">预计胜率: <span className={`text-${result.color}-400 font-bold text-sm`}>{result.winRate}%</span></div>
                                            </div>
                                        </div>

                                        <div className="flex-1 bg-slate-900/50 rounded-xl p-4 mb-4 border border-white/5 relative group">
                                            <div className="absolute top-2 right-2 opacity-50"><FileText size={16} className="text-slate-600" /></div>
                                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                                                {result.content}
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 flex items-center gap-1">
                                                <TrendingUp size={12} /> 趋势预判
                                            </div>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                {result.trend}
                                            </p>
                                        </div>

                                        <button className={`w-full py-3 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${btnStyles[result.color as keyof typeof btnStyles]}`}>
                                            <Share2 size={16} />
                                            采用并发布
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- What-If Simulator Component ---
const WhatIfSimulator = () => {
    const [prompt, setPrompt] = useState('');
    const [isSimulating, setIsSimulating] = useState(false);
    const [result, setResult] = useState<{ impact: string; highRisk: string; opportunity: string } | null>(null);

    const handleSimulate = () => {
        if (!prompt.trim()) return;
        setIsSimulating(true);
        setResult(null);

        // Mock Simulation Delay
        setTimeout(() => {
            setResult({
                impact: "基于当前限价政策调整，预计华东区新盘整体去化率提升 15%。",
                highRisk: "但部分高价地块利润率仍面临 3-5% 的下行压力。",
                opportunity: "建议加速改善型产品的推盘节奏，抢占市场回暖窗口。"
            });
            setIsSimulating(false);
        }, 2000);
    };

    return (
        <TechCard className="p-8 mb-8 border-indigo-500/30 bg-gradient-to-br from-slate-900 to-[#0B0F19]">
            <div className="flex items-start gap-6">
                <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-900/50 mt-1">
                    <BrainCircuit size={32} />
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        What-If 模拟器
                        <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30 font-medium">Core Module</span>
                    </h3>
                    <p className="text-slate-400 mb-6">
                        输入自然语言假设，AI 将基于蒙特卡洛模拟或历史数据为您推演潜在影响。
                    </p>
                    
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
                        <div className="relative flex items-center bg-slate-900 rounded-xl p-2 border border-slate-700 focus-within:border-indigo-500/50 transition-all">
                            <input 
                                type="text" 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="例如：如果二线城市全面取消限购，对我们下季度销售额有什么影响？" 
                                className="flex-1 bg-transparent border-none outline-none text-white text-lg px-4 placeholder:text-slate-600"
                                onKeyDown={(e) => e.key === 'Enter' && handleSimulate()}
                            />
                            <button 
                                onClick={handleSimulate}
                                disabled={!prompt.trim() || isSimulating}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSimulating ? <Loader2 size={20} className="animate-spin" /> : <PlayCircle size={20} />}
                                开始推演
                            </button>
                        </div>
                    </div>

                    {/* Simulation Result */}
                    {result && (
                        <div className="mt-6 p-6 bg-slate-800/50 border border-indigo-500/20 rounded-2xl animate-fade-in relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600"></div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="text-indigo-400 mt-1 shrink-0" size={20} />
                                    <p className="text-lg text-slate-200 leading-relaxed font-bold">
                                        {result.impact}
                                    </p>
                                </div>
                                <div className="pl-8 space-y-2">
                                    <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg text-rose-300 text-sm flex items-center gap-2">
                                        <AlertOctagon size={16} />
                                        {result.highRisk}
                                    </div>
                                    <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-emerald-300 text-sm flex items-center gap-2">
                                        <Sparkles size={16} />
                                        {result.opportunity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </TechCard>
    );
};

interface OperatingOverviewProps {
    config: OverviewConfig;
}

const OperatingOverviewDashboard: React.FC<OperatingOverviewProps> = ({ config }) => {
    const metrics = mockOperatingData;
    // Inject PR risk manually if not present, for demonstration
    const highRisks = mockComplianceRisks.filter(r => r.riskLevel === RiskLevel.HIGH).slice(0, 3);
    
    const [simulatingRiskId, setSimulatingRiskId] = useState<string | null>(null);
    const [riskSimulationResults, setRiskSimulationResults] = useState<Record<string, string>>({});
    
    // PR Modal State
    const [isPRModalOpen, setIsPRModalOpen] = useState(false);
    const [activePRRiskId, setActivePRRiskId] = useState<string | null>(null);

    // Contract Modal State
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);

    const handleRiskSimulate = (riskId: string) => {
        setSimulatingRiskId(riskId);
        // Mock Monte Carlo simulation delay
        setTimeout(() => {
            const results = [
                "经蒙特卡洛模拟(10,000次)，该风险触发概率为 85%，潜在资金缺口上限 $240M。",
                "历史数据推演显示，类似违约事件曾导致区域公司销售停滞 3 个月。",
                "模拟显示：若不采取行动，Q4 现金流断裂概率将提升至 40%。"
            ];
            const result = results[Math.floor(Math.random() * results.length)];
            
            setRiskSimulationResults(prev => ({ ...prev, [riskId]: result }));
            setSimulatingRiskId(null);
        }, 1500);
    };

    const handleOpenPR = (riskId: string) => {
        setActivePRRiskId(riskId);
        setIsPRModalOpen(true);
    };

    // If no config provided (fallback), assume all true
    const safeConfig = config || {
        showAIReport: true,
        showDecisionSupport: true,
        showWhatIf: true,
        showMetrics: true,
        showRisks: true,
        showSubFundChart: true
    };

    return (
        <div className="animate-fade-in pb-10 font-['PingFang_SC']">
            
            <PRStrategyModal 
                isOpen={isPRModalOpen} 
                onClose={() => setIsPRModalOpen(false)} 
            />

            <ContractDetailModal
                isOpen={isContractModalOpen}
                onClose={() => setIsContractModalOpen(false)}
            />

            {/* AI Morning Briefing Section */}
            {safeConfig.showAIReport && (
                <AIReportSection showDecisionSupport={safeConfig.showDecisionSupport} onOpenPR={handleOpenPR} />
            )}
            
            {/* New Module: What-If Simulator */}
            {safeConfig.showWhatIf && <WhatIfSimulator />}

            {safeConfig.showMetrics && (
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 font-['PingFang_SC'] pl-2">
                    <div className="p-2 bg-indigo-600/20 rounded-xl border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                        <Activity size={24} className="text-indigo-400" />
                    </div>
                    地产集团经营大盘
                </h3>
            )}

            {/* Core Metrics Grid - Big Screen Mode (2 Cols) */}
            {safeConfig.showMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Revenue Progress */}
                    <MetricProgressBar 
                        label="年度全口径销售 (Contracted Sales)"
                        current={metrics.revenue.projected}
                        target={metrics.revenue.target}
                        unit="亿"
                    />

                    {/* Billings Progress */}
                    <MetricProgressBar 
                        label="年度拿地/投资进度 (Investment)"
                        current={metrics.billings.projected}
                        target={metrics.billings.target}
                        unit="亿"
                    />

                    {/* Cash & Margin Stats */}
                    <StatCard 
                        label="销售回款 (Cash Collection)"
                        value={`¥${metrics.collection}亿`}
                        icon={DollarSign}
                        colorClass="bg-emerald-500 text-emerald-500"
                        trend="+8.5%"
                    />
                    
                    <StatCard 
                        label="综合毛利率 (Gross Margin)"
                        value={`${metrics.grossMargin}%`}
                        icon={TrendingUp}
                        colorClass="bg-amber-500 text-amber-500"
                        trend="-1.2%"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Critical Risks */}
                {safeConfig.showRisks && (
                    <TechCard className="lg:col-span-2 p-8 bg-gradient-to-br from-[#1e293b] to-[#1a1215]">
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <h4 className="text-xl font-bold text-white flex items-center gap-3 font-['PingFang_SC']">
                                <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                                    <AlertOctagon size={24} className="text-rose-500" />
                                </div>
                                关键风险 (Top 3)
                            </h4>
                            <button className="text-sm text-indigo-400 font-bold hover:text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-500/10 transition-colors border border-transparent hover:border-indigo-500/20">查看全部</button>
                        </div>
                        <div className="space-y-5 relative z-10">
                            {highRisks.map(risk => (
                                <div key={risk.id} className="relative group overflow-hidden p-6 bg-slate-800/20 rounded-2xl border border-slate-700/50 hover:border-rose-500/30 transition-all hover:bg-slate-800/40 hover:shadow-lg">
                                    {/* Left accent line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500/30 group-hover:bg-rose-500 transition-colors"></div>
                                    
                                    <div className="flex items-start gap-6 pl-2">
                                        <div className="mt-1">
                                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500 group-hover:scale-110 transition-transform">
                                                {risk.category === '舆情风险' ? <Megaphone size={24} /> : 
                                                 risk.category === '合同风险' ? <FileText size={24} /> : <AlertOctagon size={24} />}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h5 className="font-bold text-slate-100 text-xl font-['PingFang_SC'] mb-2 group-hover:text-rose-200 transition-colors">{risk.title}</h5>
                                                <span className="text-xs font-mono font-bold text-slate-500 border border-slate-700 rounded px-2 py-1">{risk.id.toUpperCase()}</span>
                                            </div>
                                            <p className="text-slate-400 text-base leading-relaxed font-['PingFang_SC'] max-w-3xl">{risk.description}</p>
                                            
                                            <div className="flex items-center gap-4 mt-5">
                                                <span className="text-xs text-rose-300 font-bold bg-rose-900/40 px-3 py-1.5 rounded-lg border border-rose-500/20 flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                                    {risk.category}
                                                </span>
                                                <span className="text-sm text-slate-500 font-medium flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg">
                                                    <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                                                    {risk.owner}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* PR Button for Risk List */}
                                        {risk.category === '舆情风险' && (
                                            <button 
                                                onClick={() => handleOpenPR(risk.id)}
                                                className="shrink-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white w-20 h-20 rounded-xl shadow-lg border border-indigo-400/30 transition-all hover:scale-105"
                                            >
                                                <Megaphone size={24} />
                                                <span className="text-xs font-bold">公关</span>
                                            </button>
                                        )}

                                        {/* Contract Detail Button */}
                                        {risk.category === '合同风险' && (
                                            <button 
                                                onClick={() => setIsContractModalOpen(true)}
                                                className="shrink-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white w-20 h-20 rounded-xl shadow-lg border border-slate-600 transition-all hover:scale-105"
                                            >
                                                <FileText size={24} />
                                                <span className="text-xs font-bold">详情</span>
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* AI Suggestion / Simulation Action */}
                                    <div className="mt-5 ml-[72px] bg-gradient-to-r from-indigo-900/10 to-slate-800/10 border border-indigo-500/10 rounded-xl p-4 transition-colors">
                                        {/* Simulation Button or Result */}
                                        {!riskSimulationResults[risk.id] ? (
                                            <div className="flex gap-4 items-center">
                                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shadow-sm">
                                                    <Sparkles size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-base text-indigo-200 font-['PingFang_SC']">{risk.aiSuggestion}</p>
                                                </div>
                                                {risk.category !== '舆情风险' && risk.category !== '合同风险' && (
                                                    <button 
                                                        onClick={() => handleRiskSimulate(risk.id)}
                                                        disabled={simulatingRiskId === risk.id}
                                                        className="text-sm bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 px-5 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 font-bold whitespace-nowrap shadow-lg shadow-indigo-900/10 hover:shadow-indigo-500/30 disabled:opacity-50"
                                                    >
                                                        {simulatingRiskId === risk.id ? <Loader2 size={16} className="animate-spin"/> : '模拟推演'}
                                                        {simulatingRiskId !== risk.id && <ArrowRight size={16} />}
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex gap-4 items-center animate-fade-in bg-indigo-950/40 p-1 rounded-lg">
                                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shadow-sm self-start mt-1">
                                                    <Bot size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-base text-emerald-200 font-bold font-['PingFang_SC']">
                                                        {riskSimulationResults[risk.id]}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => setRiskSimulationResults(prev => {
                                                        const newState = {...prev};
                                                        delete newState[risk.id];
                                                        return newState;
                                                    })}
                                                    className="p-2 hover:bg-indigo-900/50 rounded-lg text-indigo-300"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TechCard>
                )}

                {/* Project Overview - Circular Chart Style */}
                {safeConfig.showSubFundChart && (
                    <TechCard className="p-8 flex flex-col relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-4 z-10">
                            <h4 className="text-xl font-bold text-white flex items-center gap-3 font-['PingFang_SC']">
                                <Layers size={24} className="text-indigo-500" />
                                项目大运营
                            </h4>
                            <MoreHorizontal size={24} className="text-slate-600 cursor-pointer hover:text-white transition-colors" />
                        </div>

                        <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 py-6">
                            {/* Decorative rotating rings */}
                            <div className="absolute w-[280px] h-[280px] border border-slate-700/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute w-[240px] h-[240px] border border-indigo-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed"></div>

                            <div className="relative w-52 h-52 flex items-center justify-center mb-8">
                                {/* Main Arc SVG */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none transform scale-100 drop-shadow-2xl">
                                    {/* Track */}
                                    <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="#1e293b" strokeWidth="16" />
                                    {/* Segments */}
                                    {/* Green 85% */}
                                    <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="306 360" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" /> 
                                    {/* Amber 12% - manual offset approx */}
                                    <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="43 360" strokeDashoffset="-315" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]" /> 
                                    {/* Red 3% */}
                                    <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="#f43f5e" strokeWidth="16" strokeDasharray="11 360" strokeDashoffset="-362" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]" /> 
                                </svg>
                                
                                <div className="relative z-10 flex flex-col items-center bg-slate-900/80 rounded-full w-36 h-36 justify-center backdrop-blur-md border border-white/5 shadow-inner">
                                    <span className="text-6xl font-bold text-white block tracking-tighter leading-none font-['PingFang_SC']">{metrics.totalProjects}</span>
                                    <span className="text-sm text-slate-400 font-bold mt-2 block uppercase tracking-widest text-[10px]">Total Projects</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 z-10">
                            <div className="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
                                <span className="text-slate-300 flex items-center gap-3 font-medium font-['PingFang_SC'] text-lg">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>
                                    健康运行
                                </span>
                                <span className="font-bold text-white text-2xl font-['PingFang_SC']">85%</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
                                <span className="text-slate-300 flex items-center gap-3 font-medium font-['PingFang_SC'] text-lg">
                                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]"></span>
                                    利润偏差
                                </span>
                                <span className="font-bold text-white text-2xl font-['PingFang_SC']">12%</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
                                <span className="text-slate-300 flex items-center gap-3 font-medium font-['PingFang_SC'] text-lg">
                                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>
                                    交付风险
                                </span>
                                <span className="font-bold text-white text-2xl font-['PingFang_SC']">3%</span>
                            </div>
                        </div>
                    </TechCard>
                )}
            </div>
        </div>
    );
};

export default OperatingOverviewDashboard;
