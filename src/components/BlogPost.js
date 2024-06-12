import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Comment from './Comment'; 

const BlogPost = ({ post }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: '1rem' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2">{post.content}</Typography>
        {post.comments && post.comments.length > 0 && (
          <div>
            <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
              Comments:
            </Typography>
            {post.comments.map((comment, index) => (
              <Comment key={index} content={comment.content} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPost;