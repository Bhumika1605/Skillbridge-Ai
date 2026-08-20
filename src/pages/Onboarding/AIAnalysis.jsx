import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AIAnalysis() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

  const steps = [
    "Analyzing Resume...",
    "Extracting Skills...",
    "Matching Career...",
    "Calculating ATS Score...",
    "Generating Roadmap...",
    "Preparing Dashboard..."
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            navigate("/dashboard");
          }, 800);

          return 100;
        }

        return old + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 20) setCurrentStep(0);
    else if (progress < 40) setCurrentStep(1);
    else if (progress < 60) setCurrentStep(2);
    else if (progress < 80) setCurrentStep(3);
    else if (progress < 95) setCurrentStep(4);
    else setCurrentStep(5);
  }, [progress]);

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-6">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-12 w-full max-w-2xl">

        <div className="text-center">

          <h1 className="text-5xl font-bold text-white">
            🤖 SkillBridge AI
          </h1>

          <p className="text-slate-400 mt-5 text-lg">
            Please wait while AI analyzes your profile...
          </p>

        </div>

        <div className="mt-12">

          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

            <div
              className="h-full bg-cyan-500 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-center text-cyan-400 mt-4 font-semibold text-lg">
            {progress}%
          </p>

        </div>

        <div className="mt-12">

          <div className="rounded-2xl bg-slate-800 p-6">

            <p className="text-white text-xl font-semibold">
              {steps[currentStep]}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAnalysis;