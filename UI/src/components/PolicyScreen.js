import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPolicies,
  updatePolicy,
  deletePolicy,
} from "../actions/policyActions";
import styles from "./PolicyScreen.module.css";

const PolicyScreen = () => {
  const dispatch = useDispatch();
  const {
    data: policies,
    loading,
    error,
  } = useSelector((state) => state.policy);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleEdit = (policy) => {
    setEditingPolicy({ ...policy });
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    dispatch(deletePolicy(confirmDeleteId));
    setConfirmDeleteId(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePolicy(editingPolicy));
    setEditingPolicy(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => setEditingPolicy(null);
  const closeConfirm = () => setConfirmDeleteId(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Policy Management</h2>

      {loading && <p>Loading policies...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>App Name</th>
            <th>Role</th>
            <th>Allowed</th>
            <th>Denied</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id}>
              <td>{policy.appName}</td>
              <td>{policy.role}</td>
              <td>{policy.allowedActions.join(", ")}</td>
              <td>{policy.deniedActions.join(", ")}</td>
              <td>
                <button
                  onClick={() => handleEdit(policy)}
                  className={styles.edit}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(policy._id)}
                  className={styles.delete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPolicy && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-policy"
          ref={modalRef}
        >
          <form onSubmit={handleEditSubmit} className={styles.modalContent}>
            <h3 id="edit-policy">Edit Policy</h3>
            <label>
              App Name:
              <input
                name="appName"
                value={editingPolicy.appName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Role:
              <input
                name="role"
                value={editingPolicy.role}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Allowed Actions:
              <input
                name="allowedActions"
                value={editingPolicy.allowedActions.join(", ")}
                onChange={(e) =>
                  setEditingPolicy((prev) => ({
                    ...prev,
                    allowedActions: e.target.value
                      .split(",")
                      .map((s) => s.trim()),
                  }))
                }
              />
            </label>
            <label>
              Denied Actions:
              <input
                name="deniedActions"
                value={editingPolicy.deniedActions.join(", ")}
                onChange={(e) =>
                  setEditingPolicy((prev) => ({
                    ...prev,
                    deniedActions: e.target.value
                      .split(",")
                      .map((s) => s.trim()),
                  }))
                }
              />
            </label>
            <div className={styles.actions}>
              <button type="submit">Save</button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {confirmDeleteId && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete"
        >
          <div className={styles.modalContent}>
            <h3 id="confirm-delete">Confirm Delete</h3>
            <p>Are you sure you want to delete this policy?</p>
            <div className={styles.actions}>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={closeConfirm}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyScreen;
