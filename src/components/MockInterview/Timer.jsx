function Timer({ timeLeft }) {
  return (
    <div className="bg-slate-900 border border-red-500 text-red-400 px-4 py-2 rounded-lg font-semibold">
      ⏱ {timeLeft}s
    </div>
  );
}

export default Timer;