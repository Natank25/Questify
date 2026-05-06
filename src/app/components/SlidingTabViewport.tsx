import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

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
  onSwipeTabChange: (offset: -1 | 1) => void;
}

const SWIPE_LOCK_DISTANCE = 10;
const SWIPE_MIN_DISTANCE = 64;
const SWIPE_MAX_VERTICAL_DRIFT = 172;
const SWIPE_MIN_VELOCITY = 0.35;

export function SlidingTabViewport({
  activeTab,
  direction,
  renderContext,
  onSwipeTabChange,
}: SlidingTabViewportProps) {
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const axisLockRef = useRef<'x' | 'y' | null>(null);

  const resetGesture = () => {
    pointerIdRef.current = null;
    axisLockRef.current = null;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      return;
    }

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    startTimeRef.current = performance.now();
    axisLockRef.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    if (axisLockRef.current !== null) {
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;

    if (Math.abs(deltaX) < SWIPE_LOCK_DISTANCE && Math.abs(deltaY) < SWIPE_LOCK_DISTANCE) {
      return;
    }

    axisLockRef.current = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    const elapsedMs = Math.max(performance.now() - startTimeRef.current, 1);
    const velocity = Math.abs(deltaX) / elapsedMs;

    if (
      axisLockRef.current === 'x' &&
      Math.abs(deltaY) <= SWIPE_MAX_VERTICAL_DRIFT &&
      (Math.abs(deltaX) >= SWIPE_MIN_DISTANCE || velocity >= SWIPE_MIN_VELOCITY)
    ) {
      onSwipeTabChange(deltaX < 0 ? 1 : -1);
    }

    resetGesture();
  };

  return (
    <div
      className="grid overflow-hidden [touch-action:pan-y]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={resetGesture}
      onLostPointerCapture={resetGesture}
    >
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
