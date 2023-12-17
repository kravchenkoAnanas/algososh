import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { stat } from "fs";


export const ListPage: React.FC = () => {
  const initialArray = [0, 34, 8, 1];
  const [isLoader, setIsLoder] = useState(false);
  const [action, setAction] = useState<string | null>(''); // push / pop
  const [input, setInput] = useState('');
  const [direction, setDirection] = useState(''); // front / back
  const [arrayToAnimate, setArrayToAnimate] = useState<any[]>(initialArray.map(item => {
    return {
      data: item,
      smallUpperData: null,
      smallLowerData: null,
      state: ElementStates.Default,
    }
  }));
  const [headIdx, setHeadIdx] = useState<number | null>(0);
  const [tailIdx, setTailIdx] = useState<number | null>(initialArray.length - 1);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClkickPush = (type: string) => {
    if (!input || !Number(input)) {
      return;
    }

    let inputSelector = document.getElementById('inputValue') as HTMLInputElement;
    inputSelector.value = '';

    const array: any[] = arrayToAnimate.slice();
    const idx = type === "front" ? 0 : array.length - 1;
    setDirection(type);
    array[idx]['smallUpperData'] = input;
    setArrayToAnimate(array);
    setIsLoder(true);
    setAction("push");
    setInput("");
  };
  
  const onClkickPop = (type: string) => {
    if (!arrayToAnimate.length) {
      return;
    }

    const array: any[] = arrayToAnimate.slice();
    const idx = type === "front" ? 0 : array.length - 1;
    setDirection(type);
    array[idx]['smallLowerData'] = array[idx]['data'];
    array[idx]['data'] = null;
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
          const idx = direction === 'front' ? 0 : arrayToAnimate.length - 1;
          const value = arrayToAnimate[idx]['smallUpperData'];
          const newItem = {data: value, state: ElementStates.Modified, smallUpperData: null, smallLowerData: null};
          const array: any[] = arrayToAnimate.slice();
          array[idx]['smallUpperData'] = null;
          setAction("push2");

          if (direction === 'front') {
            setArrayToAnimate([newItem, ...array]);
          } else {
            setArrayToAnimate([...array, newItem]);
          }
        } else if (action === "push2") {
          const array: any[] = arrayToAnimate.slice();
          array[direction == 'front' ? 0 : arrayToAnimate.length - 1]['state'] = ElementStates.Default;
          setArrayToAnimate(array);
          setAction(null);
        } else if (action === "pop") {
          setAction(null);
          if (direction === 'front') {
            setArrayToAnimate(arrayToAnimate.slice(1));
          } else {
            setArrayToAnimate(arrayToAnimate.slice(0, arrayToAnimate.length - 1));
          }
        }
        if (action === null) {
          setIsLoder(false);
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, arrayToAnimate]);

  return (
    <SolutionLayout title="Связный список">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30%' }}>
        <div
          style={{ minWidth: '60%', margin: 'auto', display: 'flex', justifyContent: 'space-between', gap: '1%' }}
        >
          <div>
            <Input
              id={"inputValue"}
              maxLength={4}
              isLimitText={true}
              placeholder={"Введите значение"}
              onChange={onChangeInput}
            ></Input>
          </div>
          <Button
            type="button"
            text={"Добавить в head"}
            onClick={() => onClkickPush("front") }
            isLoader={isLoader && action === "push" && direction === "front"}
            disabled={isLoader && action !== "push" && direction === "front" || !input}
            ></Button>
          <Button
            type="button"
            text={"Добавить в tail"}
            onClick={() => onClkickPush("back") }
            isLoader={isLoader && action === "push" && direction === "back"}
            disabled={isLoader && action !== "push" && direction === "back" || !input}
          ></Button>
          <Button
            type="button"
            text={"Удалить из head"}
            onClick={() => onClkickPop("front") }
            isLoader={isLoader && action === "pop" && direction === "front"}
            disabled={isLoader && action !== "pop" && direction === "front" || !arrayToAnimate.length}
          ></Button>
          <Button
            type="button"
            text={"Удалить из tail"}
            onClick={() => onClkickPop("back") }
            isLoader={isLoader && action === "pop" && direction === "back"}
            disabled={isLoader && action !== "pop" && direction === "back" || !arrayToAnimate.length}
          ></Button>
        </div>
        <div
          style={{ minWidth: '60%', margin: 'auto', display: 'flex', justifyContent: 'space-between'}}
        >
          <div>
            <Input
              id={"inputIdx"}
              placeholder={"Введите индекс"}
              onChange={onChangeInput}
              style={{ minWidth: '20%'}}
            ></Input>
          </div>

          <Button
            type="button"
            text={"Добавить в head"}
            // onClick={onClkickPush}
            // isLoader={isLoader && action === "push"}
            // disabled={isLoader && action !== "push" || !input}
            disabled={true}
            style={{ minWidth: '35%'}}
          ></Button>
          <Button
            type="button"
            text={"Удалить из head"}
            // onClick={onClkickPop}
            // isLoader={isLoader && action === "pop"}
            // disabled={isLoader && action !== "pop" || headIdx === null}
            disabled={true}
            style={{ minWidth: '35%'}}
          ></Button>
        </div>
      </div>
      <div
          style={{ height: '300px', maxWidth: '100%', paddingTop: '2%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5%' }}
      >
        {arrayToAnimate && arrayToAnimate.map((item, index) => {
          return <>
            <Circle
              key={index} 
              index={index}
              letter={item['data']}
              state={item['state']}
              head={item['smallUpperData'] !== null
                ?  <Circle key={index} letter={item['smallUpperData']} state={ElementStates.Changing} isSmall={true}></Circle> 
                : index === 0 ? 'head' : null
              }
              tail={item['smallLowerData'] !== null
                ? <Circle key={index+1} letter={item['smallLowerData']} state={ElementStates.Changing} isSmall={true}></Circle>
                : index === arrayToAnimate.length - 1 ? 'tail' : null
              }
            ></Circle>
            {index !== arrayToAnimate.length - 1 &&
              <ArrowIcon></ArrowIcon>
            }
          </>
        })}
      </div>
    </SolutionLayout>
  );
};
