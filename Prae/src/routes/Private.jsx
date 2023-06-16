import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider,AppContext } from "../auth/context";


const Private = ({ children}) => {
        const { authenticated, loading, user} = useContext(AuthContext);
        if (loading) {
            return <div>Carregando...</div>;
        }

        if (!authenticated) {
            return <Navigate to="/" />;
        }
        return children;
    };

export default Private;