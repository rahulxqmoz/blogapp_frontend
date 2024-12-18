import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { allPosts:posts, loading, error } = useSelector((state) => state.posts);
  const [viewselectedBlog, setViewselectedBlog] = useState(null);
  

  useEffect(() => {
    // Fetch all posts (no user ID is needed)
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleViewBlog = (blog) => {
    setViewselectedBlog(blog);
  };

  const handleCloseDetails = () => {
    setViewselectedBlog(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Latest Blogs
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card>
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
                      marginY: 1,
                    }}
                  >
                    {blog.content}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleViewBlog(blog)}
                  >
                    View More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {viewselectedBlog && (
        <Dialog
          open={Boolean(viewselectedBlog)}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
        >
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
            <Typography variant="body1" gutterBottom>
              {viewselectedBlog.content}
            </Typography>
          
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

export default Home;
