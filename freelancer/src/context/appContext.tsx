import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from '../types/types';
import { appReducer } from './appReducer';
import { mockClients, mockProjects, mockPayments } from '../data/dummyData';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  clients: mockClients,
  projects: mockProjects,
  payments: mockPayments
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};