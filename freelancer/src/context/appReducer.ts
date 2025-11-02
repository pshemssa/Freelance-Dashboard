import { AppState, AppAction, Payment } from '../types/types';

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {

    case "MARK_PROJECT_PAID":
      const newPayment: Payment = {
        projectId: action.payload.projectId,
        amount: action.payload.amount,
        date: new Date().toISOString()
      };
      
      return {
        ...state,
        payments: [...state.payments, newPayment],
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, paymentStatus: "paid" as const }
            : project
        )
      };

    case "UPDATE_PROJECT_STATUS":
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, status: action.payload.status }
            : project
        )
      };
    

    default:
      return state;
  }
};