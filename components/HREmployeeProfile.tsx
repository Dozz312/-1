
import React, { useState, useEffect } from 'react';
import { 
    Download, 
    Calendar, 
    AlertTriangle, 
    Smile, 
    Zap, 
    TrendingUp, 
    FileText, 
    MessageSquare, 
    Clock, 
    CheckCircle2, 
    Lock,
    ChevronRight,
    ChevronDown,
    Sparkles,
    User,
    ArrowLeft,
    Search,
    Award,
    Users,
    Folder,
    FolderOpen,
    LayoutGrid,
    MoreHorizontal,
    ChevronLeft,
    Briefcase
} from 'lucide-react';
import { mockEmployees, mockDepartments } from '../services/mockData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { EmployeeProfile, Department } from '../types';

// --- Helper Components ---

const Avatar = ({ src, name, size = "md", className = "" }: { src: string, name: string, size?: "sm" | "md" | "lg" | "xl", className?: string }) => {
    const [error, setError] = useState(false);
    
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-16 h-16 text-xl",
        lg: "w-20 h-20 text-2xl",
        xl: "w-24 h-24 text-3xl"
    };

    if (error || !src) {
        return (
            <div className={`${sizeClasses[size]} rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold border-2 border-slate-600 ${className}`}>
                {name.charAt(0)}
            </div>
        );
    }

    return (
        <img 
            src={src} 
            alt={name} 
            onError={() => setError(true)}
            className={`${sizeClasses[size]} rounded-full object-cover ${className}`} 
        />
    );
};

interface EmployeeCardProps {
    employee: EmployeeProfile;
    onClick: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => (
    <div onClick={onClick} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden flex flex-col items-center text-center h-full">
        {employee.isManager && (
            <div className="absolute top-0 right-0 bg-indigo-900/50 text-indigo-300 text-[10px] font-bold px-2 py-1 rounded-bl-lg border-l border-b border-indigo-500/20 flex items-center gap-1">
                <Users size={10} /> 负责人
            </div>
        )}
        
        {/* Avatar Section */}
        <div className="relative mb-4 flex-shrink-0">
            <Avatar 
                src={employee.avatar} 
                name={employee.name} 
                size="md" 
                className="border-2 border-slate-700 group-hover:border-indigo-500 transition-colors"
            />
            {employee.riskScore > 70 && (
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-rose-500 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-md z-10 text-white">
                    <AlertTriangle size={12} />
                </div>
            )}
        </div>

        {/* Info Section */}
        <div className="w-full">
            <h3 className="text-white font-bold text-lg mb-1 truncate">{employee.name}</h3>
            <p className="text-slate-400 text-sm mb-3 truncate">{employee.role}</p>
            <div className="flex justify-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700 font-mono">
                    {employee.level}
                </span>
            </div>
        </div>
    </div>
);

// Department Head Card - Enhanced Version
const HeadCard: React.FC<{ employee: EmployeeProfile, onClick: () => void }> = ({ employee, onClick }) => (
    <div onClick={onClick} className="bg-gradient-to-br from-indigo-950/20 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 flex items-center gap-6 cursor-pointer hover:shadow-xl hover:border-indigo-500/50 transition-all relative overflow-hidden group w-full max-w-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award size={80} className="text-indigo-400" />
        </div>
        
        <div className="relative flex-shrink-0">
            <Avatar 
                src={employee.avatar} 
                name={employee.name} 
                size="lg" 
                className="border-4 border-indigo-500/20 group-hover:border-indigo-500 transition-colors shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full border-2 border-slate-900 font-bold shadow-sm">
                HEAD
            </div>
        </div>
        
        <div className="flex-1 min-w-0 relative z-10">
            <h3 className="text-2xl font-bold text-white mb-1">{employee.name}</h3>
            <p className="text-indigo-200 text-sm font-medium mb-4 flex items-center gap-2">
                {employee.role}
                <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
                {employee.level}
            </p>
            
            {employee.leadershipScore && (
                <div className="flex gap-4">
                    <div className="bg-slate-900/50 rounded-lg px-3 py-2 border border-indigo-500/20">
                        <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-0.5">领导力评分</span>
                        <span className="text-xl font-bold text-white font-mono">{employee.leadershipScore}</span>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg px-3 py-2 border border-indigo-500/20">
                        <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-0.5">风格</span>
                        <span className="text-sm font-bold text-indigo-300">{employee.leadershipStyle}</span>
                    </div>
                </div>
            )}
        </div>
        
        <div className="p-3 bg-slate-800 rounded-full text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <ChevronRight size={20} />
        </div>
    </div>
);

// Tree Node Component
const DepartmentTreeNode: React.FC<{ 
    node: Department, 
    depth?: number, 
    selectedId: string, 
    onSelect: (id: string) => void,
    expandedIds: Set<string>,
    toggleExpand: (id: string) => void
}> = ({ 
    node, 
    depth = 0, 
    selectedId, 
    onSelect,
    expandedIds,
    toggleExpand
}) => {
    const isSelected = selectedId === node.id;
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="select-none">
            <div 
                className={`flex items-center gap-2 py-3 px-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                    isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                style={{ paddingLeft: `${depth * 16 + 12}px` }}
                onClick={() => onSelect(node.id)}
            >
                <div 
                    className="p-0.5 hover:bg-white/10 rounded cursor-pointer"
                    onClick={(e) => {
                        if (hasChildren) {
                            e.stopPropagation();
                            toggleExpand(node.id);
                        }
                    }}
                >
                    {hasChildren ? (
                        isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : (
                        <span className="w-3.5 block"></span> // Spacer
                    )}
                </div>
                
                {isExpanded ? <FolderOpen size={16} className={isSelected ? 'text-white' : 'text-indigo-400'} /> : <Folder size={16} className={isSelected ? 'text-white' : 'text-slate-500'} />}
                
                <span className="flex-1 text-sm font-medium truncate">{node.name}</span>
                {node.memberCount > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {node.memberCount}
                    </span>
                )}
            </div>
            
            {isExpanded && hasChildren && (
                <div className="animate-fade-in-down">
                    {node.children!.map(child => (
                        <DepartmentTreeNode 
                            key={child.id} 
                            node={child} 
                            depth={depth + 1} 
                            selectedId={selectedId} 
                            onSelect={onSelect}
                            expandedIds={expandedIds}
                            toggleExpand={toggleExpand}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const HREmployeeProfile = () => {
    const [viewMode, setViewMode] = useState<'directory' | 'detail'>('directory');
    const [selectedDeptId, setSelectedDeptId] = useState<string>(mockDepartments[0].id);
    const [expandedDeptIds, setExpandedDeptIds] = useState<Set<string>>(new Set([mockDepartments[0].id]));
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProfile | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Reset pagination when department changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedDeptId]);

    // Helpers to find current dept object
    const findDept = (nodes: Department[], id: string): Department | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findDept(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const currentDept = findDept(mockDepartments, selectedDeptId);
    
    // Get related data
    const departmentHead = currentDept?.managerId 
        ? mockEmployees.find(e => e.id === currentDept.managerId) 
        : null;
        
    // Direct members: Employees in this specific dept ID (excluding head)
    // NOTE: In mockData, sub-departments have different IDs. We aggregate for demo if it's a parent node, or just direct.
    // For this specific UI, let's just show direct members of the selected node + fake some if empty for visual fullness
    let directMembers = mockEmployees.filter(e => 
        e.departmentId === selectedDeptId && e.id !== departmentHead?.id
    );
    
    // If we select a parent node (like Product R&D), we might want to show children from sub-nodes if direct represents "all".
    // For simplicity, sticking to exact ID match.

    // Calculate pagination
    const totalPages = Math.ceil(directMembers.length / itemsPerPage);
    const paginatedMembers = directMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleExpand = (id: string) => {
        const newSet = new Set(expandedDeptIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedDeptIds(newSet);
    };

    const handleEmployeeClick = (employee: EmployeeProfile) => {
        setSelectedEmployee(employee);
        setViewMode('detail');
    };

    const handleBack = () => {
        setViewMode('directory');
        setSelectedEmployee(null);
    };

    if (viewMode === 'directory') {
        return (
            <div className="h-full flex flex-col animate-fade-in pb-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            <User size={32} className="text-indigo-500" />
                            官方组织架构
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            全员数字化人才库与层级视图
                        </p>
                    </div>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="搜索姓名、职位..." 
                            className="bg-slate-900 border border-slate-800 text-white pl-9 pr-4 py-2 rounded-xl w-64 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                        />
                    </div>
                </div>

                <div className="flex gap-6 h-full overflow-hidden">
                    {/* Sidebar: Tree Structure */}
                    <div className="w-72 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm flex flex-col overflow-hidden shrink-0">
                        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <LayoutGrid size={14} />
                                部门导航
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                            {mockDepartments.map(dept => (
                                <DepartmentTreeNode 
                                    key={dept.id} 
                                    node={dept} 
                                    selectedId={selectedDeptId}
                                    onSelect={setSelectedDeptId}
                                    expandedIds={expandedDeptIds}
                                    toggleExpand={toggleExpand}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Main Content: Department View */}
                    <div className="flex-1 bg-slate-900/50 rounded-2xl border border-slate-800/50 p-8 overflow-y-auto custom-scrollbar">
                        {currentDept ? (
                            <div className="space-y-8 animate-fade-in">
                                {/* Breadcrumb / Header */}
                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                    <span className="hover:text-indigo-400 cursor-pointer">Company</span>
                                    <ChevronRight size={14} />
                                    <span className="text-white font-bold">{currentDept.name}</span>
                                </div>

                                {/* Section 1: Department Head */}
                                {departmentHead && (
                                    <div className="mb-8">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <Award size={16} /> 部门负责人
                                        </h4>
                                        <HeadCard 
                                            employee={departmentHead} 
                                            onClick={() => handleEmployeeClick(departmentHead)} 
                                        />
                                    </div>
                                )}

                                {/* Section 2: Sub-Departments / Teams */}
                                {currentDept.children && currentDept.children.length > 0 && (
                                    <div className="mb-8">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <LayoutGrid size={16} /> 下级部门 / 项目组
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {currentDept.children.map(child => (
                                                <div 
                                                    key={child.id} 
                                                    onClick={() => {
                                                        setSelectedDeptId(child.id);
                                                        if (!expandedDeptIds.has(currentDept.id)) toggleExpand(currentDept.id);
                                                    }}
                                                    className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-xl cursor-pointer transition-all group hover:shadow-md"
                                                >
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="p-2.5 bg-slate-800 rounded-lg text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                            <Folder size={20} />
                                                        </div>
                                                        <h5 className="font-bold text-slate-200 group-hover:text-white truncate text-base">{child.name}</h5>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                                                        <span className="font-medium">{child.memberCount} 成员</span>
                                                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Section 3: Direct Members */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                            <Users size={16} /> 
                                            直属成员 ({directMembers.length})
                                        </h4>
                                        <span className="text-xs text-slate-500">
                                            Showing {paginatedMembers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, directMembers.length)} of {directMembers.length}
                                        </span>
                                    </div>
                                    
                                    {paginatedMembers.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                                {paginatedMembers.map(emp => (
                                                    <EmployeeCard key={emp.id} employee={emp} onClick={() => handleEmployeeClick(emp)} />
                                                ))}
                                            </div>
                                            
                                            {/* Pagination Controls */}
                                            {totalPages > 1 && (
                                                <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-slate-800/50">
                                                    <button 
                                                        disabled={currentPage === 1}
                                                        onClick={() => setCurrentPage(p => p - 1)}
                                                        className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <ChevronLeft size={16} />
                                                    </button>
                                                    <span className="text-sm font-medium text-slate-400">
                                                        Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                                                    </span>
                                                    <button 
                                                        disabled={currentPage === totalPages}
                                                        onClick={() => setCurrentPage(p => p + 1)}
                                                        className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <ChevronRight size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-slate-600 text-sm italic py-4">暂无直属成员数据 (或已在下级部门中)</div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                <p>请选择一个部门查看详情</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Detail View
    const profile = selectedEmployee || mockEmployees[0]; 

    return (
        <div className="w-full flex flex-col animate-fade-in pb-10">
            {/* Nav Back */}
            <div className="mb-6 flex-shrink-0">
                <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold px-3 py-2 hover:bg-slate-800 rounded-lg w-fit">
                    <ArrowLeft size={16} />
                    返回组织架构
                </button>
            </div>

            {/* Header Profile Card - Matches Screenshot 2 */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 mb-8 shadow-md relative overflow-hidden flex-shrink-0">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 relative z-20">
                    <div className="flex items-center gap-6 min-w-0 flex-1">
                        <div className="relative flex-shrink-0">
                            <Avatar 
                                src={profile.avatar} 
                                name={profile.name} 
                                size="xl" 
                                className="border-4 border-slate-700 shadow-xl"
                            />
                            {/* Online Status */}
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#0f172a]"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-4 mb-2 flex-wrap">
                                <h1 className="text-4xl font-bold text-white tracking-tight truncate">{profile.name}</h1>
                                {profile.isManager && (
                                    <span className="px-3 py-1 bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                                        <Users size={12} /> 团队负责人
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-6 text-slate-400 text-sm font-medium flex-wrap mt-3">
                                <span className="flex items-center gap-2"><Briefcase size={16}/> {profile.role}</span>
                                <span className="flex items-center gap-2"><Folder size={16}/> {profile.department}</span>
                                <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700 whitespace-nowrap">{profile.level}</span>
                                <span className="text-slate-500 whitespace-nowrap">司龄: {profile.tenure}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-3 flex-shrink-0 z-30">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-slate-600 hover:border-slate-500 hover:bg-slate-800 rounded-lg text-slate-300 text-sm font-bold transition-colors whitespace-nowrap">
                            <Calendar size={16} />
                            预约 1:1
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-900/30 transition-colors whitespace-nowrap">
                            <Download size={16} />
                            导出档案
                        </button>
                    </div>
                </div>
            </div>

            {/* Metrics Row - Matches Screenshot 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 flex-shrink-0">
                {/* Leadership */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-36 relative overflow-hidden">
                    <div className="flex justify-between items-start z-10 mb-2">
                        <span className="text-slate-400 font-medium text-sm flex items-center gap-2">
                            <Award size={14} />
                            领导力评分
                        </span>
                    </div>
                    <div className="relative z-10">
                        <div className="text-5xl font-bold text-white mb-3 font-['PingFang_SC']">
                            {profile.leadershipScore}
                        </div>
                        <div className="w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent h-[1px] mb-3"></div>
                        <p className="text-xs text-slate-400">风格: <span className="text-white font-bold">{profile.leadershipStyle}</span></p>
                    </div>
                </div>

                {/* Risk */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-36 relative overflow-hidden">
                    <div className="flex justify-between items-start z-10 mb-2">
                        <span className="text-slate-400 font-medium text-sm">离职意愿</span>
                        {profile.riskScore > 50 && <span className="bg-rose-900/30 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-900/50">高危</span>}
                    </div>
                    <div className="relative z-10">
                        <div className="text-5xl font-bold text-white mb-3 font-['PingFang_SC'] flex items-baseline gap-1">
                            {profile.riskScore}<span className="text-2xl text-slate-500">%</span>
                        </div>
                        <div className="w-full bg-rose-500/20 rounded-full h-1.5">
                            <div className="bg-rose-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" style={{width: `${profile.riskScore}%`}}></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">基于行为数据预测</p>
                    </div>
                    {/* Background Graphic */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                        <AlertTriangle size={80} />
                    </div>
                </div>

                {/* Satisfaction */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-36 relative overflow-hidden">
                    <div className="flex justify-between items-start z-10 mb-2">
                        <span className="text-slate-400 font-medium text-sm">满意度</span>
                        <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">稳定</span>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-white mb-3 font-['PingFang_SC'] flex items-baseline gap-1">
                            {profile.satisfactionScore} <span className="text-xl text-slate-500">/10</span>
                        </div>
                        <div className="flex gap-1 h-1.5 mb-2">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className={`flex-1 rounded-full ${i <= Math.round(profile.satisfactionScore/2) ? 'bg-amber-400' : 'bg-slate-800'}`}></div>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500">团队氛围语义分析</p>
                    </div>
                </div>

                {/* Stress */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-36 relative overflow-hidden">
                    <div className="flex justify-between items-start z-10 mb-2">
                        <span className="text-slate-400 font-medium text-sm">压力评分</span>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-white mb-3 font-['PingFang_SC'] flex items-baseline gap-1">
                            {profile.stressScore} <span className="text-xl text-slate-500">/10</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                            <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-1.5 rounded-full" style={{width: `${profile.stressScore * 10}%`}}></div>
                        </div>
                        <p className="text-[10px] text-slate-500">基于工时与沟通密度</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                
                {/* Left Column (2/3): AI Analysis & Chart */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    
                    {/* AI Summary Box - Matches Screenshot 3 */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/20">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white">AI 综合分析摘要</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            {profile.aiSummary}
                        </p>
                        
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Zap size={10}/> 工作效率</div>
                                <div className="text-2xl font-bold text-white mb-1">{profile.efficiency}%</div>
                                <div className="text-[10px] text-emerald-400">部门前 5%</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><TrendingUp size={10}/> 影响力评分</div>
                                <div className="text-2xl font-bold text-white mb-1">{profile.influence}</div>
                                <div className="text-[10px] text-slate-400">极高</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Smile size={10}/> 好评度评分</div>
                                <div className="text-xl font-bold text-emerald-400 mb-1">正面</div>
                                <div className="text-[10px] text-emerald-600">频繁获赞</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Clock size={10}/> 工作成果占比</div>
                                <div className="text-2xl font-bold text-white mb-1">{profile.workOutput}%</div>
                                <div className="text-[10px] text-slate-400">项目主导</div>
                            </div>
                        </div>
                    </div>

                    {/* Chart (Performance vs Stress) */}
                    {profile.metrics.length > 0 && (
                        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex-1 min-h-[350px] flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">绩效 vs 压力趋势 (近6个月)</h3>
                                <div className="flex gap-4 text-xs font-bold">
                                    <span className="flex items-center gap-2 text-slate-400"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 效率</span>
                                    <span className="flex items-center gap-2 text-slate-400"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 压力</span>
                                </div>
                            </div>
                            <div className="flex-1 w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={profile.metrics}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                        <XAxis dataKey="month" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                                        <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                            itemStyle={{ fontSize: '12px', color: '#fff' }}
                                            cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        />
                                        <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                                        <Line type="monotone" dataKey="stress" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>
                                
                                {/* Overlay Card Effect (Screenshot 3) */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800/90 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-sm pointer-events-none">
                                    <div className="text-xs text-slate-400 mb-1">4月</div>
                                    <div className="text-sm font-bold text-blue-400">efficiency : 88</div>
                                    <div className="text-sm font-bold text-rose-400">stress : 70</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (1/3): Raw Data Source Feed */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col overflow-hidden h-full min-h-[600px]">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]">
                        <h3 className="font-bold text-white text-lg">原始数据来源</h3>
                        <button className="text-xs text-indigo-400 font-bold hover:underline">查看全部</button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-0 custom-scrollbar relative">
                        <div className="p-4 space-y-6">
                            <div className="text-xs text-slate-500 font-bold mb-2">近期活动信号</div>
                            
                            {/* Vertical Line */}
                            <div className="absolute left-8 top-12 bottom-12 w-px bg-slate-800 z-0"></div>

                            {profile.activities.map((act) => (
                                <div key={act.id} className="relative z-10 group flex gap-4 transition-colors cursor-pointer">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0f172a] ${
                                        act.type === 'Doc' ? 'bg-blue-900/50 text-blue-400' : 
                                        act.type === 'Chat' ? 'bg-rose-900/50 text-rose-400' :
                                        act.type === 'Task' ? 'bg-indigo-900/50 text-indigo-400' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                        {act.type === 'Doc' && <FileText size={16} />}
                                        {act.type === 'Chat' && <MessageSquare size={16} />}
                                        {act.type === 'Task' && <CheckCircle2 size={16} />}
                                    </div>
                                    <div className="flex-1 min-w-0 pb-6 border-b border-slate-800/50 group-last:border-0">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-sm font-bold text-white truncate pr-2">{act.title}</h4>
                                            <span className="text-[10px] text-slate-500 shrink-0">{act.time}</span>
                                        </div>
                                        <div className="text-xs text-slate-400 mb-2">{act.summary}</div>
                                        
                                        {act.sentiment === 'Negative' && (
                                            <span className="bg-rose-950 text-rose-400 text-[10px] px-2 py-0.5 rounded border border-rose-900/50 inline-block font-bold">负面情绪</span>
                                        )}
                                        {act.sentiment === 'Positive' && (
                                            <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-900/50 inline-block font-bold">按时完成</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-t border-slate-800 text-center">
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                            <Lock size={12} />
                            敏感内容已进行隐私脱敏处理。
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HREmployeeProfile;
