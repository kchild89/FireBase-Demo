"use client";

import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  logout,
  signUpWithEmailAndPassword,
} from "@/services/firebase";
import { useCallback, useContext, useState } from "react";

export default function Home() {
  const user = useContext(FirebaseAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email || !password) return;

    if (login) {
      // login
      await loginWithEmailAndPassword(email, password);
      console.log("User logged in");
    } else {
      // sign up
      await signUpWithEmailAndPassword(email, password);
      console.log("User signed up");
    }
  }, [email, password, login]);

  return (
    <div className="">
      <main className="flex flex-col">
        {/* login inputs */}
        <h1>Welcome to your new app</h1>
        {user ? (
          <div>
            <h1>Welcome {user.email}</h1>
            <button onClick={logout}>Sign out</button>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1>Sign in</h1>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
              />
            </label>
            <button onClick={handleLogin}>
              {login ? "Login In" : "Sign Up"}
            </button>
            <p>or</p>
            <button onClick={() => setLogin(!login)}>
              {login ? "Create an account" : "Login"}
            </button>
            <button onClick={loginWithGoogle}>Sign in with Google</button>
          </div>
        )}
      </main>
    </div>
  );
}
