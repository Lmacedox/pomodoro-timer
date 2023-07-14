import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";

import { CountDownContainer, Separator } from "./style";
import { CyclesContext } from "../../../../context/CyclesContext";

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let inverval: number;

    if (activeCycle) {
      inverval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(inverval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(inverval);
    };
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycleId) {
      document.title = `${minutes}: ${seconds} - Ignite Timer`;
    }
  }, [minutes, seconds, activeCycleId]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
