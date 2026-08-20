import { motion } from "framer-motion";

function ProgressRing({

  value,

  size = 140,

  stroke = 12,

  color = "#00D4FF",

  label = "",

}) {

  const radius = (size - stroke) / 2;

  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (value / 100) * circumference;

  return (

    <div className="flex flex-col items-center">

      <div
        className="relative"
        style={{
          width: size,
          height: size,
        }}
      >

        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={stroke}
            fill="none"
          />

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference,
            }}
            animate={{
              strokeDashoffset: progress,
            }}
            transition={{
              duration: 1.6,
            }}
          />

        </svg>

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="text-center">

            <h2 className="text-3xl font-black text-white">

              {value}%

            </h2>

            <p className="text-xs text-slate-400 mt-1">

              {label}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProgressRing;