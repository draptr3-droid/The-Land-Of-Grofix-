// =====================================================
// AETHERMOOR — UI System
// =====================================================

const UI = {
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const screen = document.getElementById(id);
    if (screen) { screen.classList.remove('hidden'); }
  },

  updateHUD() {
    const c = Engine.state.char;
    if (!c) return;
    const hpPct = (c.hp / c.maxHP) * 100;
    const mpPct = (c.mp / c.maxMP) * 100;
    const xpPct = (c.xp / c.xpToNext) * 100;
    document.getElementById('hp-fill').style.width = hpPct + '%';
    document.getElementById('mp-fill').style.width = mpPct + '%';
    document.getElementById('xp-fill').style.width = xpPct + '%';
    document.getElementById('hp-num').textContent = c.hp + '/' + c.maxHP;
    document.getElementById('mp-num').textContent = c.mp + '/' + c.maxMP;
    document.getElementById('xp-num').textContent = c.xp + '/' + c.xpToNext;
    document.getElementById('hud-atk').textContent = c.attack;
    document.getElementById('hud-def').textContent = c.defense;
    document.getElementById('hud-level').textContent = c.level;
    document.getElementById('hud-gold').textContent = Engine.state.gold;
    document.getElementById('hud-portrait').textContent = c.icon || '🧙';
  },

  renderScene(nodeId) {
    const node = DATA.story[nodeId];
    if (!node) return;
    Engine.state.currentNode = nodeId;
    if (!Engine.state.visitedNodes.includes(nodeId)) Engine.state.visitedNodes.push(nodeId);
    if (node.storyFlags) node.storyFlags.forEach(f => Engine.setFlag(f));
    if (node.storyPath) Engine.setStoryPath(node.storyPath);
    if (node.faction) Engine.state.faction = node.faction;
    document.getElementById('scene-bg').style.background = this.getBgStyle(node.bg);
    document.getElementById('scene-title').textContent = node.title || '';
    document.getElementById('scene-art').textContent = node.art || '';
    const textEl = document.getElementById('scene-text');
    textEl.textContent = '';
    this.animateText(textEl, node.text || '');
    this.renderChoices(node.choices || []);
    Engine.state.turnCount++;
    Engine.tickBuffs();
    this.updateHUD();
  },

  animateText(el, text) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = text.slice(0, i);
      i++;
      if (i > text.length) clearInterval(interval);
    }, 18);
  },

  getBgStyle(bg) {
    const styles = {
      'dawn-forest': 'radial-gradient(ellipse at 50% 30%, #3a5a2a 0%, #1a2a10 50%, #0a0806 100%)',
      'battle-dawn': 'radial-gradient(ellipse at 50% 30%, #5a2a1a 0%, #2a1008 50%, #0a0806 100%)',
      'misty-dawn': 'radial-gradient(ellipse at 40% 40%, #2a3a4a 0%, #151e28 50%, #0a0806 100%)',
      'tense-dawn': 'radial-gradient(ellipse at 60% 30%, #4a3a1a 0%, #1a1408 50%, #0a0806 100%)',
      'void-sky': 'radial-gradient(ellipse at 50% 0%, #2a1a4a 0%, #100a20 50%, #050408 100%)',
      'shadow-hall': 'radial-gradient(ellipse at 30% 50%, #1a1228 0%, #0a0812 70%, #050408 100%)',
      'fortress-dark': 'radial-gradient(ellipse at 70% 30%, #281828 0%, #100810 60%, #050408 100%)',
      'village-morning': 'radial-gradient(ellipse at 50% 40%, #3a3020 0%, #1a1810 50%, #0a0806 100%)',
      'inn-interior': 'radial-gradient(ellipse at 40% 60%, #3a2810 0%, #1a1408 50%, #0a0806 100%)',
      'mill-interior': 'radial-gradient(ellipse at 50% 80%, #201808 0%, #100c04 60%, #050402 100%)',
      'world-map': 'radial-gradient(ellipse at 50% 50%, #1a2a4a 0%, #0a1020 60%, #050810 100%)',
      'resistance-camp': 'radial-gradient(ellipse at 30% 60%, #2a1a0a 0%, #100a04 60%, #050402 100%)',
      'imperial-throne': 'radial-gradient(ellipse at 50% 20%, #3a2800 0%, #1a1400 60%, #0a0800 100%)',
      'apocalypse-sky': 'radial-gradient(ellipse at 50% 0%, #4a1a0a 0%, #200808 40%, #050408 100%)',
      'grey-dawn': 'radial-gradient(ellipse at 50% 50%, #2a2828 0%, #101010 60%, #050505 100%)',
      'golden-dawn': 'radial-gradient(ellipse at 50% 30%, #4a3800 0%, #201a00 60%, #0a0800 100%)',
      'void-throne': 'radial-gradient(ellipse at 50% 20%, #2a0a4a 0%, #100020 60%, #050008 100%)',
      'light-breaking': 'radial-gradient(ellipse at 50% 0%, #3a3800 0%, #201e00 50%, #0a0a00 100%)',
    };
    return styles[bg] || 'radial-gradient(ellipse at 50% 50%, #1a1628 0%, #0a0806 100%)';
  },

  renderChoices(choices) {
    const container = document.getElementById('action-choices');
    container.innerHTML = '';
    document.getElementById('action-context').textContent = 'What will you do?';
    choices.forEach(choice => {
      const req = choice.req;
      let locked = false;
      let lockReason = '';
      if (req) {
        if (req.stat && Engine.state.char && Engine.state.char.stats[req.stat] < req.value) {
          locked = true;
          lockReason = 'Requires ' + req.stat.toUpperCase() + ' ' + req.value;
        }
        if (req.flag && !Engine.hasFlag(req.flag)) {
          locked = true;
          lockReason = 'Requirement not met';
        }
      }
      const btn = document.createElement('button');
      btn.className = 'choice-btn ' + (choice.type || '') + (locked ? ' locked-choice' : '');
      btn.innerHTML = choice.text;
      if (lockReason) {
        const reqSpan = document.createElement('span');
        reqSpan.className = 'choice-req ' + (locked ? 'locked' : '');
        reqSpan.textContent = lockReason;
        btn.appendChild(reqSpan);
      }
      if (!locked || (locked && !req.stat)) {
        btn.onclick = () => this.makeChoice(choice);
      } else {
        btn.style.opacity = '0.4';
        btn.disabled = true;
      }
      container.appendChild(btn);
    });
  },

  makeChoice(choice) {
    if (choice.flag) Engine.setFlag(choice.flag);
    if (choice.storyPath) Engine.setStoryPath(choice.storyPath);
    if (choice.faction) { Engine.state.faction = choice.faction; Engine.changeFactionRep(choice.faction, 20); }
    Engine.addJournalEntry('choices', choice.text.replace(/<[^>]+>/g, '').substring(0, 80));
    if (choice.combat && choice.enemy) {
      Combat.start(choice.enemy,
        () => { if (choice.next) this.renderScene(choice.next); },
        () => { this.renderScene(choice.next || 'intro'); }
      );
    } else if (choice.next) {
      const node = DATA.story[choice.next];
      this.renderScene(choice.next);
      if (node && node.ending) {
        setTimeout(() => {
          document.getElementById('action-choices').innerHTML =
            '<button class="choice-btn" onclick="Game.startNewGame()">🔄 Start New Journey</button>' +
            '<button class="choice-btn" onclick="UI.showScreen(\'main-menu\')">🏠 Main Menu</button>';
        }, 500);
      }
    }
  },

  openPanel(name) {
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    const panel = document.getElementById('panel-' + name);
    if (!panel) return;
    panel.classList.remove('hidden');
    if (name === 'inventory') Inventory.render();
    else if (name === 'skilltree') SkillTree.render();
    else if (name === 'journal') Journal.render();
    else if (name === 'map') MapView.render();
    else if (name === 'character') CharSheet.render();
  },

  closePanel(name) {
    const p = document.getElementById('panel-' + name);
    if (p) p.classList.add('hidden');
  },

  notify(message, type) {
    type = type || '';
    const container = document.getElementById('notifications');
    if (!container) return;
    const notif = document.createElement('div');
    notif.className = 'notification ' + type;
    notif.textContent = message;
    container.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transition = 'opacity 0.3s';
      setTimeout(() => notif.remove(), 300);
    }, 2500);
  },

  renderBuffs() {
    const container = document.getElementById('active-buffs');
    if (!container) return;
    container.innerHTML =
      Engine.state.buffs.map(b => '<span class="buff-chip" title="' + b.desc + '">' + b.icon + ' ' + b.name + ' (' + b.duration + ')</span>').join('') +
      Engine.state.debuffs.map(d => '<span class="debuff-chip" title="' + d.desc + '">' + d.icon + ' ' + d.name + ' (' + d.duration + ')</span>').join('');
    const statusEl = document.getElementById('status-effects');
    if (statusEl) statusEl.innerHTML = container.innerHTML;
  },

  showLevelUp(level, bonuses) {
    document.getElementById('levelup-level').textContent = 'You are now Level ' + level + '!';
    document.getElementById('levelup-bonuses').innerHTML = bonuses.map(b =>
      '<div class="levelup-bonus-row"><span class="bonus-name">' + b.name + '</span><span class="bonus-value">' + b.value + '</span></div>'
    ).join('');
    document.getElementById('levelup-modal').classList.remove('hidden');
  },

  closeLevelUp() {
    document.getElementById('levelup-modal').classList.add('hidden');
  }
};

// =====================================================
// INVENTORY
// =====================================================
const Inventory = {
  currentTab: 'all',

  render() {
    this.showTab(this.currentTab);
    const goldEl = document.getElementById('gold-display');
    if (goldEl) goldEl.textContent = '\u25C8 ' + Engine.state.gold + ' Gold';
    const totalWeight = Engine.state.inventory.reduce((a, i) => a + (i.weight || 0) * (i.count || 1), 0);
    const wEl = document.getElementById('carry-weight');
    if (wEl) wEl.textContent = 'Weight: ' + totalWeight.toFixed(1) + '/50';
  },

  showTab(tab) {
    this.currentTab = tab;
    const grid = document.getElementById('inventory-grid');
    if (!grid) return;
    let items = Engine.state.inventory;
    if (tab !== 'all') items = items.filter(i => i.type === tab);
    grid.innerHTML = items.length ? items.map(item =>
      '<div class="inv-slot ' + (item.equipped ? 'equipped' : '') + '" onclick="Inventory.select(\'' + item.id + '\')" title="' + item.name + '">' +
      '<span>' + item.icon + '</span>' +
      '<span class="inv-slot-name">' + item.name.split(' ').slice(-1) + '</span>' +
      (item.count > 1 ? '<span class="item-rarity" style="color:var(--silver)">' + item.count + '</span>' : '') +
      '<span class="item-rarity rarity-' + (item.rarity || 'common') + '">' + ((item.rarity || 'C').charAt(0).toUpperCase()) + '</span>' +
      '</div>'
    ).join('') : '<p style="color:var(--stone);font-style:italic;padding:20px">No items here</p>';
  },

  select(itemId) {
    const item = Engine.state.inventory.find(i => i.id === itemId);
    if (!item) return;
    const det = document.getElementById('item-detail');
    if (!det) return;
    const statsHtml = [
      ['Attack Bonus', item.attack], ['Defense Bonus', item.defense],
      ['Speed Bonus', item.speedBonus], ['Spell Bonus', item.spellBonus],
      ['MP Bonus', item.mpBonus], ['Quantity', item.count > 1 ? item.count : null]
    ].filter(([,v]) => v).map(([k,v]) =>
      '<div class="item-stat">' + k + ' <span>+' + v + '</span></div>'
    ).join('');
    det.innerHTML =
      '<div class="item-detail-card">' +
      '<div class="item-name rarity-' + (item.rarity || 'common') + '">' + item.name + '</div>' +
      '<div class="item-type">' + (item.type || '').toUpperCase() + ' \u2022 ' + (item.rarity || 'common').toUpperCase() + '</div>' +
      '<div class="item-desc">' + item.desc + '</div>' +
      (statsHtml ? '<div class="item-stats">' + statsHtml + '</div>' : '') +
      '<div class="item-actions">' +
      (item.slot ? '<button class="btn-small" onclick="Engine.equipItem(\'' + item.id + '\');Inventory.render()">' + (item.equipped ? 'Unequip' : 'Equip') + '</button>' : '') +
      (item.type === 'consumable' ? '<button class="btn-small" onclick="Inventory.use(\'' + item.id + '\')">Use</button>' : '') +
      '<button class="btn-small" onclick="Inventory.drop(\'' + item.id + '\')">Drop</button>' +
      '</div></div>';
  },

  use(itemId) {
    const item = Engine.state.inventory.find(i => i.id === itemId);
    if (!item) return;
    if (item.effect === 'heal') {
      const result = Engine.rollDiceStr(item.value_roll || '3d8+20');
      Engine.state.char.hp = Math.min(Engine.state.char.maxHP, Engine.state.char.hp + result.total);
      UI.notify('Healed ' + result.total + ' HP', 'success');
      Engine.removeItem(itemId, 1); this.render(); UI.updateHUD();
    } else if (item.effect === 'mana') {
      const result = Engine.rollDiceStr(item.value_roll || '2d6+30');
      Engine.state.char.mp = Math.min(Engine.state.char.maxMP, Engine.state.char.mp + result.total);
      UI.notify('Restored ' + result.total + ' MP', 'success');
      Engine.removeItem(itemId, 1); this.render(); UI.updateHUD();
    }
  },

  drop(itemId) { Engine.removeItem(itemId); this.render(); }
};

// =====================================================
// JOURNAL
// =====================================================
const Journal = {
  currentTab: 'quests',
  render() { this.showTab(this.currentTab); },
  showTab(tab) {
    this.currentTab = tab;
    const list = document.getElementById('journal-list');
    const detail = document.getElementById('journal-detail');
    if (!list) return;
    if (tab === 'quests') {
      const quests = Engine.state.journal.quests || [];
      list.innerHTML = quests.length ? quests.map(q =>
        '<div class="journal-entry ' + (q.status === 'complete' ? 'completed' : '') + '" onclick="Journal.selectQuest(\'' + q.id + '\')">' +
        '<div class="journal-entry-title">' + q.name + '</div>' +
        '<div class="journal-entry-status ' + q.status + '">' + (q.status === 'active' ? 'Active Quest' : '\u2713 Completed') + '</div>' +
        '</div>'
      ).join('') : '<p style="color:var(--stone);font-style:italic;padding:16px">No active quests</p>';
    } else if (tab === 'choices') {
      const choices = Engine.state.journal.choices || [];
      list.innerHTML = choices.length ? choices.map(c =>
        '<div class="journal-entry"><div class="journal-entry-title" style="font-size:12px">' + c.text + '</div></div>'
      ).join('') : '<p style="color:var(--stone);font-style:italic;padding:16px">No choices recorded</p>';
      if (detail) detail.innerHTML = '';
    } else if (tab === 'factions') {
      list.innerHTML = Object.entries(DATA.factions).map(function(entry) {
        var id = entry[0]; var f = entry[1];
        var rep = Engine.getFactionRep(id);
        var label = Engine.getFactionLabel(rep);
        return '<div class="journal-entry">' +
          '<div class="journal-entry-title">' + f.icon + ' ' + f.name + '</div>' +
          '<div class="rep-bar-wrap"><div class="rep-bar ' + label.class + '"><div class="rep-fill" style="width:' + ((rep + 100) / 2) + '%"></div></div></div>' +
          '<div class="journal-entry-status">' + label.label + ' (' + (rep > 0 ? '+' : '') + rep + ')</div>' +
          '</div>';
      }).join('');
      if (detail) detail.innerHTML = '';
    } else if (tab === 'lore') {
      list.innerHTML = '<div class="journal-entry active"><div class="journal-entry-title">The World of Aethermoor</div></div>';
      if (detail) detail.innerHTML = '<div class="journal-detail-card"><p>In an age before memory, the god-smith Vaelthar shattered the Primordial Crystal. These shards became the foundation of all magic and conflict. Now the Veilbreaker Cult seeks to reunite them and unmake creation. Your choices shape what happens next.</p></div>';
    }
  },
  selectQuest(id) {
    const q = Engine.state.journal.quests.find(q => q.id === id);
    if (!q) return;
    const detail = document.getElementById('journal-detail');
    if (!detail) return;
    detail.innerHTML = '<div class="journal-detail-card"><h4>' + q.name + '</h4><p>' + q.desc + '</p>' +
      (q.objectives ? '<div class="journal-objectives"><h5>OBJECTIVES</h5>' +
        q.objectives.map(o => '<div class="journal-obj"><span class="' + (o.done ? 'obj-done' : 'obj-pending') + '">' + (o.done ? '\u2713' : '\u25EF') + '</span> ' + o.text + '</div>').join('') +
      '</div>' : '') + '</div>';
  }
};

// =====================================================
// SKILL TREE
// =====================================================
const SkillTree = {
  currentTree: null,
  render() {
    const c = Engine.state.char;
    if (!c) return;
    const classData = DATA.classes[c.class];
    const trees = (classData && classData.skillTrees) ? classData.skillTrees : ['combat', 'defense'];
    const tabsEl = document.getElementById('skill-tabs');
    if (tabsEl) {
      tabsEl.innerHTML = trees.map(function(t, i) {
        const tree = DATA.skillTrees[t];
        return tree ? '<button class="ptab ' + (i === 0 ? 'active' : '') + '" onclick="SkillTree.showTree(\'' + t + '\')">' + tree.icon + ' ' + tree.name + '</button>' : '';
      }).join('');
    }
    const spEl = document.getElementById('skill-points-avail');
    if (spEl) spEl.textContent = Engine.state.skillPoints;
    this.showTree(trees[0]);
  },
  showTree(treeId) {
    this.currentTree = treeId;
    const tree = DATA.skillTrees[treeId];
    if (!tree) return;
    document.querySelectorAll('#skill-tabs .ptab').forEach(t => {
      t.classList.toggle('active', t.textContent.includes(tree.name));
    });
    const container = document.getElementById('skill-tree-container');
    if (!container) return;
    const nodes = tree.nodes;
    const width = Math.max.apply(null, nodes.map(n => n.x + 120));
    const height = Math.max.apply(null, nodes.map(n => n.y + 120));
    let svg = '<svg width="' + width + '" height="' + height + '" style="position:absolute;top:0;left:0;pointer-events:none">';
    nodes.forEach(node => {
      node.requires.forEach(reqId => {
        const req = nodes.find(n => n.id === reqId);
        if (req) {
          const unlocked = Engine.state.unlockedSkills[node.id];
          const color = unlocked ? tree.color : 'rgba(255,255,255,0.1)';
          svg += '<line x1="' + (req.x+35) + '" y1="' + (req.y+35) + '" x2="' + (node.x+35) + '" y2="' + (node.y+35) + '" stroke="' + color + '" stroke-width="2" stroke-dasharray="' + (unlocked ? '0' : '4 4') + '"/>';
        }
      });
    });
    svg += '</svg>';
    let nodesHtml = nodes.map(node => {
      const rank = Engine.state.unlockedSkills[node.id] || 0;
      const isUnlocked = rank > 0;
      const canUnlock = this.canUnlock(node);
      const isMastered = rank >= node.maxRank;
      let stateClass = 'locked';
      if (isMastered) stateClass = 'mastered';
      else if (isUnlocked) stateClass = 'unlocked';
      else if (canUnlock) stateClass = 'available';
      return '<div class="skill-node ' + stateClass + '" style="left:' + node.x + 'px;top:' + node.y + 'px" onclick="SkillTree.unlockSkill(\'' + node.id + '\',\'' + treeId + '\')" onmouseenter="SkillTree.showDetail(\'' + node.id + '\',\'' + treeId + '\')">' +
        '<span class="skill-icon">' + node.icon + '</span>' +
        '<span class="skill-node-name">' + node.name + '</span>' +
        (node.maxRank > 1 ? '<span style="font-size:9px;color:var(--silver)">' + rank + '/' + node.maxRank + '</span>' : '') +
        '</div>';
    }).join('');
    container.innerHTML = '<div style="position:relative;width:' + width + 'px;height:' + height + 'px;min-width:100%">' + svg + nodesHtml + '</div>';
  },
  canUnlock(node) {
    if (Engine.state.skillPoints < 1) return false;
    const rank = Engine.state.unlockedSkills[node.id] || 0;
    if (rank >= node.maxRank) return false;
    return node.requires.every(reqId => (Engine.state.unlockedSkills[reqId] || 0) > 0);
  },
  unlockSkill(skillId, treeId) {
    const tree = DATA.skillTrees[treeId];
    if (!tree) return;
    const node = tree.nodes.find(n => n.id === skillId);
    if (!node || !this.canUnlock(node)) { UI.notify('Cannot unlock yet', 'warning'); return; }
    const cost = node.cost || 1;
    if (Engine.state.skillPoints < cost) { UI.notify('Need ' + cost + ' skill points', 'warning'); return; }
    Engine.state.skillPoints -= cost;
    Engine.state.unlockedSkills[skillId] = (Engine.state.unlockedSkills[skillId] || 0) + 1;
    const spEl = document.getElementById('skill-points-avail');
    if (spEl) spEl.textContent = Engine.state.skillPoints;
    UI.notify('Unlocked: ' + node.name + '!', 'success');
    this.showTree(treeId);
    Engine.recalcStats();
  },
  showDetail(skillId, treeId) {
    const tree = DATA.skillTrees[treeId];
    if (!tree) return;
    const node = tree.nodes.find(n => n.id === skillId);
    if (!node) return;
    const rank = Engine.state.unlockedSkills[skillId] || 0;
    const det = document.getElementById('skill-detail');
    if (!det) return;
    det.innerHTML = '<div class="skill-detail-card">' +
      '<div class="skill-title">' + node.icon + ' ' + node.name + '</div>' +
      '<div class="skill-desc">' + node.desc + '</div>' +
      node.effects.map(e => '<div class="skill-effect"><span>\u2726</span>' + e + '</div>').join('') +
      '<div class="skill-cost">Rank ' + rank + '/' + node.maxRank + ' \u2022 Cost: ' + node.cost + ' pt' + (node.cost > 1 ? 's' : '') + '</div>' +
      (rank < node.maxRank && this.canUnlock(node) ? '<button class="btn-small" style="margin-top:8px;width:100%" onclick="SkillTree.unlockSkill(\'' + skillId + '\',\'' + this.currentTree + '\')">Unlock (' + node.cost + ' pts)</button>' : '') +
      '</div>';
  }
};

// =====================================================
// MAP VIEW
// =====================================================
const MapView = {
  render() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0810';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(201,168,76,0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    const roads = [
      ['crossroads','ashwick'],['crossroads','ashen_fortress'],
      ['crossroads','imperial_city'],['crossroads','ruins'],
      ['ashwick','barrows'],['ashwick','ashwood'],
      ['ashen_fortress','void_gate'],['ruins','void_gate']
    ];
    const locs = {};
    DATA.locations.forEach(l => { locs[l.id] = l; });
    roads.forEach(function(r) {
      const la = locs[r[0]], lb = locs[r[1]];
      if (!la || !lb) return;
      ctx.beginPath(); ctx.moveTo(la.x,la.y); ctx.lineTo(lb.x,lb.y);
      ctx.strokeStyle = 'rgba(201,168,76,0.15)'; ctx.lineWidth = 1.5;
      ctx.setLineDash([4,6]); ctx.stroke(); ctx.setLineDash([]);
    });
    const colors = { neutral:'#c9a84c', settlement:'#3dba78', dungeon:'#c0253a', city:'#60c8f0', wilderness:'#2d8a5a', boss:'#9040d8' };
    DATA.locations.forEach(loc => {
      const color = colors[loc.type] || '#c9a84c';
      const isCurrent = loc.id === 'crossroads';
      if (isCurrent) {
        const grad = ctx.createRadialGradient(loc.x,loc.y,0,loc.x,loc.y,20);
        grad.addColorStop(0,'rgba(201,168,76,0.3)'); grad.addColorStop(1,'transparent');
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(loc.x,loc.y,20,0,Math.PI*2); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(loc.x,loc.y,isCurrent?8:6,0,Math.PI*2);
      ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = isCurrent?'#fff':'rgba(0,0,0,0.5)'; ctx.lineWidth = isCurrent?2:1; ctx.stroke();
      ctx.fillStyle = isCurrent?'#fff':color;
      ctx.font = (isCurrent?'bold ':'') + '11px Cinzel, serif';
      ctx.textAlign = 'center'; ctx.fillText(loc.name, loc.x, loc.y+20);
    });
    const legend = document.getElementById('map-legend');
    if (legend) {
      legend.innerHTML = Object.entries(colors).map(([type, color]) =>
        '<div class="legend-item"><div class="legend-dot" style="background:' + color + '"></div>' + type.charAt(0).toUpperCase() + type.slice(1) + '</div>'
      ).join('');
    }
    canvas.onclick = function(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      DATA.locations.forEach(loc => {
        if (Math.hypot(mx - loc.x, my - loc.y) < 14) {
          const info = document.getElementById('map-location-info');
          if (info) info.innerHTML = '<strong style="color:var(--gold);font-family:var(--font-display)">' + loc.name + '</strong> <span style="color:var(--silver);font-size:12px">' + loc.type.toUpperCase() + '</span><p style="color:var(--parchment);font-size:13px;margin-top:4px;font-style:italic">' + loc.desc + '</p>';
        }
      });
    };
  }
};

// =====================================================
// CHARACTER SHEET
// =====================================================
const CharSheet = {
  render() {
    const c = Engine.state.char;
    if (!c) return;
    const portraitEl = document.getElementById('char-portrait-large');
    if (portraitEl) portraitEl.textContent = c.icon || '🧙';
    const basicEl = document.getElementById('char-basic-info');
    if (basicEl) {
      basicEl.innerHTML = '<div class="char-section-title">Identity</div>' +
        [['Name',c.name],['Race',(DATA.races[c.race]&&DATA.races[c.race].name)||c.race],
         ['Class',(DATA.classes[c.class]&&DATA.classes[c.class].name)||c.class],
         ['Level',c.level],['Story Path',Engine.state.storyPath]
        ].map(function(kv){ return '<div class="char-stat-row"><span class="char-stat-name">'+kv[0]+'</span><span class="char-stat-value">'+kv[1]+'</span></div>'; }).join('');
    }
    const equipEl = document.getElementById('char-equipment');
    if (equipEl) {
      equipEl.innerHTML = '<div class="char-section-title">Equipment</div>' +
        Object.entries(Engine.state.equipped).map(function(entry){
          var slot=entry[0]; var item=entry[1];
          return '<div class="equip-slot"><span class="equip-slot-icon">'+(item?item.icon:'\u25CB')+'</span><div class="equip-slot-info"><div class="equip-slot-name">'+(item?item.name:'Empty')+'</div><div class="equip-slot-type">'+slot.toUpperCase()+'</div></div></div>';
        }).join('');
    }
    const statsEl = document.getElementById('char-stats-full');
    if (statsEl) {
      statsEl.innerHTML = '<div class="char-section-title">Attributes</div>' +
        Object.entries(c.stats).map(function(entry){
          var k=entry[0]; var v=entry[1];
          var mod=Math.floor((v-10)/2);
          return '<div class="char-stat-row"><span class="char-stat-name">'+k.toUpperCase()+'</span><span class="char-stat-value">'+v+' ('+(mod>=0?'+':'')+mod+')</span></div>';
        }).join('') +
        '<div class="char-section-title" style="margin-top:12px">Combat Stats</div>' +
        [['HP',c.hp+'/'+c.maxHP],['MP',c.mp+'/'+c.maxMP],['Attack',c.attack],['Defense',c.defense],
         ['Speed',c.speed],['Crit',c.critChance+'%'],['Skill Points',Engine.state.skillPoints]
        ].map(function(kv){ return '<div class="char-stat-row"><span class="char-stat-name">'+kv[0]+'</span><span class="char-stat-value">'+kv[1]+'</span></div>'; }).join('');
    }
    const traitsEl = document.getElementById('char-traits');
    if (traitsEl && c.passives) {
      traitsEl.innerHTML = '<div class="char-section-title">Traits & Passives</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">' +
        (c.traits||[]).map(t => '<span class="trait-chip">\u2726 '+t+'</span>').join('') + '</div>' +
        c.passives.map(p => '<div style="margin-bottom:6px;font-size:13px"><span style="color:var(--gold)">'+p.icon+' '+p.name+':</span> <span style="color:var(--parchment)">'+p.desc+'</span></div>').join('');
    }
    const repEl = document.getElementById('char-reputation');
    if (repEl) {
      repEl.innerHTML = '<div class="char-section-title">Faction Standing</div>' +
        Object.entries(DATA.factions).map(function(entry){
          var id=entry[0]; var f=entry[1];
          var rep=Engine.getFactionRep(id);
          var label=Engine.getFactionLabel(rep);
          return '<div class="rep-bar-wrap"><div class="rep-faction"><span>'+f.icon+' '+f.name+'</span><span style="color:var(--silver)">'+label.label+'</span></div><div class="rep-bar '+label.class+'"><div class="rep-fill" style="width:'+((rep+100)/2)+'%"></div></div></div>';
        }).join('');
    }
    const buffsEl = document.getElementById('char-buffs-debuffs');
    if (buffsEl) {
      const all = [...Engine.state.buffs, ...Engine.state.debuffs];
      buffsEl.innerHTML = '<div class="char-section-title">Active Effects</div>' +
        (all.length ? all.map(b =>
          '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04)">' +
          '<span style="color:'+(b.effects.hpDrainPerTurn?'var(--rose)':'var(--emerald)')+'">'+b.icon+' '+b.name+'</span>' +
          '<span style="color:var(--silver)">'+b.duration+' turns</span></div>'
        ).join('') : '<p style="color:var(--stone);font-size:12px;font-style:italic">No active effects</p>');
    }
  }
};
