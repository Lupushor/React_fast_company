import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../../../api";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [searchQuery, setSearchQuary] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();

  const pageSize = 8;

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevstat) => prevstat.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, bookmark: !user.bookmark } : user
      )
    );
  };
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionalSelect = (item) => {
    setSelectedProf(item);
    if (searchQuery !== "") setSearchQuary("");
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuary(target.value);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    const itemsCount = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]); //["asc"] - ascending (По алфавиту), ["desc"] - descending (В обратном порядке)
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const resetFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionalSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={resetFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={itemsCount} />
          <input
            className="form-control me-2"
            type="search"
            name="searchQuery"
            placeholder="Введите запрос"
            onChange={handleSearchQuery}
            aria-label="Search"
            value={searchQuery}
          ></input>
          {itemsCount > 0 && (
            <UsersTable
              users={userCrop}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
              onSort={handleSort}
              selectedSort={sortBy}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={itemsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "Loading...";
};

UsersListPage.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
};

export default UsersListPage;
