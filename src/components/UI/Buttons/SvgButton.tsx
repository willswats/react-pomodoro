import classes from './SvgButton.module.css';

interface SvgButtonProps {
  svg: JSX.Element;
  extraButtonClassNames?: string;
  extraSvgClassNames?: string;
  clickHandler?: () => void;
}

const SvgButton = ({
  svg,
  extraButtonClassNames,
  clickHandler,
}: SvgButtonProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`${classes['svg-button']} ${extraButtonClassNames}`}
    >
      <span className={classes['svg-button__svg']}>{svg}</span>
    </button>
  );
};

export default SvgButton;
