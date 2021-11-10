export function pickRandomArrayElement(arr: any[] = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}
