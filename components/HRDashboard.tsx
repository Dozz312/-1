
import React, { useState } from 'react';
import { 
    Users, 
    User,
    Smile, 
    Zap, 
    AlertTriangle, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight,
    Search,
    Share2,
    Calendar,
    Briefcase,
    MapPin,
    ArrowRight,
    RotateCcw,
    MessageSquare,
    Clock,
    FileText,
    Sparkles,
    MoreHorizontal,
    ShieldAlert,
    Network,
    Gavel,
    CheckCircle2,
    XCircle,
    Activity
} from 'lucide-react';
import { 
    mockHRTeamInsights, 
    mockSentimentWarnings, 
    mockStrategicBlockages, 
    mockTaskAudits 
} from '../services/mockData';

// --- Components ---

const KPIStatCard = ({ title, value, subtext, trend, icon: Icon, alert = false, safe = false }: any) => (
    <div className={`p-6 rounded-2xl border transition-all ${
        alert ? 'bg-rose-950/20 border-rose-900/50' : 
        safe ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-800'
    }`}>
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-white font-['PingFang_SC']">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${
                alert ? 'bg-rose-500/20 text-rose-500' : 
                safe ? 'bg-emerald-500/20 text-emerald-500' : 
                'bg-slate-800 text-slate-400'
            }`}>
                <Icon size={24} />
            </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
            {trend && (
                <span className={`flex items-center font-bold ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trend > 0 ? <ArrowUpRight size={16}/> : <ArrowDownRight size={16}/>}
                    {Math.abs(trend)}%
                </span>
            )}
            <span className="text-slate-500">{subtext}</span>
        </div>
    </div>
);

const SentimentMismatchCard: React.FC<{ item: any, onInterview: (target: string) => void }> = ({ item, onInterview }) => (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 mb-4 hover:bg-slate-800/60 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-white font-bold text-lg">{item.project}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <User size={14} className="text-slate-500" />
                    <span className="text-slate-400 text-sm">{item.manager}</span>
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-bold mb-1">情绪分 (Sentiment)</div>
                <div className="text-2xl font-black text-rose-500">{item.sentimentScore}</div>
            </div>
        </div>

        <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
                <div className="text-xs text-emerald-400 font-bold mb-1 flex items-center gap-1">
                    <FileText size={12} /> 周报描述 (Reported)
                </div>
                <p className="text-sm text-slate-300 italic">"{item.reportStatus}"</p>
            </div>
            <div className="flex items-center justify-center">
                <AlertTriangle className="text-amber-500 animate-pulse" size={24} />
            </div>
            <div className="flex-1 bg-rose-900/20 border border-rose-500/20 rounded-lg p-3">
                <div className="text-xs text-rose-400 font-bold mb-1 flex items-center gap-1">
                    <MessageSquare size={12} /> 真实情绪 (Detected)
                </div>
                <div className="flex flex-wrap gap-2">
                    {item.detectedKeywords.map((kw: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded text-xs border border-rose-800">
                            {kw}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-3 flex items-start gap-3">
            <Sparkles size={16} className="text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-sm text-indigo-200 flex-1">
                <span className="font-bold">AI 建议：</span>{item.aiAdvice}
            </p>
            <button 
                onClick={() => onInterview(item.manager)}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
            >
                <MessageSquare size={12} />
                一键约谈
            </button>
        </div>
    </div>
);

const BlockageNode: React.FC<{ item: any, onInterview: (target: string) => void }> = ({ item, onInterview }) => (
    <div className="flex items-center gap-4 mb-6 last:mb-0 relative">
        <div className="w-16 flex flex-col items-center gap-1 shrink-0">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-300 font-bold text-xs">
                {item.nodeName.slice(0, 2)}
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">{item.role}</span>
        </div>

        <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 relative group">
            <div className="absolute top-1/2 -left-2 w-2 h-2 bg-slate-700 transform -translate-y-1/2 rotate-45 border-l border-b border-slate-700"></div>
            
            {/* Hover Action */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => onInterview(item.nodeName)}
                    className="px-2 py-1 bg-rose-600 text-white text-[10px] font-bold rounded flex items-center gap-1 hover:bg-rose-500"
                >
                    <MessageSquare size={10} /> 约谈
                </button>
            </div>

            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">原指令</span>
                        <span className="text-sm text-slate-300 line-through decoration-slate-500">{item.originalCommand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs bg-rose-900/50 text-rose-300 px-2 py-0.5 rounded">传达为</span>
                        <span className="text-sm text-white font-bold">"{item.conveyedCommand}"</span>
                    </div>
                </div>
                
                <div className="flex flex-col items-end mr-8">
                    <span className="text-xs text-rose-400 font-bold">语义畸变率</span>
                    <span className="text-2xl font-black text-rose-500">{item.distortionRate}%</span>
                </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-700/50 text-xs text-slate-400 flex gap-2">
                <Activity size={14} className="text-amber-500" />
                <span>影响评估: {item.impact}</span>
            </div>
        </div>
    </div>
);

const TaskAuditRow: React.FC<{ task: any }> = ({ task }) => (
    <div className="flex items-center p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-colors">
        <div className="mr-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                task.auditResult === 'Warning' ? 'border-amber-500 text-amber-500 bg-amber-900/20' : 
                task.auditResult === 'Fail' ? 'border-rose-500 text-rose-500 bg-rose-900/20' : 
                'border-emerald-500 text-emerald-500 bg-emerald-900/20'
            }`}>
                <ShieldAlert size={20} />
            </div>
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-white text-sm">{task.taskTitle}</h4>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                    <User size={10} /> {task.assignee}
                </span>
            </div>
            <p className="text-xs text-slate-300">
                <span className="font-bold text-rose-400">风险提示:</span> {task.riskDescription}
            </p>
        </div>
        <div className="ml-4">
            <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors border border-slate-600">
                复核
            </button>
        </div>
    </div>
);

const HRDashboard = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'audit'>('overview');
    const [toast, setToast] = useState<{show: boolean, msg: string} | null>(null);

    const showToast = (msg: string) => {
        setToast({ show: true, msg });
        setTimeout(() => setToast(null), 3000);
    };

    const handleInterview = (target: string) => {
        showToast(`✅ 已向 [${target}] 发送约谈信息`);
    };

    return (
        <div className="h-full flex flex-col animate-fade-in pb-10 relative">
            
            {/* Toast Notification */}
            {toast && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl border border-emerald-500 flex items-center gap-2 text-sm font-bold animate-fade-in">
                    <CheckCircle2 size={18} />
                    {toast.msg}
                </div>
            )}

            {/* Header / Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        {activeTab === 'overview' ? <Users size={32} className="text-indigo-500" /> : <Gavel size={32} className="text-rose-500" />}
                        {activeTab === 'overview' ? 'HR 洞察总览' : '执行效率'}
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 font-mono">v2.4.1</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        AI 分析完成于 10 分钟前
                    </p>
                </div>
                
                {/* View Switcher */}
                <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <Activity size={16} />
                        常规洞察
                    </button>
                    <button 
                        onClick={() => setActiveTab('audit')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'audit' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <ShieldAlert size={16} />
                        执行效率
                        <span className="bg-white text-rose-600 text-[10px] px-1.5 rounded-full">3</span>
                    </button>
                </div>
            </div>

            {/* --- STRATEGIC AUDIT VIEW --- */}
            {activeTab === 'audit' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                    
                    {/* Column 1: Sentiment Mismatch (Say-Do) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-500">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">知行合一审计</h3>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {mockSentimentWarnings.map(item => (
                                <SentimentMismatchCard key={item.id} item={item} onInterview={handleInterview} />
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Strategic Blockage & Compliance */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        
                        {/* Strategic Blockage */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-500">
                                        <Network size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">经营指令畸变定位</h3>
                                </div>
                                <span className="text-xs bg-rose-900/30 text-rose-400 px-2 py-1 rounded font-bold border border-rose-900/50">
                                    发现 2 个阻断点
                                </span>
                            </div>
                            
                            <div className="relative pl-4 border-l-2 border-slate-800 ml-4 space-y-2">
                                {/* Root Node (CEO) */}
                                <div className="flex items-center gap-4 mb-8 -ml-[25px]">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg border-4 border-[#0B0F19] z-10">
                                        CEO
                                    </div>
                                    <div className="bg-indigo-900/30 text-indigo-200 px-4 py-2 rounded-xl text-sm font-medium border border-indigo-500/20">
                                        战略指令源头 (100% 保真)
                                    </div>
                                </div>

                                {mockStrategicBlockages.map(item => (
                                    <BlockageNode key={item.id} item={item} onInterview={handleInterview} />
                                ))}
                            </div>
                        </div>

                        {/* Task Compliance Audit */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-500">
                                    <CheckCircle2 size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white">关键业务合规复核</h3>
                            </div>
                            
                            <div className="space-y-3">
                                {mockTaskAudits.map(task => (
                                    <TaskAuditRow key={task.id} task={task} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* --- OVERVIEW VIEW (Original Content) --- */}
            {activeTab === 'overview' && (
                <>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <KPIStatCard 
                            title="平均压力评分" 
                            value="62/100" 
                            subtext="较上月" 
                            trend={3} 
                            icon={Zap}
                            alert={false}
                        />
                        <KPIStatCard 
                            title="整体工作满意度" 
                            value="4.2/5" 
                            subtext="较上月" 
                            trend={0.2}
                            icon={Smile}
                            safe={true}
                        />
                        <KPIStatCard 
                            title="离职意愿指数" 
                            value="12%" 
                            subtext="有所改善" 
                            trend={-2} 
                            icon={AlertTriangle}
                            alert={true} 
                        />
                        <KPIStatCard 
                            title="整体工作效率" 
                            value="88%" 
                            subtext="较上月" 
                            trend={1.5}
                            icon={TrendingUp}
                            safe={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left: Feishu Pulse (Insights) */}
                        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                                        <Sparkles size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">飞书智能脉搏 (Feishu Pulse)</h3>
                                        <p className="text-xs text-slate-500">基于沟通数据的定性分析</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-400">测试版</span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {mockHRTeamInsights.map((insight) => (
                                    <div key={insight.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/60 transition-colors">
                                        <div className="flex gap-4">
                                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                                                insight.severity === 'High' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 
                                                insight.severity === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                            }`}></div>
                                            <div className="flex-1">
                                                <h4 className="text-base font-bold text-white mb-2">{insight.title}</h4>
                                                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                                                    {insight.description}
                                                </p>
                                                <div className="flex gap-4 text-xs font-bold">
                                                    <button className="text-indigo-400 hover:text-indigo-300 hover:underline">查看团队详情</button>
                                                    {insight.action && insight.action !== '无' && (
                                                        <button className="text-slate-400 hover:text-slate-300 hover:underline">建议: "{insight.action}"</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-800 relative">
                                <input 
                                    type="text" 
                                    placeholder="向 AI 询问特定团队的情况..." 
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                                />
                                <button className="absolute right-3 top-7 bg-indigo-600 p-1.5 rounded-lg hover:bg-indigo-500 transition-colors text-white">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Right: Smart Alerts */}
                        <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">智能预警</h3>
                                <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {/* Alert 1 */}
                                <div className="p-4 rounded-xl border border-rose-900/30 bg-rose-950/10">
                                    <div className="flex items-start gap-3 mb-2">
                                        <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                                        <h4 className="text-sm font-bold text-rose-200">留存风险：关键人才</h4>
                                    </div>
                                    <p className="text-xs text-rose-200/70 mb-3 leading-relaxed pl-7">
                                        Sarah J. (研发主管) 显示出极高的离职倾向 (85%)。
                                    </p>
                                    <div className="pl-7">
                                        <button className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg text-xs text-slate-300 font-bold transition-colors">
                                            安排 1:1 面谈
                                        </button>
                                    </div>
                                </div>

                                {/* Alert 2 */}
                                <div className="p-4 rounded-xl border border-amber-900/30 bg-amber-950/10">
                                    <div className="flex items-start gap-3 mb-2">
                                        <Clock size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                        <h4 className="text-sm font-bold text-amber-200">绩效考评逾期</h4>
                                    </div>
                                    <p className="text-xs text-amber-200/70 leading-relaxed pl-7">
                                        市场部 Q3 绩效考评已逾期 5 天。
                                    </p>
                                </div>

                                {/* Alert 3 */}
                                <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/30">
                                    <div className="flex items-start gap-3 mb-2">
                                        <FileText size={18} className="text-slate-400 shrink-0 mt-0.5" />
                                        <h4 className="text-sm font-bold text-slate-300">政策需更新</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed pl-7">
                                        新的本地法规影响当前的远程办公政策。
                                    </p>
                                </div>
                            </div>

                            <button className="w-full text-center text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-4">
                                查看所有预警
                            </button>
                        </div>
                    </div>

                    {/* Bottom: Analytics Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 h-[300px]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">离职风险热力图</h3>
                                <MoreHorizontal size={20} className="text-slate-500 cursor-pointer" />
                            </div>
                            {/* Placeholder for Heatmap */}
                            <div className="h-full flex flex-col justify-center items-center text-slate-600 bg-slate-800/30 rounded-xl border border-slate-700/30 border-dashed">
                                <div className="grid grid-cols-4 gap-4 w-full px-8">
                                    <div className="text-xs text-slate-500 font-bold mb-2 col-span-1">部门</div>
                                    <div className="text-xs text-slate-500 font-bold mb-2 text-center col-span-1">低风险</div>
                                    <div className="text-xs text-slate-500 font-bold mb-2 text-center col-span-1">中风险</div>
                                    <div className="text-xs text-slate-500 font-bold mb-2 text-center col-span-1">高风险</div>
                                    
                                    {/* Row 1 */}
                                    <div className="text-sm text-slate-300 font-bold">研发部</div>
                                    <div className="h-8 bg-emerald-900/40 rounded"></div>
                                    <div className="h-8 bg-amber-900/40 rounded"></div>
                                    <div className="h-8 bg-rose-500/60 rounded flex items-center justify-center text-white text-xs font-bold">12人</div>

                                    {/* Row 2 */}
                                    <div className="text-sm text-slate-300 font-bold">市场部</div>
                                    <div className="h-8 bg-emerald-900/40 rounded"></div>
                                    <div className="h-8 bg-amber-500/40 rounded flex items-center justify-center text-white text-xs font-bold">5人</div>
                                    <div className="h-8 bg-rose-900/20 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 h-[300px]">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white">效率 vs. 压力</h3>
                                    <p className="text-xs text-slate-500">产出与压力指标的关联分析</p>
                                </div>
                                <div className="flex gap-2 text-xs">
                                    <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 健康</span>
                                    <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 bg-rose-500 rounded-full"></div> 倦怠</span>
                                </div>
                            </div>
                            {/* Placeholder for Scatter Plot */}
                            <div className="h-full relative bg-slate-800/30 rounded-xl border border-slate-700/30 border-dashed overflow-hidden">
                                {/* Fake Dots */}
                                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full opacity-60"></div>
                                <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-blue-500 rounded-full opacity-80"></div>
                                <div className="absolute top-20 right-20 w-3 h-3 bg-rose-500 rounded-full opacity-80 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse"></div>
                                <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-blue-500 rounded-full opacity-50"></div>
                                <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-40"></div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HRDashboard;
