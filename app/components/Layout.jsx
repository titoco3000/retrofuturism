export default function Layout({ header, footer, left, right, main }) {
  return (
    <div className='h-full flex flex-col p-5'>
      {header && <header className='border-2 flex-none mb-3'>{header}</header>}
      <div className='flex flex-1 overflow-hidden'>
        {left && <aside className='border-2 flex-none mr-3'>{left}</aside>}
        <div className='flex flex-col flex-1 overflow-hidden'>
          <main className='border-2 flex-1 overflow-auto'>{main}</main>
          {footer && (
            <footer className='border-2 flex-none mt-3'>{footer}</footer>
          )}
        </div>
        {right && <aside className='border-2 flex-none ml-3'>{right}</aside>}
      </div>
    </div>
  );
}
