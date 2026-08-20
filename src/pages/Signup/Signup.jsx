import SignupForm from "../../components/Auth/SignupForm";

function Signup() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}

        <div className="hidden lg:block">

          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Create Your Account
          </h1>

          <p className="mt-8 text-xl text-slate-300 leading-8">
            Join SkillBridge AI and unlock AI-powered resume analysis,
            interview preparation, career roadmaps, ATS optimization,
            and personalized placement guidance.
          </p>

        </div>

        {/* Right Side */}

        <SignupForm />

      </div>

    </div>
  );
}

export default Signup;