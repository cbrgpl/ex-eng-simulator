export const required = ( val?: any ) => {
  return !!val || 'Validation.Required'
}
