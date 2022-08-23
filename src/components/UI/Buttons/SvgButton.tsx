import { MouseEvent } from 'react';

import classes from './SvgButton.module.css';

interface SvgButtonProps {
  svg: JSX.Element;
  clickHandler?: (event: MouseEvent) => void;
  extraButtonClassNames?: string;
  extraSvgClassNames?: string;
}

const SvgButton = ({
  svg,
  extraButtonClassNames,
  extraSvgClassNames,
  clickHandler,
}: SvgButtonProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`${classes['svg-button']} ${extraButtonClassNames}`}
    >
      <span className={`${classes['svg-button__svg']} ${extraSvgClassNames}`}>
        {svg}
      </span>
    </button>
  );
};

export default SvgButton;
