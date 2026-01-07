
import React, { useState } from 'react';
import { 
    Users, 
    ArrowRightLeft, 
    Briefcase, 
    Lock, 
    AlertTriangle, 
    UserPlus, 
    ShieldAlert, 
    Search,
    Star,
    ArrowUpRight,
    CheckCircle2,
    UserMinus,
    AlertOctagon,
    Sparkles
} from 'lucide-react';
import { 
    mockTalentPool, 
    mockInternalOpenings, 
    mockManagerHoarding 
} from '../services/mockData';
import { TalentPoolItem, InternalOpening } from '../types';

const TalentCard: React.FC<{ 
    person: TalentPoolItem, 
    matchedOpening?: InternalOpening,
    onAction: (action: string, person: TalentPoolItem) => void
}> = ({ 
    person, 
    matchedOpening, 
    onAction 
}) => (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
        {person.flightRisk === 'High' && (
            <div className="absolute top-0 right-0 bg-rose-900/50 text-rose-300 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-rose-500/20 flex items-center gap-1">
                <AlertTriangle size={12} /> 离职高危
            </div>
        )}

        <div className="flex gap-4">
            <div className="relative">
                <img src={person.avatar} alt={person.name} className="w-14 h-14 rounded-full border-2 border-slate-700" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900">
                    {person.performanceRank}
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-white font-bold text-lg">{person.name}</h3>
                <div className="text-slate-400 text-xs flex items-center gap-2 mt-1">
                    <span>{person.currentRole}</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                    <span>{person.currentDept}</span>
                </div>
                <div className="text-slate-500 text-xs mt-1">
                    当前经理: <span className="text-slate-400 font-medium">{person.managerName}</span> (滞留 {person.stagnationMonths} 个月)
                </div>
            </div>
        </div>

        <div className="mt-4 bg-indigo-900/10 border-l-2 border-indigo-500 p-3 rounded-r-lg">
            <p className="text-xs text-indigo-200 leading-relaxed">
                <span className="font-bold text-indigo-400">AI 推荐:</span> {person.aiAnalysis}
            </p>
        </div>

        {matchedOpening && (
            <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">最佳匹配职位</span>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-900/50">98% 匹配</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-indigo-400" />
                        <span className="text-sm font-bold text-slate-200">{matchedOpening.title}</span>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-500" />
                </div>
            </div>
        )}

        <div className="mt-5 flex gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={() => onAction('stealth', person)}
                className="flex-1 py-2 bg-slate-800 hover:bg-indigo-900/30 hover:text-indigo-300 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
                <Lock size={12} />
                隐秘接触
            </button>
            <button 
                onClick={() => onAction('transfer', person)}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
                <ArrowRightLeft size={12} />
                发起调令
            </button>
        </div>
    </div>
);

const HoardingRow = ({ manager }: { manager: any }) => (
    <div className="flex items-center p-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors group">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 border border-slate-700 mr-4 shrink-0">
            {manager.managerName.charAt(0)}
        </div>
        
        <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3">
                <div className="font-bold text-white text-sm">{manager.managerName}</div>
                <div className="text-xs text-slate-500">{manager.dept}</div>
            </div>

            <div className="col-span-2 text-center">
                <div className="text-lg font-bold text-white">{manager.topPerformerCount}</div>
                <div className="text-[10px] text-slate-500 uppercase">Top 人才</div>
            </div>
            <div className="col-span-2 text-center">
                <div className={`text-lg font-bold ${manager.talentExportRate < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {manager.talentExportRate}%
                </div>
                <div className="text-[10px] text-slate-500 uppercase">人才输送率</div>
            </div>
            <div className="col-span-2 text-center">
                <div className={`text-lg font-bold ${manager.avgTopPerformerTenure > 3 ? 'text-amber-500' : 'text-slate-300'}`}>
                    {manager.avgTopPerformerTenure}年
                </div>
                <div className="text-[10px] text-slate-500 uppercase">平均滞留</div>
            </div>

            <div className="col-span-3">
                {manager.hoardingScore > 70 ? (
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold bg-rose-900/20 px-3 py-1.5 rounded-lg border border-rose-900/50">
                        <AlertOctagon size={14} />
                        人才囤积 (Hoarding)
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-900/20 px-3 py-1.5 rounded-lg border border-emerald-900/50">
                        <CheckCircle2 size={14} />
                        良性流动
                    </div>
                )}
            </div>
        </div>
    </div>
);

const TalentMobilityDashboard = () => {
    const [activeTab, setActiveTab] = useState<'Pool' | 'Managers'>('Pool');
    const [toast, setToast] = useState<{show: boolean, msg: string} | null>(null);

    const showToast = (msg: string) => {
        setToast({ show: true, msg });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAction = (type: string, person: TalentPoolItem) => {
        if (type === 'stealth') {
            showToast(`🔒 已向 [${person.name}] 发送隐秘邀约，其直属经理不可见。`);
        } else {
            showToast(`📝 已生成 [${person.name}] 的跨部门调动审批单，等待 CEO 签署。`);
        }
    };

    return (
        <div className="h-full flex flex-col animate-fade-in pb-10 relative">
            
            {toast && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl border border-indigo-500 flex items-center gap-2 text-sm font-bold animate-fade-in">
                    <CheckCircle2 size={18} />
                    {toast.msg}
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <ArrowRightLeft size={32} className="text-emerald-500" />
                        Top Performer List
                    </h2>
                </div>
                
                <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex">
                    <button 
                        onClick={() => setActiveTab('Pool')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'Pool' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <Star size={16} />
                        Top Performer 暗池
                    </button>
                    <button 
                        onClick={() => setActiveTab('Managers')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'Managers' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <UserMinus size={16} />
                        管理者囤积审计
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {activeTab === 'Pool' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                        
                        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>发现 {mockTalentPool.length} 位具备跨界潜力的高绩效人才</span>
                                </div>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
                                    <input type="text" placeholder="搜索技能、姓名..." className="bg-slate-900 border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mockTalentPool.map(person => {
                                        const match = mockInternalOpenings.find(op => op.matchCandidates.includes(person.id));
                                        return (
                                            <TalentCard 
                                                key={person.id} 
                                                person={person} 
                                                matchedOpening={match}
                                                onAction={handleAction}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-amber-500" />
                                    关键岗位缺口 (Critical Gaps)
                                </h3>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                                {mockInternalOpenings.map(op => (
                                    <div key={op.id} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl relative group">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-xl"></div>
                                        <div className="pl-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-slate-200 text-sm">{op.title}</h4>
                                                <span className="text-[10px] bg-rose-900/40 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20 font-bold uppercase">{op.priority}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mb-3">{op.department}</div>
                                            
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {op.requiredSkills.map(skill => (
                                                    <span key={skill} className="px-2 py-0.5 bg-slate-800 border border-slate-600 rounded text-[10px] text-slate-300">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <button className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold rounded-lg border border-indigo-500/30 transition-all">
                                                从暗池匹配人才
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col gap-6">
                        <div className="bg-rose-900/10 border border-rose-900/30 p-6 rounded-2xl flex items-start gap-4">
                            <div className="p-3 bg-rose-900/30 rounded-xl text-rose-400">
                                <ShieldAlert size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">人才流动阻滞预警</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
                                    AI 分析显示，部分部门存在严重的人才囤积行为（Talent Hoarding）。这导致高潜员工因缺乏晋升空间而离职（Flight Risk）。建议对高囤积管理者进行干预。
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex-1 overflow-hidden flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-6">管理者囤积指数审计</h3>
                            
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                                {mockManagerHoarding.map(manager => (
                                    <div key={manager.managerId} className="relative">
                                        <HoardingRow manager={manager} />
                                        <div className="mx-4 mt-1 mb-4 p-3 bg-slate-800/50 border-x border-b border-slate-700/50 rounded-b-xl text-xs text-slate-400 flex gap-3">
                                            <div className="shrink-0 pt-0.5"><Sparkles size={14} className="text-indigo-400" /></div>
                                            <p>{manager.aiVerdict}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TalentMobilityDashboard;
