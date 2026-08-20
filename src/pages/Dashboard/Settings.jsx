import { useState } from "react";
import {
  User,
  Palette,
  Bell,
  Briefcase,
  Upload,
  Shield,
  Award,
  Target,
  Database,
  Trash2,
  Save,
  Camera,
  Download,
} from "lucide-react";

function Settings() {
  const savedUser =
    JSON.parse(localStorage.getItem("skillbridgeUser")) || {};

  const [activeTab, setActiveTab] = useState("profile");

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const [darkMode, setDarkMode] = useState(true);

  const [accentColor, setAccentColor] = useState("cyan");

  const [form, setForm] = useState({
    name: savedUser.name || "",
    email: savedUser.email || "",
    phone: savedUser.phone || "",
    college: savedUser.college || "",
    career: savedUser.career || "",
    location: savedUser.location || "",
    bio: savedUser.bio || "",
    linkedin: savedUser.linkedin || "",
    github: savedUser.github || "",
    portfolio: savedUser.portfolio || "",
  });

  const saveProfile = () => {
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

    alert("Profile Updated Successfully!");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const Toggle = ({ checked, onClick }) => (
    <button
      onClick={onClick}
      className={`w-14 h-8 rounded-full transition ${
        checked ? "bg-cyan-500" : "bg-slate-700"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white mt-1 transition ${
          checked ? "ml-7" : "ml-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="flex gap-8">

        {/* Sidebar */}

        <div className="w-72 bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-8">

          <h1 className="text-3xl font-bold text-white mb-8">
            Settings
          </h1>

          {[
            {
              id: "profile",
              icon: <User size={20} />,
              label: "Profile",
            },
            {
              id: "appearance",
              icon: <Palette size={20} />,
              label: "Appearance",
            },
            {
              id: "notifications",
              icon: <Bell size={20} />,
              label: "Notifications",
            },
            {
              id: "ai",
              icon: <Briefcase size={20} />,
              label: "AI Preferences",
            },
            {
              id: "resume",
              icon: <Upload size={20} />,
              label: "Resume",
            },
            {
              id: "security",
              icon: <Shield size={20} />,
              label: "Security",
            },
            {
              id: "statistics",
              icon: <Award size={20} />,
              label: "Statistics",
            },
            {
              id: "career",
              icon: <Target size={20} />,
              label: "Career Goals",
            },
            {
              id: "backup",
              icon: <Database size={20} />,
              label: "Backup & Data",
            },
            {
              id: "danger",
              icon: <Trash2 size={20} />,
              label: "Danger Zone",
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl mb-3 transition ${
                activeTab === item.id
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

        </div>

        {/* Content */}

        <div className="flex-1">

          {/* PROFILE */}

{activeTab === "profile" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Profile Settings
    </h1>

    <p className="text-slate-400 mt-2">
      Manage your personal information.
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <div className="flex flex-col lg:flex-row gap-10">

      {/* Avatar */}

      <div className="flex flex-col items-center">

        <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-cyan-500">

          {profileImage ? (

            <img
              src={profileImage}
              alt=""
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="w-full h-full bg-cyan-500 flex items-center justify-center text-white text-7xl font-bold">
              {(form.name || "U").charAt(0)}
            </div>

          )}

        </div>

        <label className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl cursor-pointer flex items-center gap-2 transition">

          <Camera size={18} />

          Upload Photo

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />

        </label>

      </div>

      {/* Form */}

      <div className="flex-1 grid md:grid-cols-2 gap-5">

        <input
          value={form.name}
          onChange={(e)=>
            setForm({...form,name:e.target.value})
          }
          placeholder="Full Name"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.email}
          onChange={(e)=>
            setForm({...form,email:e.target.value})
          }
          placeholder="Email Address"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.phone}
          onChange={(e)=>
            setForm({...form,phone:e.target.value})
          }
          placeholder="Phone Number"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.college}
          onChange={(e)=>
            setForm({...form,college:e.target.value})
          }
          placeholder="College / University"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.career}
          onChange={(e)=>
            setForm({...form,career:e.target.value})
          }
          placeholder="Dream Career"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.location}
          onChange={(e)=>
            setForm({...form,location:e.target.value})
          }
          placeholder="Location"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <textarea
          rows={4}
          value={form.bio}
          onChange={(e)=>
            setForm({...form,bio:e.target.value})
          }
          placeholder="Short Bio"
          className="md:col-span-2 bg-slate-800 rounded-xl p-4 text-white resize-none outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.linkedin}
          onChange={(e)=>
            setForm({...form,linkedin:e.target.value})
          }
          placeholder="LinkedIn URL"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.github}
          onChange={(e)=>
            setForm({...form,github:e.target.value})
          }
          placeholder="GitHub URL"
          className="bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          value={form.portfolio}
          onChange={(e)=>
            setForm({...form,portfolio:e.target.value})
          }
          placeholder="Portfolio Website"
          className="md:col-span-2 bg-slate-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="md:col-span-2 flex justify-end">

          <button
            onClick={saveProfile}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-white font-semibold transition"
          >
            <Save size={18}/>
            Save Profile
          </button>

        </div>

      </div>

    </div>

  </div>

</div>

)}

{/* APPEARANCE */}

{activeTab === "appearance" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Appearance
    </h1>

    <p className="text-slate-400 mt-2">
      Customize the look and feel of SkillBridge AI.
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <div className="flex justify-between items-center border-b border-slate-800 pb-8">

      <div>

        <h2 className="text-2xl text-white font-semibold">
          Dark Mode
        </h2>

        <p className="text-slate-400 mt-2">
          Switch between dark and light appearance.
        </p>

      </div>

      <Toggle
        checked={darkMode}
        onClick={() => setDarkMode(!darkMode)}
      />

    </div>

    <div className="mt-10">

      <h2 className="text-2xl text-white font-semibold mb-6">
        Accent Color
      </h2>

      <div className="flex gap-5">

        {[
          "cyan",
          "purple",
          "emerald",
          "orange",
          "rose",
        ].map((color) => (

          <button
            key={color}
            onClick={() => setAccentColor(color)}
            className={`w-16 h-16 rounded-full border-4 transition ${
              accentColor === color
                ? "border-white scale-110"
                : "border-transparent"
            } ${
              color === "cyan"
                ? "bg-cyan-500"
                : color === "purple"
                ? "bg-purple-500"
                : color === "emerald"
                ? "bg-emerald-500"
                : color === "orange"
                ? "bg-orange-500"
                : "bg-rose-500"
            }`}
          />

        ))}

      </div>

    </div>

  </div>

</div>

)}

{/* NOTIFICATIONS */}

{activeTab === "notifications" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Notifications
    </h1>

    <p className="text-slate-400 mt-2">
      Control what notifications you receive.
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    {[
      "Job Alerts",
      "Internship Updates",
      "Interview Reminder",
      "Placement Updates",
      "AI Suggestions",
      "Weekly Progress Report",
      "Push Notifications",
      "Email Notifications",
    ].map((item) => (

      <div
        key={item}
        className="flex justify-between items-center py-6 border-b border-slate-800 last:border-none"
      >

        <div>

          <h2 className="text-white text-lg font-semibold">
            {item}
          </h2>

          <p className="text-slate-400 mt-1">
            Receive updates for {item.toLowerCase()}.
          </p>

        </div>

        <Toggle
          checked={true}
          onClick={() => {}}
        />

      </div>

    ))}

  </div>

</div>

)}

{/* AI PREFERENCES */}

{activeTab === "ai" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      AI Preferences
    </h1>

    <p className="text-slate-400 mt-2">
      Personalize your AI recommendations.
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <div className="grid md:grid-cols-2 gap-6">

      <select className="bg-slate-800 p-4 rounded-xl text-white">
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Full Stack Developer</option>
        <option>UI/UX Designer</option>
        <option>Data Scientist</option>
      </select>

      <select className="bg-slate-800 p-4 rounded-xl text-white">
        <option>Fresher</option>
        <option>1 Year Experience</option>
        <option>2 Years Experience</option>
        <option>3+ Years Experience</option>
      </select>

      <input
        placeholder="Preferred Location"
        className="bg-slate-800 p-4 rounded-xl text-white"
      />

      <input
        placeholder="Expected Salary"
        className="bg-slate-800 p-4 rounded-xl text-white"
      />

      <input
        placeholder="Dream Company"
        className="md:col-span-2 bg-slate-800 p-4 rounded-xl text-white"
      />

    </div>

    <div className="flex justify-end mt-8">

      <button className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-white font-semibold">
        Save Preferences
      </button>

    </div>

  </div>

</div>

)}

{/* RESUME */}

{activeTab === "resume" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Resume Management
    </h1>

    <p className="text-slate-400 mt-2">
      Upload and manage your latest resume.
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      <button className="bg-cyan-500 hover:bg-cyan-600 rounded-2xl p-6 text-white font-semibold">
        Upload Resume
      </button>

      <button className="bg-slate-800 hover:bg-slate-700 rounded-2xl p-6 text-white">
        View Resume
      </button>

      <button className="bg-slate-800 hover:bg-slate-700 rounded-2xl p-6 text-white">
        Download Resume
      </button>

      <button className="bg-green-500 hover:bg-green-600 rounded-2xl p-6 text-white">
        Analyze Resume
      </button>

    </div>

  </div>

</div>

)}

{/* SECURITY */}

{activeTab === "security" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Security
    </h1>

    <p className="text-slate-400 mt-2">
      Protect your SkillBridge AI account.
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">

    {/* Change Password */}

    <div className="flex justify-between items-center bg-slate-800 rounded-2xl p-6">

      <div>

        <h2 className="text-xl font-semibold text-white">
          Change Password
        </h2>

        <p className="text-slate-400 mt-2">
          Update your account password.
        </p>

      </div>

      <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-white font-semibold">
        Change
      </button>

    </div>

    {/* Two Factor */}

    <div className="flex justify-between items-center bg-slate-800 rounded-2xl p-6">

      <div>

        <h2 className="text-xl font-semibold text-white">
          Two-Factor Authentication
        </h2>

        <p className="text-slate-400 mt-2">
          Add an extra security layer.
        </p>

      </div>

      <Toggle
        checked={false}
        onClick={() => {}}
      />

    </div>

    {/* Active Device */}

    <div className="flex justify-between items-center bg-slate-800 rounded-2xl p-6">

      <div>

        <h2 className="text-xl font-semibold text-white">
          Active Session
        </h2>

        <p className="text-slate-400 mt-2">
          Windows 11 • Chrome • Active Now
        </p>

      </div>

      <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-white">
        Logout
      </button>

    </div>

    {/* Login History */}

    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-semibold text-white mb-5">
        Recent Login Activity
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between border-b border-slate-700 pb-3">

          <div>

            <p className="text-white">
              Windows • Chrome
            </p>

            <p className="text-slate-400 text-sm">
              Ahmedabad, India
            </p>

          </div>

          <span className="text-green-400">
            Active
          </span>

        </div>

        <div className="flex justify-between">

          <div>

            <p className="text-white">
              Android • Chrome
            </p>

            <p className="text-slate-400 text-sm">
              Rajkot, India
            </p>

          </div>

          <span className="text-slate-400">
            Yesterday
          </span>

        </div>

      </div>

    </div>

  </div>

</div>

)}

{/* STATISTICS */}

{activeTab === "statistics" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Career Statistics
    </h1>

    <p className="text-slate-400 mt-2">
      Track your overall progress and performance.
    </p>

  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <p className="text-slate-400">Resume Score</p>
      <h2 className="text-5xl font-black text-cyan-400 mt-4">94%</h2>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <p className="text-slate-400">ATS Score</p>
      <h2 className="text-5xl font-black text-green-400 mt-4">91%</h2>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <p className="text-slate-400">Career Readiness</p>
      <h2 className="text-5xl font-black text-purple-400 mt-4">89%</h2>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <p className="text-slate-400">Jobs Applied</p>
      <h2 className="text-5xl font-black text-orange-400 mt-4">18</h2>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <p className="text-slate-400">Mock Interviews</p>
      <h2 className="text-5xl font-black text-pink-400 mt-4">7</h2>
    </div>

    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8">
      <p className="text-white">Placement Probability</p>
      <h2 className="text-5xl font-black text-white mt-4">87%</h2>
    </div>

  </div>

</div>

)}

{/* CAREER GOALS */}

{activeTab === "career" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Career Goals
    </h1>

    <p className="text-slate-400 mt-2">
      Set your dream career targets.
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <label className="text-slate-400 text-sm">
          Dream Company
        </label>

        <input
          defaultValue="Google"
          className="w-full mt-2 bg-slate-800 rounded-xl p-4 text-white"
        />
      </div>

      <div>
        <label className="text-slate-400 text-sm">
          Dream Role
        </label>

        <input
          defaultValue="Frontend Developer"
          className="w-full mt-2 bg-slate-800 rounded-xl p-4 text-white"
        />
      </div>

      <div>
        <label className="text-slate-400 text-sm">
          Expected Salary
        </label>

        <input
          defaultValue="₹8 LPA"
          className="w-full mt-2 bg-slate-800 rounded-xl p-4 text-white"
        />
      </div>

      <div>
        <label className="text-slate-400 text-sm">
          Placement Year
        </label>

        <input
          defaultValue="2027"
          className="w-full mt-2 bg-slate-800 rounded-xl p-4 text-white"
        />
      </div>

    </div>

    <div className="flex justify-end mt-8">

      <button className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-white font-semibold">
        Save Goals
      </button>

    </div>

  </div>

</div>

)}

{/* BACKUP & DATA */}

{activeTab === "backup" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-white">
      Backup & Data
    </h1>

    <p className="text-slate-400 mt-2">
      Manage and protect your SkillBridge AI data.
    </p>

  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    <button className="bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-3xl p-8 transition">

      <Download size={34} className="text-cyan-400 mb-5" />

      <h2 className="text-white text-xl font-bold">
        Export Data
      </h2>

      <p className="text-slate-400 mt-3">
        Download your profile and settings.
      </p>

    </button>

    <button className="bg-slate-900 border border-slate-800 hover:border-green-500 rounded-3xl p-8 transition">

      <Upload size={34} className="text-green-400 mb-5" />

      <h2 className="text-white text-xl font-bold">
        Import Backup
      </h2>

      <p className="text-slate-400 mt-3">
        Restore your previous backup.
      </p>

    </button>

    <button className="bg-slate-900 border border-slate-800 hover:border-purple-500 rounded-3xl p-8 transition">

      <Save size={34} className="text-purple-400 mb-5" />

      <h2 className="text-white text-xl font-bold">
        Backup Now
      </h2>

      <p className="text-slate-400 mt-3">
        Create a fresh backup instantly.
      </p>

    </button>

    <button className="bg-slate-900 border border-slate-800 hover:border-red-500 rounded-3xl p-8 transition">

      <Trash2 size={34} className="text-red-400 mb-5" />

      <h2 className="text-white text-xl font-bold">
        Reset Settings
      </h2>

      <p className="text-slate-400 mt-3">
        Restore default application settings.
      </p>

    </button>

  </div>

</div>

)}

{/* DANGER ZONE */}

{activeTab === "danger" && (

<div>

  <div className="mb-8">

    <h1 className="text-5xl font-bold text-red-500">
      Danger Zone
    </h1>

    <p className="text-slate-400 mt-2">
      These actions cannot be undone.
    </p>

  </div>

  <div className="bg-slate-900 border border-red-500 rounded-3xl p-8">

    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold text-white">
          Delete Account
        </h2>

        <p className="text-slate-400 mt-3">
          Permanently remove your SkillBridge AI account and all saved data.
        </p>

      </div>

      <button
        className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-white font-semibold transition"
        onClick={() => {
          if (
            window.confirm(
              "Are you sure you want to delete your account?"
            )
          ) {
            localStorage.clear();
            alert("Account Deleted Successfully.");
            window.location.reload();
          }
        }}
      >
        Delete Account
      </button>

    </div>

  </div>

</div>

)}

</div>

</div>

</div>

  );
}

export default Settings;