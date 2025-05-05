export interface User {
  id: number;
  username: string;
  userRole: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateUserPayload {
  username: string; 
  passwordConfirmation: { 
    password: string; 
    confirmPassword: string 
  };
  role: string 
}
export interface ConfirmUserPayload {
  username: string; 
  password: string;
  password_confirmation: string;
  role: string 
}