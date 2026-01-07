
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ChevronRight,
  Loader2,
  Workflow,
  Cpu,
  Database,
  Layout,
  GripHorizontal,
  Pin,
  PinOff
} from 'lucide-react';
import { AppMode, AIComponentType, AIContext } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
  details?: {
    tool?: string;
    status?: 'thinking' | 'done';
  };
}

// Different questions based on context
const SUGGESTED_QUESTIONS_MATTERS = [
  "生成 G36 项目的进展流程图",
  "显示今年的营收目标达成看板",
  "显示高风险项目分布"
];

const SUGGESTED_QUESTIONS_PEOPLE = [
  "生成公司人力分布看板",
  "显示集团核心组织架构",
  "查询祁钲皓的工作负载状态"
];

interface ChatAssistantProps {
  mode: AppMode;
  context?: AIContext; // Add context
  initialPosition?: 'center' | 'corner';
  onGenerateComponent?: (type: AIComponentType, title: string) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ 
    mode, 
    context = 'matters', // default
    initialPosition = 'corner',
    onGenerateComponent 
}) => {
  const [isOpen, setIsOpen] = useState(mode === 'AI');
  const [isHeroMode, setIsHeroMode] = useState(mode === 'AI');
  
  const [input, setInput] = useState('');
  
  // Dynamic Welcome Message
  const getWelcomeMessage = () => {
      if (mode !== 'AI') return '您好，CEO。我是您的智能经营助理。有什么我可以帮您查询或安排的吗？';
      if (context === 'people') return '我是人力资源智能体。您可以询问关于组织架构、员工画像或人效分析的问题。';
      return '我是业务经营智能体。请告诉我您需要构建什么数据视图（如营收、项目、风险）？';
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: getWelcomeMessage(),
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Draggable State
  const chatRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Update welcome message when context changes (if it's the only message)
  useEffect(() => {
      if (messages.length === 1 && messages[0].id === 'welcome') {
          setMessages([{
              id: 'welcome',
              sender: 'ai',
              text: getWelcomeMessage(),
              timestamp: new Date()
          }]);
      }
  }, [context, mode]);

  // Initialize Position
  useEffect(() => {
    setPosition({ 
        x: window.innerWidth - 420, 
        y: window.innerHeight - 680 
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isHeroMode) {
        scrollToBottom();
    }
  }, [messages, isOpen, isHeroMode]);

  // --- Draggable Logic ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatRef.current) {
        setIsDragging(true);
        const rect = chatRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);


  const simulateAgentPlanning = (query: string) => {
    setIsThinking(true);
    
    // Sequence of "Thinking" steps based on context
    const steps = context === 'people' ? [
        { text: "解析组织架构指令...", tool: "HR_Knowledge_Graph" },
        { text: "检索员工档案数据库...", tool: "People_Analytics_API" },
        { text: "计算人效与负载指标...", tool: "Workload_Calculator" },
        { text: "生成人力视图组件...", tool: "UI_Builder.createWidget()" }
    ] : [
        { text: "正在解析意图...", tool: "NLU_Core" },
        { text: "规划数据源...", tool: "Planner_Agent" },
        { text: "查询项目管理系统(Jira/Asana)...", tool: "API: Project.getFlow()" },
        { text: "构建可视化组件...", tool: "UI_Builder.createWidget()" }
    ];

    let currentStep = 0;

    const processStep = () => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            setMessages(prev => [
                ...prev, 
                {
                    id: `sys_${Date.now()}`,
                    sender: 'system',
                    text: step.text,
                    timestamp: new Date(),
                    details: { tool: step.tool }
                }
            ]);
            currentStep++;
            setTimeout(processStep, 800);
        } else {
            finishResponse(query);
        }
    };

    setTimeout(processStep, 500);
  };

  const finishResponse = (query: string) => {
      let responseText = "已为您生成相关组件。";
      let componentType: AIComponentType = 'RevenueChart';
      let title = "数据组件";

      if (context === 'people') {
          if (query.includes("负载") || query.includes("工作量") || query.includes("祁钲皓")) {
              title = "员工工作负载监测";
              componentType = 'WorkloadCard';
              responseText = "检测到【祁钲皓】当前工作负载已达到 120%，属于严重过载状态。";
          } else if (query.includes("架构") || query.includes("组织")) {
              title = "集团核心组织架构";
              componentType = 'OrgChart';
          } else {
              title = "集团人力资源分布";
              componentType = 'HeadcountChart';
          }
      } else {
          // Matters Context
          // Handle specific "G36" flow request
          if (query.toLowerCase().includes("g36") && (query.includes("流程") || query.includes("进展") || query.includes("项目"))) {
              title = "G36 项目全链路进展视图";
              componentType = 'ProjectFlowchart';
              responseText = "已为您调取 G36 项目的全生命周期流程数据。您可以点击节点查看详细操作日志，或直接联系负责人。";
          } else if (query.includes("营收") || query.includes("收入")) {
              title = "2025 年度营收达成概览";
              componentType = 'RevenueChart';
          } else if (query.includes("风险")) {
              title = "关键合规与经营风险";
              componentType = 'RiskCard';
          } else if (query.includes("日程") || query.includes("待办")) {
              title = "今日智能日程";
              componentType = 'ScheduleCard';
          } else if (query.includes("进展") || query.includes("流程") || query.includes("进度") || query.includes("项目")) {
              title = "项目全链路进展视图";
              componentType = 'ProjectFlowchart';
              responseText = "已为您生成该项目的全链路进展流程图，包含各节点负责人与实时状态。";
          }
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);

      if (onGenerateComponent) {
          onGenerateComponent(componentType, title);
      }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const query = input;
    setInput('');
    
    if (isHeroMode) {
        setIsHeroMode(false);
        setIsOpen(true);
    }
    
    if (mode === 'AI') {
        simulateAgentPlanning(query);
    } else {
        setTimeout(() => {
             setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'ai',
                text: "已收到指令，正在为您查询数据...",
                timestamp: new Date()
             }]);
        }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    if (isHeroMode) {
        const userMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          text: question,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsHeroMode(false);
        setIsOpen(true);
        if (mode === 'AI') {
            simulateAgentPlanning(question);
        }
    } else {
        const userMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          text: question,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        if (mode === 'AI') {
            simulateAgentPlanning(question);
        }
    }
  };

  // Select suggestions based on context
  const suggestions = context === 'people' ? SUGGESTED_QUESTIONS_PEOPLE : SUGGESTED_QUESTIONS_MATTERS;

  // --- Render Hero Mode (Centered Search-like Interface) ---
  if (isHeroMode && mode === 'AI') {
      return (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
              <div className="w-full max-w-2xl px-6 pointer-events-auto animate-fade-in flex flex-col items-center">
                  <div className="w-20 h-20 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                      {context === 'people' ? (
                          <User size={48} className="text-indigo-400" />
                      ) : (
                          <Bot size={48} className="text-indigo-400" />
                      )}
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-3 text-center">
                      {context === 'people' ? 'People Analytics Agent' : 'Business Operations Agent'}
                  </h1>
                  <p className="text-slate-400 text-lg mb-10 text-center max-w-lg">
                      {context === 'people' 
                        ? '我是您的人力资源专家。请指令我生成组织架构、人效分析或员工负荷视图。'
                        : '我是您的经营助手。请输入指令，我将为您规划数据源并构建业务可视化组件。'}
                  </p>
                  
                  {/* Hero Input */}
                  <div className="w-full relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
                      <div className="relative flex items-center bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">
                          <input 
                              type="text" 
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder={context === 'people' ? "查询某位员工或部门..." : "告诉我您想看什么？"} 
                              className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-slate-500 px-6 py-5"
                              autoFocus
                          />
                          <button 
                              onClick={handleSend}
                              disabled={!input.trim()}
                              className="mr-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                              <Send size={20} />
                          </button>
                      </div>
                  </div>

                  {/* Suggestions */}
                  <div className="flex flex-wrap justify-center gap-3 mt-8">
                      {suggestions.map((q, idx) => (
                          <button
                              key={idx}
                              onClick={() => handleSuggestionClick(q)}
                              className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-indigo-200 text-sm rounded-full border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer shadow-sm backdrop-blur-sm"
                          >
                              {q}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      );
  }

  // --- Render Floating Ball (Minimized) ---
  if (!isOpen) {
      return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl shadow-indigo-900/40 transition-all duration-300 hover:scale-110 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500"
        >
            <div className="relative">
                <MessageSquare className="text-white" size={28} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
            </div>
        </button>
      );
  }

  // --- Render Standard Chat Window ---
  return (
    <div 
        ref={chatRef}
        style={{ 
            left: position.x, 
            top: position.y,
            position: 'fixed'
        }}
        className="w-[400px] h-[600px] bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 border border-slate-700 z-50 flex flex-col overflow-hidden animate-fade-in transition-shadow duration-300 hover:shadow-indigo-500/20"
    >
        {/* Header */}
        <div 
            onMouseDown={handleMouseDown}
            className="bg-slate-800/80 p-4 flex items-center gap-3 border-b border-slate-700 cursor-grab active:cursor-grabbing select-none"
        >
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-lg">
                {context === 'people' ? <User className="text-white" size={24} /> : <Bot className="text-white" size={24} />}
            </div>
            <div className="flex-1">
                <h3 className="text-white font-bold text-base flex items-center gap-2">
                    {mode === 'AI' ? (context === 'people' ? 'People Agent' : 'Business Agent') : 'Executive AI'}
                    {mode === 'AI' && <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">Planner Active</span>}
                </h3>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
                <GripHorizontal size={20} />
                <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setIsOpen(false)} className="hover:text-white ml-2">
                    <X size={20} />
                </button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent scrollbar-thin">
        {messages.map((msg) => {
            if (msg.sender === 'system') {
                return (
                    <div key={msg.id} className="flex gap-3 animate-fade-in pl-11">
                         <div className="flex-1 bg-slate-800/50 border border-indigo-500/20 rounded-lg p-3 text-xs font-mono text-indigo-300 shadow-inner flex items-center gap-3">
                             <Cpu size={14} className="animate-pulse text-indigo-400" />
                             <span className="flex-1">{msg.text}</span>
                             <span className="bg-black/30 px-2 py-0.5 rounded text-[10px] text-slate-500">{msg.details?.tool}</span>
                         </div>
                    </div>
                );
            }

            return (
                <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                    msg.sender === 'user' ? 'bg-slate-700' : 'bg-indigo-600'
                }`}>
                    {msg.sender === 'user' ? <User size={16} className="text-slate-300"/> : <Bot size={16} className="text-white"/>}
                </div>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                    msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none border border-indigo-500' 
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                }`}>
                    {msg.text}
                </div>
                </div>
            );
        })}
        
        {isThinking && messages[messages.length-1].sender !== 'system' && (
            <div className="flex gap-3 pl-2">
            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-indigo-400" />
                <span className="text-xs text-slate-400">Agent Thinking...</span>
            </div>
            </div>
        )}
        <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {mode === 'AI' && (
             <div className="px-4 py-3 bg-slate-900/50 border-t border-slate-800">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {suggestions.map((q, idx) => (
                    <button
                        key={idx}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => handleSuggestionClick(q)}
                        className="flex-shrink-0 px-3 py-1.5 bg-slate-800 border border-slate-700 text-indigo-300 text-xs rounded-lg hover:bg-indigo-900/30 hover:border-indigo-500/50 transition-colors shadow-sm flex items-center gap-1.5 group"
                    >
                        <Workflow size={12} className="text-slate-500 group-hover:text-indigo-400" />
                        {q}
                    </button>
                ))}
                </div>
            </div>
        )}

        {/* Input */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 backdrop-blur-md">
        <div className="relative flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onMouseDown={(e) => e.stopPropagation()} 
                placeholder={mode === 'AI' ? "输入指令..." : "询问 AI 助手..."}
                className="flex-1 bg-slate-800/80 border-slate-700 focus:bg-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3 text-sm outline-none transition-all text-white placeholder:text-slate-500 border shadow-inner"
            />
            <button
                onClick={handleSend}
                onMouseDown={(e) => e.stopPropagation()}
                disabled={!input.trim() || isThinking}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            >
                <Send size={18} />
            </button>
        </div>
        </div>
    </div>
  );
};

export default ChatAssistant;
