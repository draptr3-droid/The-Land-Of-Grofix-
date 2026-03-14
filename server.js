const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

let io;
try {
  const { Server } = require('socket.io');
  io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });
} catch(e) {
  console.log('socket.io not available');
}

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', game: 'Aethermoor' }));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const rooms = {};
const players = {};

function getOrCreateRoom(roomId) {
  if (!rooms[roomId]) rooms[roomId] = { id: roomId, players: {}, worldState: { storyFlags: {} }, chat: [] };
  return rooms[roomId];
}

if (io) {
  io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);

    socket.on('join_room', ({ roomId, character }) => {
      socket.join(roomId);
      const room = getOrCreateRoom(roomId);
      players[socket.id] = { id: socket.id, roomId, character, lastSeen: Date.now() };
      room.players[socket.id] = players[socket.id];
      socket.emit('room_state', { players: room.players, worldState: room.worldState, chat: room.chat.slice(-50) });
      socket.to(roomId).emit('player_joined', players[socket.id]);
    });

    socket.on('story_choice', ({ choice, node, flag }) => {
      const p = players[socket.id];
      if (!p) return;
      const room = rooms[p.roomId];
      if (room && flag) room.worldState.storyFlags[flag] = true;
      io.to(p.roomId).emit('world_event', { playerId: socket.id, playerName: p.character?.name || 'Someone', choice, node, flag });
    });

    socket.on('chat_message', ({ message }) => {
      const p = players[socket.id];
      if (!p) return;
      const msg = { id: socket.id, name: p.character?.name || 'Unknown', icon: p.character?.icon || '🧙', message: String(message).substring(0, 200), time: Date.now() };
      if (rooms[p.roomId]) rooms[p.roomId].chat.push(msg);
      io.to(p.roomId).emit('chat_message', msg);
    });

    socket.on('ping', () => { if (players[socket.id]) players[socket.id].lastSeen = Date.now(); socket.emit('pong'); });

    socket.on('disconnect', () => {
      const p = players[socket.id];
      if (p) { socket.to(p.roomId).emit('player_left', { id: socket.id }); if (rooms[p.roomId]) delete rooms[p.roomId].players[socket.id]; }
      delete players[socket.id];
      console.log('Player disconnected:', socket.id);
    });
  });
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => console.log(`Aethermoor running on port ${PORT}`));
server.on('error', (err) => console.error('Server error:', err));
