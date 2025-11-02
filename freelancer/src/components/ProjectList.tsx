import React, { useState } from 'react';
import { Project, ProjectStatus, PaymentStatus } from '../types/types';
import { Filter, Search, DollarSign, User, Clock, CheckCircle, AlertCircle} from 'lucide-react';
import { getStatusColor, getCardBackground, getTextColor, getSecondaryTextColor, getInputStyle } from '../utils';
import { useTheme } from '../context/ThemeContext';

interface ProjectListProps {
  projects: Project[];
  clients: { id: string; name: string }[];
  onMarkAsPaid: (projectId: string, amount: number) => void;
  onUpdateStatus: (projectId: string, status: ProjectStatus) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  clients,
  onMarkAsPaid,
  onUpdateStatus,
  
}) => {
  const { theme } = useTheme();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = projects.filter(project => {
    if (statusFilter !== "all" && project.status !== statusFilter) return false;
    if (paymentFilter !== "all" && project.paymentStatus !== paymentFilter) return false;
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getClientName = (clientId: string): string => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : "Client not found";
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className={`rounded-xl p-6 ${getCardBackground(theme)} shadow-lg`}>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-3 w-full rounded-lg border transition-colors ${getInputStyle(theme)}`}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "all")}
                className={`pl-10 pr-8 py-3 rounded-lg border appearance-none transition-colors ${getInputStyle(theme)}`}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus | "all")}
              className={`px-4 py-3 rounded-lg border transition-colors ${getInputStyle(theme)}`}
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${getCardBackground(theme)} border-2 hover:border-blue-400`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-bold ${getTextColor(theme)}`}>
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(project.status, theme)}`}>
                      {getStatusIcon(project.status)}
                      <span>{project.status.replace("-", " ")}</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(project.paymentStatus, theme)}`}>
                      <DollarSign className="h-3 w-3" />
                      <span>{project.paymentStatus}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className={`h-4 w-4 ${getSecondaryTextColor(theme)}`} />
                    <span className={getSecondaryTextColor(theme)}>
                      Client: {getClientName(project.clientId)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className={`h-4 w-4 ${getSecondaryTextColor(theme)}`} />
                    <span className={getSecondaryTextColor(theme)}>
                      Budget: ${project.budget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                {/* Status Update */}
                <select
                  value={project.status}
                  onChange={(e) => onUpdateStatus(project.id, e.target.value as ProjectStatus)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-colors ${getInputStyle(theme)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                {/* Mark as Paid Button */}
                {project.paymentStatus === "unpaid" && (
                  <button
                    onClick={() => onMarkAsPaid(project.id, project.budget)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      theme === 'dark'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>Mark Paid</span>
                  </button>
                )}

               
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className={`text-center py-12 rounded-xl ${getCardBackground(theme)}`}>
            <div className="flex flex-col items-center space-y-3">
              <Search className={`h-12 w-12 ${getSecondaryTextColor(theme)}`} />
              <p className={`text-lg ${getTextColor(theme)}`}>
                No projects found
              </p>
              <p className={getSecondaryTextColor(theme)}>
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;