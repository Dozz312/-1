
import React, { useState, useEffect, useRef } from 'react';
import { 
    Bot, 
    User, 
    Send, 
    PlayCircle, 
    PauseCircle, 
    Cpu, 
    ShieldAlert, 
    TrendingUp, 
    Search, 
    PieChart, 
    Gavel,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Beaker,
    Factory,
    Layers,
    Target,
    X,
    BarChart2
} from 'lucide-react';

// --- Types ---

type AgentType = 'Research' | 'Fundamental' | 'Decision' | 'Risk' | 'Optimization' | 'Moderator';
type ScenarioType = 'fund_eval' | 'battery_analysis';

interface AgentProfile {
    id: AgentType;
    name: string;
    role: string;
    color: string;
    icon: any;
}

interface Message {
    id: string;
    agentId: AgentType | 'User';
    text: string;
    timestamp: number;
    isThinking?: boolean;
}

// --- Agent Personas ---

const AGENTS: Record<AgentType, AgentProfile> = {
    'Moderator': { id: 'Moderator', name: '委员会主席 (System)', role: 'Coordinator', color: 'text-slate-400', icon: Bot },
    'Research': { id: 'Research', name: '行业研究智能体', role: 'Industry Researcher', color: 'text-blue-400', icon: Search },
    'Fundamental': { id: 'Fundamental', name: '基本面分析智能体', role: 'Financial Analyst', color: 'text-emerald-400', icon: PieChart },
    'Decision': { id: 'Decision', name: '投资决策智能体', role: 'IC Observer', color: 'text-purple-400', icon: Gavel },
    'Risk': { id: 'Risk', name: '风险监控智能体', role: 'Compliance Officer', color: 'text-rose-400', icon: ShieldAlert },
    'Optimization': { id: 'Optimization', name: '组合优化智能体', role: 'Quant Analyst', color: 'text-amber-400', icon: TrendingUp },
};

// --- Scenario 1: Fund Evaluation Data (Real Names & Detailed 4 Dimensions) ---

const FUND_EVAL_DATA = {
    alphaTeam: [
        { 
            name: '新一代信息技术基金', 
            manager: '源码资本',
            score: 9.5, 
            tags: ['智力诚实', '核心赋权'],
            analysis: {
                honesty: { score: 9.5, text: '建立了“反向投资组合”复盘机制，每季度公开讨论错失项目（Anti-Portfolio），不仅承认错误，更深究认知盲区。' },
                agility: { score: 9.8, text: '核心 IC 仅 3 人，赋予赛道负责人“拥护者权力” (Champion Model)，避免了寻求平庸共识的委员会政治。' },
                rigor: { score: 9.0, text: '尽调报告强制要求“一页纸”战略防御性分析，拒绝长篇累牍的表演性数据堆砌。' },
                learning: { score: 9.2, text: '将每一次 IC 投票记录作为新合伙人的训练数据，而非仅仅为了合规存档。' }
            }
        },
        { 
            name: '先进制造一期基金', 
            manager: '国信资本',
            score: 9.1, 
            tags: ['结构敏捷', '反直觉'],
            analysis: {
                honesty: { score: 8.8, text: '鼓励“红队测试”，在投决会上专门指派一人扮演反对者，挑战所有假设的确定性。' },
                agility: { score: 9.5, text: '决策链条极短，对于卡脖子关键技术项目，设有“绿色通道”，48小时内可完成决策。' },
                rigor: { score: 9.0, text: '深度聚焦产业链上下游验证，不迷信财务预测，只看“Why Now”的技术拐点。' },
                learning: { score: 8.5, text: '定期邀请外部专家对过往决策进行盲评，持续校准判断力。' }
            }
        },
        { 
            name: '硬科技天使基金', 
            manager: '中科创星',
            score: 8.9, 
            tags: ['学习导向', '复盘强'],
            analysis: {
                honesty: { score: 9.0, text: '对科学家创业项目的失败率有极高容忍度，诚实面对早期技术的不确定性，不强求短期确定性。' },
                agility: { score: 8.5, text: '赋予一线投资经理较大的自主决策权，核心团队只把关战略方向。' },
                rigor: { score: 8.8, text: '尽调过程极度重视技术原理的物理验证，而非商业模式的PPT演绎。' },
                learning: { score: 9.5, text: '建立了完善的“失败项目博物馆”，将每一个失败案例转化为组织的隐性知识。' }
            }
        }
    ],
    bureaucraticTrap: [
        { 
            name: '新能源产业基金', 
            manager: 'IDG资本',
            score: 4.2, 
            tags: ['伪装确定性', '表演性尽调'],
            analysis: {
                honesty: { score: 3.0, text: '投决会上充满了“伪装的确定性”，对产能过剩的宏观风险视而不见，仅展示乐观情景。' },
                agility: { score: 4.0, text: 'IC 成员扩充至 9 人，导致决策流程冗长，为了达成全票通过而磨平了所有锐利观点。' },
                rigor: { score: 5.5, text: '尽调报告长达百页，但多为公开信息堆砌（表演性尽调），缺乏对供需反转的独立判断。' },
                learning: { score: 3.5, text: '复盘流于形式，将亏损归咎于“市场环境”，缺乏内部归因。' }
            }
        },
        { 
            name: '生物医药产业基金', 
            manager: '高瓴创投 (代理)',
            score: 5.0, 
            tags: ['盲点共振', '合规负担'],
            analysis: {
                honesty: { score: 5.5, text: '对于创新药研发失败的概率估计不足，倾向于报喜不报忧。' },
                agility: { score: 4.5, text: '过度依赖外部专家背书，核心团队缺乏独立判断，导致“盲点共振”。' },
                rigor: { score: 5.0, text: '流程僵化，将精力消耗在繁琐的合规流程上，而非科学价值的判断上。' },
                learning: { score: 4.0, text: 'IC 记录仅作为法律合规的免责证据，从未用于改进投资逻辑。' }
            }
        },
        { 
            name: '大消费成长二期', 
            manager: '天图投资',
            score: 5.5, 
            tags: ['缺乏认知多样性'],
            analysis: {
                honesty: { score: 6.0, text: '承认部分赛道判断失误，但反应滞后。' },
                agility: { score: 5.0, text: '团队背景高度同质化，缺乏来自技术或产业侧的异质视角（认知多样性缺失）。' },
                rigor: { score: 5.5, text: '对流量红利的持续性缺乏严谨验证，惯性思维严重。' },
                learning: { score: 5.0, text: '有复盘机制，但改进动作不明显。' }
            }
        }
    ]
};

// --- Scenario 2: Battery Analysis Data ---

const BATTERY_REPORT_DATA = {
    coreLogic: [
        { title: '工艺变革', content: '从“湿法涂布”变为“干法电极”（避免溶剂反应）' },
        { title: '材料新增', content: '硫化锂（Li2S）前驱体 + 锆（Zr）改性剂' }
    ],
    equipment: [
        { name: '曼恩斯特', code: '301325', level: '国家级小巨人', logic: '干法涂布模头垄断', relation: 'CATL第一大客户' },
        { name: '纳科诺尔', code: '832522', level: '国家级小巨人', logic: '辊压设备龙头', relation: 'CATL战略入股' }
    ],
    materials: [
        { name: '三祥新材', code: '603663', level: '国家级小巨人', logic: '锆基材料/电解质改性', relation: '合资公司深度绑定' },
        { name: '光华科技', code: '002741', level: '子公司为小巨人', logic: '硫化锂前驱体', relation: '回收业务合作' },
        { name: '元力股份', code: '300174', level: '细分行业龙头', logic: '碳载体/多孔碳', relation: '关键辅材供应商' }
    ],
    resource: { name: '粤桂股份', code: '000833', logic: '硫铁矿龙头，掌握核心硫资源' },
    investmentAdvice: [
        { title: '2025-2026年（概念导入期）', content: '重点关注设备厂商（曼恩斯特、纳科诺尔）。因为在电池量产前，宁德时代必须先大规模采购试验线和中试线设备，设备厂业绩会最先兑现。' },
        { title: '2027-2029年（小批量产期）', content: '重点关注材料厂商（三祥新材、粤桂股份）。随着小批量装车，对锆、硫化锂的需求会开始实质性放量。' }
    ],
    risks: [
        { title: '技术路线变更风险', content: '如果宁德时代在2027年发现硫化物路线成本降不下来，转而主攻其他路线，上述材料厂商逻辑将失效（但设备厂商通用性较强，风险较小）。' },
        { title: '估值过高', content: '目前固态电池板块已被市场反复炒作，建议关注这些公司在非固态业务（如现有锂电业务）上的业绩支撑，避免买入纯靠讲故事的空壳公司。' }
    ],
    tacticalAction: '您可以优先将 曼恩斯特 (301325) 和 三祥新材 (603663) 加入自选股观察，前者是确定的设备铲子股，后者是深度绑定的材料股。'
};

// --- Main Component ---

const AgentCommitteeDashboard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [resultType, setResultType] = useState<ScenarioType>('fund_eval');
    const [inputValue, setInputValue] = useState('');
    const [selectedDetailFund, setSelectedDetailFund] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, showResult]);

    // Initial Welcome
    useEffect(() => {
        setMessages([{
            id: 'init',
            agentId: 'Moderator',
            text: '欢迎来到智能体委员会。我是本次会议的主持人。\n\n在线委员：\n• 行业研究 (Blue)\n• 基本面分析 (Green)\n• 投资决策 (Purple)\n• 组合优化 (Amber)\n• 风险监控 (Red)\n\n请提出您的议题，委员会将展开多维度辩论与分析。',
            timestamp: Date.now()
        }]);
    }, []);

    const startSimulation = (skipUserMsg = false, scenario: ScenarioType = 'fund_eval') => {
        if (isSimulating) return;
        setIsSimulating(true);
        setShowResult(false);
        setResultType(scenario);

        // User Query
        if (!skipUserMsg) {
            const userText = scenario === 'fund_eval' 
                ? '旗下基金，哪些的投委会是有效的？为什么有效？列出最高效和最低效的三支基金。'
                : '如果宁德时代全固态电池顺利在2030年进入量产，那么现在可以投资什么全固态电池的上下游专精特新企业，请做个分析报告。';

            const userMsg: Message = {
                id: 'user_q',
                agentId: 'User',
                text: userText,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, userMsg]);
        }

        let sequence: any[] = [];

        if (scenario === 'fund_eval') {
            sequence = [
                {
                    agent: 'Decision',
                    delay: 1000,
                    text: '收到指令。我们将基于最新的【IC效能四维模型】对旗下基金投委会进行深度评估。\n\n四个核心维度为：\n1. 智力诚实 (Intellectual Honesty)\n2. 结构敏捷 (Structural Agility)\n3. 程序严谨 (Process Rigor)\n4. 学习导向 (Learning Orientation)'
                },
                {
                    agent: 'Research',
                    delay: 3000,
                    text: '首先评估【结构敏捷】。最高效的【新一代信息技术基金】保持了极小的核心决策团队（3人），并赋予赛道负责人“拥护者权力” (Champion Model)，避免了寻求平庸共识的委员会政治。\n\n反观【大消费成长二期】，投委会成员背景过于同质化，为了寻求所谓的共识而导致决策平庸。'
                },
                {
                    agent: 'Fundamental',
                    delay: 5000,
                    text: '关于【程序严谨】，【先进制造一期】表现卓越。他们摒弃了“表演性的尽职调查”，将精力集中在“Why Now”和战略防御性上。\n\n而低效组如【新能源产业基金】，花费大量时间在堆砌百页报告，却忽略了核心商业逻辑的独立判断。'
                },
                {
                    agent: 'Risk',
                    delay: 7000,
                    text: '我最关注【智力诚实】。高效团队建立了“反向投资组合”机制来直面错误，愿意承认无知。\n\n相比之下，【新能源产业基金】的会议充满了“伪装的确定性”，对显而易见的产能过剩风险视而不见。'
                },
                {
                    agent: 'Optimization',
                    delay: 9000,
                    text: '最后是【学习导向】。数据显示，【硬科技天使基金】将IC记录视为“改进判断力的工具”，定期复盘。而低效基金仅仅将记录视为“法律合规的负担”，从未从中汲取经验。'
                },
                {
                    agent: 'Moderator',
                    delay: 11000,
                    text: '分析透彻。基于这四个维度，我们已锁定了最高效的 Alpha Team 和陷入官僚陷阱的 Bureaucratic Trap。\n\n正在生成《基金投委会效能评估矩阵》...'
                }
            ];
        } else {
            // Battery Scenario Script (Kept same)
            sequence = [
                {
                    agent: 'Research',
                    delay: 1000,
                    text: '收到关于“CATL 全固态电池”的分析指令。首先明确技术路线：宁德时代押注的是**硫化物路线**。\n\n这是固态电池中技术壁垒最高、但性能天花板也最高的路线。相比氧化物，硫化物拥有媲美液态电解液的离子电导率。'
                },
                {
                    agent: 'Fundamental',
                    delay: 3000,
                    text: '这意味着供应链将发生两个重大变化：\n1. 工艺上，必须从“湿法”转为**“干法电极”**。\n2. 材料上，新增**硫化锂 (Li2S)** 和 **锆 (Zr)** 改性剂。\n\n我筛选出了与 CATL 有深度绑定关系的“专精特新”企业。'
                },
                {
                    agent: 'Optimization',
                    delay: 5000,
                    text: '在中游设备端，重点锁定【曼恩斯特】和【纳科诺尔】。前者垄断了干法涂布模头，后者是宁德时代战略入股的辊压设备龙头。设备厂的业绩会比电池量产提前 3-4 年兑现，现在正是布局窗口。'
                },
                {
                    agent: 'Risk',
                    delay: 7000,
                    text: '提示风险：硫化物电解质极其怕水，且成本高昂。如果 2027 年成本降不下来，路线可能变更。\n\n但上游材料端的【三祥新材】（锆基）和【粤桂股份】（硫资源）具备资源稀缺性，即使路线微调，其价值依然存在。'
                },
                {
                    agent: 'Moderator',
                    delay: 9000,
                    text: '综合各位观点，我们筛选出了一份“强相关 + CATL朋友圈 + 专精特新”的核心名单。\n\n正在生成《宁德时代全固态电池产业链投资分析报告》...'
                }
            ];
        }

        let currentIndex = 0;

        const runStep = () => {
            if (currentIndex >= sequence.length) {
                setIsSimulating(false);
                setShowResult(true);
                return;
            }

            const step = sequence[currentIndex];
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: `msg_${Date.now()}`,
                    agentId: step.agent as AgentType,
                    text: step.text,
                    timestamp: Date.now()
                }]);
                currentIndex++;
                runStep();
            }, step.delay);
        };

        runStep();
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const text = inputValue.trim();
        setInputValue('');

        // Add user message
        setMessages(prev => [...prev, {
            id: `user_${Date.now()}`,
            agentId: 'User',
            text: text,
            timestamp: Date.now()
        }]);

        // Trigger simulation based on keywords
        if (text.includes('宁德') || text.includes('固态') || text.includes('电池')) {
            startSimulation(true, 'battery_analysis');
        } else if (text.includes('投委会') || text.includes('有效') || text.includes('基金')) {
            startSimulation(true, 'fund_eval');
        } else {
            // Generic response fallback
            setIsSimulating(true);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: `sys_${Date.now()}`,
                    agentId: 'Moderator',
                    text: '收到您的议题。在当前的演示模式下，我支持以下两个深度场景：\n1. 评估“基金投委会效能” (Fund Effectiveness)\n2. 分析“宁德时代固态电池供应链” (CATL Battery Supply Chain)\n\n请尝试询问相关话题。',
                    timestamp: Date.now()
                }]);
                setIsSimulating(false);
            }, 1000);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // --- Render Logic for Fund Result ---
    const renderFundResult = () => (
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Detail Overlay */}
            {selectedDetailFund && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedDetailFund(null)}>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[90%] max-w-2xl p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={() => setSelectedDetailFund(null)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={24}/>
                        </button>
                        
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{selectedDetailFund.name}</h3>
                                <p className="text-slate-400 text-sm">Manager: {selectedDetailFund.manager}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className={`text-4xl font-black font-['PingFang_SC'] ${selectedDetailFund.score >= 8 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {selectedDetailFund.score}
                                </div>
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Effectiveness Score</div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { key: 'honesty', title: '智力诚实 (Intellectual Honesty)' },
                                { key: 'agility', title: '结构敏捷 (Structural Agility)' },
                                { key: 'rigor', title: '程序严谨 (Process Rigor)' },
                                { key: 'learning', title: '学习导向 (Learning Orientation)' }
                            ].map((dim) => {
                                const metric = selectedDetailFund.analysis[dim.key];
                                return (
                                    <div key={dim.key} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-indigo-300 font-bold text-sm flex items-center gap-2">
                                                <BarChart2 size={16} />
                                                {dim.title}
                                            </h4>
                                            <span className={`font-bold ${metric.score >= 8 ? 'text-emerald-400' : metric.score >= 5 ? 'text-amber-400' : 'text-rose-400'}`}>
                                                {metric.score}/10
                                            </span>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            {metric.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900 p-4 border-b border-indigo-500/20 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Cpu size={20} className="text-indigo-400" />
                    委员会决议：基金投委会效能评估矩阵
                </h3>
                <div className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 font-mono">
                    IC 4-DIMENSIONS
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* The Alpha Team */}
                <div>
                    <div className="flex items-center gap-3 mb-4 text-emerald-400 font-bold uppercase tracking-wider text-sm border-b border-emerald-900/50 pb-2">
                        <CheckCircle2 size={18} />
                        最高效 (The Alpha Team)
                    </div>
                    <div className="space-y-3">
                        {FUND_EVAL_DATA.alphaTeam.map((fund, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setSelectedDetailFund(fund)}
                                className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center group hover:bg-emerald-900/20 transition-all cursor-pointer hover:scale-[1.02] hover:shadow-lg"
                            >
                                <div>
                                    <div className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">{fund.name}</div>
                                    <div className="text-xs text-slate-500 mb-2">{fund.manager}</div>
                                    <div className="flex gap-2 mt-1">
                                        {fund.tags.map(t => (
                                            <span key={t} className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-2xl font-black text-emerald-500 font-['PingFang_SC']">{fund.score}</div>
                                    <span className="text-[10px] text-emerald-500/50 group-hover:text-emerald-400 flex items-center gap-1">
                                        查看详情 <ArrowRight size={10} />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Bureaucratic Trap */}
                <div>
                    <div className="flex items-center gap-3 mb-4 text-rose-400 font-bold uppercase tracking-wider text-sm border-b border-rose-900/50 pb-2">
                        <XCircle size={18} />
                        最低效 (The Bureaucratic Trap)
                    </div>
                    <div className="space-y-3">
                        {FUND_EVAL_DATA.bureaucraticTrap.map((fund, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setSelectedDetailFund(fund)}
                                className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-4 flex justify-between items-center group hover:bg-rose-900/20 transition-all cursor-pointer hover:scale-[1.02] hover:shadow-lg"
                            >
                                <div>
                                    <div className="font-bold text-white text-base group-hover:text-rose-300 transition-colors">{fund.name}</div>
                                    <div className="text-xs text-slate-500 mb-2">{fund.manager}</div>
                                    <div className="flex gap-2 mt-1">
                                        {fund.tags.map(t => (
                                            <span key={t} className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-2xl font-black text-rose-500 font-['PingFang_SC']">{fund.score}</div>
                                    <span className="text-[10px] text-rose-500/50 group-hover:text-rose-400 flex items-center gap-1">
                                        查看详情 <ArrowRight size={10} />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison Legend - Static */}
            <div className="px-6 pb-6 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <PieChart size={14} className="text-indigo-400" />
                    <span>点击上方卡片可查看 <strong>智力诚实、结构敏捷、程序严谨、学习导向</strong> 四维度的详细评分与分析。</span>
                </div>
            </div>
        </div>
    );

    // --- Render Logic for Battery Report ---
    const renderBatteryResult = () => (
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-900/50 to-slate-900 p-4 border-b border-emerald-500/20 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Beaker size={20} className="text-emerald-400" />
                    分析报告：CATL 全固态电池产业链 (硫化物路线)
                </h3>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30 font-mono">
                    2030 VISION
                </div>
            </div>

            <div className="p-6">
                <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <h4 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                        <Layers size={16} /> 核心逻辑：为什么选硫化物？
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {BATTERY_REPORT_DATA.coreLogic.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                                <span className="text-emerald-500 font-bold">•</span>
                                <div>
                                    <span className="text-white font-bold">{item.title}: </span>
                                    <span className="text-slate-300">{item.content}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Equipment Section */}
                    <div>
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <Factory size={18} className="text-blue-400" />
                            1. 中游设备端：干法与致密化 (确定性最高)
                        </h4>
                        <div className="overflow-x-auto rounded-xl border border-slate-700">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-800 text-slate-400">
                                    <tr>
                                        <th className="p-3">企业名称</th>
                                        <th className="p-3">代码</th>
                                        <th className="p-3">专精特新</th>
                                        <th className="p-3">核心逻辑</th>
                                        <th className="p-3">CATL关系</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                                    {BATTERY_REPORT_DATA.equipment.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="p-3 font-bold text-white">{row.name}</td>
                                            <td className="p-3 text-mono text-slate-400">{row.code}</td>
                                            <td className="p-3"><span className="px-2 py-0.5 bg-indigo-900/50 text-indigo-300 rounded text-xs border border-indigo-500/20">{row.level}</span></td>
                                            <td className="p-3 text-slate-300">{row.logic}</td>
                                            <td className="p-3 text-emerald-400 font-medium">{row.relation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Material Section */}
                    <div>
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <Beaker size={18} className="text-amber-400" />
                            2. 上游材料端：前驱体与改性 (弹性最大)
                        </h4>
                        <div className="overflow-x-auto rounded-xl border border-slate-700">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-800 text-slate-400">
                                    <tr>
                                        <th className="p-3">企业名称</th>
                                        <th className="p-3">代码</th>
                                        <th className="p-3">专精特新</th>
                                        <th className="p-3">核心逻辑</th>
                                        <th className="p-3">CATL关系</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                                    {BATTERY_REPORT_DATA.materials.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="p-3 font-bold text-white">{row.name}</td>
                                            <td className="p-3 text-mono text-slate-400">{row.code}</td>
                                            <td className="p-3"><span className="px-2 py-0.5 bg-indigo-900/50 text-indigo-300 rounded text-xs border border-indigo-500/20">{row.level}</span></td>
                                            <td className="p-3 text-slate-300">{row.logic}</td>
                                            <td className="p-3 text-emerald-400 font-medium">{row.relation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Text-Based Analysis Section */}
                    <div className="space-y-6 pt-4 border-t border-slate-800">
                        {/* Resource Highlight */}
                        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h4 className="text-amber-400 font-bold mb-1 text-sm uppercase flex items-center gap-2">
                                   <Layers size={16} /> 潜在资源黑马
                                </h4>
                                <div className="font-bold text-white text-lg">{BATTERY_REPORT_DATA.resource.name} <span className="text-sm font-normal text-slate-400">({BATTERY_REPORT_DATA.resource.code})</span></div>
                            </div>
                            <p className="text-slate-300 text-sm md:max-w-xl border-l border-amber-500/20 pl-4 md:border-l-0 md:pl-0">{BATTERY_REPORT_DATA.resource.logic}</p>
                        </div>

                        {/* Investment Rhythm */}
                        <div>
                            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                                <TrendingUp size={18} />
                                投资节奏建议
                            </h4>
                            <div className="space-y-4 pl-1">
                                {BATTERY_REPORT_DATA.investmentAdvice.map((item, idx) => (
                                    <div key={idx} className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                        <span className="font-bold text-white block mb-2 text-sm">{item.title}</span>
                                        <p className="text-sm leading-relaxed text-slate-300">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risks */}
                        <div>
                            <h4 className="text-rose-400 font-bold mb-3 flex items-center gap-2">
                                <ShieldAlert size={18} />
                                核心风险
                            </h4>
                            <div className="space-y-4 pl-1">
                                {BATTERY_REPORT_DATA.risks.map((item, idx) => (
                                    <div key={idx} className="bg-rose-900/10 p-4 rounded-xl border border-rose-500/10">
                                        <span className="font-bold text-rose-200 block mb-2 text-sm">{item.title}</span>
                                        <p className="text-sm leading-relaxed text-slate-300">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tactical Action */}
                        <div className="p-6 bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Target size={64} className="text-indigo-400" />
                            </div>
                            <h4 className="text-indigo-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider relative z-10">
                                <Target size={18} />
                                总结下一战术动作
                            </h4>
                            <p className="text-white text-base leading-relaxed font-medium relative z-10">
                                {BATTERY_REPORT_DATA.tacticalAction}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-[#0B0F19] relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                 }}>
            </div>

            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center z-10 bg-slate-900/80 backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Cpu className="text-indigo-500" />
                        智能体委员会 (Agent Committee)
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">多智能体协同决策系统 • Level 4 Reasoning</p>
                </div>
                <div className="flex gap-2">
                    {Object.values(AGENTS).filter(a => a.id !== 'Moderator').map(agent => {
                        const Icon = agent.icon;
                        return (
                            <div key={agent.id} className="group relative">
                                <div className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center ${agent.color}`}>
                                    <Icon size={16} />
                                </div>
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                                    {agent.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar z-10">
                {messages.map((msg) => {
                    const isUser = msg.agentId === 'User';
                    const agent = isUser ? null : AGENTS[msg.agentId as AgentType];
                    const AgentIcon = agent ? agent.icon : null;

                    return (
                        <div key={msg.id} className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border ${
                                isUser 
                                ? 'bg-slate-700 border-slate-600' 
                                : `bg-slate-900 border-slate-800 ${agent?.color}`
                            }`}>
                                {isUser ? <User size={20} className="text-white"/> : (AgentIcon && <AgentIcon size={20} />)}
                            </div>

                            {/* Message Bubble */}
                            <div className={`max-w-[80%]`}>
                                <div className={`flex items-center gap-2 mb-1 ${isUser ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-xs font-bold text-slate-400">
                                        {isUser ? 'CEO' : agent?.name}
                                    </span>
                                    {!isUser && <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-500 border border-slate-700">{agent?.role}</span>}
                                </div>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                                    isUser 
                                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                                    : 'bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                {isSimulating && (
                    <div className="flex gap-4 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-ping"></span>
                        </div>
                        <div className="flex items-center text-slate-500 text-xs italic">
                            智能体正在思考与撰写回复...
                        </div>
                    </div>
                )}

                {/* Final Result Card */}
                {showResult && (
                    <div className="mt-8 animate-fade-in-up">
                        {resultType === 'fund_eval' ? renderFundResult() : renderBatteryResult()}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 z-20">
                {!isSimulating && messages.length < 2 && (
                    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                        <button 
                            onClick={() => setInputValue('复盘 Q3 错失项目原因')}
                            className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm transition-all border border-slate-700 whitespace-nowrap"
                        >
                            复盘 Q3 错失项目原因
                        </button>
                        <button 
                            onClick={() => setInputValue('预测明年热门赛道')}
                            className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm transition-all border border-slate-700 whitespace-nowrap"
                        >
                            预测明年热门赛道
                        </button>
                        <button 
                            onClick={() => setInputValue('分析被投企业 ESG 风险')}
                            className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm transition-all border border-slate-700 whitespace-nowrap"
                        >
                            分析被投企业 ESG 风险
                        </button>
                    </div>
                )}
                
                <div className={`relative ${isSimulating ? 'opacity-60 pointer-events-none' : ''}`}>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isSimulating ? "委员会正在进行中..." : "请输入您的议题..."} 
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                        disabled={isSimulating}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isSimulating || !inputValue.trim()}
                        className="absolute right-2 top-2 p-1.5 bg-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentCommitteeDashboard;
