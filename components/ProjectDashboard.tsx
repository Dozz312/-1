
import React, { useState } from 'react';
import { Project, RiskLevel, Task, TaskStatus, ProjectStage } from '../types';
import { mockProjects } from '../services/mockData';
import { 
  AlertTriangle, CheckCircle2, Clock, Calendar, 
  MoreHorizontal, FileText, Bot, ChevronRight, UserCircle, Briefcase,
  BellRing, CalendarClock, MessageCircle, Search, Filter, Download, Plus,
  Layout, BarChart3, Users, DollarSign, PieChart, Sparkles, AlertOctagon,
  ArrowUpRight, ArrowRight, Bell, Send, TrendingUp, Landmark, HardHat
} from 'lucide-react';

// --- Custom Icons ---

const WeChatIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15.5c-4.4 0-8-2.9-8-6.5S3.6 2.5 8 2.5c4.4 0 8 2.9 8 6.5 0 1.2-.4 2.3-1.1 3.3l1.1 2.8-3.1-1.5c-1.4.9-3 1.4-4.9 1.4zm-2.5-7.5c0 .6.4 1 1 1s1-.4 1-1-.4-1-1-1-1 .4-1 1zm5 0c0 .6.4 1 1 1s1-.4 1-1-.4-1-1-1-1 .4-1 1z" />
        <path d="M17.5 10c-3.6 0-6.5 2.2-6.5 5s2.9 5 6.5 5c1 0 2-.2 2.9-.5l2.4 1.4-.6-2.3c1.2-1 1.8-2.2 1.8-3.6 0-2.8-2.9-5-6.5-5zm-2.2 3.5c.4 0 .8.3.8.8 0 .4-.4.8-.8.8-.4 0-.8-.4-.8-.8 0-.5.4-.8.8-.8zm4.5 0c.4 0 .8.3.8.8 0 .4-.4.8-.8.8-.4 0-.8-.4-.8-.8 0-.5.4-.8.8-.8z" />
    </svg>
);

const FeishuIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9 10.4l-3-7.6a2.2 2.2 0 0 0-3.6-.6l-9.8 9.8a2.2 2.2 0 0 0 .3 3.4l7.6 4.4a2.2 2.2 0 0 0 2.8-.5l5.7-7.6a2.2 2.2 0 0 0 0-1.3z" />
    </svg>
);

const RiskBadge = ({ level }: { level: RiskLevel }) => {
  const colors = {
    [RiskLevel.LOW]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    [RiskLevel.MEDIUM]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    [RiskLevel.HIGH]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const labels = {
    [RiskLevel.LOW]: '正常',
    [RiskLevel.MEDIUM]: '预警',
    [RiskLevel.HIGH]: '高危',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold border flex items-center gap-1.5 ${colors[level]}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${level === RiskLevel.HIGH ? 'bg-rose-500' : level === RiskLevel.MEDIUM ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
      {labels[level]}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority?: string }) => {
    const p = priority || 'Normal';
    const styles = {
        'High': 'bg-rose-900/40 text-rose-400 border-rose-800',
        'Medium': 'bg-blue-900/40 text-blue-400 border-blue-800',
        'Low': 'bg-slate-800 text-slate-400 border-slate-700'
    };
    const labels = { 'High': '紧急', 'Medium': '普通', 'Low': '低' };
    
    return (
        <span className={`w-10 h-6 flex items-center justify-center rounded text-xs font-bold border ${styles[p as keyof typeof styles] || styles['Low']}`}>
            {labels[p as keyof typeof labels] || '普通'}
        </span>
    );
};

// Mock Real Estate Lifecycle Stages
const ganttTasks = [
    { id: 1, name: '主体结构封顶', start: 1, duration: 2, type: 'dev', progress: 100 },
    { id: 2, name: '预售证获取', start: 2.5, duration: 1, type: 'risk', progress: 0, alert: '待批复' },
    { id: 3, name: '首开盘', start: 4, duration: 1, type: 'design', progress: 0 },
    { id: 4, name: '精装进场', start: 3.5, duration: 3, type: 'dev', progress: 0 },
];

const ProjectDashboard = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(mockProjects[0]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [toast, setToast] = useState<{show: boolean, msg: string} | null>(null);

  const showToast = (msg: string) => {
      setToast({ show: true, msg });
      setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action: string, task: string) => {
      showToast(`已${action}: ${task}`);
  };

  // Mock Sell-through & Profit logic based on project risk
  const getMockMetrics = (p: Project) => {
      if (p.riskLevel === RiskLevel.LOW) return { sellThrough: '85%', profitMargin: 12, valChange: '+5%' };
      if (p.riskLevel === RiskLevel.MEDIUM) return { sellThrough: '60%', profitMargin: 8, valChange: '0%' };
      return { sellThrough: '35%', profitMargin: 2, valChange: '-10%' };
  };

  const metrics = getMockMetrics(selectedProject);
  
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in relative font-['Inter']">
      
      {/* Toast Notification */}
      {toast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl border border-emerald-500 flex items-center gap-2 text-sm font-bold animate-fade-in">
              <CheckCircle2 size={18} />
              {toast.msg}
          </div>
      )}

      {/* Top AI Insight Banner */}
      <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-3 mb-6 flex items-center gap-3 shadow-lg shadow-indigo-900/10">
          <div className="p-1.5 bg-indigo-500 rounded-lg text-white shadow-sm">
              <Bot size={18} />
          </div>
          <span className="text-indigo-200 text-sm font-medium flex-1">
              <span className="text-indigo-400 font-bold mr-2">AI 运营洞察:</span>
              检测到“京西·云栖府”蓄客转化率高于预期，建议提前 5 天启动认筹，预计可增加首开回款 2亿。
          </span>
          <button className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-bold transition-colors">
              生成营销调整方案
          </button>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* LEFT SIDEBAR: Project List */}
        <div className="w-[340px] flex flex-col gap-4 flex-shrink-0">
            {/* Search & Filter */}
            <div className="relative">
                <Search size={16} className="absolute left-3 top-3.5 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="搜索项目、地块或项目总..." 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 outline-none placeholder:text-slate-600"
                />
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {['全部', '在售', '在建', '尾盘'].map((filter, i) => (
                    <button key={i} className={`px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap transition-colors ${
                        filter === '尾盘' ? 'bg-slate-800 border-slate-700 text-slate-500' :
                        i === 0 ? 'bg-indigo-600 text-white border-indigo-500' :
                        'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}>
                        {filter}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 pb-4">
                {mockProjects.map(project => (
                    <div 
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer group relative ${
                            selectedProject.id === project.id 
                            ? 'bg-slate-900 border-indigo-500 shadow-md' 
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-slate-500 font-mono">NO. {project.id.split('-')[2]}</span>
                                    {project.riskLevel === RiskLevel.HIGH && <AlertOctagon size={12} className="text-rose-500" />}
                                </div>
                                <h3 className={`font-bold text-sm ${selectedProject.id === project.id ? 'text-white' : 'text-slate-300'}`}>
                                    {project.name}
                                </h3>
                            </div>
                            <RiskBadge level={project.riskLevel} />
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                                {project.manager.charAt(0)}
                            </div>
                            <div className="text-xs">
                                <p className="text-slate-500">项目总 (PM)</p>
                                <p className="text-slate-300 font-medium">{project.manager}</p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-lg p-3 grid grid-cols-2 gap-4 border border-slate-700/30">
                            <div>
                                <p className="text-[10px] text-slate-500 mb-0.5">总货值 (Value)</p>
                                <p className="text-sm font-bold text-slate-200">¥{project.contractValue}亿</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 mb-0.5">当前进度</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-bold text-white">
                                        {project.milestoneProgress}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* RIGHT CONTENT: Detail View */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight">{selectedProject.name}</h1>
                            <span className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-400 rounded text-xs font-mono">
                                {selectedProject.id}
                            </span>
                            <span className="px-2 py-1 bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 rounded text-xs font-bold flex items-center gap-1">
                                <HardHat size={12} />
                                {selectedProject.milestoneProgress}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-2xl flex items-center gap-2">
                            <Sparkles size={14} className="text-amber-400"/>
                            AI 摘要: {selectedProject.aiAnalysis}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold border border-slate-700 transition-colors">
                            <Download size={16} />
                            经营月报
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-900/20 transition-colors">
                            <Plus size={16} />
                            添加计划
                        </button>
                    </div>
                </div>

                {/* Metrics Grid - Investment Specific */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                    {/* Invested Capital */}
                    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 relative overflow-hidden group">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                            <DollarSign size={16} /> 可售货值 (Value)
                        </div>
                        <div className="text-2xl font-bold text-white font-['PingFang_SC'] mb-2">
                            ¥ {selectedProject.contractValue.toLocaleString()} 亿
                        </div>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 size={14} /> 证件齐全
                        </div>
                    </div>

                    {/* MOIC */}
                    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                            <TrendingUp size={16} /> 销售去化率
                        </div>
                        <div className="text-3xl font-bold text-white font-['PingFang_SC'] mb-3">
                            {metrics.sellThrough}
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mb-1">
                            <div 
                                className={`h-full rounded-full ${parseInt(metrics.sellThrough) > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                style={{width: metrics.sellThrough}}
                            ></div>
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                            目标: 90% (年度)
                        </div>
                    </div>

                    {/* IRR */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                            <PieChart size={16} /> 动态净利率
                        </div>
                        <div className={`text-3xl font-bold font-['PingFang_SC'] mb-2 ${metrics.profitMargin > 10 ? 'text-emerald-400' : metrics.profitMargin > 5 ? 'text-white' : 'text-rose-400'}`}>
                            {metrics.profitMargin}%
                        </div>
                        <div className="text-xs text-slate-500">
                            拿地版: 10%
                        </div>
                    </div>

                    {/* Risk Status */}
                    <div className={`border rounded-xl p-5 relative overflow-hidden group ${
                        selectedProject.riskLevel === RiskLevel.HIGH ? 'bg-rose-950/20 border-rose-900/50' :
                        selectedProject.riskLevel === RiskLevel.MEDIUM ? 'bg-amber-950/20 border-amber-900/50' :
                        'bg-emerald-950/20 border-emerald-900/50'
                    }`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <AlertTriangle size={64} className="text-white" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm font-bold mb-2">
                            <AlertOctagon size={16} /> 运营红绿灯
                        </div>
                        <div className={`text-3xl font-bold font-['PingFang_SC'] mb-2 ${
                            selectedProject.riskLevel === RiskLevel.HIGH ? 'text-rose-500' :
                            selectedProject.riskLevel === RiskLevel.MEDIUM ? 'text-amber-500' :
                            'text-emerald-500'
                        }`}>
                            {selectedProject.riskLevel === RiskLevel.HIGH ? '红灯 (Red)' :
                             selectedProject.riskLevel === RiskLevel.MEDIUM ? '黄灯 (Yellow)' : '绿灯 (Green)'}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                            {selectedProject.riskLevel === RiskLevel.HIGH ? '需集团重点督办' : '按计划正常推进'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Nav */}
            <div className="px-6 border-b border-slate-800">
                <div className="flex gap-8">
                    {['工程与报建节点', '销售与回款', '成本与招采', '设计管理'].map((tab, i) => (
                        <button 
                            key={i}
                            onClick={() => setActiveTab(i === 0 ? 'tasks' : tab)}
                            className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                                i === 0 
                                ? 'text-indigo-400 border-indigo-500' 
                                : 'text-slate-500 border-transparent hover:text-slate-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                {/* Gantt / Lifecycle Section */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                            <CalendarClock size={16} className="text-indigo-400" />
                            关键工程节点 (Milestones)
                        </h3>
                        <div className="flex gap-4 text-xs font-mono text-slate-500">
                            <span>2023 Q4</span>
                            <span className="text-indigo-400 font-bold bg-slate-800 px-2 rounded">2024 Q1</span>
                            <span>2024 Q2</span>
                        </div>
                    </div>
                    
                    <div className="p-6 relative">
                        {/* Time Axis */}
                        <div className="flex justify-between mb-4 pl-32 text-xs text-slate-500 border-b border-slate-800 pb-2">
                            <span>10月</span>
                            <span>11月</span>
                            <span>12月</span>
                            <span>1月</span>
                        </div>

                        {/* Gantt Grid Background */}
                        <div className="absolute top-16 left-32 right-6 bottom-6 flex justify-between pointer-events-none opacity-20">
                            {[1,2,3,4].map(i => <div key={i} className="w-px h-full bg-slate-700 border-l border-dashed"></div>)}
                        </div>

                        {/* Rows */}
                        <div className="space-y-6 relative z-10">
                            {ganttTasks.map(task => (
                                <div key={task.id} className="flex items-center h-8">
                                    <div className="w-32 text-xs font-medium text-slate-300 shrink-0 truncate pr-4">{task.name}</div>
                                    <div className="flex-1 relative h-full">
                                        <div 
                                            className={`absolute h-8 rounded-lg flex items-center px-3 text-[10px] font-bold text-white shadow-sm transition-all hover:brightness-110 cursor-pointer ${
                                                task.type === 'risk' ? 'bg-amber-700 border border-amber-600' :
                                                task.type === 'design' ? 'bg-emerald-600 border border-emerald-500' :
                                                'bg-indigo-600 border border-indigo-500'
                                            }`}
                                            style={{ 
                                                left: `${(task.start / 5) * 100}%`, 
                                                width: `${(task.duration / 5) * 100}%` 
                                            }}
                                        >
                                            {task.type === 'risk' && <AlertTriangle size={12} className="mr-1" />}
                                            {task.alert ? task.alert : '进行中'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Task Table */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <h3 className="font-bold text-slate-200 text-sm">重点待办任务 (Top Tasks)</h3>
                        <div className="flex gap-2 text-slate-500">
                            <Filter size={16} className="cursor-pointer hover:text-white" />
                            <MoreHorizontal size={16} className="cursor-pointer hover:text-white" />
                        </div>
                    </div>
                    
                    <table className="w-full text-sm text-left">
                        <thead className="text-slate-500 bg-slate-900/30 text-xs font-medium border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-3 font-medium">任务名称</th>
                                <th className="px-6 py-3 font-medium">责任人</th>
                                <th className="px-6 py-3 font-medium">截止日期</th>
                                <th className="px-6 py-3 font-medium">优先级</th>
                                <th className="px-6 py-3 font-medium">状态</th>
                                <th className="px-6 py-3 font-medium text-right">催办</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {selectedProject.tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-slate-900/40 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-slate-200">{task.title}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                                                {task.assignee.split('-')[1]?.charAt(0) || 'A'}
                                            </div>
                                            <span className="text-slate-400">{task.assignee}</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 font-bold ${task.status === TaskStatus.OVERDUE ? 'text-rose-400' : 'text-slate-400'}`}>
                                        {task.dueDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <PriorityBadge priority={task.status === TaskStatus.OVERDUE ? 'High' : 'Medium'}/>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center gap-2 font-medium text-xs ${
                                            task.status === TaskStatus.COMPLETED ? 'text-emerald-400' : 
                                            task.status === TaskStatus.OVERDUE ? 'text-rose-400' : 'text-blue-400'
                                        }`}>
                                            <div className={`w-2 h-2 rounded-full ${
                                                task.status === TaskStatus.COMPLETED ? 'bg-emerald-500' : 
                                                task.status === TaskStatus.OVERDUE ? 'bg-rose-500' : 'bg-blue-500'
                                            }`}></div>
                                            {task.status === TaskStatus.COMPLETED ? '已完成' : 
                                             task.status === TaskStatus.OVERDUE ? '已逾期' : '进行中'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-slate-500">
                                            <button onClick={() => handleAction('发送微信消息', task.assignee)} title="微信沟通" className="p-2 hover:bg-emerald-900/30 hover:text-emerald-400 rounded-lg transition-colors">
                                                <WeChatIcon className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleAction('催办', task.title)} title="一键催办" className="p-2 hover:bg-rose-900/30 hover:text-rose-400 rounded-lg transition-colors">
                                                <BellRing size={16} />
                                            </button>
                                            <button onClick={() => handleAction('发送飞书消息', task.assignee)} title="飞书消息" className="p-2 hover:bg-blue-900/30 hover:text-blue-400 rounded-lg transition-colors">
                                                <FeishuIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDashboard;
