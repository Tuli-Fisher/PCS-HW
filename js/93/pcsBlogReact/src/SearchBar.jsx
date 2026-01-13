import { useState } from "react";
import { useNavigate, Outlet } from "react-router";
import "./SearchBar.css";

export default function SearchBar() {
  const [searchVal, setSearchVal] = useState("");
  const [lastReload, setLastReload] = useState();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="search-div">
        <button onClick={goBack}>Back</button>
        <label>
          Search:
          <input
            type="text"
            placeholder="Search..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </label>
        {/* <span onClick={props.searchClicked}>🔎</span>
      <span onClick={props.clearSearch}>Clear</span> */}

        <span>{lastReload && `last reload:${new Date(lastReload).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })} `}</span>
      </div>

      <Outlet context={{ searchVal, setLastReload }} />
    </>
  );
}
