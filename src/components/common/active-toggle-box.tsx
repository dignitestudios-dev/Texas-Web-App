'use client';

import React from 'react';

interface ActiveToggleBoxProps {
  isActive: boolean;
  onToggle: (newVal: boolean) => void;
  className?: string;
}

export function ActiveToggleBox({
  isActive,
  onToggle,
  className = '',
}: ActiveToggleBoxProps) {
  return (
    <div
      className={`box-border flex flex-row justify-between items-center px-4 h-[38px] min-w-[134px] border border-[#E4E4E7] rounded-[8px]  gap-2.5 select-none ${className}`}
    >
      <span className="font-rubik font-medium text-[14px] leading-[17px] text-[#121111]">
        {isActive ? 'Active' : 'Inactive'}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        onClick={() => onToggle(!isActive)}
        className={`relative inline-flex h-[24px] w-[42px] shrink-0 cursor-pointer rounded-full p-[2px] transition-colors duration-200 ease-in-out border-none outline-none ${
          isActive ? 'bg-[#046C4E]' : 'bg-[#E4E4E7]'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.15),0px_3px_1px_rgba(0,0,0,0.06)] transition duration-200 ease-in-out ${
            isActive ? 'translate-x-[18px]' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
