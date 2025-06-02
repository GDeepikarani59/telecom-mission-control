import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DashBoardScreen.module.css";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    towers: 0,
    devices: 0,
    policies: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchWithAuth = (url) =>
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

    const fetchData = async () => {
      try {
        const [towerRes, deviceRes, policyRes, userRes] = await Promise.all([
          fetchWithAuth("http://localhost:5000/api/towers"),
          fetchWithAuth("http://localhost:5000/api/devices"),
          fetchWithAuth("http://localhost:5000/api/policies"),
          fetchWithAuth("http://localhost:5000/api/users"),
        ]);

        setSummary({
          towers: towerRes.data.length,
          devices: deviceRes.data.length,
          policies: policyRes.data.length,
          users: userRes.data.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.container} aria-labelledby="dashboard-title">
      <h2 id="dashboard-title" className={styles.title}>
        Dashboard Summary
      </h2>
      <div className={styles.cards} role="list">
        <article
          className={styles.card}
          role="listitem"
          tabIndex="0"
          aria-label="Total Towers"
        >
          <h3 className={styles.cardTitle}>Towers</h3>
          <p className={styles.cardValue}>{summary.towers}</p>
        </article>

        <article
          className={styles.card}
          role="listitem"
          tabIndex="0"
          aria-label="Total Devices"
        >
          <h3 className={styles.cardTitle}>Devices</h3>
          <p className={styles.cardValue}>{summary.devices}</p>
        </article>

        <article
          className={styles.card}
          role="listitem"
          tabIndex="0"
          aria-label="Total Policies"
        >
          <h3 className={styles.cardTitle}>Policies</h3>
          <p className={styles.cardValue}>{summary.policies}</p>
        </article>

        <article
          className={styles.card}
          role="listitem"
          tabIndex="0"
          aria-label="Total Users"
        >
          <h3 className={styles.cardTitle}>Users</h3>
          <p className={styles.cardValue}>{summary.users}</p>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
