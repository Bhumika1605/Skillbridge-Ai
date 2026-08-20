import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({
  icon,
  type = "text",
  placeholder,
  label,
}) {

  const [showPassword, setShowPassword] = useState(false);

  const password = type === "password";

  return (
    <div className="w-full">

      <label className="block text-sm text-slate-300 mb-2">
        {label}
      </label>

      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-4 focus-within:border-cyan-400 transition">

        {icon && (
          <div className="text-slate-400 mr-3">
            {icon}
          </div>
        )}

        <input
          type={password ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full py-4 bg-transparent outline-none text-white placeholder:text-slate-500"
        />

        {password && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={18} className="text-slate-400" />
            ) : (
              <Eye size={18} className="text-slate-400" />
            )}
          </button>
        )}

      </div>

    </div>
  );
}

export default Input;