import React, { useState } from "react";
import styles from "../css/blog.module.css";

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={styles["search-filter"]}>
      <input
        className={styles["search-input"]}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles["search-button"]} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
