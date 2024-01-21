export const getFibbonachiNumber = (index: number): number[] => {
  const output = [1];
  for (let i = 1; i <= index; i++) {
    let val = 1;
    if (i !== 1) {
      val = output[i - 1] + output[i - 2];
    }
    output.push(val);
  }
  return output;
} 

export const swap = <T>(arr: { data: T }[], i: number, j: number) => {
  const temp = arr[i]['data'];
  arr[i]['data'] = arr[j]['data'];
  arr[j]['data'] = temp;
};

export const randomArr = (minLen: number = 3, maxLen: number = 17): number[] => {
  const length = Math.max(minLen, Math.floor(Math.random() * maxLen));
  return Array.from({length: length}, () => Math.floor(Math.random() * 100));
}

export const assert = (condition: boolean, message: string): void => {
  if (!condition) {
      throw new Error(message || "Assertion failed");
  }
}