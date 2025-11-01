import React from 'react';
import { Client } from '../types/types';

interface ClientCardProps {
  client: Client;
  onEdit?: (client: Client) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
          <p className="text-gray-600 mt-1">{client.country}</p>
          {client.email && (
            <p className="text-blue-600 mt-1">{client.email}</p>
          )}
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit(client)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientCard;