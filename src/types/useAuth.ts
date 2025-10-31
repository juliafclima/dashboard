export interface AuthState {
   token: string | null;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
}
