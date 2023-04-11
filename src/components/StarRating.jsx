import { MdStarRate } from "react-icons/md";
import { useMemo, useState } from "react";

const StarRating = ({ rate, setRating }) => {
  const [hover, setHover] = useState(0);
  const setColor = (idx) => {
    if (hover >= idx) {
      return "#fca311";
    } else if (!hover && rate >= idx) {
      return "#fca311";
    }
    return "#e4e5e9";
  };

  if (setRating === undefined) {
    setRating = () => {};
  }

  const rating = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <MdStarRate
          key={idx}
          className='h-8 w-8 cursor-pointer'
          onClick={() => setRating(idx)}
          style={{ color: setColor(idx) }}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(0)}
        />
      ));
  }, [rate, hover]);

  return <div className='flex'>{rating}</div>;
};

export default StarRating;
