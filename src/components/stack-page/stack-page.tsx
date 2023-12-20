import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../structers/stack";

interface IStackItem {
  data: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [action, setAction] = useState("");
  const [input, setInput] = useState("");
  const [stack, setStack] = useState<Stack<IStackItem>>(new Stack<IStackItem>());

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClkickPush = () => {
    if (!input || !Number(input)) {
      return;
    }

    let inputSelector = document.getElementById('input') as HTMLInputElement;
    inputSelector.value = '';

    const newStack = new Stack<IStackItem>(stack.elements());
    newStack.push({ data: input, state: ElementStates.Changing });

    setStack(newStack);
    setIsLoader(true);
    setAction("push");

    setInput("");
  };
  
  const onClkickPop = () => {
    if (stack.size() === 0) {
      return;
    }

    const newStack = new Stack<IStackItem>(stack.elements());
    newStack.elements()[newStack.size() - 1].state = ElementStates.Changing;
    setStack(newStack);
    setIsLoader(true);
    setAction("pop");
  };

  const onClkickDrop = () => {
    if (stack.size() === 0) {
      return;
    }
    setStack(new Stack<IStackItem>());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (action === "push") {
          const newStack = new Stack<IStackItem>(stack.elements());
          newStack.elements()[stack.size() - 1].state = ElementStates.Default;
          setStack(new Stack<IStackItem>(newStack.elements()));
        } else if (action === "pop") {
          const newStack = new Stack<IStackItem>(stack.elements());
          newStack.pop();
          setStack(newStack);
        }
        setIsLoader(false);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, stack]);

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
        {stack.store && stack.store.map((item, index) => {
          const head = index === stack.size() - 1 ? "top" : "";
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
