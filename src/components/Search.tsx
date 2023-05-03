import React, { useState, useEffect } from "react";
import "../styles/search.scss";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import { IUserData } from "../types";
const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IUserData[]>();

  const navi = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await userService.getSearchUser(search);
      setUsers(user.data);
    })();
  }, [search]);
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <ul className="search-results">
        {users?.map((value, key) => (
          <li>
            <div
              key={value.id}
              onClick={(e) => {
                navi(`users/${value.id}`);
              }}
            >
              <img src={value.profilePhoto} alt="" />
              <p>
                {value.firstName.toLocaleUpperCase()}
                {"  "} {value.lastName.toLocaleUpperCase()}
              </p>
              <hr />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
