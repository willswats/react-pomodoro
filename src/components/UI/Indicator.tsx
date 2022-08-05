import classes from './Indicator.module.css';

const Indicator = () => {
  return (
    <div className={classes['indicator']}>
      <span className={classes['indicator__span']} />
      <span className={classes['indicator__span']} />
      <span className={classes['indicator__span']} />
    </div>
  );
};

export default Indicator;
