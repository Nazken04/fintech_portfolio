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
      </CardContent>
    </Card>
  );
};

export default BlogPost;