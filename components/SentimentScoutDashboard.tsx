
import React, { useState } from 'react';
import { 
  Binoculars, 
  FileText, 
  Radio, 
  Search, 
  Newspaper, 
  Briefcase, 
  ShoppingBag, 
  CalendarDays,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Link2,
  MoreHorizontal,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  Clock,
  Layout,
  Maximize2,
  Link,
  Lock,
  Globe
} from 'lucide-react';
import { mockScouts, mockScoutFindings } from '../services/mockData';
import { ScoutStatus, Scout } from '../types';

type Tab = 'new' | 'findings' | 'scouts';

// --- Sub-Component: Scout Config Modal ---
const ScoutConfigModal = ({ topic, onClose, onStart }: { topic: string, onClose: () => void, onStart: () => void }) => {
    const [selectedTime, setSelectedTime] = useState('24h');
    const [selectedNotify, setSelectedNotify] = useState('day');
    const [isPublic, setIsPublic] = useState(true);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="w-[600px] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden text-slate-200">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-xl font-bold font-serif text-white">{topic} 新闻</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <Maximize2 size={18} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Input Display */}
                    <div className="relative">
                        <input 
                            type="text" 
                            value={`${topic} 最新新闻`} 
                            readOnly 
                            className="w-full h-14 pl-6 pr-6 rounded-xl border border-emerald-500/50 bg-slate-800/50 text-white text-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <div className="absolute top-0 right-0 h-full w-1.5 bg-emerald-500 rounded-r-xl"></div>
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 rounded text-slate-400">
                                <Layout size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">建议改进 (SUGGESTED IMPROVEMENTS)</span>
                        </div>
                        <div className="space-y-3 pl-10">
                            {[
                                { id: '24h', label: `${topic} 最新新闻 过去24小时` },
                                { id: 'week', label: `${topic} 最新新闻 本周` },
                                { id: 'month', label: `${topic} 最新新闻 本月` }
                            ].map(opt => (
                                <button 
                                    key={opt.id}
                                    onClick={() => setSelectedTime(opt.id)}
                                    className={`block text-left w-full text-base transition-colors ${selectedTime === opt.id ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-300'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-slate-800" />

                    {/* Notifications */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-900/20 text-rose-400 rounded">
                                <Clock size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">更新通知 (NOTIFY UPDATES)</span>
                        </div>
                        <div className="space-y-3 pl-10">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedNotify === 'day' ? 'border-indigo-500' : 'border-slate-600'}`}>
                                    {selectedNotify === 'day' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                                </div>
                                <input type="radio" name="notify" className="hidden" checked={selectedNotify === 'day'} onChange={() => setSelectedNotify('day')} />
                                <span className={`text-base ${selectedNotify === 'day' ? 'text-white' : 'text-slate-400'}`}>每天</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedNotify === 'week' ? 'border-indigo-500' : 'border-slate-600'}`}>
                                    {selectedNotify === 'week' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                                </div>
                                <input type="radio" name="notify" className="hidden" checked={selectedNotify === 'week'} onChange={() => setSelectedNotify('week')} />
                                <span className={`text-base ${selectedNotify === 'week' ? 'text-white' : 'text-slate-400'}`}>每周一 9:00am</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedNotify === 'instant' ? 'border-indigo-500' : 'border-slate-600'}`}>
                                    {selectedNotify === 'instant' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                                </div>
                                <input type="radio" name="notify" className="hidden" checked={selectedNotify === 'instant'} onChange={() => setSelectedNotify('instant')} />
                                <span className={`text-base ${selectedNotify === 'instant' ? 'text-white' : 'text-slate-400'}`}>当有 {topic} 新闻时</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                    <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                        <button 
                            onClick={() => setIsPublic(true)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isPublic ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                        >
                            <Globe size={14} /> Public
                        </button>
                        <button 
                            onClick={() => setIsPublic(false)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${!isPublic ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                        >
                            <Lock size={14} /> Private
                        </button>
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
                        >
                            取消
                        </button>
                        <button 
                            onClick={onStart}
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all"
                        >
                            <Binoculars size={18} />
                            开始侦查
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Loader View ---
const ScoutLoader = ({ topic }: { topic: string }) => (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in pb-20">
        <div className="mb-8">
            <div className="flex gap-4 mb-4 justify-center">
                <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-400 border border-slate-700 flex items-center gap-2">
                    <Binoculars size={12} /> New
                </span>
                <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-400 border border-slate-700 flex items-center gap-2">
                    <Radio size={12} /> Findings
                </span>
                <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-400 border border-slate-700 flex items-center gap-2">
                    <MoreHorizontal size={12} /> Scouts
                </span>
            </div>
        </div>

        <h1 className="text-5xl font-thin font-serif text-white mb-2 text-center">{topic} 新闻</h1>
        <p className="text-slate-500 text-sm italic mb-16">{topic} 最新新闻</p>

        <div className="relative w-full max-w-2xl h-64 bg-slate-900/50 rounded-3xl border border-slate-800 flex items-center justify-center overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-indigo-500/10"></div>
            {/* Binoculars Graphic */}
            <div className="relative z-10 flex flex-col items-center">
               <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 animate-pulse border border-emerald-500/20">
                   <Binoculars size={64} className="text-emerald-400" />
               </div>
            </div>
        </div>

        <h2 className="text-2xl font-serif text-slate-200 mb-4 text-center">
            您的首份报告即将送达 — 以侦查员的名义！
        </h2>
        <p className="text-slate-400 text-center max-w-xl leading-relaxed">
            您的侦查员正在收集关于该主题的初步报告，并将在需要时进行调整。准备好后，它会在本页面报告发现，但您无需在此等待，我们会在完成后通过邮件通知您。
        </p>

        {/* Bottom Status Bar */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-100 text-slate-800 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 border border-slate-300 min-w-[300px] justify-between">
            <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase">正在侦查中...</span>
            </div>
            <Link size={16} className="text-slate-400" />
        </div>
    </div>
);

// --- Sub-Component: Tab Navigation ---
const ScoutNav = ({ activeTab, onChange }: { activeTab: Tab, onChange: (t: Tab) => void }) => (
    <div className="flex justify-center mb-10">
        <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button 
                onClick={() => onChange('new')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-base font-bold transition-all ${activeTab === 'new' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Binoculars size={18} />
                新建
            </button>
            <button 
                onClick={() => onChange('findings')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-base font-bold transition-all ${activeTab === 'findings' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <FileText size={18} />
                报告
            </button>
            <button 
                onClick={() => onChange('scouts')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-base font-bold transition-all ${activeTab === 'scouts' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Radio size={18} />
                侦查器
            </button>
        </div>
    </div>
);

// --- View 1: New Scout ---
const NewScoutView = ({ onSearch }: { onSearch: (topic: string) => void }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && input.trim()) {
            onSearch(input);
        }
    };

    const scoutTemplates = [
      {
        category: '国资母基金',
        title: '国新·先进制造母基金',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop'
      },
      {
        category: '产业资本',
        title: '中金·AI产业母基金',
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop'
      },
      {
        category: '国家引导基金',
        title: '国投·国家创新基金',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
      },
      {
        category: '硬科技专项',
        title: '诚通·硬科技母基金一期',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'
      },
      {
        category: '品牌监测',
        title: 'OpenAI 舆情情感分析与警报',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop' 
      },
      {
        category: '房地产',
        title: '奥斯汀 80万以下 ADU 房源',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop'
      }
    ];

    return (
        <div className="flex flex-col items-center justify-start h-full animate-fade-in max-w-7xl mx-auto pt-10 pb-20">
            <div className="mb-8 relative w-28 h-20 flex justify-center items-center">
                 {/* Decorative Graphic replicating the 'cloud/network' image */}
                 <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-30"></div>
                 <Binoculars size={64} className="text-indigo-400 relative z-10" />
            </div>
            
            <h1 className="text-4xl font-serif text-white mb-8 text-center">
                我来为你 <span className="text-slate-500">监控网络</span>
            </h1>

            <div className="w-full max-w-3xl relative mb-8">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="我想侦查关于..." 
                    className="w-full h-16 pl-8 pr-6 rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 outline-none text-lg transition-all placeholder:text-slate-500"
                />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {[
                    { icon: Newspaper, label: '新闻' },
                    { icon: Briefcase, label: '职业' },
                    { icon: Search, label: '销售线索' },
                    { icon: ShoppingBag, label: '购物' },
                    { icon: CalendarDays, label: '预约' },
                ].map((item) => (
                    <button key={item.label} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-800 transition-all shadow-sm text-base">
                        <item.icon size={18} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Filter Pills */}
            <div className="w-full max-w-6xl flex items-center justify-between mb-6 px-2">
                 <div className="flex gap-3">
                    <button className="px-4 py-1.5 rounded-xl bg-slate-700 text-white text-sm font-bold">全部</button>
                    <button className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm font-medium">资本动向</button>
                    <button className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm font-medium">行业日报</button>
                    <button className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm font-medium">娱乐</button>
                    <button className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm font-medium">生活方式</button>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-400"><ChevronLeft size={18}/></button>
                    <button className="p-2 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-400"><ChevronRight size={18}/></button>
                 </div>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {scoutTemplates.map((item, idx) => (
                 <div key={idx} onClick={() => onSearch(item.title)} className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all border border-slate-800">
                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase mb-2 block opacity-80">{item.category}</span>
                       <h3 className="text-white font-serif text-2xl leading-snug group-hover:text-indigo-100 transition-colors">{item.title}</h3>
                    </div>
                 </div>
              ))}
            </div>
        </div>
    );
};

// --- View 2: Findings (Timeline & Reports) ---
const FindingsView = () => {
    // Generate simple time slots for timeline
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const activeHour = 9; // Mock 9 AM

    return (
        <div className="max-w-5xl mx-auto animate-fade-in pb-20">
            {/* Timeline */}
            <div className="flex items-center justify-between py-8 border-b border-slate-800 mb-10 sticky top-0 bg-slate-950/95 backdrop-blur z-10">
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-xl text-sm font-bold text-slate-400 shadow-sm border border-slate-800">
                    <span>DEC</span>
                    <span className="text-xl text-white">24</span>
                </div>
                
                {/* Ruler Visualization */}
                <div className="flex-1 mx-12 flex justify-between items-center relative h-10">
                    {hours.map((h) => (
                        <div key={h} className="flex flex-col items-center gap-2 group cursor-pointer relative">
                            {/* Tick Mark */}
                            <div className={`w-0.5 h-4 ${h === activeHour ? 'bg-indigo-500 h-6' : 'bg-slate-700 group-hover:bg-slate-500'}`}></div>
                            {/* Active Indicator Triangle */}
                            {h === activeHour && (
                                <div className="absolute -top-3 text-indigo-500">
                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-indigo-500"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-10"></div> {/* Spacer for balance */}
            </div>

            {/* Content Feed */}
            <div className="space-y-16">
                {mockScoutFindings.map((finding) => (
                    <div key={finding.id} className="bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-sm relative group">
                        {/* Side Bar Indicator */}
                        <div className="absolute left-0 top-10 bottom-10 w-1.5 rounded-r bg-slate-800 group-hover:bg-indigo-500 transition-colors"></div>

                        <div className="pl-6">
                            <div className="flex items-center gap-3 mb-6 text-sm font-bold text-slate-500 uppercase tracking-wide">
                                <span>{finding.timeDisplay}</span>
                                <span>•</span>
                                <span className="text-indigo-400 hover:underline cursor-pointer">{finding.relatedScoutName}</span>
                            </div>

                            <h2 className="text-4xl font-serif text-white mb-6 leading-tight">
                                {finding.title}
                            </h2>

                            <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                                {finding.summary}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {finding.sources.map((source, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg text-sm font-medium text-slate-400 border border-slate-700">
                                        {/* Mock Favicon */}
                                        <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                                        {source.name}
                                    </span>
                                ))}
                            </div>

                            {/* Action Bar */}
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors border border-slate-700 shadow-sm">
                                    <ExternalLink size={18} />
                                    Inspect work
                                </button>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <button className="p-3 hover:bg-slate-800 rounded-xl hover:text-slate-300 transition-colors"><Link2 size={20} /></button>
                                    <button className="p-3 hover:bg-slate-800 rounded-xl hover:text-slate-300 transition-colors"><Copy size={20} /></button>
                                    <button className="p-3 hover:bg-slate-800 rounded-xl hover:text-slate-300 transition-colors"><ThumbsUp size={20} /></button>
                                    <button className="p-3 hover:bg-slate-800 rounded-xl hover:text-slate-300 transition-colors"><ThumbsDown size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Unsubscribe/Info box similar to bottom of Fig 2 */}
            <div className="mt-16 flex justify-center">
                <div className="bg-slate-900 rounded-2xl p-5 flex items-center gap-4 text-sm font-mono text-slate-500 shadow-inner border border-slate-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>NEXT RUN IN 12:24:00</span>
                    <Link2 size={16} className="cursor-pointer hover:text-slate-300 transition-colors"/>
                </div>
            </div>
        </div>
    );
};

// --- View 3: Scouts List ---
const ScoutsListView = ({ scouts }: { scouts: Scout[] }) => {
    const [filter, setFilter] = useState<ScoutStatus>('Active');

    const filteredScouts = scouts.filter(s => 
        filter === 'Active' ? s.status === 'Active' : 
        filter === 'Paused' ? s.status === 'Paused' : s.status === 'Done'
    );

    return (
        <div className="max-w-5xl mx-auto animate-fade-in pb-20">
             <div className="flex justify-end mb-8">
                <div className="bg-slate-900 p-1.5 rounded-xl flex text-sm font-bold border border-slate-800">
                    {(['Active', 'Paused', 'Done'] as ScoutStatus[]).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all ${
                                filter === status 
                                ? 'bg-slate-700 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {status === 'Active' && <PlayCircle size={16} />}
                            {status === 'Paused' && <PauseCircle size={16} />}
                            {status === 'Done' && <CheckCircle2 size={16} />}
                            {status}
                        </button>
                    ))}
                </div>
             </div>

             <div className="space-y-6">
                {filteredScouts.length > 0 ? (
                    filteredScouts.map(scout => (
                        <div key={scout.id} className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:shadow-lg hover:border-slate-700 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-3xl font-serif text-white group-hover:text-indigo-400 transition-colors">
                                    {scout.name}
                                </h3>
                                <button className="text-slate-500 hover:text-slate-300">
                                    <MoreHorizontal size={24} />
                                </button>
                            </div>
                            
                            <p className="text-slate-400 text-lg mb-8 max-w-4xl leading-relaxed">
                                {scout.description}
                            </p>

                            <div className="flex items-center gap-8 text-sm font-bold tracking-wide text-slate-500 uppercase">
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                    Updated {scout.lastUpdated}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    {scout.frequency}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText size={16} />
                                    {scout.sourceCount} Sources
                                </div>
                                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-800 rounded-lg">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-24 text-slate-600">
                        <Binoculars size={64} className="mx-auto mb-6 opacity-20" />
                        <p className="text-lg">No scouts in this status.</p>
                    </div>
                )}
             </div>
        </div>
    );
};

const SentimentScoutDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('new');
  const [scouts, setScouts] = useState<Scout[]>(mockScouts);
  const [scoutTopic, setScoutTopic] = useState('');
  
  // Workflow States
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleInitialSearch = (topic: string) => {
      setScoutTopic(topic);
      setShowConfigModal(true);
  };

  const handleStartScouting = () => {
      setShowConfigModal(false);
      setShowLoader(true);

      // Simulate API Call / Processing Time
      setTimeout(() => {
          const newScout: Scout = {
              id: `new_${Date.now()}`,
              name: `${scoutTopic} 新闻`,
              description: `自动监控 ${scoutTopic} 相关的最新新闻与舆情动态。`,
              status: 'Active',
              lastUpdated: 'Just now',
              frequency: 'Daily',
              sourceCount: 0
          };
          setScouts([newScout, ...scouts]);
          setShowLoader(false);
          setActiveTab('scouts'); // Switch to list view
      }, 3000); // 3 seconds loader
  };

  // If loader is active, override everything else
  if (showLoader) {
      return (
          <div className="h-full flex flex-col">
              <ScoutLoader topic={scoutTopic} />
          </div>
      );
  }

  return (
    <div className="h-full flex flex-col relative">
       {showConfigModal && (
           <ScoutConfigModal 
               topic={scoutTopic} 
               onClose={() => setShowConfigModal(false)}
               onStart={handleStartScouting} 
           />
       )}

       <ScoutNav activeTab={activeTab} onChange={setActiveTab} />
       
       <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
            {activeTab === 'new' && <NewScoutView onSearch={handleInitialSearch} />}
            {activeTab === 'findings' && <FindingsView />}
            {activeTab === 'scouts' && <ScoutsListView scouts={scouts} />}
       </div>
    </div>
  );
};

export default SentimentScoutDashboard;
