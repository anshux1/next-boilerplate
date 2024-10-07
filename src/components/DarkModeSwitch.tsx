'use client'
import { Sun, Moon } from "lucide-react"
import { Switch } from "./ui/switch"
import { useTheme } from "next-themes"
import { useState } from "react";

export function DarkModeSwitch(){
  const { setTheme, theme } = useTheme();
  console.log(theme)
  const [isDarkModeOn, setIsDarkModeOn] = useState(theme === "light" ? false : true)
  return (
    <div className="flex gap-2">
      <Sun className="size-5" />
      <Switch 
        checked={isDarkModeOn}
        onCheckedChange={e => {
          if(e.valueOf()){
            setTheme("dark")
            setIsDarkModeOn(e.valueOf())
          } else {
            setTheme('light')
            setIsDarkModeOn(e.valueOf())
          }
        }}  />
      <Moon className="size-5" />
    </div>
  )
}
