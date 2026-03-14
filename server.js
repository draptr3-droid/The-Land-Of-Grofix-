const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Serve static files (for testing locally)
app.use(express.static(path.join(__dirname, 'public')));

// ---- GAME STATE ----
const rooms = {};
const players = {};

function getOrCreateRoom(roomId) {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      id: roomId,
      players: {},
      worldState: { storyFlags: {}, monsters: [], loot: [] },
      chat: []
    };
  }
  return rooms[roomId];
}

// ---- SOCKET EVENTS ----
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Player joins a room
  socket.on('join_room', ({ roomId, character }) => {
    socket.join(roomId);
    const room = getOrCreateRoom(roomId);
    
    players[socket.id] = {
      id: socket.id,
      roomId,
      character,
      position: { x: 0, y: 0 },
      lastSeen: Date.now()
    };
    room.players[socket.id] = players[socket.id];

    // Tell the new player about everyone already in the room
    socket.emit('room_state', {
      players: room.players,
      worldState: room.worldState,
      chat: room.chat.slice(-50)
    });

    // Tell everyone else about the new player
    socket.to(roomId).emit('player_joined', players[socket.id]);
    console.log(`${character?.name || socket.id} joined room ${roomId}`);
  });

  // Player moves / updates position
  socket.on('player_move', ({ position, storyNode }) => {
    const p = players[socket.id];
    if (!p) return;
    p.position = position;
    p.storyNode = storyNode;
    p.lastSeen = Date.now();
    socket.to(p.roomId).emit('player_update', { id: socket.id, position, storyNode });
  });

  // Player makes a story choice (shared world events)
  socket.on('story_choice', ({ choice, node, flag }) => {
    const p = players[socket.id];
    if (!p) return;
    const room = rooms[p.roomId];
    if (room && flag) room.worldState.storyFlags[flag] = true;
    
    // Broadcast to room so others can react
    io.to(p.roomId).emit('world_event', {
      playerId: socket.id,
      playerName: p.character?.name || 'Someone',
      choice, node, flag
    });
  });

  // Chat message
  socket.on('chat_message', ({ message }) => {
    const p = players[socket.id];
    if (!p) return;
    const msg = {
      id: socket.id,
      name: p.character?.name || 'Unknown',
      icon: p.character?.icon || '🧙',
      message: message.substring(0, 200),
      time: Date.now()
    };
    rooms[p.roomId]?.chat.push(msg);
    io.to(p.roomId).emit('chat_message', msg);
  });

  // Combat result broadcast
  socket.on('combat_result', ({ enemyId, victory }) => {
    const p = players[socket.id];
    if (!p) return;
    if (victory) {
      io.to(p.roomId).emit('world_event', {
        playerId: socket.id,
        playerName: p.character?.name || 'Someone',
        message: `defeated ${enemyId}!`
      });
    }
  });

  // Ping/heartbeat
  socket.on('ping', () => {
    if (players[socket.id]) players[socket.id].lastSeen = Date.now();
    socket.emit('pong');
  });

  // Disconnect
  socket.on('disconnect', () => {
    const p = players[socket.id];
    if (p) {
      socket.to(p.roomId).emit('player_left', { id: socket.id });
      delete rooms[p.roomId]?.players[socket.id];
      if (rooms[p.roomId] && Object.keys(rooms[p.roomId].players).length === 0) {
        delete rooms[p.roomId];
      }
    }
    delete players[socket.id];
    console.log(`Player disconnected: ${socket.id}`);
  });
});

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'ok', players: Object.keys(players).length }));
app.get('/', (req, res) => res.json({ game: 'Aethermoor', status: 'running' }));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Aethermoor server running on port ${PORT}`));
