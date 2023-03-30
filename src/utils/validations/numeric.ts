export const numeric = ( val: string ) => {
  return !val || /^\d+$/.test( val ) || 'Validation.Numeric'
}
