
import React, { useState } from 'react';
import { 
    Search, 
    Share2, 
    Zap, 
    ArrowRight, 
    AlertTriangle, 
    CheckCircle2, 
    Clock, 
    Link,
    Network,
    Users,
    Filter,
    Layers,
    Trophy,
    ExternalLink,
    Building2,
    Briefcase,
    Sparkles,
    Globe
} from 'lucide-react';
import { 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Cell,
    CartesianGrid
} from 'recharts';
import { 
    mockSynergyNodes, 
    mockSynergyLinks, 
    mockSynergyOpportunities, 
    mockCollaborationActions, 
    mockGPSynergyScores,
    mockExternalOpportunities
} from '../services/mockData';
import { SynergyOpportunity, CollaborationAction, ExternalOpportunity } from '../types';

// --- Sub-Components ---

const SynergyMapVisual: React.FC = () => {
    // A simplified visual representation of nodes and links using SVG
    // In a real app, use D3.js or React-Flow
    return (
        <div className="relative w-full h-full bg-slate-900 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/50 to-slate-900 pointer-events-none"></div>
            
            <svg className="w-full h-full">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" opacity="0.5" />
                    </marker>
                </defs>
                {mockSynergyLinks.map((link, i) => {
                    const source = mockSynergyNodes.find(n => n.id === link.source);
                    const target = mockSynergyNodes.find(n => n.id === link.target);
                    if (!source || !target) return null;
                    return (
                        <line 
                            key={i}
                            x1={`${source.x}%`} y1={`${source.y}%`}
                            x2={`${target.x}%`} y2={`${target.y}%`}
                            stroke={link.isActive ? '#10b981' : '#6366f1'} 
                            strokeWidth={link.strength * 2}
                            strokeDasharray={link.isActive ? '' : '5,5'}
                            opacity={0.4}
                            markerEnd="url(#arrowhead)"
                        />
                    );
                })}
                {mockSynergyNodes.map((node, i) => (
                    <g key={i} className="cursor-pointer hover:opacity-80 transition-opacity group/node">
                        <circle 
                            cx={`${node.x}%`} cy={`${node.y}%`} 
                            r={node.valuation / 10 + 4} 
                            fill="#1e293b" 
                            stroke={
                                node.sector.includes('Residential') ? '#6366f1' : 
                                node.sector.includes('Commercial') ? '#ec4899' : 
                                node.sector.includes('Renewal') ? '#f59e0b' : '#10b981'
                            }
                            strokeWidth="2"
                        />
                        <text x={`${node.x}%`} y={`${node.y + 8}%`} textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                            {node.name}
                        </text>
                        {/* Tooltip via SVG Group title or custom overlay needed for better UX, using title for simplicity */}
                        <title>{node.name} ({node.subFundName})</title>
                    </g>
                ))}
            </svg>

            {/* Legend */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur p-3 rounded-xl border border-slate-700 text-xs text-slate-400 space-y-2">
                <div className="font-bold text-white mb-1">业态类型</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> 住宅开发</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-500"></span> 商业运营</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 城市更新</div>
                <div className="mt-2 border-t border-slate-700 pt-2">
                    <div className="flex items-center gap-2"><span className="w-8 h-0.5 bg-emerald-500"></span> 已协同</div>
                    <div className="flex items-center gap-2"><span className="w-8 h-0.5 bg-indigo-500 border-dashed border-b border-indigo-500"></span> 潜在机会</div>
                </div>
            </div>
        </div>
    );
};

const OpportunityCard: React.FC<{ opp: SynergyOpportunity }> = ({ opp }) => (
    <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500/50 transition-all group relative overflow-hidden flex flex-col h-full">
        {opp.priority === 'High' && <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>}
        
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${
                    opp.synergyType === 'SupplyChain' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50' :
                    opp.synergyType === 'Tech' ? 'bg-blue-900/30 text-blue-400 border-blue-900/50' :
                    'bg-amber-900/30 text-amber-400 border-amber-900/50'
                }`}>
                    {opp.synergyType === 'SupplyChain' ? '供应链' : opp.synergyType === 'Tech' ? '商业赋能' : '客户共享'}
                </span>
                {opp.isCrossFund && (
                    <span className="px-2 py-1 rounded text-xs font-bold bg-purple-900/30 text-purple-400 border border-purple-900/50 flex items-center gap-1">
                        <Share2 size={10} /> 跨板块协同
                    </span>
                )}
            </div>
            <span className="text-slate-500 text-xs font-mono">ID: {opp.id}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
            <div className="font-bold text-white text-base">{opp.sourceCompany}</div>
            <ArrowRight size={16} className="text-slate-500" />
            <div className="font-bold text-white text-base">{opp.targetCompany}</div>
        </div>

        <p className="text-sm text-slate-400 mb-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex-1">
            <Zap size={14} className="inline mr-1 text-amber-400" />
            <span className="font-medium text-slate-300">AI 推荐理由:</span> {opp.aiRationale}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800/50">
            <div className="text-xs text-slate-500">
                涉及板块: {opp.subFundsInvolved.join(' & ')}
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                预计增值 ¥{opp.estimatedValue}M
            </div>
        </div>
        
        <button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
            发起协同
        </button>
    </div>
);

const ActionRow: React.FC<{ action: CollaborationAction }> = ({ action }) => (
    <div className="flex items-center p-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors">
        <div className="mr-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                action.stalledMonths > 2 ? 'border-rose-500 bg-rose-900/20 text-rose-500' :
                action.status === 'Cooperating' ? 'border-emerald-500 bg-emerald-900/20 text-emerald-500' :
                'border-slate-600 bg-slate-800 text-slate-400'
            }`}>
                {action.stalledMonths > 2 ? <AlertTriangle size={18} /> : 
                 action.status === 'Cooperating' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
            </div>
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between mb-1">
                <h4 className="font-bold text-white truncate pr-2">{action.title}</h4>
                <span className="text-xs text-slate-500">{action.lastUpdate}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                    <Users size={12} /> 对接人: {action.owner}
                </span>
                <span className="flex items-center gap-1">
                    <Building2 size={12} /> 发起: {action.initiator === 'MotherFund' ? '集团' : '区域'}
                </span>
            </div>
        </div>
        <div className="ml-4 text-right">
            <div className={`text-xs font-bold px-2 py-1 rounded border ${
                action.status === 'Recommended' ? 'bg-slate-800 border-slate-700 text-slate-400' :
                action.status === 'Contacted' ? 'bg-blue-900/30 border-blue-800 text-blue-400' :
                action.status === 'Piloting' ? 'bg-indigo-900/30 border-indigo-800 text-indigo-400' :
                'bg-emerald-900/30 border-emerald-800 text-emerald-400'
            }`}>
                {action.status}
            </div>
            {action.stalledMonths > 0 && (
                <div className="text-[10px] text-rose-500 font-bold mt-1">
                    停滞 {action.stalledMonths} 个月
                </div>
            )}
        </div>
    </div>
);

const ExternalOpportunityCard: React.FC<{ opp: ExternalOpportunity }> = ({ opp }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/50 transition-all group flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
            <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{opp.name}</h3>
                <span className="text-xs text-slate-500">{opp.industry}</span>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold border ${
                opp.status === 'Growth' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50' :
                opp.status === 'Distressed' ? 'bg-rose-900/30 text-rose-400 border-rose-900/50' :
                'bg-blue-900/30 text-blue-400 border-blue-900/50'
            }`}>
                {opp.status}
            </div>
        </div>
        
        <p className="text-sm text-slate-400 mb-4 flex-1">
            {opp.aiAnalysis}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
            {opp.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded border border-slate-700">
                    {tag}
                </span>
            ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-500 flex items-center gap-1">
                <Globe size={12} /> {opp.source}
            </span>
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">匹配度</span>
                <span className="text-indigo-400 font-bold text-sm">{opp.matchScore}%</span>
            </div>
        </div>
    </div>
);

// --- Main Dashboard ---

const OpportunityDiscoveryDashboard = () => {
    const [activeTab, setActiveTab] = useState<'External' | 'Internal'>('Internal');

    return (
        <div className="h-full flex flex-col animate-fade-in pb-10 font-['PingFang_SC']">
            {/* Header & Tabs */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Zap size={32} className="text-amber-500" />
                        商机识别 (Opportunity Discovery)
                    </h2>
                    <p className="text-slate-400 text-lg mt-2">
                        利用 AI 扫描土拍市场、收并购机会及内部板块协同。
                    </p>
                </div>
                <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex">
                    <button 
                        onClick={() => setActiveTab('External')}
                        className={`px-6 py-3 rounded-lg text-base font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'External' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <Search size={18} />
                        外部拓客
                    </button>
                    <button 
                        onClick={() => setActiveTab('Internal')}
                        className={`px-6 py-3 rounded-lg text-base font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'Internal' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <Network size={18} />
                        内部协同
                    </button>
                </div>
            </div>

            {activeTab === 'Internal' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                    
                    {/* Top Row: Map & Scores */}
                    <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm flex flex-col h-[450px] overflow-hidden">
                        <div className="p-6 pb-2 shrink-0 z-10 bg-slate-900">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Share2 size={20} className="text-indigo-400" />
                                集团全业态协同图谱 (Synergy Map)
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">穿透式视图：看见住宅、商业、物业之间的隐形连接</p>
                        </div>
                        <div className="flex-1 w-full min-h-0 relative">
                            <SynergyMapVisual />
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col h-[450px]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Trophy size={20} className="text-amber-500" />
                                区域/板块 协同贡献度排名
                            </h3>
                            <button className="text-xs text-slate-500 hover:text-white">查看全部</button>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                            {mockGPSynergyScores.map((gp, idx) => (
                                <div key={gp.subFundId} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                                                idx === 0 ? 'bg-amber-500 text-white' : 
                                                idx === 1 ? 'bg-slate-400 text-white' : 
                                                idx === 2 ? 'bg-amber-700 text-amber-200' : 'bg-slate-700 text-slate-400'
                                            }`}>{idx + 1}</span>
                                            <span className="font-bold text-white text-sm">{gp.subFundName}</span>
                                        </div>
                                        <div className="text-xl font-black text-indigo-400 font-['PingFang_SC']">{gp.score}</div>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700/50">
                                        <div className="text-center border-r border-slate-700">
                                            <div className="text-white font-bold">{gp.initiatedCount}</div>
                                            <div>发起次数</div>
                                        </div>
                                        <div className="text-center border-r border-slate-700">
                                            <div className="text-white font-bold">{gp.crossFundRatio}%</div>
                                            <div>跨板块占比</div>
                                        </div>
                                        <div className="text-center">
                                            <div className={`font-bold ${gp.strategicAlignment === 'High' ? 'text-emerald-400' : 'text-slate-200'}`}>
                                                {gp.strategicAlignment}
                                            </div>
                                            <div>战略契合</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Row: Finder & Tracker */}
                    <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Sparkles size={20} className="text-indigo-400" />
                                内部协同机会识别 (AI Recommendation)
                            </h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg hover:bg-slate-700">筛选</button>
                                <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-500 font-bold shadow-sm">一键生成简报</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockSynergyOpportunities.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Layers size={20} className="text-emerald-500" />
                                协同推进与责任追踪
                            </h3>
                            <span className="text-xs bg-rose-900/30 text-rose-400 px-2 py-1 rounded border border-rose-900/50 font-bold">1 项停滞预警</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                            {mockCollaborationActions.map(action => <ActionRow key={action.id} action={action} />)}
                        </div>
                    </div>

                </div>
            ) : (
                // --- External Opportunities View ---
                <div className="flex flex-col gap-6 h-full">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-3 text-slate-500" />
                                <input type="text" placeholder="搜索地块、并购标的..." className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-indigo-500 outline-none w-64" />
                            </div>
                            <button className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-white flex items-center gap-2">
                                <Filter size={14} /> 筛选
                            </button>
                        </div>
                        <span className="text-sm text-slate-500">共找到 {mockExternalOpportunities.length} 个潜在项目</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mockExternalOpportunities.map(opp => (
                            <ExternalOpportunityCard key={opp.id} opp={opp} />
                        ))}
                        {/* Placeholder for 'More' */}
                        <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-800/50 transition-colors group">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-900/30 group-hover:text-indigo-400 text-slate-500 transition-colors">
                                    <Sparkles size={20} />
                                </div>
                                <p className="text-slate-400 text-sm font-medium">请求 AI 扫描更多土拍/并购机会</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Visual Filler for 'Market Radar' */}
                    <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
                        <Globe size={48} className="text-indigo-500 mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-white mb-2">全网土拍雷达正在运行</h3>
                        <p className="text-slate-400 max-w-md">
                            系统正在实时分析全国重点 22 城土地出让公告、法拍网及 AMC 资产包。
                            <br/>
                            下一次深度扫描将在 4 小时后完成。
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpportunityDiscoveryDashboard;
