import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

type HeaderCounterProps = {
  totalQuantity: number;
  to: string;
  svgIcon: React.ReactNode;
  title:string
};
function HeaderCounter({
  totalQuantity,
  to,
  svgIcon,
  title
}: HeaderCounterProps) {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [totalQuantity]);
  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity === 0 ? (
          ""
        ) : (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}{" "}
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default HeaderCounter;
