
import React, { useState } from 'react';
import { 
    Map, 
    Globe, 
    TrendingUp, 
    TrendingDown, 
    Layout, 
    Target,
    Users,
    Building2,
    ArrowRight
} from 'lucide-react';
import { mockRegionalData } from '../services/mockData';
import { RegionMetric } from '../types';

const RegionMarker: React.FC<{ 
    region: RegionMetric, 
    onClick: () => void, 
    isSelected: boolean 
}> = ({ 
    region, 
    onClick, 
    isSelected 
}) => {
    return (
        <div 
            className="absolute group cursor-pointer"
            style={{ top: region.coordinates.top, left: region.coordinates.left }}
            onClick={onClick}
        >
            <div className="relative flex items-center justify-center">
                {/* Ripple Effect */}
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                    region.status === 'Healthy' ? 'bg-emerald-400' : 
                    region.status === 'Warning' ? 'bg-amber-400' : 'bg-rose-400'
                } h-8 w-8`}></span>
                
                {/* Core Dot */}
                <span className={`relative inline-flex rounded-full h-6 w-6 border-4 border-slate-900 shadow-xl ${
                    region.status === 'Healthy' ? 'bg-emerald-500' : 
                    region.status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'
                } ${isSelected ? 'scale-125 ring-4 ring-white ring-offset-4 ring-offset-indigo-500' : ''}`}></span>

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-56 bg-slate-900 p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-700">
                    <h4 className="text-base font-bold text-white mb-2">{region.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-slate-400">销售额</span>
                        <span className="text-sm font-bold text-slate-200">${region.salesAmount}M</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-slate-400">增长</span>
                        <span className={`text-sm font-bold ${region.growthRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {region.growthRate > 0 ? '+' : ''}{region.growthRate}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegionalDashboard = () => {
    const [viewMode, setViewMode] = useState<'china' | 'global'>('china');
    const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

    const currentData = viewMode === 'china' ? mockRegionalData.china : mockRegionalData.global;
    
    // Default selection logic: if nothing selected, use the first region with highest sales
    const activeRegion = selectedRegionId 
        ? currentData.find(r => r.id === selectedRegionId) || currentData[0]
        : currentData.sort((a,b) => b.salesAmount - a.salesAmount)[0];

    const totalSales = currentData.reduce((acc, curr) => acc + curr.salesAmount, 0);
    const totalProjects = currentData.reduce((acc, curr) => acc + curr.projectCount, 0);

    // Using stable direct SVG links from Wikimedia Commons
    // Use slightly different maps or filters if possible, but for simplicity applying a filter in style
    const mapImage = viewMode === 'china' 
        ? 'https://upload.wikimedia.org/wikipedia/commons/5/5b/China_provinces_blank.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg';

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in gap-8">
            
            {/* Header / Filter Bar */}
            <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        {viewMode === 'china' ? <Map size={32} className="text-indigo-500"/> : <Globe size={32} className="text-indigo-500"/>}
                        {viewMode === 'china' ? '中国大区监测' : '全球业务分布'}
                    </h2>
                    <p className="text-lg text-slate-400 mt-2">
                        {viewMode === 'china' ? '全国各核心战区业绩达成与项目分布情况' : '海外市场拓展与全球交付中心监控'}
                    </p>
                </div>
                
                <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                    <button 
                        onClick={() => { setViewMode('china'); setSelectedRegionId(null); }}
                        className={`px-6 py-3 text-base font-bold rounded-lg transition-all ${
                            viewMode === 'china' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        中国大区
                    </button>
                    <button 
                        onClick={() => { setViewMode('global'); setSelectedRegionId(null); }}
                        className={`px-6 py-3 text-base font-bold rounded-lg transition-all ${
                            viewMode === 'global' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        全球视野
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden">
                
                {/* Left: Map Visualization */}
                <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden flex items-center justify-center bg-slate-900">
                     
                     {/* Map Container */}
                     <div className="relative w-full h-full max-w-5xl max-h-[850px] p-12 select-none">
                        {/* Invert filter to make map white on dark bg or use opacity */}
                        <img 
                            src={mapImage} 
                            alt="Map" 
                            className="w-full h-full object-contain opacity-20 invert"
                            draggable={false}
                        />
                        
                        {/* Overlay Markers */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="relative w-full h-full pointer-events-auto">
                                {currentData.map(region => (
                                    <RegionMarker 
                                        key={region.id} 
                                        region={region} 
                                        isSelected={activeRegion?.id === region.id}
                                        onClick={() => setSelectedRegionId(region.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Map Legend Overlay */}
                        <div className="absolute bottom-8 left-8 bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-700 text-sm shadow-xl text-slate-300">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="font-medium">健康运行</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                <span className="font-medium">存在风险</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                                <span className="font-medium">严重滞后</span>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Right: Data Panel */}
                <div className="w-[420px] flex flex-col gap-8">
                    
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 text-slate-500 mb-2">
                                <Target size={20} />
                                <span className="text-sm font-bold">总销售额 (YTD)</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-['PingFang_SC']">${totalSales}M</div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 text-slate-500 mb-2">
                                <Layout size={20} />
                                <span className="text-sm font-bold">活跃项目</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-['PingFang_SC']">{totalProjects}</div>
                        </div>
                    </div>

                    {/* Active Region Detail */}
                    {activeRegion && (
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm flex-1 flex flex-col overflow-hidden">
                            <div className="p-6 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{activeRegion.name}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-3 py-1 text-xs rounded-full uppercase font-bold tracking-wide ${
                                            activeRegion.status === 'Healthy' ? 'bg-emerald-900/30 text-emerald-400' :
                                            activeRegion.status === 'Warning' ? 'bg-amber-900/30 text-amber-400' : 'bg-rose-900/30 text-rose-400'
                                        }`}>
                                            {activeRegion.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-800 rounded-xl shadow-sm text-indigo-500">
                                    <Building2 size={32} />
                                </div>
                            </div>

                            <div className="p-6 space-y-8 flex-1 overflow-y-auto">
                                <div>
                                    <div className="flex justify-between text-base mb-3">
                                        <span className="text-slate-400 font-medium">业绩达成率</span>
                                        <span className="font-bold text-white text-lg">{Math.round((activeRegion.salesAmount / activeRegion.projectedRevenue) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-3">
                                        <div 
                                            className="bg-indigo-600 h-3 rounded-full" 
                                            style={{ width: `${(activeRegion.salesAmount / activeRegion.projectedRevenue) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-500 mt-2 font-medium">
                                        <span>当前: ${activeRegion.salesAmount}M</span>
                                        <span>目标: ${activeRegion.projectedRevenue}M</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-800 rounded-xl">
                                        <span className="text-sm text-slate-500 block mb-1 font-medium">同比去年</span>
                                        <div className={`flex items-center gap-1 font-bold text-lg ${activeRegion.growthRate >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {activeRegion.growthRate >= 0 ? <TrendingUp size={20}/> : <TrendingDown size={20}/>}
                                            {activeRegion.growthRate}%
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-800 rounded-xl">
                                        <span className="text-sm text-slate-500 block mb-1 font-medium">交付团队</span>
                                        <div className="flex items-center gap-1 font-bold text-slate-300 text-lg">
                                            <Users size={20} className="text-indigo-500"/>
                                            <span>{Math.floor(activeRegion.projectCount * 3.5)} 人</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-3 flex items-center justify-center gap-2 bg-slate-800 text-white rounded-xl text-base font-bold hover:bg-slate-700 transition-colors mt-auto border border-slate-700 shadow-sm">
                                    查看 {activeRegion.name} 详情报表
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Quick List */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex-1">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">区域排名</h4>
                        <div className="space-y-3">
                            {currentData.sort((a,b) => b.salesAmount - a.salesAmount).map((r, i) => (
                                <div 
                                    key={r.id} 
                                    onClick={() => setSelectedRegionId(r.id)}
                                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                                        activeRegion?.id === r.id ? 'bg-indigo-900/30 text-indigo-300' : 'hover:bg-slate-800 text-slate-400'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`text-base font-mono w-6 text-center ${i < 3 ? 'text-indigo-400 font-bold' : 'text-slate-600'}`}>0{i+1}</span>
                                        <span className="text-base font-medium">{r.name}</span>
                                    </div>
                                    <span className="text-base font-bold font-['PingFang_SC']">${r.salesAmount}M</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegionalDashboard;
