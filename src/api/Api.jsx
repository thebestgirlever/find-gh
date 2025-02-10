import { useCallback } from "react";
import { Octokit } from "@octokit/core";

const Api = ({ username, setRepos, setError, setLoading }) => {
    const fetchData = useCallback(async () => {
        setLoading(true);
        const octokit = new Octokit();

        try {
            let allRepos = [];
            let page = 1;
            let hasMore = true;

            while (hasMore) {
                const { data } = await octokit.request('GET /users/{username}/repos', {
                    username,
                    per_page: 30, 
                    page,
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28',
                    }
                });

                allRepos = [...allRepos, ...data];

                if (data.length < 30) { 
                    hasMore = false; 
                } else {
                    page++; 
                }
            }

            setRepos(allRepos);
            setLoading(false);
        } catch (err) {
            setError("Ошибка при получении репозиториев");
            setLoading(false);
            console.error(err);
        }
    }, [username, setRepos, setError, setLoading]);

    return { fetchData };
};

export default Api;
