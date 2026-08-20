function AIAvatar() {
  return (
    <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-2xl p-5">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-2xl">
          🤖
        </div>

        <div>
          <h2 className="text-white text-2xl font-bold">
            AI Interview
          </h2>

          <p className="text-slate-400">
            Practice like a real interview.
          </p>
        </div>

      </div>

    </div>
  );
}

export default AIAvatar;