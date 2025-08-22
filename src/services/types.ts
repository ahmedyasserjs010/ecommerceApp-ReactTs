// src/features/auth/types.ts

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface Signup_Login_Response {
    message: string; // e.g. "success"
    user: {
    name: string;
    email: string;
    role: string; // "user" or "admin"
    };
    token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

