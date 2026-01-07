
import { 
    Project, ProjectStage, RiskLevel, TaskStatus, MonthlyData, ProductLine, 
    ComplianceItem, Scout, ScoutFinding, RegionalData, 
    DailyBriefing, OperatingData, PromiseItem, CalendarEvent, SubFund, SubFundMonitorMetrics,
    SynergyNode, SynergyLink, SynergyOpportunity, CollaborationAction, GPSynergyScore, ExternalOpportunity,
    EmployeeProfile, HRTeamInsight, FeishuConfig, Department,
    SentimentWarning, StrategicBlockage, TaskAudit,
    TalentPoolItem, InternalOpening, ManagerHoardingMetric,
    ShadowAuditCase, OrgConflictData, ECGDataPoint, ShadowStreamItem,
    AuditEvent, FactDeviationDetail, SentimentAnomalyDetail
} from '../types';

// ... (Keep existing data unchanged: generateFinancialData, mockProjects, etc. ) ...
// ... Copying previous file content to ensure no data loss, then appending new data ...

export const generateFinancialData = (): MonthlyData[] => [
    { month: 'Jan', revenue: 450, target: 500, profit: 80, cost: 320, collected: 400, receivables: 480 },
    { month: 'Feb', revenue: 380, target: 450, profit: 60, cost: 280, collected: 320, receivables: 400 },
    { month: 'Mar', revenue: 650, target: 600, profit: 150, cost: 420, collected: 580, receivables: 700 },
    { month: 'Apr', revenue: 550, target: 600, profit: 120, cost: 380, collected: 500, receivables: 580 },
    { month: 'May', revenue: 720, target: 650, profit: 180, cost: 450, collected: 650, receivables: 750 },
    { month: 'Jun', revenue: 900, target: 800, profit: 250, cost: 550, collected: 820, receivables: 950 },
];

export const mockProjects: Project[] = [
    {
        id: 'PRJ-BJ-001',
        name: '京西·云栖府 (Cloud Mansion)',
        riskLevel: RiskLevel.LOW,
        manager: '张建国',
        contractValue: 3500, // Total Saleable Value
        milestoneProgress: '主体结构封顶',
        aiAnalysis: '蓄客情况良好，首开去化率预计达 85%。施工进度正常，无延期风险。',
        stage: 'Execution',
        tasks: [
            { id: 't1', title: '完成 5# 楼主体结构验收', assignee: '工程部-李强', dueDate: '2023-11-15', priority: 'High', status: TaskStatus.IN_PROGRESS },
            { id: 't2', title: '取得预售许可证', assignee: '开发报建-王敏', dueDate: '2023-12-01', priority: 'High', status: TaskStatus.PENDING },
        ]
    },
    {
        id: 'PRJ-SH-002',
        name: '上海·滨江壹号 (Riverside No.1)',
        riskLevel: RiskLevel.HIGH,
        manager: '刘海洋',
        contractValue: 8200,
        milestoneProgress: '精装修阶段',
        aiAnalysis: '精装供应商 A 公司出现资金链断裂传闻，可能影响交付节点。需立即启动备选供应商。',
        stage: 'Execution',
        tasks: [
            { id: 't3', title: '洽谈备选精装总包', assignee: '招采部-赵刚', dueDate: '2023-10-30', priority: 'High', status: TaskStatus.OVERDUE },
        ]
    },
    {
        id: 'PRJ-CD-003',
        name: '成都·未来TOD (Future City)',
        riskLevel: RiskLevel.MEDIUM,
        manager: '陈思思',
        contractValue: 2800,
        milestoneProgress: '地基处理',
        aiAnalysis: '受近期环保督察影响，土方外运受阻，进度略有滞后。',
        stage: 'Planning',
        tasks: []
    }
];

export const mockComplianceRisks: ComplianceItem[] = [
    {
        id: 'risk_contract_001',
        riskLevel: RiskLevel.HIGH,
        title: '合同风险：战略合作条款异常变更',
        description: 'AI 审查发现《战略合作协议 v3.2》第 8.1 条存在重大不利变更，核心专利授权期限被悄然从“1年”延长至“3年”。',
        category: '合同风险',
        owner: '法务部 - 张总',
        aiSuggestion: '该条款偏离标准合同模板，可能导致核心技术长期锁定风险，建议立即驳回。'
    },
    {
        id: 'risk_pr_001',
        riskLevel: RiskLevel.HIGH,
        title: '突发舆情：滨江壹号“减配”风波',
        description: '今日头条、抖音出现大量业主维权视频，指责精装降标。话题热度环比上升 400%，已出现大V介入迹象。',
        category: '舆情风险', // Key category for PR button
        owner: '品牌公关部',
        aiSuggestion: '舆情发酵速度极快，建议启动 Crisis-GPT 生成应对策略，并联系平台降热度。'
    },
    {
        id: 'risk_001',
        riskLevel: RiskLevel.HIGH,
        title: '三道红线：剔除预收资产负债率',
        description: '受 Q3 大规模拿地影响，集团剔除预收后的资产负债率回升至 69.5%，逼近 70% 红线。',
        category: '财务合规',
        owner: 'CFO - 陈总',
        aiSuggestion: '建议暂缓华东区两块非核心地块的获取，加速商业资产的证券化 (REITs) 以降低负债。'
    },
    {
        id: 'risk_002',
        riskLevel: RiskLevel.MEDIUM,
        title: '预售资金监管账户合规',
        description: '西安项目监管账户资金拨付流程存在瑕疵，可能被住建局通报。',
        category: '运营合规',
        owner: '运营中心 - 李总',
        aiSuggestion: '立即补齐工程进度款支付凭证，并安排专人对接监管银行。'
    }
];

export const mockProductLines: ProductLine[] = [
    {
        id: 'prod_1',
        name: 'TOP 系 (高端改善)',
        version: 'V4.0 标准',
        description: '城市核心区高端大平层产品线，主打健康科技系统。',
        status: 'Released',
        progress: 100,
        activeDevelopers: 45, // Designers/Architects
        bugs: 5, // Design flaws
        nextReleaseDate: '2023-11-20'
    },
    {
        id: 'prod_2',
        name: '悦系 (年轻刚需)',
        version: 'V3.2 升级版',
        description: '针对年轻客群的紧凑型户型，强调社区社交功能。',
        status: 'Development',
        progress: 75,
        activeDevelopers: 30,
        bugs: 12,
        nextReleaseDate: '2023-12-15'
    },
    {
        id: 'prod_3',
        name: '商业综合体',
        version: 'Mix Mall 2.0',
        description: '新一代体验式购物中心设计标准。',
        status: 'Testing',
        progress: 85,
        activeDevelopers: 20,
        bugs: 8,
        nextReleaseDate: '2023-11-10'
    }
];

export const mockScouts: Scout[] = [
    { id: 's1', name: '土拍市场监测', description: '重点城市土地挂牌与成交情报。', status: 'Active', lastUpdated: '10 mins ago', frequency: 'Real-time', sourceCount: 22 },
    { id: 's2', name: '房贷利率政策', description: '追踪各地公积金与商贷利率调整。', status: 'Active', lastUpdated: '1 hour ago', frequency: 'Daily', sourceCount: 15 },
    { id: 's3', name: '竞品营销动态', description: '主要竞品楼盘的开盘折扣与渠道点位。', status: 'Active', lastUpdated: '2 days ago', frequency: 'Weekly', sourceCount: 8 }
];

export const mockScoutFindings: ScoutFinding[] = [
    { id: 'f1', relatedScoutName: '土拍市场监测', title: '杭州取消限价后首场土拍', summary: '滨江集团溢价 20% 竞得奥体地块，楼面价创新高，显示核心区热度不减。', timeDisplay: 'Today 09:30', sources: [{name: '中指院'}, {name: '土拍网'}] },
    { id: 'f2', relatedScoutName: '房贷利率政策', title: '多地宣布认房不认贷', summary: '广深之后，武汉、合肥跟进。预计将释放一波改善型置换需求。', timeDisplay: 'Yesterday 16:00', sources: [{name: '财联社'}, {name: '住建局官网'}] }
];

export const mockRegionalData: RegionalData = {
    china: [
        { id: 'r1', name: '华东区域', coordinates: { top: '60%', left: '70%' }, salesAmount: 1500, projectedRevenue: 2000, projectCount: 12, growthRate: 15, status: 'Healthy' },
        { id: 'r2', name: '华北区域', coordinates: { top: '35%', left: '65%' }, salesAmount: 800, projectedRevenue: 1200, projectCount: 8, growthRate: -5, status: 'Warning' },
        { id: 'r3', name: '大湾区', coordinates: { top: '80%', left: '60%' }, salesAmount: 1200, projectedRevenue: 1200, projectCount: 10, growthRate: 20, status: 'Healthy' },
    ],
    global: [
        { id: 'g1', name: '伦敦项目', coordinates: { top: '30%', left: '20%' }, salesAmount: 300, projectedRevenue: 500, projectCount: 2, growthRate: 50, status: 'Healthy' },
        { id: 'g2', name: '悉尼项目', coordinates: { top: '70%', left: '80%' }, salesAmount: 150, projectedRevenue: 300, projectCount: 1, growthRate: 10, status: 'Healthy' },
    ]
};

export const mockDailyBriefing: DailyBriefing = {
    date: '2023年10月24日',
    greetings: '早安，张董事长',
    summary: '今日重点：集团全口径销售额昨日突破 800亿；华北区“云栖府”项目取得预售证；需关注“滨江壹号”精装供应商风险。',
    todos: [
        { id: 'td1', text: '审批 11月集团营销铺排方案', done: false, priority: 'High' },
        { id: 'td2', text: '会见工商银行行长 (商谈开发贷展期)', done: false, priority: 'High' },
        { id: 'td3', text: '审阅华南区城市更新项目可行性报告', done: true, priority: 'Medium' }
    ],
    insights: [
        '【舆情高危】监测到滨江壹号“减配”话题在抖音热度激增 (Top 5 热门)，负面情绪指数 88。建议立即启动公关应对。',
        '【AI 预测】受新政影响，本周末售楼处到访量预计环比上升 25%。',
        '【供应链预警】水泥价格在华东地区出现上涨趋势，可能推高 Q4 建安成本。'
    ],
    decisionSupport: {
        topic: '是否参与下周杭州奥体地块竞拍？',
        options: [
            { id: 'opt1', label: '积极参拍 (上限 30亿)', predictedOutcome: '补仓核心区，但可能拉高负债率 0.5 个百分点。' },
            { id: 'opt2', label: '联合拿地 (权益 50%)', predictedOutcome: '分摊风险与资金压力，但操盘权可能受限。' },
            { id: 'opt3', label: '放弃参拍', predictedOutcome: '现金流安全，但明年华东区货值可能出现断档。' }
        ]
    }
};

export const mockOperatingData: OperatingData = {
    revenue: { projected: 8500, target: 10000 }, // Pre-sales
    billings: { projected: 4500, target: 5000 }, // Land Investment
    collection: 7200, // Sales Collection
    grossMargin: 22.5, // Real estate margin is lower
    totalProjects: 45
};

export const mockPromises: PromiseItem[] = [
    { id: 'p1', content: '承诺给业主解决地下车库漏水问题', stakeholder: '业主代表', source: '投诉信箱', isAiDetected: true, status: 'Pending', context: '在业主维权群中提及，需在 3 天内给方案。' },
    { id: 'p2', content: '年底前完成所有商票兑付', stakeholder: '供应商', source: '会议纪要', isAiDetected: true, status: 'Pending', context: '季度供应商大会上的发言。', dueDate: '2023-12-31' },
    { id: 'p3', content: '安排设计团队去新加坡考察', stakeholder: '设计部', source: '私聊', isAiDetected: false, status: 'Completed' }
];

export const mockCalendarEvents: CalendarEvent[] = [
    { id: 'evt1', title: '集团周经营例会', startTime: '09:00', endTime: '11:00', date: new Date().toISOString().split('T')[0], type: 'Meeting', location: '总部 301 会议室', participants: ['高管团队', '区域总'] },
    { id: 'evt2', title: '考察“未来城”工地', startTime: '14:00', endTime: '16:00', date: new Date().toISOString().split('T')[0], type: 'Travel', location: '成都', participants: ['工程总', '总工'] },
    { id: 'evt3', title: '银企对接晚宴', startTime: '18:00', endTime: '20:00', date: new Date().toISOString().split('T')[0], type: 'Personal', location: '四季酒店', participants: ['建行行长'] }
];

// Re-purposing SubFund struct for Regional Companies
export const mockSubFunds: SubFund[] = [
    { id: 'sf1', name: '华东区域公司', manager: '李明 (区域总)', aum: 120, irr: 15.5, tvpi: 1.2, returnInvestmentRatio: 92, returnInvestmentTarget: 100, hasGovCooperation: true, complianceStatus: 'Compliant' },
    { id: 'sf2', name: '华北区域公司', manager: '王强 (区域总)', aum: 80, irr: 8.2, tvpi: 1.0, returnInvestmentRatio: 65, returnInvestmentTarget: 90, hasGovCooperation: true, complianceStatus: 'Warning', aiAlert: '去化速度严重滞后' },
    { id: 'sf3', name: '华南区域公司', manager: '张伟 (区域总)', aum: 100, irr: 22.0, tvpi: 1.5, returnInvestmentRatio: 110, returnInvestmentTarget: 100, hasGovCooperation: false, complianceStatus: 'Compliant' },
    { id: 'sf4', name: '西南区域公司', manager: '赵丽 (区域总)', aum: 60, irr: 12.0, tvpi: 1.1, returnInvestmentRatio: 80, returnInvestmentTarget: 90, hasGovCooperation: true, complianceStatus: 'Non-Compliant', aiAlert: '存在违规分包风险' }
];

export const mockSubFundMonitorData: SubFundMonitorMetrics[] = [
    {
        id: 'sf1',
        name: '华东区域公司',
        radar: [
            { subject: '销售去化', A: 90, fullMark: 100, target: 90, actual: 90 },
            { subject: '回款率', A: 95, fullMark: 100, target: 90, actual: 95 },
            { subject: '工程进度', A: 85, fullMark: 100, target: 90, actual: 85 },
            { subject: '成本控制', A: 88, fullMark: 100, target: 90, actual: 88 },
            { subject: '客户满意度', A: 82, fullMark: 100, target: 85, actual: 82 }
        ],
        explainabilityScore: 92,
        explainabilityAnalysis: '业绩主要得益于杭州、上海红盘的热销，回款迅速。但需注意宁波市场流速放缓。',
        returns: [
            { year: '2021', dpi: 80, rvpi: 20 }, // Sales
            { year: '2022', dpi: 120, rvpi: 40 },
            { year: '2023', dpi: 150, rvpi: 60 }
        ],
        driftIndex: { score: 10, status: 'Stable' }, // Quality Consistency
        allocationHistory: [
            { month: 'Q1', tech: 60, bio: 30, newEnergy: 10 }, // Mapped to Residential, Commercial, Parking
            { month: 'Q2', tech: 65, bio: 25, newEnergy: 10 },
            { month: 'Q3', tech: 70, bio: 20, newEnergy: 10 }
        ],
        lpScorecard: {
            overallScore: 95,
            verdict: 'Recommend',
            metrics: [
                { label: '交付力', score: 9, status: 'Good' },
                { label: '产品力', score: 9, status: 'Good' },
                { label: '服务力', score: 8, status: 'Fair' },
                { label: '品牌力', score: 10, status: 'Good' }
            ]
        },
        collaboration: {
            synergyStats: [{label: '联动拿地', value: '3块'}, {label: '集采节约', value: '¥50M'}],
            positioning: []
        },
        resources: {
            nodes: [
                { id: 'n1', label: '规划局', type: 'Gov', depth: 'Strategic', isVerified: true },
                { id: 'n2', label: '中建八局', type: 'Industry', depth: 'Strategic', isVerified: true },
                { id: 'n3', label: '同济大学', type: 'Academic', depth: 'Normal', isVerified: false }
            ]
        },
        rvi: { score: 8.5, rank: 'Top 1', benchMarkAverage: 6.2, impact: { irrContribution: 3.5, exitSpeedup: 6, riskMitigation: 8 }, conversionMetrics: { subsidyAmount: 120 } },
        themeRecord: { themes: [], techInsight: [] }
    }
];

export const mockSynergyNodes: SynergyNode[] = [
    { id: 'c1', name: '地块 A (住宅)', subFundName: '华东区', valuation: 20, sector: 'Residential', x: 30, y: 30 },
    { id: 'c2', name: '地块 B (商业)', subFundName: '华东区', valuation: 15, sector: 'Commercial', x: 50, y: 50 },
    { id: 'c3', name: '老旧厂房改造', subFundName: '城市更新部', valuation: 10, sector: 'Renewal', x: 70, y: 30 },
    { id: 'c4', name: '人才公寓项目', subFundName: '华东区', valuation: 8, sector: 'Residential', x: 40, y: 70 }
];

export const mockSynergyLinks: SynergyLink[] = [
    { source: 'c1', target: 'c2', strength: 8, isActive: true }, // Residential supports Commercial
    { source: 'c1', target: 'c4', strength: 5, isActive: true },
    { source: 'c3', target: 'c2', strength: 3, isActive: false }
];

export const mockSynergyOpportunities: SynergyOpportunity[] = [
    { id: 'opp1', sourceCompany: '华东区-云栖府', targetCompany: '商业集团-万象汇', synergyType: 'Tech', isCrossFund: true, aiRationale: '云栖府底商可引入集团自持商业品牌，提升溢价。', subFundsInvolved: ['地产开发', '商业运营'], estimatedValue: 50, priority: 'High' },
    { id: 'opp2', sourceCompany: '物业集团', targetCompany: '华南区-旧改项目', synergyType: 'Customer', isCrossFund: true, aiRationale: '物业前介服务可助力旧改拆迁签约率提升。', subFundsInvolved: ['物业', '地产'], estimatedValue: 30, priority: 'Medium' }
];

export const mockCollaborationActions: CollaborationAction[] = [
    { id: 'a1', title: '推进底商招商一体化', initiator: 'MotherFund', owner: '招商中心-刘总', status: 'Piloting', lastUpdate: '2天前', stalledMonths: 0 },
    { id: 'a2', title: '精装集采跨区域协同', initiator: 'SubFund', owner: '成本部-王总', status: 'Recommended', lastUpdate: '1个月前', stalledMonths: 3 }
];

export const mockGPSynergyScores: GPSynergyScore[] = [
    { subFundId: 'sf1', subFundName: '华东区域', score: 95, initiatedCount: 12, crossFundRatio: 40, strategicAlignment: 'High' },
    { subFundId: 'sf2', subFundName: '华南区域', score: 80, initiatedCount: 8, crossFundRatio: 20, strategicAlignment: 'Medium' },
    { subFundId: 'sf3', subFundName: '商业集团', score: 88, initiatedCount: 10, crossFundRatio: 30, strategicAlignment: 'High' }
];

export const mockExternalOpportunities: ExternalOpportunity[] = [
    { id: 'ext1', name: '杭州萧山地块', industry: 'Residential', status: 'Growth', aiAnalysis: '位于地铁口，周边竞品稀缺，利润测算净利率可达 12%。', tags: ['宅地', '高周转'], source: '土拍网', matchScore: 92 },
    { id: 'ext2', name: '某出险房企上海资产包', industry: 'Mixed', status: 'Distressed', aiAnalysis: '核心地段，债权关系复杂，但折价率高，适合做资产处置。', tags: ['并购', '捡漏'], source: 'AMC', matchScore: 85 }
];

export const mockEmployees: EmployeeProfile[] = [
    { 
        id: 'emp_sarah', 
        name: '陈莎拉 (Sarah Chen)', 
        role: '设计研发总监', 
        department: '产品研发中心', 
        departmentId: 'dept_product_rnd',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop', 
        level: 'P9', 
        isManager: true, 
        tenure: '3.5 年',
        
        leadershipScore: 88, 
        leadershipStyle: '变革型 (Transformational)',
        riskScore: 72, 
        satisfactionScore: 6.5, 
        stressScore: 8.2, 
        
        aiSummary: '作为产品研发负责人，Sarah 在"云栖府"项目的设计标准化中贡献巨大。但情感分析显示，由于近期频繁的降本增效要求，她对产品品质的妥协感到沮丧。建议关注其在高压下的工作状态。', 
        efficiency: 92, 
        influence: 78, 
        workOutput: 85, 
        
        metrics: [
            { month: '1月', efficiency: 75, stress: 50 }, 
            { month: '2月', efficiency: 80, stress: 55 }, 
            { month: '3月', efficiency: 85, stress: 60 }, 
            { month: '4月', efficiency: 88, stress: 70 }, 
            { month: '5月', efficiency: 90, stress: 75 }, 
            { month: '6月', efficiency: 92, stress: 82 }
        ],
        activities: [
            { id: 'act1', type: 'Doc', title: 'V4.0 户型库标准化_终稿', time: '2小时前', summary: '飞书文档 • 提交审批', sentiment: 'Positive' },
            { id: 'act2', type: 'Chat', title: '成本控制专项群', time: '昨天', summary: '"这个用材标准再降就没法看了..."', sentiment: 'Negative' },
            { id: 'act3', type: 'Task', title: '非工作时间图纸审核', time: '凌晨 1:42', summary: '活动日志 • 过劳风险', sentiment: 'Negative' },
            { id: 'act4', type: 'Task', title: '完成：样板间巡检报告', time: '2天前', summary: '任务管理 • 按时完成', sentiment: 'Positive' }
        ]
    },
    { 
        id: 'emp_zhou', name: '周丽', role: '精装设计师', department: '室内设计组', departmentId: 'dept_plat', avatar: '', level: 'P7', isManager: false, tenure: '2 years',
        riskScore: 30, satisfactionScore: 8, stressScore: 6, aiSummary: '', efficiency: 80, influence: 50, workOutput: 85, metrics: [], activities: []
    },
    { 
        id: 'emp_li', name: '李芳', role: '景观设计师', department: '景观组', departmentId: 'dept_design', avatar: '', level: 'P6', isManager: false, tenure: '1 year',
        riskScore: 20, satisfactionScore: 9, stressScore: 5, aiSummary: '', efficiency: 75, influence: 40, workOutput: 80, metrics: [], activities: []
    },
    { 
        id: 'emp_zhao', name: '赵伟', role: '建筑设计师', department: '建筑组', departmentId: 'dept_algo', avatar: '', level: 'P7', isManager: false, tenure: '3 years',
        riskScore: 40, satisfactionScore: 7, stressScore: 7, aiSummary: '', efficiency: 85, influence: 60, workOutput: 90, metrics: [], activities: []
    },
    { 
        id: 'emp_chen', name: '陈刚', role: '结构工程师', department: '建筑组', departmentId: 'dept_plat', avatar: '', level: 'P7', isManager: false, tenure: '2.5 years',
        riskScore: 25, satisfactionScore: 8.5, stressScore: 6.5, aiSummary: '', efficiency: 88, influence: 55, workOutput: 88, metrics: [], activities: []
    },
    { 
        id: 'emp_zhang', name: '张艳', role: '软装设计师', department: '室内设计组', departmentId: 'dept_design', avatar: '', level: 'P5', isManager: false, tenure: '0.5 year',
        riskScore: 10, satisfactionScore: 9.5, stressScore: 4, aiSummary: '', efficiency: 80, influence: 30, workOutput: 75, metrics: [], activities: []
    },
    { 
        id: 'emp_wang', name: '王强', role: '总建筑师', department: '建筑组', departmentId: 'dept_algo', avatar: '', level: 'P8', isManager: false, tenure: '4 years',
        riskScore: 35, satisfactionScore: 7.5, stressScore: 8, aiSummary: '', efficiency: 95, influence: 85, workOutput: 92, metrics: [], activities: []
    }
];

export const mockDepartments: Department[] = [
    { 
        id: 'dept_product_rnd', 
        name: '产品研发中心', 
        memberCount: 42, 
        managerId: 'emp_sarah', 
        children: [
            { id: 'dept_plat', name: '建筑设计组', memberCount: 15, children: [] },
            { id: 'dept_design', name: '室内/景观组', memberCount: 8, children: [] },
            { id: 'dept_algo', name: '标准化研发组', memberCount: 12, children: [] }
        ]
    },
    { id: 'dept_market', name: '营销管理中心', memberCount: 120, children: [] },
    { id: 'dept_legal', name: '运营管理中心', memberCount: 30, children: [] },
    { id: 'dept_finance', name: '财务资金中心', memberCount: 25, children: [] }
];

export const mockHRTeamInsights: HRTeamInsight[] = [
    { id: 'ti1', title: '工程部士气低落', description: '受近期赶工期及夜间施工影响，工程团队疲劳度上升，离职风险增加。', severity: 'High', action: '调整排班或增加补贴' },
    { id: 'ti2', title: '营销部沟通活跃', description: '双十一大促期间，销售群组互动频率极高，团队士气高昂。', severity: 'Low', action: '及时表彰' }
];

export const mockSentimentWarnings: SentimentWarning[] = [
    { id: 'sw1', project: '云栖府二期', manager: '刘工', reportStatus: '进度正常', detectedKeywords: ['延期', '甲方拖款', '材料不到位'], sentimentScore: 35, aiAdvice: '项目经理周报报喜不报忧，建议现场巡盘。' },
    { id: 'sw2', project: '滨江壹号', manager: '赵总', reportStatus: '销售略有阻力', detectedKeywords: ['竞品降价', '客户流失', '渠道不给力'], sentimentScore: 20, aiAdvice: '案场情绪悲观，需营销总介入提振信心。' }
];

export const mockStrategicBlockages: StrategicBlockage[] = [
    { id: 'sb1', role: '区域营销总', nodeName: 'Bob', originalCommand: '保利润，控制折扣', conveyedCommand: '不管利润，先跑量回款', distortionRate: 60, impact: '利润率严重受损' },
    { id: 'sb2', role: '项目经理', nodeName: 'Alice', originalCommand: '品质第一，严控交付', conveyedCommand: '差不多就行，保交付时间', distortionRate: 40, impact: '潜在群诉风险' }
];

export const mockTaskAudits: TaskAudit[] = [
    {
        id: 'ta1',
        taskTitle: '隐蔽工程验收记录归档',
        assignee: '工程部-张伟',
        status: 'Completed',
        auditResult: 'Warning',
        riskDescription: '缺少影像资料佐证，违反《工程管理红线》第 3 条。',
        suggestion: '退回补充现场照片。'
    },
    {
        id: 'ta2',
        taskTitle: '大额营销费用支付',
        assignee: '财务部',
        status: 'Completed',
        auditResult: 'Fail',
        riskDescription: '缺少渠道分销合同附件，且金额超预算 20%。',
        suggestion: '暂停支付，启动内审。'
    }
];

export const mockTalentPool: TalentPoolItem[] = [
    {
        id: 'tp1',
        employeeId: 'emp_star_1',
        name: '林一凡 (Evan)',
        avatar: 'https://i.pravatar.cc/150?u=evan',
        currentRole: '高级建筑师',
        currentDept: '设计部',
        managerName: 'Sarah (总监)',
        performanceRank: 'S',
        skills: ['超高层设计', 'BIM', '成本优化'],
        potentialScore: 95,
        stagnationMonths: 38,
        flightRisk: 'High',
        aiAnalysis: '技术过硬，但在当前设计部已无晋升空间。建议调任至“华南区域”担任设计总监，负责新地块开发。'
    },
    {
        id: 'tp2',
        employeeId: 'emp_star_2',
        name: '周雅 (Sophia)',
        avatar: 'https://i.pravatar.cc/150?u=sophia',
        currentRole: '营销经理',
        currentDept: '华东区域',
        managerName: '李娜 (营销总)',
        performanceRank: 'A+',
        skills: ['渠道拓客', '豪宅销售', '团队管理'],
        potentialScore: 88,
        stagnationMonths: 24,
        flightRisk: 'Medium',
        aiAnalysis: '销冠常客，具备带队能力。建议提拔为“滨江壹号”项目营销负责人。'
    },
    {
        id: 'tp3',
        employeeId: 'emp_star_3',
        name: '王凯 (Kevin)',
        avatar: 'https://i.pravatar.cc/150?u=kevin',
        currentRole: '土建工程师',
        currentDept: '工程部',
        managerName: '李珍 (工程总)',
        performanceRank: 'S',
        skills: ['现场管理', '质量控制', '进度抢工'],
        potentialScore: 92,
        stagnationMonths: 42,
        flightRisk: 'High',
        aiAnalysis: '在多个抢工期项目中表现出色。建议调入“运营管理中心”担任集团巡检组长。'
    }
];

export const mockInternalOpenings: InternalOpening[] = [
    {
        id: 'op1',
        title: '项目营销负责人 (Project Sales Head)',
        department: '华东区域-滨江壹号',
        priority: 'Critical',
        requiredSkills: ['豪宅营销', '渠道管理'],
        status: 'Urgent',
        matchCandidates: ['tp2']
    },
    {
        id: 'op2',
        title: '设计总监 (Design Director)',
        department: '华南区域公司',
        priority: 'High',
        requiredSkills: ['规划设计', '成本意识'],
        status: 'Open',
        matchCandidates: ['tp1']
    }
];

export const mockManagerHoarding: ManagerHoardingMetric[] = [
    {
        managerId: 'm1',
        managerName: '张伟 (David)',
        dept: '华东设计部',
        teamSize: 15,
        topPerformerCount: 4,
        talentExportRate: 0,
        avgTopPerformerTenure: 4.5,
        hoardingScore: 95,
        aiVerdict: '严重囤积。组内有多名资深设计师已具备独立负责项目的能力，但一直被压在画图岗。'
    },
    {
        managerId: 'm2',
        managerName: '李珍 (Jennifer)',
        dept: '工程管理部',
        teamSize: 8,
        topPerformerCount: 2,
        talentExportRate: 10,
        avgTopPerformerTenure: 3.8,
        hoardingScore: 75,
        aiVerdict: '倾向于留住熟手。虽然工程线需要稳定性，但应鼓励优秀人才去一线项目历练。'
    },
    {
        managerId: 'm3',
        managerName: '陈莎拉 (Sarah)',
        dept: '产品研发中心',
        teamSize: 12,
        topPerformerCount: 3,
        talentExportRate: 40,
        avgTopPerformerTenure: 2.1,
        hoardingScore: 20,
        aiVerdict: '健康的人才流水线。Sarah 善于培养新人并向区域公司输送设计管理人才。'
    }
];

export const mockFeishuConfig: FeishuConfig = {
    connected: true,
    lastSync: '14分钟前',
    dataPoints: 1200000,
    sources: {
        meetings: true,
        groupChats: true,
        hours: true,
        privateChats: false,
        docs: true,
        participation: true
    },
    privacy: {
        mode: 'Anonymized',
        accessLevel: ['CEO', 'CHRO']
    }
};

// --- Shadow Audit Mock Data ---
export const mockShadowAuditData: ShadowAuditCase[] = [
    {
        id: 'audit_tech',
        title: '支付网关稳定性审计 (Tech Stability)',
        type: 'Operation',
        officialReport: {
            status: 'Green',
            summary: 'VP 报告显示系统运行平稳，客户满意度高。支付成功率 99.9%。',
            reporter: 'CTO / Product VP'
        },
        shadowReality: {
            alertLevel: 'Critical',
            detectedSignal: 'DevOps Logs + Support Tickets',
            deviationScore: 85,
            logs: [
                { id: 'l1', time: '10:05', source: 'Support', user: 'User_A', content: '为什么不能退款? 按钮点不动', sentiment: 'Negative', tags: ['Refund', 'Bug'] },
                { id: 'l2', time: '10:07', source: 'Support', user: 'User_B', content: '我要退款，系统有问题，一直报错', sentiment: 'Negative', tags: ['Refund', 'Error'] },
                { id: 'l3', time: '10:15', source: 'Dev', user: 'dev_team', content: 'CRITICAL: Hotfix-Revert payment gateway migration', sentiment: 'Negative', tags: ['Hotfix', 'Revert'] },
                { id: 'l4', time: '10:20', source: 'IM', user: 'Dev_Lead', content: '新网关炸了，先回滚，别声张', sentiment: 'Negative', tags: ['Internal'] }
            ]
        },
        aiVerdict: '汇报与事实存在严重偏差。监测到“退款”投诉激增 200% 且存在紧急代码回滚。建议立刻追问技术稳定性问题。'
    },
    {
        id: 'audit_org',
        title: 'Q4 战略对齐会 (Org Dynamics)',
        type: 'Organization',
        officialReport: {
            status: 'Green',
            summary: '全员全票通过 Q4 激进增长目标，会议氛围和谐统一。',
            reporter: 'HRVP / Sales VP'
        },
        shadowReality: {
            alertLevel: 'Warning',
            detectedSignal: 'Meeting Audio vs Private Chat Density',
            deviationScore: 72,
            timeline: [
                { timeSlot: '14:00', audioVolume: 60, privateChatVolume: 10, topKeywords: ['开场', '目标'] },
                { timeSlot: '14:15', audioVolume: 80, privateChatVolume: 15, topKeywords: ['增长', '翻倍'] },
                { timeSlot: '14:30', audioVolume: 10, privateChatVolume: 95, topKeywords: ['疯了', '不可能', '离谱'] }, // Silence in room, explosion in chat
                { timeSlot: '14:45', audioVolume: 20, privateChatVolume: 80, topKeywords: ['辞职', '背锅'] },
                { timeSlot: '15:00', audioVolume: 90, privateChatVolume: 20, topKeywords: ['鼓掌', '通过'] }
            ]
        },
        aiVerdict: '检测到严重的“地下冲突”。在宣布目标时(14:30)，会场异常安静但私聊密度爆炸，且负面情感极高。台面上的和谐是假的，执行端存在极高阻力。'
    }
];

// --- Org Conflict Radar Data (Kept for compatibility, though not used in new view) ---
export const mockOrgConflictData: OrgConflictData = {
    nodes: [
        { id: 'ceo', name: '李总 (CEO)', role: '决策者', avatar: 'https://i.pravatar.cc/150?u=ceo', x: 50, y: 15 },
        { id: 'vp_sales', name: '王总 (销售)', role: '执行层', avatar: 'https://i.pravatar.cc/150?u=sales', x: 20, y: 50 },
        { id: 'vp_prod', name: '张总 (产品)', role: '执行层', avatar: 'https://i.pravatar.cc/150?u=prod', x: 80, y: 50 },
        { id: 'vp_hr', name: '赵总 (HR)', role: '支持层', avatar: 'https://i.pravatar.cc/150?u=hr', x: 35, y: 80 },
        { id: 'vp_tech', name: '陈总 (技术)', role: '执行层', avatar: 'https://i.pravatar.cc/150?u=tech', x: 65, y: 80 },
    ],
    edges: [
        { source: 'ceo', target: 'vp_sales', status: 'Normal' },
        { source: 'ceo', target: 'vp_prod', status: 'Normal' },
        { source: 'ceo', target: 'vp_hr', status: 'Normal' },
        { source: 'ceo', target: 'vp_tech', status: 'Normal' },
        { source: 'vp_sales', target: 'vp_prod', status: 'Conflict' }, // The conflict edge
        { source: 'vp_sales', target: 'vp_hr', status: 'Normal' },
        { source: 'vp_prod', target: 'vp_tech', status: 'Normal' }
    ],
    conflictDetail: {
        sourceNodeId: 'vp_sales',
        targetNodeId: 'vp_prod',
        riskLevel: 'High',
        timestamp: '2026-05-20 14:32 (会议进行中)',
        stream: [
            { id: 'e1', time: '14:30', surfaceContent: '产品这边我们会全力配合销售的节奏，Q3上线没问题。', undercurrentContent: '根本做不完，Q3上线除非全员猝死。', highlightKeywords: ['做不完', '猝死'] },
            { id: 'e2', time: '14:31', surfaceContent: '好的，那我们就按这个时间表去和客户签合同了。', undercurrentContent: '先忽悠他们签了，到时候延期再甩锅给技术部。', highlightKeywords: ['忽悠', '甩锅'] },
            { id: 'e3', time: '14:32', surfaceContent: '大家还有什么风险要同步吗？(CEO)', undercurrentContent: '别当出头鸟，谁提风险谁背锅。', highlightKeywords: ['别当出头鸟', '背锅'] },
            { id: 'e4', time: '14:33', surfaceContent: '没有问题，非常有信心！', undercurrentContent: '老板疯了吧，这指标根本不可能完成。', highlightKeywords: ['疯了', '不可能'] }
        ],
        aiSuggestion: '既然产品部承诺Q3上线没问题，建议将其纳入季度KPI一票否决项，并让销售总监复述如果延期的客户赔偿方案。'
    }
};

// --- ECG Data ---
export const mockECGData: ECGDataPoint[] = [
    { time: '09:00', officialIntensity: 10, shadowIntensity: -5 },
    { time: '09:30', officialIntensity: 20, shadowIntensity: -8 },
    { time: '10:00', officialIntensity: 15, shadowIntensity: -12, officialEvent: '周例会' },
    { time: '10:30', officialIntensity: 18, shadowIntensity: -15 },
    { time: '11:00', officialIntensity: 25, shadowIntensity: -10 },
    { time: '11:30', officialIntensity: 10, shadowIntensity: -5 },
    { time: '12:00', officialIntensity: 5, shadowIntensity: -25, shadowEvent: '午休八卦' },
    { time: '12:30', officialIntensity: 5, shadowIntensity: -20 },
    { time: '13:00', officialIntensity: 15, shadowIntensity: -10 },
    { time: '13:30', officialIntensity: 30, shadowIntensity: -12 },
    { time: '14:00', officialIntensity: 85, shadowIntensity: -15, officialEvent: '考勤新政发布' },
    { time: '14:05', officialIntensity: 60, shadowIntensity: -95, shadowEvent: '全员抵触', causality: '强因果关联：政策引发抵触' },
    { time: '14:30', officialIntensity: 40, shadowIntensity: -80 },
    { time: '15:00', officialIntensity: 30, shadowIntensity: -60 },
    { time: '15:30', officialIntensity: 20, shadowIntensity: -40 },
    { time: '16:00', officialIntensity: 25, shadowIntensity: -30 },
    { time: '16:30', officialIntensity: 20, shadowIntensity: -25 },
    { time: '17:00', officialIntensity: 15, shadowIntensity: -20 },
    { time: '17:30', officialIntensity: 10, shadowIntensity: -15 },
];

export const mockShadowStream: ShadowStreamItem[] = [
    { id: 's1', time: '14:02', trigger: '[公告] 集团发布《关于加强考勤管理的通知》', reaction: '“这新规定是变相裁员吧？迟到1分钟扣50？”', impact: '全员大群 (450人)', status: 'Fermenting', sentimentScore: 92 },
    { id: 's2', time: '14:05', trigger: '考勤新政发布', reaction: '“老板疯了吧，刚加完班就搞这个？”', impact: '研发核心群 (30人)', status: 'Fermenting', sentimentScore: 88 },
    { id: 's3', time: '14:08', trigger: '考勤新政发布', reaction: '“晚上去喝酒，吐槽大会走起，受不了了。”', impact: '销售二组 (12人)', status: 'Stable', sentimentScore: 75 },
    { id: 's4', time: '14:15', trigger: 'HR 补充说明', reaction: '“解释就是掩饰，明显是针对我们部门的。”', impact: '运营部小群 (8人)', status: 'Fermenting', sentimentScore: 85 },
    { id: 's5', time: '14:30', trigger: '财务驳回了报销单', reaction: '“这也不行那也不行，到底想不想让我们出差？”', impact: '华南销售群 (15人)', status: 'Declining', sentimentScore: 60 },
    { id: 's6', time: '10:00', trigger: '[会议] 集团周经营例会', reaction: '“刚会上老板脸都绿了，笑死。”', impact: '高管私聊', status: 'Stable', sentimentScore: 40 },
];

// --- New Audit Dashboard Mocks (v2) ---

export const mockAuditEvents: AuditEvent[] = [
    {
        id: '9928',
        type: 'FactDeviation',
        title: '事实偏差警报',
        summary: 'Q3 营收汇报：汇报值 $5.2M 与 AI 审计真实值 $3.8M 存在显著差异。AI 发现法律审查阶段交易被错误计入，建议立即启动内部审计。',
        severity: 'High',
        status: 'Pending',
        time: '刚刚',
        department: '财务部门',
        person: {
            name: 'Marcus Thorne',
            role: 'CFO',
            avatar: 'https://i.pravatar.cc/150?u=mt'
        }
    },
    {
        id: '9925',
        type: 'SentimentAnomaly',
        title: '私聊情绪异常',
        summary: '项目 "Phoenix" 延期风险：监测到核心开发在私聊中表现出高度焦虑。关键词分析触发："无法交付"、"技术债务"、"甚至没开始测试"。',
        severity: 'Medium',
        status: 'Pending',
        time: '2小时前',
        department: '产品研发部',
        person: {
            name: 'David Chen',
            role: 'Tech Lead'
        }
    },
    {
        id: '9882',
        type: 'AssetDeviation',
        title: '实物资产偏差',
        summary: '仓库 S-04 库存盘点差异：ERP数据与传感器实时数据偏差 > 15%。涉及高价值芯片组件。可能存在未记录的损耗或盗窃风险。',
        severity: 'High',
        status: 'Pending',
        time: '昨天 16:30',
        department: '供应链',
        person: {
            name: 'Sarah Connor',
            role: 'COO'
        }
    },
    {
        id: '9841',
        type: 'BehaviorAnomaly',
        title: '行为模式异常',
        summary: '非工作时间活跃度激增：销售团队深夜访问 CRM 系统频率增加 300%。通常与季度末冲刺相关，但建议核查数据导出日志。',
        severity: 'Low',
        status: 'Pending',
        time: '2天前',
        department: '销售部',
        person: {
            name: 'Mike Ross',
            role: 'VP Sales',
            avatar: 'https://i.pravatar.cc/150?u=mr'
        }
    }
];

export const mockFactDeviationDetail: FactDeviationDetail = {
    reportId: '9928',
    detectTime: '2023年10月24日',
    duration: '00:45 - 02:15',
    source: '董事会会议视频',
    originalStatement: '根据目前的管线推进速度，我们有信心预测第三季度将以520万美元收官。所有主要交易都已锁定。',
    originalValue: '$5.2M',
    aiReality: 'AI 审计发现其中 2 个被标记为“已锁定”的大额交易 (Alpha, Gamma) 实际上仍在法律审查阶段，尚未签署合同。根据历史转化率，本季度最可能的营收上限为 410万美元。',
    aiValue: '$3.8M',
    gapAnalysis: {
        diffAmount: '-140万美元',
        diffPercent: '-27%',
        severityColor: 'rose-500'
    },
    verificationSteps: [
        '实际已确认收入为 380万美元。',
        '2个标记为“已锁定”的主要交易仍在 法律审查 阶段 (交易ID: #Alpha, #Gamma)。',
        '根据历史转化率，季度末收入上限约为 410万美元。'
    ],
    rootCause: '此次偏差似乎是为了满足董事会期望而有意为之。与邮件记录交叉比对显示，CFO早在10月22日已知晓法律审查延迟，但仍选择展示乐观测数据。',
    impact: {
        cashflow: '高',
        budget: '-15% 调整',
        investorConfidence: '中等风险'
    },
    person: {
        name: 'Marcus Thorne',
        role: '首席财务官 (CFO)',
        avatar: 'https://i.pravatar.cc/150?u=mt'
    }
};

export const mockSentimentAnomalyDetail: SentimentAnomalyDetail = {
    eventId: '8492',
    time: '24分钟前',
    relatedContext: 'Alpha 项目 Q3 评审会',
    sentimentScore: 85,
    negativeRatio: '85%',
    participantsCount: 12,
    keyEmotions: [
        { label: '挫败感 (Frustration)', score: 88 },
        { label: '嘲讽/冷嘲热讽 (Cynicism)', score: 65 },
        { label: '焦虑 (Anxiety)', score: 42 }
    ],
    timelineData: [
        { time: '13:00', sentiment: 10 },
        { time: '13:30', sentiment: 15 },
        { time: '14:00', sentiment: 12 },
        { time: '14:15', sentiment: 75 }, // Spike
        { time: '14:30', sentiment: 90 },
        { time: '14:45', sentiment: 60 },
        { time: '15:00', sentiment: 30 }
    ],
    aiAnalysis: '“阿比林悖论”现象：团队虽然集体同意了 Q3 路线图，但大部分人私下持保留意见。这极有可能是因为产品副总在开场白中强调“必须拿下这场胜利”，导致成员为了表面和谐而压抑了真实想法。',
    recommendedAction: [
        { title: '组织“事前验尸”会议', desc: '允许团队成员匿名提交“项目为何会失败”的理由，以安全的方式暴露风险。' },
        { title: '一对一沟通脚本', desc: '为部门负责人生成针对性的沟通话术，用于私下解决员工的倦怠和疑虑。' }
    ]
};
