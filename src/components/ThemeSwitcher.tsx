
import { useTheme } from "./ThemeProvider"
import { Sun, Moon } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-20 h-10 rounded-full transition-all duration-700 overflow-hidden shadow-lg border-2 border-slate-300 dark:border-slate-700 flex items-center px-1 ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-sky-200 to-blue-400'}`}
      aria-label="Toggle theme"
      style={{ minWidth: 80, minHeight: 40 }}
    >
      {/* Background scenery */}
      <div className="absolute inset-0 transition-all duration-700 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Day sky with clouds */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute left-5 top-2 w-5 h-2 bg-white rounded-full opacity-70 blur-sm" />
          <div className="absolute left-12 top-4 w-4 h-1.5 bg-white rounded-full opacity-60 blur-sm" />
          <div className="absolute left-2 top-6 w-3 h-1 bg-white rounded-full opacity-50 blur-sm" />
        </div>
        {/* Night sky with stars */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute left-7 top-2 w-1 h-1 bg-white rounded-full opacity-80" />
          <div className="absolute left-15 top-5 w-1 h-1 bg-white rounded-full opacity-60" />
          <div className="absolute left-4 top-7 w-1 h-1 bg-white rounded-full opacity-70" />
        </div>
      </div>
      {/* Toggle knob with icon */}
      <div
        className={`absolute w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-transform duration-700 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${isDark ? 'translate-x-[2.5rem]' : 'translate-x-0'}`}
        style={{ zIndex: 2 }}
      >
        {isDark ? (
          <Moon className="text-yellow-200 w-5 h-5 drop-shadow" strokeWidth={1.5} />
        ) : (
          <Sun className="text-yellow-400 w-5 h-5 drop-shadow" strokeWidth={1.5} />
        )}
      </div>
      {/* Decorative ground */}
      <div className={`absolute bottom-0 left-0 w-full h-2 rounded-b-full transition-all duration-700 ${isDark ? 'bg-slate-700' : 'bg-green-300'}`} style={{ zIndex: 1 }} />
    </button>
  )
}