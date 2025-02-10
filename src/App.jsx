import styles from "./App.module.css";
import { useState, useEffect, useRef } from "react";
import Api from "./api/Api";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import LoadingIconn from "./assets/loading.svg";

const App = () => {
    const [username, setUsername] = useState("");
    const [repos, setRepos] = useState([]);
    const [visibleRepos, setVisibleRepos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const observerRef = useRef(null);

    const { fetchData } = Api({
        username,
        setRepos,
        setError,
        setLoading
    });

    const handleSearch = (input) => {
        setUsername(input);
        setRepos([]);
        setVisibleRepos([]);
        setPage(1);
        setError(null);
    };

    useEffect(() => {
        if (username) {
            fetchData();  
        }
    }, [username, fetchData]);

    useEffect(() => {
        if (page === 1) return;

        const newRepos = repos.slice(0, page * 30);
        setVisibleRepos(newRepos);
    }, [page, repos]);

    useEffect(() => {
        if (!repos.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleRepos.length < repos.length) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [visibleRepos, repos]);

    return (
        <div className={styles.root}>
            <h1>Найдите свой репозиторий</h1>
            <SearchBar onSearch={handleSearch} />

            {error && <p className={styles.message}>{error} <br /> Не найдено. Такой человек точно существует?</p>}

            {loading ? (
                <img src={LoadingIconn} className={styles.loading} alt="loading" />
            ) : (
                <div className={styles.container}>
                    {visibleRepos.length > 0 ? (
                        visibleRepos.map((repo) => (
                            <Card key={repo.id} repo={repo} />
                        ))
                    ) : null}
                    <div ref={observerRef} className={styles.loader}></div>
                </div>
            )}
        </div>
    );
};

export default App;
