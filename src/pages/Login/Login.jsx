import LoginForm from "../../components/Auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}

        <div className="hidden lg:block">

          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Welcome Back
          </h1>

          <p className="mt-8 text-xl text-slate-300 leading-8">
            Continue building your career with AI-powered resume analysis,
            skill tracking, personalized roadmaps, and placement insights.
          </p>

        </div>

        {/* Right Side */}

        <LoginForm />

      </div>

    </div>
  );
}

export default Login;