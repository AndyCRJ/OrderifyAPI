export function initializeTheme() {
  
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  let theme = ''

  if(!localStorage.getItem("theme")) {
    localStorage.setItem("theme", systemTheme)
    theme = systemTheme
  } else theme = localStorage.getItem('theme')

  document.querySelector("html").setAttribute("data-theme", theme)
  setTimeout(() => {
    document.querySelector("html").setAttribute("data-transitions", "")
  }, 100);
}

export function switchTheme() {
  const actualTheme = localStorage.getItem("theme")
  const newTheme = actualTheme === 'dark' ? 'light' : 'dark'

  localStorage.setItem("theme", newTheme)
  document.querySelector("html").setAttribute("data-theme", newTheme)
}

export function getTheme () {
  return localStorage.getItem("theme")
}