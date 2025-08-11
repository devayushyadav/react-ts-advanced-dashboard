import SearchableList from "./SearchableList";

type User = {
<<<<<<< HEAD
  name: string;
  email: string;
};
=======
    name : string
    email : string
}
>>>>>>> 4bdfb4ae49f36f0d6c61a2faced9721f3963e5aa

const users: User[] = [
  { name: "Ayush Yadav", email: "ayush@example.com" },
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Marley", email: "bob@example.com" },
  { name: "Charlie Puth", email: "charlie@example.com" },
];

<<<<<<< HEAD
const UserList = () => {
  return (
    <div style={{ padding: "20px" }}>
=======
const UserList =() => {

    return <div style={{ padding: "20px" }}>
>>>>>>> 4bdfb4ae49f36f0d6c61a2faced9721f3963e5aa
      <h2>Searchable User List</h2>
      <SearchableList
        items={users}
        searchKey="name"
<<<<<<< HEAD
        sortKey="name"
        renderItem={(user: User) => (
=======
        renderItem={(user:User) => (
>>>>>>> 4bdfb4ae49f36f0d6c61a2faced9721f3963e5aa
          <>
            <strong>{user.name}</strong>
            <div style={{ fontSize: "12px", color: "gray" }}>{user.email}</div>
          </>
        )}
      />
    </div>
<<<<<<< HEAD
  );
};

export default UserList;
=======
}

export default UserList;
>>>>>>> 4bdfb4ae49f36f0d6c61a2faced9721f3963e5aa
