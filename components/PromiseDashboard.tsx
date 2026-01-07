
import React, { useState, useEffect } from 'react';
import { 
    Sparkles, 
    CalendarPlus, 
    Send, 
    CheckCircle2, 
    Circle, 
    Plus, 
    Handshake, 
    Mic, 
    Mail, 
    Keyboard,
    Clock,
    User,
    X,
    Calendar
} from 'lucide-react';
import { mockPromises } from '../services/mockData';
import { PromiseItem } from '../types';

interface PromiseCardProps {
    item: PromiseItem;
    onToggle: (id: string) => void;
    onCalendar: (item: PromiseItem) => void;
    onUrge: (item: PromiseItem) => void;
}

const PromiseCard: React.FC<PromiseCardProps> = ({ item, onToggle, onCalendar, onUrge }) => {
    return (
        <div className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
            item.status === 'Completed' 
            ? 'bg-slate-900 border-slate-800 opacity-60' 
            : item.isAiDetected 
                ? 'bg-indigo-900/10 border-indigo-500/30 hover:shadow-lg hover:border-indigo-500/50' 
                : 'bg-slate-900 border-slate-800 hover:shadow-lg hover:border-slate-700'
        }`}>
            {/* AI Badge */}
            {item.isAiDetected && item.status !== 'Completed' && (
                <div className="absolute top-0 right-0 px-3 py-1.5 bg-indigo-900/50 text-indigo-300 text-xs font-bold rounded-bl-xl rounded-tr-xl flex items-center gap-1.5 border-l border-b border-indigo-500/30">
                    <Sparkles size={12} />
                    AI 自动捕获
                </div>
            )}

            <div className="flex items-start gap-5">
                <button 
                    onClick={() => onToggle(item.id)}
                    className={`mt-1.5 flex-shrink-0 transition-colors ${
                        item.status === 'Completed' ? 'text-emerald-500' : 'text-slate-600 hover:text-indigo-500'
                    }`}
                >
                    {item.status === 'Completed' ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                </button>
                
                <div className="flex-1">
                    <p className={`text-lg font-medium mb-2 leading-snug ${
                        item.status === 'Completed' ? 'text-slate-600 line-through' : 'text-slate-200'
                    }`}>
                        {item.content}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-3 font-medium">
                        <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-lg text-slate-400">
                            <User size={14} />
                            {item.stakeholder}
                        </span>
                        
                        <span className="flex items-center gap-1.5">
                            {item.source.includes('会议') && <Mic size={14} />}
                            {item.source.includes('邮件') && <Mail size={14} />}
                            {item.source.includes('手动') && <Keyboard size={14} />}
                            {item.source}
                        </span>

                        {item.dueDate && (
                            <span className="flex items-center gap-1.5 text-amber-500">
                                <Clock size={14} />
                                {item.dueDate}
                            </span>
                        )}
                    </div>

                    {/* AI Context Snippet */}
                    {item.isAiDetected && item.status !== 'Completed' && (
                        <div className="mt-4 p-3 bg-indigo-900/20 rounded-lg text-sm text-indigo-300 italic border-l-4 border-indigo-500/50 leading-relaxed">
                            "{item.context}"
                        </div>
                    )}
                </div>

                {/* Actions - Visible on Hover or if active */}
                {item.status !== 'Completed' && (
                    <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => onCalendar(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl text-xs font-bold hover:text-indigo-400 hover:border-indigo-500/50 shadow-sm transition-all whitespace-nowrap"
                            title="加入日程"
                        >
                            <CalendarPlus size={16} />
                            入日历
                        </button>
                        <button 
                            onClick={() => onUrge(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl text-xs font-bold hover:text-indigo-400 hover:border-indigo-500/50 shadow-sm transition-all whitespace-nowrap"
                            title="委托助理跟进"
                        >
                            <Send size={16} />
                            自动催办
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ScheduleModal = ({ isOpen, onClose, onConfirm, item }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (date: string, time: string) => void;
    item: PromiseItem | null;
}) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('10:00');

    useEffect(() => {
        if (isOpen) {
            const today = new Date().toISOString().split('T')[0];
            setDate(today);
            setTime('10:00');
        }
    }, [isOpen]);

    if (!isOpen || !item) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 rounded-2xl shadow-2xl w-[420px] overflow-hidden transform transition-all scale-100 border border-slate-800">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                    <h3 className="font-bold text-slate-200 flex items-center gap-3 text-lg">
                        <CalendarPlus size={20} className="text-indigo-500"/>
                        安排日程
                    </h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-300"><X size={24}/></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="p-4 bg-indigo-900/20 rounded-xl text-base text-indigo-300 border border-indigo-500/30 italic leading-relaxed">
                        "{item.content}"
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">选择日期</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-base text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <Calendar size={18} className="absolute left-3 top-3.5 text-slate-500 pointer-events-none"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">具体时间</label>
                        <div className="relative">
                             <input 
                                type="time" 
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-base text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <Clock size={18} className="absolute left-3 top-3.5 text-slate-500 pointer-events-none"/>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button 
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-700"
                        >
                            取消
                        </button>
                        <button 
                            onClick={() => onConfirm(date, time)}
                            disabled={!date || !time}
                            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 disabled:opacity-50"
                        >
                            确认添加
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PromiseDashboard = () => {
    const [promises, setPromises] = useState<PromiseItem[]>(mockPromises);
    const [newItemText, setNewItemText] = useState('');
    const [toast, setToast] = useState<{msg: string, type: 'success' | 'info'} | null>(null);
    
    // Modal State
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [selectedPromise, setSelectedPromise] = useState<PromiseItem | null>(null);

    const showToast = (msg: string, type: 'success' | 'info' = 'info') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleToggle = (id: string) => {
        setPromises(prev => prev.map(p => 
            p.id === id ? { ...p, status: p.status === 'Completed' ? 'Pending' : 'Completed' } : p
        ));
    };

    const handleCalendarClick = (item: PromiseItem) => {
        setSelectedPromise(item);
        setScheduleModalOpen(true);
    };
    
    const handleConfirmSchedule = (date: string, time: string) => {
        if (!selectedPromise) return;
        
        showToast(`📅 已将 "${selectedPromise.content}" 加入 ${date} ${time} 的日程`, 'success');
        setScheduleModalOpen(false);
        setSelectedPromise(null);
    };

    const handleUrge = (item: PromiseItem) => {
        showToast(`🤖 AI 助理已接手，正在联系 [${item.stakeholder}] 确认时间...`, 'info');
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemText.trim()) return;

        const newItem: PromiseItem = {
            id: `new_${Date.now()}`,
            content: newItemText,
            stakeholder: '待定对象',
            source: '手动添加',
            isAiDetected: false,
            status: 'Pending'
        };

        setPromises([newItem, ...promises]);
        setNewItemText('');
        showToast('✅ 新备忘已记录', 'success');
    };

    const pendingPromises = promises.filter(p => p.status === 'Pending');
    const completedPromises = promises.filter(p => p.status === 'Completed');

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-fade-in relative pb-12">
            
            <ScheduleModal 
                isOpen={scheduleModalOpen}
                onClose={() => setScheduleModalOpen(false)}
                onConfirm={handleConfirmSchedule}
                item={selectedPromise}
            />

            {/* Toast Notification */}
            {toast && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-8 py-4 rounded-full shadow-2xl border border-slate-700 text-base font-medium flex items-center gap-4 animate-fade-in">
                    {toast.type === 'success' ? <CheckCircle2 size={24} className="text-emerald-400" /> : <Sparkles size={24} className="text-indigo-400" />}
                    {toast.msg}
                </div>
            )}

            {/* Header Area */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-900/30">
                        <Handshake size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">备忘录 (Memo)</h2>
                </div>
                <p className="text-slate-400 text-lg ml-16">
                    AI 自动梳理您的备忘与承诺，防止遗忘重要事项。
                </p>
            </div>

            {/* Input Area */}
            <div className="mb-10">
                <form onSubmit={handleAdd} className="relative group">
                    <input 
                        type="text" 
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="输入新的备忘，例如：答应下周给王总发 BP..." 
                        className="w-full h-16 pl-8 pr-32 rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-900/50 transition-all outline-none text-xl placeholder:text-slate-500"
                    />
                    <button 
                        type="submit"
                        disabled={!newItemText.trim()}
                        className="absolute right-3 top-3 h-10 px-5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Plus size={20} />
                        添加
                    </button>
                </form>
            </div>

            {/* AI Insights / Pending List */}
            <div className="flex-1 overflow-y-auto space-y-10 pr-3 custom-scrollbar">
                
                {/* Pending Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-300 flex items-center gap-3 text-lg">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                            待办备忘
                            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-bold">{pendingPromises.length}</span>
                        </h3>
                    </div>

                    {pendingPromises.length === 0 ? (
                        <div className="text-center py-16 bg-slate-900 rounded-2xl border border-dashed border-slate-700">
                            <p className="text-slate-500 text-lg">太棒了！目前没有未完成的备忘。</p>
                        </div>
                    ) : (
                        pendingPromises.map(item => (
                            <PromiseCard 
                                key={item.id} 
                                item={item} 
                                onToggle={handleToggle}
                                onCalendar={handleCalendarClick}
                                onUrge={handleUrge}
                            />
                        ))
                    )}
                </div>

                {/* Completed Section */}
                {completedPromises.length > 0 && (
                    <div className="space-y-6 pt-6 border-t border-slate-800">
                        <h3 className="font-bold text-slate-500 text-base flex items-center gap-3">
                            已完成
                            <span className="text-xs bg-slate-800 px-3 py-1 rounded-full font-bold">{completedPromises.length}</span>
                        </h3>
                        <div className="space-y-4 opacity-70">
                            {completedPromises.map(item => (
                                <PromiseCard 
                                    key={item.id} 
                                    item={item} 
                                    onToggle={handleToggle}
                                    onCalendar={handleCalendarClick}
                                    onUrge={handleUrge}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromiseDashboard;
