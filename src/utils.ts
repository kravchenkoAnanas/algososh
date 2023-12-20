export function swap<T>(arr: T[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const randomArr = (minLen: number = 3, maxLen: number = 17): number[] => {
  const length = Math.max(minLen, Math.floor(Math.random() * maxLen));
  return Array.from({length: length}, () => Math.floor(Math.random() * 100));
}