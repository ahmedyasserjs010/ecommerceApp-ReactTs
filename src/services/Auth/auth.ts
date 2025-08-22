import apiClient from "../apiClient";
import { LoginPayload, Signup_Login_Response, SignupPayload } from "../types"; 
    // SignupPayload => this is refare that gives the shape of the data we send 
    // SignupResponse => this is refare that gives the shape of the data we receive

export const signupApi = async (payload: SignupPayload): Promise<Signup_Login_Response> => {
    const { data } = await apiClient.post("/auth/signup", payload);
    return data;
};

export const LoginApi = async (payload: LoginPayload): Promise<Signup_Login_Response> => {
    const { data } = await apiClient.post("/auth/signin", payload);
    return data;
};
