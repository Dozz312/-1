
import React, { useState, useEffect } from 'react';
import { AIComponentItem, AIComponentType, AIContext } from '../types';
import ChatAssistant from './ChatAssistant';
import { 
    X, 
    Maximize2, 
    MoreHorizontal, 
    GripVertical, 
    Pin, 
    TrendingUp, 
    DollarSign, 
    AlertTriangle,
    Calendar,
    Users,
    Activity,
    GitCommit,
    Briefcase,
    FileText,
    CheckCircle2,
    Clock,
    ArrowRight,
    MessageCircle,
    Send,
    User,
    Check,
    Bot,
    Sparkles
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// --- Mock Components for AI Generation (Matters) ---

const GeneratedRevenueChart = () => {
    const data = [
        { name: 'Q1', actual: 120, target: 100 },
        { name: 'Q2', actual: 132, target: 130 },
        { name: 'Q3', actual: 101, target: 140 },
        { name: 'Q4 (Pred)', actual: 180, target: 200 },
    ];
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-between items-end mb-4 px-2">
                <div>
                    <span className="text-slate-400 text-sm">年度达成率</span>
                    <div className="text-3xl font-bold text-white font-['PingFang_SC']">85%</div>
                </div>
                <div className="text-right">
                    <span className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                        <TrendingUp size={14} /> +12.5% YoY
                    </span>
                </div>
            </div>
            <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} name="实际/预测" />
                        <Bar dataKey="target" fill="#475569" radius={[4, 4, 0, 0]} name="目标" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const GeneratedRiskCard = () => (
    <div className="h-full flex flex-col gap-3">
        <div className="p-3 bg-rose-900/20 border border-rose-900/50 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={18} />
            <div>
                <h4 className="text-rose-400 font-bold text-sm">合规红线警报</h4>
                <p className="text-slate-300 text-xs mt-1">海外数据出境评估未完成，距截止日仅剩 5 天。</p>
            </div>
        </div>
        <div className="p-3 bg-amber-900/20 border border-amber-900/50 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <div>
                <h4 className="text-amber-400 font-bold text-sm">财务回款风险</h4>
                <p className="text-slate-300 text-xs mt-1">Acme 集团 $4.5M 尾款已逾期 90 天。</p>
            </div>
        </div>
    </div>
);

const GeneratedScheduleCard = () => (
    <div className="h-full flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
         {[
             { time: '14:30', title: '产品战略复盘会', loc: '10F 创意空间' },
             { time: '16:00', title: 'Q4 预算调整审批', loc: '线上会议' },
             { time: '18:00', title: '网球课', loc: '朝阳公园' }
         ].map((item, i) => (
             <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                 <div className="text-sm font-bold text-indigo-400 w-12">{item.time}</div>
                 <div className="flex-1">
                     <div className="text-slate-200 text-sm font-bold">{item.title}</div>
                     <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                         <Users size={10} /> {item.loc}
                     </div>
                 </div>
             </div>
         ))}
    </div>
);

const GeneratedProjectFlowchart = () => {
    // State for interactive features
    const [selectedStep, setSelectedStep] = useState<number | null>(null);
    const [activeContactUser, setActiveContactUser] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    
    // Draft Modal State
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [draftContent, setDraftContent] = useState('');

    // Updated Data for Fund Investment Lifecycle
    const steps = [
        { 
            id: 1, 
            title: '项目立项', 
            status: 'completed', 
            date: '2024-09-01',
            logs: [
                { user: '投资总监', action: '接触目标公司 CEO', time: '09-01 14:00' },
                { user: '分析师', action: '完成初步行业研究报告', time: '09-02 09:30' }
            ]
        },
        { 
            id: 2, 
            title: '尽职调查 (DD)', 
            status: 'completed', 
            date: '2024-09-20',
            logs: [
                { user: '法务', action: '法律尽调完成', time: '09-15 10:00' },
                { user: '财务', action: '财务审计报告定稿', time: '09-18 16:00' },
                { user: '投资经理', action: '提交最终立项报告', time: '09-20 11:00' }
            ]
        },
        { 
            id: 3, 
            title: '投决会 (IC)', 
            status: 'completed', 
            date: '2024-10-15',
            logs: [
                { user: 'IC 秘书', action: '发起投决会会议邀约', time: '10-01 09:00' },
                { user: '合伙人', action: '投决会表决通过', time: '10-15 17:00' }
            ]
        },
        { 
            id: 4, 
            title: '协议签署 (SPA)', 
            status: 'completed', 
            date: '2024-11-10',
            logs: [
                { user: '法务总监', action: 'SPA/SHA 协议终审', time: '11-01 10:00' },
                { user: 'CEO', action: '签署投资协议', time: '11-10 09:00' }
            ]
        },
        { 
            id: 5, 
            title: '资金交割', 
            status: 'completed', 
            date: '2024-11-30',
            logs: [
                { user: '托管行', action: '发出指令', time: '11-28 11:00' },
                { user: '财务总监', action: '确认打款凭证', time: '11-30 15:00' }
            ]
        },
        { 
            id: 6, 
            title: '投后管理', 
            status: 'current', 
            date: '进行中',
            logs: [
                { user: '投后团队', action: '召开首次投后股东会', time: '12-05 09:00' },
                { user: '董事', action: '确认年度经营预算', time: 'Today 10:20' }
            ]
        },
        { 
            id: 7, 
            title: '退出/清算', 
            status: 'pending', 
            date: '预计 2028',
            logs: []
        }
    ];

    const handleStepClick = (stepId: number) => {
        setSelectedStep(selectedStep === stepId ? null : stepId);
        setActiveContactUser(null); // Close menu on step change
    };

    const handleUserClick = (e: React.MouseEvent, user: string) => {
        e.stopPropagation();
        if (user === '投后团队') {
            setDraftContent(`【工作询问】\n\n投后团队：\n\n关于刚刚召开的“首次投后股东会”，我想了解以下几点：\n1. 核心决议事项的落实进度；\n2. 管理层对我们提出的年度预算调整建议有无异议；\n3. 是否需要母基金层面提供额外的产业资源支持。\n\n请尽快整理简报回复。`);
            setShowDraftModal(true);
        } else {
            setActiveContactUser(activeContactUser === user ? null : user);
        }
    };

    const handleAction = (action: string, user: string) => {
        setToast(`已${action}: ${user}`);
        setActiveContactUser(null);
        setTimeout(() => setToast(null), 3000);
    };

    const handleSendDraft = () => {
        setShowDraftModal(false);
        setToast('✅ 消息已发送。若负责人回复，Eva 将第一时间通知您。');
        setTimeout(() => setToast(null), 4000);
    };

    return (
        <div className="h-full w-full flex flex-col px-2 py-2 relative">
            
            {/* Draft Modal */}
            {showDraftModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowDraftModal(false)}>
                    <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl w-[90%] shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-indigo-900/20">
                            <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                                <Bot size={18} className="text-indigo-400" />
                                AI 起草：追问投后进展
                            </h3>
                            <button onClick={() => setShowDraftModal(false)} className="text-slate-500 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <textarea 
                                value={draftContent}
                                onChange={(e) => setDraftContent(e.target.value)}
                                className="w-full h-40 bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
                            />
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowDraftModal(false)}
                                    className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm font-bold transition-colors"
                                >
                                    取消
                                </button>
                                <button 
                                    onClick={handleSendDraft}
                                    className="flex-1 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Send size={14} />
                                    确认发送
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h3 className="text-white font-bold text-lg">基金直投项目全流程</h3>
                    <p className="text-xs text-slate-500">当前阶段：投后管理</p>
                </div>
                <div className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 flex items-center gap-1">
                    <Activity size={12} />
                    进行中
                </div>
            </div>
            
            {/* Flowchart Content */}
            <div className="flex-1 relative flex flex-col overflow-y-auto custom-scrollbar pr-2">
                {/* Connecting Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-700/50 z-0"></div>

                <div className="space-y-4 z-10 pb-4">
                    {steps.map((step) => {
                        const isCompleted = step.status === 'completed';
                        const isCurrent = step.status === 'current';
                        const isSelected = selectedStep === step.id;
                        
                        return (
                            <div key={step.id} className={`group ${step.status === 'pending' ? 'opacity-60' : ''}`}>
                                <div 
                                    onClick={() => handleStepClick(step.id)}
                                    className={`relative flex items-center gap-4 cursor-pointer p-2 rounded-xl transition-all ${isSelected ? 'bg-slate-800/80 border border-slate-700' : 'hover:bg-slate-800/40 border border-transparent'}`}
                                >
                                    {/* Status Node */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-all ${
                                        isCompleted ? 'bg-emerald-900/50 border-emerald-500 text-emerald-500' :
                                        isCurrent ? 'bg-indigo-900/50 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110' :
                                        'bg-slate-800 border-slate-600 text-slate-500'
                                    }`}>
                                        {isCompleted ? <CheckCircle2 size={20} /> : 
                                         isCurrent ? <Activity size={20} className="animate-pulse" /> : 
                                         <Clock size={20} />}
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h4 className={`text-sm font-bold ${isCurrent ? 'text-indigo-200' : 'text-slate-300'}`}>
                                                {step.title}
                                            </h4>
                                            <span className="text-[10px] text-slate-500 font-mono">{step.date}</span>
                                        </div>
                                        {isCurrent && (
                                            <div className="text-[10px] text-indigo-400 mt-1 flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                                                正在处理中...
                                            </div>
                                        )}
                                        
                                        {/* Collapsed Preview (if not selected) */}
                                        {!isSelected && step.logs.length > 0 && (
                                            <div className="text-[10px] text-slate-500 mt-1 truncate">
                                                最近: {step.logs[step.logs.length - 1].action}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="text-slate-600">
                                        <ArrowRight size={16} className={`transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
                                    </div>
                                </div>

                                {/* Expanded Logs Details */}
                                {isSelected && step.logs.length > 0 && (
                                    <div className="ml-16 mt-2 space-y-2 animate-fade-in mb-4">
                                        {step.logs.map((log, lIdx) => (
                                            <div key={lIdx} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50 flex items-start gap-3 relative">
                                                <div className="mt-0.5">
                                                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                                                        {log.user.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className="relative group/name">
                                                            <span 
                                                                onClick={(e) => handleUserClick(e, log.user)}
                                                                className={`text-xs font-bold cursor-pointer hover:underline underline-offset-2 decoration-indigo-500/50 ${activeContactUser === log.user ? 'text-indigo-400' : 'text-slate-300'}`}
                                                            >
                                                                {log.user}
                                                            </span>
                                                            
                                                            {/* Enhanced Tooltip */}
                                                            {log.user === '投后团队' ? (
                                                                <div className="absolute bottom-full left-0 mb-1 hidden group-hover/name:block whitespace-nowrap bg-indigo-600 text-white text-[10px] px-2 py-1 rounded pointer-events-none z-20 font-bold shadow-lg">
                                                                    ✨ 点击让 AI 帮您追问详情
                                                                </div>
                                                            ) : (
                                                                <div className="absolute bottom-full left-0 mb-1 hidden group-hover/name:block whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded pointer-events-none z-20">
                                                                    和负责人沟通此事件
                                                                </div>
                                                            )}

                                                            {/* Contact Menu Popover (Only for non-special users) */}
                                                            {activeContactUser === log.user && log.user !== '投后团队' && (
                                                                <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-30 p-1 flex gap-1 animate-fade-in min-w-[120px]">
                                                                    <button onClick={() => handleAction('发送微信', log.user)} className="p-2 hover:bg-slate-700 rounded-lg text-emerald-400 transition-colors" title="微信">
                                                                        <MessageCircle size={16} />
                                                                    </button>
                                                                    <button onClick={() => handleAction('发送飞书', log.user)} className="p-2 hover:bg-slate-700 rounded-lg text-blue-400 transition-colors" title="飞书">
                                                                        <Send size={16} />
                                                                    </button>
                                                                    <button onClick={() => handleAction('发起邀约', log.user)} className="p-2 hover:bg-slate-700 rounded-lg text-amber-400 transition-colors" title="约会">
                                                                        <Calendar size={16} />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-slate-500">{log.time}</span>
                                                    </div>
                                                    <div className="text-xs text-slate-400">{log.action}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {isSelected && step.logs.length === 0 && (
                                    <div className="ml-16 mt-2 text-xs text-slate-600 italic py-2">
                                        暂无详细日志记录
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-fade-in z-50 whitespace-nowrap">
                    {toast.includes('Eva') ? <Sparkles size={14} className="text-indigo-400" /> : <CheckCircle2 size={14} className="text-emerald-400" />}
                    {toast}
                </div>
            )}
        </div>
    );
};

// --- Mock Components for AI Generation (People) ---

const GeneratedHeadcountChart = () => {
    const data = [
        { name: '研发中心', value: 450, color: '#6366f1' },
        { name: '销售与市场', value: 200, color: '#10b981' },
        { name: '产品与设计', value: 80, color: '#f59e0b' },
        { name: '职能部门', value: 50, color: '#64748b' },
    ];
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-between items-center mb-2 px-2">
                <div className="text-3xl font-bold text-white font-['PingFang_SC']">780 <span className="text-sm text-slate-400">总人数</span></div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-900/30 px-2 py-1 rounded border border-emerald-900/50">
                   +5% MoM
                </span>
            </div>
            <div className="flex-1 flex items-center">
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 flex flex-col gap-2 text-xs">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                            <span className="text-slate-400">{item.name}</span>
                            <span className="text-white font-bold ml-auto">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const GeneratedWorkloadCard = () => (
    <div className="h-full flex flex-col justify-between">
        <div className="flex items-center gap-4 mb-2">
            <img src="https://i.pravatar.cc/150?u=qi_zhenghao_pm" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-rose-500" />
            <div>
                <h3 className="text-lg font-bold text-white">祁钲皓</h3>
                <p className="text-xs text-slate-400">产品经理 | ToB&G部门</p>
            </div>
            <div className="ml-auto text-right">
                <div className="text-2xl font-bold text-rose-500">120%</div>
                <div className="text-xs text-rose-400 font-bold bg-rose-900/30 px-1.5 py-0.5 rounded">严重过载</div>
            </div>
        </div>
        
        <div className="space-y-3 mt-2">
            <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                    <span>当前负荷</span>
                    <span className="text-rose-400">60h / 40h</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full w-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs font-bold text-slate-500 mb-2 uppercase">关键阻塞任务</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <FileText size={14} className="text-rose-500" />
                        <span>ToB 业务中台 PRD 评审延期</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Activity size={14} className="text-amber-500" />
                        <span>G 端大客户需求方案待确认</span>
                    </div>
                </div>
            </div>
        </div>
        
        <button className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors">
            协调资源支持
        </button>
    </div>
);

const GeneratedOrgChart = () => (
    <div className="h-full flex flex-col items-center justify-center gap-4 relative">
        <div className="absolute inset-0 border border-slate-700/30 rounded-xl" style={{backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3}}></div>
        
        {/* Level 1 */}
        <div className="p-3 bg-indigo-900/40 border border-indigo-500/50 rounded-xl flex items-center gap-3 w-48 shadow-lg relative z-10">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">CEO</div>
            <div>
                <div className="text-sm font-bold text-white">李开复</div>
                <div className="text-xs text-indigo-300">首席执行官</div>
            </div>
        </div>
        
        <div className="h-6 w-px bg-slate-600"></div>
        
        {/* Level 2 */}
        <div className="flex gap-4 relative z-10">
            <div className="flex flex-col items-center">
                <div className="w-full h-px bg-slate-600 mb-2"></div>
                <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg w-28 text-center">
                    <div className="text-xs font-bold text-slate-200">CTO</div>
                    <div className="text-[10px] text-slate-500">张总</div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full h-px bg-slate-600 mb-2"></div>
                <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg w-28 text-center">
                    <div className="text-xs font-bold text-slate-200">CFO</div>
                    <div className="text-[10px] text-slate-500">陈总</div>
                </div>
            </div>
             <div className="flex flex-col items-center">
                <div className="w-full h-px bg-slate-600 mb-2"></div>
                <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg w-28 text-center">
                    <div className="text-xs font-bold text-slate-200">COO</div>
                    <div className="text-[10px] text-slate-500">王总</div>
                </div>
            </div>
        </div>
    </div>
);


// --- Main Canvas Component ---

interface AIDashboardProps {
    context?: AIContext;
}

const AIDashboard: React.FC<AIDashboardProps> = ({ context = 'matters' }) => {
    const [components, setComponents] = useState<AIComponentItem[]>([]);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Reset components when context changes
    useEffect(() => {
        setComponents([]);
    }, [context]);

    const addComponent = (type: AIComponentType, title: string) => {
        const newComp: AIComponentItem = {
            id: `comp_${Date.now()}`,
            type,
            title,
            x: 50 + (components.length * 40), // Staggered spawn
            y: 50 + (components.length * 40),
            w: 400,
            h: type === 'ProjectFlowchart' ? 500 : 300 // Taller default height for flowchart
        };
        setComponents([...components, newComp]);
    };

    const removeComponent = (id: string) => {
        setComponents(components.filter(c => c.id !== id));
    };

    // --- Drag Logic for Components ---
    const handleMouseDown = (e: React.MouseEvent, id: string, x: number, y: number) => {
        setDraggedItem(id);
        setDragOffset({
            x: e.clientX - x,
            y: e.clientY - y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (draggedItem) {
            setComponents(components.map(c => {
                if (c.id === draggedItem) {
                    return {
                        ...c,
                        x: e.clientX - dragOffset.x,
                        y: e.clientY - dragOffset.y
                    };
                }
                return c;
            }));
        }
    };

    const handleMouseUp = () => {
        setDraggedItem(null);
    };

    const renderComponentContent = (type: AIComponentType) => {
        switch(type) {
            // Matters
            case 'RevenueChart': return <GeneratedRevenueChart />;
            case 'RiskCard': return <GeneratedRiskCard />;
            case 'ScheduleCard': return <GeneratedScheduleCard />;
            case 'ProjectFlowchart': return <GeneratedProjectFlowchart />;
            // People
            case 'HeadcountChart': return <GeneratedHeadcountChart />;
            case 'WorkloadCard': return <GeneratedWorkloadCard />;
            case 'OrgChart': return <GeneratedOrgChart />;
            default: return <div className="text-slate-500">Content loading...</div>;
        }
    };

    return (
        <div 
            className="relative w-full h-full bg-[#0B0F19] overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                 }}>
            </div>

            {/* Context Label (Watermark) */}
            <div className="absolute top-4 left-6 pointer-events-none opacity-20">
                <h1 className="text-6xl font-black text-slate-700 uppercase tracking-widest">
                    {context === 'people' ? 'PEOPLE' : 'MATTERS'}
                </h1>
            </div>

            {/* Dynamic Components */}
            {components.map((comp) => (
                <div
                    key={comp.id}
                    style={{
                        left: comp.x,
                        top: comp.y,
                        width: comp.w,
                        height: comp.h,
                        position: 'absolute'
                    }}
                    className={`bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl flex flex-col transition-shadow ${
                        draggedItem === comp.id ? 'shadow-indigo-500/20 z-50 cursor-grabbing' : 'z-10'
                    }`}
                >
                    {/* Component Header */}
                    <div 
                        onMouseDown={(e) => handleMouseDown(e, comp.id, comp.x, comp.y)}
                        className="p-4 border-b border-slate-700/50 flex justify-between items-center cursor-grab active:cursor-grabbing bg-slate-800/50 rounded-t-2xl"
                    >
                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <GripVertical size={16} className="text-slate-500" />
                            {comp.title}
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="text-slate-400 hover:text-indigo-400 p-1"><Pin size={14} /></button>
                            <button onClick={() => removeComponent(comp.id)} className="text-slate-400 hover:text-rose-400 p-1"><X size={14} /></button>
                        </div>
                    </div>
                    
                    {/* Component Body */}
                    <div className="flex-1 p-4 overflow-hidden relative">
                        {renderComponentContent(comp.type)}
                    </div>
                </div>
            ))}

            {/* Chat Assistant handles the "Hero" empty state internally */}
            <ChatAssistant 
                mode="AI"
                context={context}
                initialPosition="center" 
                onGenerateComponent={addComponent} 
            />
        </div>
    );
};

export default AIDashboard;
