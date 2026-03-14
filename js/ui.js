// =====================================================
// AETHERMOOR — UI Completion (appended to ui.js)
// =====================================================

// Finish char sheet buffs section
const _origCharSheetRender = CharSheet.render.bind(CharSheet);
CharSheet.render = function() {
  _origCharSheetRender();
  const el = document.getElementById('char-buffs-debuffs');
  if (!el) return;
  const all = [...Engine.state.buffs, ...Engine.state.debuffs];
  el.innerHTML = `
    <div class="char-section-title">Active Effects</div>
    ${all.length ? all.map(b =>
      `<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
        <span style="color:${b.effects.hpDrainPerTurn ? 'var(--rose)' : 'var(--emerald)'}">${b.icon} ${b.name}</span>
        <span style="color:var(--silver)">${b.duration} turns</span>
      </div>`
    ).join('') : '<p style="color:var(--stone);font-size:12px;font-style:italic">No active effects</p>'}
  `;
};

// ---- SKILL TREE ----
const SkillTree = {
  currentTree: null,

  render() {
    const c = Engine.state.char;
    if (!c) return;
    const classData = DATA.classes[c.class];
    const trees = classData?.skillTrees || ['combat', 'defense'];

    // Build tabs
    const tabsEl = document.getElementById('skill-tabs');
    if (tabsEl) {
      tabsEl.innerHTML = trees.map((t, i) => {
        const tree = DATA.skillTrees[t];
        return tree ? `<button class="ptab ${i === 0 ? 'active' : ''}" onclick="SkillTree.showTree('${t}')">${tree.icon} ${tree.name}</button>` : '';
      }).join('');
    }

    document.getElementById('skill-points-avail').textContent = Engine.state.skillPoints;
    this.showTree(trees[0]);
  },

  showTree(treeId) {
    this.currentTree = treeId;
    const tree = DATA.skillTrees[treeId];
    if (!tree) return;

    // Update tab active state
    document.querySelectorAll('#skill-tabs .ptab').forEach(t => {
      t.classList.toggle('active', t.textContent.includes(tree.name));
    });

    const container = document.getElementById('skill-tree-container');
    if (!container) return;

    // Draw SVG connectors + nodes
    const nodes = tree.nodes;
    const width = Math.max(...nodes.map(n => n.x + 120));
    const height = Math.max(...nodes.map(n => n.y + 120));

    let svg = `<svg width="${width}" height="${height}" style="position:absolute;top:0;left:0;pointer-events:none">`;

    // Draw connectors
    nodes.forEach(node => {
      node.requires.forEach(reqId => {
        const req = nodes.find(n => n.id === reqId);
        if (req) {
          const unlocked = Engine.state.unlockedSkills[node.id];
          const color = unlocked ? tree.color : 'rgba(255,255,255,0.1)';
          svg += `<line x1="${req.x + 35}" y1="${req.y + 35}" x2="${node.x + 35}" y2="${node.y + 35}" stroke="${color}" stroke-width="2" stroke-dasharray="${unlocked ? '0' : '4 4'}"/>`;
        }
      });
    });
    svg += '</svg>';

    // Draw nodes
    let nodesHtml = nodes.map(node => {
      const rank = Engine.state.unlockedSkills[node.id] || 0;
      const isUnlocked = rank > 0;
      const canUnlock = this.canUnlock(node, treeId);
      const isMastered = rank >= node.maxRank;
      let stateClass = 'locked';
      if (isMastered) stateClass = 'mastered';
      else if (isUnlocked) stateClass = 'unlocked';
      else if (canUnlock) stateClass = 'available';

      return `
        <div class="skill-node ${stateClass}"
          style="left:${node.x}px;top:${node.y}px"
          onclick="SkillTree.unlockSkill('${node.id}','${treeId}')"
          onmouseenter="SkillTree.showDetail('${node.id}','${treeId}')"
          onmouseleave="SkillTree.hideDetail()">
          <span class="skill-icon">${node.icon}</span>
          <span class="skill-node-name">${node.name}</span>
          ${node.maxRank > 1 ? `<span style="font-size:9px;color:var(--silver)">${rank}/${node.maxRank}</span>` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = `<div style="position:relative;width:${width}px;height:${height}px;min-width:100%">${svg}${nodesHtml}</div>`;
  },

  canUnlock(node, treeId) {
    if (Engine.state.skillPoints < 1) return false;
    const rank = Engine.state.unlockedSkills[node.id] || 0;
    if (rank >= node.maxRank) return false;
    return node.requires.every(reqId => (Engine.state.unlockedSkills[reqId] || 0) > 0);
  },

  unlockSkill(skillId, treeId) {
    const tree = DATA.skillTrees[treeId];
    const node = tree?.nodes.find(n => n.id === skillId);
    if (!node) return;

    if (!this.canUnlock(node, treeId)) {
      UI.notify('Cannot unlock this skill yet', 'warning');
      return;
    }

    const cost = node.cost || 1;
    if (Engine.state.skillPoints < cost) {
      UI.notify(`Need ${cost} skill points`, 'warning');
      return;
    }

    Engine.state.skillPoints -= cost;
    Engine.state.unlockedSkills[skillId] = (Engine.state.unlockedSkills[skillId] || 0) + 1;
    document.getElementById('skill-points-avail').textContent = Engine.state.skillPoints;
    UI.notify(`Unlocked: ${node.name}!`, 'success');
    this.showTree(treeId);
    Engine.recalcStats();
  },

  showDetail(skillId, treeId) {
    const tree = DATA.skillTrees[treeId];
    const node = tree?.nodes.find(n => n.id === skillId);
    if (!node) return;
    const rank = Engine.state.unlockedSkills[skillId] || 0;
    document.getElementById('skill-detail').innerHTML = `
      <div class="skill-detail-card">
        <div class="skill-title">${node.icon} ${node.name}</div>
        <div class="skill-desc">${node.desc}</div>
        <div style="margin-bottom:8px">
          ${node.effects.map(e => `<div class="skill-effect"><span>✦</span>${e}</div>`).join('')}
        </div>
        <div class="skill-cost">Rank ${rank}/${node.maxRank} • Cost: ${node.cost} point${node.cost > 1 ? 's' : ''}</div>
        ${rank < node.maxRank && this.canUnlock(node, treeId) ? `<button class="btn-small" style="margin-top:8px;width:100%" onclick="SkillTree.unlockSkill('${skillId}','${this.currentTree}')">Unlock (${node.cost} pts)</button>` : ''}
      </div>
    `;
  },

  hideDetail() {}
};

// ---- MAP VIEW ----
const MapView = {
  render() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Background
    ctx.fillStyle = '#0a0810';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(201,168,76,0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Roads between locations
    const roads = [
      ['crossroads', 'ashwick'], ['crossroads', 'ashen_fortress'],
      ['crossroads', 'imperial_city'], ['crossroads', 'ruins'],
      ['ashwick', 'barrows'], ['ashwick', 'ashwood'],
      ['ashen_fortress', 'void_gate'], ['ruins', 'void_gate']
    ];

    const locs = {};
    DATA.locations.forEach(l => locs[l.id] = l);

    roads.forEach(([a, b]) => {
      const la = locs[a], lb = locs[b];
      if (!la || !lb) return;
      ctx.beginPath();
      ctx.moveTo(la.x, la.y);
      ctx.lineTo(lb.x, lb.y);
      ctx.strokeStyle = 'rgba(201,168,76,0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Locations
    DATA.locations.forEach(loc => {
      const isVisited = Engine.state.visitedNodes.length > 0;
      const isCurrent = loc.id === 'crossroads';

      const colors = {
        neutral: '#c9a84c', settlement: '#3dba78', dungeon: '#c0253a',
        city: '#60c8f0', wilderness: '#2d8a5a', boss: '#9040d8'
      };
      const color = colors[loc.type] || '#c9a84c';

      // Glow
      if (isCurrent) {
        const grad = ctx.createRadialGradient(loc.x, loc.y, 0, loc.x, loc.y, 20);
        grad.addColorStop(0, 'rgba(201,168,76,0.3)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(loc.x, loc.y, 20, 0, Math.PI * 2); ctx.fill();
      }

      // Dot
      ctx.beginPath();
      ctx.arc(loc.x, loc.y, isCurrent ? 8 : 6, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = isCurrent ? '#fff' : 'rgba(0,0,0,0.5)';
      ctx.lineWidth = isCurrent ? 2 : 1;
      ctx.stroke();

      // Label
      ctx.fillStyle = isCurrent ? '#fff' : color;
      ctx.font = `${isCurrent ? 'bold ' : ''}11px "Cinzel", serif`;
      ctx.textAlign = 'center';
      ctx.fillText(loc.name, loc.x, loc.y + 20);
    });

    // Legend
    document.getElementById('map-legend').innerHTML = `
      <div class="legend-item"><div class="legend-dot" style="background:#c9a84c"></div>Neutral</div>
      <div class="legend-item"><div class="legend-dot" style="background:#3dba78"></div>Settlement</div>
      <div class="legend-item"><div class="legend-dot" style="background:#c0253a"></div>Dungeon</div>
      <div class="legend-item"><div class="legend-dot" style="background:#60c8f0"></div>City</div>
      <div class="legend-item"><div class="legend-dot" style="background:#9040d8"></div>Boss</div>
    `;

    // Click handler
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      DATA.locations.forEach(loc => {
        if (Math.hypot(mx - loc.x, my - loc.y) < 14) {
          document.getElementById('map-location-info').innerHTML = `
            <strong style="color:var(--gold);font-family:var(--font-display)">${loc.name}</strong>
            <span style="color:var(--silver);font-size:12px;margin-left:8px;text-transform:uppercase">${loc.type}</span>
            <p style="color:var(--parchment);font-size:13px;margin-top:4px;font-style:italic">${loc.desc}</p>
          `;
        }
      });
    };
  }
};
