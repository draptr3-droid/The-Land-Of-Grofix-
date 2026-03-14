// =====================================================
// AETHERMOOR — Combat System
// =====================================================

const Combat = {
  enemy: null,
  turn: 'player',
  round: 0,
  activeTab: 'attack',

  // ---- START COMBAT ----
  start(enemyId, onWin, onLose) {
    const enemyData = DATA.enemies[enemyId];
    if (!enemyData) return;

    this.enemy = {
      ...enemyData,
      currentHP: enemyData.hp,
      currentMP: enemyData.mp || 0,
      buffs: [], debuffs: []
    };
    this.onWin = onWin;
    this.onLose = onLose;
    this.turn = 'player';
    this.round = 1;
    this.activeTab = 'attack';

    Engine.state.inCombat = true;
    this.renderCombat();
    document.getElementById('combat-overlay').classList.remove('hidden');
    this.logMessage(`⚔ Combat begins! Round ${this.round}`, '');
    this.logMessage(`You face ${this.enemy.name}!`, 'status');
    this.renderActions();
  },

  // ---- RENDER COMBAT ----
  renderCombat() {
    const c = Engine.state.char;
    if (!c) return;

    // Player
    document.getElementById('player-combat-name').textContent = c.name;
    document.getElementById('player-combat-art').textContent = c.icon || '🧙';
    document.getElementById('player-hp-bar').style.width = `${(c.hp / c.maxHP) * 100}%`;
    document.getElementById('player-mp-bar').style.width = `${(c.mp / c.maxMP) * 100}%`;

    // Enemy
    document.getElementById('enemy-combat-name').textContent = this.enemy.name;
    document.getElementById('enemy-combat-art').textContent = this.enemy.icon;
    document.getElementById('enemy-hp-bar').style.width = `${(this.enemy.currentHP / this.enemy.hp) * 100}%`;
    document.getElementById('enemy-mp-bar').style.width = `${(this.enemy.currentMP / this.enemy.mp) * 100 || 0}%`;
  },

  // ---- ACTIONS ----
  renderActions() {
    const tab = this.activeTab;
    const c = Engine.state.char;
    const content = document.getElementById('combat-action-content');
    document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.ctab[onclick*="${tab}"]`)?.classList.add('active');

    if (tab === 'attack') {
      const mainhand = Engine.state.equipped.mainhand;
      content.innerHTML = `
        <button class="combat-action-btn" onclick="Combat.playerAttack('basic')">⚔ Basic Attack${mainhand ? ` (${mainhand.name})` : ''}</button>
        <button class="combat-action-btn" onclick="Combat.playerAttack('heavy')">💥 Heavy Strike<br><small>+50% dmg, -20% hit</small></button>
        <button class="combat-action-btn" onclick="Combat.playerAttack('rapid')">⚡ Rapid Attack<br><small>2 attacks, 70% each</small></button>
      `;
    } else if (tab === 'skills') {
      const unlockedSkills = Object.keys(Engine.state.unlockedSkills);
      let html = unlockedSkills.length
        ? unlockedSkills.map(id => {
            const skill = this.findSkill(id);
            return skill ? `<button class="combat-action-btn" onclick="Combat.useSkill('${id}')">${skill.icon} ${skill.name}</button>` : '';
          }).join('')
        : '<p style="color:var(--silver);font-size:13px;padding:8px">No combat skills unlocked yet.<br>Spend points in the Skill Tree!</p>';
      content.innerHTML = html;
    } else if (tab === 'items') {
      const consumables = Engine.state.inventory.filter(i => i.type === 'consumable');
      content.innerHTML = consumables.length
        ? consumables.map(i => `<button class="combat-action-btn" onclick="Combat.useItem('${i.id}')">${i.icon} ${i.name} (${i.count || 1})</button>`).join('')
        : '<p style="color:var(--silver);font-size:13px;padding:8px">No consumables in inventory.</p>';
    } else if (tab === 'flee') {
      content.innerHTML = `
        <button class="combat-action-btn" onclick="Combat.flee()">💨 Attempt Escape<br><small>DEX check vs enemy speed</small></button>
        <button class="combat-action-btn" onclick="Combat.surrender()">🏳 Surrender<br><small>Lose gold, end combat</small></button>
      `;
    }
  },

  showTab(tab) {
    this.activeTab = tab;
    this.renderActions();
  },

  findSkill(id) {
    for (const tree of Object.values(DATA.skillTrees)) {
      const node = tree.nodes.find(n => n.id === id);
      if (node) return node;
    }
    return null;
  },

  // ---- PLAYER ATTACKS ----
  playerAttack(type) {
    if (this.turn !== 'player') return;
    const c = Engine.state.char;
    let dmgMult = 1;
    let hitChance = 85;

    if (type === 'heavy') { dmgMult = 1.5; hitChance = 65; }
    if (type === 'rapid') {
      this.performHit(c, this.enemy, 0.7);
      this.performHit(c, this.enemy, 0.7);
      this.endPlayerTurn();
      return;
    }

    const hit = Math.random() * 100 < hitChance;
    if (!hit) {
      this.logMessage(`${c.name} swings and misses!`, 'miss');
    } else {
      this.performHit(c, this.enemy, dmgMult);
    }
    this.endPlayerTurn();
  },

  performHit(attacker, target, mult = 1) {
    const isPlayer = attacker === Engine.state.char;
    const baseAtk = isPlayer ? attacker.attack * Engine.getStatMod('attack') : attacker.attack;
    const baseDef = isPlayer ? target.currentHP : attacker.defense * Engine.getStatMod('defense');
    const def = isPlayer ? (this.enemy.defense || 0) : (Engine.state.char.defense || 0);
    const rawDmg = Math.max(1, (baseAtk * mult) - def * 0.5 + (Math.random() * 4 - 2));
    let dmg = Math.floor(rawDmg);
    const isCrit = Math.random() * 100 < (isPlayer ? (attacker.critChance || 5) : 5);

    if (isCrit) {
      dmg = Math.floor(dmg * (attacker.critMult || 2.0));
      this.logMessage(`💥 CRITICAL HIT! ${isPlayer ? attacker.name : target.name} takes ${dmg} damage!`, 'crit');
    } else {
      this.logMessage(`${isPlayer ? attacker.name : this.enemy.name} deals ${dmg} damage!`, 'damage');
    }

    if (isPlayer) {
      this.enemy.currentHP = Math.max(0, this.enemy.currentHP - dmg);
      this.animateHit('enemy');
    } else {
      Engine.state.char.hp = Math.max(0, Engine.state.char.hp - dmg);
      this.animateHit('player');
    }
    this.renderCombat();
    this.checkCombatEnd();
  },

  animateHit(side) {
    const el = document.getElementById(`${side}-combatant`);
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake 0.3s ease';
    setTimeout(() => el.style.animation = '', 300);
  },

  useItem(itemId) {
    if (this.turn !== 'player') return;
    const item = Engine.state.inventory.find(i => i.id === itemId);
    if (!item) return;

    if (item.effect === 'heal') {
      const { total } = Engine.rollDiceStr(item.value_roll || '3d8+20');
      Engine.state.char.hp = Math.min(Engine.state.char.maxHP, Engine.state.char.hp + total);
      this.logMessage(`Used ${item.name}: Restored ${total} HP!`, 'heal');
    } else if (item.effect === 'mana') {
      const { total } = Engine.rollDiceStr(item.value_roll || '2d6+30');
      Engine.state.char.mp = Math.min(Engine.state.char.maxMP, Engine.state.char.mp + total);
      this.logMessage(`Used ${item.name}: Restored ${total} MP!`, 'heal');
    } else if (item.effect === 'stealth') {
      Engine.applyBuff('invisible');
      this.logMessage(`Used ${item.name}: You vanish into shadow!`, 'magic');
    } else if (item.effect === 'regen') {
      Engine.applyBuff('regenerating');
    }

    Engine.removeItem(itemId, 1);
    this.renderCombat();
    this.endPlayerTurn();
  },

  useSkill(skillId) {
    if (this.turn !== 'player') return;
    const skill = this.findSkill(skillId);
    if (!skill) return;
    const c = Engine.state.char;
    const mpCost = (skill.cost || 1) * 10;

    if (c.mp < mpCost) {
      this.logMessage('Not enough MP!', 'miss');
      return;
    }
    c.mp -= mpCost;
    this.logMessage(`${c.name} uses ${skill.icon} ${skill.name}!`, 'magic');

    // Skill effects
    if (skill.id === 'power_strike') { this.performHit(c, this.enemy, 1.5 * Engine.state.unlockedSkills[skillId]); }
    else if (skill.id === 'backstab') { this.performHit(c, this.enemy, 5); }
    else if (skill.id === 'fire_bolt' || skill.id === 'arcane_bolt') {
      const dmg = Math.floor((Math.random() * 8 + c.stats.int) * Engine.state.unlockedSkills[skillId]);
      this.enemy.currentHP = Math.max(0, this.enemy.currentHP - dmg);
      this.logMessage(`Spell hits for ${dmg} magical damage!`, 'magic');
      this.animateHit('enemy');
    } else if (skill.id === 'lay_hands') {
      const heal = Math.floor(c.stats.cha * 5 * Engine.state.unlockedSkills[skillId]);
      c.hp = Math.min(c.maxHP, c.hp + heal);
      this.logMessage(`Lay on Hands heals ${heal} HP!`, 'heal');
    } else { this.performHit(c, this.enemy, 1.3); }

    this.renderCombat();
    this.checkCombatEnd();
    if (!Engine.state.inCombat) return;
    this.endPlayerTurn();
  },

  flee() {
    const c = Engine.state.char;
    const check = Engine.rollCheck('dex', 10 + Math.floor(this.enemy.speed / 2));
    if (check.success) {
      this.logMessage(`${c.name} escapes!`, 'status');
      setTimeout(() => this.endCombat(false, true), 800);
    } else {
      this.logMessage(`Escape failed! (Roll: ${check.roll} + ${check.mod} = ${check.total} vs DC ${check.dc})`, 'miss');
      this.endPlayerTurn();
    }
  },

  surrender() {
    const lostGold = Math.floor(Engine.state.gold * 0.3);
    Engine.state.gold -= lostGold;
    this.logMessage(`You surrender. Lost ${lostGold} gold.`, 'status');
    setTimeout(() => this.endCombat(false, false), 800);
  },

  // ---- ENEMY TURN ----
  endPlayerTurn() {
    Engine.tickBuffs();
    if (!Engine.state.inCombat) return;
    this.turn = 'enemy';
    setTimeout(() => this.enemyTurn(), 1000);
  },

  enemyTurn() {
    if (!this.enemy || this.enemy.currentHP <= 0) return;
    const c = Engine.state.char;

    // Enemy AI
    const roll = Math.random();
    if (roll < 0.6) {
      // Basic attack
      this.logMessage(`${this.enemy.name} attacks!`, 'status');
      const hit = Math.random() < 0.8;
      if (hit) { this.performHit(this.enemy, c, 1); }
      else { this.logMessage(`${this.enemy.name} misses!`, 'miss'); }
    } else if (roll < 0.8 && this.enemy.abilities?.length) {
      // Special ability
      const ability = this.enemy.abilities[Math.floor(Math.random() * this.enemy.abilities.length)];
      this.logMessage(`${this.enemy.name} uses ${ability}!`, 'magic');
      if (ability === 'Regenerate') {
        const heal = Math.floor(this.enemy.hp * 0.1);
        this.enemy.currentHP = Math.min(this.enemy.hp, this.enemy.currentHP + heal);
        this.logMessage(`${this.enemy.name} regenerates ${heal} HP!`, 'heal');
      } else if (ability === 'Fear Aura' || ability === 'Terrify') {
        Engine.applyDebuff('feared');
      } else if (ability === 'Life Drain') {
        const drain = Math.floor(c.maxHP * 0.08);
        c.hp = Math.max(1, c.hp - drain);
        this.enemy.currentHP = Math.min(this.enemy.hp, this.enemy.currentHP + drain);
        this.logMessage(`Life Drain deals ${drain} damage and heals the enemy!`, 'magic');
      } else if (ability === 'Hex' || ability === 'Curse') {
        Engine.applyDebuff('hexed');
      } else {
        this.performHit(this.enemy, c, 1.3);
      }
    } else {
      // Taunt
      const taunts = ['grimaces menacingly', 'lets out a blood-curdling shriek', 'circles you slowly', 'seems to gather strength'];
      this.logMessage(`${this.enemy.name} ${taunts[Math.floor(Math.random() * taunts.length)]}.`, 'status');
    }

    this.renderCombat();
    if (!this.checkCombatEnd()) {
      this.turn = 'player';
      this.round++;
      this.logMessage(`--- Round ${this.round} ---`, 'status');
    }
  },

  // ---- COMBAT END ----
  checkCombatEnd() {
    if (this.enemy.currentHP <= 0) {
      this.logMessage(`${this.enemy.name} has been defeated!`, 'crit');
      setTimeout(() => this.endCombat(true), 800);
      Engine.state.inCombat = false;
      return true;
    }
    if (Engine.state.char.hp <= 0) {
      this.logMessage(`${Engine.state.char.name} has fallen!`, 'damage');
      setTimeout(() => this.endCombat(false, false, true), 800);
      Engine.state.inCombat = false;
      return true;
    }
    return false;
  },

  endCombat(victory, escaped = false, dead = false) {
    document.getElementById('combat-overlay').classList.add('hidden');
    Engine.state.inCombat = false;

    if (victory) {
      Engine.gainXP(this.enemy.xp);
      const gold = Engine.gainGold(this.enemy.gold[0], this.enemy.gold[1]);
      this.logMessage(`Victory! +${this.enemy.xp} XP, +${gold} Gold`, 'crit');
      if (this.onWin) this.onWin();
    } else if (dead) {
      Engine.state.char.hp = Math.floor(Engine.state.char.maxHP * 0.3);
      UI.notify('You\'ve been defeated... but survived.', 'warning');
      if (this.onLose) this.onLose();
    } else if (escaped) {
      UI.notify('Escaped successfully!', 'success');
    }
    UI.updateHUD();
  },

  logMessage(msg, type) {
    const log = document.getElementById('combat-log');
    if (!log) return;
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = msg;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }
};

// Helper on Engine for dice string parsing
Engine.rollDiceStr = function(str) {
  const match = str.match(/(\d+)d(\d+)(?:\+(\d+))?/);
  if (!match) return { total: parseInt(str) || 0, rolls: [] };
  const count = parseInt(match[1]);
  const sides = parseInt(match[2]);
  const bonus = parseInt(match[3] || 0);
  let total = bonus;
  const rolls = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * sides) + 1;
    rolls.push(r); total += r;
  }
  return { total, rolls };
};
