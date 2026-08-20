function Button({ text, type = "primary" }) {
  const styles = {
    primary:
      "bg-cyan-500 hover:bg-cyan-600 text-white",
    secondary:
      "border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white",
  };

  return (
    <button
      className={`${styles[type]} px-6 py-3 rounded-xl font-semibold transition duration-300`}
    >
      {text}
    </button>
  );
}

export default Button;