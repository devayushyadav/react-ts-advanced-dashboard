import SearchableList from "./SearchableList";

type User = {
    name : string
    email : string
}

const users: User[] = [
  { name: "Ayush Yadav", email: "ayush@example.com" },
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Marley", email: "bob@example.com" },
  { name: "Charlie Puth", email: "charlie@example.com" },
];

const UserList =() => {

    return <div style={{ padding: "20px" }}>
      <h2>Searchable User List</h2>
      <SearchableList
        items={users}
        searchKey="name"
        renderItem={(user:User) => (
          <>
            <strong>{user.name}</strong>
            <div style={{ fontSize: "12px", color: "gray" }}>{user.email}</div>
          </>
        )}
      />
    </div>
}

export default UserList;