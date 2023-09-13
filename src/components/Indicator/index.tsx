import style from "./style.module.css";

type IndicatorProps = {
  length: number;
  currentSelect: number;
};
export default function Indicator({ length, currentSelect }: IndicatorProps) {
  return (
    <div className={style.indicator}>
      {Array.from({ length: length }, (_, i) => i).map((_, i) => (
        <div
          key={i}
          className={`${style.indicatorItem} ${
            i === currentSelect ? style.active : null
          }`}
        ></div>
      ))}
    </div>
  );
}
