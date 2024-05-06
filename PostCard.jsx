import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  TextField,
  Button,
 // Menu,
 // MenuItem,
  Avatar, 
  Collapse,


} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
//import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
//import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
//import BookmarkIcon from '@mui/icons-material/Bookmark';
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const PostCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const commentData = {
      text: newComment,
      // Add any other relevant fields for the comment entity
    };

    axios
      .post('http://localhost:9191/api/comments', commentData)
      .then((response) => {
        console.log('Comment saved successfully:', response.data);
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error saving comment:', error);
      });
  };

  const handleCommentUpdate = (commentId) => {
    const updatedComment = {
      id: commentId,
      text: editedCommentText,
      // Add any other relevant fields for the comment entity
    };

    axios
      .put(`http://localhost:9191/api/comments/${commentId}`, updatedComment)
      .then((response) => {
        console.log('Comment updated successfully:', response.data);
        const updatedComments = comments.map((c) =>
          c.id === commentId ? response.data : c
        );
        setComments(updatedComments);
        setEditingComment(null);
        setEditedCommentText('');
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`http://localhost:9191/api/comments/${commentId}`)
      .then(() => {
        console.log('Comment deleted successfully');
        const updatedComments = comments.filter((c) => c.id !== commentId);
        setComments(updatedComments);
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  const fetchComments = () => {
    axios
      .get('http://localhost:9191/api/comments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Nimasha Dulangi"
        subheader="@nimashadulangi"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://cdn.pixabay.com/photo/2017/08/06/12/52/woman-2592247_1280.jpg"
        alt="Paella dish"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup
          of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between" disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <TextField
          label="Add a comment"
          value={newComment}
          onChange={handleNewCommentChange}
          variant="outlined"
          size="small"
          style={{ marginLeft: 'auto' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          disabled={!newComment.trim()}
        >
          Comment
        </Button>
        <ExpandMoreIcon
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Typography paragraph>
                {editingComment === comment.id ? (
                  <>
                    <TextField
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCommentUpdate(comment.id)}
                    >
                      Update
                    </Button>
                  </>
                ) : (
                  comment.text
                )}
              </Typography>
              {editingComment !== comment.id && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEditingComment(comment.id);
                      setEditedCommentText(comment.text);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
