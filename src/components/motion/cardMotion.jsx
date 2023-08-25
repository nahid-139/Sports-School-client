import { motion } from 'framer-motion';

const variants = {
    offscreen: {
        y: 50,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 1,
        },
    },
};

const CardMotion = ({ children }) => {
    return (
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={variants}
      >
        {children}
      </motion.div>
    );
};

export default CardMotion;
