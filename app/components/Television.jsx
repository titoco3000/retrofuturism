export default function Television({ children }) {
  return (
    <div className='h-full relative bg-[#121513] text-[#4af626] font-mono overflow-hidden rounded-2xlshadow-[inset_0_0_60px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.7)]'>
      <div className='relative z-10 animate-flicker [text-shadow:1.5px_0_1px_rgba(255,0,0,0.7),-1.5px_0_1px_rgba(0,0,255,0.7)] w-full h-full '>
        {children}
      </div>
      <div className='absolute inset-0 pointer-events-none z-20 crt'></div>
    </div>
  );
}
