import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "../../structers/queue";
import queuePageStyle from './queue-page.module.css'

interface IQueueItem {
  data: string | null;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const initialItem: IQueueItem = {
      data: null,
      state: ElementStates.Default,
  }
  const [isLoader, setIsLoder] = useState(false);
  const [action, setAction] = useState("");
  const [input, setInput] = useState("");
  const [queue, setQueue] = useState<Queue<IQueueItem>>(new Queue<IQueueItem>(
    Array<IQueueItem>(7).fill(initialItem)
  ));

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClkickPush = () => {
    let inputSelector = document.getElementById('input') as HTMLInputElement;
    inputSelector.value = '';

    const newQueue = new Queue<IQueueItem>(queue.elements(), queue.getHeadIdx(), queue.getTailIdx());
    newQueue.enqueue({ data: input, state: ElementStates.Changing });
    setQueue(newQueue);

    setIsLoder(true);
    setAction("push");
    setInput("");
  };
  
  const onClkickPop = () => {
    const newQueue = new Queue<IQueueItem>(queue.elements(), queue.getHeadIdx(), queue.getTailIdx());
    const idx = newQueue.getHeadIdx();
    if (idx) {
      newQueue.elements()[idx]['state'] = ElementStates.Changing;
    }
    setQueue(newQueue);

    setIsLoder(true);
    setAction("pop");
  };

  const onClkickDrop = () => {
    setQueue(new Queue<IQueueItem>(Array<IQueueItem>(7).fill(initialItem)));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        const newQueue = new Queue<IQueueItem>(queue.elements(), queue.getHeadIdx(), queue.getTailIdx());

        if (action === "push") {
          newQueue.elements()[newQueue.getTailIdx() ?? 0]['state'] = ElementStates.Default;
        } else if (action === "pop") {
          newQueue.elements()[newQueue.getHeadIdx() ?? 0]['data'] = null;
          newQueue.elements()[newQueue.getHeadIdx() ?? 0]['state'] = ElementStates.Default;
          newQueue.dequeue();
          setQueue(newQueue);
        } 
        setIsLoder(false);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, queue]);

  return (
    <SolutionLayout title="Очередь">
      <div className={ queuePageStyle.layout_container }>
        <Input
          id={"input"}
          maxLength={4}
          isLimitText={true}
          placeholder={"Введите значение"}
          onChange={onChangeInput}
          value={input}
        ></Input>

        <div className={ queuePageStyle.button }>
          <Button
            type="button"
            text={"Добавить"}
            onClick={onClkickPush}
            isLoader={isLoader && action === "push"}
            disabled={isLoader && action !== "push" || !input || queue.isFull()}
          ></Button>
          <Button
            type="button"
            text={"Удалить"}
            onClick={onClkickPop}
            isLoader={isLoader && action === "pop"}
            disabled={isLoader && action !== "pop" || queue.isEmpty()}
          ></Button>
        </div>
        <div className={ queuePageStyle.button }>
          <Button
            type="button"
            text={"Очистить"}
            onClick={onClkickDrop}
            disabled={isLoader || queue.isEmpty()}
          ></Button>
        </div>
      </div>
      <div className={ queuePageStyle.animation_container }>
        {queue.elements() && queue.elements().map((item, index) => {
          return <Circle
            key={index} 
            index={index}
            letter={item['data'] ?? ""}
            state={item['state']}
            head={!queue.isEmpty() && index === queue.getHeadIdx() ? "head" : ""}
            tail={!queue.isEmpty() && index === queue.getTailIdx() ? "tail" : ""}
          ></Circle>
        })}
      </div>
    </SolutionLayout>
  );
};
