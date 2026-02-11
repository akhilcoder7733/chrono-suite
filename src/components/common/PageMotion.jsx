import { motion } from "framer-motion";

const PageMotion = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageMotion;
