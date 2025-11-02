import React from 'react';
import { Client } from '../types/types';
import { Mail, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAppContext } from '../context/appContext';
import { getProjectsByClientId, getClientRevenue, getCardBackground, getTextColor, getSecondaryTextColor } from '../utils';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const { theme } = useTheme();
  const { state } = useAppContext();
  
  const clientProjects = getProjectsByClientId(state.projects, client.id);
  const clientRevenue = getClientRevenue(client.id, state.projects, state.payments);

  return (
    <div className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${getCardBackground(theme)} border-2 hover:border-blue-400`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-xl font-bold ${getTextColor(theme)}`}>
              {client.name}
            </h3>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className={`h-4 w-4 ${getSecondaryTextColor(theme)}`} />
                <span className={`text-sm ${getSecondaryTextColor(theme)}`}>
                  {client.country}
                </span>
              </div>
              {client.email && (
                <div className="flex items-center space-x-1">
                  <Mail className={`h-4 w-4 ${getSecondaryTextColor(theme)}`} />
                  <span className={`text-sm ${getSecondaryTextColor(theme)}`}>
                    {client.email}
                  </span>
                </div>
              )}
            </div>
          </div>
       
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Briefcase className={`h-4 w-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
              }`} />
              <span className={`text-sm font-semibold ${getTextColor(theme)}`}>
                Projects
              </span>
            </div>
            <p className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {clientProjects.length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className={`h-4 w-4 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
              }`} />
              <span className={`text-sm font-semibold ${getTextColor(theme)}`}>
                Revenue
              </span>
            </div>
            <p className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              ${clientRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;