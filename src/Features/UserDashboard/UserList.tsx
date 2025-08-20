import { useState } from "react";
import SearchableList from "./SearchableList/SearchableList";
import Modal from "../../ReusableComponents/Modal/Modal";
import { LocalstorageKeys } from "../../Constants/Contants";
import type { User } from "../../Types/Types";
import { ListProvider } from "../../Context/ListContext/ListContext";

const users = JSON.parse(localStorage.getItem(LocalstorageKeys.USERS) || "[]");

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
      <ListProvider initialData={users}>
        <SearchableList<User>
          searchKey="name"
          sortKey="name"
          onItemClick={openModal}
          paginationCount={3}
          localStorageKey={LocalstorageKeys.USERS}
        />
      </ListProvider>

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
