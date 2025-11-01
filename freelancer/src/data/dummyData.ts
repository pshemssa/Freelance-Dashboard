import { Client, Project, Payment } from '../types/types';

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Shemsa Co",
    country: "Rwanda",
    email: "contact@shem.com"
  },
  {
    id: "2",
    name: "NewTech",
    country: "DRC",
    email: "newteach@gmail.com"
  }
];

export const mockProjects: Project[] = [
  {
    id: "1",
    clientId: "1",
    title: "E-commerce Website",
    budget: 5000,
    status: "completed",
    paymentStatus: "paid"
  },
  {
    id: "2",
    clientId: "2",
    title: "Mobile App Development",
    budget: 8000,
    status: "in-progress",
    paymentStatus: "unpaid"
  }
];

export const mockPayments: Payment[] = [
  {
    projectId: "1",
    amount: 5000,
    date: "2024-01-15T00:00:00.000Z"
  }
];