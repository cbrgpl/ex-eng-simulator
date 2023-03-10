const storageNames = {
  LOCALE: 'var_locale',
}

window.storageNames = storageNames

declare global {
  interface Window {
    storageNames: typeof storageNames;
  }
}

export {}
