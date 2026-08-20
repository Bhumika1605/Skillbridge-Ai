function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300">

      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
        <Icon className="text-cyan-400" size={28} />
      </div>

      <h3 className="text-2xl font-bold text-white mb-3">
        {title}
      </h3>

      <p className="text-slate-300 leading-7">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;