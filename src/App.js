import React, { useState, useEffect } from 'react';
import { Program, web3 } from '@project-serum/anchor';
import { getProvider, connection } from './utils/connection';
import BlogPost from './components/BlogPost';
import BlogForm from './components/BlogForm';
import Comment from './components/Comment';
import idl from './idl.json'; 
import './App.css';

import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const encodeBuffer = (str) => Uint8Array.from([...str].map(char => char.charCodeAt(0)));


function App() {
  const [wallet, setWallet] = useState(null); 
  const [posts, setPosts] = useState([]);
  const [blogAccount, setBlogAccount] = useState(null); 

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPostIndex, setEditingPostIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const programID = new web3.PublicKey('3FXq22R9cSKnDhc9S2JTr2QHz8aAUQqjUJia4EFaj75Y');


  const connectWallet = async () => {
    if ('solana' in window) {
      try {
        const resp = await window.solana.connect();
        setWallet(resp);
      } catch (error) {
        console.error("User rejected request", error);
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  useEffect(() => {
    // Automatically connect to the wallet if already connected
    if ('solana' in window && window.solana.isPhantom) {
      connectWallet();
    }
  }, []);

  const getBlogAccount = async () => {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);

    try {
      const [blogPda] = await web3.PublicKey.findProgramAddress(
        [encodeBuffer("simple_blog")],
        program.programId
      );
      setBlogAccount(blogPda);

      // Check if the account exists *before* trying to fetch it 
      const blogAccountInfo = await connection.getAccountInfo(blogPda); 

      if (blogAccountInfo) { 
        // Account exists - fetch the data
        const account = await program.account.blog.fetch(blogPda);
        setPosts(account.posts);
      } else {
        console.log('Blog account does not exist. You need to initialize it.');

        if (wallet) { // Make sure a wallet is connected
          try {
            await program.methods.initializeBlog()
              .accounts({
                blogAccount: blogPda,
                user: wallet.publicKey, 
                systemProgram: web3.SystemProgram.programId 
              })
              .rpc();
            console.log('Blog account initialized!');
          } catch (initError) {
            console.error("Error initializing blog account:", initError);
            // Handle initialization error appropriately 
          }
        } else {
          console.error("Wallet not connected. Cannot initialize blog account.");
        }
      }
    } catch (error) {
      console.error("Error fetching blog account:", error); 
      // Add better error handling here 
    }
  };

  useEffect(() => {
    if (wallet) {
      getBlogAccount();
    }
  }, [wallet]); 

  const createPost = async ({ title, content }) => {

    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const [blogPda] = await web3.PublicKey.findProgramAddress(
        [encodeBuffer("simple_blog")], 
        program.programId
      );
      await program.methods
        .createPost(title, content)
        .accounts({
          blogAccount: blogPda,
        })
        .rpc();
      await getBlogAccount();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const createComment = async (postIndex, content) => {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const [blogPda] = await web3.PublicKey.findProgramAddress(
        [encodeBuffer("simple_blog")],
        program.programId
      );
 
      await program.methods
        .createComment(postIndex, content)
        .accounts({
          blogAccount: blogPda, 
        })
        .rpc();
 
      // Refresh the post list to show the new comment
      await getBlogAccount(); 
    } catch (error) {
      console.error("Error creating comment:", error);
      // Handle error, e.g., display an error message
    }
  };
 
  // Example for editPost function
  const editPost = async (postIndex, newTitle, newContent) => {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const [blogPda] = await web3.PublicKey.findProgramAddress(
        [encodeBuffer("simple_blog")],
        program.programId
      );
 
      await program.methods
        .editPost(postIndex, newTitle, newContent)
        .accounts({
          blogAccount: blogPda,
        })
        .rpc();
 
      await getBlogAccount(); // Refresh the post list
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };
 
  // Example for deletePost function
  const deletePost = async (postIndex) => {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const [blogPda] = await web3.PublicKey.findProgramAddress(
        [encodeBuffer("simple_blog")],
        program.programId
      );
 
      await program.methods
        .deletePost(postIndex)
        .accounts({
          blogAccount: blogPda,
        })
        .rpc();
 
      await getBlogAccount();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
 
  // Example for deleteComment function
  const deleteComment = async (postIndex, commentIndex) => {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const [blogPda] = await web3.PublicKey.findProgramAddress(
        [encodeBuffer("simple_blog")],
        program.programId
      );
 
      await program.methods
        .deleteComment(postIndex, commentIndex)
        .accounts({
          blogAccount: blogPda,
        })
        .rpc();
 
      await getBlogAccount();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditPost = (postIndex) => {
    // Set the editing post index and populate the form fields
    setEditingPostIndex(postIndex);
    setEditTitle(posts[postIndex].title);
    setEditContent(posts[postIndex].content);
    setEditDialogOpen(true); 
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingPostIndex(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleConfirmEdit = async () => {
    // Call your editPost function here
    try {
      await editPost(editingPostIndex, editTitle, editContent);
      handleEditDialogClose(); // Close the dialog after editing
    } catch (error) {
      console.error("Error editing post:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div className="App">
      <h1>My Solana Blog</h1>
      {!wallet && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}

      {wallet && ( 
        <> 
          <BlogForm onSubmit={createPost} type="post" /> 

          {posts.map((post, index) => (
            <div key={index}>
              <BlogPost post={post} /> 

              {/* Edit Post Button */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEditPost(index)}
                style={{ marginRight: '0.5rem' }}
              >
                Edit Post
              </Button>

              {/* Delete Post Button */}
              <Button
                variant="outlined"
                color="error"
                onClick={() => deletePost(index)}
              >
                Delete Post
              </Button>

              {/* Comment Section */}
              <BlogForm 
                onSubmit={(content) => createComment(index, content.content)} 
                type="comment" 
              />

              {post.comments.map((comment, commentIndex) => (
                <div key={commentIndex} style={{ marginLeft: '2rem' }}> 
                  <Comment content={comment.content} />

                  {/* Delete Comment Button */}
                  <Button 
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => deleteComment(index, commentIndex)}
                    style={{ marginLeft: '1rem' }}
                  >
                    Delete Comment
                  </Button>
                </div>
              ))}
            </div>
          ))}

          {/* Dialog for Editing a Post */}
          <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Make changes to your post below:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Content"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmEdit} color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog> 
        </>
      )}
    </div>
  );
}

export default App;