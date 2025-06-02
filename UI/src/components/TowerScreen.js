import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TowerScreen.module.css";

const TowerScreen = () => {
  const [towers, setTowers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/towers")
      .then((res) => setTowers(res.data))
      .catch((err) => console.error("Error fetching towers", err));
  }, []);

  const filtered = towers.filter((tower) =>
    tower.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={styles.container} aria-labelledby="tower-heading">
      <h2 id="tower-heading" className={styles.title}>
        Tower Directory
      </h2>

      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by location"
        aria-label="Search towers by location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className={styles.cardList} role="list" aria-label="Tower list">
        {filtered.map((tower) => (
          <li
            key={tower._id}
            className={styles.card}
            role="listitem"
            tabIndex="0"
          >
            <h3>{tower.location}</h3>
            <p>
              <strong>Carriers:</strong> {tower.supportedCarriers.join(", ")}
            </p>
            <p>
              <strong>Devices:</strong> {tower.supportedDevices.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TowerScreen;
