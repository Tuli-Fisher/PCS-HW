
export default function SearchBar(props) {
  return (
    <div>
      <input type="text" placeholder="Search..." value={props.value} onChange={(e) => props.onSearchChange(e.target.value)} />
      {/* <span onClick={props.searchClicked}>🔎</span>
      <span onClick={props.clearSearch}>Clear</span> */}
    </div>
  );
}
