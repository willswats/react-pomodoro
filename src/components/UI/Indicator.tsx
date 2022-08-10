import classes from './Indicator.module.css';

interface IndicatorProps {
  completed: number;
  total: number;
}

const Indicator = ({ completed, total }: IndicatorProps) => {
  const totalIdArray = [];
  for (let i = 0; i < total; i++) {
    totalIdArray.push(`el${i}`);
  }

  return (
    <div className={classes['indicator']}>
      {totalIdArray.map((id, index) => {
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
