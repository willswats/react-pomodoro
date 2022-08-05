import classes from './SvgButton.module.css';

interface SvgButtonProps {
  svg: JSX.Element;
  extraClassNames?: string;
  clickHandler?: () => void;
}

const SvgButton = ({ svg, extraClassNames, clickHandler }: SvgButtonProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`${classes['svg-button']} ${extraClassNames}`}
    >
      <span className={classes['svg-button__svg']}>{svg}</span>
    </button>
  );
};

export default SvgButton;
