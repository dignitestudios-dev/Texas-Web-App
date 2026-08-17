"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Switch({
  className,
  checked,
  onCheckedChange,
  disabled,
  ...props
}: SwitchProps) {
  const [isChecked, setIsChecked] = React.useState(checked || false)

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])

  const handleToggle = () => {
    if (disabled) return
    const next = !isChecked
    setIsChecked(next)
    onCheckedChange?.(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "peer inline-flex h-[32px] w-[60px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent p-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A6E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-inner",
        isChecked ? "bg-[#e0760b]" : "bg-[#E4E4E4]",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-[24px] w-[24px] rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out",
          isChecked ? "translate-x-[28px]" : "translate-x-0"
        )}
      />
    </button>
  )
}

export { Switch }
