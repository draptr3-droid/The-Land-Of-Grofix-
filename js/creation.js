// =====================================================
// AETHERMOOR — Character Creation
// =====================================================

const CharCreation = {
  step: 1,
  maxStep: 6,
  selections: {
    race: null, class: null, origin: null,
    attrs: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    appearance: { skin: null, hair: null, eyes: null, body: null },
    name: ''
  },
  pointsTotal: 27,
  pointsSpent: 0,

  init() {
    this.renderRaces();
    this.renderClasses();
    this.renderOrigins();
    this.renderAttributes();
  },

  // ---- STEP NAVIGATION ----
  nextStep() {
    if (!this.validateStep()) return;
    if (this.step < this.maxStep) {
      this.step++;
      this.updateSteps();
    } else {
      this.finish();
    }
  },

  prevStep() {
    if (this.step > 1) { this.step--; this.updateSteps(); }
  },

  updateSteps() {
    document.querySelectorAll('.creation-step').forEach((el, i) => {
      el.classList.toggle('hidden', i + 1 !== this.step);
    });
    document.querySelectorAll('.step').forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i + 1 === this.step) el.classList.add('active');
      if (i + 1 < this.step) el.classList.add('done');
    });

    document.getElementById('btn-back').disabled = this.step === 1;
    const nextBtn = document.getElementById('btn-next');
    nextBtn.textContent = this.step === this.maxStep ? '⚔ Begin Your Legend' : 'Next →';

    if (this.step === 5) this.renderAppearance();
    if (this.step === 6) this.renderDestiny();
  },

  validateStep() {
    if (this.step === 1 && !this.selections.race) { UI.notify('Choose a race', 'warning'); return false; }
    if (this.step === 2 && !this.selections.class) { UI.notify('Choose a class', 'warning'); return false; }
    if (this.step === 3 && !this.selections.origin) { UI.notify('Choose an origin', 'warning'); return false; }
    return true;
  },

  // ---- STEP 1: RACES ----
  renderRaces() {
    const grid = document.getElementById('race-grid');
    if (!grid) return;
    grid.innerHTML = Object.values(DATA.races).map(race => `
      <div class="race-card" id="race-${race.id}" onclick="CharCreation.selectRace('${race.id}')">
        <span class="race-icon">${race.icon}</span>
        <div class="race-name">${race.name}</div>
        <div class="race-tagline">${race.tagline}</div>
      </div>
    `).join('');
  },

  selectRace(id) {
    this.selections.race = id;
    document.querySelectorAll('.race-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`race-${id}`)?.classList.add('selected');

    const race = DATA.races[id];
    const det = document.getElementById('race-detail');
    if (!det || !race) return;
    det.innerHTML = `
      <div style="display:flex;gap:16px;align-items:flex-start">
        <span style="font-size:48px">${race.icon}</span>
        <div style="flex:1">
          <h4 style="font-family:var(--font-display);color:var(--gold);font-size:18px;margin-bottom:6px">${race.name}</h4>
          <p style="font-size:14px;color:var(--parchment);font-style:italic;margin-bottom:12px;line-height:1.7">${race.description}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
            ${Object.entries(race.stats).filter(([,v]) => v !== 0).map(([k,v]) =>
              `<div style="font-family:var(--font-display);font-size:12px">
                <span style="color:var(--silver)">${k.toUpperCase()}</span>
                <span style="color:${v > 0 ? 'var(--emerald)' : 'var(--rose)'};margin-left:6px">${v > 0 ? '+' : ''}${v}</span>
              </div>`
            ).join('')}
          </div>
          <div>
            ${race.passives.map(p => `
              <div style="margin-bottom:6px;font-size:13px">
                <span style="color:var(--gold)">${p.icon} ${p.name}:</span>
                <span style="color:var(--parchment)"> ${p.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    // Update portrait
    this.updatePortrait();
  },

  // ---- STEP 2: CLASSES ----
  renderClasses() {
    const grid = document.getElementById('class-grid');
    if (!grid) return;
    grid.innerHTML = Object.values(DATA.classes).map(cls => `
      <div class="class-card" id="class-${cls.id}" onclick="CharCreation.selectClass('${cls.id}')">
        <span class="class-icon">${cls.icon}</span>
        <div class="class-name">${cls.name}</div>
        <div class="class-role">${cls.role}</div>
      </div>
    `).join('');
  },

  selectClass(id) {
    this.selections.class = id;
    document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`class-${id}`)?.classList.add('selected');

    const cls = DATA.classes[id];
    const det = document.getElementById('class-detail');
    if (!det || !cls) return;
    det.innerHTML = `
      <div style="display:flex;gap:16px;align-items:flex-start">
        <span style="font-size:48px">${cls.icon}</span>
        <div style="flex:1">
          <h4 style="font-family:var(--font-display);color:var(--gold);font-size:18px;margin-bottom:4px">${cls.name}</h4>
          <div style="font-family:var(--font-display);font-size:11px;color:var(--silver);letter-spacing:2px;margin-bottom:10px">${cls.role}</div>
          <p style="font-size:14px;color:var(--parchment);font-style:italic;margin-bottom:12px;line-height:1.7">${cls.description}</p>
          <p style="font-size:12px;color:var(--silver);margin-bottom:12px">${cls.playstyle}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;font-family:var(--font-display)">
            <div><span style="color:var(--silver)">HP/Level</span> <span style="color:var(--rose)">+${cls.hpPerLevel}</span></div>
            <div><span style="color:var(--silver)">MP/Level</span> <span style="color:var(--azure)">+${cls.mpPerLevel}</span></div>
            <div><span style="color:var(--silver)">Base HP</span> <span style="color:var(--gold)">${cls.startingStats.hp}</span></div>
            <div><span style="color:var(--silver)">Base MP</span> <span style="color:var(--gold)">${cls.startingStats.mp}</span></div>
          </div>
          <div style="margin-top:12px;font-size:12px;color:var(--parchment)">
            <span style="color:var(--silver);font-family:var(--font-display);letter-spacing:1px">SKILL TREES: </span>
            ${cls.skillTrees.map(t => DATA.skillTrees[t]?.name || t).join(' • ')}
          </div>
        </div>
      </div>
    `;
  },

  // ---- STEP 3: ORIGINS ----
  renderOrigins() {
    const grid = document.getElementById('origin-grid');
    if (!grid) return;
    grid.innerHTML = DATA.origins.map(o => `
      <div class="origin-card" id="origin-${o.id}" onclick="CharCreation.selectOrigin('${o.id}')">
        <div class="origin-title">${o.icon} ${o.name}</div>
        <div class="origin-desc">${o.desc}</div>
        <div class="origin-bonus">✦ ${o.bonus}</div>
      </div>
    `).join('');
  },

  selectOrigin(id) {
    this.selections.origin = id;
    document.querySelectorAll('.origin-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`origin-${id}`)?.classList.add('selected');
  },

  // ---- STEP 4: ATTRIBUTES ----
  renderAttributes() {
    const panel = document.getElementById('attributes-panel');
    if (!panel) return;

    const attrs = [
      { id: 'str', name: 'Strength', icon: '💪', desc: 'Melee damage, carrying capacity' },
      { id: 'dex', name: 'Dexterity', icon: '🎯', desc: 'Speed, evasion, ranged attacks' },
      { id: 'con', name: 'Constitution', icon: '🛡', desc: 'Max HP, poison resistance' },
      { id: 'int', name: 'Intelligence', icon: '📖', desc: 'Spell power, max MP' },
      { id: 'wis', name: 'Wisdom', icon: '🌿', desc: 'Perception, will saves' },
      { id: 'cha', name: 'Charisma', icon: '✨', desc: 'Persuasion, NPC reaction' }
    ];

    panel.innerHTML = attrs.map(a => `
      <div class="attr-row">
        <span class="attr-icon">${a.icon}</span>
        <div>
          <div class="attr-name">${a.name}</div>
          <div class="attr-derived" style="font-size:11px;color:var(--stone)">${a.desc}</div>
        </div>
        <div class="attr-controls">
          <button class="attr-btn" onclick="CharCreation.changeAttr('${a.id}', -1)">−</button>
          <span class="attr-value" id="attr-val-${a.id}">8</span>
          <button class="attr-btn" onclick="CharCreation.changeAttr('${a.id}', 1)">+</button>
        </div>
      </div>
    `).join('');

    this.updateAttrPreview();
  },

  changeAttr(attr, delta) {
    const current = this.selections.attrs[attr] || 0;
    const newVal = current + delta;
    const baseVal = 8;
    const total = baseVal + newVal;

    if (total < 8 || total > 15) return;

    const newSpent = this.pointsSpent - this.getAttrCost(current) + this.getAttrCost(newVal);
    if (newSpent > this.pointsTotal) { UI.notify('No points remaining', 'warning'); return; }

    this.selections.attrs[attr] = newVal;
    this.pointsSpent = newSpent;

    document.getElementById(`attr-val-${attr}`).textContent = 8 + newVal;
    document.getElementById('points-remaining').textContent = this.pointsTotal - this.pointsSpent;
    this.updateAttrPreview();
  },

  getAttrCost(points) {
    // Standard D&D point buy costs
    const costs = [0, 1, 2, 3, 4, 5, 6, 8, 10];
    return costs[Math.max(0, points)] || 0;
  },

  updateAttrPreview() {
    const preview = document.getElementById('attr-preview');
    if (!preview) return;
    const attrs = this.selections.attrs;
    const cls = DATA.classes[this.selections.class];
    const baseHP = cls ? cls.startingStats.hp : 80;
    const baseMP = cls ? cls.startingStats.mp : 60;

    preview.innerHTML = [
      { name: 'Max HP', value: baseHP + Math.floor(((8 + (attrs.con || 0)) - 10) / 2) * 10 },
      { name: 'Max MP', value: baseMP + Math.floor(((8 + (attrs.int || 0)) - 10) / 2) * 8 },
      { name: 'Attack', value: 10 + Math.floor(((8 + (attrs.str || 0)) - 10) / 2) },
      { name: 'Defense', value: 8 + Math.floor(((8 + (attrs.con || 0)) - 10) / 2) }
    ].map(s => `
      <div class="derived-stat">
        <span class="derived-stat-val">${s.value}</span>
        <span class="derived-stat-name">${s.name}</span>
      </div>
    `).join('');
  },

  // ---- STEP 5: APPEARANCE ----
  renderAppearance() {
    const race = DATA.races[this.selections.race];
    if (!race) return;
    const physique = race.physique;

    const optionsEl = document.getElementById('appearance-options');
    if (!optionsEl) return;

    const sections = [
      { id: 'skin', label: 'Skin Tone', options: physique.skinTones || [] },
      { id: 'hair', label: 'Hair', options: physique.hairColors || [] },
      { id: 'eyes', label: 'Eye Color', options: physique.eyeColors || [] },
      { id: 'body', label: 'Body Type', options: physique.bodyTypes || [] }
    ];

    optionsEl.innerHTML = sections.map(s => `
      <div class="appear-group">
        <label>${s.label}</label>
        <div class="appear-options">
          ${s.options.map(o => `
            <span class="appear-opt" onclick="CharCreation.selectAppearance('${s.id}', '${o}', this)">${o}</span>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Auto-select first options
    sections.forEach(s => {
      if (s.options.length > 0) {
        this.selections.appearance[s.id] = s.options[0];
        optionsEl.querySelector(`.appear-opt`)?.classList.add('selected');
      }
    });

    this.updatePortrait();
  },

  selectAppearance(type, value, el) {
    this.selections.appearance[type] = value;
    el.closest('.appear-options').querySelectorAll('.appear-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    this.updatePortrait();
  },

  updatePortrait() {
    const fig = document.getElementById('portrait-figure');
    if (fig) {
      const race = DATA.races[this.selections.race];
      fig.textContent = race?.icon || '🧙';
    }
  },

  randomName() {
    const race = this.selections.race || 'default';
    const names = DATA.names[race] || DATA.names.default;
    document.getElementById('char-name').value = names[Math.floor(Math.random() * names.length)];
  },

  // ---- STEP 6: DESTINY ----
  renderDestiny() {
    const { race, class: cls, origin, attrs, name } = this.selections;
    const raceData = DATA.races[race];
    const classData = DATA.classes[cls];
    const originData = DATA.origins.find(o => o.id === origin);
    const charName = document.getElementById('char-name')?.value || 'The Hero';
    this.selections.name = charName;

    const summary = document.getElementById('destiny-summary');
    if (summary) {
      summary.innerHTML = `
        <div class="destiny-section">
          <h4>YOUR LEGEND</h4>
          <p style="font-size:20px;color:var(--gold);font-family:var(--font-display)">${charName}</p>
          <p style="margin-top:8px">${raceData?.name || 'Unknown'} ${classData?.name || 'Unknown'}</p>
          <p style="font-size:13px;color:var(--silver);margin-top:4px">${originData?.name || ''}</p>
        </div>
        <div class="destiny-section">
          <h4>ATTRIBUTES</h4>
          <div class="stat-list">
            ${Object.entries(attrs).map(([k,v]) => `
              <div class="stat-item">
                <span>${k.toUpperCase()}</span>
                <span class="stat-val">${8 + v}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="destiny-section">
          <h4>RACIAL GIFT</h4>
          <p style="color:var(--lilac)">${raceData?.passives[0]?.name || ''}</p>
          <p style="font-size:13px;color:var(--parchment);margin-top:4px">${raceData?.passives[0]?.desc || ''}</p>
        </div>
        <div class="destiny-section">
          <h4>STARTING PATH</h4>
          <p style="color:var(--gold)">${classData?.skillTrees?.map(t => DATA.skillTrees[t]?.name || t).join(', ') || ''}</p>
        </div>
      `;
    }

    // Prophecy
    const prophecies = [
      `The stars have long awaited one like ${charName}. What was broken shall either be made whole — or shattered beyond all repair. The choice is yours.`,
      `In the age of the Unweaving, a ${raceData?.name || 'hero'} shall rise from ${originData?.name || 'obscurity'} and stand at the crossroads of fate. Three paths. One truth. Infinite consequences.`,
      `The Veilbreaker sees you coming, ${charName}. It has seen you in its dreams for a thousand years. Whether that is reason for fear — or hope — remains to be written.`
    ];

    const prophecy = document.getElementById('destiny-prophecy');
    if (prophecy) {
      prophecy.innerHTML = `<p>"${prophecies[Math.floor(Math.random() * prophecies.length)]}"</p>`;
    }
  },

  // ---- FINISH ----
  finish() {
    const nameInput = document.getElementById('char-name')?.value?.trim();
    if (!nameInput) { UI.notify('Enter your name', 'warning'); return; }
    this.selections.name = nameInput;

    const char = Engine.createCharacter(
      this.selections.race,
      this.selections.class,
      this.selections.origin,
      this.selections.attrs,
      this.selections.appearance,
      this.selections.name
    );
    Engine.state.char = char;

    // Starting items
    const classData = DATA.classes[this.selections.class];
    classData?.startingItems?.forEach(id => Engine.addItem(id));

    // Starting gold from origin
    const originData = DATA.origins.find(o => o.id === this.selections.origin);
    Engine.state.gold = originData?.startGold || 50;

    // Faction rep init
    Object.keys(DATA.factions).forEach(id => {
      Engine.state.factionRep[id] = DATA.factions[id].startRep || 0;
    });

    // Initial quest
    Engine.addQuest({
      id: 'main_1', name: 'Shadows at the Waystone',
      desc: 'Cultists of the Veilbreaker are performing a ritual at the ancient Waystone. Investigate and decide how to respond.',
      objectives: [
        { text: 'Reach the Verdant Crossroads', done: true },
        { text: 'Deal with the cultists at the Waystone', done: false },
        { text: 'Learn more about the Veilbreaker Cult', done: false }
      ],
      xpReward: 150, goldReward: 0
    });

    // Multiplayer notification
    UI.notify(`Welcome, ${char.name}!`, 'level');

    // Start game
    Game.enterGame();
  }
};
