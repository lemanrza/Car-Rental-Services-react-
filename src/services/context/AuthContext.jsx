import React, { createContext, useState, useContext, useEffect } from "react";
import AuthController from "../api/AuthApi";

// Create Context
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("isAdmin"));
        if (savedUser?.id) {
            AuthController.getOne(savedUser.id).then((data) => {
                setUser(data);
            }).finally(() => {
                setLoading(false)
            });
        }
    }, []);

    const login = (credentials) => {
        AuthController.login(credentials).then((x) => {
            if (x.data.length > 0) {
                setUser(x.data[0]);
                localStorage.setItem("user", JSON.stringify({
                    role: x.data[0].role,
                    id: x.data[0].id
                }))

            }
        })
    }
    const logout = () => {
        setUser(null);
        localStorage.setItem("user", JSON.stringify(null));
    };

    const value = { user, login, logout, setUser, loading, setLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};