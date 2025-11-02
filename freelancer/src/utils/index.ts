import { Client, Project, Payment, DashboardStats, AppState } from '../types/types';
import { Theme } from '../types/theme';

// Count paid vs unpaid projects
export const countPaymentStatus = (projects: Project[]): { paid: number; unpaid: number } => {
  return projects.reduce(
    (acc, project) => {
      if (project.paymentStatus === "paid") {
        acc.paid += 1;
      } else {
        acc.unpaid += 1;
      }
      return acc;
    },
    { paid: 0, unpaid: 0 }
  );
};

// Find client by ID safely with type narrowing
export const findClientById = (clients: Client[], clientId: string): Client | undefined => {
  return clients.find(client => client.id === clientId);
};

// Type-safe client lookup with proper error handling
export const getClientName = (clients: Client[], clientId: string): string => {
  const client = findClientById(clients, clientId);
  return client ? client.name : "Client not found";
};

// Record a new payment with validation
export const recordPayment = (
  projectId: string,
  amount: number,
  existingPayments: Payment[]
): Payment | null => {
  if (amount <= 0) {
    console.error("Payment amount must be positive");
    return null;
  }

  const existingPayment = existingPayments.find(payment => payment.projectId === projectId);
  if (existingPayment) {
    console.error("Payment already exists for this project");
    return null;
  }

  return {
    projectId,
    amount,
    date: new Date().toISOString()
  };
};

// Filter projects by status or payment state
export const filterProjects = (
  projects: Project[],
  filters: {
    status?: Project["status"];
    paymentStatus?: Project["paymentStatus"];
  }
): Project[] => {
  return projects.filter(project => {
    if (filters.status && project.status !== filters.status) return false;
    if (filters.paymentStatus && project.paymentStatus !== filters.paymentStatus) return false;
    return true;
  });
};

// Search clients or projects by name
export const searchItems = <T extends Client | Project>(
  items: T[],
  query: string
): T[] => {
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    'name' in item ? 
    item.name.toLowerCase().includes(lowerQuery) :
    'title' in item ?
    item.title.toLowerCase().includes(lowerQuery) :
    false
  );
};

// Calculate dashboard statistics
export const calculateDashboardStats = (state: AppState): DashboardStats => {
  const { paid, unpaid } = countPaymentStatus(state.projects);
  const totalRevenue = state.payments.reduce((sum, payment) => sum + payment.amount, 0);

  return {
    totalProjects: state.projects.length,
    paidProjects: paid,
    unpaidProjects: unpaid,
    totalClients: state.clients.length,
    totalRevenue
  };
};

// NEW: Get projects by client ID
export const getProjectsByClientId = (projects: Project[], clientId: string): Project[] => {
  const clientProjects: Project[] = [];
  
  for (const project of projects) {
    if (project.clientId === clientId) {
      clientProjects.push(project);
    }
  }
  
  return clientProjects;
};

// NEW: Calculate total revenue by client
export const getClientRevenue = (clientId: string, projects: Project[], payments: Payment[]): number => {
  let revenue = 0;
  
  // Find all projects for this client
  for (const project of projects) {
    if (project.clientId === clientId) {
      // Find payment for this project
      for (const payment of payments) {
        if (payment.projectId === project.id) {
          revenue += payment.amount;
          break; // Each project should have only one payment
        }
      }
    }
  }
  
  return revenue;
};

// NEW: Check if project has payment
export const hasPayment = (projectId: string, payments: Payment[]): boolean => {
  for (const payment of payments) {
    if (payment.projectId === projectId) {
      return true;
    }
  }
  return false;
};

// NEW: Get payment by project ID
export const getPaymentByProjectId = (projectId: string, payments: Payment[]): Payment | undefined => {
  for (const payment of payments) {
    if (payment.projectId === projectId) {
      return payment;
    }
  }
  return undefined;
};

// NEW: Format currency consistently
export const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString()}`;
};

// NEW: Format date consistently
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Conditional styling utilities
export const getStatusColor = (status: string, theme: Theme = 'light'): string => {
  const isDark = theme === 'dark';
    
  switch (status) {
    case "completed":
      return isDark 
        ? "bg-green-900 text-green-200 border border-green-700" 
        : "bg-green-100 text-green-800 border border-green-200";
    case "paid":
      return isDark
        ? "bg-emerald-900 text-emerald-200 border border-emerald-700"
        : "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case "in-progress":
      return isDark
        ? "bg-blue-900 text-blue-200 border border-blue-700"
        : "bg-blue-100 text-blue-800 border border-blue-200";
    case "pending":
      return isDark
        ? "bg-amber-900 text-amber-200 border border-amber-700"
        : "bg-amber-100 text-amber-800 border border-amber-200";
    case "unpaid":
      return isDark
        ? "bg-rose-900 text-rose-200 border border-rose-700"
        : "bg-rose-100 text-rose-800 border border-rose-200";
    default:
      return isDark
        ? "bg-gray-800 text-gray-200 border border-gray-600"
        : "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

export const getCardBackground = (theme: Theme): string => {
  return theme === 'dark' 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-gray-200";
};

// Text colors based on theme
export const getTextColor = (theme: Theme): string => {
  return theme === 'dark' ? "text-gray-100" : "text-gray-900";
};

export const getSecondaryTextColor = (theme: Theme): string => {
  return theme === 'dark' ? "text-gray-300" : "text-gray-600";
};

// Button styles based on theme
export const getPrimaryButtonStyle = (theme: Theme): string => {
  return theme === 'dark'
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-blue-600 hover:bg-blue-700 text-white";
};

export const getSecondaryButtonStyle = (theme: Theme): string => {
  return theme === 'dark'
    ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
    : "bg-gray-200 hover:bg-gray-300 text-gray-700";
};

// Input styles based on theme
export const getInputStyle = (theme: Theme): string => {
  return theme === 'dark'
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500";
};

// Stat card background based on theme
export const getStatCardBackground = (theme: Theme): string => {
  return theme === 'dark'
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
};