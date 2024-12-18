import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost, editPost, deletePost } from "../redux/postSlice";

const MAX_CONTENT_LENGTH = 5000; 
const MAX_IMAGE_SIZE_MB = 5; 

const useHideUnimportantErrors = () => {
  useEffect(() => {
    function hideError(e) {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
        const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    }

    window.addEventListener('error', hideError);

    return () => {
      window.removeEventListener('error', hideError);
    };
  }, []);
};

const Profile = () => {
  const dispatch = useDispatch();
  const { userPosts: posts, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [dialogType, setDialogType] = useState(""); // For distinguishing create/edit
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [viewselectedBlog, setViewselectedBlog] = useState(null);
  const [errors, setErrors] = useState({ title: "", content: "", image: "" });
  
  useHideUnimportantErrors();
  // Fetch posts on user login
  useEffect(() => {
    console.log('User ID:', user?.id); // Check if the ID is available after refresh
    if (user?.id) {
      dispatch(fetchPosts(user.id));
    } else {
      console.warn('User ID is not available');
    }
  }, [user?.id]);

  

  // Open the dialog for create/edit actions
  const handleOpen = (type, blog = null) => {
    setDialogType(type);
    if (type === "edit" && blog) {
      setPostData({ title: blog.title, content: blog.content });
      setImagePreview(blog.image);
      setSelectedBlog(blog);
    }
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setPostData({ title: "", content: "" });
    setImage(null);
    setImagePreview(null);
  };


  const validateInputs = () => {
    const newErrors = { title: "", content: "", image: "" };

    // Title validation
    if (!postData.title.trim()) newErrors.title = "Title is required.";
    if (postData.title.trim().length > 250) newErrors.title = "Title must be under 250 characters.";

    // Content validation
    if (!postData.content.trim()) newErrors.content = "Content is required.";
    if (postData.content.trim().length > MAX_CONTENT_LENGTH) {
      newErrors.content = `Content must be under ${MAX_CONTENT_LENGTH} characters.`;
    }

    // Image validation
    if (image) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(image.type)) {
        newErrors.image = "Only JPG, JPEG, and PNG files are allowed.";
      }
      if (image.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        newErrors.image = `Image size must be under ${MAX_IMAGE_SIZE_MB} MB.`;
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };
  // Handle create post
  const handleCreatePost = async () => {
    if (!validateInputs()) return;
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    if (image) formData.append("image", image);

    await dispatch(createPost(formData));
    handleClose();
  };

  // Handle update post
  const handleUpdatePost = async () => {
    if (!validateInputs()) return;
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    if (image) formData.append("image", image);

    await dispatch(editPost({ id: selectedBlog.id, data: formData }));
    handleClose();
  };

  // Handle delete post
  const handleDelete = async (blog) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await dispatch(deletePost(blog.id));
      dispatch(fetchPosts(user.id));
    }
  };

  // Handle view blog
  const handleViewBlog = (blog) => {
    setViewselectedBlog(blog);
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Close the view blog modal
  const handleCloseDetails = () => {
    setViewselectedBlog(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Blogs
      </Typography>

      <Button variant="contained" sx={{ marginBottom: 3 }} onClick={() => handleOpen("create")}>
        Create New Blog
      </Button>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card sx={{ height: 300 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image || "https://via.placeholder.com/150"}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {blog.content}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2, gap: 1 }}>
                    <Button size="small" variant="contained" onClick={() => handleViewBlog(blog)}>
                      View More
                    </Button>
                    <Button size="small" variant="contained" onClick={() => handleOpen("edit", blog)}>
                      Edit
                    </Button>
                    <Button size="small" variant="contained" onClick={() => handleDelete(blog)}>
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            overflow: "auto", // Ensure the content is scrollable instead of resizing
          },
        }}
      >
        <DialogTitle>{dialogType === "edit" ? "Edit Blog" : "Create New Blog"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            minRows={4}
            value={postData.content}
            onChange={(e) => setPostData({ ...postData, content: e.target.value })}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: 16 }}
          />
           {errors.image && <Typography color="error">{errors.image}</Typography>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "99%",
                height: "auto",
                marginTop: 16,
                borderRadius: 4,
                minHeight:"200px"
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={dialogType === "edit" ? handleUpdatePost : handleCreatePost}
            variant="contained"
          >
            {dialogType === "edit" ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Blog Details */}
      {viewselectedBlog && (
        <Dialog open={Boolean(viewselectedBlog)} onClose={handleCloseDetails} maxWidth="md" fullWidth>
          <DialogContent>
            <Typography variant="h4" gutterBottom>
              {viewselectedBlog.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Author:</strong> {viewselectedBlog.user}
            </Typography>
            <Typography variant="body2" color="textSecondary" paddingBottom={2}>
              <strong>Published:</strong>{" "}
              {new Date(viewselectedBlog.created_at).toLocaleString()}
            </Typography>
            {viewselectedBlog.image && (
              <img
                src={viewselectedBlog.image}
                alt={viewselectedBlog.title}
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: 16,
                  borderRadius: 4,
                }}
              />
            )}
            <Typography variant="body1">{viewselectedBlog.content}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Profile;
