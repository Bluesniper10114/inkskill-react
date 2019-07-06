import React from 'react';
import { Spinner } from 'core/utils/loading';
import UserList from 'core/components/UserList';

const FollowersModal = ({
  id,
  term,
  role,
  filteredList,
  followers,
  onClose,
  onChangeTerm,
  onChangeRole,
  onFilter,
}) => (
  <div className="modal-content">
    <div className="modal-header text-center">
      <button type="button" className="close" onClick={onClose}>&times;</button>
      <h4 className="modal-title">{id === 'followers' ? 'FOLLOWERS' : 'FOLLOWING'} LIST</h4>
    </div>
    <div className="modal-body">
      <form className="follow-search-box" onSubmit={onFilter}>
        <div className="row">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={term}
              onChange={onChangeTerm}
            />
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <select className="form-control" value={role} onChange={onChangeRole}>
                <option value="">All</option>
                <option value={2}>Artist</option>
                <option value={3}>Enthusiast</option>
              </select>
              <div className="icon-box">
                <span className="triangle" />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={onFilter}>FILTER</button>
          </div>
        </div>
      </form>
      <div className="list-container">
        {followers ? <UserList users={filteredList || followers} /> : <Spinner />}
      </div>
    </div>
  </div>
);

export default FollowersModal;
