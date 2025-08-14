import { useState } from "react";
import SearchableList from "./SearchableList/SearchableList";
import Modal from "./Modal/Modal";

type User = {
  name: string;
  email: string;
};

const users: User[] = [
  { name: "Ayush Yadav", email: "ayush@example.com" },
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Marley", email: "bob@example.com" },
  { name: "Charlie Puth", email: "charlie@example.com" },
];

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const openModal = (user: { name: string; email: string }) => {
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
