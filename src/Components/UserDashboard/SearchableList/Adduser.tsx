// AddUser.tsx
import { useState } from "react";
import Modal from "../Modal/Modal";
import type { User } from "../Types/Types";

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const AddUser = ({ setUsers }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<User>({
    id: crypto.randomUUID(),
    name: "",
    email: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAdd = () => {
    if (!formValues.name.trim() || !formValues.email.trim()) return;

    setUsers((prev) => [{ ...formValues }, ...prev]);

    setFormValues({ id: "", name: "", email: "" });
    closeModal();
  };

  return (
    <>
      <button
        style={{
          background: "#4cafef",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={openModal}
      >
        + Add
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add User">
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
              background: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddUser;
