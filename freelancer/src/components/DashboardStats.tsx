import React from 'react';
import { DashboardStats as DashboardStatsType } from '../types/types';
import { Briefcase, DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getStatCardBackground, getTextColor, getSecondaryTextColor } from '../utils';

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const { theme } = useTheme();

  // Calculate percentages safely
  const paidPercentage = stats.totalProjects > 0 ? (stats.paidProjects / stats.totalProjects) * 100 : 0;
  const unpaidPercentage = stats.totalProjects > 0 ? (stats.unpaidProjects / stats.totalProjects) * 100 : 0;

  const statCards = [
    {
      id: 'total-projects',
      label: "Total Projects",
      value: stats.totalProjects.toString(),
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      bgColor: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50',
      showProgress: false
    },
    {
      id: 'paid-projects',
      label: "Paid Projects",
      value: stats.paidProjects.toString(),
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      textColor: "text-green-100",
      bgColor: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50',
      showProgress: true,
      percentage: Math.round(paidPercentage)
    },
    {
      id: 'unpaid-projects',
      label: "Unpaid Projects",
      value: stats.unpaidProjects.toString(),
      icon: AlertCircle,
      color: "from-rose-500 to-rose-600",
      textColor: "text-rose-100",
      bgColor: theme === 'dark' ? 'bg-rose-900/20' : 'bg-rose-50',
      showProgress: true,
      percentage: Math.round(unpaidPercentage)
    },
    {
      id: 'total-clients',
      label: "Total Clients",
      value: stats.totalClients.toString(),
      icon: Users,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-100",
      bgColor: theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50',
      showProgress: false
    },
    {
      id: 'total-revenue',
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-100",
      bgColor: theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-50',
      showProgress: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {statCards.map((stat) => (
        <div
          key={stat.id}
          className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 ${getStatCardBackground(theme)} border-2 hover:border-opacity-50 ${
            stat.color.includes('blue') ? 'hover:border-blue-400' :
            stat.color.includes('green') ? 'hover:border-green-400' :
            stat.color.includes('rose') ? 'hover:border-rose-400' :
            stat.color.includes('purple') ? 'hover:border-purple-400' :
            'hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${getSecondaryTextColor(theme)} mb-1`}>
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${getTextColor(theme)}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color} ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
          </div>
          
          {/* Progress bar for paid/unpaid projects */}
          {stat.showProgress && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className={getSecondaryTextColor(theme)}>Progress</span>
                <span className={getSecondaryTextColor(theme)}>
                  {stat.percentage}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className={`h-2 rounded-full bg-linear-to-r ${stat.color}`}
                  style={{
                    width: `${stat.percentage}%`
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;