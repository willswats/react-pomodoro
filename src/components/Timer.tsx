import { useState, useEffect, ChangeEvent } from 'react';

import InputSeconds from './InputSeconds';
import InputMinutes from './InputMinutes';
import ButtonStartStop from './ButtonStartStop';

import classes from './Timer.module.css';

const Timer = () => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 25,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeRemaining.seconds === 0 && timeRemaining.minutes === 0) {
        setTimerRunning(false);
        return;
      }
      if (timeRemaining.seconds === 0) {
        setTimeRemaining((prevState) => {
          return {
            ...prevState,
            minutes: prevState.minutes - 1,
            seconds: 60,
          };
        });
      } else {
        setTimeRemaining((prevState) => {
          return {
            ...prevState,
            seconds: prevState.seconds - 1,
          };
        });
      }
    }, 1000);

    if (!timerRunning) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  });

  const minutesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(event.target.value);
    if (!isNaN(inputVal)) {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          minutes: inputVal,
        };
      });
    } else {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          minutes: 0,
        };
      });
    }
  };

  const secondsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(event.target.value);
    if (!isNaN(inputVal)) {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          seconds: inputVal,
        };
      });
    } else {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          seconds: 0,
        };
      });
    }
  };

  const startStopClickHandler = () => {
    if (timeRemaining.seconds === 0 && timeRemaining.minutes === 0) {
      return;
    }
    setTimerRunning(!timerRunning);
  };

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__inputs']}>
        <InputMinutes
          minutes={timeRemaining.minutes}
          changeHandler={minutesChangeHandler}
        />
        <span className={classes['timer__colon']}>:</span>
        <InputSeconds
          seconds={timeRemaining.seconds}
          changeHandler={secondsChangeHandler}
        />
      </div>
      <ButtonStartStop
        timerRunning={timerRunning}
        clickHandler={startStopClickHandler}
      />
    </div>
  );
};

export default Timer;
