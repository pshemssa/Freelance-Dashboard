import { Project, Client } from '../types/types';
import { useDashboard } from '../context/DashboardContext';
import { getClientName, formatCurrency, getStatusColor, getPaymentStatusColor } from '../utils/dashboard';
import { DollarSign, CheckCircle } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  clients: Client[];
  showActions?: boolean;
}

export function ProjectList({ projects, clients, showActions = true }: ProjectListProps) {
  const { markProjectAsPaid, updateProjectStatus } = useDashboard();

  const handleMarkAsPaid = async (projectId: string) => {
    try {
      await markProjectAsPaid(projectId);
    } catch (error) {
      console.error('Error marking project as paid:', error);
    }
  };

  const handleStatusChange = async (projectId: string, newStatus: Project['status']) => {
    try {
      await updateProjectStatus(projectId, newStatus);
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No projects found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map(project => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600">
                Client: <span className="font-medium">{getClientName(clients, project.client_id)}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(project.payment_status)}`}>
                {project.payment_status}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-700 mb-4">
            <DollarSign className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">{formatCurrency(project.budget)}</span>
          </div>

          {showActions && (
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
              <select
                value={project.status}
                onChange={(e) => handleStatusChange(project.id, e.target.value as Project['status'])}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              {project.payment_status === 'unpaid' && (
                <button
                  onClick={() => handleMarkAsPaid(project.id)}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Paid
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
