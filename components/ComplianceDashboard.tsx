
import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Layers, 
  TrendingUp, 
  AlertTriangle,
  ZoomIn,
  GitCommit,
  LayoutGrid
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from 'recharts';

// --- Mock Data ---

const riskMetrics = {
    hhi: { value: 0.65, status: 'Warning', desc: '剔除预收资产负债率' }, // Red line metric
    region: { value: 'High', status: 'Warning', desc: '净负债率 (>100%)' }, // Red line metric
    top5: { value: '1.2', status: 'Normal', desc: '现金短债比' }, // Red line metric
    top10: { value: '35%', status: 'Normal', desc: '土储去化周期 > 3年' }
};

const correlationData = [
    ['华东', 1.0, 0.85, 0.30, 0.15, 0.40],
    ['华南', 0.85, 1.0, 0.25, 0.10, 0.45],
    ['华北', 0.30, 0.25, 1.0, 0.70, 0.20],
    ['西南', 0.15, 0.10, 0.70, 1.0, 0.10],
    ['华中', 0.40, 0.45, 0.20, 0.10, 1.0],
];
const funds = ['华东', '华南', '华北', '西南', '华中'];

const penetrationData = [
    { industry: '住宅', region: '华东', stage: '预售', exposure: 1200, riskScore: 85 },
    { industry: '商业', region: '华东', stage: '运营', exposure: 4500, riskScore: 60 },
    { industry: '住宅', region: '华南', stage: '竣工', exposure: 3000, riskScore: 45 },
    { industry: '酒店', region: '华北', stage: '在建', exposure: 2000, riskScore: 75 },
    { industry: '住宅', region: '中西部', stage: '前期', exposure: 1500, riskScore: 30 },
];

const riskTrendData = [
    { month: '1月', exposure: 1000, riskIndex: 45 },
    { month: '2月', exposure: 1050, riskIndex: 48 },
    { month: '3月', exposure: 1100, riskIndex: 52 },
    { month: '4月', exposure: 1080, riskIndex: 50 },
    { month: '5月', exposure: 1150, riskIndex: 65 }, // Spike
    { month: '6月', exposure: 1200, riskIndex: 62 },
    { month: '7月', exposure: 1250, riskIndex: 58 },
];

const getColorByValue = (val: number) => {
    if (val === 1) return 'bg-indigo-500 text-white';
    if (val >= 0.7) return 'bg-indigo-500/80 text-white';
    if (val >= 0.5) return 'bg-indigo-500/50 text-indigo-100';
    if (val >= 0.3) return 'bg-indigo-500/30 text-indigo-200';
    return 'bg-slate-800 text-slate-500';
};

const RiskCard = ({ title, value, status }: { title: string, value: string, status: string }) => (
    <div className={`p-6 rounded-2xl border flex flex-col justify-between h-32 ${
        status === 'Warning' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-900 border-slate-800'
    }`}>
        <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h4>
        <div className="flex items-end justify-between">
            <span className={`text-3xl font-bold font-['PingFang_SC'] ${status === 'Warning' ? 'text-amber-400' : 'text-white'}`}>
                {value}
            </span>
            {status === 'Warning' && <AlertTriangle size={20} className="text-amber-500 mb-1" />}
        </div>
    </div>
);

const ComplianceDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <ShieldAlert size={32} className="text-indigo-500"/>
              大运营风控雷达 (Risk Radar)
          </h2>
          <p className="text-slate-400 text-lg mt-2">三道红线监测与全周期经营风险预警</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold transition-colors border border-slate-700">
                导出合规报告
            </button>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-base font-bold shadow-lg transition-colors flex items-center gap-2">
                <Activity size={18} />
                启动压力测试
            </button>
        </div>
      </div>

      {/* 1. Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RiskCard 
            title={riskMetrics.hhi.desc} 
            value={riskMetrics.hhi.value.toString()} 
            status={riskMetrics.hhi.status} 
          />
          <RiskCard 
            title={riskMetrics.region.desc} 
            value={riskMetrics.region.value} 
            status={riskMetrics.region.status} 
          />
          <RiskCard 
            title={riskMetrics.top5.desc} 
            value={riskMetrics.top5.value} 
            status={riskMetrics.top5.status} 
          />
          <RiskCard 
            title={riskMetrics.top10.desc} 
            value={riskMetrics.top10.value} 
            status={riskMetrics.top10.status} 
          />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. Risk Trend Analysis */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-white text-xl flex items-center gap-2">
                      <TrendingUp size={20} className="text-emerald-500" />
                      债务敞口与风险指数趋势
                  </h3>
                  <div className="flex gap-2">
                      <span className="text-xs flex items-center gap-1 text-slate-400">
                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div> 债务规模
                      </span>
                      <span className="text-xs flex items-center gap-1 text-slate-400">
                          <div className="w-2 h-2 rounded-full bg-rose-500"></div> 风险指数
                      </span>
                  </div>
              </div>
              <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={riskTrendData}>
                          <defs>
                              <linearGradient id="colorExposure" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#f43f5e', fontSize: 12}} />
                          <Tooltip 
                              contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}
                              itemStyle={{ color: '#e2e8f0' }}
                          />
                          <Area yAxisId="left" type="monotone" dataKey="exposure" name="债务规模 (亿)" stroke="#6366f1" fillOpacity={1} fill="url(#colorExposure)" />
                          <Line yAxisId="right" type="monotone" dataKey="riskIndex" name="综合风险指数" stroke="#f43f5e" strokeWidth={3} dot={{r: 4}} />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* 3. Correlation Matrix */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
              <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2">
                  <LayoutGrid size={20} className="text-amber-500" />
                  区域市场风险传导矩阵
              </h3>
              <div className="flex-1 flex flex-col justify-center items-center overflow-auto">
                  <div className="grid grid-cols-6 gap-1 text-xs">
                      {/* Header Row */}
                      <div className="w-10 h-10"></div>
                      {funds.map((f, i) => (
                          <div key={i} className="w-10 h-10 flex items-center justify-center font-bold text-slate-500 rotate-[-45deg]">{f}</div>
                      ))}

                      {/* Data Rows */}
                      {correlationData.map((row, rIdx) => (
                          <React.Fragment key={rIdx}>
                              <div className="w-10 h-10 flex items-center justify-center font-bold text-slate-500">{row[0]}</div>
                              {row.slice(1).map((val, cIdx) => (
                                  <div 
                                      key={cIdx} 
                                      className={`w-10 h-10 flex items-center justify-center rounded text-[10px] font-bold transition-all hover:scale-110 cursor-default ${getColorByValue(val as number)}`}
                                      title={`Correlation: ${val}`}
                                  >
                                      {val === 1 ? '1.0' : (val as number).toFixed(2)}
                                  </div>
                              ))}
                          </React.Fragment>
                      ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-6 text-center max-w-[200px]">
                      * 高相关性意味着不同区域受政策调控影响的趋同性。
                  </p>
              </div>
          </div>
      </div>

      {/* 4. Penetration & Exposure Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-white text-xl flex items-center gap-3">
                  <ZoomIn size={24} className="text-blue-500" />
                  资产穿透风险暴露 (按业态 × 区域 × 阶段)
              </h3>
              <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded border border-indigo-500/30">Total Value: ¥1220亿</span>
              </div>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-left">
                  <thead className="bg-slate-800 text-slate-400 text-sm">
                      <tr>
                          <th className="p-4 font-bold">业态 (Type)</th>
                          <th className="p-4 font-bold">区域 (Region)</th>
                          <th className="p-4 font-bold">开发阶段 (Stage)</th>
                          <th className="p-4 font-bold text-right">资产货值 (亿)</th>
                          <th className="p-4 font-bold">风险评分 (0-100)</th>
                          <th className="p-4 font-bold">AI 建议</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50 text-sm">
                      {penetrationData.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50 transition-colors group">
                              <td className="p-4 font-bold text-white flex items-center gap-2">
                                  <GitCommit size={16} className="text-slate-500" />
                                  {item.industry}
                              </td>
                              <td className="p-4 text-slate-300">{item.region}</td>
                              <td className="p-4 text-slate-300">
                                  <span className="px-2 py-1 bg-slate-800 rounded text-xs border border-slate-700">{item.stage}</span>
                              </td>
                              <td className="p-4 text-right font-mono font-bold text-white">{item.exposure}</td>
                              <td className="p-4">
                                  <div className="flex items-center gap-3">
                                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                          <div 
                                              className={`h-full rounded-full ${item.riskScore > 80 ? 'bg-rose-500' : item.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                              style={{ width: `${item.riskScore}%` }}
                                          ></div>
                                      </div>
                                      <span className={`font-bold ${item.riskScore > 80 ? 'text-rose-500' : item.riskScore > 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                          {item.riskScore}
                                      </span>
                                  </div>
                              </td>
                              <td className="p-4 text-slate-400 italic text-xs">
                                  {item.riskScore > 80 ? '建议加速去化或整售' : item.riskScore > 50 ? '需持续监控去化率' : '风险可控'}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
