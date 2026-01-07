
export type AppMode = 'BI' | 'AI';
export type AIContext = 'matters' | 'people';
export type AIComponentType = 'RevenueChart' | 'RiskCard' | 'ScheduleCard' | 'ProjectFlowchart' | 'HeadcountChart' | 'WorkloadCard' | 'OrgChart' | 'Other';

export interface AIComponentItem {
    id: string;
    type: AIComponentType;
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export enum RiskLevel {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export enum TaskStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    OVERDUE = 'Overdue'
}

export type ProjectStage = 'Initiation' | 'Planning' | 'Execution' | 'Monitoring' | 'Closure';

export interface Task {
    id: string;
    title: string;
    assignee: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    status: TaskStatus;
}

export interface Project {
    id: string;
    name: string;
    riskLevel: RiskLevel;
    manager: string;
    contractValue: number;
    milestoneProgress: string;
    aiAnalysis: string;
    tasks: Task[];
    stage: ProjectStage;
}

export interface MonthlyData {
    month: string;
    revenue: number;
    target: number;
    profit: number;
    cost: number;
    collected: number;
    receivables: number;
}

export interface ProductLine {
    id: string;
    name: string;
    version: string;
    description: string;
    status: 'Development' | 'Testing' | 'Released' | 'Planning';
    progress: number;
    activeDevelopers: number;
    bugs: number;
    nextReleaseDate: string;
}

export interface ComplianceItem {
    id: string;
    riskLevel: RiskLevel;
    title: string;
    description: string;
    category: string;
    owner: string;
    aiSuggestion: string;
}

export type ScoutStatus = 'Active' | 'Paused' | 'Done';

export interface Scout {
    id: string;
    name: string;
    description: string;
    status: ScoutStatus;
    lastUpdated: string;
    frequency: string;
    sourceCount: number;
}

export interface ScoutFinding {
    id: string;
    relatedScoutName: string;
    title: string;
    summary: string;
    timeDisplay: string;
    sources: { name: string }[];
}

export interface RegionMetric {
    id: string;
    name: string;
    coordinates: { top: string; left: string };
    salesAmount: number;
    projectedRevenue: number;
    projectCount: number;
    growthRate: number;
    status: 'Healthy' | 'Warning' | 'Critical';
}

export interface RegionalData {
    china: RegionMetric[];
    global: RegionMetric[];
}

export interface DailyBriefing {
    date: string;
    greetings: string;
    summary: string;
    todos: { id: string; text: string; done: boolean; priority: string }[];
    insights: string[];
    decisionSupport?: {
        topic: string;
        options: { id: string; label: string; predictedOutcome: string }[];
    };
}

export interface OperatingData {
    revenue: { projected: number; target: number };
    billings: { projected: number; target: number };
    collection: number;
    grossMargin: number;
    totalProjects: number;
}

export interface PromiseItem {
    id: string;
    content: string;
    stakeholder: string;
    source: string;
    isAiDetected: boolean;
    status: 'Pending' | 'Completed';
    context?: string;
    dueDate?: string;
}

export type EventType = 'Meeting' | 'Review' | 'Board' | 'Travel' | 'Personal';

export interface CalendarEvent {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    date: string;
    type: EventType;
    location: string;
    participants: string[];
    description?: string;
}

export interface SubFund {
    id: string;
    name: string;
    manager: string;
    aum: number;
    irr: number;
    tvpi: number;
    returnInvestmentRatio: number; // Percentage
    returnInvestmentTarget: number;
    hasGovCooperation: boolean;
    complianceStatus: 'Compliant' | 'Warning' | 'Non-Compliant';
    aiAlert?: string;
}

export interface SubFundMonitorMetrics {
    id: string;
    name: string;
    radar: { subject: string; A: number; fullMark: number; target: number; actual: number }[];
    explainabilityScore: number;
    explainabilityAnalysis: string;
    returns: { year: string; dpi: number; rvpi: number }[];
    driftIndex: { score: number; status: 'Stable' | 'Warning' | 'Breach' };
    allocationHistory: { month: string; tech: number; bio: number; newEnergy: number }[];
    lpScorecard: { overallScore: number; verdict: 'Recommend' | 'Watch' | 'Exit'; metrics: { label: string; score: number; status: 'Good' | 'Fair' | 'Poor' }[] };
    collaboration: { synergyStats: { label: string; value: string }[]; positioning: { x: number; y: number; z: number; type: string }[] };
    resources: { nodes: { id: string; label: string; type: string; depth: string; isVerified: boolean }[] };
    rvi: { score: number; rank: string; benchMarkAverage: number; impact: { irrContribution: number; exitSpeedup: number; riskMitigation: number }; conversionMetrics: { subsidyAmount: number } };
    themeRecord: { themes: { name: string; period: string; project: string; timing: 'Early' | 'Sync' | 'Late' }[]; techInsight: { trend: string; leadTime: string; result: string }[] };
}

export interface SynergyNode {
    id: string;
    name: string;
    subFundName: string;
    valuation: number;
    sector: string;
    x: number;
    y: number;
}

export interface SynergyLink {
    source: string;
    target: string;
    strength: number;
    isActive: boolean;
}

export interface SynergyOpportunity {
    id: string;
    sourceCompany: string;
    targetCompany: string;
    synergyType: 'SupplyChain' | 'Tech' | 'Customer';
    isCrossFund: boolean;
    aiRationale: string;
    subFundsInvolved: string[];
    estimatedValue: number;
    priority: 'High' | 'Medium' | 'Low';
}

export interface CollaborationAction {
    id: string;
    title: string;
    initiator: 'MotherFund' | 'SubFund';
    owner: string;
    status: 'Recommended' | 'Contacted' | 'Piloting' | 'Cooperating';
    lastUpdate: string;
    stalledMonths: number;
}

export interface GPSynergyScore {
    subFundId: string;
    subFundName: string;
    score: number;
    initiatedCount: number;
    crossFundRatio: number;
    strategicAlignment: 'High' | 'Medium' | 'Low';
}

export interface ExternalOpportunity {
    id: string;
    name: string;
    industry: string;
    status: 'Growth' | 'Distressed' | 'Undervalued';
    aiAnalysis: string;
    tags: string[];
    source: string;
    matchScore: number;
}

export interface EmployeeProfile {
    id: string;
    name: string;
    role: string;
    department: string;
    departmentId: string;
    avatar: string;
    level: string;
    isManager: boolean;
    tenure: string;
    
    // Scores
    leadershipScore?: number;
    leadershipStyle?: string;
    riskScore: number;
    satisfactionScore: number;
    stressScore: number;
    
    // AI Analysis
    aiSummary: string;
    efficiency: number;
    influence: number;
    workOutput: number;
    
    // Charts
    metrics: { month: string; efficiency: number; stress: number }[];
    
    // Activity Feed
    activities: { id: string; type: 'Doc' | 'Chat' | 'Task'; title: string; time: string; summary: string; sentiment: 'Positive' | 'Neutral' | 'Negative' }[];
}

export interface HRTeamInsight {
    id: string;
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    action: string;
}

export interface Department {
    id: string;
    name: string;
    memberCount: number;
    children?: Department[];
    managerId?: string;
}

export interface SentimentWarning {
    id: string;
    project: string;
    manager: string;
    reportStatus: string;
    detectedKeywords: string[];
    sentimentScore: number;
    aiAdvice: string;
}

export interface StrategicBlockage {
    id: string;
    role: string;
    nodeName: string;
    originalCommand: string;
    conveyedCommand: string;
    distortionRate: number;
    impact: string;
}

export interface TaskAudit {
    id: string;
    taskTitle: string;
    assignee: string;
    status: 'Completed' | 'In Progress';
    auditResult: 'Pass' | 'Fail' | 'Warning';
    riskDescription: string;
    suggestion: string;
}

export interface TalentPoolItem {
    id: string;
    employeeId: string;
    name: string;
    avatar: string;
    currentRole: string;
    currentDept: string;
    managerName: string;
    performanceRank: 'S' | 'A+';
    skills: string[];
    potentialScore: number;
    stagnationMonths: number;
    flightRisk: 'High' | 'Medium' | 'Low';
    aiAnalysis: string;
}

export interface InternalOpening {
    id: string;
    title: string;
    department: string;
    priority: 'Critical' | 'High' | 'Normal';
    requiredSkills: string[];
    status: 'Open' | 'Urgent';
    matchCandidates: string[];
}

export interface ManagerHoardingMetric {
    managerId: string;
    managerName: string;
    dept: string;
    teamSize: number;
    topPerformerCount: number;
    talentExportRate: number;
    avgTopPerformerTenure: number;
    hoardingScore: number;
    aiVerdict: string;
}

export interface FeishuConfig {
    connected: boolean;
    lastSync: string;
    dataPoints: number;
    sources: {
        meetings: boolean;
        groupChats: boolean;
        hours: boolean;
        privateChats: boolean;
        docs: boolean;
        participation: boolean;
    };
    privacy: {
        mode: 'Pseudonymized' | 'Anonymized' | 'Clear';
        accessLevel: string[];
    };
}

export interface FinancialConfig {
    showRevenue: boolean;
    showProfit: boolean;
    showCashFlow: boolean;
    showSignedVsTarget: boolean;
    showCollectionVsTarget: boolean;
    showMargins: boolean;
    alertThresholdRevenue: number;
}

export interface OverviewConfig {
    showAIReport: boolean;
    showDecisionSupport: boolean;
    showWhatIf: boolean;
    showMetrics: boolean;
    showRisks: boolean;
    showSubFundChart: boolean;
}

export interface AppConfig {
    general: {
        systemName: string;
        theme: 'dark' | 'light';
        density: 'comfortable' | 'compact';
        refreshRate: number;
    };
    modules: ModuleConfig[];
    finance: FinancialConfig;
    compliance: {
        enableRedAlert: boolean;
        highRiskAutoReport: boolean;
    };
    overview: OverviewConfig;
}

export interface ModuleConfig {
    id: string;
    label: string;
    iconName: string;
    enabled: boolean;
    section: 'top' | 'bottom';
    children?: ModuleConfig[];
}

// --- Audit & Compliance Types ---

export type AuditType = 'FactDeviation' | 'SentimentAnomaly' | 'AssetDeviation' | 'BehaviorAnomaly';

export interface AuditEvent {
    id: string;
    type: AuditType;
    title: string;
    summary: string;
    severity: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'Resolved';
    time: string; // Relative time e.g., "2 hours ago"
    department: string;
    person?: {
        name: string;
        role: string;
        avatar?: string;
    };
    meta?: any; // Additional data for preview
}

export interface FactDeviationDetail {
    reportId: string;
    detectTime: string;
    duration: string;
    source: string;
    originalStatement: string; // What was said
    originalValue?: string;
    aiReality: string; // What is true
    aiValue?: string;
    gapAnalysis: {
        diffAmount?: string;
        diffPercent?: string;
        severityColor: string;
    };
    verificationSteps: string[];
    rootCause: string;
    impact: {
        cashflow?: string;
        budget?: string;
        investorConfidence?: string;
    };
    person: {
        name: string;
        role: string;
        avatar: string;
    };
}

export interface SentimentAnomalyDetail {
    eventId: string;
    time: string;
    relatedContext: string; // e.g. "Alpha Project Q3 Review"
    sentimentScore: number; // 0-100, 100 being worst
    negativeRatio: string; // e.g. "85%"
    participantsCount: number;
    keyEmotions: { label: string; score: number }[]; // e.g. Frustration: 88%
    timelineData: { time: string; sentiment: number }[]; // For chart
    aiAnalysis: string;
    recommendedAction: {
        title: string;
        desc: string;
    }[];
}

// --- Shadow Audit Types (Legacy) ---
export interface ShadowLog {
    id: string;
    time: string;
    source: 'Support' | 'Dev' | 'IM' | 'Meeting';
    user: string;
    content: string;
    sentiment: 'Negative' | 'Neutral' | 'Positive';
    tags: string[];
}

export interface MeetingSignal {
    timeSlot: string; // e.g., '10:00'
    audioVolume: number; // 0-100
    privateChatVolume: number; // 0-100
    topKeywords: string[];
}

export interface ShadowAuditCase {
    id: string;
    title: string;
    type: 'Operation' | 'Organization';
    officialReport: {
        status: 'Green' | 'Yellow' | 'Red';
        summary: string;
        reporter: string;
    };
    shadowReality: {
        alertLevel: 'Critical' | 'Warning' | 'Notice';
        detectedSignal: string;
        deviationScore: number; // 0-100%
        logs?: ShadowLog[];
        timeline?: MeetingSignal[];
    };
    aiVerdict: string;
}

export interface OrgNode {
    id: string;
    name: string;
    role: string;
    avatar: string;
    x: number;
    y: number;
}

export interface OrgEdge {
    source: string;
    target: string;
    status: 'Normal' | 'Conflict';
}

export interface DualStreamEvent {
    id: string;
    time: string;
    surfaceContent: string; // Meeting Transcript
    undercurrentContent: string; // Private Chat
    highlightKeywords: string[]; // Keywords to highlight in red
}

export interface OrgConflictData {
    nodes: OrgNode[];
    edges: OrgEdge[];
    conflictDetail: {
        sourceNodeId: string;
        targetNodeId: string;
        riskLevel: 'High' | 'Medium' | 'Low';
        timestamp: string;
        stream: DualStreamEvent[];
        aiSuggestion: string;
    };
}

// --- ECG & Shadow Stream Types ---
export interface ECGDataPoint {
    time: string;
    officialIntensity: number; // 0-100 (Positive Y)
    shadowIntensity: number;   // 0-100 (Displayed as Negative Y)
    officialEvent?: string;    // Label for top event
    shadowEvent?: string;      // Label for bottom spike
    causality?: string;        // Text linking the two
}

export interface ShadowStreamItem {
    id: string;
    time: string; // Relative time e.g. "10m ago"
    trigger: string;
    reaction: string;
    impact: string; 
    status: 'Fermenting' | 'Declining' | 'Stable';
    sentimentScore: number;
}
