import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils";
import stringStyle from './string.module.css'

interface IItem {
  data: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [input, setInput] = useState('');
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
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (start < end) {
          const array: IItem[] = arrayToAnimate.slice();

          swap(array, start, end);

          arrayToAnimate[start]['state'] = ElementStates.Modified;
          arrayToAnimate[end]['state'] = ElementStates.Modified;

          arrayToAnimate[start + 1]['state'] = ElementStates.Changing;
          arrayToAnimate[end - 1]['state'] = ElementStates.Changing;
          
          setStart(start + 1);
          setEnd(end - 1);
          setArrayToAnimate(array);
        } else {
          arrayToAnimate[start]['state'] = ElementStates.Modified;
          arrayToAnimate[end]['state'] = ElementStates.Modified;

          setIsLoder(false);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, start, end]);

  return (
    <SolutionLayout title="Строка">
      <form action="" onSubmit={ submit }>
        <div className={ stringStyle.form_container }>
          <Input maxLength={11} isLimitText={true} onChange={onChange}></Input>
          <Button
            type="submit"
            text={"Развернуть"}
            isLoader={isLoader}
          >
          </Button>
        </div>
        <div className={ stringStyle.animation_container } >
          {arrayToAnimate && arrayToAnimate.map((item, index) => {
            return <Circle letter={ item['data'] } state={ item['state'] }></Circle>
          })
          }
        </div>
      </form>
    </SolutionLayout>
  );
};
