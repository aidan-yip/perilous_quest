// Offline Alert

window.addEventListener("offline", function (event) {
  alert("You're offline please reconnect to Wi-Fi to play Perilous Quest.");
});

// Mobile Alert

function check_mobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    alert("Volume slider not suported on mobile");
    console.log("mobile browser");
  } else {
    console.log("desktop browser");
  }
}

// Volume

function updateVolume() {
  const newVolume = document.getElementById("volume").value;
  document
    .querySelectorAll("video, audio, embed, object")
    .forEach((element) => (element.volume = newVolume));
  if (newVolume >= 0 && newVolume <= 0) {
    document.getElementById("volume_icon").innerText = "no_sound";
  } else {
    document.getElementById("volume_icon").innerText = "volume_up";
  }

  if (newVolume >= 0.1 && newVolume <= 0.4) {
    document.getElementById("volume_icon").innerText = "volume_down_alt";
  } else {
    null;
  }
  console.log(newVolume);
  check_mobile();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("volume").addEventListener("input", updateVolume);
});

// Notifications

let notification;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    notification = new Notification("Music Alert", {
      body: "Perilous Quest is still running. To stop the audio close the app",
      icon: "./public/icons/homescreen192.png",
      tag: "Come Back",
    });
  } else {
    notification.close();
  }
});

//Pop up window

const popup = document.getElementById("popback");
const popclose = document.getElementById("popclose");
const background = document.getElementById("background");

popclose.onclick = closepop;

function closepop() {
  popup.style.display = "none";
  background.style.filter = "blur(0px) brightness(100%)";
}

//Navbar

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("navbar").style.backgroundColor = "#00000080";
  } else {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }
}

//List menu

const list_menu = document.getElementById("list_menu");
const menu_button = document.getElementById("menu_button");
const menu_button_span = document.getElementById("menu_button_span");

menu_button.onclick = show_menu;

function show_menu() {
  if (list_menu.style.display === "flex") {
    list_menu.style.display = "none";
    menu_button_span.innerText = "menu";
    menu_button.setAttribute("title", "Menu");
  } else {
    list_menu.style.display = "flex";
    menu_button_span.innerText = "close";
    menu_button.setAttribute("title", "Close");
  }
}

//Info alert

const info_alert = document.getElementById("info_alert");

info_alert.onclick = info_pop;

function info_pop() {
  alert(
    "Perilous Quest" +
      "\n\n" +
      "Version 1.0.0" +
      "\n\n" +
      "(Beta build 10.1.0-2024)" +
      "\n\n" +
      "Copyright © 2024 Aidan Yip. All rights reserved."
  );
}

// Game reset popup

function gameReset() {
  let text = "Reset Game?";
  if (confirm(text) == true) {
    location.href = "";
  } else {
    null;
  }
}

// Leave game popup

function leaveGame() {
  let text = "Quit Game?";
  if (confirm(text) == true) {
    location.href = "/index.html";
  } else {
    null;
  }
}

// Get help popup

function getHelp() {
  let text = "Get Help?";
  if (confirm(text) == true) {
    location.href = "/help.pdf";
  } else {
    null;
  }
}

// Install game popup

function installGame() {
  let text = "Leave Game?";
  if (confirm(text) == true) {
    location.href = "/public/perilous_quest/install/install.html";
  } else {
    null;
  }
}

// Art game popup

function art() {
  let text = "Leave Game?";
  if (confirm(text) == true) {
    location.href = "/public/perilous_quest/art/art.html";
  } else {
    null;
  }
}

// Bandcamp link

function goBandcamp() {
  let text = "Leave Game and Download Soundtrack?";
  if (confirm(text) == true) {
    window.open(
      "https://newaveoceans.bandcamp.com/album/perilous-quest-soundtrack",
      "_blank"
    );
  } else {
    null;
  }
}

//Cursor trail

(function ($) {
  var baseCssClass = "cursor-trail",
    addPoint = function (
      pageX,
      pageY,
      cssClass,
      timeToGrow,
      timeToShrink,
      scale
    ) {
      // Create a new point located at the mouse position
      var point = $("<div>", {
        class: cssClass,
        css: {
          left: pageX,
          top: pageY,
        },
      }).appendTo("body");

      // now make the point grow, then shrink and finally disappear
      point
        .transition({ scale: scale }, timeToGrow)
        .transition({ scale: 1 }, timeToShrink, function () {
          point.remove();
        });
    };

  $.fn.cursorTrail = function (options) {
    // assign defaults for those options not supplied
    options = $.extend(
      {
        timeToGrow: 200,
        timeToShrink: 200,
        scale: 1,
        class: "",
      },
      options
    );

    // add the base css class all cursor trail points need.
    var actualCssClass = baseCssClass;
    if (options["class"]) {
      actualCssClass += " " + options["class"];
    }

    return this.bind("mousemove", function (ev) {
      addPoint(
        ev.pageX,
        ev.pageY,
        actualCssClass,
        options.timeToGrow,
        options.timeToShrink,
        options.scale
      );
    });
  };
})(jQuery);

// jQuery.transit has a bug in older IE versions, so switch to jQuery animate
if (!$.support.transition) {
  $.fn.transition = $.fn.animate;
}

$("#background").cursorTrail({
  class: "blue_trail",
});

// Mouse drag div block

$(".dragme").draggable({
  containment: ".container",
});

// Circle cursor

document.body.onmousemove = function (e) {
  document.documentElement.style.setProperty(
    "--x",
    e.clientX + window.scrollX + "px"
  );
  document.documentElement.style.setProperty(
    "--y",
    e.clientY + window.scrollY + "px"
  );
};

//Enter Player Name prompt

function hello() {
  let player_name = document.getElementById("player_name");
  let name_input = document.getElementById("name_input");
  let name = document.getElementById("name_input").value;
  if (name == null || name == "") {
    alert("Please enter a name.");
  } else {
    player_name.innerHTML =
      "Hello " +
      name +
      ". You're Player One!" +
      " Be strong, and let your heart take courage!\n";
    name_input.style.display = "none";
    document.getElementById("button0").style.display = "none";
    document.getElementById("player_name").style.display = "block";
    console.log(name);
  }
}

// Upload profile picture

$("#profileImage").click(function (e) {
  $("#imageUpload").click();
});

function fasterPreview(uploader) {
  if (uploader.files && uploader.files[0]) {
    $("#profileImage").attr(
      "src",
      window.URL.createObjectURL(uploader.files[0])
    );
  }
}

$("#imageUpload").change(function () {
  fasterPreview(this);
});

// Settings button

open_settings = document.getElementById("open_settings");
close_settings = document.getElementById("close_settings");

open_settings.onclick = () => {
  $(document).ready(function () {
    $(window).scrollTop(0);
  });
  setting_input_div.style.display = "flex";
  open_settings.style.rotate = "45deg";
  close_settings.style.display = "block";
  open_settings.style.display = "none";
};

close_settings.onclick = () => {
  setting_input_div.style.display = "none";
  open_settings.style.rotate = "0deg";
  close_settings.style.display = "none";
  open_settings.style.display = "block";
};

// Settings animate

setting_input_div = document.getElementById("setting_input_div");
expand = document.getElementById("expand");
collapse = document.getElementById("collapse");

expand.onclick = () => {
  setting_input_div.style.width = "81%";
  expand.style.display = "none";
  collapse.style.display = "block";
};

collapse.onclick = () => {
  setting_input_div.style.width = "50%";
  expand.style.display = "block";
  collapse.style.display = "none";
};

// Variables

let xp = 0;
let health = 300;
let gold = 100;
let score = 0;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let monsterLevel;
let inventory = ["stick ᛓ "];

//Buttons, Stats and Displays

const button0 = document.querySelector("#button0");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const stats = document.querySelector("#stats");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterLevelText = document.querySelector("#monsterLevel");
const meter = document.getElementById("game_meter");
const display = document.getElementById("display");
const scoreText = document.getElementById("scoreText");
const profile_container = document.getElementById("profile_container");
const name_input = document.getElementById("name_input");
const color_input = document.getElementById("color_input");
const color_input_two = document.getElementById("color_input_two");
const color_input_three = document.getElementById("color_input_three");
const settings = document.getElementById("settings");

//Navbar

const navbar = document.getElementById("navbar");

// List link

const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const list_two_b = document.getElementById("list_two_b");
const list_three = document.getElementById("list_three");
const list_four = document.getElementById("list_four");

//Block spinner

const block_spin = document.querySelectorAll(".block_spin");
const block_spin_inner_1 = document.querySelectorAll(".block_spin_inner_1");
const block_spin_inner_3 = document.querySelectorAll(".block_spin_inner_3");

//Audio block

const audio_play_block = document.querySelectorAll(".audio_play_block");

//Player name

const player_name = document.querySelector("#player_name");

//h2

const h2 = document.getElementsByTagName("h2");

// ul

const li = document.getElementsByTagName("li");

// Color Theme Engine

color_input.addEventListener("change", function (e) {
  // Navbar
  navbar.style.color = e.target.value;
  // List link one color
  $(list_one).mouseover(() => {
    list_one.style.background = e.target.value;
    list_one.style.color = "#ffffff";
  });
  $(list_one).mouseleave(() => {
    list_one.style.background = "none";
    list_one.style.color = "#63e0ff";
  });
  // List link two color
  $(list_two).mouseover(() => {
    list_two.style.background = e.target.value;
    list_two.style.color = "#ffffff";
  });
  $(list_two).mouseleave(() => {
    list_two.style.background = "none";
    list_two.style.color = "#63e0ff";
  });
  // List link two b color
  $(list_two_b).mouseover(() => {
    list_two_b.style.background = e.target.value;
    list_two_b.style.color = "#ffffff";
  });
  $(list_two_b).mouseleave(() => {
    list_two_b.style.background = "none";
    list_two_b.style.color = "#63e0ff";
  });
  // List link three color
  $(list_three).mouseover(() => {
    list_three.style.background = e.target.value;
    list_three.style.color = "#ffffff";
  });
  $(list_three).mouseleave(() => {
    list_three.style.background = "none";
    list_three.style.color = "#63e0ff";
  });
  // List link four color
  $(list_four).mouseover(() => {
    list_four.style.background = e.target.value;
    list_four.style.color = "#ffffff";
  });
  $(list_four).mouseleave(() => {
    list_four.style.background = "none";
    list_four.style.color = "#63e0ff";
  });
  // List link four color
  $(list_four).mouseover(() => {
    list_four.style.background = e.target.value;
    list_four.style.color = "#ffffff";
  });
  $(list_four).mouseleave(() => {
    list_four.style.background = "none";
    list_four.style.color = "#63e0ff";
  });
  // Info alert
  $(info_alert).mouseover(() => {
    info_alert.style.background = e.target.value;
    info_alert.style.color = "#ffffff";
  });
  $(info_alert).mouseleave(() => {
    info_alert.style.background = "none";
    info_alert.style.color = "#63e0ff";
  });
  //Button color
  button0.style.background = e.target.value;
  profile_container.style.background = e.target.value;
  settings.style.background = e.target.value;
  name_input.style.background = e.target.value;
  button1.style.background = e.target.value;
  button2.style.background = e.target.value;
  button3.style.background = e.target.value;
  button4.style.background = e.target.value;
  stats.style.border = "2px solid" + e.target.value;
  //Block color
  for (let i = 0; i < block_spin.length; i++) {
    block_spin[i].style.background = e.target.value;
  }
  for (let i = 0; i < block_spin_inner_1.length; i++) {
    block_spin_inner_1[i].style.background = "#404a50";
  }
  for (let i = 0; i < block_spin_inner_3.length; i++) {
    block_spin_inner_3[i].style.background = e.target.value;
  }
  //Audio color
  for (let i = 0; i < audio_play_block.length; i++) {
    audio_play_block[i].style.background = e.target.value;
  }
  //Player name color
  player_name.style.color = e.target.value;
  // ul color
  $(li).mouseover(() => {
    for (let i = 0; i < li.length; i++) {
      li[i].style.color = e.target.value;
    }
  });
  $(li).mouseleave(() => {
    for (let i = 0; i < li.length; i++) {
      li[i].style.color = "#ffffff";
    }
  });
  // h2 color
  for (let i = 0; i < h2.length; i++) {
    h2[i].style.backgroundColor = e.target.value;
  }
});
// Text color
color_input_two.addEventListener("change", function (e) {
  button0.style.color = e.target.value;
  button1.style.color = e.target.value;
  button2.style.color = e.target.value;
  button3.style.color = e.target.value;
  button4.style.color = e.target.value;
});
// Display border color
color_input_three.addEventListener("change", function (e) {
  display.style.border = "2px solid" + e.target.value;
}); // Color Theme Engine End

const weapons = [
  { name: "Stick ᛓ ", power: 5 },
  { name: "Dagger ᛌ ", power: 30 },
  { name: "Claw-Hammer ᛚ ", power: 50 },
  { name: "Viking-Hammer ᛘ ", power: 75 },
  { name: "Light-Sword ᛁ ", power: 100 },
  { name: "Magic-Sword ᛂ ", power: 200 },
  { name: "Wizard-Staff ᛙ ", power: 300 },
];
const monsters = [
  //0
  {
    name: "Slime",
    level: 2,
    health: 80,
  },
  //1
  {
    name: "Fanged Beast",
    level: 6,
    health: 280,
  },
  //2
  {
    name: "Dragon",
    level: 12,
    health: 600,
  },
  //3
  {
    name: "Knight",
    level: 6,
    health: 220,
  },
  //4
  {
    name: "Corrupted Wizard",
    level: 9,
    health: 370,
  },
  //5
  {
    name: "Giant Spider",
    level: 4,
    health: 300,
  },
  //6
  {
    name: "Ghost",
    level: 5,
    health: 300,
  },
  //7
  {
    name: "Anglerfish",
    level: 6,
    health: 400,
  },
  //8
  {
    name: "Cave Troll",
    level: 8,
    health: 300,
  },
  //9
  {
    name: "Werewolf",
    level: 8,
    health: 500,
  },
  //10
  {
    name: "Doppelgänger",
    level: 10,
    health: 500,
  },
  //11
  {
    name: "Nightmare Shadow",
    level: 8,
    health: 100,
  },
  //12
  {
    name: "Yeti",
    level: 8,
    health: 500,
  },
  //13
  {
    name: "Venomous Snakes",
    level: 10,
    health: 400,
  },
];
const locations = [
  {
    name: "town square",
    "button text": [
      "Visit shop",
      "Walk to cave",
      "Fight Corrupt Wizard",
      "Enter castle",
    ],
    "button functions": [goStore, goCave, fightWizard, goCastle],
    text: 'You are in the town square. You see a sign that says "Shop". Select where you want to go.',
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/town.jpg')",
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health ❤️ (-10 gold)",
      "Buy weapon 🗡️ (-30 gold)",
      "Sell weapon ⚜️ (+15 gold)",
      "Your broke. Leave shop",
    ],
    "button functions": [buyHealth, buyWeapon, sellWeapon, goTown],
    text: 'You enter the store. "Hello, buy a weapon to help you on your way!" -Tanner the shop owner',
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/shop.jpg')",
  },
  {
    name: "cave",
    "button text": [
      "Fight Slime",
      "Fight Fanged beast",
      "Fight Spider",
      "Return to town",
    ],
    "button functions": [fightSlime, fightBeast, fightSpider, goTown],
    text: "You enter the cave. You see some monsters... or is that your friend Nait?",
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/cave.png')",
  },
  {
    name: "fight",
    "button text": [
      "Attack 🗡️",
      "Dodge 🛡️",
      "Surrender 🏳️",
      "Run like a coward ⮐",
    ],
    "button functions": [attack, dodge, surrender, goTown],
    text: "You are fighting an enemy ⚔️. LET'S GO!",
  },
  {
    name: "kill monster",
    "button text": [
      " --> ",
      "Return to town square",
      "Return to cave",
      "Return to castle",
    ],
    "button functions": [playselectnull, goTown, goCave, easterEgg],
    text: 'The enemy screams "ARG!" and withers away. You gain experience points and find gold. Nice! you\'re a natural.',
  },
  {
    name: "lose",
    "button text": [" --> ", "Restart?", "Restart?", "Restart?"],
    "button functions": [playselectnull, restart, restart, restart],
    text: "You died. ☠️ Respawn?",
  },
  {
    name: "win",
    "button text": [" --> ", "Continue", "Continue", "Continue"],
    "button functions": [
      playselectnull,
      goCredits_one,
      goCredits_one,
      goCredits_one,
    ],
    text:
      "CONGRATULATIONS YOU WIN 🎉! You defeat the dragon and free the kingdom! The darkness flees as the sun rises on the horizon. A new day is dawning. The mighty have fallen as the humble arise to take their place.\n" +
      "\n" +
      "(You may skip the music in 30 seconds.)",
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/win.jpg')",
  },
  {
    name: "easter egg",
    "button text": ["3", "1", "6", "Go to town square?"],
    "button functions": [pickThree, pickOne, pickSix, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win gold ⚜️!",
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/easter_egg.jpg')",
  },
  {
    name: "castle",
    "button text": [
      "Enter left hall",
      "Enter dark hall",
      "Enter right hall",
      "Return to Town",
    ],
    "button functions": [goChasm, fightghost, fightKnight, goTown],
    text: 'You enter a castle. There\'s a sign that says "Danger" to the left and the sound of iron clanging from the room to the right. Ahead you sense something cold and dark. Do you dare to continue?',
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/castle.jpg')",
  },
  {
    name: "chasm",
    "button text": [
      "Jump across",
      "Wait for a bit",
      "Fall into the chasm",
      "Return to Castle",
    ],
    "button functions": [goJump, fightWerewolf, fightAnglerfish, goCastle],
    text: "There is a massive chasm ahead. You believe you may be able to jump across. Looking down you faintly see some water. You feel exhausted from the journey. Maybe it's time to take a short rest from walking?",
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/chasm.jpg')",
  },
  {
    name: "jump",
    "button text": ["7", "2", "5", "Return to Chasm"],
    "button functions": [jumpSeven, jumpTwo, jumpFive, goChasm],
    text: "You get ready to jump. Pick a number above. Seven numbers will be randomly chosen between 0 and 7. If the number you choose matches one of the random numbers, you make it across.",
  },
  {
    name: "deep caves",
    "button text": ["Enter Mine", "Run left", "Run forward", "Face the shadow"],
    "button functions": [goMine, fightTroll, fightNightGhost, fightShadow],
    text: "You made it! There's no turning back now! You can barely make out anything down the dimly lit crevices. To the left the ground shakes. Ahead there is a strange green glow. You see a Mineshaft entrance to your left as well. Something from the shadows is quickly approaching behind you!",
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/deep_caves.png')",
  },
  {
    name: "Frozen Mineshaft",
    "button text": [
      "Brave the water",
      "Brave the snow",
      "Brave the flames",
      "Leave Mine ⮐",
    ],
    "button functions": [fightSnakes, fightYeti, fightDragon, norunmine],
    text: "The Mine entrance collapses behind you! It is extremely cold, you shiver as you walk down the abandoned Mineshaft. There are three shaft passageways. The left is overflowing with a water. The middle is filled with ice and snow. The last one is lit with the orange glow of fire.",
    display_img:
      "url('https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/display/ice_mine.png')",
  },
  {
    name: "Fight Mine",
    "button text": [
      "Attack 🗡️",
      "Dodge 🛡️",
      "Surrender 🏳️",
      "Run like a coward ⮐",
    ],
    "button functions": [attack, dodge, surrender, norun],
    text: "You are fighting an enemy ⚔️. LET'S GO!",
  },
  {
    name: "Credits 1",
    "button text": ["<--", "Download the soundtrack", "🎉", "-->"],
    "button functions": [playselectnull, goBandcamp, playdefeat, goCredits_two],
    text:
      "Newave Oceans & Newave Media Presents..." + "\n" + "\n" + "\n" + "\n",
  },
  {
    name: "Credits 2",
    "button text": ["<--", "Download the soundtrack", "🎉", "-->"],
    "button functions": [
      goCredits_one,
      goBandcamp,
      playdefeat,
      goCredits_three,
    ],
    text: "Perilous Quest" + "\n" + "\n" + "\n" + "\n",
  },
  {
    name: "Credits 3",
    "button text": ["<--", "Download the soundtrack", "🎉", "-->"],
    "button functions": [goCredits_two, goBandcamp, playdefeat, goCredits_four],
    text:
      "Original project idea by FreeCodeCamp" +
      "\n" +
      "3D graphics made with Spline.design" +
      "\n" +
      "Mods and redesign by Aidan Y." +
      "\n" +
      "Powered by Github" +
      "\n" +
      "Made in Visual Studio Code" +
      "\n" +
      "\n" +
      "\n" +
      "\n",
  },
  {
    name: "Credits 4",
    "button text": ["<--", "Download the soundtrack", "🎉", "-->"],
    "button functions": [
      goCredits_three,
      goBandcamp,
      playdefeat,
      goCredits_five,
    ],
    text: "Made with Mac " + "\n" + "\n" + "\n" + "\n",
  },
  {
    name: "Credits 5",
    "button text": ["<--", "Download the soundtrack", "🎉", "-->"],
    "button functions": [goCredits_four, goBandcamp, playdefeat, goCredits_six],
    text:
      "🎧 Music 🎧" +
      "\n" +
      '"Lovely Town" by Skremzy' +
      "\n" +
      '"Boss Theme" by Audiophobia' +
      "\n" +
      "Original Soundtrack by Newave Oceans" +
      "\n" +
      "\n" +
      "\n" +
      "\n",
  },
  {
    name: "Credits 6",
    "button text": ["<--", "Download the soundtrack", "🎉", "-->"],
    "button functions": [
      goCredits_five,
      goBandcamp,
      playdefeat,
      goCredits_seven,
    ],
    text:
      "🎨 Art 🎨" +
      "\n" +
      'Marsh, Tanner. "Dragon" 2024' +
      "\n" +
      'Marsh, Tanner. "Display Art" 2024' +
      "\n" +
      "\n" +
      "\n" +
      "\n",
  },
  {
    name: "Credits 7",
    "button text": ["<--", "Download the soundtrack", "🎉", "-->"],
    "button functions": [
      goCredits_six,
      goBandcamp,
      playdefeat,
      goCredits_eight,
    ],
    text:
      "🧪 Beta Testers 🧪" +
      "\n" +
      "Daniel G. - macOS" +
      "\n" +
      "Nait Welsh - macOS" +
      "\n" +
      "Benjamin Marsh - iOS" +
      "\n" +
      "Mackenzie Dy - Windows" +
      "\n" +
      "\n" +
      "\n" +
      "\n",
  },
  {
    name: "Credits 8",
    "button text": ["<--", "Download the soundtrack", "Replay?", "Main Menu"],
    "button functions": [goCredits_seven, goBandcamp, restart_alert, leaveGame],
    text:
      "THANKS FOR PLAYING!!!" +
      "\n" +
      "Did you find the secret..? 👀" +
      "\n" +
      "\n" +
      "\n" +
      "\n",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightWizard;
button4.onclick = goCastle;

//Location update
function update(location) {
  monsterStats.style.display = "none";
  display.style.backgroundImage = location.display_img;
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerText = location.text + "\n" + "\n" + "Inventory:\n" + inventory;
  selectfx.currentTime = 0;
  selectfx.play();
}

//Location update functions
function goTown() {
  update(locations[0]);
  //Boss
  boss_theme.pause();
  boss_theme.currentTime = 0;
  //Shop
  shop.pause();
  shop.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Town
  lovely_town.play();
  //Defeat Boss
  defeat_boss.pause();
  defeat_boss.currentTime = 0;
  //Castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
  //Reprise
  reprise.currentTime = 0;
  reprise.pause();
  //Secret
  secret.pause();
  secret.currentTime = 0;
  //Home
  pauseHome();
  //meter style
  meter.setAttribute("value", "1");
  //Text justify
  text.style.textAlign = "justify";
  //Secret game enable button
  button_enable_secret();
}

function goStore() {
  update(locations[1]);
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Show
  shop.play();
  meter.setAttribute("value", "5");
}

function goCave() {
  update(locations[2]);
  //Boss
  boss_theme.pause();
  boss_theme.currentTime = 0;
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.play();
  //Select fx
  selectfx.currentTime = 0;
  selectfx.play();
  //Defeat Boss
  defeat_boss.pause();
  defeat_boss.currentTime = 0;
  meter.setAttribute("value", "20");
  //Secret
  secret.pause();
  secret.currentTime = 0;
}

function goCastle() {
  update(locations[8]);
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Castle
  castle.play();
  meter.setAttribute("value", "30");
  //Secret
  secret.pause();
  secret.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function goChasm() {
  update(locations[9]);
  //Castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.currentTime = 0;
  chasm.play();
  meter.setAttribute("value", "60");
}

function goJump() {
  update(locations[10]);
  //jump
  meter.setAttribute("value", "80");
}

function goMine() {
  update(locations[12]);
  //Boss
  boss_theme.pause();
  boss_theme.currentTime = 0;
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Select fx
  selectfx.currentTime = 0;
  selectfx.play();
  //Defeat Boss
  defeat_boss.pause();
  defeat_boss.currentTime = 0;
  //html style
  meter.setAttribute("value", "90");
}

function goCredits_one() {
  update(locations[14]);
  text.style.textAlign = "center";
  //Wonder
  reprise.currentTime = 0;
  reprise.pause();
  //Home
  playHome();
}

function goCredits_two() {
  update(locations[15]);
}

function goCredits_three() {
  update(locations[16]);
}

function goCredits_four() {
  update(locations[17]);
}

function goCredits_five() {
  update(locations[18]);
}

function goCredits_six() {
  update(locations[19]);
}

function goCredits_seven() {
  update(locations[20]);
}

function goCredits_eight() {
  update(locations[21]);
}

function norunmine() {
  button4.style.filter = "opacity(50%)";
  text.innerText =
    "The Mine entrance collapses behind you! It is extremely cold, you shiver as you walk down the abandoned Mineshaft. There are three shaft passageways. The left is overflowing with a water. The middle is filled with ice and snow. The last one is lit with the orange glow of fire." +
    "\n" +
    "\n" +
    "The Mine door is blocked. There's no way out!";
  playselectnull();
}

// Shop functions
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    score += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    scoreText.innerText = score;
    play_attack();
  } else {
    text.innerText = "You do not have enough gold ⚜️ to buy health ❤️.";
    document.getElementById("button1").style.filter = "opacity(50%)";
    const myTimeout = setTimeout(button_enable, 1000);
    playselectnull();
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      score += 20;
      goldText.innerText = gold;
      scoreText.innerText = score;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText +=
        "\n" + "\n" + " In your inventory you have:\n" + inventory;
      play_attack();
      document.getElementById("button2").style.filter = "opacity(100%)";
    } else {
      text.innerText = "You do not have enough gold ⚜️ to buy a weapon 🗡️.";
      document.getElementById("button2").style.filter = "opacity(50%)";
      const myTimeout = setTimeout(button_enable, 1000);
      playselectnull();
    }
  } else {
    text.innerText = "You already have the most powerful weapon 🗡️!";
    button2.onclick = listInventory();
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText +=
      "\n" + "\n" + " In your inventory you have:\n" + inventory;
    play_attack();
    document.getElementById("button3").style.filter = "opacity(100%)";
  } else {
    text.innerText = "Don't sell your only weapon 🗡️!";
    document.getElementById("button3").style.filter = "opacity(50%)";
    const myTimeout = setTimeout(button_enable, 1000);
    playselectnull();
  }
}

function listInventory() {
  text.innerText += "\n" + "\n" + " In your inventory you have:\n" + inventory;
  button2.innerText = "Sold out!";
  selectfx.currentTime = 0;
  selectfx.play();
}

//Sound FX

let selectfx = document.getElementById("selectfx");

function playselect() {
  selectfx.currentTime = 0;
  selectfx.play();
}

let select_null = document.getElementById("select_null");

function playselectnull() {
  select_null.currentTime = 0;
  select_null.play();
}

let attackfx = new Audio(
  "https://raw.githubusercontent.com/aidan-yip/perilous_quest/main/public/attack.wav"
);

function play_attack() {
  attackfx.currentTime = 0;
  attackfx.play();
}

// Music

//Wonder main titles
let wonder = document.getElementById("wonder");

function playwonder() {
  wonder.play();
}

function pausewonder() {
  wonder.pause();
  wonder.currentTime = 0;
}

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

//Cave Tune
let cave_tune = document.getElementById("cave_tune");

function playcave() {
  cave_tune.play();
}

function pausecave() {
  cave_tune.pause();
}

//Boss theme volume adjust

let audio = document.getElementById("boss_theme");

function setHalfVolume() {
  audio.volume = 0.5;
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

//Chasm
let chasm = document.getElementById("chasm");

function playchasm() {
  chasm.play();
}

function pausechasm() {
  chasm.pause();
  chasm.currentTime = 0;
}

//Castle
let castle = document.getElementById("castle");

function playcastle() {
  castle.play();
}

function pausecastle() {
  castle.pause();
  castle.currentTime = 0;
}

//Secret
let secret = document.getElementById("secret");

function playsecret() {
  secret.play();
}

function pausesecret() {
  secret.pause();
  secret.currentTime = 0;
}

//Defeat Boss theme
let defeat_boss = document.getElementById("defeat_boss");

function playdefeat() {
  defeat_boss.currentTime = 0;
  defeat_boss.play();
}

function pausedefeat() {
  defeat_boss.pause();
}

//Lose theme
let lose_wav = document.getElementById("lose");

function playlose() {
  lose_wav.currentTime = 0;
  lose_wav.play();
}

function pauselose() {
  lose_wav.pause();
}

//Win (Wonder reprise)
let reprise = document.getElementById("reprise");

function playreprise() {
  reprise.play();
}

function pausereprise() {
  reprise.pause();
  reprise.currentTime = 0;
}

let home = document.getElementById("home");

function playHome() {
  home.play();
}

function pauseHome() {
  home.pause();
  home.currentTime = 0;
}

// Fight

function fightSlime() {
  fighting = 0;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightBeast() {
  fighting = 1;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightKnight() {
  fighting = 3;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightWizard() {
  fighting = 4;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightSpider() {
  fighting = 5;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightghost() {
  fighting = 6;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightAnglerfish() {
  fighting = 7;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightTroll() {
  fighting = 8;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightWerewolf() {
  fighting = 9;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightNightGhost() {
  fighting = 11;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightShadow() {
  fighting = 10;
  goFight();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightYeti() {
  fighting = 12;
  goFight_Norun();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightSnakes() {
  fighting = 13;
  goFight_Norun();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
}

function fightDragon() {
  fighting = 2;
  goFight_Norun();
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Cave
  cave_tune.pause();
  cave_tune.currentTime = 0;
  //Boss
  setHalfVolume();
  boss_theme.play();
  //Castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
  button_enable();
}

// Fight function
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterLevel = monsters[fighting].level;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterLevelText.innerText = monsterLevel;
}

function goFight_Norun() {
  update(locations[13]);
  monsterHealth = monsters[fighting].health;
  monsterLevel = monsters[fighting].level;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterLevelText.innerText = monsterLevel;
}

function norun() {
  document.getElementById("button4").disabled = true;
  document.getElementById("button4").style.filter = "opacity(50%)";
  text.innerText = "You may not run now. The enemy is too dangerous.";
  playselectnull();
}

// Attack function
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    attackfx.currentTime = 0;
    attackfx.play();
  } else {
    text.innerText += " You miss.";
    select_null.currentTime = 0;
    select_null.play();
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += "\n" + "\n" + " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function xplose() {
  xp -= 2;
  xpText.innerText = xp;
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " +
    monsters[fighting].name +
    "." +
    " You lose 2 xp.";
  attackfx.currentTime = 0;
  attackfx.play();
  if (xp > 0) {
    xplose();
  } else {
    text.innerText =
      "You dodge the attack from the " +
      monsters[fighting].name +
      "." +
      " You've lost all your xp!";
    attackfx.currentTime = 0;
    attackfx.play();
  }
}

function surrender() {
  lose();
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  score += 50;
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  scoreText.innerText = score;
  update(locations[4]);
  boss_theme.pause();
  boss_theme.currentTime = 0;
  defeat_boss.currentTime = 0;
  defeat_boss.play();
}

function lose() {
  update(locations[5]);
  //Town
  lovely_town.pause();
  lovely_town.currentTime = 0;
  //Boss
  boss_theme.pause();
  boss_theme.currentTime = 0;
  //Castle
  castle.pause();
  castle.currentTime = 0;
  //Chasm
  chasm.pause();
  chasm.currentTime = 0;
  //Lose
  playlose();
  //Enable button
  button_enable();
}

function winGame() {
  button_disable();
  const myTimeout = setTimeout(button_enable, 30000);
  score += 1000;
  scoreText.innerText = score;
  update(locations[6]);
  //Boss
  boss_theme.pause();
  boss_theme.currentTime = 0;
  //Wonder
  reprise.currentTime = 0;
  reprise.play();
  meter.setAttribute("value", "100");
}

function button_disable() {
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;
  button2.style.filter = "opacity(50%)";
  button3.style.filter = "opacity(50%)";
  button4.style.filter = "opacity(50%)";
}

function button_enable() {
  button2.disabled = false;
  button3.disabled = false;
  button4.disabled = false;
  button1.style.filter = "opacity(100%)";
  button2.style.filter = "opacity(100%)";
  button3.style.filter = "opacity(100%)";
  button4.style.filter = "opacity(100%)";
}

function restart_alert() {
  let text = "Replay Game?";
  if (confirm(text) == true) {
    restart();
  } else {
    null;
  }
}

function restart() {
  xp = 0;
  health = 300;
  gold = 100;
  score = 0;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  scoreText.innerText = score;
  goTown();
  pauselose();
  lose_wav.currentTime = 0;
}

function easterEgg() {
  update(locations[7]);
  boss_theme.pause();
  boss_theme.currentTime = 0;
  secret.currentTime = 0;
  playsecret();
}

// Secret game guesses
function pickThree() {
  pick(3);
}

function pickOne() {
  pick(1);
}

function pickSix() {
  pick(6);
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
    text.innerText += "Right! You win 20 gold ⚜️!";
    gold += 20;
    score += 100;
    goldText.innerText = gold;
    scoreText.innerText = score;
    const myTimeout = setTimeout(goTown, 3500);
    button_disable_secret();
  } else {
    text.innerText += "Wrong! You lose 10 health 💔!";
    health -= 10;
    healthText.innerText = health;
    const myTimeout = setTimeout(goTown, 3500);
    button_disable_secret();
    playselectnull();
    if (health <= 0) {
      lose();
    }
  }
}

function button_disable_secret() {
  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;
  button1.style.filter = "opacity(50%)";
  button2.style.filter = "opacity(50%)";
  button3.style.filter = "opacity(50%)";
  button4.style.filter = "opacity(50%)";
}

function button_enable_secret() {
  button1.disabled = false;
  button2.disabled = false;
  button3.disabled = false;
  button4.disabled = false;
  button1.style.filter = "opacity(100%)";
  button2.style.filter = "opacity(100%)";
  button3.style.filter = "opacity(100%)";
  button4.style.filter = "opacity(100%)";
}

//Jump game guesses

function jumpTwo() {
  jumppick(2);
}

function jumpSeven() {
  jumppick(7);
}

function jumpFive() {
  jumppick(5);
}

//Jump game
function jumppick(guess) {
  const numbers = [];
  while (numbers.length < 7) {
    numbers.push(Math.floor(Math.random() * 8));
  }
  for (let i = 0; i < 7; i++) {}
  if (numbers.includes(guess)) {
    text.innerText += "Right! You make it across!";
    gold += 20;
    score += 40;
    goldText.innerText = gold;
    scoreText.innerText = score;
    update(locations[11]);
    selectfx.currentTime = 0;
    selectfx.play();
  } else {
    lose();
  }
}
