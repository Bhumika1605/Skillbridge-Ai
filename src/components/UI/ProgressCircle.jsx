function ProgressCircle({
  value,
  size = 120,
  stroke = 10,
  color = "#00D4FF",
}) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;

  const offset =
    circumference -
    (value / 100) * circumference;

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="relative"
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        <circle
          stroke="#1E293B"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">
          {value}%
        </span>
      </div>
    </div>
  );
}

export default ProgressCircle;