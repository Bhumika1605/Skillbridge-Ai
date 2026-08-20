import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-slate-900 text-white">

      <Link to="/">
        <h1 className="text-2xl font-bold text-cyan-400">
          SkillBridge AI
        </h1>
      </Link>

      <ul className="flex gap-8">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#workflow">Roadmap</a>
        </li>

        <li>
          <a href="#footer">Contact</a>
        </li>
      </ul>

      <Link
        to="/login"
        className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-600 transition"
      >
        Get Started
      </Link>

    </nav>
  );
}

export default Navbar;