
import React, { useState, useRef, useEffect } from 'react';
import { 
    Bot, 
    Send, 
    Mic, 
    Paperclip, 
    MoreHorizontal, 
    Clock, 
    FileText, 
    MessageSquare, 
    Mail, 
    Calendar,
    Search,
    BrainCircuit,
    Sparkles,
    CheckCircle2,
    Database,
    User,
    Loader2
} from 'lucide-react';

// --- Types ---
interface ContextSource {
    id: string;
    type: 'Meeting' | 'Email' | 'Chat' | 'Doc' | 'System';
    title: string;
    time: string;
    preview: string;
    active: boolean;
}

interface ChatMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
    citations?: string[];
}

// --- Mock Data ---
const mockContextSources: ContextSource[] = [
    { id: 'c1', type: 'Meeting', title: 'Q4 董事会预备会', time: '刚刚', preview: '讨论了 B 轮融资条款与估值...', active: true },
    { id: 'c2', type: 'Email', title: 'Re: Acme 续约谈判', time: '2小时前', preview: '对方 CEO 提出了新的付款账期要求...', active: true },
    { id: 'c3', type: 'Chat', title: 'Slack #general', time: '实时', preview: '产品团队正在庆祝 POP AI 上线...', active: true },
    { id: 'c4', type: 'Doc', title: 'Q4 和 2026 年度预算.xlsx', time: '昨天', preview: '包含各部门人力成本详细测算...', active: false },
    { id: 'c5', type: 'System', title: 'ERP: 财务模块', time: '实时', preview: 'Q3 营收数据已更新...', active: false },
];

const initialMessages: ChatMessage[] = [
    {
        id: 'm1',
        sender: 'ai',
        text: 'CEO您好，我是您的全域智能秘书 Eva。\n\n我已经同步了公司所有的会议记录、邮件往来、IM 聊天记录以及 ERP/CRM 业务数据。\n\n您可以问我任何事情，比如：“昨天董事会上大家都提了什么意见？” 或 “最近大家在 Slack 上都在吐槽什么？”',
        timestamp: '10:00 AM'
    }
];

// --- Components ---

const SourceIcon = ({ type }: { type: ContextSource['type'] }) => {
    switch(type) {
        case 'Meeting': return <Mic size={16} className="text-rose-400" />;
        case 'Email': return <Mail size={16} className="text-blue-400" />;
        case 'Chat': return <MessageSquare size={16} className="text-emerald-400" />;
        case 'Doc': return <FileText size={16} className="text-amber-400" />;
        case 'System': return <Database size={16} className="text-indigo-400" />;
        default: return <FileText size={16} />;
    }
};

const ContextCard: React.FC<{ source: ContextSource }> = ({ source }) => (
    <div className={`p-3 rounded-xl border mb-3 transition-all cursor-pointer group ${
        source.active 
        ? 'bg-slate-800 border-indigo-500/30 shadow-sm' 
        : 'bg-slate-900 border-slate-800 opacity-60 hover:opacity-100'
    }`}>
        <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <SourceIcon type={source.type} />
                <span className="truncate max-w-[140px]">{source.title}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{source.time}</span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {source.preview}
        </p>
        {source.active && (
            <div className="mt-2 flex items-center gap-1 text-[10px] text-indigo-400 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                已连接上下文
            </div>
        )}
    </div>
);

const AISecretaryDashboard = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking and response
        setTimeout(() => {
            let replyText = "我正在检索相关信息...";
            let citations: string[] = [];

            if (input.includes("董事会") || input.includes("会议")) {
                replyText = "根据**【Q4 董事会预备会】**的会议录音，主要讨论了以下三点：\n1. B 轮融资估值定在 20亿人民币，陈董事长表示支持。\n2. 决定暂缓华西大区的扩张计划，优先保现金流。\n3. 产品侧要求 POP AI 必须在下月 15 号前完成合规备案。";
                citations = ["Meeting: Q4 董事会预备会 (10:00-11:30)", "Doc: 董事会决议草案.pdf"];
            } else if (input.includes("邮件") || input.includes("Acme")) {
                replyText = "在**2小时前**收到的来自 Acme CEO 的邮件中，他们提出希望将付款周期从 **Net 30** 延长至 **Net 60**。作为交换，他们愿意签署一份为期 3 年的长期战略合作协议。\n\n建议：考虑到我们目前的现金流状况（可支撑 18 个月），可以考虑接受，但需法务审核违约条款。";
                citations = ["Email: Re: Acme 续约谈判 (来自: John Doe)", "ERP: 现金流预测模型"];
            } else if (input.includes("吐槽") || input.includes("Slack")) {
                replyText = "扫描了最近 24 小时的 **#general** 和 **#random** 频道，大家主要的吐槽点集中在：\n1. 新的报销系统流程太繁琐（提及率 15次）。\n2. 12楼的咖啡机又坏了（提及率 8次）。\n3. 部分研发同事反映 GPU 算力资源申请审批太慢，影响了模型训练进度。";
                citations = ["Slack: #general", "Slack: #dev-ops"];
            } else {
                replyText = "收到。我已经记录下来并会持续关注相关信息。还有什么需要我帮您查询的吗？";
            }

            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: replyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                citations
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6 animate-fade-in">
            
            {/* Left Sidebar: Context Awareness */}
            <div className="w-80 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden hidden md:flex">
                <div className="p-5 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <BrainCircuit size={20} className="text-indigo-500" />
                        全域记忆感知
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">实时连接 {mockContextSources.length} 个数据源</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="mb-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">活跃上下文 (Active Context)</h4>
                        {mockContextSources.filter(s => s.active).map(s => <ContextCard key={s.id} source={s} />)}
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">知识库索引 (Indexed)</h4>
                        {mockContextSources.filter(s => !s.active).map(s => <ContextCard key={s.id} source={s} />)}
                    </div>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2">
                        <Search size={16} />
                        搜索历史记忆
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden relative">
                {/* Header */}
                <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold">Eva 智能秘书</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-xs text-emerald-400 font-medium">Online • 已同步所有数据</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 hover:text-white transition-colors"><Search size={20}/></button>
                        <button className="text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={20}/></button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#0B0F19]">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" 
                        style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-fade-in relative z-10`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                                msg.sender === 'user' ? 'bg-slate-700' : 'bg-indigo-600'
                            }`}>
                                {msg.sender === 'user' ? <User size={20} className="text-slate-300"/> : <Sparkles size={20} className="text-white"/>}
                            </div>
                            
                            <div className={`max-w-[80%] space-y-2`}>
                                <div className={`p-5 rounded-2xl text-base leading-relaxed shadow-lg whitespace-pre-wrap ${
                                    msg.sender === 'user' 
                                    ? 'bg-slate-800 text-white rounded-tr-none border border-slate-700' 
                                    : 'bg-indigo-900/20 text-indigo-100 rounded-tl-none border border-indigo-500/20'
                                }`}>
                                    {msg.text}
                                </div>
                                
                                {/* Citations */}
                                {msg.citations && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {msg.citations.map((cite, idx) => (
                                            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 transition-colors cursor-pointer">
                                                <FileText size={12} />
                                                {cite}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <span className={`text-xs text-slate-600 block ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-4 animate-fade-in relative z-10">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                <Loader2 size={20} className="text-white animate-spin" />
                            </div>
                            <div className="bg-indigo-900/20 text-indigo-300 px-5 py-4 rounded-2xl rounded-tl-none border border-indigo-500/20 flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-slate-900 border-t border-slate-800 relative z-20">
                    <div className="relative flex items-end gap-3 bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all shadow-lg">
                        <button className="p-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="询问公司事件、会议记录或查找文件..."
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 py-3 max-h-32 resize-none custom-scrollbar"
                            rows={1}
                            style={{ minHeight: '48px' }}
                        />
                        {input.trim() ? (
                             <button 
                                onClick={handleSend}
                                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all shadow-lg"
                             >
                                <Send size={20} />
                             </button>
                        ) : (
                             <button className="p-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors">
                                <Mic size={20} />
                             </button>
                        )}
                    </div>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-slate-600">
                            AI 可能生成不准确的信息。它已获得访问您公司内部数据的权限 (Level 5 Clearance)。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AISecretaryDashboard;
