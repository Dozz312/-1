
import React from 'react';
import { ProductLine } from '../types';
import { mockProductLines } from '../services/mockData';
import { 
  Code2, 
  GitMerge, 
  Bug, 
  Rocket, 
  Users, 
  Cpu,
  Globe,
  Zap,
  Layout
} from 'lucide-react';

const ProductCard: React.FC<{ product: ProductLine }> = ({ product }) => {
  const getIcon = (name: string) => {
    if (name.includes('国内')) return <Layout size={32} className="text-blue-500" />;
    if (name.includes('海外')) return <Globe size={32} className="text-indigo-500" />;
    if (name.includes('POP')) return <Zap size={32} className="text-amber-500" />;
    return <Cpu size={32} className="text-emerald-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Released': return 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50';
      case 'Testing': return 'bg-amber-900/30 text-amber-400 border-amber-900/50';
      case 'Development': return 'bg-blue-900/30 text-blue-400 border-blue-900/50';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-slate-700 group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-5">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 h-fit">
            {getIcon(product.name)}
          </div>
          <div>
            <h3 className="font-bold text-2xl text-white mb-1">{product.name}</h3>
            <span className="text-sm font-medium text-slate-500">{product.version}</span>
            <p className="text-base text-slate-400 mt-3 line-clamp-2 min-h-[50px] leading-relaxed">{product.description}</p>
          </div>
        </div>
        <span className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${getStatusColor(product.status)}`}>
          {product.status === 'Development' ? '研发中' : 
           product.status === 'Testing' ? '测试中' : 
           product.status === 'Released' ? '已发布' : '规划中'}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span className="text-slate-400">当前版本进度</span>
          <span className="font-bold text-white">{product.progress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-4 border border-slate-700/50">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-1000 relative overflow-hidden" 
            style={{ width: `${product.progress}%` }}
          >
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
            <Users size={16} />
            <span className="text-sm font-medium">研发人力</span>
          </div>
          <span className="font-bold text-xl text-slate-200">{product.activeDevelopers}人</span>
        </div>
        <div className="text-center border-l border-slate-800">
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
            <Bug size={16} />
            <span className="text-sm font-medium">遗留 Bug</span>
          </div>
          <span className={`font-bold text-xl ${product.bugs > 10 ? 'text-rose-500' : 'text-slate-200'}`}>{product.bugs}</span>
        </div>
        <div className="text-center border-l border-slate-800">
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
            <Rocket size={16} />
            <span className="text-sm font-medium">预计发布</span>
          </div>
          <span className="font-bold text-lg text-slate-200 mt-1 block">{product.nextReleaseDate.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  );
};

const ProductRDDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">产品研发中心</h2>
          <p className="text-slate-400 text-lg mt-2">核心产品线研发进度与交付质量监控</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-slate-900 px-6 py-3 rounded-xl border border-slate-800 shadow-sm flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                <span className="text-base font-bold text-slate-300">总投入人力: 67人</span>
            </div>
            <div className="bg-slate-900 px-6 py-3 rounded-xl border border-slate-800 shadow-sm flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                <span className="text-base font-bold text-slate-300">本周发布: 1个</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockProductLines.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="bg-indigo-900 text-white rounded-2xl p-8 shadow-xl shadow-black/30 flex items-center justify-between mt-10 relative overflow-hidden border border-indigo-800">
        <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <GitMerge size={28} />
                全线版本冲刺概览
            </h3>
            <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed">
                所有产品线正处于 Q4 关键交付期。POP AI Beta 2.0 需重点关注稳定性测试，模型训练平台 V2.2 基础设施升级进展顺利。
            </p>
        </div>
        <div className="relative z-10 flex gap-6">
            <button className="px-6 py-3 bg-slate-900 text-indigo-300 rounded-xl text-base font-bold hover:bg-slate-800 transition-colors border border-indigo-500/30 shadow-lg">
                查看详细研发看板
            </button>
        </div>
        {/* Decorative background */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-800 to-transparent opacity-50 skew-x-12"></div>
      </div>
    </div>
  );
};

export default ProductRDDashboard;
