import React, { useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

interface AuthContextValue {
    setIsLoggedIn: any;
    isLoggedin: boolean;
    userId: string;
    setUserId: any;
    contextName: string;
    setContextName: any;
    contextEmail: string;
    setContextEmail: any;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [contextName, setContextName] = useState('');
    const [contextEmail, setContextEmail] = useState('');

    useEffect(() => {
        async function restoreSession() {
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const response = await fetch('http://127.0.0.1:3000/userinfo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
              });
              const data = await response.json();
              if (response.status === 200) {
                setContextName(data.message.name);
                setContextEmail(data.message.email);
                setUserId(data.message.id);
                setIsLoggedIn(true);
      
                // Check if the state values are set correctly
                if (data.message.name === contextName && data.message.email === contextEmail && data.message.id === userId && isLoggedin) {
                  console.log('Context data is set correctly');
                } else {
                  console.log('Context data is not set correctly');
                }
              } else if (response.status === 401) {
                console.log('session expired');
              } else if (response.status === 400) {
                console.log('token not found');
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
        restoreSession();
      }, [contextName, contextEmail, userId, isLoggedin]);

        
   

    const authContextValue: AuthContextValue = {
        isLoggedin,
        setIsLoggedIn,
        userId,
        setUserId,
        contextName,
        setContextName,
        contextEmail,
        setContextEmail,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
