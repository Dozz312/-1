

import React, { useState } from 'react';
import { 
    MessageSquare, 
    Settings, 
    CheckCircle2, 
    RefreshCw, 
    Database, 
    Lock,
    ToggleLeft,
    ToggleRight,
    Cloud,
    Clock,
    Users,
    Key,
    Shield,
    TrendingUp,
    X
} from 'lucide-react';
import { mockFeishuConfig } from '../services/mockData';

const ConfigToggle = ({ label, desc, icon: Icon, checked, onChange, alert = false }: any) => (
    <div className={`p-5 rounded-xl border transition-all ${checked ? 'bg-slate-800 border-indigo-500/30' : 'bg-slate-900 border-slate-800 opacity-60'}`}>
        <div className="flex justify-between items-start mb-3">
            <div className={`p-2 rounded-lg ${checked ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                <Icon size={20} />
            </div>
            <button onClick={() => onChange(!checked)} className={`transition-colors ${checked ? 'text-indigo-500' : 'text-slate-600'}`}>
                {checked ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
        </div>
        <h4 className={`font-bold text-sm mb-1 ${checked ? 'text-white' : 'text-slate-400'}`}>{label}</h4>
        <p className="text-xs text-slate-500 leading-relaxed mb-2 h-10">{desc}</p>
        
        {alert && checked && (
            <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold mt-2">
                <AlertIcon />
                高隐私风险
            </div>
        )}
    </div>
);

const AlertIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

const HRDataConfig = () => {
    const [config, setConfig] = useState(mockFeishuConfig);

    const toggleSource = (key: keyof typeof config.sources) => {
        setConfig({
            ...config,
            sources: { ...config.sources, [key]: !config.sources[key] }
        });
    };

    return (
        <div className="h-full animate-fade-in pb-10 max-w-6xl mx-auto">
            
            {/* Header: Integration Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <MessageSquare size={120} className="text-indigo-500" />
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                    <div className="flex gap-6">
                        <div className="w-16 h-16 bg-[#00d6b9] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00d6b9]/20">
                            <MessageSquare size={32} className="text-white fill-current" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">飞书 (Feishu/Lark) 连接</h2>
                            <div className="text-slate-400 text-sm mb-4">主要数据源</div>
                            <p className="text-slate-300 max-w-2xl leading-relaxed">
                                已连接至飞书企业 API。正在集成组织架构、会议纪要、沟通日志以及生产力指标，用于 AI 智能分析与洞察。
                            </p>
                            
                            <div className="flex gap-3 mt-6">
                                <span className="px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded text-xs font-bold flex items-center gap-1.5">
                                    状态: 活跃
                                </span>
                                <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded text-xs font-bold">
                                    凭证过期: 29 天
                                </span>
                                <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded text-xs font-bold">
                                    上次同步: 14 分钟前
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl border border-slate-600 transition-colors flex items-center justify-center gap-2">
                            <Settings size={16} />
                            配置连接
                        </button>
                        <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl border border-slate-600 transition-colors flex items-center justify-center gap-2">
                            <Key size={16} />
                            更新 Token
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Data Sources Config */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-white">飞书数据源配置</h3>
                        <span className="text-xs text-slate-500">选择用于 AI 分析的数据维度</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ConfigToggle 
                            label="会议纪要 (Minutes)"
                            desc="分析会议时长、频率及参会者互动情况，识别低效会议。"
                            icon={Clock}
                            checked={config.sources.meetings}
                            onChange={() => toggleSource('meetings')}
                        />
                        <ConfigToggle 
                            label="群聊 (Group Chats)"
                            desc="公共频道情感与关键词分析，监测团队士气。"
                            icon={MessageSquare}
                            checked={config.sources.groupChats}
                            onChange={() => toggleSource('groupChats')}
                        />
                        <ConfigToggle 
                            label="真实工作时间 (Hours)"
                            desc="结合飞书打卡与活跃状态，分析真实工时与加班情况。"
                            icon={Clock}
                            checked={config.sources.hours}
                            onChange={() => toggleSource('hours')}
                        />
                        <ConfigToggle 
                            label="私聊 (Private Chats)"
                            desc="仅收集元数据 (时间戳、消息量)，用于员工倦怠分析。"
                            icon={Lock}
                            checked={config.sources.privateChats}
                            onChange={() => toggleSource('privateChats')}
                            alert={true}
                        />
                        <ConfigToggle 
                            label="云文档 (Docs)"
                            desc="分析文档协作频率、报告产出，用于工作效率评估。"
                            icon={Cloud}
                            checked={config.sources.docs}
                            onChange={() => toggleSource('docs')}
                        />
                        <ConfigToggle 
                            label="群聊参与度 (Participation)"
                            desc="统计团队成员在群组中的响应速度与互动频率。"
                            icon={Users}
                            checked={config.sources.participation}
                            onChange={() => toggleSource('participation')}
                        />
                    </div>
                </div>

                {/* Right: Stats & Privacy */}
                <div className="space-y-8">
                    
                    {/* Stats Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="text-sm font-bold text-slate-400 mb-2">已接入数据点</div>
                        <div className="text-4xl font-bold text-white mb-2 font-['PingFang_SC']">120万</div>
                        <div className="text-xs text-emerald-400 font-bold mb-6 flex items-center gap-1">
                            <TrendingUp size={12}/> +12% 较上周
                        </div>
                        <div className="w-full bg-slate-800 h-px mb-6"></div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-slate-400">AI 置信度分数</div>
                            <div className="p-2 bg-purple-900/30 rounded-full text-purple-400">
                                <Database size={16} />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-2 font-['PingFang_SC']">94%</div>
                        <div className="text-xs text-slate-500">基于近期离职预测准确率</div>
                    </div>

                    {/* Privacy & Compliance */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Shield size={18} className="text-blue-500" />
                            隐私控制与合规
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">匿名化级别</label>
                                <div className="space-y-2">
                                    <label className="flex items-center p-3 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                                        <input type="radio" name="privacy" className="text-indigo-500 focus:ring-indigo-500 bg-slate-900 border-slate-600" />
                                        <div className="ml-3">
                                            <span className="block text-sm font-bold text-slate-200">假名化 (Pseudonymized)</span>
                                            <span className="block text-xs text-slate-500">姓名被 ID 替换 (管理员可逆)</span>
                                        </div>
                                    </label>
                                    <label className="flex items-center p-3 border border-indigo-500/50 bg-indigo-900/10 rounded-xl cursor-pointer">
                                        <input type="radio" name="privacy" className="text-indigo-500 focus:ring-indigo-500 bg-slate-900 border-slate-600" defaultChecked />
                                        <div className="ml-3">
                                            <span className="block text-sm font-bold text-white">完全匿名 (Fully Anonymized)</span>
                                            <span className="block text-xs text-indigo-300">仅使用聚合数据分析 (不可逆)</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">数据访问权限</label>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-bold flex items-center gap-1">
                                        CEO <X size={12} className="cursor-pointer hover:text-white" />
                                    </span>
                                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-bold flex items-center gap-1">
                                        CHRO <X size={12} className="cursor-pointer hover:text-white" />
                                    </span>
                                    <button className="px-3 py-1 border border-dashed border-slate-600 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-colors">
                                        + 添加角色
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sync Log */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white">同步活动日志</h3>
                            <button className="text-xs text-indigo-400 font-bold">查看全部</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-300">会议数据已同步</p>
                                    <p className="text-xs text-slate-500">今天, 10:42 AM • 450 条记录已处理</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-300">离职预测模型已更新</p>
                                    <p className="text-xs text-slate-500">今天, 09:15 AM • 版本 v2.4.1</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-300">同步警告</p>
                                    <p className="text-xs text-slate-500">昨天, 16:20 PM • 延迟 {'>'} 200ms</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur border-t border-slate-800 flex justify-end gap-4 z-10 lg:pl-72">
                <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    保存当前配置
                </button>
            </div>
        </div>
    );
};

export default HRDataConfig;