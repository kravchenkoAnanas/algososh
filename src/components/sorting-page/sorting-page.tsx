import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils";

const swap = (arr: any[], i: number, j: number) => {
  const temp = arr[i]['data'];
  arr[i]['data'] = arr[j]['data'];
  arr[j]['data'] = temp;
};

export const SortingPage: React.FC = () => {
  const [isLoader, setIsLoder] = useState<boolean>(false);
  const [arrayToAnimate, setArrayToAnimate] = useState<any[]>(randomArr().map((item) => {
    return {
      data: item,
      state: ElementStates.Default
    };
  }));

  const [sortType, setSortType] = useState<string>(''); // asc / desc
  const [sortAlgoType, setSortAlgoType] = useState<string>('selection'); // selection / bubble
  const [sortIndex, setSortIndex] = useState<number>(0);
  const [i, setI] = useState<number>(0);
  const [j, setJ] = useState<number>(0);

  const cmp = (first: number, second: number) => {
    if (sortType === "asc") {
      return first < second;
    } else if (sortType === "desc") {
      return first > second;
    } else {
      console.log("cmp error sortType", sortType);
    }
  };

  const onClick = (type: any) => {
    if (["selection", "bubble"].includes(type)) {
      setSortAlgoType(type);
    } else if (["asc", "desc"].includes(type)) {
      if (sortAlgoType === 'selection') {
        setI(0);
        setJ(1);
      } else if (sortAlgoType === "bubble") {
        setI(0);
        setJ(0);
      }
      setArrayToAnimate(
        arrayToAnimate.map((item) => {
          return {
            data: item['data'],
            state: ElementStates.Default
          };
        })
      );
      setSortType(type);
      setIsLoder(true);
    } else if (type === "newArray") {
      setIsLoder(false);
      setArrayToAnimate(randomArr());
    } else {
      console.log("onClick error type", type)
    }
  };

  const submit = (e: any) => {
    e.preventDefault();

    let sortAlgo: any = null;
    const radios: any = document.getElementsByName("sortType");
    for(let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        sortAlgo = radios[i].value;
      }
    }
    setSortAlgoType(sortAlgo);
    console.log("type ", sortType, " algoType ", sortAlgoType);
  };

  const bubbleSortAnimationStep = (array: any[]) => {
    console.log("Bubble i ", i, " j ", j);
  
    if (j > 0) {
      array[j - 1]['state'] = ElementStates.Default;
      array[j]['state'] = ElementStates.Default;
    }

    if (cmp(array[j + 1]['data'], array[j]['data'])) {
      swap(array, j, j + 1);
    }
    array[j]['state'] = ElementStates.Changing;
    array[j + 1]['state'] = ElementStates.Changing;
  
    if (i + 1 === array.length) {
      array[j]['state'] = ElementStates.Modified;
      array[j + 1]['state'] = ElementStates.Modified;
      setIsLoder(false);
      setI(0);
      setJ(0);
    }
    else if (j + 1 === array.length - i - 1) {
      array[j]['state'] = ElementStates.Default;
      array[j + 1]['state'] = ElementStates.Modified;
      setJ(0);
      setI(i + 1);
    } else {
      setJ(j + 1);
    }
  };

  const selectionSortAnimationStep = (array: any[]) => {
    console.log("Selection i ", i, " j ", j, " sortIndex ", sortIndex);

    array[j - 1]['state'] = ElementStates.Default;
    array[i]['state'] = ElementStates.Changing;

    if (j < array.length) {
      array[j]['state'] = ElementStates.Changing;
      
      if (j === i + 1 || cmp(array[j]['data'], array[sortIndex]['data'])) {
        setSortIndex(j);
      }
    }

    if (i + 1 === array.length) {
      array[i]['state'] = ElementStates.Modified;

      setIsLoder(false);
      setI(0);
      setJ(1);
    }
    else if (j > array.length - 1) {
      array[i]['state'] = ElementStates.Modified;
      if (cmp(array[sortIndex]['data'], array[i]['data'])) {
        swap(array, sortIndex, i);
      }

      setSortIndex(i + 1);
      setJ(i + 2);
      setI(i + 1);
    } else {
      setJ(j + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoader) {
        if (true) {
          const array: any[] = arrayToAnimate.slice();
          if (sortAlgoType === "bubble") {
            bubbleSortAnimationStep(array);
          } else if (sortAlgoType === "selection") {
            selectionSortAnimationStep(array);
          }
          setArrayToAnimate(array);
        }
      } else {
        setIsLoder(false);
        if (sortAlgoType == "selection") {
          setI(0);
          setJ(1);
        } else if (sortAlgoType == "bubble") {
          setI(0);
          setJ(0);
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [isLoader, arrayToAnimate, i, j]);
  
  return (
    <SolutionLayout title="Сортировка массива">
      <form action="" onSubmit={ submit }>
        <div
          className=""
          style={{ maxWidth: '70%', margin: 'auto', display: 'flex', justifyContent: 'center', gap: '5%' }}
        >
          <div
            className=""
            style={{ alignItems: 'center', display: 'flex', gap: '10%' }}
          >
            <RadioInput
              label={"Выбор"}
              name={"sortType"}
              value={"selection"}
              checked={ sortAlgoType === "selection" }
              onChange={() => { onClick("selection") }}
            ></RadioInput>
            <RadioInput
              label={"Пузырёк"}
              name={"sortType"}
              value={"bubble"}
              checked={ sortAlgoType === "bubble" }
              onChange={() => { onClick("bubble") }}
            ></RadioInput>
          </div>
          <div
            className=""
            style={{ minWidth: '40%', display: 'flex', gap: '5%' }}
          >
            <div onClick={() => { onClick("asc") }}>
              <Button
                  id={"asc"}
                  type="submit"
                  text={"По возрастанию"}
                  sorting={Direction.Ascending}
                  name={"asc"}
                  value={"asc"}
                  >
                </Button>
            </div>
            <div onClick={() => { onClick("desc") }}>
              <Button
                id={"desc"}
                type="submit"
                text={"По убыванию"}
                sorting={Direction.Descending}
                name={"desc"}
                value={"desc"}
                >
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            text={"Новый массив"}
            value={"newArray"}
            onClick={ () => { onClick("newArray") } }
            >
          </Button>
        </div>
      </form>
      <div
          className=""
          style={{ minHeight: '300px', maxWidth: '50%', paddingTop: '5%', margin: 'auto', display: 'flex', alignItems: 'end', justifyContent: 'center', gap: '2.5%' }}
      >
        {arrayToAnimate && arrayToAnimate.map((item, index) => {
            return <Column
              key={index} 
              index={item['data']}
              state={item['state']}
            ></Column>
        })}
      </div>
    </SolutionLayout>
  );
};
