const express = require('express');
const actionRoutes = require('./actionRoutes');
const projectRoutes = require('./projectRoutes');
const server = express();
const PORT = 8000;

server.use(express.json());

server.use('/api', actionRoutes);
server.use('/api', projectRoutes);

server.listen(PORT, () => console.log(`API running on port ${PORT}`));
