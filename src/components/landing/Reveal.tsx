import { motion, type HTMLMotionProps } from "framer-motion";
import { useMotionOn } from "@/lib/motion-preference";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Soft fade-up when the block scrolls into view. */
export function Reveal({ delay = 0, y = 40, children, ...rest }: RevealProps) {
  const on = useMotionOn();
  return (
    <motion.div
      initial={on ? { opacity: 0, y } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
