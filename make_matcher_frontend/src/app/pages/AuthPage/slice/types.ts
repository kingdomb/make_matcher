/* --- STATE --- */
export interface AuthState {
  username: null | string;
  id: null | number;
  accessToken: null | string;
  refreshToken: null | string;
  isAuthenticated: boolean;
  loading: boolean;
  error: ErrorType | null;
}

export interface LoginCreds {
  email: string;
  password: string;
}

export interface SignupCreds {
  username: string;
  email: string;
  password: string;
  zipCode: string;
}

export interface ErrorType {
  statusCode: string;
  errorMessage: string;
}
