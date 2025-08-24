import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>(0);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    // ⁡⁣⁣⁡⁣⁣⁢UserContextProvider⁡ => <UserContextProvider> to use in Layout or app to provide user context to all components
    const [userLogin, setUserLogin] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUserLogin(token);
        }
    }, []);


    return (
        <UserContext.Provider value={{ userLogin, setUserLogin }}>
            {children}
        </UserContext.Provider>
    );
}