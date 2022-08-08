import classes from './Indicator.module.css';

interface IndicatorProps {
  completed: number;
  remaining: number;
}

const Indicator = ({ completed, remaining }: IndicatorProps) => {
  const remainingIdArray = [];
  for (let i = 0; i < remaining; i++) {
    remainingIdArray.push(`el${i}`);
  }

  return (
    <div className={classes['indicator']}>
      {remainingIdArray.map((id, index) => {
        return (
          <span
            key={id}
            className={`${classes['indicator__span']} ${
              index + 1 === completed || index < completed
                ? classes['indicator__span--completed']
                : ''
            }`}
          />
        );
      })}
    </div>
  );
};

export default Indicator;
