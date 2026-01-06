
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  observations?: string;
  orderIndex?: number;
}

export enum UserRole {
  ADMIN = 'Administrador',
  USER = 'Usuário',
  VISITOR = 'Visitante'
}

export interface AuthState {
  isLoggedIn: boolean;
  role: UserRole;
}
