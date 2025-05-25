import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-50/90 to-orange-100/80 dark:from-slate-700/90 dark:to-slate-600/80 border border-amber-200/60 dark:border-slate-500/60 hover:from-amber-100/90 hover:to-orange-200/80 dark:hover:from-slate-600/90 dark:hover:to-slate-500/80 transition-all duration-300 shadow-lg hover:shadow-xl group overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {/* Rotating background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-200/40 to-orange-300/30 dark:from-blue-400/20 dark:to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Sun icon for light theme */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: theme === "light" ? 1 : 0,
          scale: theme === "light" ? 1 : 0.3,
          rotate: theme === "light" ? 0 : 180,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ rotate: theme === "light" ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sun
            size={16}
            className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-600 dark:text-amber-500 drop-shadow-sm relative z-10"
          />
        </motion.div>
      </motion.div>

      {/* Moon icon for dark theme */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: theme === "dark" ? 1 : 0,
          scale: theme === "dark" ? 1 : 0.3,
          rotate: theme === "dark" ? 0 : -180,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.div
          animate={{
            rotate: theme === "dark" ? [0, -10, 10, 0] : 0,
            scale: theme === "dark" ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Moon
            size={16}
            className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-slate-600 dark:text-slate-300 drop-shadow-sm relative z-10"
          />
        </motion.div>
      </motion.div>

      {/* Subtle inner highlight circle */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none" />

      {/* Active state indicator ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        animate={{
          borderColor:
            theme === "light"
              ? "rgba(245, 158, 11, 0.4)"
              : "rgba(99, 102, 241, 0.4)",
          boxShadow:
            theme === "light"
              ? "0 0 10px rgba(245, 158, 11, 0.3)"
              : "0 0 10px rgba(99, 102, 241, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Pulse effect on theme change */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-current/20 to-transparent"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: theme ? [0, 1.5, 0] : 0, opacity: [1, 0, 0] }}
        transition={{ duration: 0.6 }}
        key={theme}
      />
    </motion.button>
  )
}