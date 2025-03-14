export interface User {
  id: number;
  username: string;
  userRole: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string | null;
}
