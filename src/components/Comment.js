import React from 'react';
import Typography from '@mui/material/Typography';

const Comment = ({ content }) => {
  return (
    <div style={{ marginLeft: '1rem', marginTop: '0.5rem', borderLeft: '2px solid lightgray', paddingLeft: '0.5rem' }}>
      <Typography variant="body2">{content}</Typography>
    </div>
  );
};

export default Comment;