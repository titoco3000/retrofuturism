import Filter from './Filter';

export default function Television({ jagged = false, children }) {
  const rectangularMask = `
    linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.01) 20%, rgba(0,0,0,0.01) 80%, rgba(0,0,0,0.3) 100%), 
    linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.01) 20%, rgba(0,0,0,0.01) 80%, rgba(0,0,0,0.3) 100%)
  `;

  return (
    <Filter className='crt' jagged={jagged}>
      <div className='h-full relative bg-[#121513] text-[#4af626] font-mono overflow-hidden rounded-2xlshadow-[inset_0_0_60px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.7)]'>
        <div className='relative z-10 animate-flicker [text-shadow:1.5px_0_1px_rgba(255,0,0,0.7),-1.5px_0_1px_rgba(0,0,255,0.7)] w-full h-full '>
          {children}
          <div
            className='absolute inset-0 pointer-events-none z-10 backdrop-blur-[10px] bg-black/50'
            style={{
              maskImage: rectangularMask,
              WebkitMaskImage: rectangularMask,
            }}
          />
        </div>
        <div className='absolute inset-0 pointer-events-none z-20 crt-overlay'></div>
      </div>
    </Filter>
  );
}
