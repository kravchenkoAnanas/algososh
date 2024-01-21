import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils";
import stringStyle from './string.module.css'
import { assert } from "../../utils";

interface IItem {
  data: string;
  state: ElementStates;
}

export const stringAlgo = (str: string): string => {
  return str.split('').reverse().join('');
}

export const StringComponent: React.FC = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoader, setIsLoder] = useState(false);
  const [arrayToAnimate, setArrayToAnimate] = useState<IItem[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isLoader) {
      setInput(e.target.value);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoader) {
      setIsLoder(true);

      const array: IItem[] = input.split('').map((item) => {
        return { 
          data: item,
          state: ElementStates.Default
        }
      });

      array[0]['state'] = ElementStates.Changing;
      array[array.length - 1]['state'] = ElementStates.Changing;

      setStart(0);
      setEnd(array.length - 1);
      setArrayToAnimate(array);
      setAnswer(stringAlgo(input));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (start < end) {
          const array: IItem[] = arrayToAnimate.slice();
          swap<string>(array, start, end);

          array[start]['state'] = ElementStates.Modified;
          array[end]['state'] = ElementStates.Modified;

          array[start + 1]['state'] = ElementStates.Changing;
          array[end - 1]['state'] = ElementStates.Changing;
          
          setStart(start + 1);
          setEnd(end - 1);
          setArrayToAnimate(array);
        } else {
          const array: IItem[] = arrayToAnimate.slice();
          array[start]['state'] = ElementStates.Modified;
          array[end]['state'] = ElementStates.Modified;
          setArrayToAnimate(array);

          setIsLoder(false);
          const result = array.map((item) => item['data']).join('');
          assert(answer === result, 'Algorithm string check');
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, arrayToAnimate]);

  return (
    <SolutionLayout title="Строка">
      <form action="" onSubmit={ submit }>
        <div className={ stringStyle.form_container }>
          <Input
            maxLength={11}
            isLimitText={true}
            onChange={onChange}
            value={input}
            data-testid="input">
          </Input>
          <Button
            type="submit"
            text={"Развернуть"}
            isLoader={isLoader}
            disabled={isLoader || !input}
            value={input}
            data-testid="button"
          >
          </Button>
        </div>
        <div className={ stringStyle.animation_container } data-testid="result" >
          {arrayToAnimate && arrayToAnimate.map((item, index) => {
            return <Circle key={ index } letter={ item['data'] } state={ item['state'] }></Circle>
          })}
        </div>
      </form>
    </SolutionLayout>
  );
};
