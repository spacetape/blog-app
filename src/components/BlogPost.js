import React, { useState } from "react";

const BlogPost = ({ post, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform save operation, update the post with new title and content
    onEdit(post.id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Cancel the editing and reset the state
    setIsEditing(false);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
