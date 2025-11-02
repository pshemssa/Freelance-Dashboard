import React from 'react';
import { Moon, Sun, User, Briefcase, DollarSign} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAppContext } from '../context/appContext';
import { calculateDashboardStats } from '../utils';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { state } = useAppContext();
  const stats = calculateDashboardStats(state);

  return (
    <header className={`sticky top-0 z-50 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-b border-gray-700' 
        : 'bg-white border-b border-gray-200'
    } shadow-sm transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              {/* <BriefcaseIcon className="h-6 w-6 text-white" /> */}
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Freelance Dashboard
              </h1>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Manage your Clients, their corresponding projects and payments effeciently 
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <User className={`h-4 w-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
              }`} />
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stats.totalClients} Clients
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className={`h-4 w-4 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-500'
              }`} />
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stats.totalProjects} Projects
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className={`h-4 w-4 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
              }`} />
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                ${stats.totalRevenue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;