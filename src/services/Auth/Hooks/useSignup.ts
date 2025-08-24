// src/features/auth/hooks.ts => ​‌‍‌⁡⁣⁢⁣this represents the hooks for authentication⁡​ ​‌‌‍⁡⁣⁣⁢=>⁡​ ​‌‍‌⁡⁣⁢⁣tanstack Query​⁡
import { useMutation } from "@tanstack/react-query";
import { SignupPayload, Signup_Login_Response } from "../../types";
import { signupApi } from "../authApi";


export const useSignup = () => {
    return useMutation<Signup_Login_Response, Error, SignupPayload>({
    mutationFn: signupApi,
    });
};
