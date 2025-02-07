import { useCallback } from "react";
import { Octokit } from "@octokit/core";

const Api = ({ username, setRepos, setError, setLoading }) => {
    const fetchData = useCallback(async () => {
        setLoading(true);
        const octokit = new Octokit();

        try {
            const { data } = await octokit.request('GET /users/{username}/repos', {
                username,
                per_page: 30,  
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                }
            });

            setRepos(data);  
            setLoading(false);
        } catch (err) {
            setError("Error fetching repositories");
            setLoading(false);
            console.error(err);
        }
    }, [username, setRepos, setError, setLoading]);

    return { fetchData };
};

export default Api;

