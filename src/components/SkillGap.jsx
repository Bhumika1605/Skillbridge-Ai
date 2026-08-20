import SkillGapAnalysis from "../../components/SkillGapAnalysis";

function SkillGap() {
  return (
    <div className="p-8 bg-slate-900 min-h-screen">

      <h1 className="text-4xl font-bold text-white">
        Skill Gap Analyzer
      </h1>

      <p className="text-slate-400 mt-2">
        Compare your current skills with your dream career.
      </p>

      <div className="mt-8">
        <SkillGapAnalysis />
      </div>

    </div>
  );
}

export default SkillGap;