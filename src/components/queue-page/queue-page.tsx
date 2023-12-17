import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";


export const QueuePage: React.FC = () => {
  const [isLoader, setIsLoder] = useState(false);
  const [action, setAction] = useState(""); // push / pop
  const [input, setInput] = useState('');
  const [arrayToAnimate, setArrayToAnimate] = useState<any[]>(Array(7).fill({
      data: null,
      state: ElementStates.Default,
  }));
  const [headIdx, setHeadIdx] = useState<number | null>(null);
  const [tailIdx, setTailIdx] = useState<number | null>(null);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClkickPush = (e: any) => {
    if (!input || !Number(input) || tailIdx === arrayToAnimate.length - 1) {
      return;
    }

    let inputSelector = document.getElementById('input') as HTMLInputElement;
    inputSelector.value = '';

    let newTailIdx = null;

    if (tailIdx === null) {
      newTailIdx = 0;
      setHeadIdx(0);
    } else if (tailIdx !== arrayToAnimate.length - 1) {
      newTailIdx = tailIdx + 1
    }

    const array: any[] = arrayToAnimate.slice();
    array[newTailIdx ?? 0] = {data: input, state: ElementStates.Changing};
    setTailIdx(newTailIdx);
    setArrayToAnimate(array);
    setIsLoder(true);
    setAction("push");
    setInput("");
  };
  
  const onClkickPop = (e: any) => {
    if (headIdx === null) {
      return;
    }

    const array: any[] = arrayToAnimate.slice();
    array[headIdx ?? 0]['state'] = ElementStates.Changing;
    setArrayToAnimate(array);

    setIsLoder(true);
    setAction("pop");
  };

  const onClkickDrop = (e: any) => {
    setArrayToAnimate(Array(7).fill({
      data: null,
      state: ElementStates.Default,
    }));
    setHeadIdx(null);
    setTailIdx(null); 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (action === "push") {
          arrayToAnimate[tailIdx ?? 0]['state'] = ElementStates.Default;
        } else if (action === "pop") {
          const array: any[] = arrayToAnimate.slice();
          array[headIdx ?? 0]['data'] = null;
          array[headIdx ?? 0]['state'] = ElementStates.Default;

          let newHeadIdx = null;
          if (headIdx === null) {
            newHeadIdx = 0;
            setTailIdx(0);
          } else if (headIdx !== arrayToAnimate.length - 1) {
            if (headIdx === tailIdx) {
              setTailIdx(null);
              newHeadIdx = headIdx
            } else {
              newHeadIdx = headIdx + 1;
            }
          }
          
          setArrayToAnimate(array);
          setHeadIdx(newHeadIdx);
        } 
        setIsLoder(false);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, arrayToAnimate]);

  return (
    <SolutionLayout title="Очередь">
      <div
        className=""
        style={{ maxWidth: '70%', margin: 'auto', display: 'flex', justifyContent: 'center', gap: '5%' }}
      >
        <Input
          id={"input"}
          maxLength={4}
          isLimitText={true}
          placeholder={"Введите значение"}
          onChange={onChangeInput}
        ></Input>

        <div style={{ display: 'flex', gap: '5%' }}>
          <Button
            type="button"
            text={"Добавить"}
            onClick={onClkickPush}
            isLoader={isLoader && action === "push"}
            disabled={isLoader && action !== "push" || !input}
          ></Button>
          <Button
            type="button"
            text={"Удалить"}
            onClick={onClkickPop}
            isLoader={isLoader && action === "pop"}
            disabled={isLoader && action !== "pop" || headIdx === null}
          ></Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '5%' }}>
          <Button
            type="button"
            text={"Очистить"}
            onClick={onClkickDrop}
            disabled={isLoader || headIdx === null}
          ></Button>
        </div>
      </div>
      <div
          className=""
          style={{ maxWidth: '50%', paddingTop: '10%', margin: 'auto', display: 'flex', alignItems: 'end', justifyContent: 'center', gap: '2.5%' }}
      >
        {arrayToAnimate && arrayToAnimate.map((item, index) => {
          return <Circle
            key={index} 
            index={index}
            letter={item['data']}
            state={item['state']}
            head={index === headIdx ? "head" : ""}
            tail={index === tailIdx ? "tail" : ""}
          ></Circle>
        })}
      </div>
    </SolutionLayout>
  );
};
