import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Api from "./api/Api";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";

const App = () => {
    const [username, setUsername] = useState("");
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { fetchData } = Api({
        username,
        setRepos,
        setError,
        setLoading
    });

    const handleSearch = (input) => {
        setUsername(input);
        setRepos([]);
        setError(null);
    };

    useEffect(() => {
        if (username) {
            fetchData();
        }
    }, [username, fetchData]);

    return (
        <div className={styles.root}>
            <h1>Найдите свой репозиторий</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            <div className={styles.container}>
                {repos.slice(0, 10).map((repo) => (  // Ограничиваем до 10 карточек
                    <Card key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
};

export default App;
