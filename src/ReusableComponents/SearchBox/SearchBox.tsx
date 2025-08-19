type SearchBoxProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  styles: React.CSSProperties;
};
const SearchBox = ({
  query,
  setQuery,
  placeholder,
  styles,
}: SearchBoxProps) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px", marginBottom: "10px", ...styles }}
    />
  );
};

export default SearchBox;
