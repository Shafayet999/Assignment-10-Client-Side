import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';




// for googleSignIn
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebase.config';
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);






















    // Authentication Related -----------
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }






    const signInWithEmailAndPasswordFunc = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogleFunc = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        })
        return () => {
            unsubscribe();
        }
    }, [])






    const authInfo = {
        signInWithGoogleFunc, user, setUser,
        loading, setLoading, signOutUser, createUser, signInWithEmailAndPasswordFunc
    }

    return (

        <AuthContext value={authInfo}>
            {children}
        </AuthContext>


    );
};

export default AuthProvider;