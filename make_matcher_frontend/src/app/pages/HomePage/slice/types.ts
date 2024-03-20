/* --- STATE --- */
export interface HomePageState {
  profile: Profile | null;
  loading: boolean;
  error: ErrorType | null;
  updateSuccess: boolean;
}

export interface Profile {
  display_name: string;
  zip_code: string;
  date_of_birth: string;
  intensity: number;
  skill: number;
  language: number;
  days: string[];
  times: string[];
  games: number[];
}

export interface ProfileUpdatePayload {
  profileData: Profile;
  token: string;
}

export interface ErrorType {
  statusCode: string;
  errorMessage: string;
}
