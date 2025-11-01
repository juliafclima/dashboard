import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "../../src/context/authContext";
import { ReactNode, FC } from "react";

const wrapper: FC<{ children: ReactNode }> = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe("AuthProvider", () => {
   beforeEach(() => {
      localStorage.clear();
   });

   it("should login and set token/email", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
         await result.current.login("test@example.com", "123456");
      });

      expect(result.current.token).toBeTruthy();
      expect(result.current.email).toBe("test@example.com");
      expect(localStorage.getItem("auth_token")).toBe(result.current.token);
      expect(localStorage.getItem("auth_email")).toBe("test@example.com");
   });

   it("should logout and clear token", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
         await result.current.login("test@example.com", "123456");
         result.current.logout();
      });

      expect(result.current.token).toBeNull();
      expect(localStorage.getItem("auth_token")).toBeNull();
   });

   it("should throw error with invalid credentials", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(result.current.login("", "")).rejects.toThrow("Invalid credentials");
   });
});
