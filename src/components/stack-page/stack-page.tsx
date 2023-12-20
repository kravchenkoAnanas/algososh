import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../structers/stack";
import stackPageStyle from './stack-page.module.css'

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
    (document.getElementById('input') as HTMLInputElement).value = "";

    const newStack = new Stack<IStackItem>(stack.elements());
    newStack.push({ data: input, state: ElementStates.Changing });

    setStack(newStack);
    setIsLoader(true);
    setAction("push");
    setInput("");
  };
  
  const onClkickPop = () => {
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
      <div className={ stackPageStyle.layout_container }>
        <Input id={"input"} maxLength={4} isLimitText={true} onChange={onChangeInput}></Input>

        <div className={ stackPageStyle.btn_container }>
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
            disabled={isLoader && action !== "pop" || !stack.size()}
          ></Button>
        </div>
        <div className={ stackPageStyle.btn_container }>
          <Button
            type="button"
            text={"Очистить"}
            onClick={onClkickDrop}
            disabled={isLoader || !stack.size()}
          ></Button>
        </div>
      </div>
      <div className={ stackPageStyle.animation_container }>
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
