import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import fibonacciPageStyle from './fibonacci-page.module.css'

export const FibonacciPage: React.FC = () => {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [input, setInput] = useState('');
  const [isLoader, setIsLoder] = useState(false);
  const [arrayToAnimate, setArrayToAnimate] = useState<number[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isLoader) {
      setInput(e.target.value);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoader) {
      setIsLoder(true);
      setArrayToAnimate([1]);
      setN(Number(input));
      setI(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (i < n) {
          const array: number[] = arrayToAnimate.slice();
          let val = 1;
          if (i !== 0) {
            val = array[i] + array[i - 1];
          }
          setI(i + 1);
          array.push(val);
          setArrayToAnimate(array);
        } else {
          setIsLoder(false);
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, i, arrayToAnimate]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form action="" onSubmit={ submit }>
        <div className={ fibonacciPageStyle.form_container }>
          <Input max={19} isLimitText={true} type={"number"} onChange={onChange} value={input}></Input>
          <Button
            type="submit"
            text={"Рассчитать"}
            isLoader={isLoader}
            disabled={isLoader || !input || !Number(input) || Number(input) > 19}
          >
          </Button>
        </div>
        <div className={ fibonacciPageStyle.animation_container }>
          {arrayToAnimate && arrayToAnimate.map((item, index) => {
            return (
                <Circle
                  key={ index }
                  index={ index }
                  letter={ item.toString() }
                >
                </Circle>
          )})
          }
        </div>
      </form>
    </SolutionLayout>
  );
};
