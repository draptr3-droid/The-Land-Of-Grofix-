// =====================================================
// AETHERMOOR — Core Game Engine
// =====================================================

const Engine = {
  // ---- STATE ----
  state: {
    char: null,
    currentNode: 'intro',
    storyFlags: {},
    storyPath: 'neutral',
    faction: null,
    factionRep: {},
    journal: { quests: [], lore: [], choices: [] },
    visitedNodes: [],
    turnCount: 0,
    inCombat: false,
    gold: 50,
    inventory: [],
    equipped: { mainhand: null, chest: null, head: null, hands: null, feet: null, ring: null },
    skillPoints: 0,
    unlockedSkills: {},
    buffs: [],
    debuffs: [],
    knownEnemies: []
  },

  // ---- CHARACTER TEMPLATE ----
  createCharacter(race, cls, origin, attrs, appearance, name) {
    const raceData = DATA.races[race];
    const classData = DATA.classes[cls];
    const originData = DATA.origins.find(o => o.id === origin);

    // Base stats combined from race + class
    const stats = {
      str: 8 + (raceData.stats.str || 0) + (originData?.stats.str || 0),
      dex: 8 + (raceData.stats.dex || 0) + (originData?.stats.dex || 0),
      con: 8 + (raceData.stats.con || 0) + (originData?.stats.con || 0),
      int: 8 + (raceData.stats.int || 0) + (originData?.stats.int || 0),
      wis: 8 + (raceData.stats.wis || 0) + (originData?.stats.wis || 0),
      cha: 8 + (raceData.stats.cha || 0) + (originData?.stats.cha || 0)
    };

    // Add attribute point distribution
    Object.keys(attrs).forEach(k => { stats[k] = (stats[k] || 8) + attrs[k]; });

    // Derived stats
    const maxHP = classData.startingStats.hp + Math.floor((stats.con - 10) / 2) * 10;
    const maxMP = classData.startingStats.mp + Math.floor((stats.int - 10) / 2) * 8;
    const attack = classData.startingStats.attack + Math.floor((stats.str - 10) / 2) + Math.floor((stats.dex - 10) / 2);
    const defense = classData.startingStats.defense + Math.floor((stats.con - 10) / 2);
    const speed = classData.startingStats.speed + Math.floor((stats.dex - 10) / 2);

    return {
      name, race, class: cls, origin,
      level: 1, xp: 0, xpToNext: 100,
      stats,
      hp: maxHP, maxHP,
      mp: maxMP, maxMP,
      attack, defense, speed,
      critChance: 5 + Math.floor((stats.dex - 10) / 2),
      critMult: 2.0,
      appearance,
      passives: [...raceData.passives],
      traits: [...raceData.traits],
      icon: raceData.icon
    };
  },

  // ---- LEVELING ----
  gainXP(amount) {
    if (!this.state.char) return;
    // Human XP bonus
    if (this.state.char.race === 'human') amount = Math.floor(amount * 1.1);
    this.state.char.xp += amount;
    UI.notify(`+${amount} XP`, 'xp');
    UI.updateHUD();
    while (this.state.char.xp >= this.state.char.xpToNext) {
      this.levelUp();
    }
  },

  levelUp() {
    const c = this.state.char;
    c.xp -= c.xpToNext;
    c.level++;
    c.xpToNext = Math.floor(100 * Math.pow(1.5, c.level - 1));

    const classData = DATA.classes[c.class];
    const hpGain = classData.hpPerLevel + Math.floor((c.stats.con - 10) / 2) * 2;
    const mpGain = classData.mpPerLevel + Math.floor((c.stats.int - 10) / 2);
    c.maxHP += hpGain; c.hp = c.maxHP;
    c.maxMP += mpGain; c.mp = c.maxMP;
    c.attack += 1 + (c.level % 3 === 0 ? 1 : 0);
    c.defense += c.level % 4 === 0 ? 1 : 0;

    // Skill points per level (human gets 2 extra)
    let spGain = 1 + (c.race === 'human' ? 2 : 0) + (DATA.races[c.race]?.bonusSkillPoints || 0);
    this.state.skillPoints += spGain;

    UI.showLevelUp(c.level, [
      { name: 'Max HP', value: `+${hpGain}` },
      { name: 'Max MP', value: `+${mpGain}` },
      { name: 'Attack', value: `+${1 + (c.level % 3 === 0 ? 1 : 0)}` },
      { name: 'Skill Points', value: `+${spGain}` }
    ]);
    UI.notify(`LEVEL ${c.level}!`, 'level');
  },

  // ---- GOLD ----
  gainGold(min, max) {
    const amount = min + Math.floor(Math.random() * (max - min + 1));
    this.state.gold += amount;
    UI.notify(`+${amount} Gold`, 'item');
    UI.updateHUD();
    return amount;
  },

  spendGold(amount) {
    if (this.state.gold < amount) return false;
    this.state.gold -= amount;
    UI.updateHUD();
    return true;
  },

  // ---- INVENTORY ----
  addItem(itemId, count = 1) {
    const item = DATA.items[itemId];
    if (!item) return;
    const existing = this.state.inventory.find(i => i.id === itemId);
    if (existing && item.type === 'consumable') {
      existing.count = (existing.count || 1) + count;
    } else {
      this.state.inventory.push({ ...item, count: item.type === 'consumable' ? count : 1 });
    }
    UI.notify(`Obtained: ${item.name}`, 'item');
  },

  removeItem(itemId, count = 1) {
    const idx = this.state.inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return false;
    const item = this.state.inventory[idx];
    if (item.count && item.count > count) {
      item.count -= count;
    } else {
      this.state.inventory.splice(idx, 1);
    }
    return true;
  },

  equipItem(itemId) {
    const item = this.state.inventory.find(i => i.id === itemId);
    if (!item || !item.slot) return;
    // Unequip current
    const current = this.state.equipped[item.slot];
    if (current) current.equipped = false;
    // Equip new
    this.state.equipped[item.slot] = item;
    item.equipped = true;
    this.recalcStats();
    UI.notify(`Equipped: ${item.name}`, 'item');
  },

  recalcStats() {
    if (!this.state.char) return;
    const c = this.state.char;
    const classData = DATA.classes[c.class];
    let atk = classData.startingStats.attack + Math.floor((c.stats.str - 10) / 2) + Math.floor((c.stats.dex - 10) / 2) + ((c.level - 1) * 1);
    let def = classData.startingStats.defense + Math.floor((c.stats.con - 10) / 2);
    let spd = classData.startingStats.speed + Math.floor((c.stats.dex - 10) / 2);

    Object.values(this.state.equipped).forEach(item => {
      if (!item) return;
      if (item.attack) atk += item.attack;
      if (item.defense) def += item.defense;
      if (item.speedBonus) spd += item.speedBonus;
    });

    // Skill bonuses
    Object.entries(this.state.unlockedSkills).forEach(([id, rank]) => {
      // Applied per skill type
    });

    c.attack = atk; c.defense = def; c.speed = spd;
    UI.updateHUD();
  },

  // ---- BUFFS ----
  applyBuff(buffId) {
    const buff = DATA.buffs[buffId];
    if (!buff) return;
    const existing = this.state.buffs.find(b => b.id === buffId);
    if (existing) { existing.duration = buff.duration; return; }
    this.state.buffs.push({ ...buff });
    UI.notify(`${buff.name} applied!`, 'success');
    UI.renderBuffs();
  },

  applyDebuff(debuffId) {
    const debuff = DATA.buffs[debuffId];
    if (!debuff) return;
    this.state.debuffs.push({ ...debuff });
    UI.notify(`${debuff.name}!`, 'warning');
    UI.renderBuffs();
  },

  tickBuffs() {
    this.state.buffs = this.state.buffs.filter(b => {
      b.duration--;
      if (b.effects.hpRegenPerTurn) {
        const heal = Math.min(b.effects.hpRegenPerTurn, this.state.char.maxHP - this.state.char.hp);
        this.state.char.hp += heal;
        if (heal > 0) UI.notify(`Healed ${heal} HP`, 'success');
      }
      return b.duration > 0;
    });
    this.state.debuffs = this.state.debuffs.filter(d => {
      d.duration--;
      if (d.effects.hpDrainPerTurn) {
        this.state.char.hp = Math.max(1, this.state.char.hp - d.effects.hpDrainPerTurn);
        UI.notify(`${d.name} deals ${d.effects.hpDrainPerTurn} damage`, 'damage');
      }
      return d.duration > 0;
    });
    UI.renderBuffs();
    UI.updateHUD();
  },

  getStatMod(stat) {
    let mod = 1;
    [...this.state.buffs, ...this.state.debuffs].forEach(b => {
      if (b.effects[stat + 'Mod']) mod *= b.effects[stat + 'Mod'];
      if (b.effects.allMod) mod *= b.effects.allMod;
    });
    return mod;
  },

  // ---- STORY FLAGS ----
  setFlag(flag, value = true) {
    this.state.storyFlags[flag] = value;
  },

  hasFlag(flag) {
    return !!this.state.storyFlags[flag];
  },

  setStoryPath(path) {
    this.state.storyPath = path;
    this.addJournalEntry('choices', `You chose the path of: ${path}`);
  },

  // ---- FACTION REP ----
  changeFactionRep(factionId, amount) {
    if (!this.state.factionRep[factionId]) this.state.factionRep[factionId] = DATA.factions[factionId]?.startRep || 0;
    this.state.factionRep[factionId] = Math.max(-100, Math.min(100, this.state.factionRep[factionId] + amount));
    const faction = DATA.factions[factionId];
    if (faction) UI.notify(`${faction.name}: ${amount > 0 ? '+' : ''}${amount} reputation`, amount > 0 ? 'success' : 'warning');
  },

  getFactionRep(factionId) {
    return this.state.factionRep[factionId] || 0;
  },

  getFactionLabel(rep) {
    if (rep <= -75) return { label: 'Hostile', class: 'rep-hostile' };
    if (rep <= -25) return { label: 'Unfriendly', class: 'rep-unfriendly' };
    if (rep <= 25) return { label: 'Neutral', class: 'rep-neutral' };
    if (rep <= 75) return { label: 'Friendly', class: 'rep-friendly' };
    return { label: 'Exalted', class: 'rep-exalted' };
  },

  // ---- JOURNAL ----
  addJournalEntry(type, text) {
    if (!this.state.journal[type]) this.state.journal[type] = [];
    this.state.journal[type].push({ text, time: this.state.turnCount });
  },

  addQuest(quest) {
    this.state.journal.quests.push({ ...quest, status: 'active', objectives: quest.objectives.map(o => ({ ...o, done: false })) });
    UI.notify(`New Quest: ${quest.name}`, 'item');
  },

  completeQuest(questId) {
    const q = this.state.journal.quests.find(q => q.id === questId);
    if (q) {
      q.status = 'complete';
      this.gainXP(q.xpReward || 100);
      if (q.goldReward) this.gainGold(q.goldReward, q.goldReward);
      UI.notify(`Quest Complete: ${q.name}!`, 'success');
    }
  },

  // ---- DICE ----
  rollDice(sides, count = 1) {
    let total = 0;
    const rolls = [];
    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }
    return { total, rolls };
  },

  rollCheck(stat, dc) {
    const statValue = this.state.char?.stats[stat] || 10;
    const mod = Math.floor((statValue - 10) / 2);
    const roll = this.rollDice(20).total;
    const total = roll + mod;
    return { success: total >= dc, roll, mod, total, dc };
  },

  // ---- SAVE / LOAD ----
  save() {
    try {
      localStorage.setItem('aethermoor_save', JSON.stringify(this.state));
      UI.notify('Game saved', 'success');
    } catch(e) { console.warn('Save failed:', e); }
  },

  load() {
    try {
      const saved = localStorage.getItem('aethermoor_save');
      if (saved) {
        this.state = JSON.parse(saved);
        return true;
      }
    } catch(e) { console.warn('Load failed:', e); }
    return false;
  }
};
