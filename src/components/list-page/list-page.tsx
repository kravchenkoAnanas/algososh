import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { v4 } from 'uuid';

export const ListPage: React.FC = () => {
  const initialArray = [0, 34, 8, 1];
  const [isLoader, setIsLoder] = useState(false);
  const [action, setAction] = useState<string | null>(''); // push / pop
  const [input, setInput] = useState('');
  const [inputIdx, setInputIdx] = useState('');
  const [direction, setDirection] = useState(''); // front / back
  const [i, setI] = useState(0);
  const [arrayToAnimate, setArrayToAnimate] = useState<any[]>(initialArray.map(item => {
    return {
      data: item,
      smallUpperData: null,
      smallLowerData: null,
      state: ElementStates.Default,
    }
  }));

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onChangeInputIdx = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIdx(e.target.value);
  };

  const onClkickPush = (type: string) => {
    if (!input || !Number(input) ||
        type === 'index' && !Number(inputIdx) ||
        Number(inputIdx) >= arrayToAnimate.length) {
      return;
    }

    let inputSelector = document.getElementById('inputValue') as HTMLInputElement;
    inputSelector.value = '';

    const array: any[] = arrayToAnimate.slice();
    const idx = type === "back" ? array.length - 1 : 0;
    setDirection(type);
    array[idx]['smallUpperData'] = input;
    setArrayToAnimate(array);
    setIsLoder(true);
    setAction("push");
    setInput("");
    setI(0);
  };
  
  const onClkickPop = (type: string) => {
    if (!arrayToAnimate.length) {
      return;
    }
    setDirection(type);
    if (type !== "index") {
      const array: any[] = arrayToAnimate.slice();
      const idx = type === "back" ? array.length - 1 : 0;
      array[idx]['smallLowerData'] = array[idx]['data'];
      array[idx]['data'] = null;
      setArrayToAnimate(array);
    } else {
      setI(0);
    }

    setIsLoder(true);
    setAction("pop");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (action === "push" && direction === "index") {
          const array: any[] = arrayToAnimate.slice();

          array[i]['state'] = ElementStates.Changing;
          array[i + 1]['smallUpperData'] = array[i]['smallUpperData'];
          array[i]['smallUpperData'] = null;
          
          if (i + 1 === Number(inputIdx)) {
            setAction("push2");
          }
          setI(i + 1);
          setArrayToAnimate(array);
        } else if (action === "push2" && direction === "index") {
          setDirection(''); // that is for going to the (action === "push2") part 
          const idx = Number(inputIdx);
          let array: any[] = arrayToAnimate.slice();
          const value = array[i]['smallUpperData'];
          array = array.map(item => {return {...item, state: ElementStates.Default, smallUpperData: null}});
          const newItem = {data: value, state: ElementStates.Modified, smallUpperData: null, smallLowerData: null};
          setArrayToAnimate([...array.slice(0, idx), newItem, ...array.slice(idx, array.length)]);
        } else if (action === "push") {
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
          setArrayToAnimate(array.map(item => {return {...item, state: ElementStates.Default}}));
          setAction(null);
          setI(0);
        } else if (action === "pop" && direction === "index") {
          const array: any[] = arrayToAnimate.slice();
          array[i]['state'] = ElementStates.Changing;
          
          if (i === Number(inputIdx)) {
            setAction("pop2"); 
          } else {
            setI(i + 1);
          }
          setArrayToAnimate(array);
        } else if (action === "pop2" && direction === "index") {
          const array: any[] = arrayToAnimate.slice();
          array[i]['smallLowerData'] = array[i]['data'];
          array[i]['data'] = null;
          setArrayToAnimate(array);
          setAction("pop3");
        } else if (action === "pop3" && direction === "index") {
          const idx = Number(inputIdx);
          let array: any[] = arrayToAnimate.slice();
          array = array.map(item => {return {...item, state: ElementStates.Default}});
          setArrayToAnimate([...array.slice(0, idx), ...array.slice(idx + 1, array.length)]);
          setAction(null);
          setI(0);
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
  }, [isLoader, i, arrayToAnimate]);

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
            disabled={isLoader && action !== "push" && direction !== "front" || !input}
            ></Button>
          <Button
            type="button"
            text={"Добавить в tail"}
            onClick={() => onClkickPush("back") }
            isLoader={isLoader && action === "push" && direction === "back"}
            disabled={isLoader && action !== "push" && direction !== "back" || !input}
          ></Button>
          <Button
            type="button"
            text={"Удалить из head"}
            onClick={() => onClkickPop("front") }
            isLoader={isLoader && action === "pop" && direction === "front"}
            disabled={isLoader && action !== "pop" && direction !== "front" || !arrayToAnimate.length}
          ></Button>
          <Button
            type="button"
            text={"Удалить из tail"}
            onClick={() => onClkickPop("back") }
            isLoader={isLoader && action === "pop" && direction === "back"}
            disabled={isLoader && action !== "pop" && direction !== "back" || !arrayToAnimate.length}
          ></Button>
        </div>
        <div
          style={{ minWidth: '60%', margin: 'auto', display: 'flex', justifyContent: 'space-between'}}
        >
          <div>
            <Input
              id={"inputIdx"}
              placeholder={"Введите индекс"}
              onChange={onChangeInputIdx}
              style={{ minWidth: '20%'}}
            ></Input>
          </div>

          <Button
            type="button"
            text={"Добавить по индексу"}
            onClick={() => onClkickPush("index")}
            isLoader={isLoader && action === "push" && direction === "index"}
            disabled={isLoader && action !== "push" && direction === "index" || !inputIdx || !input}
            style={{ minWidth: '35%'}}
          ></Button>
          <Button
            type="button"
            text={"Удалить по индексу"}
            onClick={() => onClkickPop("index")}
            isLoader={isLoader && action === "pop" && direction === "index"}
            disabled={isLoader && action !== "pop" && direction === "index" || !inputIdx}
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
              key={v4()} 
              index={index}
              letter={item['data']}
              state={item['state']}
              head={item['smallUpperData'] !== null
                ?  <Circle key={v4()} letter={item['smallUpperData']} state={ElementStates.Changing} isSmall={true}></Circle> 
                : index === 0 ? 'head' : null
              }
              tail={item['smallLowerData'] !== null
                ? <Circle key={v4()} letter={item['smallLowerData']} state={ElementStates.Changing} isSmall={true}></Circle>
                : index === arrayToAnimate.length - 1 ? 'tail' : null
              }
            ></Circle>
            {index !== arrayToAnimate.length - 1 &&
              <ArrowIcon key={v4()}></ArrowIcon>
            }
          </>
        })}
      </div>
    </SolutionLayout>
  );
};
