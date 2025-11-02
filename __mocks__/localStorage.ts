import { vi } from "vitest";

const store: Record<string, string> = {};

const localStorageMock = {
  getItem: (key: string): string | null => {
    return store[key] || null;
  },
  setItem: (key: string, value: string) => {
    store[key] = value;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    Object.keys(store).forEach(key => delete store[key]);
  },
  length: 0,
  key: vi.fn(), 
};

export default localStorageMock;