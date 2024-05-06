import React, { useState } from 'react';
import { Card, CardContent, IconButton, TextField } from '@mui/material';
import { PhotoCamera, AddAPhoto, Edit, InsertEmoticon, Send } from '@mui/icons-material';

const CreateReelsPage = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleCameraClick = () => {
    // Open camera logic
    setIsCameraOpen(true);
  };

  const handleUploadClick = () => {
    // Handle upload logic
    console.log('Upload photo logic');
  };

  const handleSendClick = () => {
    // Handle send message logic
    console.log('Send message:', message);
  };

  return (
    <div>
      <h1>Create Reels</h1>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          {isCameraOpen ? (
            <>
              <IconButton onClick={handleUploadClick}>
                <AddAPhoto />
              </IconButton>
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton>
                <InsertEmoticon />
              </IconButton>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add your message..."
              />
              <IconButton onClick={handleSendClick}>
                <Send />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleCameraClick}>
              <PhotoCamera />
            </IconButton>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateReelsPage;
