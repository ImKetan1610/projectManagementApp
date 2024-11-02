import { useEffect, useState } from "react";
import s from "./PeopleModal.module.css";
import customHooks from "../CustomHooks/CustomHooks";

const PeopleModal = ({ isOpen, onClose }) => {
  const { getAllUser, addPeople } = customHooks();
  const [assignee, setAssignee] = useState("");
  const [assigneeId, setAssigneeId] = useState(null);
  const [users, setUsers] = useState("");
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    getAllUser().then((res) => setUsers(res));
  }, []);

  const handleSelectUser = (user) => {
    setAssignee(user.email);
    setAssigneeId(user._id);
    setShowUserList(false);
  };

  const handleAssignee = () => {};

  if (!isOpen) return null;

  console.log("24", assigneeId);

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2>Add People to the Board</h2>
        <input
          type="text"
          placeholder="Enter email"
          className={s.inputBox}
          value={assignee}
          onChange={() => handleAssignee()}
          onClick={() => setShowUserList(true)}
        />
        {showUserList && (
          <ul className={s.userList}>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={s.userItem}
              >
                {user.email}
              </li>
            ))}
          </ul>
        )}
        <div className={s.buttonsDiv}>
          <button onClick={onClose} className={s.closeButton}>
            Cancel
          </button>
          <button
            onClick={() => {
              addPeople(assigneeId);
              onClose();
            }}
            className={s.addButton}
          >
            Add Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeopleModal;
