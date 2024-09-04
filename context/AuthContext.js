"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { authentication, db } from "../firebase";
import {
  handleGetUserInfo,
  handleGetUserInfoJobs,
} from "../utils/handleFirebaseQuery";
import { handleGetFirestore } from "@/utils/firestoreUtils";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [judete, setJudete] = useState(
    JSON.parse(localStorage.getItem("judete")) || []  // Inițializează judete din localStorage
  );
  const [loading, setLoading] = useState(true);
  const [isGuestUser, setIsGuestUser] = useState(
    localStorage.getItem("isGuestUser") === "true"
  );
  const [searchQueryParteneri, setSearchQueryPateneri] = useState("");
  const [tipAnunt, setTipAnunt] = useState("Clinica");
  const [tipProgram, setTipProgram] = useState(undefined);

  const [titulatura, setSelectedCategory] = useState(undefined);
  const [specialitate, setSelectedSpecialty] = useState(undefined);
  const [localitate, setSelectedLocalitate] = useState(undefined);
  const [judet, setSelectedJudet] = useState(undefined);

  const setAsGuestUser = (isGuest) => {
    try {
      localStorage.setItem("isGuestUser", isGuest ? "true" : "false");
      setIsGuestUser(isGuest);
    } catch (e) {
      console.error("Failed to update isGuestUser in localStorage:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      console.log("start use effect from auth context", user);
      if (user) {
        try {
          let userDataFromFirestore = await handleGetUserInfoJobs();
          console.log(
            "User data fetched at onAuthStateChanged from handleGetUserInfoJobs...",
            userDataFromFirestore
          );

          if (!userDataFromFirestore) {
            console.log(
              "No data found in handleGetUserInfoJobs, trying handleGetUsersInfo..."
            );
            userDataFromFirestore = await handleGetUserInfo();

            if (userDataFromFirestore) {
              const collectionId = "UsersJobs";
              const documentId = user.uid;
              userDataFromFirestore.user_uid = user.uid;
              setDoc(
                doc(db, collectionId, documentId),
                userDataFromFirestore
              ).then(() => {
                console.log("Înregistrare in portal nou cu succes!");
                console.log(
                  "User data fetched at onAuthStateChanged from handleGetUsersInfo...",
                  userDataFromFirestore
                );
              });
            } else {
              console.log(
                "No data found in both handleGetUserInfoJobs and handleGetUsersInfo."
              );
            }
          }

          setUserData(userDataFromFirestore);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
      setCurrentUser(user);

      try {
        // Verifică dacă județele sunt deja salvate în localStorage
        let judeteRomania = JSON.parse(localStorage.getItem("judete"));
        if (!judeteRomania) {
          judeteRomania = await handleGetFirestore("Judete");
          localStorage.setItem("judete", JSON.stringify(judeteRomania));  // Salvează județele în localStorage
        }
        setJudete(judeteRomania);
      } catch (error) {
        console.error("Failed to fetch judete data in context auth:", error);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const value = {
    currentUser,
    userData,
    loading,
    isGuestUser,
    setAsGuestUser,
    setUserData,
    setCurrentUser,
    judete,
    searchQueryParteneri,
    setSearchQueryPateneri,
    tipAnunt,
    setTipAnunt,
    tipProgram,
    setTipProgram,
    judet,
    setSelectedJudet,
    localitate,
    setSelectedLocalitate,
    specialitate,
    setSelectedSpecialty,
    titulatura,
    setSelectedCategory,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
