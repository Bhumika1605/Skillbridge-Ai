import { motion } from "framer-motion";

function PageContainer({
  title,
  subtitle,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
      max-w-[1700px]
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-6
      "
    >
      <div className="mb-10">

        <h1
          className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          text-white
          "
        >
          {title}
        </h1>

        <p
          className="
          mt-3
          text-slate-400
          text-sm
          sm:text-base
          max-w-3xl
          "
        >
          {subtitle}
        </p>

      </div>

      {children}

    </motion.div>
  );
}

export default PageContainer;