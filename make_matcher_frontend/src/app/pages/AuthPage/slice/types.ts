/* --- STATE --- */
export interface AuthState {
  username: null | string;
  accessToken: null | string;
  refreshToken: null | string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCreds {
  email: string;
  password: string;
}
