import { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData,setUserData]=useState(null);

    // Registration

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Google

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        }
        catch (error) {
            if (error.code === "auth/popup-closed-by-user") {
                setLoading(false);
                return null;
            }
            setLoading(false);
            throw error;
        }
    }

    // Login

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout 

    const logout = () => {
        setUserData(null);
        return signOut(auth);
    }

    // Update user

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }

    // User Data from backend

    const fetchUserData=async (email)=>{
        try{
            const res=await fetch(`http://localhost:3000/users/${email}`);
            if(res.ok){
                const result=await res.json();
                if(result.success){
                    setUserData(result.data);
                    return result.data;
                }
            }
            return null;
        }catch(error){
            return null;
        }
    }

    // User existance check

    const checkUserExists=async(email)=>{
        try{
            const res=await fetch(`http://localhost:3000/users/${email}`);
            const result=await res.json();
            return result.success && result.data;
        }catch(error){
            return false;
        }
    }

    const createUserInDb=async (userData)=>{
        const res=await fetch("http://localhost:3000/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });

        const result=await res.json();

        if(result.success){
            setUserData(result.data);
            return result.data;
        }

        throw new Error(result.message);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if(currentUser)
                await fetchUserData(currentUser.email);
            else
                setUserData(null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        userData,
        loading,
        setLoading,
        logout,
        signIn,
        signInWithGoogle,
        updateUser,
        fetchUserData,
        checkUserExists,
        createUserInDb
    };

    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;