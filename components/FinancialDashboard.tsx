import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, ComposedChart, Line, LineChart,
  PieChart as RechartsPieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { generateFinancialData, mockSubFunds } from '../services/mockData';
import { 
    ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Activity, AlertCircle, 
    Calculator, PieChart as PieChartIcon, Target, Briefcase, Landmark, MapPin, Scale, AlertTriangle 
} from 'lucide-react';
import { FinancialConfig } from '../types';

interface FinancialDashboardProps {
    config?: FinancialConfig;
}

// Mock Data for New Charts
const radarData = [
  { subject: '去化率', A: 85, fullMark: 100 },
  { subject: '回款率', A: 92, fullMark: 100 },
  { subject: '毛利率', A: 78, fullMark: 100 },
  { subject: '负债优化', A: 88, fullMark: 100 },
  { subject: '人效', A: 80, fullMark: 100 },
  { subject: '交付品质', A: 70, fullMark: 100 },
];

const pieData = [
  { name: '住宅销售', value: 650, color: '#6366f1' },
  { name: '商业运营', value: 150, color: '#3b82f6' },
  { name: '物业服务', value: 100, color: '#10b981' },
  { name: '车位/其他', value: 50, color: '#94a3b8' },
];

const KPICard = ({ title, value, subtext, trend, icon: Icon, onClick, isSelected, highlight = false, alert = false }: any) => (
  <div 
    onClick={onClick}
    className={`p-8 rounded-2xl border transition-all cursor-pointer hover:shadow-xl relative overflow-hidden group ${
      isSelected ? 'bg-indigo-900/20 border-indigo-500 shadow-md' : 'bg-slate-900 border-slate-800'
    } ${highlight ? 'ring-2 ring-indigo-500 bg-indigo-900/10' : ''} ${alert ? 'border-rose-800 bg-rose-950/20' : ''}`}
  >
    {highlight && <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>}
    {alert && <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>}
    
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-xl ${
          alert ? 'bg-rose-900/30 text-rose-400' :
          isSelected || highlight ? 'bg-indigo-900/30 text-indigo-400' : 
          'bg-slate-800 text-slate-400'
      }`}>
        <Icon size={32} />
      </div>
      {trend !== undefined && (
          <div className={`flex items-center text-lg font-bold ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend >= 0 ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
            {Math.abs(trend)}%
          </div>
      )}
    </div>
    <h3 className="text-slate-400 text-lg font-medium mb-2">{title}</h3>
    <div className="text-5xl font-bold text-white tracking-tight mb-2 font-['PingFang_SC']">{value}</div>
    <p className={`text-sm font-medium ${alert ? 'text-rose-400' : 'text-slate-500'}`}>{subtext}</p>
  </div>
);

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ config }) => {
  const [viewMode, setViewMode] = useState<'COMPANY' | 'FUND'>('COMPANY');
  const [drillDownLevel, setDrillDownLevel] = useState<'CEO' | 'DEPT'>('CEO');
  const data = generateFinancialData();

  // Mock Trend Data based on generated data
  const trendData = data.map(d => ({
    month: d.month,
    current: d.revenue,
    previous: d.revenue * (0.85 + Math.random() * 0.2) // Randomized prev year
  }));

  // Metrics calculation
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0); // Sales
  const totalTarget = data.reduce((acc, curr) => acc + curr.target, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
  const totalCost = data.reduce((acc, curr) => acc + curr.cost, 0);
  const totalCollected = data.reduce((acc, curr) => acc + curr.collected, 0);
  
  const completionRate = Math.round((totalRevenue / totalTarget) * 100);
  
  // Simulated Contract Data for "Signed vs Target"
  const totalSignedContracts = Math.floor(totalRevenue * 1.15); // Assume signed is 15% higher than revenue recognised
  const signedRate = Math.round((totalSignedContracts / totalTarget) * 100);

  // Collection Rate
  const collectionRate = Math.round((totalCollected / totalTarget) * 100);

  // Margins
  const grossMargin = 22.5; // Fixed from mock
  const netMargin = Math.round((totalProfit / totalRevenue) * 100 * 10) / 10;

  const handleDrillDown = () => {
    // Toggle drill down for demo purposes
    setDrillDownLevel(prev => prev === 'CEO' ? 'DEPT' : 'CEO');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Area with View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white font-['PingFang_SC']">财务资金中心</h2>
          <p className="text-slate-400 text-lg mt-2">
            资金流与利润监控 &bull; 当前视图: <span className="font-semibold text-indigo-400">{viewMode === 'COMPANY' ? '集团总部视角' : '区域/项目视角'}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button 
                onClick={() => setViewMode('COMPANY')}
                className={`px-6 py-3 rounded-lg text-base font-bold transition-all flex items-center gap-3 ${
                    viewMode === 'COMPANY' 
                    ? 'bg-slate-800 text-indigo-400 shadow-sm border border-slate-700' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
            >
                <Briefcase size={20} />
                集团总部
            </button>
            <button 
                onClick={() => setViewMode('FUND')}
                className={`px-6 py-3 rounded-lg text-base font-bold transition-all flex items-center gap-3 ${
                    viewMode === 'FUND' 
                    ? 'bg-slate-800 text-indigo-400 shadow-sm border border-slate-700' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
            >
                <Landmark size={20} />
                区域公司
            </button>
        </div>
      </div>

      {/* --- COMPANY VIEW CONTENT --- */}
      {viewMode === 'COMPANY' && (
        <>
            {/* Dynamic KPI Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Standard Metrics */}
                <KPICard 
                title="全口径销售回款" 
                value={`¥${totalCollected.toLocaleString()}亿`} 
                subtext={`目标: ¥${totalTarget.toLocaleString()}亿`}
                trend={5.5}
                icon={DollarSign}
                isSelected={false}
                onClick={handleDrillDown}
                />
                
                {/* Custom Toggle: Signed vs Target */}
                {config?.showSignedVsTarget ? (
                    <KPICard 
                    title="签约金额 vs 目标" 
                    value={`¥${totalSignedContracts.toLocaleString()}亿`} 
                    subtext={`达成率: ${signedRate}%`}
                    icon={Target}
                    highlight={true}
                />
                ) : (
                    <KPICard 
                    title="年度销售达成率" 
                    value={`${completionRate}%`} 
                    subtext="年度目标进度 (签约口径)"
                    trend={-2.4}
                    icon={Activity}
                    isSelected={false}
                    />
                )}

                {/* Custom Toggle: Collection vs Target */}
                {config?.showCollectionVsTarget ? (
                    <KPICard 
                    title="结转收入进度" 
                    value={`¥${totalRevenue.toLocaleString()}亿`} 
                    subtext={`结转目标达成: ${collectionRate}%`}
                    icon={PieChartIcon}
                    highlight={true}
                />
                ) : (
                    <KPICard 
                    title="归母净利润" 
                    value={`¥${totalProfit.toLocaleString()}亿`} 
                    subtext="同比下降 5.1%"
                    trend={-5.1}
                    icon={TrendingUp}
                    isSelected={false}
                    />
                )}

                {/* Custom Toggle: Margins */}
                {config?.showMargins ? (
                    <div className="p-8 rounded-2xl border bg-indigo-900/20 border-indigo-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-4 rounded-xl bg-indigo-900/40 text-indigo-400"><Calculator size={32} /></div>
                            <span className="text-sm bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-lg font-bold">利润分析</span>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <span className="text-sm text-slate-400 block mb-1">净利率</span>
                                <span className="text-4xl font-bold text-white font-['PingFang_SC']">{netMargin}%</span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm text-slate-400 block mb-1">毛利率</span>
                                <span className="text-4xl font-bold text-white font-['PingFang_SC']">{grossMargin}%</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <KPICard 
                    title="可用资金余额" 
                    value="¥42亿" 
                    subtext="非受限资金 > 3个月覆盖"
                    trend={-15} 
                    icon={AlertCircle}
                    isSelected={false}
                    />
                )}
            </div>

            {/* Visual Analytics Row: Radar, Pie, Trend Line */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Radar Chart: Financial Health */}
                 <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col items-center">
                     <h3 className="text-lg font-bold text-white mb-6 w-full flex items-center gap-2">
                        <Activity size={18} className="text-indigo-500" />
                        大运营健康度 (Health Radar)
                     </h3>
                     <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Score" dataKey="A" stroke="#6366f1" strokeWidth={3} fill="#6366f1" fillOpacity={0.4} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} itemStyle={{ color: '#e2e8f0' }}/>
                            </RadarChart>
                        </ResponsiveContainer>
                     </div>
                 </div>

                 {/* Pie Chart: Revenue Structure */}
                 <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col items-center">
                     <h3 className="text-lg font-bold text-white mb-6 w-full flex items-center gap-2">
                        <PieChartIcon size={18} className="text-emerald-500" />
                        收入结构分布 (Structure)
                     </h3>
                     <div className="h-[250px] w-full flex items-center">
                        <ResponsiveContainer width="60%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={45}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} itemStyle={{ color: '#e2e8f0' }}/>
                            </RechartsPieChart>
                        </ResponsiveContainer>
                        <div className="w-[40%] text-xs space-y-3">
                            {pieData.map(item => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}}></div>
                                    <span className="text-slate-300 font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                     </div>
                 </div>

                 {/* Line Chart: Growth Trend */}
                 <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col items-center">
                     <h3 className="text-lg font-bold text-white mb-6 w-full flex items-center gap-2">
                        <TrendingUp size={18} className="text-amber-500" />
                        销售回款趋势 (Trend)
                     </h3>
                     <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="month" hide />
                                <YAxis hide />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }} itemStyle={{ color: '#e2e8f0' }}/>
                                <Line type="monotone" name="本年" dataKey="current" stroke="#f59e0b" strokeWidth={3} dot={false} />
                                <Line type="monotone" name="去年" dataKey="previous" stroke="#475569" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                <Legend iconType="line" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            </LineChart>
                        </ResponsiveContainer>
                     </div>
                 </div>
            </div>

            {/* Main Charts Row 1 */}
            {config?.showRevenue && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Revenue vs Target */}
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">销售签约 vs 目标</h3>
                        {drillDownLevel === 'DEPT' && <span className="text-sm bg-indigo-900 text-indigo-300 px-3 py-1 rounded font-medium">按区域</span>}
                    </div>
                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14}} />
                            <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)', padding: '12px' }}
                            itemStyle={{ color: '#e2e8f0', fontSize: '14px' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ color: '#cbd5e1', paddingTop: '20px', fontSize: '14px' }} />
                            <Bar name="实际签约" dataKey={drillDownLevel === 'CEO' ? "revenue" : "cost"} fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar name="目标" dataKey="target" fill="#475569" radius={[4, 4, 0, 0]} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                    </div>

                    {/* Profitability Analysis (Conditional) */}
                    {config?.showProfit && (
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
                        <h3 className="text-xl font-bold text-white mb-8">利润与建安成本结构</h3>
                        <div className="h-[450px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14}} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)', padding: '12px' }}
                                    itemStyle={{ color: '#e2e8f0', fontSize: '14px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ color: '#cbd5e1', paddingTop: '20px', fontSize: '14px' }}/>
                                <Area type="monotone" name="净利润" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                                <Area type="monotone" name="建安成本" dataKey="cost" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                            </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        </div>
                    )}
                </div>
            )}

            {/* Cash Flow Monitor */}
            {config?.showCashFlow && (
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">现金流监控: 应收账款(Receivables) vs 实收(Collected)</h3>
                        <div className="mt-2 sm:mt-0 flex items-center space-x-3 text-base text-amber-400 bg-amber-900/20 p-3 rounded-lg border border-amber-900/30">
                            <AlertCircle size={20} className="text-amber-500"/>
                            <span className="font-medium">需重点关注按揭放款周期与监管账户解冻</span>
                        </div>
                    </div>
                    <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)', padding: '12px' }}
                            itemStyle={{ color: '#e2e8f0', fontSize: '14px' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ color: '#cbd5e1', paddingTop: '20px', fontSize: '14px' }}/>
                        <Line type="monotone" name="应收款 (Receivables)" dataKey="receivables" stroke="#818cf8" strokeWidth={4} dot={{r: 6}} />
                        <Line type="monotone" name="实收 (Collected)" dataKey="collected" stroke="#34d399" strokeWidth={4} dot={{r: 6}} />
                        <Bar dataKey="profit" name="经营性净现金流" fill="#475569" barSize={30} radius={[4, 4, 0, 0]} />
                        </ComposedChart>
                    </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
      )}

      {/* --- REGIONAL VIEW CONTENT (FORMERLY FUND) --- */}
      {viewMode === 'FUND' && (
        <div className="space-y-8">
            
            {/* AI Risk Alert Section */}
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-2xl p-6 flex items-start gap-6">
                <div className="p-3 bg-amber-900/40 text-amber-500 rounded-xl shrink-0">
                    <AlertTriangle size={32} />
                </div>
                <div>
                    <h3 className="font-bold text-amber-400 text-lg">AI 风险预警：区域库存与去化周期预警</h3>
                    <p className="text-amber-300/80 text-base mt-2 leading-relaxed max-w-5xl">
                        监控显示“华北区域”去化周期已超过 24 个月，库存积压风险显著。建议启动针对性促销政策，并严格控制该区域新开工面积。
                    </p>
                </div>
            </div>

            {/* Fund KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard 
                    title="区域总货值" 
                    value="¥128亿" 
                    subtext="包含 4 个核心战区"
                    icon={Landmark}
                    highlight={true}
                />
                <KPICard 
                    title="综合去化率" 
                    value="72.4%" 
                    subtext="同比提升 5.2%"
                    trend={5.2}
                    icon={TrendingUp}
                />
                <KPICard 
                    title="交付完成率" 
                    value="98.5%" 
                    subtext="目标: 100% (保交付)"
                    icon={MapPin}
                />
                <KPICard 
                    title="违规分包风险" 
                    value="1 项" 
                    subtext="区域：西南区域公司"
                    alert={true}
                    icon={Scale}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Sub-fund Performance Table -> Regional Company Table */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-8 overflow-hidden">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-xl">
                        <Briefcase size={24} className="text-indigo-500"/>
                        区域公司穿透管理
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800 text-slate-400 font-medium text-base">
                                <tr>
                                    <th className="px-6 py-4 rounded-l-xl">区域公司 (Region)</th>
                                    <th className="px-6 py-4">去化率 / 毛利率</th>
                                    <th className="px-6 py-4">回款进度</th>
                                    <th className="px-6 py-4">政府关系</th>
                                    <th className="px-6 py-4 rounded-r-xl">合规状态</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-base">
                                {mockSubFunds.map(fund => (
                                    <tr key={fund.id} className="group hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="font-bold text-white text-lg">{fund.name}</div>
                                            <div className="text-sm text-slate-500 mt-1">{fund.manager} | 货值: {fund.aum}亿</div>
                                            {fund.aiAlert && (
                                                <div className="mt-2 text-xs text-amber-500 bg-amber-900/30 px-2 py-1 rounded inline-block border border-amber-900/50 font-bold">
                                                    AI: {fund.aiAlert}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-emerald-500 font-bold text-lg">{fund.irr}%</div>
                                            <div className="text-sm text-slate-500">GPM: {fund.tvpi * 10}%</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-bold text-lg ${fund.returnInvestmentRatio < fund.returnInvestmentTarget ? 'text-rose-500' : 'text-slate-300'}`}>
                                                    {fund.returnInvestmentRatio}%
                                                </span>
                                                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${fund.returnInvestmentRatio < fund.returnInvestmentTarget ? 'bg-rose-500' : 'bg-indigo-500'}`}
                                                        style={{width: `${Math.min(fund.returnInvestmentRatio, 100)}%`}}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">目标: {fund.returnInvestmentTarget}%</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            {fund.hasGovCooperation ? (
                                                <span className="px-3 py-1.5 bg-blue-900/30 text-blue-400 text-sm font-medium rounded-lg border border-blue-900/50">
                                                    良好
                                                </span>
                                            ) : (
                                                <span className="text-slate-600 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1.5 text-sm font-bold rounded-lg flex items-center gap-2 w-fit ${
                                                fund.complianceStatus === 'Compliant' ? 'bg-emerald-900/30 text-emerald-500' :
                                                fund.complianceStatus === 'Warning' ? 'bg-amber-900/30 text-amber-500' :
                                                'bg-rose-900/30 text-rose-500'
                                            }`}>
                                                {fund.complianceStatus === 'Compliant' && '合规'}
                                                {fund.complianceStatus === 'Warning' && '关注'}
                                                {fund.complianceStatus === 'Non-Compliant' && '违规'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Return Investment Monitor -> Profit Contribution */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-8 flex flex-col">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-xl">
                        <MapPin size={24} className="text-indigo-500"/>
                        区域利润贡献排行
                    </h3>
                    <div className="flex-1 min-h-[300px] w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockSubFunds} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 500}} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', padding: '12px' }} />
                                <Bar dataKey="returnInvestmentRatio" name="实际利润" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
                                <Bar dataKey="returnInvestmentTarget" name="目标利润" fill="#475569" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="p-6 bg-slate-800 rounded-xl">
                        <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">重点城市深耕策略</h4>
                        <div className="flex flex-wrap gap-3">
                            {['杭州', '上海', '成都', '广州'].map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200 font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                            * 系统自动监测各城市能级与去化周期，动态调整投拓资源。
                        </p>
                    </div>
                </div>

            </div>
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;