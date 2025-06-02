import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DeviceScreen.module.css";

const DeviceScreen = () => {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [editDevice, setEditDevice] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/devices", {});
      setDevices(res.data);
    } catch (err) {
      console.error("Error fetching devices", err);
    }
  };

  const filtered = devices.filter(
    (device) =>
      device.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      device.os.toLowerCase().includes(search.toLowerCase()) ||
      device.carrier?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (device) => {
    setEditDevice({ ...device });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/devices/${editDevice._id}`,
        editDevice
      );
      setEditDevice(null);
      fetchDevices();
    } catch (err) {
      console.error("Failed to update device", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/devices/${confirmDeleteId}`
      );
      setConfirmDeleteId(null);
      fetchDevices();
    } catch (err) {
      console.error("Failed to delete device", err);
    }
  };

  return (
    <section className={styles.container} aria-labelledby="device-heading">
      <h2 id="device-heading" className={styles.title}>
        Device Inventory
      </h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by ID, OS, or carrier"
        aria-label="Search devices"
        className={styles.searchInput}
      />

      <ul className={styles.cardList} role="list" aria-label="Device list">
        {filtered.map((device) => (
          <li key={device._id} className={styles.card} tabIndex="0">
            <h3>{device.deviceId}</h3>
            <p>
              <strong>OS:</strong> {device.os}
            </p>
            <p>
              <strong>Carrier:</strong> {device.carrier}
            </p>
            <p>
              <strong>Tower ID:</strong> {device.towerId}
            </p>
            <div className={styles.actions}>
              <button
                style={{ marginRight: 10 }}
                onClick={() => handleEdit(device)}
              >
                Edit
              </button>
              <button onClick={() => setConfirmDeleteId(device._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editDevice && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <form onSubmit={handleEditSubmit} className={styles.modalContent}>
            <h3>Edit Device</h3>
            <label>
              Device ID
              <input
                value={editDevice.deviceId}
                onChange={(e) =>
                  setEditDevice({ ...editDevice, deviceId: e.target.value })
                }
                required
              />
            </label>
            <label>
              OS
              <input
                value={editDevice.os}
                onChange={(e) =>
                  setEditDevice({ ...editDevice, os: e.target.value })
                }
                required
              />
            </label>
            <label>
              Carrier
              <input
                value={editDevice.carrier}
                onChange={(e) =>
                  setEditDevice({ ...editDevice, carrier: e.target.value })
                }
              />
            </label>
            <div className={styles.actions}>
              <button style={{ marginRight: 10 }} type="submit">
                Save
              </button>
              <button type="button" onClick={() => setEditDevice(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {confirmDeleteId && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this device?</p>
            <div className={styles.actions}>
              <button style={{ marginRight: 10 }} onClick={handleDelete}>
                Yes
              </button>
              <button onClick={() => setConfirmDeleteId(null)}>No</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeviceScreen;
