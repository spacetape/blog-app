import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import BlogPost from "./BlogPost";
import AddPostForm from "./AddPostForm";
import SearchFilter from "./SearchFilter";
import api from "../services/api";
import styles from "../css/blog.module.css";
import Header from "./Header";
import { updatePosts, setLoading } from "../redux/actions";
import store from "../redux/store"; // Import your Redux store

// Define props types for the component
const Blog = ({ posts, loading, updatePosts, setLoading }) => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/posts");
      updatePosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await api.post("/posts", newPost);
      updatePosts([...posts, response.data]);
    } catch (error) {
      console.error("Error adding post:", error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      updatePosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.blogContainer}>
        <h1 className={styles.blogTitle}>My Blog</h1>
        <div className={styles.searchAddContainer}>
          <SearchFilter />
          <AddPostForm onAddPost={handleAddPost} />
        </div>
        <div className={styles.blogPosts}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className={styles.blogPost}>
                <BlogPost post={post} onDelete={handleDeletePost} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  loading: state.loading,
});

const mapDispatchToProps = {
  updatePosts,
  setLoading,
};

// Connect your component to Redux and export it
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
