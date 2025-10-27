'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  doc,
  onSnapshot,
  type DocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  getFirebaseAuth,
  getFirebaseDb,
  googleAuthProvider,
} from "@/lib/firebase";
import type { PlanTier, UserProfile } from "@/types";
import { createUserProfile, fetchUserProfile } from "@/lib/firestore-helpers";

type RegisterInput = {
  email: string;
  password: string;
  name: string;
  businessName: string;
  businessDescription?: string;
  whatsappNumber: string;
  phoneNumber?: string;
};

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  register: (payload: RegisterInput) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updatePlan: (plan: PlanTier) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firebaseAuth = getFirebaseAuth();
    const db = getFirebaseDb();
    const unsub = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const profileDoc = doc(db, "users", currentUser.uid);
      const stop = onSnapshot(
        profileDoc,
        (snapshot: DocumentSnapshot) => {
          if (!snapshot.exists()) {
            setProfile(null);
            setLoading(false);
            return;
          }

          const data = snapshot.data() as Omit<UserProfile, "id">;
          const createdAtValue = (data as any)?.createdAt?.toMillis
            ? (data as any).createdAt.toMillis()
            : data.createdAt;

          setProfile({
            id: snapshot.id,
            ...data,
            createdAt: createdAtValue,
            plan: (data.plan ?? "free") as PlanTier,
          });
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
      );

      return () => stop();
    });

    return () => unsub();
  }, []);

  const register = async (payload: RegisterInput) => {
    setLoading(true);
    try {
      const credentials = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        payload.email,
        payload.password,
      );

      await createUserProfile({
        uid: credentials.user.uid,
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        businessName: payload.businessName,
        businessDescription: payload.businessDescription,
        whatsappNumber: payload.whatsappNumber,
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogleHandler = async () => {
    setLoading(true);
    try {
      const credentials = await signInWithPopup(getFirebaseAuth(), googleAuthProvider);
      const { user: authUser } = credentials;
      const profileData = await fetchUserProfile(authUser.uid);

      if (!profileData) {
        await createUserProfile({
          uid: authUser.uid,
          name: authUser.displayName ?? "Nouveau commerçant",
          email: authUser.email ?? "",
          businessName: authUser.displayName ?? "Ma boutique",
          businessDescription: "",
          whatsappNumber: "",
          phoneNumber: authUser.phoneNumber ?? "",
          photoURL: authUser.photoURL ?? "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(getFirebaseAuth());
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    const data = await fetchUserProfile(user.uid);
    if (data) {
      setProfile(data);
    }
  };

  const updatePlan = async (plan: PlanTier) => {
    if (!user) return;
    const profileDoc = doc(getFirebaseDb(), "users", user.uid);
    await updateDoc(profileDoc, { plan });
  };

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    register,
    login,
    signInWithGoogle: signInWithGoogleHandler,
    logout,
    refreshProfile,
    updatePlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }
  return context;
}
