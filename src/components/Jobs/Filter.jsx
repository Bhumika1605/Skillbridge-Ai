function Filter({ category, setCategory }) {
  const filters = [
    "All Jobs",
    "Frontend",
    "Backend",
    "AI / ML",
    "Remote",
  ];

  return (
    <div className="flex flex-wrap gap-4">

      {filters.map((item) => (

        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`px-5 py-2 rounded-xl transition
            ${
              category === item
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
        >
          {item}
        </button>

      ))}

    </div>
  );
}

export default Filter;