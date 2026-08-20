import FeatureCard from "./FeatureCard";
import { features } from "../../data/features";

function Features() {
  return (
    <section id="features" className="bg-slate-900 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-white">
            Why Choose SkillBridge AI?
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Everything you need to prepare for internships,
            placements, and your professional career.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;