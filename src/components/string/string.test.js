import { stringAlgo } from './string';

const TEST_STRING_PAGE_EVEN_CHARS = 'Переворот строки с чётным количеством символов.';
const TEST_STRING_PAGE_ODD_CHARS = 'Переворот строки с нечётным количеством символов.';
const TEST_STRING_PAGE_ONE_CHARS = 'Переворот строки с одним символом.';
const TEST_STRING_PAGE_EMPTY = 'Переворот строки пустую строку.';

it(TEST_STRING_PAGE_EVEN_CHARS, () => {
    expect(stringAlgo("test")).toEqual("tset");
});

it(TEST_STRING_PAGE_ODD_CHARS, () => {
    expect(stringAlgo("tes")).toEqual("set");
});

it(TEST_STRING_PAGE_ONE_CHARS, () => {
    expect(stringAlgo("1")).toEqual("1");
});

it(TEST_STRING_PAGE_EMPTY, () => {
    expect(stringAlgo("")).toEqual("");
});
