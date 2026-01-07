
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  Code, 
  ShieldAlert, 
  Users, 
  TrendingUp, 
  Layout, 
  Binoculars, 
  Map, 
  Activity, 
  Handshake, 
  Calendar, 
  Briefcase, 
  Bot, 
  Cpu, 
  Radar, 
  Zap, 
  X, 
  FileText, 
  CheckCircle2, 
  UserCircle,
  Database,
  ChevronDown,
  ChevronRight,
  BarChart3,
  ArrowRightLeft,
  HardHat,
  Eye,
  Crosshair
} from 'lucide-react';
import FinancialDashboard from './components/FinancialDashboard';
import ProjectDashboard from './components/ProjectDashboard';
import ProductRDDashboard from './components/ProductRDDashboard';
import ComplianceDashboard from './components/ComplianceDashboard';
import SubFundMonitorDashboard from './components/SubFundMonitorDashboard';
import SettingsDashboard from './components/SettingsDashboard';
import SentimentScoutDashboard from './components/SentimentScoutDashboard';
import RegionalDashboard from './components/RegionalDashboard';
import OperatingOverviewDashboard from './components/OperatingOverviewDashboard';
import PromiseDashboard from './components/PromiseDashboard';
import CalendarDashboard from './components/CalendarDashboard';
import AISecretaryDashboard from './components/AISecretaryDashboard';
import AgentCommitteeDashboard from './components/AgentCommitteeDashboard';
import OpportunityDiscoveryDashboard from './components/OpportunityDiscoveryDashboard';
import HRDashboard from './components/HRDashboard';
import HREmployeeProfile from './components/HREmployeeProfile';
import HRDataConfig from './components/HRDataConfig';
import TalentMobilityDashboard from './components/TalentMobilityDashboard';
import AIDashboard from './components/AIDashboard';
import ComplianceAuditDashboard from './components/ComplianceAuditDashboard';
import StrategySandboxDashboard from './components/StrategySandboxDashboard';
import { mockComplianceRisks } from './services/mockData';
import { RiskLevel, AppConfig, ModuleConfig, AppMode } from './types';

// Placeholder for new modules
const PlaceholderModule = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 animate-fade-in">
        <Layout size={64} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold text-slate-400">{title}</h2>
        <p>核心模块已启用，正在连接数据源...</p>
    </div>
);

// Icon Mapping
const iconMap: Record<string, any> = {
    PieChart, LayoutDashboard, Code, ShieldAlert, Users, TrendingUp, Binoculars, Map, Activity, Handshake, Calendar, Bot, Cpu, Briefcase, Radar, Zap, UserCircle, Database, BarChart3, ArrowRightLeft, HardHat, Eye, Crosshair
};

interface NavItemProps {
    module: ModuleConfig;
    isActive: boolean;
    onClick: () => void;
    isAlert: boolean;
    hasChildren?: boolean;
    isExpanded?: boolean;
    depth?: number;
}

const NavItem: React.FC<NavItemProps> = ({ module, isActive, onClick, isAlert, hasChildren, isExpanded, depth = 0 }) => {
  const Icon = iconMap[module.iconName] || LayoutDashboard;

  return (
      <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
          isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
      style={{ paddingLeft: `${16 + depth * 12}px` }}
      >
      <Icon size={20} />
      <span className="font-medium flex-1 text-left">{module.label}</span>
      
      {isAlert && (
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm animate-pulse ring-2 ring-slate-900">
          !
          </span>
      )}
      
      {hasChildren && (
          <span className="text-slate-500 ml-auto">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
      )}
      </button>
  );
};

const DEFAULT_CONFIG: AppConfig = {
    general: {
        systemName: 'AI Chief of Staff',
        theme: 'dark',
        density: 'comfortable',
        refreshRate: 30
    },
    modules: [
        { id: 'overview', label: '核心概览', iconName: 'Activity', enabled: true, section: 'top' },
        { id: 'compliance_audit', label: '合规与审计', iconName: 'Eye', enabled: true, section: 'top' },
        { id: 'subfund_monitor', label: '区域监控', iconName: 'Radar', enabled: false, section: 'top' }, 
        { id: 'opportunity_discovery', label: '商机识别', iconName: 'Zap', enabled: true, section: 'top' },
        { id: 'finance', label: '财务资金', iconName: 'PieChart', enabled: true, section: 'top' },
        { id: 'projects', label: '项目大运营', iconName: 'HardHat', enabled: true, section: 'top' },
        { id: 'strategy_sandbox', label: '战略沙盘', iconName: 'Crosshair', enabled: true, section: 'top' },
        { id: 'compliance', label: '大运营风控', iconName: 'ShieldAlert', enabled: true, section: 'top' },
        
        { id: 'products', label: '产品研发', iconName: 'Code', enabled: false, section: 'top' },

        // HR Root with sub-modules
        { 
            id: 'hr_root', 
            label: '组织与人才', 
            iconName: 'Users', 
            enabled: true, 
            section: 'bottom',
            children: [
                { id: 'hr_overview', label: '洞察与审计', iconName: 'BarChart3', enabled: true, section: 'bottom' },
                { id: 'hr_mobility', label: '高潜人才榜', iconName: 'ArrowRightLeft', enabled: true, section: 'bottom' },
                { id: 'hr_profile', label: '员工档案', iconName: 'UserCircle', enabled: true, section: 'bottom' },
                { id: 'hr_config', label: '数据集成', iconName: 'Database', enabled: true, section: 'bottom' },
            ]
        },

        { id: 'calendar', label: '智能日历', iconName: 'Calendar', enabled: true, section: 'bottom' }, 
        { id: 'promises', label: '承诺与备忘', iconName: 'Handshake', enabled: true, section: 'bottom' }, 
        { id: 'regional', label: '投资地图', iconName: 'Map', enabled: false, section: 'bottom' }, 
        { id: 'scout', label: '舆情侦查', iconName: 'Binoculars', enabled: true, section: 'bottom' }, 
        
        { id: 'market', label: '宏观分析', iconName: 'TrendingUp', enabled: false, section: 'bottom' },
    ],
    finance: {
        showRevenue: true,
        showProfit: true,
        showCashFlow: true,
        showSignedVsTarget: false,
        showCollectionVsTarget: false,
        showMargins: false,
        alertThresholdRevenue: 10
    },
    compliance: {
        enableRedAlert: true,
        highRiskAutoReport: true
    },
    overview: {
        showAIReport: true,
        showDecisionSupport: true,
        showWhatIf: true,
        showMetrics: true,
        showRisks: true,
        showSubFundChart: true
    }
};

const App = () => {
  const [appMode, setAppMode] = useState<AppMode>('BI');

  const [config, setConfig] = useState<AppConfig>(() => {
      try {
          const saved = localStorage.getItem('executive-cockpit-config-v3');
          if (saved) {
              return JSON.parse(saved);
          }
      } catch (e) {
          console.error("Failed to load config from localStorage", e);
      }
      return DEFAULT_CONFIG;
  });

  useEffect(() => {
      localStorage.setItem('executive-cockpit-config-v3', JSON.stringify(config));
  }, [config]);

  const [activeView, setActiveView] = useState<string>('overview');
  const [activeAIView, setActiveAIView] = useState<string>('ai-secretary'); 
  
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
      config.modules.forEach(m => {
          if (m.children?.some(c => c.id === activeView)) {
              setExpandedModules(prev => new Set(prev).add(m.id));
          }
      });
  }, [activeView, config.modules]);

  const toggleExpand = (id: string) => {
      const newSet = new Set(expandedModules);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      setExpandedModules(newSet);
  };

  const highRiskCount = mockComplianceRisks.filter(r => r.riskLevel === RiskLevel.HIGH).length;
  const showHighRiskAlert = config.compliance.enableRedAlert && highRiskCount > 0;

  const renderContent = () => {
    if (appMode === 'AI') {
      switch(activeAIView) {
        case 'ai-secretary': return <AISecretaryDashboard />;
        case 'agent-committee': return <AgentCommitteeDashboard />;
        case 'people-agent': return <AIDashboard context="people" />;
        case 'matters-agent': return <AIDashboard context="matters" />;
        default: return <AISecretaryDashboard />;
      }
    }

    switch(activeView) {
      case 'compliance_audit': return <ComplianceAuditDashboard />;
      case 'strategy_sandbox': return <StrategySandboxDashboard />;
      case 'finance': return <FinancialDashboard config={config.finance} />;
      case 'projects': return <ProjectDashboard />;
      case 'products': return <ProductRDDashboard />;
      case 'compliance': return <ComplianceDashboard />;
      case 'subfund_monitor': return <SubFundMonitorDashboard />;
      case 'settings': return <SettingsDashboard config={config} onConfigChange={setConfig} />;
      case 'scout': return <SentimentScoutDashboard />;
      case 'regional': return <RegionalDashboard />;
      case 'overview': return <OperatingOverviewDashboard config={config.overview} />;
      case 'promises': return <PromiseDashboard />;
      case 'calendar': return <CalendarDashboard />;
      case 'opportunity_discovery': return <OpportunityDiscoveryDashboard />;
      case 'hr_overview': return <HRDashboard />;
      case 'hr_mobility': return <TalentMobilityDashboard />;
      case 'hr_profile': return <HREmployeeProfile />;
      case 'hr_config': return <HRDataConfig />;
      default: return <PlaceholderModule title={activeView} />;
    }
  };

  const getAIModules = () => [
    { id: 'ai-secretary', label: '全域智能秘书', iconName: 'Bot' },
    { id: 'agent-committee', label: '智能体委员会', iconName: 'Cpu' },
    { id: 'matters-agent', label: '业务经营智能体', iconName: 'Briefcase' },
    { id: 'people-agent', label: '组织人才智能体', iconName: 'UserCircle' },
  ];

  const handleModeSwitch = (mode: AppMode) => {
    setAppMode(mode);
    if (mode === 'AI') {
      setActiveAIView('ai-secretary');
    } else {
      setActiveView('overview');
    }
  };

  const renderNavItems = (modules: ModuleConfig[], depth = 0) => {
      return modules.map(module => {
          if (!module.enabled) return null;
          
          const hasChildren = module.children && module.children.length > 0;
          const isExpanded = expandedModules.has(module.id);
          const isActive = activeView === module.id;
          
          return (
              <div key={module.id}>
                  <NavItem 
                      module={module}
                      isActive={isActive}
                      isExpanded={isExpanded}
                      hasChildren={hasChildren}
                      depth={depth}
                      onClick={() => {
                          if (hasChildren) {
                              toggleExpand(module.id);
                          } else {
                              setActiveView(module.id);
                              setIsMobileMenuOpen(false);
                          }
                      }}
                      isAlert={module.id === 'compliance' && showHighRiskAlert}
                  />
                  {hasChildren && isExpanded && (
                      <div className="mt-1 animate-fade-in-down">
                          {renderNavItems(module.children!, depth + 1)}
                      </div>
                  )}
              </div>
          );
      });
  };

  return (
    <div className={`flex h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden ${config.general.theme === 'light' ? 'light-theme' : ''}`}>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900 shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-600/20">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">{config.general.systemName}</span>
        </div>

        <div className="px-4 py-4 shrink-0">
          <div className="bg-slate-800 p-1 rounded-xl flex border border-slate-700">
            <button 
              onClick={() => handleModeSwitch('BI')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                appMode === 'BI' 
                ? 'bg-slate-700 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <LayoutDashboard size={14} />
              BI 视图
            </button>
            <button 
              onClick={() => handleModeSwitch('AI')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                appMode === 'AI' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Bot size={14} />
              AI 视图
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1 custom-scrollbar">
          {appMode === 'BI' ? (
            <>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-2">核心监控</div>
              {renderNavItems(config.modules.filter(m => m.enabled && m.section === 'top'))}

              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">业务工具</div>
              {renderNavItems(config.modules.filter(m => m.enabled && m.section === 'bottom'))}
            </>
          ) : (
            <>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-2">智能体集群</div>
              {getAIModules().map(module => {
                 const Icon = iconMap[module.iconName] || Bot;
                 const isActive = activeAIView === module.id;
                 return (
                    <button
                      key={module.id}
                      onClick={() => { setActiveAIView(module.id); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                          isActive 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{module.label}</span>
                    </button>
                 );
              })}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => setActiveView('settings')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              C
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Chairman</div>
              <div className="text-xs text-slate-500 truncate">Group CEO</div>
            </div>
            <Settings size={18} className="text-slate-500" />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0B0F19]">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder={appMode === 'AI' ? "向智能体发送指令..." : "搜索项目、地块、人员..."}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-900"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-800"></div>
            
            <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>System Online</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
