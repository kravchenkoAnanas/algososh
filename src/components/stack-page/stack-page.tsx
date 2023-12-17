import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";


export const StackPage: React.FC = () => {
  const [isLoader, setIsLoder] = useState(false);
  const [action, setAction] = useState(""); // push / pop
  const [input, setInput] = useState('');
  const [arrayToAnimate, setArrayToAnimate] = useState<any[]>([]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClkickPush = (e: any) => {
    if (!input || !Number(input)) {
      return;
    }

    let inputSelector = document.getElementById('input') as HTMLInputElement;
    inputSelector.value = '';

    const array: any[] = arrayToAnimate.slice();
    array.push({data: input, state: ElementStates.Changing});
    setArrayToAnimate(array);
    setIsLoder(true);
    setAction("push");

    setInput("");
  };
  
  const onClkickPop = (e: any) => {
    if (!arrayToAnimate.length) {
      return;
    }

    const array: any[] = arrayToAnimate.slice();
    array[array.length - 1]['state'] = ElementStates.Changing;
    setArrayToAnimate(array);
    
    setIsLoder(true);
    setAction("pop");
  };

  const onClkickDrop = (e: any) => {
    if (!arrayToAnimate.length) {
      return;
    }
    setArrayToAnimate([]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (action === "push") {
          arrayToAnimate[arrayToAnimate.length - 1]['state'] = ElementStates.Default;
        } else if (action === "pop") {
          const array: any[] = arrayToAnimate.slice();
          array.pop();
          setArrayToAnimate(array);
        } 
        setIsLoder(false);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, arrayToAnimate]);

  return (
    <SolutionLayout title="Стек">
      <div
        className=""
        style={{ maxWidth: '70%', margin: 'auto', display: 'flex', justifyContent: 'center', gap: '5%' }}
      >
        <Input id={"input"} maxLength={4} isLimitText={true} onChange={onChangeInput}></Input>

        <div style={{ display: 'flex', gap: '5%' }}>
          <Button
            type="button"
            text={"Добавить"}
            onClick={onClkickPush}
            isLoader={isLoader && action === "push"}
            disabled={isLoader && action !== "push"}
          ></Button>
          <Button
            type="button"
            text={"Удалить"}
            onClick={onClkickPop}
            isLoader={isLoader && action === "pop"}
            disabled={isLoader && action !== "pop"}
          ></Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '5%' }}>
          <Button type="button" text={"Очистить"} onClick={onClkickDrop} disabled={isLoader}></Button>
        </div>
      </div>
      <div
          className=""
          style={{ maxWidth: '50%', paddingTop: '10%', margin: 'auto', display: 'flex', alignItems: 'end', justifyContent: 'center', gap: '2.5%' }}
      >
        {arrayToAnimate && arrayToAnimate.map((item, index) => {
          const head = index === arrayToAnimate.length - 1 ? "top" : "";
          return <Circle
            key={index} 
            index={index}
            letter={item['data']}
            state={item['state']}
            head={head}
          ></Circle>
        })}
      </div>
    </SolutionLayout>
  );
};
