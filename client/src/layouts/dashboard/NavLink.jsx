import { NavLink } from 'react-router-dom';

// ... inside your Sidebar component map:

<NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
    ${isActive 
      ? 'bg-[#fbcbb9] dark:bg-[#f9a372]/20 text-[#f9a372] shadow-sm' 
      : 'text-slate-600 dark:text-slate-400 hover:bg-[#fbcbb9]/30 dark:hover:bg-[#f9a372]/10 hover:text-[#f9a372]'
    }
  `}
>
  {({ isActive }) => (
    <>
      <item.icon 
        size={20} 
        strokeWidth={isActive ? 2.5 : 2} 
        className={isActive ? 'text-[#f9a372]' : 'group-hover:text-[#f9a372]'}
      />
      <span className={`font-medium text-[15px] ${isActive ? 'text-[#f9a372]' : ''}`}>
        {item.name}
      </span>
      
      {/* Optional: Indicator pill on the right for active state */}
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f9a372]" />
      )}
    </>
  )}
</NavLink>