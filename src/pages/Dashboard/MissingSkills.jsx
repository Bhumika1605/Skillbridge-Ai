function MissingSkills() {

  const skills = [
    "Docker",
    "Git",
    "SQL",
    "REST API",
    "Node.js",
    "AWS"
  ];

  return (

    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

      <h2 className="text-white text-2xl font-bold">
        Missing Skills
      </h2>

      <div className="flex flex-wrap gap-3 mt-6">

        {skills.map(skill=>(
          <span
            key={skill}
            className="bg-red-500 px-4 py-2 rounded-full text-white"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>

  );
}

export default MissingSkills;