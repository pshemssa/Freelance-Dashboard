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
    email: "newtech@gmail.com"
  },
  {
    id: "3",
    name: "NewGig",
    country: "Europe",
    email: "newgig@gmail.com"
  }

];

export const mockProjects: Project[] = [
  {
    id: "1",
    clientId: "1",
    title: "E-commerce Website",
    budget: 5000,
    status: "completed",
    paymentStatus: "unpaid"
  },
  {
    id: "2",
    clientId: "2",
    title: "Mobile App Development",
    budget: 8000,
    status: "in-progress",
    paymentStatus: "paid"
  },
  {
    id: "3",
    clientId: "3",
    title: "Database Design",
    budget: 5000,
    status: "pending",
    paymentStatus: "paid"
  }
];

export const mockPayments: Payment[] = [
  {
    projectId: "1",
    amount: 5000,
    date: new Date().toISOString()
  },
{
    projectId: "3",
    amount: 5000,
    date: new Date().toISOString()
},
{
    projectId: "2",
    amount: 8000,
    date: new Date().toISOString()
}
];