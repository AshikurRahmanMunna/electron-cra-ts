// import { nativeImage } from 'electron'
// import isDev from 'electron-is-dev'
// import path from 'path'
const { nativeImage } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

export const getIconPath = () => {
  let ext = 'png'
  if (process.platform === 'darwin') {
    ext = 'icns'
  }
  if (process.platform === 'linux') {
    ext = 'png'
  }
  if (process.platform === 'win32') {
    ext = 'ico'
  }

  let iconPath
  iconPath = isDev
    ? path.join(__dirname, '..', '..', 'assets', 'app_icon', `icon.${ext}`)
    : path.join(
        __dirname,
        '..',
        '..',
        '..',
        'build',
        'assets',
        'app_icon',
        `icon.${ext}`,
      )
  return nativeImage.createFromPath(iconPath)
}

export const getProductionURL = (route) => {
  const url = new URL(
    `file://${path.join(__dirname, '../', '../', '../build/index.html')}`,
  )
  url.hash = route
  return url.toString()
}

export const getDevelopmentURL = (route = '') => {
  return `http://localhost:3000#${route}`
}
