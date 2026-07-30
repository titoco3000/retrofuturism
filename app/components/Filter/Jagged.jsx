'use client';

import { useEffect, useId, useRef } from 'react';

function generateTexture(width, height, canvas) {
  const w = Math.round(width);
  const h = Math.round(height);

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(w, h);

  const centerX = w / 2;
  const centerY = h / 2;
  const maxRadius = Math.max(centerX, centerY);

  for (let y = 0; y < h; y++) {
    const dx = Math.round(((y * y) / (h * h)) * 255);
    console.log(dx);

    for (let x = 0; x < w; x++) {
      const pixelIndex = (y * w + x) * 4;

      const normalizedXDistance = (x - centerX) / maxRadius;
      const normalizedYDistance = (y - centerY) / maxRadius;
      const displacementX =
        normalizedXDistance * (normalizedYDistance * normalizedYDistance);
      const displacementY =
        normalizedYDistance * (normalizedXDistance * normalizedXDistance);

      imageData.data[pixelIndex] = 128 + displacementX * 255;
      imageData.data[pixelIndex + 1] = 128 + displacementY * 255;

      imageData.data[pixelIndex + 2] = 0;
      imageData.data[pixelIndex + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

export default function Jagged({
  children,
  bulge = 0.05,
  minSize = 256,
  className = '',
  showDisplacementTexture = false,
}) {
  const rawId = useId().replace(/:/g, '');
  const filterId = `sphere-map-${rawId}`;
  const canvasRef = useRef(null);
  const feImageRef = useRef(null);
  const feDisplacementRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (
      !container ||
      !canvasRef.current ||
      !feImageRef.current ||
      !feDisplacementRef.current
    )
      return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        if (width < 1 || height < 1) continue;

        let textureWidth, textureHeight;

        if (width <= height) {
          textureWidth = minSize;
          textureHeight = minSize * (height / width);
        } else {
          textureHeight = minSize;
          textureWidth = minSize * (width / height);
        }

        const dataUrl = generateTexture(
          textureWidth,
          textureHeight,
          canvasRef.current,
        );

        // 1. Assign the generated data URL
        feImageRef.current.setAttribute('href', dataUrl);

        // 2. FORCE the image to exactly overlay your target div's coordinates
        feImageRef.current.setAttribute('x', '0');
        feImageRef.current.setAttribute('y', '0');
        feImageRef.current.setAttribute('width', width);
        feImageRef.current.setAttribute('height', height);

        const targetScale = Math.max(width, 1000) * bulge;
        feDisplacementRef.current.setAttribute('scale', targetScale);
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [bulge, minSize]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter
            id={filterId}
            filterUnits='objectBoundingBox'
            colorInterpolationFilters='sRGB'
            x='-0.5'
            y='-0.5'
            width='2'
            height='2'
          >
            <feImage ref={feImageRef} result='Map' preserveAspectRatio='none' />
            <feDisplacementMap
              ref={feDisplacementRef}
              in='SourceGraphic'
              in2='Map'
              scale={100}
              xChannelSelector='R'
              yChannelSelector='G'
            />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        style={{
          display: showDisplacementTexture ? 'block' : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
        id='filterCanvas'
      ></canvas>

      <div ref={containerRef} className='overflow-hidden h-full w-full'>
        <div
          className='relative h-full w-full overflow-hidden' // <-- Added 'relative'
          id='target'
          style={{
            filter: `url(#${filterId})`,
            background:
              'repeating-conic-gradient(#808080 0 25%, green 0 50%) 50% / 10% 10%',
            opacity: showDisplacementTexture ? 0 : 1,
          }}
        >
          {children}

          {/* --- Variable Blur Overlay --- */}
          <div
            className='absolute inset-0 pointer-events-none z-10'
            style={{
              // Adjust the px value to change the maximum blur intensity at the corners
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',

              // The gradient dictates the fade. 'transparent' means no blur, 'black' means full blur.
              maskImage:
                'radial-gradient(ellipse at center, transparent 40%, black 95%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, transparent 40%, black 95%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
