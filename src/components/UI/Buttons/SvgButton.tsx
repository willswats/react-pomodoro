import classes from './SvgButton.module.css';

interface SvgButtonProps {
  svg: JSX.Element;
  extraSvgClassNames?: string;
  clickHandler?: () => void;
}

const SvgButton = ({ svg, clickHandler }: SvgButtonProps) => {
  return (
    <button onClick={clickHandler} className={classes['svg-button']}>
      <span className={classes['svg-button__svg']}>{svg}</span>
    </button>
  );
};

export default SvgButton;
