function ScoreCard({
  title,
  value,
  color = "from-cyan-500 to-blue-600",
}) {
  return (
    <div
      className={`
        bg-gradient-to-br ${color}
        rounded-3xl
        h-52
        p-6
        flex
        flex-col
        justify-between
        text-white
        shadow-xl
        hover:scale-105
        transition-all
        duration-300
      `}
    >
      <h3 className="text-xl font-semibold leading-snug">
        {title}
      </h3>

      <div className="flex items-end justify-between">
        <span className="text-6xl font-extrabold">
          {value}
        </span>

        <span className="text-3xl font-bold mb-2">
          %
        </span>
      </div>
    </div>
  );
}

export default ScoreCard;