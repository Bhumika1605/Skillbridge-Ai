import {
  Upload,
  Briefcase,
  BrainCircuit,
  Map,
  Rocket,
} from "lucide-react";

import WorkflowStep from "./WorkflowStep";

function Workflow() {
  return (
    <section
      id="workflow"
      className="bg-slate-900 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            How SkillBridge AI Works
          </h2>

          <p className="text-slate-400 mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Five simple steps to become placement-ready.
          </p>

        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          <WorkflowStep
            icon={<Upload size={32} />}
            title="Upload Resume"
            description="Upload your latest resume securely."
          />

          <WorkflowStep
            icon={<Briefcase size={32} />}
            title="Choose Career"
            description="Select your dream job role."
          />

          <WorkflowStep
            icon={<BrainCircuit size={32} />}
            title="AI Analysis"
            description="AI evaluates your strengths and weaknesses."
          />

          <WorkflowStep
            icon={<Map size={32} />}
            title="Career Roadmap"
            description="Receive a personalized learning roadmap."
          />

          <WorkflowStep
            icon={<Rocket size={32} />}
            title="Get Hired"
            description="Track your progress and achieve placement success."
          />

        </div>

      </div>
    </section>
  );
}

export default Workflow;