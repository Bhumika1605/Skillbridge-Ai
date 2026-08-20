import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  GraduationCap,
} from "lucide-react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

function SignupForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    career: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
  console.log("Step 1");

  console.log(form);

  if (
    !form.name ||
    !form.email ||
    !form.college ||
    !form.career ||
    !form.password ||
    !form.confirmPassword
  ) {
    alert("Please fill all fields.");
    return;
  }

  console.log("Step 2");

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  console.log("Step 3");

  try {
    console.log("Step 4");

    setLoading(true);

    console.log("Step 5");

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email.trim().toLowerCase(),
      form.password
    );

    console.log("Step 6");

    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      name: form.name,
      email: form.email.trim().toLowerCase(),
      college: form.college,
      career: form.career,
      resumeUploaded: false,
      createdAt: new Date().toISOString(),
    });

    console.log("Firestore write completed");

alert("Signup Successful");

navigate("/login");

    console.log("Step 7");

    alert("Signup Success");

    navigate("/login");

  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 shadow-xl w-full max-w-md">

      <h2 className="text-3xl font-bold text-white">
        Create Account
      </h2>

      <p className="text-slate-400 mt-2 mb-8">
        Join SkillBridge AI
      </p>

      <div className="space-y-5">

        {/* Name */}

        <div className="relative">
          <User
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Email */}

        <div className="relative">
          <Mail
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* College */}

        <div className="relative">
          <GraduationCap
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={form.college}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Career */}

        <select
          name="career"
          value={form.career}
          onChange={handleChange}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
        >
          <option value="">Select Dream Career</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
          <option>AI Engineer</option>
          <option>Data Scientist</option>
          <option>Cyber Security</option>
          <option>UI/UX Designer</option>
        </select>

        {/* Password */}

        <div className="relative">
          <Lock
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-slate-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}

        <div className="relative">
          <Lock
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-4 text-slate-400"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {/* Button */}

        <button
  type="button"
  onClick={() => {
    alert("Button Works");
    handleSignup();
  }}
  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
>
  Create Account
</button>

      </div>

      <p className="text-center text-slate-400 mt-8">
        Already have an account?

        <Link
          to="/login"
          className="text-cyan-400 ml-2 hover:underline"
        >
          Sign In
        </Link>
      </p>

    </div>
  );
}

export default SignupForm;