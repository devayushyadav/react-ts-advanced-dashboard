import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

type Props<T extends { id: string; name: string; email: string }> = {
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  variant: "edit" | "add";
  editingItem?: T;
};

const AddOrEditData = <T extends { id: string; name: string; email: string }>({
  setData,
  variant,
  editingItem,
}: Props<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<T>({
    id: "" as string,
    name: "" as string,
    email: "" as string,
  } as T);

  useEffect(() => {
    if (variant === "edit" && editingItem) {
      setFormValues(editingItem);
    } else if (variant === "add") {
      setFormValues({
        id: "" as string,
        name: "" as string,
        email: "" as string,
      } as T);
    }
  }, [editingItem, variant, isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    if (!formValues.name.trim() || !formValues.email.trim()) return;

    if (variant === "add") {
      setData((prev) => [
        { ...formValues, id: crypto.randomUUID() } as T,
        ...prev,
      ]);
    } else {
      setData((prev) =>
        prev.map((item) => (item.id === formValues.id ? formValues : item))
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
        title={variant === "add" ? "Add Item" : "Edit Item"}
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
            {variant === "add" ? "Add" : "Save"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddOrEditData;
