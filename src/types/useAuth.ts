export interface AuthContextType {
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
