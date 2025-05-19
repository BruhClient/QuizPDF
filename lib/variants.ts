export const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2, // Adjust to control delay between children
    },
  },
};

export const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};