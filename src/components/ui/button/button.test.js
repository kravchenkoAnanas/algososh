import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';

const TEST_SNAPSHOT_BUTTON_WITH_TEXT = 'с текстом';
const TEST_SNAPSHOT_BUTTON_WITHOUT_TEXT = 'без текстом';
const TEST_SNAPSHOT_BUTTON_DISABLED = 'блокированная';
const TEST_SNAPSHOT_BUTTON_WITH_LOADER = 'с индикацией загрузки';

const TEST_BUTTON_CLICK = 'Вызов колбека при клике на кнопку';

describe("Кнопка", () => {
  it(TEST_SNAPSHOT_BUTTON_WITH_TEXT, () => {
    const tree = renderer
      .create(<Button text={"Развернуть"} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_WITH_TEXT);
  });

  it(TEST_SNAPSHOT_BUTTON_WITHOUT_TEXT, () => {
    const tree = renderer
      .create(<Button text={""} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_WITHOUT_TEXT);
  });

  it(TEST_SNAPSHOT_BUTTON_DISABLED, () => {
    const tree = renderer
      .create(<Button disabled={true} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_DISABLED);
  });

  it(TEST_SNAPSHOT_BUTTON_WITH_LOADER, () => {
    const tree = renderer
      .create(<Button isLoader={true} />)
      .toJSON();
      expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_WITH_LOADER);
  });

  it(TEST_BUTTON_CLICK, () => {
      const callback = jest.fn();

      const { container } = render(<Button
          data-testid="button"
          onClick={ callback() }
      />);

      const button = getByTestId(container, "button");

      fireEvent.click(button);
      expect(callback).toHaveBeenCalledTimes(1);
  });
});
