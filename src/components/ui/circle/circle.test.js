import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

const TEST_SNAPSHOT_CIRCLE_WITHOUT_LETTER = 'без буквы';
const TEST_SNAPSHOT_CIRCLE_WITH_LETTERS = 'с буквами';
const TEST_SNAPSHOT_CIRCLE_WITH_HEAD = 'с head';
const TEST_SNAPSHOT_CIRCLE_WITH_REACT_HEAD = 'с react-элементом в head';
const TEST_SNAPSHOT_CIRCLE_WITH_TAIL = 'с tail';
const TEST_SNAPSHOT_CIRCLE_WITH_REACT_TAIL = 'с react-элементом в tail';
const TEST_SNAPSHOT_CIRCLE_WITH_INDEX = 'с index';
const TEST_SNAPSHOT_CIRCLE_WITH_IS_SMALL = 'с пропcом isSmall ===  true';
const TEST_SNAPSHOT_CIRCLE_WITH_DEFAULT = 'в состоянии default';
const TEST_SNAPSHOT_CIRCLE_WITH_CHANGING = 'в состоянии changing';
const TEST_SNAPSHOT_CIRCLE_WITH_MODIFIED = 'в состоянии modified';

describe("Окружность", () => {
  it(TEST_SNAPSHOT_CIRCLE_WITHOUT_LETTER, () => {
    const tree = renderer
      .create(<Circle />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITHOUT_LETTER);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_LETTERS, () => {
    const tree = renderer
      .create(<Circle letter={"ABCD"} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_LETTERS);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_HEAD, () => {
    const tree = renderer
      .create(<Circle letter={"ABCD"} head={"HEAD"} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_HEAD);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_REACT_HEAD, () => {
    const tree = renderer
      .create(<Circle letter={"ABCD"} head={<Circle letter={"HEAD"} />} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_REACT_HEAD);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_TAIL, () => {
    const tree = renderer
      .create(<Circle letter={"ABCD"} tail={"HEAD"} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_TAIL);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_REACT_TAIL, () => {
    const tree = renderer
      .create(<Circle letter={"ABCD"} tail={<Circle letter={"HEAD"} />} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_REACT_TAIL);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_INDEX, () => {
    const tree = renderer
      .create(<Circle index={123} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_INDEX);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_IS_SMALL, () => {
    const tree = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_IS_SMALL);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_DEFAULT, () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_DEFAULT);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_CHANGING, () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_CHANGING);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_MODIFIED, () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_MODIFIED);
  });
});
