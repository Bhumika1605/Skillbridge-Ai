import { useState } from "react";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("skillbridgeUser")
  );

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    college: user?.college || "",
    career: user?.career || "",
    careerField: user?.careerField || "Computer Engineering",
    location: user?.location || "Any Gujarat",
    experience: user?.experience || "Fresher",
  });

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "skillbridgeUser",
      JSON.stringify(form)
    );

    localStorage.setItem(
      "profileImage",
      profileImage
    );

    localStorage.setItem(
      "userName",
      form.name
    );

    localStorage.setItem(
      "course",
      form.career
    );

    // Notify dashboard components
    window.dispatchEvent(
      new Event("profileUpdated")
    );

    setIsEditing(false);

    window.location.reload();
  };

  return (
    <div>

      {/* Header */}

      <h1 className="text-4xl font-bold text-white">
        My Profile
      </h1>

      <p className="text-slate-400 mt-2">
        Manage your personal information and career preferences.
      </p>


      {/* Profile Card */}

      <div className="mt-10 bg-slate-800 rounded-3xl border border-slate-700 p-6 md:p-10">

        {/* Profile Header */}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">

          {/* Profile Image */}

          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-500 flex-shrink-0">

            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-cyan-500 flex items-center justify-center text-5xl font-bold text-white">
                {(user?.name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

          </div>


          {/* User Info */}

          <div className="text-center sm:text-left">

            <h2 className="text-3xl font-bold text-white">
              {user?.name || "User"}
            </h2>

            <p className="text-slate-400 mt-2">
              {user?.email || "No Email"}
            </p>

            <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">

              <span className="text-cyan-400 text-sm">
                {user?.experience || "Fresher"}
              </span>

            </div>

          </div>

        </div>


        {/* Profile Information */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          {/* College */}

          <ProfileInfo
            label="College"
            value={user?.college || "Not Added"}
          />


          {/* Dream Career */}

          <ProfileInfo
            label="Dream Career"
            value={user?.career || "Not Selected"}
          />


          {/* Career Field */}

          <ProfileInfo
            label="Career Field"
            value={
              user?.careerField ||
              "Computer Engineering"
            }
          />


          {/* Preferred Location */}

          <ProfileInfo
            label="Preferred Gujarat Location"
            value={
              user?.location ||
              "Any Gujarat"
            }
          />

        </div>


        {/* Career Preferences */}

        <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-slate-900/50 p-6">

          <h3 className="text-lg font-bold text-white">
            Career Preferences
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            These preferences help SkillBridge AI personalize internships, jobs and career opportunities.
          </p>


          <div className="grid md:grid-cols-3 gap-4 mt-5">

            <Preference
              title="Field"
              value={
                user?.careerField ||
                "Computer Engineering"
              }
            />

            <Preference
              title="Location"
              value={
                user?.location ||
                "Any Gujarat"
              }
            />

            <Preference
              title="Experience"
              value={
                user?.experience ||
                "Fresher"
              }
            />

          </div>

        </div>


        {/* Edit Button */}

        <button
          onClick={() => setIsEditing(true)}
          className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-white font-semibold transition"
        >
          Edit Profile
        </button>

      </div>


      {/* ================= EDIT MODAL ================= */}

      {isEditing && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 p-6 md:p-8">

            {/* Modal Header */}

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-bold text-white">
                  Edit Profile
                </h2>

                <p className="text-slate-400 mt-1">
                  Update your career preferences
                </p>

              </div>

              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>

            </div>


            {/* Basic Information */}

            <div>

              <h3 className="text-cyan-400 font-semibold mb-4">
                Personal Information
              </h3>


              <div className="space-y-4">

                {/* Name */}

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  placeholder="Full Name"
                />


                {/* Email */}

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  placeholder="Email"
                />


                {/* College */}

                <input
                  type="text"
                  value={form.college}
                  onChange={(e) =>
                    handleChange(
                      "college",
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  placeholder="College / University"
                />


                {/* Dream Career */}

                <input
                  type="text"
                  value={form.career}
                  onChange={(e) =>
                    handleChange(
                      "career",
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  placeholder="Dream Career"
                />

              </div>

            </div>


            {/* Career Preferences */}

            <div className="mt-8">

              <h3 className="text-cyan-400 font-semibold mb-4">
                Career Preferences
              </h3>


              <div className="grid md:grid-cols-2 gap-4">

                {/* Career Field */}

                <div>

                  <label className="text-sm text-slate-400 mb-2 block">
                    Career Field
                  </label>

                  <select
                    value={form.careerField}
                    onChange={(e) =>
                      handleChange(
                        "careerField",
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >

                    <option>
                      Computer Engineering
                    </option>

                    <option>
                      Information Technology
                    </option>

                    <option>
                      Software Development
                    </option>

                    <option>
                      Data Science
                    </option>

                    <option>
                      Artificial Intelligence
                    </option>

                    <option>
                      Cyber Security
                    </option>

                    <option>
                      Electronics & Communication
                    </option>

                    <option>
                      Mechanical Engineering
                    </option>

                    <option>
                      Civil Engineering
                    </option>

                    <option>
                      Electrical Engineering
                    </option>

                    <option>
                      Business & Management
                    </option>

                    <option>
                      Finance & Accounting
                    </option>

                    <option>
                      Marketing
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>


                {/* Gujarat Location */}

                <div>

                  <label className="text-sm text-slate-400 mb-2 block">
                    Preferred Gujarat Location
                  </label>

                  <select
                    value={form.location}
                    onChange={(e) =>
                      handleChange(
                        "location",
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >

                    <option>
                      Any Gujarat
                    </option>

                    <option>
                      Ahmedabad
                    </option>

                    <option>
                      Gandhinagar
                    </option>

                    <option>
                      Surat
                    </option>

                    <option>
                      Vadodara
                    </option>

                    <option>
                      Rajkot
                    </option>

                    <option>
                      Bhavnagar
                    </option>

                    <option>
                      Jamnagar
                    </option>

                    <option>
                      Anand
                    </option>

                    <option>
                      Bharuch
                    </option>

                    <option>
                      Vapi
                    </option>

                  </select>

                </div>


                {/* Experience */}

                <div>

                  <label className="text-sm text-slate-400 mb-2 block">
                    Experience Level
                  </label>

                  <select
                    value={form.experience}
                    onChange={(e) =>
                      handleChange(
                        "experience",
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >

                    <option>
                      Fresher
                    </option>

                    <option>
                      0–1 Year
                    </option>

                    <option>
                      1–3 Years
                    </option>

                    <option>
                      3+ Years
                    </option>

                  </select>

                </div>

              </div>

            </div>


            {/* Profile Picture */}

            <div className="mt-8">

              <h3 className="text-cyan-400 font-semibold mb-4">
                Profile Picture
              </h3>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0];

                  if (!file) return;

                  if (file.size > 2 * 1024 * 1024) {
                    alert(
                      "Profile image must be smaller than 2 MB."
                    );
                    return;
                  }

                  const reader =
                    new FileReader();

                  reader.onloadend = () => {
                    setProfileImage(
                      reader.result
                    );
                  };

                  reader.readAsDataURL(file);

                }}
                className="w-full text-sm text-slate-400"
              />

            </div>


            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] transition px-6 py-3 rounded-xl text-white font-semibold"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl text-white font-semibold transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ============================= */
/* Profile Information */
/* ============================= */

function ProfileInfo({ label, value }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6">

      <p className="text-slate-400 text-sm">
        {label}
      </p>

      <h3 className="text-white text-lg md:text-xl mt-2">
        {value}
      </h3>

    </div>
  );
}


/* ============================= */
/* Preference */
/* ============================= */

function Preference({ title, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-4">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="text-sm text-white font-semibold mt-1">
        {value}
      </p>

    </div>
  );
}


export default Profile;