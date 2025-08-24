import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {

    const user = localStorage.getItem("token");
    if (user !== null) {
        return children;
    }else{
        return <Navigate to="/login" replace />;
    }

}
