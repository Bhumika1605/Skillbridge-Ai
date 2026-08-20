import { Link } from "react-router-dom";

function QuickActionCard({
  icon,
  title,
  description,
  color,
  link,
}) {
  return (
    <Link
      to={link}
      className={`
        group
        bg-slate-800
        border
        border-slate-700
        rounded-3xl
        p-6
        hover:border-${color}-500
        hover:-translate-y-2
        hover:shadow-xl
        transition-all
        duration-300
      `}
    >
      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-white mt-5">
        {title}
      </h2>

      <p className="text-slate-400 mt-3 leading-7">
        {description}
      </p>

      <div
        className={`mt-6 text-${color}-400 font-semibold group-hover:translate-x-2 transition`}
      >
        Open →
      </div>
    </Link>
  );
}

export default QuickActionCard;