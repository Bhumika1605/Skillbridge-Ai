import { motion } from "framer-motion";
import Button from "../Button/Button";
import DashboardPreview from "../DashboardPreview/DashboardPreview";

function Hero() {
  return (
    <section className="bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm font-medium mb-6">
              🚀 AI-Powered Career Development Platform
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Your Personal Career
              <br />
              Intelligence Platform
            </h1>

            {/* Description */}
            <p className="mt-8 text-lg lg:text-xl text-slate-300 max-w-xl leading-8">
              SkillBridge AI helps students analyze their resume,
              identify missing skills, build personalized career
              roadmaps, and prepare for internships and placements -
              all in one intelligent platform.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex gap-4">
              <Button text="Get Started" />
              <Button text="Watch Demo" type="secondary" />
            </div>

          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <DashboardPreview />
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Hero;