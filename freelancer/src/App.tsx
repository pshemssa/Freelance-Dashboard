import React, { useState } from 'react';
import { Search, Users, Briefcase, DollarSign } from 'lucide-react';
import { AppProvider, useAppContext } from './context/appContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ClientCard from './components/ClientCard';
import ProjectList from './components/ProjectList';
import DashboardStats from './components/DashboardStats';
import Header from './components/Header';
import { calculateDashboardStats, searchItems } from './utils';
import { ProjectStatus } from './types/types';

const DashboardContent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"clients" | "projects" | "payments">("clients");

  const stats = calculateDashboardStats(state);

  const filteredClients = searchQuery 
    ? searchItems(state.clients, searchQuery)
    : state.clients;

  const filteredProjects = searchQuery
    ? searchItems(state.projects, searchQuery)
    : state.projects;

  const handleMarkAsPaid = (projectId: string, amount: number) => {
    dispatch({
      type: "MARK_PROJECT_PAID",
      payload: { projectId, amount }
    });
  };

  const handleUpdateStatus = (projectId: string, status: ProjectStatus) => {
    dispatch({
      type: "UPDATE_PROJECT_STATUS",
      payload: { projectId, status }
    });
  };

  const getTabButtonStyle = (tabName: string) => {
    const isActive = activeTab === tabName;
    const baseStyle = "py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2";
    
    if (isActive) {
      return theme === 'dark'
        ? `${baseStyle} bg-blue-600 text-white shadow-lg`
        : `${baseStyle} bg-blue-600 text-white shadow-lg`;
    }
    
    return theme === 'dark'
      ? `${baseStyle} bg-gray-800 text-gray-300 hover:bg-gray-700`
      : `${baseStyle} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <DashboardStats stats={stats} />

        {/* Search and Tabs */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full max-w-2xl">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search clients or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-900'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-100'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-3">
            {([
              { id: "clients", label: "Clients", icon: Users },
              { id: "projects", label: "Projects", icon: Briefcase },
              { id: "payments", label: "Payments", icon: DollarSign }
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={getTabButtonStyle(id)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {id === "projects" && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {state.projects.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "clients" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Clients</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map(client => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
              
              {filteredClients.length === 0 && (
                <div className={`text-center py-12 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <Users className={`h-16 w-16 mx-auto mb-4 ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <p className="text-lg font-medium mb-2">No clients found</p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {searchQuery ? 'Try adjusting your search' : 'No clients available'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Projects</h2>
              </div>

              <ProjectList
                projects={filteredProjects}
                clients={state.clients.map(client => ({ id: client.id, name: client.name }))}
                onMarkAsPaid={handleMarkAsPaid}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Payment History</h2>
              <div className={`rounded-xl shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={`${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    {state.payments.map((payment, index) => {
                      const project = state.projects.find(p => p.id === payment.projectId);
                      return (
                        <tr key={`${payment.projectId}-${index}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {project?.title || "Project not found"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {state.payments.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No payment records found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <DashboardContent />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;