'use client';

import { useState, useEffect } from 'react';

export default function Panel({ animation, className = '', children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (animation === 'x-reserved-w') {
      // Using requestAnimationFrame ensures the browser paints the
      // initial "closed" state before applying the "open" state,
      // which is required for the CSS transition to trigger.
      const frame = requestAnimationFrame(() => {
        setIsOpen(true);
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [animation]);

  if (animation === 'x-reserved-w') {
    return (
      <div className={`relative inline-block h-full ${className}`}>
        <div
          style={{
            clipPath: isOpen ? 'inset(0 0% 0 0%)' : 'inset(0 50% 0 50%)',
            transition: 'clip-path 0.5s ease-in-out',
            padding: '16px',
          }}
        >
          {children}
        </div>

        <div
          className='border-2 absolute top-0 bottom-0 pointer-events-none'
          style={{
            left: isOpen ? '0%' : '50%',
            right: isOpen ? '0%' : '50%',
            transition: 'left 0.5s ease-in-out, right 0.5s ease-in-out',
          }}
        />
      </div>
    );
  }

  return <div className={`border-2 ${className}`}>{children}</div>;
}
