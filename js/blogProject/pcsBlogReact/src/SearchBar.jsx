import { useNavigate } from "react-router";

export default function SearchBar(props) {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/users");
    }
  };
  return (
    <div>
      <button onClick={goBack}>Back</button>
      <input
        type="text"
        placeholder="Search..."
        value={props.value}
        onChange={(e) => props.onSearchChange(e.target.value)}
      />
      {/* <span onClick={props.searchClicked}>🔎</span>
      <span onClick={props.clearSearch}>Clear</span> */}
    </div>
  );
}
