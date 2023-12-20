export const randomArr = (minLen: number = 3, maxLen: number = 17) => {
  const length = Math.max(minLen, Math.floor(Math.random() * maxLen));
  return Array.from({length: length}, () => Math.floor(Math.random() * 100));
}