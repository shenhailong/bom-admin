/**
 * validate utils
 */

export function isvalidUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
