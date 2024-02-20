// Beta alert box

window.onload = function(){ 
  alert("Welcome to Perilous Quest! This game is in alpha and is not yet ready for release. Please enjoy the game and report any bugs you see!");
}

let xp = 0;
let health = 300;
let gold = 100;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 80
  },
  {
    name: "fanged beast",
    level: 8,
    health: 160
  },
  {
    name: "dragon",
    level: 20,
    health: 600
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Shop\". Enter?"
  },
  {
    name: "store",
    "button text": ["Buy 10 health ♥️ (10 gold)", "Buy weapon 🗡️ (30 gold)", "Your broke. Leave shop"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: 'You enter the store. "Hello!" -Tanner the shop owner'
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters... or is that your friend Nait?"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run like a coward"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster. LET'S GO!"
  },
  {
    name: "kill monster",
    "button text": [" --> ", "Go to town square", "Go to town square"],
    "button functions": [null, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold. Nice! your a natural'
  },
  {
    name: "lose",
    "button text": [" --> ", "REPLAY?", "REPLAY?"],
    "button functions": [null, restart, restart],
    text: "You died. ☠️ Respawn?"
  },
  { 
    name: "win", 
    "button text": [" --> ", "REPLAY?", "REPLAY?"], 
    "button functions": [null, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME, WOO 🎉! Have some cheese: 🧀" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win gold ⚜️!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
  boss_theme.pause();
  boss_theme.currentTime = 0;
  shop.pause();
  shop.currentTime = 0;
  lovely_town.play();
}

// Store functions
function goStore() {
  update(locations[1]);
  lovely_town.pause();
  lovely_town.currentTime = 0;
  shop.play();
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Music

//Town theme
let lovely_town = document.getElementById("lovely_town");

function playtown() {
  lovely_town.play();
}

function pausetown() {
  lovely_town.pause();
}

//Shop theme
let shop = document.getElementById("shop");

function playshop() {
  shop.play();
}

function pauseshop() {
  shop.pause();
}


//Boss theme
let boss_theme = document.getElementById("boss_theme");

function playboss() {
  boss_theme.play();
}

function pauseboss() {
  boss_theme.pause();
  boss_theme.currentTime = 0;
}

// Fight

function fightSlime() {
  fighting = 0;
  goFight();
  lovely_town.pause();
  lovely_town.currentTime = 0;
  boss_theme.play();
}

function fightBeast() {
  fighting = 1;
  goFight();
  lovely_town.pause();
  lovely_town.currentTime = 0;
  boss_theme.play();
}

function fightDragon() {
  fighting = 2;
  goFight();
  lovely_town.pause();
  lovely_town.currentTime = 0;
  boss_theme.play();
}

// Fight function
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// Attack function
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 300;
  gold = 100;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
  boss_theme.pause();
  boss_theme.currentTime = 0;
  lovely_town.play();
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

// Secret game
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
