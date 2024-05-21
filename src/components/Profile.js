import React, { useState, useEffect } from "react";
import "../css/profile.css";
import Header from "./Header";

const Profile = ({ user, onLogout }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    // Load user data from localStorage when the component mounts
    const storedUser = localStorage.getItem("profileUser");
    if (storedUser) {
      setEditedUser(JSON.parse(storedUser));
    }
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // Save the edited user data to localStorage
    localStorage.setItem("profileUser", JSON.stringify(editedUser));

    // Exit edit mode
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    // Reset editedUser to the original user data
    setEditedUser(user);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    // Update the editedUser state when the form inputs change
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="avatar-container">
          <img src={require("../assets/a.jpg")} alt="Avatar" />
        </div>

        {isEditMode ? (
          // Render form in edit mode
          <div className="edit-form">
            <label htmlFor="editedName">Name:</label>
            <input
              type="text"
              id="editedName"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />

            <label htmlFor="editedEmail">Email:</label>
            <input
              type="email"
              id="editedEmail"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />

            <label htmlFor="editedLocation">Location:</label>
            <input
              type="text"
              id="editedLocation"
              name="location"
              value={editedUser.location}
              onChange={handleChange}
            />

            <label htmlFor="editedAbout">About Me:</label>
            <textarea
              id="editedAbout"
              name="about"
              value={editedUser.about}
              onChange={handleChange}
            ></textarea>

            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          // Render user details in view mode
          <div className="user-details">
            <h2>{editedUser.name}</h2>
            <p>Email: {editedUser.email}</p>
            <p>Location: {editedUser.location}</p>
            <p>About Me: {editedUser.about}</p>
          </div>
        )}

        {!isEditMode && (
          // Show edit button in view mode
          <button onClick={handleEditClick}>Edit Profile</button>
        )}

        <button onClick={onLogout}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
