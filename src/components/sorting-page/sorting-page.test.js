import { sortAlgo } from './sorting-page';

const TEST_SORT_EMPTY = 'пустого массива.';
const TEST_SORT_ONE_ELEMENT = 'массив из одного элемента.';
const TEST_SORT_FEW_ELEMENTS = 'массив из нескольких элементов.';

describe("Сортировка", () => {
    it(TEST_SORT_EMPTY, () => {
        const input = [].map((item) => { return { data: item }; });

        expect(sortAlgo(input, 'bubble', 'asc')).toEqual(input);
        expect(sortAlgo(input, 'bubble', 'desc')).toEqual(input);
        expect(sortAlgo(input, 'selection', 'asc')).toEqual(input);
        expect(sortAlgo(input, 'selection', 'desc')).toEqual(input);
    });

    it(TEST_SORT_ONE_ELEMENT, () => {
        const input = [1].map((item) => { return { data: item }; });

        expect(sortAlgo(input, 'bubble', 'asc')).toEqual(input);
        expect(sortAlgo(input, 'bubble', 'desc')).toEqual(input);
        expect(sortAlgo(input, 'selection', 'asc')).toEqual(input);
        expect(sortAlgo(input, 'selection', 'desc')).toEqual(input);
    });

    it(TEST_SORT_FEW_ELEMENTS, () => {
        const input = [1, 5 ,10, -1].map((item) => { return { data: item }; });
        const answerAsc = [-1, 1, 5, 10].map((item) => { return { data: item }; });
        const answerDesc = [10, 5, 1, -1].map((item) => { return { data: item }; });

        expect(sortAlgo(input, 'bubble', 'asc')).toEqual(answerAsc);
        expect(sortAlgo(input, 'bubble', 'desc')).toEqual(answerDesc);
        expect(sortAlgo(input, 'selection', 'asc')).toEqual(answerAsc);
        expect(sortAlgo(input, 'selection', 'desc')).toEqual(answerDesc);
    });
});
