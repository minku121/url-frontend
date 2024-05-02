import React from 'react';

interface AuthContextValue {
    isLoggedin: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
    setUserId: any;
    contextName:any,
    setContextName:any,
    contextEmail:any,
    setContextEmail:any,

}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export default AuthContext;
