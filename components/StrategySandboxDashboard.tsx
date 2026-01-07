
import React, { useState, useEffect } from 'react';
import { 
    Layout, 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    TrendingUp, 
    AlertTriangle, 
    CheckCircle2, 
    Clock, 
    ArrowRight, 
    Bot, 
    Cpu, 
    Globe, 
    Zap, 
    RotateCcw, 
    Sliders, 
    BarChart3, 
    FileText, 
    Target, 
    Layers, 
    ShieldAlert, 
    ChevronRight, 
    Play, 
    Save, 
    Map, 
    Activity, 
    X, 
    Sparkles, 
    MessageSquare
} from 'lucide-react';
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ReferenceLine
} from 'recharts';

// --- Mock Types & Data ---

type SimulationStatus = 'Active' | 'Completed' | 'Draft';

interface SimulationProject {
    id: string;
    title: string;
    type: string; // e.g. 'Market Entry', 'Supply Chain'
    status: SimulationStatus;
    updatedAt: string;
    metrics: {
        label: string;
        value: string;
        trend?: number;
        color?: string;
    };
    aiInsight: string;
    riskLevel: 'High' | 'Medium' | 'Low';
}

const mockSimulations: SimulationProject[] = [
    {
        id: 'SIM-2024-081',
        title: '2024 东南亚市场准入策略 (A vs B)',
        type: 'Market Entry',
        status: 'Active',
        updatedAt: '2 小时前',
        metrics: { label: 'AI 预测胜率', value: '72%', color: 'emerald' },
        aiInsight: '考虑到汇率波动，建议增加对越南市场的本地化供应链投入，可提升胜率至 78%。',
        riskLevel: 'Low'
    },
    {
        id: 'SIM-2024-089',
        title: '供应链多元化方案 B (Plan B)',
        type: 'Supply Chain',
        status: 'Active',
        updatedAt: '45 分钟前',
        metrics: { label: '风险指数', value: 'High', color: 'rose' },
        aiInsight: '模拟显示 Q3 可能出现 3 周的断货期。建议启动备用供应商谈判。',
        riskLevel: 'High'
    },
    {
        id: 'SIM-2024-065',
        title: '国内高端市场渗透 (Q4)',
        type: 'Growth',
        status: 'Completed',
        updatedAt: '2024-05-20',
        metrics: { label: 'ROI', value: '14.5%', color: 'blue' },
        aiInsight: '高端产线扩容策略验证成功，建议执行。',
        riskLevel: 'Medium'
    }
];

// Updated Chart Data for the Hangzhou Scenario
const mockResultChartData = [
    { quarter: '24年Q3', planA: 0, planB: 500, baseline: 0 }, // B starts fast (Quick sales)
    { quarter: '24年Q4', planA: 200, planB: 800, baseline: 100 },
    { quarter: '25年Q1', planA: 600, planB: 1200, baseline: 200 },
    { quarter: '25年Q2', planA: 1500, planB: 1500, baseline: 300 }, // A catches up
    { quarter: '25年Q3', planA: 2400, planB: 1800, baseline: 400 },
    { quarter: '25年Q4', planA: 3200, planB: 2000, baseline: 500 }, // A exceeds (High value)
    { quarter: '26年Q1', planA: 3800, planB: 2200, baseline: 600 },
    { quarter: '26年Q2', planA: 4200, planB: 2300, baseline: 700 },
];

// --- Sub-Components ---

const StatusBadge = ({ status }: { status: SimulationStatus }) => {
    const styles = {
        'Active': 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50',
        'Completed': 'bg-slate-800 text-slate-400 border-slate-700',
        'Draft': 'bg-amber-900/30 text-amber-400 border-amber-900/50'
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-bold border ${styles[status]}`}>
            {status === 'Active' ? '进行中' : status === 'Completed' ? '已完成' : '草稿'}
        </span>
    );
};

const MetricCard = ({ label, value, subtext, icon: Icon, alert }: any) => (
    <div className={`bg-slate-900 border ${alert ? 'border-rose-900/50 bg-rose-900/10' : 'border-slate-800'} rounded-2xl p-5 flex items-center justify-between`}>
        <div>
            <div className={`text-xs font-bold mb-1 ${alert ? 'text-rose-400' : 'text-slate-400'}`}>{label}</div>
            <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-white font-['PingFang_SC']">{value}</div>
                {subtext && <div className={`text-xs font-bold ${subtext.includes('+') ? 'text-emerald-400' : 'text-slate-500'}`}>{subtext}</div>}
            </div>
        </div>
        <div className={`p-3 rounded-xl ${alert ? 'bg-rose-900/20 text-rose-500' : 'bg-slate-800 text-slate-400'}`}>
            <Icon size={24} />
        </div>
    </div>
);

// --- Views ---

const OverviewView = ({ onNew, onViewResult }: { onNew: () => void, onViewResult: () => void }) => {
    return (
        <div className="flex flex-col h-full animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        战略推演沙盘 
                        <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-md font-bold">AI Enhanced</span>
                    </h2>
                    <p className="text-slate-400 text-lg mt-2 max-w-3xl">
                        AI驱动的战略资源分配与胜率推演概览。基于实时财务数据与市场情报，量化新业务胜率与风险。
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold border border-slate-700 transition-colors flex items-center gap-2">
                        <RotateCcw size={16} /> 历史记录
                    </button>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold border border-slate-700 transition-colors flex items-center gap-2">
                        <Bot size={16} /> AI 助手洞察
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard 
                    label="活跃推演 (Active)" 
                    value="3" 
                    subtext="↑ 1 新增" 
                    icon={Activity} 
                />
                <MetricCard 
                    label="已完成推演 (Completed)" 
                    value="12" 
                    subtext="本季度" 
                    icon={CheckCircle2} 
                />
                <MetricCard 
                    label="平均预估胜率 (Avg Win Rate)" 
                    value="68%" 
                    subtext="+5% vs 上月" 
                    icon={TrendingUp} 
                />
                <MetricCard 
                    label="高风险预警 (High Risk)" 
                    value="1" 
                    subtext="供应链波动" 
                    icon={AlertTriangle} 
                    alert={true}
                />
            </div>

            {/* Filters & Actions */}
            <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-xl border border-slate-800">
                <div className="flex gap-2">
                    {['全部状态', '进行中 (3)', '已完成', '高优先会'].map((f, i) => (
                        <button key={i} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${i === 0 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                            {f}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 px-2">
                    <button className="text-slate-400 hover:text-white flex items-center gap-1 text-xs font-bold">
                        <Filter size={14} /> 筛选视图
                    </button>
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                {mockSimulations.map(sim => (
                    <div key={sim.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <StatusBadge status={sim.status} />
                                <span className="text-xs text-slate-500 font-mono">ID: {sim.id}</span>
                            </div>
                            <MoreHorizontal size={20} className="text-slate-500 cursor-pointer hover:text-white" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-6 group-hover:text-indigo-300 transition-colors">{sim.title}</h3>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                <div className="text-xs text-slate-500 mb-1">{sim.metrics.label}</div>
                                <div className={`text-2xl font-bold font-['PingFang_SC'] ${sim.riskLevel === 'High' ? 'text-rose-500' : 'text-white'}`}>
                                    {sim.metrics.value}
                                    {sim.metrics.label.includes('胜率') && <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{width: sim.metrics.value}}></div></div>}
                                    {sim.riskLevel === 'High' && <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden"><div className="bg-rose-500 h-full rounded-full" style={{width: '80%'}}></div></div>}
                                </div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                <div className="text-xs text-slate-500 mb-1">预期营收 (Est. Rev)</div>
                                <div className="text-2xl font-bold text-white font-['PingFang_SC']">
                                    {sim.riskLevel === 'High' ? '-15%' : '$45.2M'} 
                                    <span className="text-xs text-slate-500 font-normal ml-1">{sim.riskLevel === 'High' ? '关键原料' : '/年'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4 flex gap-3 mb-4">
                            <Bot size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-indigo-200 leading-relaxed">
                                <span className="font-bold">AI 洞察:</span> {sim.aiInsight}
                            </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock size={12} /> 更新于 {sim.updatedAt}
                            </div>
                            <button 
                                onClick={onViewResult}
                                className="px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all"
                            >
                                {sim.status === 'Completed' ? '查看详情' : '继续推演'} →
                            </button>
                        </div>
                    </div>
                ))}

                {/* Create New Card */}
                <div onClick={onNew} className="bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-slate-900 hover:border-indigo-500 transition-all group min-h-[300px]">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors shadow-lg">
                        <Plus size={32} className="text-slate-400 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">快速启动新推演</h3>
                    <p className="text-slate-500 text-sm text-center">基于当前财务数据或自定义场景<br/>开始新的 AI 推演</p>
                </div>
            </div>
        </div>
    );
};

const NewSimulationView = ({ onBack, onRun }: { onBack: () => void, onRun: () => void }) => {
    const [inputValue, setInputValue] = useState('');
    const [isSimulating, setIsSimulating] = useState(false);

    const handleQuickFill = () => {
        setInputValue('我们在杭州上城区竞得“7号地块”，到底该做“高端大平层（保利润、树标杆）”还是“刚需小户型（保流速、回资金）”？');
    };

    const handleRun = () => {
        if (!inputValue.trim()) return;
        setIsSimulating(true);
        // Simulate thinking time
        setTimeout(() => {
            onRun();
        }, 1500);
    };

    return (
        <div className="h-full flex flex-col animate-fade-in pb-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                    <ChevronRight size={20} className="rotate-180" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-white">新战略推演场景配置</h2>
                    <p className="text-slate-400 text-sm mt-1">自然语言驱动。只需描述您的商业困境，AI 将自动构建参数模型。</p>
                </div>
            </div>

            <div className="flex-1 flex gap-8">
                {/* Left: Input Area */}
                <div className="flex-1 flex flex-col">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex-1 flex flex-col relative overflow-hidden">
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg">
                                <MessageSquare size={20} className="text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white">请输入推演主题</h3>
                        </div>

                        <div className="relative flex-1">
                            <textarea 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="在此输入您的战略难题、背景信息或希望模拟的情景..."
                                className="w-full h-full bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-relaxed"
                            />
                            {/* Quick Action Button inside textarea area if empty - Moved to bottom to avoid overlap */}
                            {!inputValue && (
                                <div className="absolute bottom-8 left-6 right-6">
                                    <p className="text-sm text-slate-400 mb-3">您可以尝试以下场景：</p>
                                    <div className="flex flex-wrap gap-3">
                                        <button 
                                            onClick={handleQuickFill}
                                            className="px-4 py-2 bg-slate-800 hover:bg-indigo-900/30 border border-slate-700 hover:border-indigo-500/50 rounded-lg text-sm text-indigo-300 transition-all text-left"
                                        >
                                            🏢 杭州上城区 7号地块：大平层 vs 小户型？
                                        </button>
                                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-400 transition-all text-left cursor-not-allowed opacity-60">
                                            💰 债务重组方案 A vs B 对比
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={handleRun}
                                disabled={!inputValue.trim() || isSimulating}
                                className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-900/30 transition-all ${isSimulating ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {isSimulating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        AI 正在构建模型...
                                    </>
                                ) : (
                                    <>
                                        <Bot size={20} />
                                        开始推演
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Status Panel */}
                <div className="w-80 flex flex-col gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-600 rounded-lg shadow-lg">
                                <Cpu size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">沙盘引擎就绪</h3>
                                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> System Online
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase">AI 能力挂载</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                        <span>宏观经济数据库 (2024 Q3)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                        <span>周边竞品情报网</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                        <span>内部财务测算模型 v4.0</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">预估输出</h4>
                                <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                                    <li>全周期现金流预测曲线</li>
                                    <li>净利率与IRR敏感性分析</li>
                                    <li>主要风险点雷达图</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="text-center text-[10px] text-slate-600 mt-4">
                            Powered by Enterprise Strategy GPT-4
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResultView = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="h-full flex flex-col animate-fade-in pb-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                        <ChevronRight size={20} className="rotate-180" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            杭州上城区“7号地块”开发策略推演 
                            <span className="text-xs bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 px-2 py-1 rounded font-bold">AI 生成</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                            推演场景: <span className="text-white">高端大平层 (树标杆) vs. 刚需小户型 (保流速)</span> 
                            <span className="text-slate-600">|</span>
                            模拟时间: 刚刚
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold border border-slate-700 transition-colors flex items-center gap-2">
                        <RotateCcw size={16} /> 历史记录
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg transition-colors flex items-center gap-2">
                        <Plus size={16} /> 新建推演
                    </button>
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Option A: High End */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <div className="text-sm font-bold text-indigo-300 mb-1">方案 A：高端大平层</div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <div className="text-4xl font-black text-white font-['PingFang_SC']">¥32亿</div>
                        <span className="text-xs font-bold text-slate-400">总货值</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="bg-emerald-900/30 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900/50 font-bold">净利率 18%</span>
                        <span className="text-rose-400">流速慢</span>
                    </div>
                    <div className="absolute top-4 right-4 text-indigo-500 opacity-20"><Target size={40} /></div>
                </div>

                {/* Option B: Mass Market */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-600 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-500"></div>
                    <div className="text-sm font-bold text-slate-300 mb-1">方案 B：刚需小户型</div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <div className="text-4xl font-black text-white font-['PingFang_SC']">¥24亿</div>
                        <span className="text-xs font-bold text-slate-400">总货值</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="bg-amber-900/30 text-amber-400 px-1.5 py-0.5 rounded border border-amber-900/50 font-bold">净利率 8%</span>
                        <span className="text-emerald-400">流速快</span>
                    </div>
                    <div className="absolute top-4 right-4 text-slate-500 opacity-20"><TrendingUp size={40} /></div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-sm font-bold text-slate-400 mb-1">推荐方案胜率 (A)</div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <div className="text-4xl font-black text-white font-['PingFang_SC']">65%</div>
                        <span className="text-xs font-bold text-slate-500">风险调整后</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    <div className="absolute top-4 right-4 text-indigo-500 opacity-20"><Activity size={40} /></div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-sm font-bold text-slate-400 mb-1">市场波动风险</div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <div className="text-4xl font-black text-white font-['PingFang_SC']">高 (High)</div>
                        <span className="text-xs text-slate-500">政策敏感度</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                        <div className="bg-rose-500 h-1.5 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <div className="absolute top-4 right-4 text-rose-500 opacity-20"><AlertTriangle size={40} /></div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex gap-8">
                
                {/* Left: Charts */}
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white">累计营收预测曲线 (Revenue Forecast)</h3>
                            <p className="text-slate-400 text-sm">对比分析：方案A (高利润) vs 方案B (高周转)</p>
                        </div>
                        <div className="bg-slate-800 p-1 rounded-lg flex text-xs font-bold">
                            <button className="px-3 py-1.5 bg-slate-700 text-white rounded shadow-sm">累计营收</button>
                            <button className="px-3 py-1.5 text-slate-400 hover:text-white">现金流净额</button>
                            <button className="px-3 py-1.5 text-slate-400 hover:text-white">IRR</button>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockResultChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPlanA" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorPlanB" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="quarter" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} itemStyle={{ color: '#e2e8f0' }}/>
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                
                                <Area type="monotone" name="方案A (高端大平层)" dataKey="planA" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPlanA)" />
                                <Area type="monotone" name="方案B (刚需小户型)" dataKey="planB" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                                
                                {/* Annotation Line Example - Increased Margin to avoid clipping */}
                                <ReferenceLine x="25年Q2" stroke="#10b981" strokeDasharray="3 3" label={{ value: 'A方案营收反超点', fill: '#10b981', fontSize: 10, position: 'top' }} />
                            </AreaChart>
                        </ResponsiveContainer>

                        {/* Floating Tooltip Mock */}
                        <div className="absolute top-1/4 left-[60%] bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-slate-700 shadow-xl pointer-events-none">
                            <div className="text-xs font-bold text-emerald-400 mb-1">价值释放期 (25年Q3)</div>
                            <div className="text-white font-bold text-lg">方案A 爆发</div>
                            <div className="text-xs text-slate-400">大户型溢价兑现</div>
                        </div>
                    </div>
                </div>

                {/* Right: Controls */}
                <div className="w-80 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Sliders size={18} /> 敏感性测试
                    </h3>
                    
                    <div className="space-y-8 flex-1">
                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                <span>限价政策 (Price Cap)</span>
                                <span className="text-indigo-400">放松 10%</span>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" min="0" max="20" defaultValue="10" />
                            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                                <span>严格限价</span>
                                <span>完全放开</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                <span>建安成本 (Construction Cost)</span>
                                <span className="text-indigo-400">¥6000/㎡</span>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" min="3000" max="10000" defaultValue="6000" />
                            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                                <span>¥3000</span>
                                <span>¥10000</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                <span>去化速度 (Sales Velocity)</span>
                                <span className="text-indigo-400">中性</span>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" min="1" max="3" defaultValue="2" />
                            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                                <span>悲观</span>
                                <span>乐观</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-slate-300">考虑车位滞销风险?</span>
                                <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30 transition-all">
                            <RotateCcw size={18} />
                            重新运行模拟
                        </button>
                        <p className="text-[10px] text-slate-500 text-center mt-2">预计计算时间: ~15秒</p>
                    </div>
                </div>
            </div>

            {/* Bottom: Analysis Report */}
            <div className="mt-8 relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">AI 决策建议报告</h3>
                        <p className="text-xs text-slate-400">基于周边竞品（滨江、绿城）去化数据与板块库存深度分析。</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
                        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <div className="p-1 bg-blue-500/20 text-blue-400 rounded"><Bot size={14}/></div>
                            逻辑推演链
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            上城区目前刚需小户型库存积压严重（去化周期 18个月），而高品质改善型大平层稀缺。方案A虽然前期投入大、回款慢，但能避开红海竞争，且符合集团“产品力”战略定位。
                        </p>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
                        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded"><Target size={14}/></div>
                            关键决策点
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            若集团现金流能支撑 <span className="text-white font-bold">12个月以上</span> 的开发周期，强烈建议选择 <span className="text-indigo-400 font-bold">方案A (高端大平层)</span>。利润总额高出 8亿，且能提升品牌溢价。
                        </p>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
                        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <div className="p-1 bg-amber-500/20 text-amber-400 rounded"><FileText size={14}/></div>
                            前提假设
                        </h4>
                        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                            <li>限价政策不会大幅收紧，允许精装溢价。</li>
                            <li>原材料成本波动在 5% 以内。</li>
                            <li>周边无新增同类高端竞品地块出让。</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                    <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldAlert size={18} className="text-rose-500" />
                        核心风险提示
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-slate-300 font-bold">政策限价风险 (针对高端盘)</span>
                                <span className="text-xs text-rose-500 font-bold">高 (High)</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full">
                                <div className="bg-rose-500 h-1.5 rounded-full" style={{width: '90%'}}></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">若限价严格执行，方案A的利润空间将被严重压缩，优势丧失。</p>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-slate-300 font-bold">市场下行风险 (针对刚需盘)</span>
                                <span className="text-xs text-amber-500 font-bold">中 (Moderate)</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '50%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StrategySandboxDashboard = () => {
    const [view, setView] = useState<'overview' | 'new' | 'result'>('overview');

    return (
        <div className="h-full">
            {view === 'overview' && <OverviewView onNew={() => setView('new')} onViewResult={() => setView('result')} />}
            {view === 'new' && <NewSimulationView onBack={() => setView('overview')} onRun={() => setView('result')} />}
            {view === 'result' && <ResultView onBack={() => setView('overview')} />}
        </div>
    );
};

export default StrategySandboxDashboard;
