import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import type { User } from "../Types/Types";

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  variant: "edit" | "add";
  editingUser?: User;
};

const AddOrEditUser = ({ setUsers, variant, editingUser }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<User>({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (variant === "edit" && editingUser) {
      setFormValues(editingUser);
    } else if (variant === "add") {
      setFormValues({ id: "", name: "", email: "" });
    }
  }, [editingUser, variant, isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    if (!formValues.name.trim() || !formValues.email.trim()) return;

    if (variant === "add") {
      setUsers((prev) => [{ ...formValues, id: crypto.randomUUID() }, ...prev]);
    } else {
      setUsers((prev) =>
        prev.map((user) => (user.id === formValues.id ? formValues : user))
      );
    }

    closeModal();
  };

  return (
    <>
      <button
        style={{
          background: variant === "add" ? "#4cafef" : "#ff9800",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={openModal}
      >
        {variant === "add" ? "+ Add" : "Edit"}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={variant === "add" ? "Add User" : "Edit User"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Name"
            value={formValues.name}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={formValues.email}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <button
            style={{
              background: variant === "add" ? "#4caf50" : "#ff9800",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleSave}
          >
            {variant === "add" ? "Add User" : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddOrEditUser;
