import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by company, role or skill..."
        className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
      />

    </div>
  );
}

export default SearchBar;