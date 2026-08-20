import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      alert("Login Successful!");

      navigate("/welcome");

    } catch (error) {

      switch (error.code) {

        case "auth/user-not-found":
          alert("No account found.");
          break;

        case "auth/wrong-password":
          alert("Wrong password.");
          break;

        case "auth/invalid-credential":
          alert("Invalid Email or Password.");
          break;

        case "auth/invalid-email":
          alert("Invalid Email.");
          break;

        default:
          alert(error.message);

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 shadow-2xl">

      <h2 className="text-3xl font-bold text-white">
        Login
      </h2>

      <p className="text-slate-400 mt-2">
        Access your SkillBridge AI account
      </p>

      {/* Email */}

      <div className="mt-8">

        <label className="text-slate-300 text-sm">
          Email
        </label>

        <div className="flex items-center mt-2 bg-slate-900 rounded-xl px-4">

          <Mail
            size={18}
            className="text-slate-400"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent p-4 outline-none text-white"
          />

        </div>

      </div>

      {/* Password */}

      <div className="mt-6">

        <label className="text-slate-300 text-sm">
          Password
        </label>

        <div className="flex items-center mt-2 bg-slate-900 rounded-xl px-4">

          <Lock
            size={18}
            className="text-slate-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent p-4 outline-none text-white"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff
                className="text-slate-400"
                size={18}
              />
            ) : (
              <Eye
                className="text-slate-400"
                size={18}
              />
            )}
          </button>

        </div>

      </div>

      {/* Remember */}

      <div className="flex justify-between mt-6 text-sm">

        <label className="text-slate-300 flex gap-2">

          <input type="checkbox" />

          Remember me

        </label>

        <button
          type="button"
          className="text-cyan-400"
        >
          Forgot Password?
        </button>

      </div>

      {/* Login Button */}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl py-4 text-white font-semibold disabled:opacity-60"
      >
        {loading ? "Logging In..." : "Login"}
      </button>

      {/* Google */}

      <button
        type="button"
        className="mt-4 w-full border border-slate-600 rounded-xl py-4 text-white"
      >
        Continue with Google
      </button>

      {/* Signup */}

      <p className="text-center text-slate-400 mt-8">

        Don't have an account?

        <Link
          to="/signup"
          className="text-cyan-400 ml-2"
        >
          Sign Up
        </Link>

      </p>

    </div>
  );
}

export default LoginForm;