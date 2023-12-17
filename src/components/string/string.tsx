import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";


export const StringComponent: React.FC = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [input, setInput] = useState('');
  const [isLoader, setIsLoder] = useState(false);
  const [arrayToAnimate, setArrayToAnimate] = useState<any[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isLoader) {
      setInput(e.target.value);
      console.log(e.target.value);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoader) {
      setIsLoder(true);

      const array: any[] = input.split('').map((item) => {
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

      console.log("CLICK input=", input);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (start < end) {
          console.log('animation', start, end, arrayToAnimate);

          const array: any[] = arrayToAnimate.slice();

          const temp: any = array[start]['data'];
          array[start]['data'] = array[end]['data'];
          array[end]['data'] = temp;

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
        <div style={{ maxWidth: '50%', margin: 'auto', display: 'flex', gap: '2.5%' }}>
          <Input maxLength={11} isLimitText={true} onChange={onChange}></Input>
          <Button
            type="submit"
            text={"Развернуть"}
            isLoader={isLoader}
          >
          </Button>
        </div>
        <div className="" style={{ paddingTop: '5%', margin: 'auto', display: 'flex', justifyContent: 'center', gap: '2.5%' }}>
          {arrayToAnimate && arrayToAnimate.map((item, index) => {
            return (
                <Circle
                  // index={ index }
                  letter={ item['data'] }
                  state={ item['state'] }
                >
                </Circle>
          )})
          }
        </div>
      </form>
    </SolutionLayout>
  );
};
