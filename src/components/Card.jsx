import styles from "./Card.module.css";
import Star from "../assets/star.svg";

function Card({repo}) {
    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{repo.name}</h3>
            <p className={styles.description}>{repo.description ? repo.description : "Описание отсутсвует"}</p>
            <a className={styles.link} href={repo.html_url} target="_blank" rel="noopener noreferrer">Репозиторий тут</a>
            <div className={styles.achievement}>
                <img className={styles.star} src={Star} alt="Star" />
                <p>: {repo.stargazers_count}</p>
            </div>
            <p className={styles.data}>Последние обновления: {new Date(repo.updated_at).toLocaleDateString()}</p>
        </div>
    );
}

export default Card;