import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Api from "./api/Api";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import LoadingIconn from "./assets/loading.svg";

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

            {loading ? (
                <img src={LoadingIconn} className={styles.loading} alt="loading" />
            ) : (
                <div className={styles.container}>
                    {repos.length > 0 ? (
                        repos.slice(0, 30).map((repo) => (
                            <Card key={repo.id} repo={repo} />
                        ))
                    ) : (
                        <p>Не найдено, такой человек точно существует?</p>
                    )}
                </div>
            )}
        </div>

    );
};

export default App;
