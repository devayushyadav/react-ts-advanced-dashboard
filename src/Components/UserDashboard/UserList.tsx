import { useState } from "react";
import SearchableList from "./SearchableList/SearchableList";
import Modal from "./Modal/Modal";
import type { User } from "./Types/Types";

const users: User[] = [
  { id: crypto.randomUUID(), name: "Ayush Yadav", email: "ayush@example.com" },
  { id: crypto.randomUUID(), name: "John Doe", email: "john@example.com" },
  { id: crypto.randomUUID(), name: "Jane Smith", email: "jane@example.com" },
  {
    id: crypto.randomUUID(),
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  { id: crypto.randomUUID(), name: "Bob Marley", email: "bob@example.com" },
  {
    id: crypto.randomUUID(),
    name: "Charlie Puth",
    email: "charlie@example.com",
  },
];

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Searchable User List</h2>
      <SearchableList
        items={users}
        searchKey="name"
        sortKey="name"
        onItemClick={openModal}
        renderItem={(user: User) => (
          <>
            <strong>{user.name}</strong>
            <div style={{ fontSize: "12px", color: "gray" }}>{user.email}</div>
          </>
        )}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        title="User Details"
      >
        {selectedUser && (
          <>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default UserList;
