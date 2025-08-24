import { useMutation } from "@tanstack/react-query";
import { LoginPayload, Signup_Login_Response } from "../../types";
import { LoginApi } from "../authApi";


export const useLogin = () => {
    return useMutation<Signup_Login_Response, Error, LoginPayload>({
        mutationFn: LoginApi,
    });
};