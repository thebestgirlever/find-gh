import styles from "./SearchBar.module.css";
import { useState } from "react";

function SearchBar({ onSearch }) {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = () => {
        onSearch(input);
    };

    return (
        <div className={styles.block}>
            <input
                className={styles.input}
                value={input}
                type="text"
                placeholder="Введите имя"
                onChange={handleChange}
            >
            </input>
            <button
                className={styles.button}
                onClick={handleSearch}>
                go
            </button>
        </div>
    );
}

export default SearchBar;