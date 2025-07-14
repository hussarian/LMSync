'use client'

import * as React from 'react'

export function ThemeProvider({ children, theme }) {
  const [currentTheme, setCurrentTheme] = React.useState(theme || 'light')

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`theme-${currentTheme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {children}
    </div>
  )
}
