
import React, { useState, useEffect, useRef } from 'react';
import { 
    Calendar as CalendarIcon, 
    Plus, 
    Users, 
    Monitor,
    Briefcase,
    Coffee,
    Plane,
    MoreHorizontal,
    X,
    Save,
    MapPin
} from 'lucide-react';
import { mockCalendarEvents } from '../services/mockData';
import { CalendarEvent, EventType } from '../types';

const EventTypeBadge = ({ type }: { type: EventType }) => {
    const styles = {
        'Meeting': 'bg-blue-900/30 text-blue-400 border-blue-900/50',
        'Review': 'bg-indigo-900/30 text-indigo-400 border-indigo-900/50',
        'Travel': 'bg-amber-900/30 text-amber-400 border-amber-900/50',
        'Personal': 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50',
        'Board': 'bg-rose-900/30 text-rose-400 border-rose-900/50'
    };

    const icons = {
        'Meeting': <Users size={14} />,
        'Review': <Monitor size={14} />,
        'Travel': <Plane size={14} />,
        'Personal': <Coffee size={14} />,
        'Board': <Briefcase size={14} />
    };

    return (
        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${styles[type]}`}>
            {icons[type]}
            {type === 'Review' ? '内部评审' : 
             type === 'Board' ? '董事会' :
             type === 'Travel' ? '差旅' :
             type === 'Personal' ? '私人' : '商务会议'}
        </span>
    );
};

const AddEventModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (e: any) => void }) => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('10:00');
    const [type, setType] = useState<EventType>('Meeting');
    const [location, setLocation] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ title, time, type, location });
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 rounded-2xl shadow-2xl w-[420px] overflow-hidden transform transition-all scale-100 border border-slate-800">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                    <h3 className="font-bold text-slate-200 text-lg">新建行程</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-300"><X size={24}/></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">事项主题</label>
                        <input 
                            type="text" required autoFocus
                            value={title} onChange={e => setTitle(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-base text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="例如：与 CFO 讨论预算"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">开始时间</label>
                            <input 
                                type="time" required
                                value={time} onChange={e => setTime(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-base text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">类型</label>
                            <select 
                                value={type} onChange={e => setType(e.target.value as EventType)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-base text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="Meeting">商务会议</option>
                                <option value="Review">内部评审</option>
                                <option value="Board">董事会</option>
                                <option value="Travel">差旅</option>
                                <option value="Personal">私人</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">地点 (选填)</label>
                        <input 
                            type="text"
                            value={location} onChange={e => setLocation(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-base text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="例如：12F 会议室"
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-base hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg">
                        <Save size={18} />
                        保存日程
                    </button>
                </form>
            </div>
        </div>
    );
};

const CalendarDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentTimePosition, setCurrentTimePosition] = useState(0);

    // Update current time line position
    useEffect(() => {
        const updatePosition = () => {
            const now = new Date();
            const startOfDay = new Date(now.setHours(8, 0, 0, 0)).getTime(); // Start view at 8 AM
            const endOfDay = new Date(now.setHours(20, 0, 0, 0)).getTime(); // End view at 8 PM approx for calculation
            const current = new Date().getTime();
            // Simple percentage for demo, in real app map pixels to hours
            // This is just a visual effect
            const percentage = ((new Date().getHours() * 60 + new Date().getMinutes()) - (8 * 60)) / (12 * 60) * 100;
            setCurrentTimePosition(Math.max(0, Math.min(100, percentage)));
        };
        updatePosition();
        const interval = setInterval(updatePosition, 60000);
        return () => clearInterval(interval);
    }, []);

    // Generate next 7 days
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    const formatDateKey = (date: Date) => date.toISOString().split('T')[0];
    const isToday = (date: Date) => formatDateKey(date) === formatDateKey(new Date());

    const filteredEvents = events.filter(e => e.date === formatDateKey(selectedDate))
                                 .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const handleAddEvent = ({ title, time, type, location }: any) => {
        const newEvent: CalendarEvent = {
            id: `evt_${Date.now()}`,
            title,
            startTime: time,
            endTime: (() => {
                const [h, m] = time.split(':').map(Number);
                const endH = h + 1;
                return `${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            })(),
            date: formatDateKey(selectedDate),
            type,
            location: location || '待定地点',
            participants: ['我']
        };
        setEvents([...events, newEvent]);
        setIsAddModalOpen(false);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in relative gap-6">
            
            <AddEventModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAdd={handleAddEvent}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <CalendarIcon size={32} className="text-indigo-500" />
                        智能日历
                    </h2>
                    <p className="text-slate-400 text-lg mt-2">行程概览与时间管理</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-base font-bold flex items-center gap-3 shadow-lg shadow-indigo-900/50 transition-all"
                >
                    <Plus size={20} />
                    添加行程
                </button>
            </div>

            {/* Date Picker Strip */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between overflow-x-auto no-scrollbar">
                {weekDays.map((date) => {
                    const isSelected = formatDateKey(date) === formatDateKey(selectedDate);
                    const isTodayDate = isToday(date);
                    return (
                        <button
                            key={date.toString()}
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center justify-center min-w-[100px] py-4 rounded-xl transition-all relative overflow-hidden ${
                                isSelected 
                                    ? 'bg-indigo-600 text-white shadow-xl scale-105 ring-2 ring-indigo-400' 
                                    : 'hover:bg-slate-800 text-slate-500'
                            }`}
                        >
                            {isTodayDate && !isSelected && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>}
                            <span className={`text-sm font-bold mb-1 uppercase tracking-wider ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                                {date.toLocaleDateString('zh-CN', { weekday: 'short' })}
                            </span>
                            <span className="text-3xl font-bold font-['PingFang_SC']">
                                {date.getDate()}
                            </span>
                            {isTodayDate && (
                                <span className={`text-xs mt-2 px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                    今天
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Agenda View */}
            <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-slate-200">
                        {selectedDate.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                            {filteredEvents.length} 个行程
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 relative">
                    {/* Time Decorations (Vertical Line) */}
                    <div className="absolute left-24 top-8 bottom-8 w-px bg-slate-800 z-0"></div>

                    {filteredEvents.length > 0 ? (
                        <div className="space-y-8 relative z-10">
                            {filteredEvents.map((event, idx) => {
                                // Check if this event is "Now" (roughly)
                                const now = new Date();
                                const isEventToday = isToday(selectedDate);
                                const [h, m] = event.startTime.split(':').map(Number);
                                const [endH, endM] = event.endTime.split(':').map(Number);
                                const eventStart = h * 60 + m;
                                const eventEnd = endH * 60 + endM;
                                const currentMinutes = now.getHours() * 60 + now.getMinutes();
                                const isOngoing = isEventToday && currentMinutes >= eventStart && currentMinutes < eventEnd;

                                return (
                                <div key={event.id} className="flex group relative">
                                    
                                    {/* Ongoing Indicator Line */}
                                    {isOngoing && (
                                        <div className="absolute -left-8 top-1/2 w-full border-t-2 border-rose-500 z-20 opacity-50 pointer-events-none flex items-center">
                                            <div className="w-3 h-3 bg-rose-500 rounded-full -ml-1.5 shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
                                            <span className="text-xs text-rose-500 font-bold bg-slate-900 px-2 ml-24 border border-rose-500/50 rounded-full">NOW</span>
                                        </div>
                                    )}

                                    {/* Time Column */}
                                    <div className="w-24 flex flex-col items-end pr-8 pt-2">
                                        <span className={`text-lg font-bold ${isOngoing ? 'text-rose-400' : 'text-slate-200'}`}>{event.startTime}</span>
                                        <span className="text-sm text-slate-500 font-medium">{event.endTime}</span>
                                    </div>

                                    {/* Event Card */}
                                    <div className="flex-1">
                                        <div className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                                            isOngoing 
                                                ? 'bg-slate-900 border-rose-900/50 shadow-xl ring-1 ring-rose-900/50' 
                                                : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-lg'
                                        }`}>
                                            {isOngoing && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500"></div>}
                                            
                                            <div className="flex justify-between items-start mb-3 pl-2">
                                                <h4 className="text-xl font-bold text-white">{event.title}</h4>
                                                <div className="flex items-center gap-3">
                                                    <EventTypeBadge type={event.type} />
                                                    <button className="text-slate-500 hover:text-slate-300">
                                                        <MoreHorizontal size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-6 text-base text-slate-400 mt-4 pl-2 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={18} className="text-slate-500" />
                                                    {event.location}
                                                </div>
                                                {event.participants && (
                                                    <div className="flex items-center gap-2">
                                                        <Users size={18} className="text-slate-500" />
                                                        {event.participants.join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {event.description && (
                                                <div className="mt-4 pl-2 pt-4 border-t border-slate-800 text-sm text-slate-500 leading-relaxed">
                                                    {event.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )})}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 pb-24">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                <CalendarIcon size={40} className="opacity-20" />
                            </div>
                            <p className="text-lg font-medium">该日暂无行程安排</p>
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="mt-4 text-indigo-400 font-bold text-base hover:underline"
                            >
                                点击添加
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarDashboard;
