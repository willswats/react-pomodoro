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
      if (
        (timeRemaining.seconds === 0 && timeRemaining.minutes === 0) ||
        isNaN(timeRemaining.seconds) ||
        isNaN(timeRemaining.minutes)
      ) {
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

  const minutesBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(event.target.value))) {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          minutes: 0,
        };
      });
    }
  };

  const secondsBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(event.target.value))) {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          seconds: 0,
        };
      });
    }
  };

  const minutesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(event.target.value);
    if (timerRunning) {
      setTimerRunning(false);
    }
    setTimeRemaining((prevState) => {
      return {
        ...prevState,
        minutes: inputVal,
      };
    });
  };

  const secondsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(event.target.value);
    if (timerRunning) {
      setTimerRunning(false);
    }
    setTimeRemaining((prevState) => {
      return {
        ...prevState,
        seconds: inputVal,
      };
    });
  };

  const startStopClickHandler = () => {
    if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
      return;
    } else if (isNaN(timeRemaining.minutes)) {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          minutes: 0,
        };
      });
    } else if (isNaN(timeRemaining.seconds)) {
      setTimeRemaining((prevState) => {
        return {
          ...prevState,
          seconds: 0,
        };
      });
    } else {
      setTimerRunning(!timerRunning);
    }
  };

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__inputs']}>
        <InputMinutes
          minutes={timeRemaining.minutes}
          blurHandler={minutesBlurHandler}
          changeHandler={minutesChangeHandler}
        />
        <span className={classes['timer__colon']}>:</span>
        <InputSeconds
          seconds={timeRemaining.seconds}
          blurHandler={secondsBlurHandler}
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
