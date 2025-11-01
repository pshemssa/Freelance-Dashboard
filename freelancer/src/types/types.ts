export interface Client{
    id : string;
    name: string;
    country: string;
    email?: string;
}
export interface Project{
    id: string;
    clientId:string;
    title:string;
    budget:number;
    status: "pending" | "in-progress" | "completed";
    paymentStatus: "paid" | "unpaid";
}
export interface payment{
    projectId: string;
    amount: number;
    date: string;
}