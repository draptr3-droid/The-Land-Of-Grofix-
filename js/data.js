
// =====================================================
// AETHERMOOR — Complete Game Data
// Races, Classes, Skills, Items, Story, Buffs, etc.
// =====================================================

const DATA = {

  // ===================================================
  // RACES — 10 unique races with full stat modifiers
  // ===================================================
  races: {
    human: {
      id: 'human', name: 'Human', icon: '🧑', tagline: 'Boundless ambition, limitless potential',
      description: 'Humans are the most adaptable of all races. Short-lived but fierce, they build empires in generations that others take millennia to conceive. Their diversity is their strength.',
      lore: 'Born of the First Breath, humans carry a divine spark that grants them extraordinary adaptability. No ceiling binds them.',
      stats: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 2 },
      bonusSkillPoints: 2,
      traits: ['Adaptable', 'Ambitious', 'Diplomatic'],
      passives: [
        { id: 'adaptable', name: 'Adaptable', desc: 'Gain 2 extra skill points per level', icon: '✦' },
        { id: 'resilient', name: 'Resilient Spirit', desc: '+10% XP from all sources', icon: '🌟' }
      ],
      startingAbility: 'Rally',
      physique: { skinTones: ['Pale','Fair','Olive','Brown','Dark'], hairColors: ['Black','Brown','Blonde','Red','White'], eyeColors: ['Brown','Blue','Green','Grey','Hazel'], bodyTypes: ['Lean','Average','Muscular','Stocky'] }
    },
    elf: {
      id: 'elf', name: 'High Elf', icon: '🧝', tagline: 'Ancient wisdom, arcane mastery',
      description: 'Elves walk for millennia, witnessing the rise and fall of mortal kingdoms. Their connection to the Aether runs deep, granting unmatched magical ability but a certain emotional distance.',
      lore: 'The eldest children of starlight, elves were formed when the moon wept tears of silver into the primordial sea.',
      stats: { str: -1, dex: 2, con: -1, int: 3, wis: 2, cha: 1 },
      bonusSkillPoints: 0,
      traits: ['Ancient Knowledge', 'Arcane Affinity', 'Trance'],
      passives: [
        { id: 'arcane_blood', name: 'Arcane Blood', desc: '+30% spell power, +20% MP pool', icon: '✨' },
        { id: 'trance', name: 'Trance', desc: 'Need no sleep; meditation fully restores MP', icon: '🌙' },
        { id: 'keen_senses', name: 'Keen Senses', desc: 'Cannot be surprised; detect hidden enemies', icon: '👁' }
      ],
      startingAbility: 'Arcane Bolt',
      physique: { skinTones: ['Moonpale','Snow','Starlit','Dusk','Dawn'], hairColors: ['Silver','White','Gold','Midnight','Starfire'], eyeColors: ['Silver','Violet','Gold','Moonblue','Emerald'], bodyTypes: ['Lithe','Slender','Willowy','Graceful'] }
    },
    dwarf: {
      id: 'dwarf', name: 'Ironborn Dwarf', icon: '⛏', tagline: 'Forged in stone, tempered by flame',
      description: 'Dwarves are the children of the deep earth, born with stone in their bones and fire in their hearts. Their resilience is legendary — their stubbornness even more so.',
      lore: 'The god-smith Vaelthar carved the first dwarves from a mountain\\'s heart and breathed forge-fire into them.',
      stats: { str: 2, dex: -1, con: 3, int: 1, wis: 1, cha: 0 },
      bonusSkillPoints: 0,
      traits: ['Stonecunning', 'Poison Resistance', 'Combat Training'],
      passives: [
        { id: 'stoneblood', name: 'Stoneblood', desc: '+25% max HP, reduce physical damage by 5', icon: '🛡' },
        { id: 'forge_master', name: 'Forge Master', desc: '+20% weapon and armor effectiveness', icon: '⚒' },
        { id: 'stubborn', name: 'Unbroken', desc: 'Survive lethal hits once per battle at 1 HP', icon: '💪' }
      ],
      startingAbility: 'Battle Cry',
      physique: { skinTones: ['Stone','Ruddy','Bronze','Iron','Granite'], hairColors: ['Black','Brown','Red','Iron-grey','Amber'], eyeColors: ['Brown','Amber','Grey','Coal','Topaz'], bodyTypes: ['Stocky','Massive','Barrel-chested','Stout'] }
    },
    tiefling: {
      id: 'tiefling', name: 'Tiefling', icon: '😈', tagline: 'Hellfire in their veins, starlight in their hearts',
      description: 'Born with infernal heritage, tieflings carry the weight of their ancestors\\' pacts. Mistrusted by many, their dark gifts can serve light or shadow equally.',
      lore: 'When the demon-lord Xareth was slain, his essence scattered across the mortal realm, leaving a dark mark on bloodlines for generations.',
      stats: { str: 1, dex: 1, con: 0, int: 2, wis: 0, cha: 2 },
      bonusSkillPoints: 0,
      traits: ['Hellfire Resistance', 'Darkvision', 'Infernal Legacy'],
      passives: [
        { id: 'infernal_gift', name: 'Infernal Gift', desc: 'Fire damage +35%; immune to hellfire', icon: '🔥' },
        { id: 'darkvision', name: 'Darkvision', desc: 'No penalties in darkness; see invisible', icon: '🌑' },
        { id: 'silver_tongue', name: 'Silver Tongue', desc: '+3 Charisma in negotiations; charm effects extended', icon: '💬' }
      ],
      startingAbility: 'Hellfire Bolt',
      physique: { skinTones: ['Crimson','Burgundy','Ash','Violet','Shadow'], hairColors: ['Black','Dark Red','Purple','Midnight','Charcoal'], eyeColors: ['Red','Gold','Violet','Black','Ember'], bodyTypes: ['Lean','Athletic','Wiry','Imposing'] }
    },
    orc: {
      id: 'orc', name: 'Half-Orc', icon: '💚', tagline: 'Two worlds, one unstoppable will',
      description: 'Half-orcs carry the raw power of orcish blood tempered by human cunning. Often misunderstood, they are among the most formidable warriors in the known world.',
      lore: 'Born of brutal conquest and unlikely love alike, half-orcs have carved their own culture from the margins of two worlds.',
      stats: { str: 3, dex: 1, con: 2, int: -1, wis: 0, cha: -1 },
      bonusSkillPoints: 0,
      traits: ['Savage Attack', 'Relentless', 'Intimidating'],
      passives: [
        { id: 'savage_strikes', name: 'Savage Strikes', desc: 'Critical hits deal +50% damage', icon: '⚔' },
        { id: 'relentless', name: 'Relentless', desc: 'Once per short rest, surge to max HP when reduced to 0', icon: '🔥' },
        { id: 'intimidating', name: 'Intimidating Presence', desc: 'Enemies have -15% accuracy against you', icon: '😤' }
      ],
      startingAbility: 'Berserker Rage',
      physique: { skinTones: ['Moss Green','Olive','Sage','Emerald','Swamp'], hairColors: ['Black','Dark Brown','None','White','Deep Red'], eyeColors: ['Yellow','Red','Brown','Amber','Black'], bodyTypes: ['Massive','Hulking','Powerful','Built'] }
    },
    gnome: {
      id: 'gnome', name: 'Gnome', icon: '🔮', tagline: 'Brilliant minds, boundless curiosity',
      description: 'Gnomes are master artificers and illusionists, their quick minds constantly inventing, scheming, and creating. Small in stature, immense in imagination.',
      lore: 'The tinker-god Zibbet breathed life into clay and gears, and from that union came the gnomes — curious, inventive, and unbound by convention.',
      stats: { str: -2, dex: 2, con: 0, int: 3, wis: 1, cha: 1 },
      bonusSkillPoints: 1,
      traits: ['Artificer\'s Eye', 'Gnomish Cunning', 'Tinker'],
      passives: [
        { id: 'gnomish_cunning', name: 'Gnomish Cunning', desc: 'Advantage on all INT saves; craft speed doubled', icon: '⚙' },
        { id: 'illusion_affinity', name: 'Illusion Weave', desc: 'Illusion spells cost 40% less MP; last 50% longer', icon: '🌀' },
        { id: 'tinker', name: 'Tinker', desc: 'Can craft gadgets from inventory materials mid-dungeon', icon: '🔧' }
      ],
      startingAbility: 'Spark Trap',
      physique: { skinTones: ['Rose','Honey','Copper','Tawny','Cream'], hairColors: ['Brown','Russet','Orange','White','Teal'], eyeColors: ['Hazel','Copper','Teal','Amber','Bright Blue'], bodyTypes: ['Tiny','Compact','Wiry','Nimble'] }
    },
    dragonborn: {
      id: 'dragonborn', name: 'Dragonborn', icon: '🐉', tagline: 'Dragon\'s blood flows eternal',
      description: 'Dragonborn carry the legacy of ancient wyrms. Their draconic ancestry grants breath weapons, scales of hardened flesh, and a pride that borders on divinity.',
      lore: 'When the great Dragon Aeltharax chose to walk as mortal, some of his children inherited his form — and his fire.',
      stats: { str: 2, dex: 0, con: 1, int: 1, wis: 0, cha: 2 },
      bonusSkillPoints: 0,
      traits: ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance'],
      passives: [
        { id: 'breath_weapon', name: 'Breath Weapon', desc: 'Breathe elemental damage in a cone 1x/combat', icon: '🐲' },
        { id: 'draconic_resistance', name: 'Draconic Resistance', desc: 'Resist your element type; +2 natural AC', icon: '🛡' },
        { id: 'draconic_presence', name: 'Draconic Presence', desc: 'Aura causes Frightened in weak enemies', icon: '✨' }
      ],
      startingAbility: 'Draconic Roar',
      physique: { skinTones: ['Red','Blue','Black','White','Gold','Green','Bronze','Copper'], hairColors: ['None - Horns','Ridges','Fins','Spines'], eyeColors: ['Gold','Red','Silver','Violet','White'], bodyTypes: ['Powerful','Scaled','Armored','Dragon-kin'] }
    },
    shadowkin: {
      id: 'shadowkin', name: 'Shadowkin', icon: '🌑', tagline: 'Born between worlds, belonging to none',
      description: 'Shadowkin exist partially in the Shadow Realm, granting them uncanny stealth and the ability to manipulate darkness itself. They are the ultimate infiltrators.',
      lore: 'When the veil between life and shadow tore during the Sundering, some souls were reborn straddling both worlds.',
      stats: { str: 0, dex: 3, con: -1, int: 1, wis: 1, cha: 0 },
      bonusSkillPoints: 0,
      traits: ['Shadow Step', 'Umbral Form', 'Life Drain'],
      passives: [
        { id: 'shadow_step', name: 'Shadow Step', desc: 'Teleport through shadows 1x/turn', icon: '🌑' },
        { id: 'umbral_form', name: 'Umbral Form', desc: 'Become incorporeal for 2 turns 1x/rest', icon: '👁' },
        { id: 'life_drain', name: 'Life Drain', desc: 'Drain 5% of max HP from enemies per kill', icon: '💀' }
      ],
      startingAbility: 'Shadow Meld',
      physique: { skinTones: ['Void Black','Deep Grey','Ash','Shadow Blue','Eclipse'], hairColors: ['Black','Shadow White','Void','Dark Violet','Silver-black'], eyeColors: ['Void White','Shadow Grey','Black','Pale Gold','Ghost Blue'], bodyTypes: ['Wispy','Slender','Spectral','Shifting'] }
    },
    celestial: {
      id: 'celestial', name: 'Aasimar', icon: '😇', tagline: 'Heaven\'s light made mortal',
      description: 'Blessed by divine lineage, Aasimar carry celestial power within them. Radiant and commanding, they are born leaders and healers — or fallen angels twisted by darkness.',
      lore: 'The god Lumenos occasionally grants divine essence to mortals. Their descendants carry this light for generations.',
      stats: { str: 0, dex: 0, con: 1, int: 1, wis: 3, cha: 3 },
      bonusSkillPoints: 0,
      traits: ['Divine Radiance', 'Healing Touch', 'Celestial Resistance'],
      passives: [
        { id: 'radiant_aura', name: 'Radiant Aura', desc: '+20% healing; heal allies in 10ft each turn', icon: '✨' },
        { id: 'divine_protection', name: 'Divine Protection', desc: 'Immune to necrotic; +25% resistance to dark magic', icon: '🌟' },
        { id: 'fallen_grace', name: 'Fallen Grace', desc: 'Transform: enter Radiant or Dark form 1x/day', icon: '⚡' }
      ],
      startingAbility: 'Holy Light',
      physique: { skinTones: ['Radiant Gold','Pearl','Dawn Pink','Sunrise','Moonwhite'], hairColors: ['Golden','Silver','Platinum','White','Aureate'], eyeColors: ['Golden','Silver','Pure White','Radiant Blue','Starlight'], bodyTypes: ['Ethereal','Graceful','Luminous','Celestial'] }
    },
    wildborn: {
      id: 'wildborn', name: 'Wildborn', icon: '🌿', tagline: 'One with the eternal wild',
      description: 'Wildborn are humans touched by primal nature magic, manifesting animal aspects. They command beasts, commune with nature, and transform their bodies into weapons.',
      lore: 'When the Wildmothers walked the earth, some mortals were forever changed by their passage, carrying beast-souls within.',
      stats: { str: 2, dex: 2, con: 1, int: 0, wis: 2, cha: -1 },
      bonusSkillPoints: 0,
      traits: ['Beast Aspect', 'Nature Bond', 'Wild Sense'],
      passives: [
        { id: 'beast_aspect', name: 'Beast Aspect', desc: 'Gain an animal aspect (Bear/Wolf/Eagle/Serpent)', icon: '🦁' },
        { id: 'nature_bond', name: 'Nature Bond', desc: 'Beast companions are twice as effective', icon: '🌲' },
        { id: 'wild_sense', name: 'Wild Sense', desc: 'Detect traps, poison, enemies at full range', icon: '🌿' }
      ],
      startingAbility: 'Wild Shape',
      physique: { skinTones: ['Bark Brown','Moss Green','Earth Red','Amber','Forest Gold'], hairColors: ['Leaves','Vines','Brown','Wild White','Storm Grey'], eyeColors: ['Amber','Green','Gold','Copper','Storm Blue'], bodyTypes: ['Wild','Primal','Beastly','Feral'] }
    }
  },

  // ===================================================
  // CLASSES — 12 unique classes
  // ===================================================
  classes: {
    warrior: {
      id: 'warrior', name: 'Iron Warden', icon: '⚔', role: 'Tank / DPS',
      description: 'Masters of martial combat, Iron Wardens wade through armies where others flee. Their bodies are weapons; their will is unbreakable.',
      primaryStat: 'str', secondaryStat: 'con',
      hpPerLevel: 14, mpPerLevel: 2,
      startingStats: { hp: 140, mp: 20, attack: 18, defense: 14, speed: 8 },
      startingItems: ['iron_sword', 'chainmail', 'health_potion'],
      skillTrees: ['combat', 'defense', 'warlord'],
      abilities: ['Power Strike', 'Shield Wall', 'Berserker Rage'],
      lore: 'Trained in the great war academies, Iron Wardens are the anvils upon which enemies break.',
      playstyle: 'Front-line fighter. High HP and defense. Can taunt enemies and protect allies.'
    },
    mage: {
      id: 'mage', name: 'Arcane Scholar', icon: '🔮', role: 'DPS / Support',
      description: 'Wielders of raw aetheric power, Arcane Scholars bend reality to their will. Fragile but devastating.',
      primaryStat: 'int', secondaryStat: 'wis',
      hpPerLevel: 6, mpPerLevel: 14,
      startingStats: { hp: 60, mp: 140, attack: 8, defense: 4, speed: 9 },
      startingItems: ['apprentice_staff', 'scholar_robes', 'mana_potion', 'spellbook'],
      skillTrees: ['fire', 'arcane', 'time'],
      abilities: ['Fireball', 'Arcane Bolt', 'Time Dilation'],
      lore: 'Forged in the tower academies of the Sylvani Accord, these scholars treat magic as science — precise, powerful, lethal.',
      playstyle: 'Explosive burst damage. Low health. Needs positioning and resource management.'
    },
    rogue: {
      id: 'rogue', name: 'Shadowblade', icon: '🗡', role: 'DPS / Utility',
      description: 'Shadowblades deal death from the dark — assassins, thieves, spies. They control the battlefield through deception and precision.',
      primaryStat: 'dex', secondaryStat: 'cha',
      hpPerLevel: 8, mpPerLevel: 6,
      startingStats: { hp: 80, mp: 60, attack: 14, defense: 7, speed: 15 },
      startingItems: ['twin_daggers', 'leather_armor', 'smoke_bomb', 'lockpicks'],
      skillTrees: ['assassination', 'shadow', 'trickery'],
      abilities: ['Backstab', 'Shadow Step', 'Poison Blade'],
      lore: 'The Shadowblades guild operates in every city, serving the highest bidder — yet bound by their own strict code.',
      playstyle: 'Critical hit focused. Stealth openers. High risk, extreme reward.'
    },
    paladin: {
      id: 'paladin', name: 'Divine Crusader', icon: '✝', role: 'Tank / Healer',
      description: 'Bound by sacred oath, Divine Crusaders channel holy power through martial might. They are simultaneously a fortress and a beacon.',
      primaryStat: 'cha', secondaryStat: 'str',
      hpPerLevel: 12, mpPerLevel: 8,
      startingStats: { hp: 120, mp: 80, attack: 15, defense: 12, speed: 7 },
      startingItems: ['holy_mace', 'plate_armor', 'holy_shield', 'healing_herbs'],
      skillTrees: ['holy', 'protection', 'oaths'],
      abilities: ['Smite', 'Lay on Hands', 'Divine Shield'],
      lore: 'Sworn before the gods, a Crusader\'s oath determines their power — and breaking it costs them everything.',
      playstyle: 'Hybrid tank-healer. Smite for burst. Protect allies. Oath system changes abilities.'
    },
    ranger: {
      id: 'ranger', name: 'Pathfinder', icon: '🏹', role: 'DPS / Scout',
      description: 'Masters of wilderness and ranged combat, Pathfinders excel in any environment. Their animal companions fight by their side.',
      primaryStat: 'dex', secondaryStat: 'wis',
      hpPerLevel: 10, mpPerLevel: 6,
      startingStats: { hp: 100, mp: 60, attack: 16, defense: 8, speed: 12 },
      startingItems: ['hunters_bow', 'studded_leather', 'quiver', 'wolf_whistle'],
      skillTrees: ['archery', 'beast_mastery', 'survival'],
      abilities: ['Precise Shot', 'Call Beast', 'Hunter\'s Mark'],
      lore: 'Trained in the wild edges of civilization, Pathfinders are scouts, hunters, and protectors of the borderlands.',
      playstyle: 'Ranged DPS with companion. Mark targets for bonus damage. Excellent at kiting.'
    },
    warlock: {
      id: 'warlock', name: 'Pact Binder', icon: '📿', role: 'DPS / Debuffer',
      description: 'Pact Binders have sold something precious for forbidden power — and they are very good at spending it. Dark, chaotic, irreversible.',
      primaryStat: 'cha', secondaryStat: 'int',
      hpPerLevel: 8, mpPerLevel: 10,
      startingStats: { hp: 80, mp: 100, attack: 12, defense: 6, speed: 10 },
      startingItems: ['cursed_tome', 'warlock_focus', 'soul_crystal', 'dark_cloak'],
      skillTrees: ['eldritch', 'curse', 'patron'],
      abilities: ['Eldritch Blast', 'Hex', 'Dark Bargain'],
      lore: 'Somewhere in the dark between planes, an entity waits. The Pact Binder feeds it souls in exchange for power.',
      playstyle: 'Debuff and DoT focused. Patron choice dramatically changes playstyle. High floor, high ceiling.'
    },
    bard: {
      id: 'bard', name: 'Loreweaver', icon: '🎵', role: 'Support / Hybrid',
      description: 'Loreweavers carry the power of stories themselves — inspiring allies, confounding enemies, bending fate with word and song.',
      primaryStat: 'cha', secondaryStat: 'wis',
      hpPerLevel: 8, mpPerLevel: 8,
      startingStats: { hp: 80, mp: 80, attack: 10, defense: 6, speed: 11 },
      startingItems: ['enchanted_lute', 'fine_clothing', 'bardic_scroll', 'silver_tongue'],
      skillTrees: ['inspiration', 'illusion_song', 'fate_weaving'],
      abilities: ['Battle Hymn', 'Fascinate', 'Countercharm'],
      lore: 'The College of Whispered Words teaches that stories shape reality. A Loreweaver is the author of every battle.',
      playstyle: 'Team buffer. Inspiration dice mechanic. Strong in dialogue and diplomacy. Flexible damage.'
    },
    druid: {
      id: 'druid', name: 'Stormcaller', icon: '🌿', role: 'Healer / DPS',
      description: 'Stormcallers channel the raw fury of nature — storms, beasts, cycles of life and death. They can become the wild itself.',
      primaryStat: 'wis', secondaryStat: 'con',
      hpPerLevel: 10, mpPerLevel: 10,
      startingStats: { hp: 100, mp: 100, attack: 10, defense: 8, speed: 10 },
      startingItems: ['druidic_staff', 'hide_armor', 'nature_totem', 'healing_salve'],
      skillTrees: ['nature_magic', 'beast_form', 'storm'],
      abilities: ['Entangle', 'Wild Shape', 'Call Lightning'],
      lore: 'The Circle of Ancient Stones initiates those who can hear the heartbeat of the world. Few survive the listening.',
      playstyle: 'Shape-shift between forms. Nature healer. Powerful area control spells.'
    },
    necromancer: {
      id: 'necromancer', name: 'Deathmage', icon: '💀', role: 'Summoner / DPS',
      description: 'The line between life and death is a suggestion to a Deathmage. They command armies of undead, drain life, and cheat mortality itself.',
      primaryStat: 'int', secondaryStat: 'wis',
      hpPerLevel: 7, mpPerLevel: 12,
      startingStats: { hp: 70, mp: 120, attack: 10, defense: 5, speed: 8 },
      startingItems: ['bone_wand', 'death_shroud', 'soul_gem', 'necrotic_tome'],
      skillTrees: ['undead_mastery', 'life_drain', 'entropy'],
      abilities: ['Raise Dead', 'Life Drain', 'Soul Cage'],
      lore: 'In the Tomb Academy beneath the Ashborn desert, students pay tuition with their lifespan.',
      playstyle: 'Minion master. Drain life for sustain. Increasingly powerful the longer battles go.'
    },
    monk: {
      id: 'monk', name: 'Void Walker', icon: '☯', role: 'DPS / Tank',
      description: 'Void Walkers have emptied themselves of all that is unnecessary. What remains is a weapon that cannot be dulled, broken, or stopped.',
      primaryStat: 'wis', secondaryStat: 'dex',
      hpPerLevel: 10, mpPerLevel: 8,
      startingStats: { hp: 100, mp: 80, attack: 16, defense: 10, speed: 18 },
      startingItems: ['ki_bands', 'monk_robes', 'meditation_bead', 'void_scroll'],
      skillTrees: ['ki_combat', 'void_arts', 'inner_peace'],
      abilities: ['Flurry of Blows', 'Empty Body', 'Stunning Strike'],
      lore: 'The Monastery of the Absent Mountain trains those who will become nothing — and in doing so, become everything.',
      playstyle: 'Fastest class. Resource (Ki) management. No weapons needed. Stun and mobility focused.'
    },
    bloodknight: {
      id: 'bloodknight', name: 'Blood Knight', icon: '🩸', role: 'DPS / Sustain',
      description: 'Blood Knights sacrifice their own life force to unleash devastating power. The line between sacrifice and victory is drawn in blood — theirs.',
      primaryStat: 'str', secondaryStat: 'con',
      hpPerLevel: 12, mpPerLevel: 4,
      startingStats: { hp: 120, mp: 40, attack: 20, defense: 8, speed: 11 },
      startingItems: ['bloodforged_blade', 'war_mail', 'blood_vial', 'crimson_rune'],
      skillTrees: ['blood_arts', 'berserker', 'vampiric'],
      abilities: ['Blood Strike', 'Life Tap', 'Crimson Surge'],
      lore: 'Those who walked through the Crimson Gate either died or emerged as Blood Knights — warriors for whom pain is power.',
      playstyle: 'Spend HP to deal damage. Lifesteal to recover. Incredible highs, razor-thin margins.'
    },
    artificer: {
      id: 'artificer', name: 'Runesmith', icon: '⚙', role: 'Support / Utility',
      description: 'Runesmiths fuse magic with engineering, crafting weapons, gadgets, and constructs of extraordinary power. Every problem is solvable with enough gears.',
      primaryStat: 'int', secondaryStat: 'dex',
      hpPerLevel: 8, mpPerLevel: 8,
      startingStats: { hp: 80, mp: 80, attack: 12, defense: 8, speed: 10 },
      startingItems: ['rune_tools', 'reinforced_coat', 'mechanical_owl', 'explosive_rune'],
      skillTrees: ['constructs', 'runic_weapons', 'gadgetry'],
      abilities: ['Deploy Turret', 'Runic Infusion', 'Clockwork Bomb'],
      lore: 'The Runesmith Guilds of the Stoneheart Compact sell their inventions to every army — and their loyalty to none.',
      playstyle: 'Setup-heavy playstyle. Prepare for battles. Constructs and turrets fight for you.'
    }
  },

  // ===================================================
  // ORIGINS — Background stories
  // ===================================================
  origins: [
    { id: 'noble', name: 'Fallen Noble', icon: '👑', desc: 'Once wealthy and powerful, now stripped of everything. You know courts, politics, and how to lie beautifully.', bonus: '+2 CHA, +1 INT, Courtly Manners skill', stats: { cha: 2, int: 1 }, startGold: 150, skills: ['courtly_manners', 'heraldry'] },
    { id: 'soldier', name: 'Veteran Soldier', icon: '⚔', desc: 'Years of war have hardened you. You know battle formations, weapon maintenance, and when to retreat.', bonus: '+2 STR, +1 CON, Tactics skill', stats: { str: 2, con: 1 }, startGold: 60, skills: ['tactics', 'first_aid'] },
    { id: 'scholar', name: 'Rogue Scholar', icon: '📚', desc: 'Expelled from the Academy for asking the wrong questions. You have knowledge they didn\'t want you to have.', bonus: '+2 INT, +1 WIS, Forbidden Lore skill', stats: { int: 2, wis: 1 }, startGold: 40, skills: ['forbidden_lore', 'arcane_theory'] },
    { id: 'criminal', name: 'Criminal', icon: '🗡', desc: 'The law never understood you. Or maybe it understood too well. Either way, you know how the underworld works.', bonus: '+2 DEX, +1 CHA, Criminal Contacts skill', stats: { dex: 2, cha: 1 }, startGold: 80, skills: ['criminal_contacts', 'sleight_of_hand'] },
    { id: 'hermit', name: 'Hermit Sage', icon: '🌿', desc: 'Years of isolation granted you communion with nature and insight no academy can teach.', bonus: '+2 WIS, +1 CON, Nature Lore skill', stats: { wis: 2, con: 1 }, startGold: 20, skills: ['nature_lore', 'meditation'] },
    { id: 'outlander', name: 'Tribal Outlander', icon: '🏕', desc: 'From the untamed edges of civilization, where every day is survival. You know things city folk never will.', bonus: '+2 CON, +1 STR, Survival skill', stats: { con: 2, str: 1 }, startGold: 30, skills: ['survival', 'tracking'] },
    { id: 'acolyte', name: 'Fallen Acolyte', icon: '⛪', desc: 'You served the gods faithfully. Then you saw behind the curtain. Your faith is complicated now, but your training remains.', bonus: '+2 WIS, +1 CHA, Divine Knowledge skill', stats: { wis: 2, cha: 1 }, startGold: 50, skills: ['divine_knowledge', 'ritual_magic'] },
    { id: 'sailor', name: 'Cursed Sailor', icon: '⚓', desc: 'The sea gave and the sea took. You\'ve seen things in the deep that most people can\'t imagine — and some you\'d rather forget.', bonus: '+2 DEX, +1 WIS, Sea Lore skill', stats: { dex: 2, wis: 1 }, startGold: 70, skills: ['sea_lore', 'navigation'] }
  ],

  // ===================================================
  // SKILLS — Massive skill trees per class branch
  // ===================================================
  skillTrees: {
    combat: {
      name: 'Combat Mastery', icon: '⚔', color: '#c0253a',
      nodes: [
        { id: 'power_strike', name: 'Power Strike', icon: '💥', x: 50, y: 50, desc: 'Your strikes carry crushing force.', effects: ['+15% melee damage'], cost: 1, requires: [], maxRank: 3 },
        { id: 'cleave', name: 'Cleave', icon: '⚔', x: 150, y: 80, desc: 'Hit all enemies in front of you.', effects: ['Cleave hits all adjacent enemies'], cost: 1, requires: ['power_strike'], maxRank: 2 },
        { id: 'weapon_mastery', name: 'Weapon Mastery', icon: '🗡', x: 50, y: 160, desc: 'Expert with all weapon types.', effects: ['+10% attack speed', '+5% crit chance'], cost: 2, requires: ['power_strike'], maxRank: 3 },
        { id: 'bladestorm', name: 'Bladestorm', icon: '🌪', x: 250, y: 120, desc: 'Spin dealing damage to all around you.', effects: ['360° AoE attack', 'Stagger enemies'], cost: 2, requires: ['cleave'], maxRank: 2 },
        { id: 'reckless_attack', name: 'Reckless Attack', icon: '😤', x: 150, y: 220, desc: 'Attack wildly for massive damage.', effects: ['+30% damage', '-15% defense for 1 turn'], cost: 1, requires: ['weapon_mastery'], maxRank: 2 },
        { id: 'martial_arts', name: 'Martial Arts', icon: '🤜', x: 50, y: 280, desc: 'Unarmed strikes become deadly.', effects: ['Unarmed = weapon-class damage', 'Extra unarmed attack/turn'], cost: 2, requires: ['weapon_mastery'], maxRank: 2 },
        { id: 'death_blow', name: 'Death Blow', icon: '💀', x: 350, y: 160, desc: 'Execute low-health enemies.', effects: ['Instant kill below 20% HP', 'Shockwave on kill'], cost: 3, requires: ['bladestorm'], maxRank: 1 },
        { id: 'thousand_cuts', name: 'Thousand Cuts', icon: '⚡', x: 250, y: 280, desc: 'Rapid strikes overwhelm defenses.', effects: ['5 rapid attacks at 60% damage each'], cost: 3, requires: ['reckless_attack', 'bladestorm'], maxRank: 2 },
        { id: 'war_god', name: 'Aspect of War', icon: '🔱', x: 350, y: 320, desc: 'Channel the god of war itself.', effects: ['Double all combat stats for 5 turns', '1x/day'], cost: 5, requires: ['death_blow', 'thousand_cuts'], maxRank: 1 }
      ]
    },
    defense: {
      name: 'Iron Fortress', icon: '🛡', color: '#2458a8',
      nodes: [
        { id: 'fortify', name: 'Fortify', icon: '🛡', x: 50, y: 50, desc: 'Steel yourself against blows.', effects: ['+8 defense'], cost: 1, requires: [], maxRank: 5 },
        { id: 'shield_expertise', name: 'Shield Expert', icon: '🔵', x: 180, y: 50, desc: 'Master of shield techniques.', effects: ['Block chance +20%', 'Bash stuns enemies'], cost: 1, requires: [], maxRank: 3 },
        { id: 'armor_mastery', name: 'Armor Mastery', icon: '⚙', x: 50, y: 160, desc: 'Wear armor like a second skin.', effects: ['Remove armor speed penalty', '+10% armor effectiveness'], cost: 2, requires: ['fortify'], maxRank: 2 },
        { id: 'endure', name: 'Endure', icon: '💪', x: 180, y: 160, desc: 'Outlast any assault.', effects: ['+25% max HP', 'Regen HP out of combat'], cost: 2, requires: ['fortify', 'shield_expertise'], maxRank: 3 },
        { id: 'parry', name: 'Counter Parry', icon: '↩', x: 310, y: 80, desc: 'Turn defense into attack.', effects: ['25% chance to counter on block', 'Counter deals 150% damage'], cost: 2, requires: ['shield_expertise'], maxRank: 3 },
        { id: 'last_stand', name: 'Last Stand', icon: '🔥', x: 50, y: 280, desc: 'Fight hardest when near death.', effects: ['+50% damage below 25% HP'], cost: 3, requires: ['armor_mastery', 'endure'], maxRank: 2 },
        { id: 'taunt', name: 'Warcry Taunt', icon: '😤', x: 310, y: 200, desc: 'Force all enemies to target you.', effects: ['All enemies must attack you for 2 turns', 'Grant allies attack bonus'], cost: 2, requires: ['parry'], maxRank: 2 },
        { id: 'immortal', name: 'Immortal Resolve', icon: '♾', x: 200, y: 350, desc: 'You cannot die.', effects: ['Revive 1x/battle at 30% HP', 'Immune to one-shots'], cost: 5, requires: ['last_stand', 'taunt'], maxRank: 1 }
      ]
    },
    fire: {
      name: 'Pyromancy', icon: '🔥', color: '#e07830',
      nodes: [
        { id: 'fire_bolt', name: 'Fire Bolt', icon: '🔥', x: 50, y: 50, desc: 'Hurl a bolt of searing flame.', effects: ['1d6+INT fire damage', 'Costs 5 MP'], cost: 1, requires: [], maxRank: 5 },
        { id: 'burning', name: 'Burning', icon: '🌡', x: 180, y: 50, desc: 'Your flames linger.', effects: ['Targets burn for 3 turns'], cost: 1, requires: ['fire_bolt'], maxRank: 3 },
        { id: 'fireball', name: 'Fireball', icon: '💥', x: 50, y: 160, desc: 'Explosive area attack.', effects: ['3d8+INT AoE fire damage', 'Costs 20 MP'], cost: 2, requires: ['fire_bolt'], maxRank: 3 },
        { id: 'fire_mastery', name: 'Pyromancer\'s Mastery', icon: '🌋', x: 180, y: 160, desc: 'Fire magic becomes second nature.', effects: ['+30% fire damage', 'Fire spell MP cost -25%'], cost: 2, requires: ['burning', 'fireball'], maxRank: 3 },
        { id: 'meteor', name: 'Meteor Strike', icon: '☄', x: 310, y: 120, desc: 'Call a meteor from the sky.', effects: ['Massive AoE, 10d10 fire', 'Costs 60 MP'], cost: 3, requires: ['fireball'], maxRank: 2 },
        { id: 'phoenix_form', name: 'Phoenix Form', icon: '🦅', x: 50, y: 280, desc: 'Become the Phoenix.', effects: ['Fly', 'All spells become fire', 'Revive on death (1x)'], cost: 4, requires: ['fire_mastery'], maxRank: 1 },
        { id: 'inferno', name: 'Inferno', icon: '🌊', x: 310, y: 280, desc: 'The world burns.', effects: ['Sustained fire AoE each turn for 5 turns'], cost: 4, requires: ['meteor', 'fire_mastery'], maxRank: 2 },
        { id: 'sun_lord', name: 'Lord of the Sun', icon: '☀', x: 200, y: 360, desc: 'Channel the power of a star.', effects: ['All fire spells free', '+100% fire damage', '1x/day 30 secs'], cost: 5, requires: ['phoenix_form', 'inferno'], maxRank: 1 }
      ]
    },
    shadow: {
      name: 'Shadow Arts', icon: '🌑', color: '#5a2d8a',
      nodes: [
        { id: 'stealth', name: 'Stealth', icon: '👤', x: 50, y: 50, desc: 'Vanish from sight.', effects: ['Enter stealth out of combat freely', 'Stealth in combat costs 2 AP'], cost: 1, requires: [], maxRank: 3 },
        { id: 'backstab', name: 'Backstab', icon: '🗡', x: 180, y: 50, desc: 'Devastating from behind.', effects: ['5x damage from stealth', 'Automatically crits'], cost: 2, requires: ['stealth'], maxRank: 3 },
        { id: 'shadow_step', name: 'Shadow Step', icon: '🌑', x: 50, y: 160, desc: 'Teleport through shadows.', effects: ['Short-range shadow teleport', '15s cooldown'], cost: 1, requires: ['stealth'], maxRank: 3 },
        { id: 'evasion', name: 'Evasion', icon: '💨', x: 180, y: 160, desc: 'Dodge at impossible angles.', effects: ['+25% dodge chance', 'Dodge AoE spells fully'], cost: 2, requires: ['shadow_step', 'backstab'], maxRank: 3 },
        { id: 'shadowform', name: 'Shadow Form', icon: '👁', x: 310, y: 100, desc: 'Become pure shadow.', effects: ['Untargetable for 3 turns', '1x per combat'], cost: 3, requires: ['shadow_step'], maxRank: 2 },
        { id: 'death_mark', name: 'Death Mark', icon: '💀', x: 50, y: 280, desc: 'Mark a target for death.', effects: ['Marked target receives +50% damage', 'Lasts 5 turns'], cost: 2, requires: ['evasion'], maxRank: 3 },
        { id: 'shadow_clone', name: 'Shadow Clone', icon: '👥', x: 310, y: 260, desc: 'Create shadow duplicates.', effects: ['2 shadow clones fight for you', 'Each has 50% your stats'], cost: 4, requires: ['shadowform', 'evasion'], maxRank: 2 },
        { id: 'night_lord', name: 'Night Lord', icon: '🌙', x: 200, y: 360, desc: 'Become one with the night.', effects: ['Permanent stealth', 'True invisibility', 'All attacks backstabs'], cost: 5, requires: ['shadow_clone', 'death_mark'], maxRank: 1 }
      ]
    },
    arcane: {
      name: 'Arcane Mastery', icon: '✨', color: '#7c3dba',
      nodes: [
        { id: 'arcane_bolt', name: 'Arcane Bolt', icon: '⚡', x: 50, y: 50, desc: 'Pure magical force.', effects: ['1d8+INT force damage', 'Ignores physical armor'], cost: 1, requires: [], maxRank: 5 },
        { id: 'mana_shield', name: 'Mana Shield', icon: '💠', x: 180, y: 50, desc: 'Convert MP to damage absorption.', effects: ['10 MP = 15 damage absorbed'], cost: 1, requires: [], maxRank: 3 },
        { id: 'spell_mastery', name: 'Spell Mastery', icon: '📖', x: 50, y: 160, desc: 'All spells strengthened.', effects: ['+15% spell damage', '+1 spell slot'], cost: 2, requires: ['arcane_bolt'], maxRank: 5 },
        { id: 'counterspell', name: 'Counterspell', icon: '🚫', x: 180, y: 160, desc: 'Interrupt and nullify enemy magic.', effects: ['Cancel any enemy spell', 'Steal their MP'], cost: 2, requires: ['mana_shield', 'arcane_bolt'], maxRank: 2 },
        { id: 'arcane_surge', name: 'Arcane Surge', icon: '🌊', x: 310, y: 100, desc: 'Unleash stored magical energy.', effects: ['Triple all spell damage for 2 turns', 'Drains 50% current MP'], cost: 3, requires: ['spell_mastery'], maxRank: 2 },
        { id: 'teleport', name: 'Arcane Gate', icon: '🌀', x: 50, y: 280, desc: 'Create magical portals.', effects: ['Teleport any distance within dungeon', 'Create gates for allies'], cost: 3, requires: ['counterspell'], maxRank: 2 },
        { id: 'time_stop', name: 'Time Stop', icon: '⏱', x: 310, y: 260, desc: 'Freeze time for all but yourself.', effects: ['3 free turns', '1x/day'], cost: 5, requires: ['arcane_surge', 'counterspell'], maxRank: 1 },
        { id: 'reality_warp', name: 'Reality Warp', icon: '🌌', x: 200, y: 360, desc: 'Rewrite the rules of reality.', effects: ['Anything is possible', 'Choose any effect per use', '1x/encounter'], cost: 5, requires: ['time_stop', 'teleport'], maxRank: 1 }
      ]
    },
    holy: {
      name: 'Divine Power', icon: '✦', color: '#f8e878',
      nodes: [
        { id: 'smite', name: 'Divine Smite', icon: '⚡', x: 50, y: 50, desc: 'Channel divine power through weapon.', effects: ['2d8 radiant damage on hit', '+4d8 vs undead/fiends'], cost: 1, requires: [], maxRank: 5 },
        { id: 'lay_hands', name: 'Lay on Hands', icon: '🤲', x: 180, y: 50, desc: 'Heal with sacred touch.', effects: ['Heal 5×CHA HP to target', 'Cure any disease/poison'], cost: 1, requires: [], maxRank: 3 },
        { id: 'divine_favor', name: 'Divine Favor', icon: '✦', x: 50, y: 160, desc: 'Blessed by your deity.', effects: ['+1d4 radiant on all attacks', '+2 AC'], cost: 2, requires: ['smite'], maxRank: 3 },
        { id: 'mass_heal', name: 'Mass Healing Word', icon: '💫', x: 180, y: 160, desc: 'Heal all allies simultaneously.', effects: ['Heal all allies for 3d4+WIS', 'Costs 30 MP'], cost: 2, requires: ['lay_hands', 'divine_favor'], maxRank: 3 },
        { id: 'consecrate', name: 'Consecrate Ground', icon: '🌟', x: 310, y: 100, desc: 'Hallow the ground beneath.', effects: ['Sacred AoE, damages undead each turn', 'Allies +10 HP regen in zone'], cost: 2, requires: ['divine_favor'], maxRank: 2 },
        { id: 'resurrection', name: 'Resurrection', icon: '💖', x: 50, y: 280, desc: 'Revive the fallen.', effects: ['Restore fallen ally to 50% HP', '1x/long rest'], cost: 4, requires: ['mass_heal'], maxRank: 1 },
        { id: 'avatar', name: 'Avatar of Divinity', icon: '☀', x: 310, y: 260, desc: 'Become a vessel of your god.', effects: ['All holy stats doubled', 'Wings', 'Immunity to evil', '10 min/day'], cost: 5, requires: ['consecrate', 'mass_heal'], maxRank: 1 }
      ]
    }
  },

  // ===================================================
  // ITEMS — Weapons, Armor, Consumables, Quest Items
  // ===================================================
  items: {
    // Starter weapons
    iron_sword: { id: 'iron_sword', name: 'Iron Sword', icon: '⚔', type: 'weapon', rarity: 'common', slot: 'mainhand', attack: 8, desc: 'A serviceable blade, reliable if unexceptional.', value: 40, weight: 3 },
    twin_daggers: { id: 'twin_daggers', name: 'Shadow Daggers', icon: '🗡', type: 'weapon', rarity: 'common', slot: 'mainhand', attack: 6, speedBonus: 4, critBonus: 10, desc: 'Fast and deadly in the right hands.', value: 60, weight: 2 },
    apprentice_staff: { id: 'apprentice_staff', name: 'Apprentice Staff', icon: '🪄', type: 'weapon', rarity: 'common', slot: 'mainhand', attack: 4, spellBonus: 15, mpBonus: 20, desc: 'Carved from aetherthorn, it hums with stored magic.', value: 80, weight: 2 },
    hunters_bow: { id: 'hunters_bow', name: 'Hunter\'s Longbow', icon: '🏹', type: 'weapon', rarity: 'common', slot: 'mainhand', attack: 10, rangeBonus: true, desc: 'Compact and powerful. Favored by border rangers.', value: 55, weight: 2 },
    holy_mace: { id: 'holy_mace', name: 'Blessed Mace', icon: '🔨', type: 'weapon', rarity: 'uncommon', slot: 'mainhand', attack: 9, holyBonus: 5, desc: 'Sanctified in the Temple of Lumenos. Undead tremble.', value: 100, weight: 4 },
    bone_wand: { id: 'bone_wand', name: 'Bone Wand', icon: '🦴', type: 'weapon', rarity: 'uncommon', slot: 'mainhand', attack: 3, necroBonus: 20, mpBonus: 30, desc: 'Cut from the skeleton of a lich. Deeply unsettling.', value: 120, weight: 1 },
    // Armors
    chainmail: { id: 'chainmail', name: 'Chainmail', icon: '🛡', type: 'armor', rarity: 'common', slot: 'chest', defense: 12, desc: 'Interlocking iron rings. Heavy but proven.', value: 80, weight: 8 },
    leather_armor: { id: 'leather_armor', name: 'Supple Leather', icon: '🥋', type: 'armor', rarity: 'common', slot: 'chest', defense: 6, speedBonus: 2, desc: 'Treated leather that moves with you.', value: 50, weight: 4 },
    scholar_robes: { id: 'scholar_robes', name: 'Scholar\'s Robes', icon: '👘', type: 'armor', rarity: 'common', slot: 'chest', defense: 2, spellBonus: 10, mpBonus: 40, desc: 'Woven with aetheric thread. Offers little physical protection.', value: 90, weight: 1 },
    plate_armor: { id: 'plate_armor', name: 'Holy Plate', icon: '⚔', type: 'armor', rarity: 'uncommon', slot: 'chest', defense: 18, desc: 'Full plate blessed by the crusader orders.', value: 250, weight: 14 },
    // Consumables
    health_potion: { id: 'health_potion', name: 'Health Potion', icon: '🧪', type: 'consumable', rarity: 'common', effect: 'heal', value_roll: '3d8+20', desc: 'Bright crimson. Tastes of copper and wildflower.', count: 2, shopValue: 50, weight: 0.5 },
    mana_potion: { id: 'mana_potion', name: 'Mana Draught', icon: '💧', type: 'consumable', rarity: 'common', effect: 'mana', value_roll: '2d6+30', desc: 'Deep azure, glowing faintly. Tastes of ozone.', count: 2, shopValue: 60, weight: 0.5 },
    smoke_bomb: { id: 'smoke_bomb', name: 'Smoke Bomb', icon: '💨', type: 'consumable', rarity: 'common', effect: 'stealth', desc: 'Grants stealth immediately on use.', count: 2, shopValue: 30, weight: 0.3 },
    healing_herbs: { id: 'healing_herbs', name: 'Healing Herbs', icon: '🌿', type: 'consumable', rarity: 'common', effect: 'regen', desc: 'Chew for slow but steady HP recovery over 3 turns.', count: 3, shopValue: 20, weight: 0.1 },
    // Legendary items
    aetherstone_shard: { id: 'aetherstone_shard', name: 'Aetherstone Shard', icon: '💎', type: 'quest', rarity: 'legendary', desc: 'A fragment of the Primordial Crystal. It pulses with reality-warping power.', value: 0, weight: 0.1 },
    crown_of_dusk: { id: 'crown_of_dusk', name: 'Crown of Eternal Dusk', icon: '👑', type: 'armor', rarity: 'legendary', slot: 'head', defense: 8, allStats: 5, desc: 'Worn by the last god-king. The weight of eternity sits heavy.', value: 9999, weight: 1 },
    voidbreaker: { id: 'voidbreaker', name: 'Voidbreaker', icon: '⚡', type: 'weapon', rarity: 'legendary', slot: 'mainhand', attack: 35, spellBonus: 40, desc: 'Forged in the gap between worlds. It cuts through reality.', value: 9999, weight: 3 },
    soul_crystal: { id: 'soul_crystal', name: 'Imprisoned Soul', icon: '🔮', type: 'quest', rarity: 'epic', desc: 'A soul trapped in crystalline prison. It whispers constantly.', value: 200, weight: 0.2 }
  },

  // ===================================================
  // BUFFS & DEBUFFS
  // ===================================================
  buffs: {
    // Positive
    blessed: { id: 'blessed', name: 'Blessed', icon: '✦', color: '#f8e878', duration: 10, effects: { attackMod: 1.2, defenseMod: 1.1 }, desc: 'Divine favor rests upon you.' },
    hasted: { id: 'hasted', name: 'Haste', icon: '⚡', color: '#60c8f0', duration: 5, effects: { speedMod: 2, extraAttack: true }, desc: 'Time moves slower for everyone else.' },
    strengthened: { id: 'strengthened', name: 'Empowered', icon: '💪', color: '#c0253a', duration: 8, effects: { attackMod: 1.5 }, desc: 'Your strikes carry crushing weight.' },
    invisible: { id: 'invisible', name: 'Invisible', icon: '👁', color: '#5a2d8a', duration: 3, effects: { untargetable: true }, desc: 'You are unseen, untouched.' },
    regenerating: { id: 'regenerating', name: 'Regenerating', icon: '💚', color: '#3dba78', duration: 5, effects: { hpRegenPerTurn: 15 }, desc: 'Wounds knit themselves shut.' },
    shielded: { id: 'shielded', name: 'Shield of Faith', icon: '🛡', color: '#2458a8', duration: 6, effects: { damageBlock: 20 }, desc: 'A divine barrier absorbs harm.' },
    inspired: { id: 'inspired', name: 'Inspired', icon: '🎵', color: '#e07830', duration: 4, effects: { allMod: 1.15 }, desc: 'A bard\'s song fills you with purpose.' },
    berserking: { id: 'berserking', name: 'Berserker', icon: '😤', color: '#c0253a', duration: 5, effects: { attackMod: 1.8, defenseMod: 0.7 }, desc: 'Pure rage floods your veins.' },
    // Negative
    poisoned: { id: 'poisoned', name: 'Poisoned', icon: '☠', color: '#2d8a5a', duration: 4, effects: { hpDrainPerTurn: 8, speedMod: 0.85 }, desc: 'Venom courses through you.' },
    burning: { id: 'burning', name: 'Burning', icon: '🔥', color: '#e07830', duration: 3, effects: { hpDrainPerTurn: 12 }, desc: 'You are on fire.' },
    cursed: { id: 'cursed', name: 'Cursed', icon: '💀', color: '#5a2d8a', duration: 8, effects: { allMod: 0.7 }, desc: 'Dark magic clouds your every move.' },
    stunned: { id: 'stunned', name: 'Stunned', icon: '⭐', color: '#888780', duration: 1, effects: { skipTurn: true }, desc: 'Stars fill your vision.' },
    feared: { id: 'feared', name: 'Feared', icon: '😨', color: '#8b1a2e', duration: 2, effects: { mustFlee: true }, desc: 'Primal terror takes hold.' },
    slowed: { id: 'slowed', name: 'Slowed', icon: '🐌', color: '#4a4560', duration: 3, effects: { speedMod: 0.5, attackSpeedMod: 0.7 }, desc: 'Your limbs feel like lead.' },
    hexed: { id: 'hexed', name: 'Hexed', icon: '📿', color: '#7c3dba', duration: 5, effects: { damageTakenMod: 1.5 }, desc: 'A warlock\'s curse marks you for suffering.' }
  },

  // ===================================================
  // THE STORY ENGINE — Branching narrative nodes
  // ===================================================
  story: {
    // CHAPTER 1
    intro: {
      id: 'intro', title: 'The Verdant Crossroads',
      art: '🌅', bg: 'dawn-forest',
      text: 'Dawn breaks over the Verdant Crossroads — four roads meeting at the ancient Waystone of Aelthas. Your journey has led you here, to a moment that will ripple through history.\n\nSmoke rises on the eastern road. Three black-cloaked figures stand at the stone, chanting in a tongue that makes your teeth ache. They do not see you.\n\nNot yet.',
      choices: [
        { text: '⚔ Charge them immediately — they must be stopped', next: 'attack_cultists', type: 'combat', flag: 'aggressive_opener' },
        { text: '👁 Watch from cover and learn what they\'re doing', next: 'observe_cultists', type: 'stealth', req: null },
        { text: '💬 Step forward and demand answers', next: 'confront_cultists', type: 'social', flag: 'diplomatic_opener' },
        { text: '🔮 Sense the magical emanations from the stone', next: 'detect_magic_waystone', type: 'magic', req: { stat: 'int', value: 12 } },
        { text: '🏃 Back away silently and seek information first', next: 'town_first', type: 'stealth', flag: 'cautious_opener' }
      ]
    },

    attack_cultists: {
      id: 'attack_cultists', title: 'Blood Before Words',
      art: '⚔', bg: 'battle-dawn',
      text: 'You draw your weapon and charge. The cultists turn — too slow. The first falls before the ritual completes. But the second draws a dagger crackling with black lightning, and the third SCREAMS a word that splits the air.\n\nThe Waystone pulses. Something was partially activated.',
      choices: [
        { text: '⚔ Press the attack — finish them both', next: 'combat_waystone', combat: true, enemy: 'cultist_duo' },
        { text: '🛡 Grab the second and demand answers', next: 'captured_cultist', type: 'str' },
        { text: '🔮 Try to reverse the ritual while fighting', next: 'combat_ritual_reversal', type: 'magic', req: { stat: 'int', value: 14 } }
      ],
      storyFlags: ['cultists_alerted', 'waystone_partial_activation']
    },

    observe_cultists: {
      id: 'observe_cultists', title: 'In the Shadows',
      art: '👁', bg: 'misty-dawn',
      text: 'From the brush you watch, barely breathing. The ritual is complex — a Waystone Awakening. They\'re trying to send a signal across the ley lines to something in the east. One cultist reads from a cracked tome. Another holds a glowing shard.\n\nAn Aetherstone shard.\n\nThe third keeps watch — and their eyes sweep dangerously close to your hiding spot.',
      choices: [
        { text: '⚔ Rush them now — you have surprise on your side', next: 'ambush_cultists', type: 'combat', bonus: 'surprise_attack' },
        { text: '📖 Memorize the ritual — it could be useful', next: 'memorize_ritual', type: 'int', req: { stat: 'int', value: 10 } },
        { text: '🗡 Steal the shard before they complete the ritual', next: 'steal_shard', type: 'dex', req: { stat: 'dex', value: 14 } },
        { text: '💬 Wait and follow the survivor after the ritual', next: 'follow_cultist', flag: 'spy_route' }
      ]
    },

    confront_cultists: {
      id: 'confront_cultists', title: 'Words at the Waystone',
      art: '💬', bg: 'tense-dawn',
      text: '"Halt!" you call. They freeze. Then the leader — a woman with eyes like black mirrors — smiles.\n\n"Another soul for the Veilbreaker," she says. "How convenient. Will you join willingly? Your power would serve the Unmaking well."\n\nShe means it. There\'s no contempt in her voice — genuine invitation. That\'s more disturbing than threats.',
      choices: [
        { text: '"Join you? Tell me why I should." — Probe for information', next: 'cultist_pitch', type: 'social', flag: 'heard_cult_offer' },
        { text: '"Never." — Refuse immediately', next: 'refused_cult', flag: 'rejected_cult' },
        { text: '👿 Play along — pretend to consider it', next: 'fake_join_cult', type: 'cha', req: { stat: 'cha', value: 13 }, flag: 'deceived_cultists' },
        { text: '⚔ Answer with steel', next: 'attack_cultists' }
      ]
    },

    cultist_pitch: {
      id: 'cultist_pitch', title: 'The Unmaking',
      art: '🌑', bg: 'void-sky',
      text: 'The cultist speaks for a long moment. The Veilbreaker Cult serves an entity older than gods — the Unweaving. It seeks to take the Primordial Crystal shards and restore chaos to a world it sees as an abomination of false order.\n\n"We don\'t want to destroy the world," she says. "We want to free it."\n\nSomething about her conviction is... compelling. Frighteningly so.',
      storyFlags: ['learned_cult_doctrine'],
      choices: [
        { text: 'This is madness. Attack.', next: 'attack_cultists' },
        { text: '"Free it? You\'d kill millions." — Push back on the philosophy', next: 'debate_unmaking', type: 'wis' },
        { text: '"Where are the shards?" — Focus on what matters', next: 'learn_shard_locations' },
        { text: 'Express genuine interest — you\'ve always felt the world was wrong', next: 'dark_path_begin', type: 'cha', flag: 'dark_leanings', storyPath: 'shadow' }
      ]
    },

    fake_join_cult: {
      id: 'fake_join_cult', title: 'The Long Game',
      art: '😈', bg: 'shadow-hall',
      text: 'You bow your head, expression carefully neutral. "I\'ve been looking for purpose. Perhaps this is it."\n\nThe leader\'s black eyes study you for a long moment. Then she smiles.\n\n"Sister Vael will accompany you to the Ashen Fortress. Prove your worth, and the Veilbreaker will reward you beyond imagining."\n\nYou\'re in. And completely surrounded by people who will kill you the moment they suspect the truth.',
      storyFlags: ['infiltrating_cult', 'dangerous_deception'],
      choices: [
        { text: 'Follow Sister Vael — go deep undercover', next: 'deep_cover', storyPath: 'infiltrator' },
        { text: 'Wait for an opening and run', next: 'blown_cover', type: 'dex' }
      ]
    },

    deep_cover: {
      id: 'deep_cover', title: 'Among Wolves',
      art: '🌑', bg: 'fortress-dark',
      text: 'The Ashen Fortress is massive — hewn into a dead volcano, filled with hundreds of cultists. You learn their rituals. Their ranks. Their fears.\n\nAnd something else: not everyone here chose this. Some are slaves. Some are terrified. Some are true believers.\n\nSister Vael watches you constantly. She is not fooled as easily as the others.',
      storyFlags: ['inside_the_cult', 'vael_suspicious'],
      choices: [
        { text: 'Earn trust by completing a cult mission', next: 'cult_mission', flag: 'earned_trust' },
        { text: 'Begin organizing the unwilling prisoners', next: 'prisoner_liberation', storyPath: 'liberator' },
        { text: 'Find the Shard and steal it', next: 'shard_heist', type: 'dex' },
        { text: 'Confront Vael — she knows, and maybe she can be turned', next: 'turn_vael', type: 'cha', req: { stat: 'cha', value: 16 } }
      ]
    },

    town_first: {
      id: 'town_first', title: 'Ashwick Village',
      art: '🏘', bg: 'village-morning',
      text: 'You find the village of Ashwick a mile down the western road. It\'s small, nervous. Three farmers bar the inn door when they see you coming.\n\nThe innkeeper — a stout woman named Morra — relaxes when she sees you\'re alone. She has a lot to say about the "black-robed strangers" and the missing villagers and the light that\'s been pulsing from the old Waystone at night.',
      choices: [
        { text: '💬 Ask Morra everything she knows about the cult', next: 'morra_intel' },
        { text: '🔭 Climb the church tower to scout the area', next: 'scout_area', type: 'dex' },
        { text: '⚔ Offer to help the village — ask what they need', next: 'village_quests', flag: 'village_helper' },
        { text: '💰 Check the bounty board', next: 'bounty_board' }
      ]
    },

    morra_intel: {
      id: 'morra_intel', title: 'Morra\'s Warning',
      art: '🏘', bg: 'inn-interior',
      text: '"Three nights back, the Waystone glowed black," Morra says, pouring you something strong. "Then Ser Aldric — our constable — just... left. Said he had \'new orders.\' And the Miller\'s daughter, gone the same night."\n\nShe lowers her voice. "There\'s a resistance. Survivors from the eastern towns who escaped the Cult. They meet in the old mill. But I\'d be careful — I think one of them might be a plant."',
      storyFlags: ['heard_about_resistance', 'morra_trusts_you'],
      choices: [
        { text: 'Go to the resistance meeting immediately', next: 'resistance_meeting', flag: 'joined_resistance' },
        { text: 'Investigate Ser Aldric — he might be key', next: 'find_aldric', storyPath: 'investigation' },
        { text: 'Find the Miller\'s daughter first', next: 'rescue_quest', flag: 'good_path' }
      ]
    },

    resistance_meeting: {
      id: 'resistance_meeting', title: 'The Resistance',
      art: '🕯', bg: 'mill-interior',
      text: 'Seven people huddle in the mill by candlelight. A scarred soldier named Brenn leads them. A gnomish artificer. A scared young priest. A woman with a ranger\'s bearing and watchful eyes.\n\nAnd one person whose pupils, for just a moment, catch the light wrong.\n\nBrenn looks you over. "We don\'t take strangers lightly. Prove you\'re not a cult spy."',
      choices: [
        { text: '"I killed two cultists at the Waystone." Show proof.', next: 'resistance_accepted', req: { flag: 'cultists_alerted' } },
        { text: '"Test me however you need to." Submit to scrutiny.', next: 'resistance_test' },
        { text: 'Point out the person with wrong eyes — the cult spy', next: 'expose_spy', type: 'wis', req: { stat: 'wis', value: 12 }, flag: 'caught_spy' },
        { text: 'Watch quietly and gather intelligence', next: 'resistance_intel', type: 'dex' }
      ]
    },

    // MAJOR BRANCHING POINT
    act2_choose: {
      id: 'act2_choose', title: 'Chapter II: Paths Diverge',
      art: '🌍', bg: 'world-map',
      text: 'The world opens before you. Four major powers want your alliance. Each offers something different. Each wants something in return.\n\nThe RESISTANCE fights to stop the Cult. The EMPIRE wants to use the shards for conquest. The CULT offers power beyond imagining. And somewhere, a HIDDEN COUNCIL whispers that all three are pieces of a larger game.\n\nWhere you go next changes everything.',
      choices: [
        { text: '⚔ Join the Resistance — fight the Veilbreaker Cult', next: 'path_resistance', storyPath: 'hero', faction: 'resistance' },
        { text: '👑 Ally with the Drakthari Empire — use power to defeat power', next: 'path_empire', storyPath: 'pragmatist', faction: 'empire' },
        { text: '🌑 Go deeper into the Cult — learn its secrets from within', next: 'path_infiltrator', storyPath: 'shadow', faction: 'cult_deep' },
        { text: '🔮 Seek the Hidden Council — the Awakened Loremasters', next: 'path_hidden', storyPath: 'seeker', faction: 'loremasters' },
        { text: '😈 Make a play for power yourself — claim the shards', next: 'path_conqueror', storyPath: 'villain', faction: 'self' }
      ]
    },

    path_resistance: {
      id: 'path_resistance', title: 'The Long Fight',
      art: '🔥', bg: 'resistance-camp',
      text: 'Commander Brenn clasps your arm. "You\'ve chosen the harder road — saving people who\'ll never know your name."\n\nThe Resistance operates out of the Sunken Barrows, a fortified ruin complex in the Ashwood. You\'re given a mission: infiltrate the Ashen Fortress and destroy the Waystone amplifier before the Veilbreaker Cult activates all six Waystones simultaneously.\n\nThe operation begins at dawn.',
      storyFlags: ['resistance_member', 'act2_resistance'],
      choices: [
        { text: '⚔ Lead the assault — take the fight to them directly', next: 'resistance_assault', type: 'combat' },
        { text: '🗡 Infiltrate alone — fewer numbers, less noise', next: 'resistance_infiltrate', type: 'stealth' },
        { text: '📖 Study the fortress plans and find a weakness first', next: 'resistance_plan', type: 'int' },
        { text: '💬 Recruit more to the cause before attacking', next: 'resistance_recruit', type: 'cha', storyPath: 'leader' }
      ]
    },

    path_empire: {
      id: 'path_empire', title: 'The Iron Throne',
      art: '👑', bg: 'imperial-throne',
      text: 'Grand Prefect Marius receives you in armor, not robes. "I don\'t trust idealists," he says bluntly. "But I trust people who want something. What do you want?"\n\nThe Empire can destroy the Cult — they have the army. But Marius wants the Aetherstones for himself, to create weapons that would make him the undisputed master of the continent.\n\nYou can shape how this alliance works. What you negotiate now echoes through history.',
      storyFlags: ['empire_ally', 'act2_empire'],
      choices: [
        { text: '"I want a seat at the table." — Negotiate power for yourself', next: 'empire_power_deal' },
        { text: '"I want the Cult destroyed — nothing else." — Idealistic terms', next: 'empire_idealistic' },
        { text: '"I want the Stones kept safe, not weaponized." — Bargain hard', next: 'empire_stone_deal', type: 'cha', req: { stat: 'cha', value: 15 } },
        { text: 'Agree now, plan to betray the Empire when the time comes', next: 'empire_double_cross', flag: 'betrayer', storyPath: 'traitor' }
      ]
    },

    // ENDGAME APPROACHES
    final_confrontation: {
      id: 'final_confrontation', title: 'The Last Hour',
      art: '⚡', bg: 'apocalypse-sky',
      text: 'The six Waystones ignite simultaneously, and the sky tears open. The Primordial Crystal\'s fragments spiral upward toward the rift.\n\nThe Veilbreaker stands at the center of it all — something that was once human, now threaded with void-light. The choice that ends everything stands before you.\n\nAnd three paths remain.',
      choices: [
        { text: '💥 Destroy all the shards — end magic in the world forever', next: 'ending_sacrifice', storyPath: 'sacrifice', req: { flag: 'has_aetherstone' } },
        { text: '✦ Reunite the shards and seal the rift — restore the Crystal', next: 'ending_restoration', type: 'all_stats', req: { flag: 'loremasters_ally' } },
        { text: '⚡ Take the power for yourself — become the new god', next: 'ending_ascension', req: { flag: 'dark_leanings' } },
        { text: '💬 Reach the human within the Veilbreaker — stop this with words', next: 'ending_redemption', type: 'cha', req: { stat: 'cha', value: 20 } }
      ]
    },

    ending_sacrifice: {
      id: 'ending_sacrifice', title: 'THE END: The Silencing',
      art: '💔', bg: 'grey-dawn',
      text: 'You plunge into the vortex and destroy the shards one by one. The Veilbreaker screams. The rift closes. Magic fades from the world — not all of it, but the raw Aetheric power that made great magic possible.\n\nThe Cult is destroyed. The Empire loses its arcane advantage. The world becomes smaller, harder, more human.\n\nYou wake in a field of grey ash, alone, your power gone. Somewhere children are crying because the world is quiet now.\n\nWas it worth it?\n\n🏆 ENDING: The Sacrifice — The world lives. Magic sleeps.',
      ending: true, endingType: 'bittersweet'
    },

    ending_restoration: {
      id: 'ending_restoration', title: 'THE END: The Restoration',
      art: '🌅', bg: 'golden-dawn',
      text: 'You gather the shards and step into the rift. The Crystal reforms around you, and for one impossible moment you contain all of it — all the magic, all the stories, all the potential.\n\nThen you release it. The rift seals. The Veilbreaker, stripped of void-power, collapses — just a person again, confused and terrified.\n\nMagic returns to the world, balanced, as it was meant to be. You return to earth, changed but whole.\n\nThe Resistance cheers. Morra cries. Even the Empire stands down.\n\n🏆 ENDING: The Restoration — The best ending. Earn it.',
      ending: true, endingType: 'good'
    },

    ending_ascension: {
      id: 'ending_ascension', title: 'THE END: The New God',
      art: '⚡', bg: 'void-throne',
      text: 'Power floods through you. The Veilbreaker is absorbed, its mission complete but its vessel wrong — this power was meant for you.\n\nYou ascend.\n\nThe world kneels. Not out of fear — out of recognition. Something ancient and right has returned. You are the Primordial Crystal reborn in flesh, and you will remake this world as it should have been.\n\nIs this what you wanted? Look around at the terrified, awed faces of those who trusted you.\n\nYou are their god now.\n\n🏆 ENDING: The Ascension — Power without mercy.',
      ending: true, endingType: 'ambiguous'
    },

    ending_redemption: {
      id: 'ending_redemption', title: 'THE END: The Human Touch',
      art: '💫', bg: 'light-breaking',
      text: '"I know you\'re still in there," you say, reaching through the void-light toward whatever remains of the person the Veilbreaker once was.\n\nSilence.\n\nThen, impossibly — a hand reaches back.\n\nThe void collapses inward. The shards scatter harmlessly. The rift seals itself. The Veilbreaker stands before you — just a person, hollow-eyed, trembling.\n\n"I don\'t remember how to be this," they whisper.\n\n"Neither did I," you say. "We\'ll figure it out."\n\n🏆 ENDING: The Redemption — The rarest ending. Requires 20 Charisma and a heart that refused to harden.',
      ending: true, endingType: 'perfect'
    }
  },

  // ===================================================
  // ENEMIES
  // ===================================================
  enemies: {
    cultist: { id: 'cultist', name: 'Cult Acolyte', icon: '🧟', hp: 35, mp: 20, attack: 8, defense: 4, speed: 8, xp: 25, gold: [5,15], abilities: ['Dark Bolt', 'Shadow Shriek'], lore: 'Newly initiated. Fanatical but untrained.' },
    cultist_duo: { id: 'cultist_duo', name: 'Cult Acolytes', icon: '🧟🧟', hp: 60, mp: 30, attack: 10, defense: 6, speed: 9, xp: 50, gold: [10,25], abilities: ['Dark Bolt', 'Coordinated Strike'], lore: 'Two minds working as one.' },
    dark_knight: { id: 'dark_knight', name: 'Void Knight', icon: '⚫', hp: 120, mp: 40, attack: 18, defense: 14, speed: 7, xp: 150, gold: [30,60], abilities: ['Void Strike', 'Shadow Armor', 'Fear Aura'], lore: 'A paladin whose oath shattered and was replaced.' },
    forest_troll: { id: 'forest_troll', name: 'Forest Troll', icon: '🧌', hp: 200, mp: 0, attack: 22, defense: 8, speed: 6, xp: 200, gold: [20,40], abilities: ['Regenerate', 'Boulder Throw', 'Crushing Grip'], lore: 'Ancient and territorial. Can regrow limbs.' },
    shadow_wraith: { id: 'shadow_wraith', name: 'Shadow Wraith', icon: '👻', hp: 80, mp: 80, attack: 15, defense: 0, speed: 16, xp: 180, gold: [15,45], abilities: ['Life Drain', 'Terrify', 'Phase Shift'], lore: 'A soul trapped between worlds, bitter and hungry.' },
    cultist_mage: { id: 'cultist_mage', name: 'Cult Hexer', icon: '🧙', hp: 55, mp: 120, attack: 6, defense: 3, speed: 9, xp: 120, gold: [20,50], abilities: ['Hex', 'Void Bolt', 'Curse'], lore: 'Gifted the Veilbreaker\'s power in exchange for devotion.' },
    veilbreaker: { id: 'veilbreaker', name: 'The Veilbreaker', icon: '🌑', hp: 800, mp: 500, attack: 40, defense: 20, speed: 15, xp: 5000, gold: [500,1000], abilities: ['Reality Tear', 'Void Cascade', 'Soul Shatter', 'Unmake'], lore: 'An ancient being of chaos given mortal form. The end of all things — or their beginning.', boss: true }
  },

  // ===================================================
  // FACTIONS
  // ===================================================
  factions: {
    resistance: { id: 'resistance', name: 'The Resistance', icon: '⚔', color: '#c0253a', desc: 'Survivors and fighters dedicated to stopping the Veilbreaker Cult at any cost.', startRep: 0 },
    empire: { id: 'empire', name: 'Drakthari Empire', icon: '👑', color: '#c9a84c', desc: 'The most powerful political force in the known world. Ruthless, organized, effective.', startRep: 0 },
    cult: { id: 'cult', name: 'Veilbreaker Cult', icon: '🌑', color: '#5a2d8a', desc: 'Servants of the Unweaving, seeking to shatter the veil and unmake creation.', startRep: -50 },
    loremasters: { id: 'loremasters', name: 'Awakened Loremasters', icon: '📖', color: '#60c8f0', desc: 'A secret society of scholars who have studied the Primordial Crystal for millennia.', startRep: 0 },
    guilds: { id: 'guilds', name: 'Free Merchant Guilds', icon: '⚖', color: '#3dba78', desc: 'Commerce makes the world turn. Neutral, pragmatic, and well-informed.', startRep: 10 }
  },

  // ===================================================
  // WORLD LOCATIONS
  // ===================================================
  locations: [
    { id: 'crossroads', name: 'Verdant Crossroads', x: 400, y: 280, type: 'neutral', desc: 'Where your story began. An ancient Waystone marks the intersection of four roads.' },
    { id: 'ashwick', name: 'Ashwick Village', x: 280, y: 260, type: 'settlement', desc: 'A small farming village, scarred by cult raids but holding together.' },
    { id: 'ashen_fortress', name: 'Ashen Fortress', x: 560, y: 200, type: 'dungeon', desc: 'The primary stronghold of the Veilbreaker Cult, built into a dead volcano.' },
    { id: 'barrows', name: 'Sunken Barrows', x: 200, y: 320, type: 'dungeon', desc: 'Ancient ruins repurposed as the Resistance headquarters.' },
    { id: 'imperial_city', name: 'Drak\'Thar City', x: 380, y: 180, type: 'city', desc: 'Capital of the Drakthari Empire. Impressive. Oppressive.' },
    { id: 'ashwood', name: 'Ashwood Forest', x: 250, y: 350, type: 'wilderness', desc: 'Ancient forest where shadow-beasts roam among trees that remember the old world.' },
    { id: 'ruins', name: 'Waystone Ruins', x: 520, y: 360, type: 'dungeon', desc: 'Scattered ruins of the original Waystone network. Dangerous with residual magic.' },
    { id: 'void_gate', name: 'The Void Gate', x: 600, y: 300, type: 'boss', desc: 'The tear in reality. The final confrontation awaits here.' }
  ],

  // ===================================================
  // NAMES for random generation
  // ===================================================
  names: {
    human: ['Aldric','Brenna','Caelum','Dara','Emric','Faya','Gareth','Hilla','Ivan','Jana','Kern','Lira','Marcus','Nessa','Owen','Petra','Rynn','Sara','Torin','Una'],
    elf: ['Aelindra','Brightwater','Caladrel','Daelindel','Elaleth','Fariniel','Galadreth','Haliniel','Illyria','Jarath','Kaelthas','Lirien','Mirethis','Nalindel','Oriniel'],
    dwarf: ['Bram','Dolga','Gurn','Helga','Ironhammer','Kragg','Lorgur','Mira','Norbok','Orvun','Petra','Rindal','Stoneback','Thordak','Ulda','Vorgrin'],
    tiefling: ['Akmenos','Barakas','Damakos','Ekemon','Iados','Kairon','Leucis','Melech','Neros','Orev','Paemos','Riven','Skamos','Therai','Xanaphia','Zafir'],
    orc: ['Grash','Brugh','Kruzz','Morga','Thrag','Ulka','Vrenn','Wrath','Yarga','Zorg'],
    gnome: ['Alston','Boddynock','Brocc','Burgell','Dimble','Eldon','Erky','Fonkin','Gimble','Glim','Jebeddo','Kellen','Namfoodle','Orryn','Roondar','Seebo','Sindri','Warryn'],
    default: ['Aiden','Blade','Cyan','Dawn','Echo','Flint','Grey','Haze','Iron','Jade']
  }
};
