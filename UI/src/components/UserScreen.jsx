import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserScreen.module.css";

const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to fetch users"));
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", formData);
      const updated = await axios.get("http://localhost:5000/api/users");
      setUsers(updated.data);
      setFormData({ username: "", password: "", role: "user" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <section className={styles.container} aria-labelledby="user-title">
      <h2 id="user-title" className={styles.title}>
        Manage Users
      </h2>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        aria-describedby={error ? "user-error" : undefined}
      >
        {error && (
          <p
            id="user-error"
            className={styles.error}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="viewer">Viewer</option>
        </select>

        <button type="submit">Add User</button>
      </form>

      <table className={styles.userTable} role="table" aria-label="User List">
        <thead>
          <tr role="row">
            <th scope="col" role="columnheader">
              Username
            </th>
            <th scope="col" role="columnheader">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} role="row" tabIndex="0">
              <td role="cell">{u.username}</td>
              <td role="cell">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserScreen;
