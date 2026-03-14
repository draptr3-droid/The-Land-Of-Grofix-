// ============================================================
// AETHERIS — Complete RPG Data
// ============================================================
const DATA = {

races: {
  human:      { id:'human',      name:'Human',        icon:'🧑', tagline:'Boundless ambition',          stats:{str:1,dex:1,con:1,int:1,wis:1,cha:2}, bonusSP:2, hpBonus:0,  mpBonus:0,  spellBonus:1.0, traits:['Adaptable','Resilient'],        passives:[{id:'adaptable',name:'Adaptable',desc:'+2 skill pts/level, +10% XP',icon:'✦'}], color:0x3388ff },
  elf:        { id:'elf',        name:'High Elf',      icon:'🧝', tagline:'Ancient arcane mastery',       stats:{str:-1,dex:2,con:-1,int:3,wis:2,cha:1},bonusSP:0, hpBonus:-10,mpBonus:40, spellBonus:1.3, traits:['Arcane Blood','Trance'],         passives:[{id:'arcane',name:'Arcane Blood',desc:'+30% spell power, +40 MP',icon:'✨'}], color:0xaaddff },
  dwarf:      { id:'dwarf',      name:'Ironborn Dwarf',icon:'⛏',  tagline:'Forged in stone',              stats:{str:2,dex:-1,con:3,int:1,wis:1,cha:0}, bonusSP:0, hpBonus:30, mpBonus:0,  spellBonus:0.8, traits:['Stoneblood','Forge Master'],    passives:[{id:'stone',name:'Stoneblood',desc:'+30 HP, reduce phys dmg by 5',icon:'🛡'}], color:0xaa8844 },
  tiefling:   { id:'tiefling',   name:'Tiefling',      icon:'😈', tagline:'Hellfire in their veins',       stats:{str:1,dex:1,con:0,int:2,wis:0,cha:2},  bonusSP:0, hpBonus:0,  mpBonus:20, spellBonus:1.2, traits:['Infernal Gift','Darkvision'],   passives:[{id:'hell',name:'Infernal Gift',desc:'+35% fire dmg, fire immune',icon:'🔥'}], color:0xcc4444 },
  orc:        { id:'orc',        name:'Half-Orc',      icon:'💪', tagline:'Two worlds, one will',          stats:{str:3,dex:1,con:2,int:-1,wis:0,cha:-1}, bonusSP:0, hpBonus:20, mpBonus:-10,spellBonus:0.7, traits:['Savage Strikes','Relentless'],  passives:[{id:'savage',name:'Savage Strikes',desc:'Crits deal +50% dmg, survive lethal 1x',icon:'⚔'}], color:0x44aa44 },
  gnome:      { id:'gnome',      name:'Gnome',         icon:'🔮', tagline:'Brilliant inventive mind',      stats:{str:-2,dex:2,con:0,int:3,wis:1,cha:1},  bonusSP:1, hpBonus:-10,mpBonus:30, spellBonus:1.2, traits:['Gnomish Cunning','Tinker'],     passives:[{id:'cunning',name:'Gnomish Cunning',desc:'INT saves adv, illusion -40% MP',icon:'⚙'}], color:0xff9944 },
  dragonborn: { id:'dragonborn', name:'Dragonborn',    icon:'🐉', tagline:'Dragon blood flows eternal',    stats:{str:2,dex:0,con:1,int:1,wis:0,cha:2},  bonusSP:0, hpBonus:10, mpBonus:10, spellBonus:1.1, traits:['Breath Weapon','Dragon Resist'], passives:[{id:'breath',name:'Breath Weapon',desc:'Elemental cone 1x/combat, +2 AC',icon:'🐲'}], color:0xff6600 },
  shadowkin:  { id:'shadowkin',  name:'Shadowkin',     icon:'🌑', tagline:'Born between worlds',           stats:{str:0,dex:3,con:-1,int:1,wis:1,cha:0},  bonusSP:0, hpBonus:0,  mpBonus:0,  spellBonus:1.0, traits:['Shadow Step','Life Drain'],     passives:[{id:'shadow2',name:'Shadow Step',desc:'Teleport through shadows, drain HP on kill',icon:'🌑'}], color:0x9944cc },
  aasimar:    { id:'aasimar',    name:'Aasimar',       icon:'😇', tagline:'Heaven\'s light made mortal',    stats:{str:0,dex:0,con:1,int:1,wis:3,cha:3},  bonusSP:0, hpBonus:0,  mpBonus:20, spellBonus:1.2, traits:['Radiant Aura','Divine Protect'], passives:[{id:'radiant',name:'Radiant Aura',desc:'+20% healing, immunity necrotic',icon:'✦'}], color:0xffffaa },
  wildborn:   { id:'wildborn',   name:'Wildborn',      icon:'🌿', tagline:'One with the eternal wild',     stats:{str:2,dex:2,con:1,int:0,wis:2,cha:-1}, bonusSP:0, hpBonus:10, mpBonus:0,  spellBonus:0.9, traits:['Beast Aspect','Wild Sense'],    passives:[{id:'beast',name:'Beast Aspect',desc:'Animal companion, detect all threats',icon:'🦁'}], color:0x44aa44 }
},

classes: {
  warrior:    { id:'warrior',    name:'Iron Warden',   icon:'⚔',  role:'Tank / DPS',      hpLv:14, mpLv:2,  startHp:140,startMp:20,  startAtk:18,startDef:14, trees:['combat','defense'],        spells:['q_slash','e_bash','r_regen','z_warcry'] },
  mage:       { id:'mage',       name:'Arcane Scholar',icon:'🔮', role:'DPS / Support',   hpLv:6,  mpLv:14, startHp:60, startMp:140, startAtk:8, startDef:4,  trees:['fire','arcane'],           spells:['q_fire','e_lightning','r_heal','z_void'] },
  rogue:      { id:'rogue',      name:'Shadowblade',   icon:'🗡',  role:'DPS / Utility',   hpLv:8,  mpLv:6,  startHp:80, startMp:60,  startAtk:14,startDef:7,  trees:['shadow','assassination'],  spells:['q_poison','e_backstab','r_smoke','z_shadow'] },
  paladin:    { id:'paladin',    name:'Divine Crusader',icon:'✝', role:'Tank / Healer',   hpLv:12, mpLv:8,  startHp:120,startMp:80,  startAtk:15,startDef:12, trees:['holy','defense'],          spells:['q_smite','e_shield','r_heal','z_divine'] },
  ranger:     { id:'ranger',     name:'Pathfinder',    icon:'🏹', role:'DPS / Scout',     hpLv:10, mpLv:6,  startHp:100,startMp:60,  startAtk:16,startDef:8,  trees:['archery','survival'],      spells:['q_arrow','e_trap','r_camouflage','z_volley'] },
  warlock:    { id:'warlock',    name:'Pact Binder',   icon:'📿', role:'DPS / Debuffer',  hpLv:8,  mpLv:10, startHp:80, startMp:100, startAtk:12,startDef:6,  trees:['eldritch','curse'],        spells:['q_hex','e_drain','r_pact','z_eldritch'] },
  bard:       { id:'bard',       name:'Loreweaver',    icon:'🎵', role:'Support / Hybrid',hpLv:8,  mpLv:8,  startHp:80, startMp:80,  startAtk:10,startDef:6,  trees:['inspiration','fate'],      spells:['q_hymn','e_charm','r_inspire','z_discord'] },
  druid:      { id:'druid',      name:'Stormcaller',   icon:'🌿', role:'Healer / DPS',    hpLv:10, mpLv:10, startHp:100,startMp:100, startAtk:10,startDef:8,  trees:['nature','storm'],          spells:['q_entangle','e_lightning','r_rejuv','z_storm'] },
  necromancer:{ id:'necromancer',name:'Deathmage',     icon:'💀', role:'Summoner / DPS',  hpLv:7,  mpLv:12, startHp:70, startMp:120, startAtk:10,startDef:5,  trees:['undead','entropy'],        spells:['q_bolt','e_drain','r_raise','z_soul'] },
  monk:       { id:'monk',       name:'Void Walker',   icon:'☯',  role:'DPS / Tank',      hpLv:10, mpLv:8,  startHp:100,startMp:80,  startAtk:16,startDef:10, trees:['ki','void_arts'],          spells:['q_flurry','e_stun','r_meditate','z_empty'] },
  bloodknight:{ id:'bloodknight',name:'Blood Knight',  icon:'🩸', role:'DPS / Sustain',   hpLv:12, mpLv:4,  startHp:120,startMp:40,  startAtk:20,startDef:8,  trees:['blood','berserker'],       spells:['q_bloodstrike','e_lifetap','r_crimson','z_frenzy'] },
  artificer:  { id:'artificer',  name:'Runesmith',     icon:'⚙',  role:'Support / Utility',hpLv:8, mpLv:8,  startHp:80, startMp:80,  startAtk:12,startDef:8,  trees:['constructs','gadgetry'],   spells:['q_turret','e_bomb','r_infuse','z_overload'] }
},

origins: [
  { id:'noble',    name:'Fallen Noble',      icon:'👑', desc:'Once powerful, now stripped of everything.',bonus:'+2 CHA, +1 INT',    stats:{cha:2,int:1}, gold:150 },
  { id:'soldier',  name:'Veteran Soldier',   icon:'⚔',  desc:'Years of war have hardened you.',           bonus:'+2 STR, +1 CON',    stats:{str:2,con:1}, gold:60  },
  { id:'scholar',  name:'Rogue Scholar',     icon:'📚', desc:'Expelled for asking the wrong questions.',  bonus:'+2 INT, +1 WIS',    stats:{int:2,wis:1}, gold:40  },
  { id:'criminal', name:'Criminal',          icon:'🗡',  desc:'The law never understood you.',             bonus:'+2 DEX, +1 CHA',    stats:{dex:2,cha:1}, gold:80  },
  { id:'hermit',   name:'Hermit Sage',       icon:'🌿', desc:'Years of isolation granted deep wisdom.',   bonus:'+2 WIS, +1 CON',    stats:{wis:2,con:1}, gold:20  },
  { id:'outlander',name:'Tribal Outlander',  icon:'🏕',  desc:'From the untamed edges of civilization.',   bonus:'+2 CON, +1 STR',    stats:{con:2,str:1}, gold:30  },
  { id:'acolyte',  name:'Fallen Acolyte',    icon:'⛪', desc:'Your faith is complicated. Your training is not.',bonus:'+2 WIS, +1 CHA',stats:{wis:2,cha:1}, gold:50  },
  { id:'sailor',   name:'Cursed Sailor',     icon:'⚓', desc:'The sea gave. The sea took.',               bonus:'+2 DEX, +1 WIS',    stats:{dex:2,wis:1}, gold:70  }
],

skillTrees: {
  combat: {
    name:'Combat Mastery', icon:'⚔', color:'#c0253a',
    nodes:[
      {id:'power_strike', name:'Power Strike', icon:'💥',x:60, y:60, desc:'Crushing blow power.',effects:['+15% melee dmg'],cost:1,requires:[],maxRank:3},
      {id:'cleave',       name:'Cleave',        icon:'⚔',x:180,y:100,desc:'Hit all enemies ahead.',effects:['AoE melee attack'],cost:1,requires:['power_strike'],maxRank:2},
      {id:'weapon_master',name:'Weapon Master', icon:'🗡',x:60, y:180,desc:'Expert with all weapons.',effects:['+10% atk speed','+5% crit'],cost:2,requires:['power_strike'],maxRank:3},
      {id:'bladestorm',   name:'Bladestorm',    icon:'🌪',x:300,y:140,desc:'360 damage spin.',effects:['AoE spin attack','Stagger'],cost:2,requires:['cleave'],maxRank:2},
      {id:'death_blow',   name:'Death Blow',    icon:'💀',x:420,y:180,desc:'Execute below 20% HP.',effects:['Instant kill <20% HP'],cost:3,requires:['bladestorm'],maxRank:1},
      {id:'war_god',      name:'Aspect of War', icon:'🔱',x:300,y:300,desc:'Channel the war god.',effects:['2x combat stats 5 turns','1x/day'],cost:5,requires:['death_blow'],maxRank:1}
    ]
  },
  defense: {
    name:'Iron Fortress', icon:'🛡', color:'#2458a8',
    nodes:[
      {id:'fortify',      name:'Fortify',       icon:'🛡',x:60, y:60, desc:'Steel yourself.',effects:['+8 defense'],cost:1,requires:[],maxRank:5},
      {id:'shield_exp',   name:'Shield Expert', icon:'🔵',x:200,y:60, desc:'Master of shields.',effects:['Block +20%','Bash stuns'],cost:1,requires:[],maxRank:3},
      {id:'endure',       name:'Endure',        icon:'💪',x:130,y:180,desc:'Outlast any assault.',effects:['+25% max HP','HP regen OOC'],cost:2,requires:['fortify'],maxRank:3},
      {id:'parry',        name:'Counter Parry', icon:'↩',x:320,y:100,desc:'Turn defense to offense.',effects:['25% counter on block'],cost:2,requires:['shield_exp'],maxRank:3},
      {id:'last_stand',   name:'Last Stand',    icon:'🔥',x:60, y:300,desc:'Fight hardest near death.',effects:['+50% dmg below 25% HP'],cost:3,requires:['endure'],maxRank:2},
      {id:'immortal',     name:'Immortal',      icon:'♾',x:220,y:320,desc:'Cannot die.',effects:['Revive 1x/battle at 30% HP'],cost:5,requires:['last_stand'],maxRank:1}
    ]
  },
  fire: {
    name:'Pyromancy', icon:'🔥', color:'#e07830',
    nodes:[
      {id:'fire_bolt',    name:'Fire Bolt',     icon:'🔥',x:60, y:60, desc:'Searing flame bolt.',effects:['1d6+INT fire dmg'],cost:1,requires:[],maxRank:5},
      {id:'burning',      name:'Burning',       icon:'🌡',x:200,y:60, desc:'Flames that linger.',effects:['Burns for 3 turns'],cost:1,requires:['fire_bolt'],maxRank:3},
      {id:'fireball',     name:'Fireball',      icon:'💥',x:60, y:180,desc:'Explosive AoE.',effects:['3d8+INT AoE','20 MP'],cost:2,requires:['fire_bolt'],maxRank:3},
      {id:'fire_mastery', name:'Pyro Mastery',  icon:'🌋',x:200,y:180,desc:'Fire becomes natural.',effects:['+30% fire dmg','-25% MP cost'],cost:2,requires:['burning','fireball'],maxRank:3},
      {id:'meteor',       name:'Meteor',        icon:'☄',x:340,y:120,desc:'Call a meteor.',effects:['Massive AoE','60 MP'],cost:3,requires:['fireball'],maxRank:2},
      {id:'phoenix',      name:'Phoenix Form',  icon:'🦅',x:200,y:320,desc:'Become the Phoenix.',effects:['All spells fire','Revive 1x'],cost:5,requires:['meteor','fire_mastery'],maxRank:1}
    ]
  },
  shadow: {
    name:'Shadow Arts', icon:'🌑', color:'#5a2d8a',
    nodes:[
      {id:'stealth',      name:'Stealth',       icon:'👤',x:60, y:60, desc:'Vanish from sight.',effects:['Enter stealth freely'],cost:1,requires:[],maxRank:3},
      {id:'backstab2',    name:'Backstab',      icon:'🗡',x:200,y:60, desc:'Devastating from behind.',effects:['5x dmg from stealth','Always crits'],cost:2,requires:['stealth'],maxRank:3},
      {id:'shadow_step2', name:'Shadow Step',   icon:'🌑',x:60, y:180,desc:'Teleport through shadows.',effects:['Short blink','15s cd'],cost:1,requires:['stealth'],maxRank:3},
      {id:'evasion',      name:'Evasion',       icon:'💨',x:200,y:180,desc:'Dodge impossibly.',effects:['+25% dodge','Dodge AoE'],cost:2,requires:['shadow_step2'],maxRank:3},
      {id:'death_mark',   name:'Death Mark',    icon:'💀',x:60, y:300,desc:'Mark for death.',effects:['+50% dmg on target','5 turns'],cost:2,requires:['evasion'],maxRank:3},
      {id:'night_lord',   name:'Night Lord',    icon:'🌙',x:220,y:320,desc:'Become the night.',effects:['Permanent stealth','All attacks backstab'],cost:5,requires:['death_mark'],maxRank:1}
    ]
  },
  arcane: {
    name:'Arcane Mastery', icon:'✨', color:'#7c3dba',
    nodes:[
      {id:'arcane_bolt2', name:'Arcane Bolt',   icon:'⚡',x:60, y:60, desc:'Pure magical force.',effects:['1d8+INT force dmg','Ignores armor'],cost:1,requires:[],maxRank:5},
      {id:'mana_shield2', name:'Mana Shield',   icon:'💠',x:200,y:60, desc:'Convert MP to shield.',effects:['10 MP = 15 dmg absorbed'],cost:1,requires:[],maxRank:3},
      {id:'spell_master', name:'Spell Mastery', icon:'📖',x:60, y:180,desc:'All spells strengthened.',effects:['+15% spell dmg','+1 spell slot'],cost:2,requires:['arcane_bolt2'],maxRank:5},
      {id:'counterspell', name:'Counterspell',  icon:'🚫',x:200,y:180,desc:'Cancel enemy magic.',effects:['Cancel any spell','Steal MP'],cost:2,requires:['mana_shield2'],maxRank:2},
      {id:'time_stop',    name:'Time Stop',     icon:'⏱',x:330,y:180,desc:'Freeze time.',effects:['3 free turns','1x/day'],cost:5,requires:['counterspell'],maxRank:1},
      {id:'reality_warp', name:'Reality Warp',  icon:'🌌',x:200,y:320,desc:'Rewrite reality.',effects:['Any effect 1x/encounter'],cost:5,requires:['time_stop','spell_master'],maxRank:1}
    ]
  },
  holy: {
    name:'Divine Power', icon:'✦', color:'#f8e878',
    nodes:[
      {id:'smite2',       name:'Divine Smite',  icon:'⚡',x:60, y:60, desc:'Channel divinity.',effects:['2d8 radiant on hit','+4d8 vs undead'],cost:1,requires:[],maxRank:5},
      {id:'lay_hands2',   name:'Lay on Hands',  icon:'🤲',x:200,y:60, desc:'Heal with touch.',effects:['Heal 5xCHA HP','Cure status'],cost:1,requires:[],maxRank:3},
      {id:'div_favor',    name:'Divine Favor',  icon:'✦',x:60, y:180,desc:'Blessed by deity.',effects:['+1d4 radiant all atk','+2 AC'],cost:2,requires:['smite2'],maxRank:3},
      {id:'mass_heal',    name:'Mass Heal',     icon:'💫',x:200,y:180,desc:'Heal all allies.',effects:['Heal all 3d4+WIS','30 MP'],cost:2,requires:['lay_hands2'],maxRank:3},
      {id:'resurrection', name:'Resurrection',  icon:'💖',x:60, y:300,desc:'Revive the fallen.',effects:['Restore ally 50% HP','1x/rest'],cost:4,requires:['mass_heal'],maxRank:1},
      {id:'avatar',       name:'Avatar',        icon:'☀',x:220,y:320,desc:'Become divine.',effects:['2x holy stats','Wings','10 min/day'],cost:5,requires:['resurrection'],maxRank:1}
    ]
  }
},

items: {
  // Weapons
  iron_sword:     {id:'iron_sword',     name:'Iron Sword',       icon:'⚔',  type:'weapon', rarity:'common',    slot:'weapon', atk:8,  desc:'Reliable if unexceptional.',   val:40, wt:3},
  twin_daggers:   {id:'twin_daggers',   name:'Shadow Daggers',   icon:'🗡',  type:'weapon', rarity:'common',    slot:'weapon', atk:6,  spdB:4, critB:10, desc:'Fast and deadly.',val:60,wt:2},
  staff:          {id:'staff',          name:'Apprentice Staff', icon:'🪄',  type:'weapon', rarity:'common',    slot:'weapon', atk:4,  spellB:15,mpB:20, desc:'Hums with stored magic.',val:80,wt:2},
  hunters_bow:    {id:'hunters_bow',    name:'Hunter\'s Bow',     icon:'🏹',  type:'weapon', rarity:'common',    slot:'weapon', atk:10, desc:'Compact and powerful.',         val:55, wt:2},
  holy_mace:      {id:'holy_mace',      name:'Blessed Mace',     icon:'🔨', type:'weapon', rarity:'uncommon',  slot:'weapon', atk:9,  holyB:5, desc:'Undead tremble.',          val:100,wt:4},
  voidbreaker:    {id:'voidbreaker',    name:'Voidbreaker',      icon:'⚡',  type:'weapon', rarity:'legendary', slot:'weapon', atk:35, spellB:40, desc:'Cuts through reality.',  val:9999,wt:3},
  // Armor
  chainmail:      {id:'chainmail',      name:'Chainmail',        icon:'🛡',  type:'armor',  rarity:'common',    slot:'chest',  def:12, desc:'Heavy but proven.',             val:80, wt:8},
  leather_armor:  {id:'leather_armor',  name:'Leather Armor',    icon:'🥋',  type:'armor',  rarity:'common',    slot:'chest',  def:6,  spdB:2, desc:'Moves with you.',          val:50, wt:4},
  scholar_robes:  {id:'scholar_robes',  name:'Scholar Robes',    icon:'👘',  type:'armor',  rarity:'common',    slot:'chest',  def:2,  spellB:10,mpB:40, desc:'Aetheric weave.',val:90,wt:1},
  plate_armor:    {id:'plate_armor',    name:'Holy Plate',       icon:'⚙',  type:'armor',  rarity:'uncommon',  slot:'chest',  def:18, desc:'Blessed by crusaders.',         val:250,wt:14},
  crown_dusk:     {id:'crown_dusk',     name:'Crown of Dusk',    icon:'👑',  type:'armor',  rarity:'legendary', slot:'head',   def:8,  allB:5, desc:'Worn by the last god-king.',val:9999,wt:1},
  // Consumables
  health_pot:     {id:'health_pot',     name:'Health Potion',    icon:'🧪',  type:'consumable',rarity:'common',effect:'heal', roll:'3d8+20', desc:'Tastes of copper.',         shopVal:50, wt:0.5,count:2},
  mana_pot:       {id:'mana_pot',       name:'Mana Draught',     icon:'💧',  type:'consumable',rarity:'common',effect:'mana', roll:'2d6+30', desc:'Tastes of ozone.',          shopVal:60, wt:0.5,count:2},
  smoke_bomb:     {id:'smoke_bomb',     name:'Smoke Bomb',       icon:'💨',  type:'consumable',rarity:'common',effect:'smoke',desc:'Instant stealth.',              shopVal:30, wt:0.3,count:2},
  elixir:         {id:'elixir',         name:'Elixir of Power',  icon:'✨',  type:'consumable',rarity:'uncommon',effect:'buff',desc:'All stats +20% for 60s.',      shopVal:120,wt:0.5,count:1},
  // Quest
  aetherstone:    {id:'aetherstone',    name:'Aetherstone Shard',icon:'💎',  type:'quest',  rarity:'legendary', desc:'Pulses with reality-warping power.',val:0,wt:0.1}
},

// Story nodes
story: {
  intro: {
    id:'intro', title:'The Verdant Crossroads',
    text:'Dawn breaks over the ancient Waystone. Three black-cloaked figures chant in a tongue that makes your teeth ache. They hold a glowing shard — an Aetherstone. They do not see you. Not yet.',
    choices:[
      {text:'⚔ Charge them — end the ritual now',     next:'attack_cultists', flag:'aggressive'},
      {text:'👁 Watch from cover — learn what they do', next:'observe_cultists'},
      {text:'💬 Step forward and demand answers',       next:'confront_cultists', flag:'diplomatic'},
      {text:'🏃 Retreat to the nearby village first',   next:'find_village', flag:'cautious'}
    ]
  },
  attack_cultists:   { id:'attack_cultists',   title:'Blood Before Words', text:'You charge. The first cultist falls. The stone pulses — the ritual was partially completed. Two remain and they are ANGRY.', choices:[{text:'⚔ Press the attack',next:'cultist_victory',combat:'cultist_duo'},{text:'🛡 Grab one for answers',next:'captured_cultist'}] },
  observe_cultists:  { id:'observe_cultists',  title:'In the Shadows',     text:'From cover you watch. It\'s a Waystone Awakening — sending a signal across the ley lines. One cultist holds the Aetherstone. The third looks in your direction...', choices:[{text:'⚔ Rush them — you have surprise',next:'ambush_cultists',combat:'cultist'},{text:'🗡 Steal the shard silently',next:'steal_shard'},{text:'📖 Memorize the ritual pattern',next:'memorize_ritual',flag:'knows_ritual'}] },
  confront_cultists: { id:'confront_cultists', title:'Words at the Waystone', text:'"Join the Veilbreaker," the leader says, her eyes like black mirrors. "Your power would serve the Unmaking well." She means it — genuine invitation, no contempt. That\'s more disturbing than threats.', choices:[{text:'"Tell me why I should." — Probe for info',next:'cultist_pitch',flag:'heard_offer'},{text:'"Never." — Refuse',next:'refuse_cult',flag:'rejected_cult'},{text:'Play along — go undercover',next:'fake_join',flag:'deceiver'}] },
  find_village:      { id:'find_village',      title:'Ashwick Village',      text:'The village of Ashwick cowers a mile west. Innkeeper Morra has seen the cultists. Three villagers have vanished. There\'s a resistance gathering at the old mill tonight.', choices:[{text:'💬 Ask Morra everything',next:'morra_intel'},{text:'⚔ Offer to help the village',next:'village_quests',flag:'village_helper'},{text:'🕯 Find the resistance meeting',next:'resistance_meeting'}] },
  cultist_victory:   { id:'cultist_victory',   title:'Victory at the Stone', text:'The cultists fall. You recover the Aetherstone shard — warm to the touch, humming with ancient power. The Waystone dims. You bought time. Now what?', choices:[{text:'Take the shard and seek more answers',next:'act2_choose'},{text:'Destroy the shard now',next:'destroy_shard'}] },
  morra_intel:       { id:'morra_intel',        title:'Morra\'s Warning',     text:'"The Waystone glowed black three nights ago," Morra says. "Then our constable left — said he had new orders. There\'s someone in the resistance who might be a cult plant."', choices:[{text:'Go to the resistance meeting',next:'resistance_meeting',flag:'joined_resistance'},{text:'Investigate the constable',next:'find_constable'},{text:'Find the missing villagers',next:'rescue_quest',flag:'good_path'}] },
  resistance_meeting:{ id:'resistance_meeting',title:'The Resistance',       text:'Seven people in the mill. Commander Brenn leads. A gnomish artificer. A young scared priest. A woman with a ranger\'s careful eyes. And one person whose pupils catch the light wrong.', choices:[{text:'Point out the spy',next:'expose_spy',flag:'caught_spy'},{text:'"Test me however you need"',next:'resistance_accepted'},{text:'Watch quietly',next:'resistance_intel'}] },
  act2_choose: {
    id:'act2_choose', title:'Chapter II — Paths Diverge',
    text:'The world opens. Four powers want your loyalty. The Resistance fights the Cult. The Empire wants the shards for conquest. The Cult offers power. The Loremasters whisper that everyone else is a pawn.',
    choices:[
      {text:'⚔ Join the Resistance',       next:'path_resistance', flag:'resistance_member',   faction:'resistance'},
      {text:'👑 Ally with the Empire',       next:'path_empire',     flag:'empire_ally',         faction:'empire'},
      {text:'🌑 Infiltrate the Cult deeper', next:'path_cult',       flag:'cult_infiltrator',    faction:'cult'},
      {text:'📖 Seek the Loremasters',       next:'path_lore',       flag:'loremaster_seeker',   faction:'loremasters'},
      {text:'😈 Claim the shards yourself',  next:'path_conqueror',  flag:'would_be_god',        faction:'self'}
    ]
  },
  path_resistance: { id:'path_resistance', title:'The Long Fight', text:'Commander Brenn clasps your arm. "You\'ve chosen the harder road." Your mission: destroy the Waystone amplifier in the Ashen Fortress before all six Waystones activate simultaneously.', choices:[{text:'Lead the assault directly',next:'final_confrontation'},{text:'Infiltrate alone',next:'final_confrontation'},{text:'Recruit more fighters first',next:'final_confrontation',flag:'built_army'}] },
  path_empire:     { id:'path_empire',     title:'The Iron Throne', text:'Grand Prefect Marius receives you in armor, not robes. "I trust people who want something. What do you want?" He can destroy the Cult — but he wants the Aetherstones as weapons of conquest.', choices:[{text:'"A seat at the table."',next:'final_confrontation',flag:'wants_power'},{text:'"Just destroy the Cult."',next:'final_confrontation'},{text:'Agree now, betray later',next:'final_confrontation',flag:'double_cross'}] },
  path_cult:       { id:'path_cult',       title:'Among Wolves',    text:'The Ashen Fortress. Hundreds of cultists. Sister Vael watches you constantly — she is not fooled as easily as the others. You have maybe three days before your cover breaks.', choices:[{text:'Find the shard and run',next:'final_confrontation'},{text:'Turn Sister Vael against the Cult',next:'final_confrontation',flag:'turned_vael'},{text:'Organize the prisoners',next:'final_confrontation',flag:'prisoner_revolt'}] },
  path_lore:       { id:'path_lore',       title:'The Hidden Truth', text:'The Loremasters reveal: the Veilbreaker Cult, the Empire, even the Resistance are all reacting to a century-old manipulation. Someone engineered this crisis to force the shards back together.', choices:[{text:'Expose the manipulator',next:'final_confrontation',flag:'knows_truth'},{text:'Use this knowledge as leverage',next:'final_confrontation',flag:'leverage'}] },
  path_conqueror:  { id:'path_conqueror',  title:'The Hungry God',  text:'You need all six shards. You will take them from whoever holds them — Cult, Empire, Resistance, anyone. When the Crystal is whole, you will be there to claim it.', choices:[{text:'Begin collecting by force',next:'final_confrontation',flag:'villain_path'}] },
  final_confrontation: {
    id:'final_confrontation', title:'The Last Hour',
    text:'The six Waystones ignite. The sky tears open. The Primordial Crystal\'s fragments spiral upward. The Veilbreaker — something that was once human — stands at the center. Three final paths.',
    choices:[
      {text:'💥 Destroy all shards — end magic forever',          next:'ending_sacrifice',    req:{flag:'has_shard'}},
      {text:'✦ Reunite the shards — restore the Crystal',         next:'ending_restoration',  req:{flag:'loremasters_ally'}},
      {text:'⚡ Take the power — become the new god',              next:'ending_ascension',    req:{flag:'would_be_god'}},
      {text:'💬 Reach the human within — stop this with words',   next:'ending_redemption',   req:{stat:'cha',val:18}}
    ]
  },
  ending_sacrifice:  { id:'ending_sacrifice',  title:'THE END: The Silencing',    text:'Magic fades. The world becomes smaller, harder, more human. The Cult is destroyed. The Empire loses its advantage. You wake alone in grey ash, powerless. Was it worth it?\n\n🏆 ENDING: The Sacrifice', ending:true, type:'bittersweet' },
  ending_restoration:{ id:'ending_restoration', title:'THE END: The Restoration',  text:'The Crystal reforms. For one moment you contain everything — then release it. The Veilbreaker collapses, just a person again. Magic returns, balanced. The Resistance cheers.\n\n🏆 ENDING: The Restoration — The best ending.', ending:true, type:'good' },
  ending_ascension:  { id:'ending_ascension',   title:'THE END: The New God',      text:'Power floods through you. You ascend. The world kneels — not from fear, but recognition. Is this what you wanted? Look at the terrified, awed faces of those who trusted you.\n\n🏆 ENDING: The Ascension', ending:true, type:'ambiguous' },
  ending_redemption: { id:'ending_redemption',  title:'THE END: The Human Touch',  text:'"I know you\'re still in there," you say. Silence. Then a hand reaches back. The void collapses. The Veilbreaker stands before you — hollow, trembling. "I don\'t remember how to be this." "Neither did I. We\'ll figure it out."\n\n🏆 ENDING: The Redemption — The rarest ending.', ending:true, type:'perfect' }
},

enemies: {
  cultist:      {name:'Cult Acolyte',   icon:'🧟',hp:40, mp:20, atk:9,  def:4,  spd:3.5,xp:25, gold:[5,15],  color:0x442222, scale:1.0, type:'melee', abilities:['Dark Bolt']},
  cultist_duo:  {name:'Cult Acolytes',  icon:'🧟',hp:80, mp:30, atk:11, def:6,  spd:3.5,xp:50, gold:[10,25], color:0x442222, scale:1.0, type:'melee', abilities:['Dark Bolt','Coordinated Strike']},
  orc:          {name:'Orc Warrior',    icon:'💪',hp:130,mp:0,  atk:18, def:8,  spd:2.5,xp:50, gold:[15,30], color:0x225522, scale:1.3, type:'melee', abilities:['Heavy Strike']},
  dark_mage:    {name:'Dark Mage',      icon:'🧙',hp:55, mp:120,atk:6,  def:3,  spd:3.0,xp:60, gold:[20,50], color:0x442266, scale:0.9, type:'mage',  abilities:['Hex','Void Bolt']},
  golem:        {name:'Stone Golem',    icon:'🗿',hp:320,mp:0,  atk:25, def:18, spd:1.5,xp:120,gold:[30,70], color:0x778866, scale:1.8, type:'melee', abilities:['Slam','Regenerate']},
  shadow_wraith:{name:'Shadow Wraith',  icon:'👻',hp:80, mp:80, atk:15, def:0,  spd:4.0,xp:80, gold:[15,45], color:0x220033, scale:1.0, type:'magic',  abilities:['Life Drain','Terrify']},
  veilbreaker:  {name:'The Veilbreaker',icon:'🌑',hp:1000,mp:500,atk:40,def:20, spd:3.0,xp:5000,gold:[500,1000],color:0x110022,scale:2.0,type:'boss',  abilities:['Reality Tear','Void Cascade','Soul Shatter'],boss:true}
},

factions: {
  resistance:  {id:'resistance',  name:'Resistance',        icon:'⚔',  color:'#c0253a', start:0},
  empire:      {id:'empire',      name:'Drakthari Empire',  icon:'👑',  color:'#c9a84c', start:0},
  cult:        {id:'cult',        name:'Veilbreaker Cult',  icon:'🌑',  color:'#5a2d8a', start:-50},
  loremasters: {id:'loremasters', name:'Loremasters',       icon:'📖',  color:'#60c8f0', start:0},
  guilds:      {id:'guilds',      name:'Merchant Guilds',   icon:'⚖',   color:'#3dba78', start:10}
},

locations:[
  {id:'crossroads',      name:'Verdant Crossroads', x:400,y:240,type:'neutral',  desc:'Where your story began. An ancient Waystone.'},
  {id:'ashwick',         name:'Ashwick Village',    x:280,y:220,type:'settlement',desc:'A small farming village, scarred but holding.'},
  {id:'ashen_fortress',  name:'Ashen Fortress',     x:560,y:180,type:'dungeon',  desc:'The Veilbreaker Cult\'s volcanic stronghold.'},
  {id:'sunken_barrows',  name:'Sunken Barrows',     x:200,y:300,type:'dungeon',  desc:'Ancient ruins repurposed as Resistance HQ.'},
  {id:'drak_thar',       name:'Drak\'Thar City',     x:380,y:150,type:'city',    desc:'Capital of the Drakthari Empire.'},
  {id:'ashwood',         name:'Ashwood Forest',     x:250,y:330,type:'wilderness',desc:'Ancient forest where shadow-beasts roam.'},
  {id:'void_gate',       name:'The Void Gate',      x:590,y:270,type:'boss',     desc:'The tear in reality. The final battle.'}
],

names:{
  human:['Aldric','Brenna','Caelum','Dara','Emric','Gareth','Ivan','Kern','Marcus','Petra','Rynn','Torin'],
  elf:['Aelindra','Caladrel','Daelindel','Fariniel','Galadreth','Haliniel','Illyria','Lirien','Mirethis'],
  dwarf:['Bram','Dolga','Gurn','Helga','Kragg','Norbok','Orvun','Thordak','Ulda'],
  tiefling:['Akmenos','Barakas','Damakos','Kairon','Leucis','Neros','Riven','Xanaphia'],
  orc:['Grash','Brugh','Kruzz','Morga','Thrag','Vrenn','Yarga'],
  default:['Aiden','Blade','Cyan','Dawn','Flint','Grey','Haze','Iron','Jade','Sage']
}
};
