const app = require('./app')
const express = require('express');

// Middleware and routes will be added here

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});