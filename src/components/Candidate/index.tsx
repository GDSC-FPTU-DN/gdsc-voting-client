import style from "./style.module.css";

type CandidateCardProps = {
  name: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  onClick?: () => void;
};
export default function CandidateCard({
  name,
  description,
  imageUrl,
  isActive,
  onClick,
}: CandidateCardProps) {
  return (
    <div
      className={`${style.card} ${isActive ? style.active : null}`}
      onClick={onClick}
    >
      {imageUrl ? (
        <div className={style.cardImage}>
          <img src={imageUrl} alt="candidate" />
        </div>
      ) : null}
      <div className={style.cardContent}>
        <div className={style.cardName}>{name}</div>
        <div className={style.cardDescription}>{description}</div>
      </div>
    </div>
  );
}
