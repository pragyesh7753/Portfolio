import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { Button } from "./ui/button"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  // Toggle between 'dark' and 'light' on button click
  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full relative"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-5 w-5 transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          ${theme === "dark" ? "opacity-0 scale-0" : "opacity-100 scale-100"}
        `}
      />
      <Moon
        className={`h-5 w-5 transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          ${theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}