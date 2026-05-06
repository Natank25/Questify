import { AnimatePresence, motion } from 'motion/react';

import type { TabDefinition, TabDirection, TabRenderContext } from '../tabRegistry';

const slideVariants = {
  enter: (direction: TabDirection) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: TabDirection) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 1,
  }),
};

interface SlidingTabViewportProps {
  activeTab: TabDefinition;
  direction: TabDirection;
  renderContext: TabRenderContext;
}

export function SlidingTabViewport({ activeTab, direction, renderContext }: SlidingTabViewportProps) {
  return (
    <div className="grid overflow-hidden">
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <motion.div
          key={activeTab.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="w-full [grid-area:1/1]"
        >
          {activeTab.render(renderContext)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
