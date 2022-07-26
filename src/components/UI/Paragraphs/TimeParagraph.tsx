import convertTime from '../../../helpers/convertTime';

interface TimeParagraphProps {
  time: number;
}

const TimeParagraph = ({ time }: TimeParagraphProps) => {
  return <p>{convertTime(time)}</p>;
};

export default TimeParagraph;
