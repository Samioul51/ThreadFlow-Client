import { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext=createContext();
const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    // Registration

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    // Google

    const signInWithGoogle= ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    // Login

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    // Logout 

    const logout=()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>unsubscribe();
    },[]);

    const authData={
        user,
        setUser,
        createUser,
        loading,
        setLoading,
        logout,
        signIn,
        signInWithGoogle
    };
    
    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;