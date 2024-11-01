import { useMutation } from "@tanstack/react-query";

import {
  ApiError,
  AuthResponse,
  AuthService,
  LoginDto,
  RegisterDto,
} from "@/app/services/api";

export function useLogin() {
  return useMutation<AuthResponse, ApiError, LoginDto>({
    mutationKey: ["login"],
    mutationFn: (data: LoginDto) => AuthService.authControllerLogin(data),
  });
}

export function useRegister() {
  return useMutation<AuthResponse, ApiError, RegisterDto>({
    mutationKey: ["register"],
    mutationFn: (data: RegisterDto) => AuthService.authControllerRegister(data),
  });
}

export function useLogout() {
  return useMutation<any, ApiError, undefined>({
    mutationKey: ["logout"],
    mutationFn: () => AuthService.authControllerLogout(),
  });
}
