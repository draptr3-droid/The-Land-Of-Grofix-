// =====================================================
// AETHERMOOR — Main Game Controller + Multiplayer
// =====================================================

// Stub modules referenced in index.html
const Story = {};
const MapView_dummy = {};

// =====================================================
// MAIN GAME OBJECT
// =====================================================
const Game = {
  socket: null,
  onlinePlayerCount: 0,
  SERVER_URL: (() => {
    // Auto-detect: use Render server URL in production, localhost in dev
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
    // Replace this with your actual Render URL after deployment
    return 'https://the-land-of-grofix-1.onrender.com';
  })(),

  // ---- INIT ----
  init() {
    this.startLoading();
  },

  startLoading() {
    const bar = document.getElementById('loading-bar');
    const status = document.getElementById('loading-status');
    const steps = [
      [15, 'Weaving the fates...'],
      [30, 'Summoning ancient lore...'],
      [50, 'Forging skill trees...'],
      [65, 'Populating the world...'],
      [80, 'Connecting to Aethermoor...'],
      [95, 'Sharpening swords...'],
      [100, 'Ready.']
    ];
    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        setTimeout(() => {
          document.getElementById('loading-screen').style.opacity = '0';
          setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            UI.showScreen('main-menu');
            this.initParticles();
          }, 400);
        }, 300);
        return;
      }
      bar.style.width = steps[i][0] + '%';
      status.textContent = steps[i][1];
      i++;
      setTimeout(tick, 350 + Math.random() * 200);
    };
    setTimeout(tick, 500);
  },

  // ---- MENU ----
  startNewGame() {
    Engine.state = {
      char: null, currentNode: 'intro', storyFlags: {}, storyPath: 'neutral',
      faction: null, factionRep: {}, journal: { quests: [], lore: [], choices: [] },
      visitedNodes: [], turnCount: 0, inCombat: false, gold: 50,
      inventory: [], equipped: { mainhand: null, chest: null, head: null, hands: null, feet: null, ring: null },
      skillPoints: 0, unlockedSkills: {}, buffs: [], debuffs: [], knownEnemies: []
    };
    CharCreation.step = 1;
    CharCreation.selections = {
      race: null, class: null, origin: null,
      attrs: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
      appearance: {}, name: ''
    };
    CharCreation.pointsSpent = 0;
    UI.showScreen('char-creation');
    CharCreation.init();
    CharCreation.updateSteps();
  },

  loadGame() {
    if (Engine.load()) {
      this.enterGame();
    } else {
      UI.notify('No save found — start a new adventure!', 'warning');
    }
  },

  enterGame() {
    UI.showScreen('game-screen');
    UI.updateHUD();
    UI.renderScene('intro');
    this.connectMultiplayer();
    this.startAutosave();
    this.initKeyBindings();
    this.updateQuestsMini();
  },

  // ---- MULTIPLAYER ----
  connectMultiplayer() {
    try {
      // Dynamically load socket.io client
      if (typeof io === 'undefined') {
        const script = document.createElement('script');
        script.src = this.SERVER_URL + '/socket.io/socket.io.js';
        script.onload = () => this._doConnect();
        script.onerror = () => console.log('Multiplayer server not available - single player mode');
        document.head.appendChild(script);
      } else {
        this._doConnect();
      }
    } catch(e) { console.log('Single player mode'); }
  },

  _doConnect() {
    try {
      this.socket = io(this.SERVER_URL, { transports: ['websocket', 'polling'] });

      this.socket.on('connect', () => {
        console.log('Connected to Aethermoor server!');
        const roomId = 'world-1'; // Default public room
        this.socket.emit('join_room', {
          roomId,
          character: {
            name: Engine.state.char?.name,
            icon: Engine.state.char?.icon,
            race: Engine.state.char?.race,
            class: Engine.state.char?.class,
            level: Engine.state.char?.level
          }
        });
      });

      this.socket.on('room_state', ({ players }) => {
        this.onlinePlayerCount = Object.keys(players).length;
        this.updateOnlineDisplay();
      });

      this.socket.on('player_joined', (player) => {
        this.onlinePlayerCount++;
        this.updateOnlineDisplay();
        UI.notify(`${player.character?.name || 'A traveler'} has entered Aethermoor`, 'success');
      });

      this.socket.on('player_left', () => {
        this.onlinePlayerCount = Math.max(0, this.onlinePlayerCount - 1);
        this.updateOnlineDisplay();
      });

      this.socket.on('world_event', ({ playerName, message, choice }) => {
        if (message) UI.notify(`${playerName} ${message}`, '');
        if (choice) {
          const el = document.getElementById('active-quests-mini');
          if (el) el.textContent = `${playerName}: "${choice.substring(0, 50)}..."`;
        }
      });

      this.socket.on('chat_message', ({ name, icon, message }) => {
        UI.notify(`${icon} ${name}: ${message}`, '');
      });

      this.socket.on('pong', () => {});

      // Heartbeat
      setInterval(() => { if (this.socket?.connected) this.socket.emit('ping'); }, 30000);

    } catch(e) { console.log('Multiplayer unavailable'); }
  },

  emitChoice(choice, node, flag) {
    if (this.socket?.connected) {
      this.socket.emit('story_choice', { choice: choice.substring(0, 100), node, flag });
    }
  },

  updateOnlineDisplay() {
    const display = document.getElementById('active-quests-mini');
    if (display && this.onlinePlayerCount > 0) {
      display.textContent = `⚔ ${this.onlinePlayerCount} adventurer${this.onlinePlayerCount > 1 ? 's' : ''} online`;
    }
  },

  // ---- UTILITIES ----
  startAutosave() {
    setInterval(() => Engine.save(), 60000); // Save every minute
  },

  updateQuestsMini() {
    const el = document.getElementById('active-quests-mini');
    if (!el) return;
    const active = Engine.state.journal.quests.filter(q => q.status === 'active');
    if (active.length > 0 && this.onlinePlayerCount === 0) {
      el.textContent = `📜 ${active[0].name}`;
    }
  },

  initKeyBindings() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
      }
      if (e.key === 'i' || e.key === 'I') UI.openPanel('inventory');
      if (e.key === 's' || e.key === 'S') UI.openPanel('skilltree');
      if (e.key === 'j' || e.key === 'J') UI.openPanel('journal');
      if (e.key === 'm' || e.key === 'M') UI.openPanel('map');
      if (e.key === 'c' || e.key === 'C') UI.openPanel('character');
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); Engine.save(); }
    });
  },

  // ---- PARTICLES (main menu) ----
  initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.7 ? '#c9a84c' : Math.random() > 0.5 ? '#9040d8' : '#60c8f0'
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
};

// =====================================================
// SKILLS + STORY stubs
// =====================================================
const Skills = { init() {} };

// =====================================================
// BOOT
// =====================================================
window.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
