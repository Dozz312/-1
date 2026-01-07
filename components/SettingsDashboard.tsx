
import React, { useState } from 'react';
import { 
  Layout, DollarSign, Briefcase, Code, ShieldAlert, 
  Bell, Eye, Sliders, Save, RotateCcw, Check, ToggleLeft, ToggleRight,
  PlusCircle, MinusCircle, GripVertical, ArrowUp, ArrowDown, Activity
} from 'lucide-react';
import { AppConfig, ModuleConfig } from '../types';

type SettingsTab = 'general' | 'finance' | 'modules' | 'compliance' | 'dashboard';

interface SettingsDashboardProps {
    config: AppConfig;
    onConfigChange: (newConfig: AppConfig) => void;
}

const SettingsDashboard: React.FC<SettingsDashboardProps> = ({ config, onConfigChange }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [hasSaved, setHasSaved] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const handleSave = () => {
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2000);
  };

  const updateGeneral = (key: keyof AppConfig['general'], value: any) => {
      onConfigChange({
          ...config,
          general: { ...config.general, [key]: value }
      });
  };

  const updateFinance = (key: keyof AppConfig['finance'], value: any) => {
      onConfigChange({
          ...config,
          finance: { ...config.finance, [key]: value }
      });
  };

  const updateCompliance = (key: keyof AppConfig['compliance'], value: any) => {
      onConfigChange({
          ...config,
          compliance: { ...config.compliance, [key]: value }
      });
  };

  const updateOverview = (key: keyof AppConfig['overview'], value: any) => {
      onConfigChange({
          ...config,
          overview: { ...config.overview, [key]: value }
      });
  };

  const toggleModule = (moduleId: string) => {
      const updatedModules = config.modules.map(m => 
          m.id === moduleId ? { ...m, enabled: !m.enabled } : m
      );
      onConfigChange({ ...config, modules: updatedModules });
  };

  const toggleModuleSection = (moduleId: string) => {
      const updatedModules = config.modules.map(m => 
          m.id === moduleId ? { ...m, section: (m.section === 'top' ? 'bottom' : 'top') as 'top' | 'bottom' } : m
      );
      onConfigChange({ ...config, modules: updatedModules });
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
      setDraggedIndex(index);
      e.dataTransfer.setData("text/plain", index.toString());
      e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault(); 
      e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
      e.preventDefault();
      const sourceIndexStr = e.dataTransfer.getData("text/plain");
      if (!sourceIndexStr) return;
      
      const sourceIndex = parseInt(sourceIndexStr, 10);
      if (sourceIndex === targetIndex) return;

      const newModules = [...config.modules];
      const [movedItem] = newModules.splice(sourceIndex, 1);
      newModules.splice(targetIndex, 0, movedItem);

      onConfigChange({ ...config, modules: newModules });
      setDraggedIndex(null);
  };

  const handleDragEnd = () => {
      setDraggedIndex(null);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`transition-colors ${checked ? 'text-indigo-500' : 'text-slate-600'}`}
    >
      {checked ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
    </button>
  );

  const SectionHeader = ({ icon: Icon, title, description }: any) => (
    <div className="mb-6 pb-4 border-b border-slate-800">
      <div className="flex items-center gap-3 mb-1">
        <div className="p-2 bg-slate-800 text-indigo-400 rounded-lg">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm ml-12">{description}</p>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <div className="space-y-8 animate-fade-in">
            <SectionHeader icon={Layout} title="全局设置" description="配置系统基础外观与行为参数" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-300">系统显示名称</span>
                  <input 
                    type="text" 
                    value={config.general.systemName}
                    onChange={e => updateGeneral('systemName', e.target.value)}
                    className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-white"
                  />
                </label>
                
                <label className="block">
                  <span className="text-sm font-medium text-slate-300">数据自动刷新频率 (秒)</span>
                  <div className="flex items-center gap-4 mt-1">
                    <input 
                      type="range" min="10" max="300" step="10"
                      value={config.general.refreshRate}
                      onChange={e => updateGeneral('refreshRate', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-slate-400 w-12">{config.general.refreshRate}s</span>
                  </div>
                </label>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <h4 className="font-semibold text-slate-200 mb-4">界面密度与主题</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">深色模式 (Beta)</span>
                    <Toggle checked={config.general.theme === 'dark'} onChange={(v) => updateGeneral('theme', v ? 'dark' : 'light')} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">紧凑布局</span>
                    <Toggle checked={config.general.density === 'compact'} onChange={(v) => updateGeneral('density', v ? 'compact' : 'comfortable')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'modules':
        return (
            <div className="space-y-8 animate-fade-in">
                <SectionHeader icon={Layout} title="核心模块管理" description="启用/禁用模块，或调整模块在侧边栏的显示区域（置顶区/功能区）" />
                
                <div className="grid grid-cols-1 gap-4">
                    {config.modules.map((module, index) => (
                        <div 
                            key={module.id} 
                            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                                module.enabled ? 'bg-slate-900 border-indigo-900/50 shadow-sm' : 'bg-slate-950 border-slate-800 opacity-70'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${module.enabled ? 'bg-indigo-900/30 text-indigo-400' : 'bg-slate-800 text-slate-600'}`}>
                                    <GripVertical size={20} />
                                </div>
                                <div>
                                    <h4 className={`font-bold ${module.enabled ? 'text-slate-200' : 'text-slate-500'}`}>{module.label}</h4>
                                    <p className="text-xs text-slate-500">ID: {module.id}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Position Toggle */}
                                <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                                    <button
                                        onClick={() => toggleModuleSection(module.id)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                                            module.section === 'top' 
                                            ? 'bg-indigo-600 text-white shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        <ArrowUp size={12} />
                                        核心视图
                                    </button>
                                    <button
                                        onClick={() => toggleModuleSection(module.id)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                                            module.section === 'bottom' 
                                            ? 'bg-indigo-600 text-white shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        <ArrowDown size={12} />
                                        业务工具
                                    </button>
                                </div>

                                {/* Enable Toggle */}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        toggleModule(module.id);
                                    }}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${module.enabled ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                                >
                                    {module.enabled ? <Check size={14} /> : <MinusCircle size={14} />}
                                    {module.enabled ? '已启用' : '已停用'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

      case 'dashboard':
        return (
            <div className="space-y-8 animate-fade-in">
                <SectionHeader icon={Activity} title="首页组件定制" description="自定义[基金驾驶舱]显示的子模块与内容" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-white">AI 晨报 (Morning Briefing)</span>
                            <Toggle checked={config.overview.showAIReport} onChange={(v) => updateOverview('showAIReport', v)} />
                        </div>
                        <p className="text-xs text-slate-500">包含每日问候、关键摘要与待办事项。</p>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-white">AI 决策模拟</span>
                            <Toggle checked={config.overview.showDecisionSupport} onChange={(v) => updateOverview('showDecisionSupport', v)} />
                        </div>
                        <p className="text-xs text-slate-500">基于情景的互动式决策沙盘（需开启 AI 晨报）。</p>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-white">What-If 模拟器</span>
                            <Toggle checked={config.overview.showWhatIf} onChange={(v) => updateOverview('showWhatIf', v)} />
                        </div>
                        <p className="text-xs text-slate-500">自然语言驱动的假设推演与影响评估。</p>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-white">基金经营大盘 (KPI)</span>
                            <Toggle checked={config.overview.showMetrics} onChange={(v) => updateOverview('showMetrics', v)} />
                        </div>
                        <p className="text-xs text-slate-500">核心财务指标、实缴与分红进度条。</p>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-white">关键风险监控 (Top Risks)</span>
                            <Toggle checked={config.overview.showRisks} onChange={(v) => updateOverview('showRisks', v)} />
                        </div>
                        <p className="text-xs text-slate-500">展示 Top 3 关键风险及其 AI 应对建议。</p>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-white">子基金运行概况</span>
                            <Toggle checked={config.overview.showSubFundChart} onChange={(v) => updateOverview('showSubFundChart', v)} />
                        </div>
                        <p className="text-xs text-slate-500">环形图展示子基金健康度分布。</p>
                    </div>
                </div>
            </div>
        );

      case 'finance':
        return (
          <div className="space-y-8 animate-fade-in">
            <SectionHeader icon={DollarSign} title="财务模块配置" description="深度定制财务指标维度与分析模型" />
            
            {/* Advanced Metrics Toggles */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 p-6 rounded-xl border border-indigo-500/20 shadow-sm">
                <h4 className="font-bold text-indigo-300 mb-4 flex items-center gap-2">
                    <DollarSign size={18} />
                    高级复合指标 (一键开启)
                </h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 shadow-sm">
                        <div>
                            <span className="block font-medium text-slate-200">签约金额 vs 年度目标</span>
                            <span className="text-xs text-slate-500">展示 [年度总收入目标] - [已签约金额] - [占比分析]</span>
                        </div>
                        <Toggle checked={config.finance.showSignedVsTarget} onChange={(v) => updateFinance('showSignedVsTarget', v)} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 shadow-sm">
                        <div>
                            <span className="block font-medium text-slate-200">回款金额 vs 年度目标</span>
                            <span className="text-xs text-slate-500">展示 [年度总计收目标] - [目前总计收] - [占比分析]</span>
                        </div>
                        <Toggle checked={config.finance.showCollectionVsTarget} onChange={(v) => updateFinance('showCollectionVsTarget', v)} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 shadow-sm">
                        <div>
                            <span className="block font-medium text-slate-200">净利率 & 毛利率分析</span>
                            <span className="text-xs text-slate-500">双维度利润率对比透视</span>
                        </div>
                        <Toggle checked={config.finance.showMargins} onChange={(v) => updateFinance('showMargins', v)} />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Eye size={18} />
                    基础面板可见性
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex items-center p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                      <input type="checkbox" checked={config.finance.showRevenue} onChange={(e) => updateFinance('showRevenue', e.target.checked)} className="h-4 w-4 text-indigo-600 border-slate-500 rounded focus:ring-indigo-500 bg-slate-700" />
                      <span className="ml-3 text-sm text-slate-300 font-medium">营收分析</span>
                  </label>
                  <label className="flex items-center p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                      <input type="checkbox" checked={config.finance.showProfit} onChange={(e) => updateFinance('showProfit', e.target.checked)} className="h-4 w-4 text-indigo-600 border-slate-500 rounded focus:ring-indigo-500 bg-slate-700" />
                      <span className="ml-3 text-sm text-slate-300 font-medium">利润与成本</span>
                  </label>
                  <label className="flex items-center p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                      <input type="checkbox" checked={config.finance.showCashFlow} onChange={(e) => updateFinance('showCashFlow', e.target.checked)} className="h-4 w-4 text-indigo-600 border-slate-500 rounded focus:ring-indigo-500 bg-slate-700" />
                      <span className="ml-3 text-sm text-slate-300 font-medium">现金流监控</span>
                  </label>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Bell size={18} />
                    预警阈值设置
                </h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">营收偏差预警阈值</span>
                            <span className="font-bold text-rose-500">±{config.finance.alertThresholdRevenue}%</span>
                        </div>
                        <input 
                          type="range" min="1" max="50" 
                          value={config.finance.alertThresholdRevenue}
                          onChange={e => updateFinance('alertThresholdRevenue', parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <p className="text-xs text-slate-500 mt-1">当实际营收与目标的偏差超过此百分比时，仪表盘将高亮显示。</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
           <div className="space-y-8 animate-fade-in">
            <SectionHeader icon={ShieldAlert} title="合规风险配置" description="设置风控敏感度与通知渠道" />
            
            <div className="bg-rose-900/10 border border-rose-900/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-rose-400">高风险红线强提醒</h4>
                        <p className="text-rose-500/80 text-sm mt-1">开启后，侧边栏将显示呼吸灯警报，并强制弹窗提醒</p>
                    </div>
                    <Toggle 
                        checked={config.compliance.enableRedAlert} 
                        onChange={(v) => updateCompliance('enableRedAlert', v)} 
                    />
                </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                <h4 className="font-semibold text-white mb-4">自动上报机制</h4>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="text-sm text-slate-300">发现高风险时自动发送邮件给董事会秘书</span>
                        <input type="checkbox" checked={config.compliance.highRiskAutoReport} onChange={() => {}} className="h-5 w-5 text-indigo-600 rounded bg-slate-700 border-slate-600" />
                    </label>
                </div>
            </div>
           </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col md:flex-row bg-slate-950 gap-6 animate-fade-in">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 rounded-xl border border-slate-800 shadow-sm flex flex-col h-fit">
        <div className="p-4 border-b border-slate-800">
            <h2 className="font-bold text-white">配置导航</h2>
        </div>
        <div className="p-2 space-y-1">
            {[
                { id: 'general', label: '全局通用', icon: Layout },
                { id: 'modules', label: '模块管理', icon: Briefcase },
                { id: 'dashboard', label: '首页组件', icon: Activity }, // New Tab
                { id: 'finance', label: '财务中心', icon: DollarSign },
                { id: 'compliance', label: '合规风险', icon: ShieldAlert },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as SettingsTab)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeTab === item.id 
                        ? 'bg-indigo-900/30 text-indigo-400' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
            ))}
        </div>
      </div>

      {/* Main Configuration Area */}
      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 shadow-sm flex flex-col min-h-[600px]">
         <div className="p-6 flex-1">
            {renderContent()}
         </div>
         
         {/* Footer Actions */}
         <div className="p-4 border-t border-slate-800 bg-slate-900 rounded-b-xl flex justify-between items-center">
            <button 
                className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white font-medium text-sm transition-colors"
                onClick={() => {
                    localStorage.removeItem('executive-cockpit-config');
                    window.location.reload();
                }}
            >
                <RotateCcw size={16} />
                恢复默认
            </button>
            <button 
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium shadow-sm transition-all ${
                    hasSaved ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
            >
                {hasSaved ? <Check size={18} /> : <Save size={18} />}
                {hasSaved ? '已保存生效' : '保存配置'}
            </button>
         </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
