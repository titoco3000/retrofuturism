'use client';

import { useEffect, useId, useRef } from 'react';

function generateSphereMap(width, height, bulge, canvas) {
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
    for (let x = 0; x < w; x++) {
      const normalizedXDistance = (x - centerX) / maxRadius;
      const normalizedYDistance = (y - centerY) / maxRadius;

      const pixelIndex = (y * w + x) * 4;

      const displacementX =
        normalizedXDistance * (normalizedYDistance * normalizedYDistance);
      const displacementY =
        normalizedYDistance * (normalizedXDistance * normalizedXDistance);

      // Changed `w` and `h` to a fixed constant (100).
      // This ensures the RGB colors in the map are consistent no matter the texture resolution.
      // The actual intensity of the displacement will now be handled entirely by the SVG scale attribute.
      imageData.data[pixelIndex] = 128 + displacementX * bulge * 100;
      imageData.data[pixelIndex + 1] = 128 + displacementY * bulge * 100;

      imageData.data[pixelIndex + 2] = 0;
      imageData.data[pixelIndex + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

export default function WithHoles({
  children,
  bulge = 0.8,
  minSize = 10,
  className = '',
}) {
  const rawId = useId().replace(/:/g, '');
  const filterId = `sphere-map-${rawId}`;
  const canvasRef = useRef(null);
  const feImageRef = useRef(null);
  const feDisplacementRef = useRef(null); // Added a ref for the displacement map
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

        const dataUrl = generateSphereMap(
          textureWidth,
          textureHeight,
          bulge,
          canvasRef.current,
        );
        feImageRef.current.setAttribute('href', dataUrl);

        // Dynamically scale the displacement amount proportionally to the element size.
        // If element is 100x100 -> scale is 100
        // If element is 1000x1000 -> scale is 1000
        feDisplacementRef.current.setAttribute(
          'scale',
          Math.max(width, height),
        );
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [bulge, minSize]);

  return (
    <div className={`h-full w-full ${className}`}>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter
            id={filterId}
            filterUnits='objectBoundingBox'
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
        style={{ display: 'none' }}
        id='filterCanvas'
      ></canvas>

      <div ref={containerRef} className='overflow-hidden h-full w-full'>
        <div
          className='h-full w-full overflow-hidden'
          id='target'
          style={{
            filter: `url(#${filterId})`,
            background:
              'repeating-conic-gradient(#808080 0 25%, green 0 50%) 50% / 10% 10%',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
