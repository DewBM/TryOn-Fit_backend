import app from './app';
import express from 'express';

// Middleware and routes will be added here

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});