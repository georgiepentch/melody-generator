const bgcolors = [
  "#FF312E",
  "#FF3CC7",
  "#540D6E",
  "#F3A712",
  "#087E8B"
];

document.body.style.background = bgcolors[[Math.floor(Math.random()*5)]];

var distSettings = document.getElementsByClassName('dist-setting')
for (i=0; i<11; i++) {
  distSettings[i].addEventListener("keypress", function(event) {
    if (event.charCode === 32) {
      var next = this.parentElement.nextElementSibling.firstElementChild;
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length)
    }
  })
}

var a = document.getElementById('settingsMenu');
var b = document.getElementById('settingsButton');

function toggleSettings() {
  if (a.style.display == "none") {
    a.style.display = "block";
    b.style.color = "black";
  } else if (a.style.display == "block") {
    a.style.display = "none";
    b.style.color = "white";
  }
};

var c = document.getElementsByClassName('fa fa-play')[0];
var d = document.getElementsByClassName('text-setting');

// SVG Paths
const noteheadPath = "M 158 -100 C 202 -100 236 -75 236 -34 C 236 35 166 100 78 100 C 32 100 0 74 0 34 C 0 -34 87 -100 158 -100 Z";  // 47.2 x 40
const sharpPath = "M 9 93 L 30 85 C 37 83 41 68 41 62 V -12 C 41 -22 35 -27 30 -27 L 9 -19 C 8 -18 7 -18 5 -18 C 2 -18 0 -20 0 -24 V -81 C 0 -86 4 -92 9 -95 C 9 -95 26 -101 32 -103 C 37 -106 41 -115 41 -122 V -235 C 41 -240 45 -244 54 -244 C 60 -244 65 -240 65 -235 V -135 C 65 -131 69 -121 76 -121 L 77 -122 H 78 L 127 -142 C 131 -143 135 -149 135 -159 V -271 C 135 -275 141 -279 149 -279 C 154 -279 159 -275 159 -271 V -172 C 159 -168 163 -159 169 -159 C 169 -159 170 -159 171 -160 C 178 -163 189 -167 190 -168 H 192 C 197 -168 199 -166 199 -161 V -104 C 199 -99 195 -93 189 -91 C 189 -91 173 -84 168 -83 C 163 -80 159 -73 159 -64 V 15 C 159 23 164 29 172 29 C 177 25 189 21 190 20 H 192 C 197 20 199 22 199 27 V 84 C 199 89 195 95 189 97 C 189 97 173 103 169 105 C 164 108 159 116 159 127 V 235 C 159 240 154 244 146 244 C 141 244 135 240 135 235 V 139 C 135 133 133 123 125 123 C 112 126 85 137 75 143 C 68 148 65 158 65 166 V 270 C 65 275 60 279 52 279 C 45 279 41 275 41 270 V 173 C 41 166 35 162 29 162 C 25 163 9 169 9 169 C 8 170 7 170 5 170 C 2 170 0 168 0 164 V 107 C 0 102 4 96 9 93 Z M 65 -37 C 63 -30 61 -7 61 14 C 61 36 63 56 65 60 C 66 63 71 65 77 65 C 97 65 133 48 135 34 C 137 28 137 0 137 -25 C 137 -44 137 -62 135 -65 C 134 -67 130 -69 125 -69 C 107 -69 69 -53 65 -37 Z";  // 39.8 x 111.6
const naturalPath = "M 86 142 L 74 146 C 73 147 72 147 71 147 C 68 147 65 144 65 140 V -261 C 65 -267 69 -271 74 -271 H 85 C 90 -271 94 -267 94 -261 V -142 C 94 -136 100 -133 108 -133 C 131 -133 176 -153 187 -157 C 188 -158 189 -158 190 -158 L 192 -159 C 197 -159 199 -157 199 -152 V 260 C 199 266 195 270 189 270 H 179 C 174 270 169 266 169 260 V 127 C 169 123 166 123 161 123 C 141 123 89 141 89 141 S 88 142 86 142 Z M 169 28 V -54 C 169 -57 165 -59 160 -59 C 140 -59 94 -41 94 -26 V 56 C 94 59 97 60 101 60 C 121 60 169 39 169 28 Z";  // 26.8 x 108.2
const flatPath = "M 28 125 C 21 117 18 -340 18 -340 C 19 -354 32 -362 43 -362 C 51 -362 58 -357 58 -349 C 58 -333 53 -141 52 -123 C 52 -117 56 -112 61 -109 H 65 C 69 -109 78 -116 83 -120 C 92 -125 101 -129 110 -131 C 116 -133 121 -133 127 -133 C 164 -131 199 -102 199 -57 C 199 -20 174 29 103 79 C 83 92 64 114 40 127 C 40 127 37 129 35 129 C 32 129 30 128 28 125 Z M 56 54 C 56 58 57 66 64 66 C 81 66 123 18 130 3 C 140 -13 144 -30 144 -45 C 144 -64 134 -91 111 -91 C 93 -91 60 -67 55 -52 C 54 -49 53 -39 53 -26 C 53 6 56 54 56 54 Z";  // 36.2 x 98.2

svgCont = document.getElementById("svg-cont");

function draw(element, x, y) {
  // element is one of "notehead", "sharp", "natural", or "flat"
  var newNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  newNode.setAttribute("fill", "white");
  if (element == "notehead") {
    newNode.setAttribute("d", noteheadPath);
  } else if (element == "sharp") {
    newNode.setAttribute("d", sharpPath);
  } else if (element == "natural") {
    newNode.setAttribute("d", naturalPath);
  } else if (element == "flat") {
    newNode.setAttribute("d", flatPath);
  };
  newNode.style.transform = "translate(".concat(x.toString(), "px, ", y.toString(), "px) scale(0.2)")
  svgCont.appendChild(newNode)
};

function clear() {
  while (!svgCont.lastElementChild.classList.contains("staff")) {
    svgCont.removeChild(svgCont.lastElementChild);
  }
};

function makeMelody(n) {
  var distSum = 0;
  var distArray = [];
  for (i=0; i<12; i++) {
    if (isNaN(parseInt(distSettings[i].value))) {
      distSettings[i].value = "0";
    };
    var distVal = parseInt(distSettings[i].value);
    distSum += distVal;
    distArray.push(... Array(distVal).fill(i))
  };
  return Array.from({length: n}, () => distArray[Math.floor(Math.random() * distSum)])
};

const flatDict = {
  0: [4, "natural"],
  1: [3, "flat"],
  2: [3, "natural"],
  3: [2, "flat"],
  4: [2, "natural"],
  5: [8, "natural"],
  6: [7, "flat"],
  7: [7, "natural"],
  8: [6, "flat"],
  9: [6, "natural"],
  10: [5, "flat"],
  11: [5, "natural"]
};

const sharpDict = {
  0: [4, "natural"],
  1: [4, "sharp"],
  2: [3, "natural"],
  3: [3, "sharp"],
  4: [2, "natural"],
  5: [8, "natural"],
  6: [8, "sharp"],
  7: [7, "natural"],
  8: [7, "sharp"],
  9: [6, "natural"],
  10: [6, "sharp"],
  11: [5, "natural"]
};

function prepareMelody(rawMel) {
  /*
  takes the melody in the form of an Array of numbers from 1-12 and returns it
  in the form of an Array of 2-Arrays where the first entry denotes the
  y-position (1, 3, 5, 7, and 9 being the lines from top to bottom and 2, 4, 6,
  and 8 being the spaces) and the second entry denotes the accidental.
  */
  var setting = document.getElementById('accidentals').options[document.getElementById('accidentals').selectedIndex].value;
  var dict;
  if (setting === "flats") {
    dict = flatDict
  } else if (setting === "sharps") {
    dict = sharpDict
  };
  var result = [];
  var storage = {
    4: "natural",
    3: "natural",
    2: "natural",
    8: "natural",
    7: "natural",
    6: "natural",
    5: "natural"
  };
  for (i in rawMel) {
    var note = [... dict[rawMel[i]]];
    if (note[1] === storage[note[0]]) {
      note[1] = ""
    } else {
      storage[note[0]] = note[1]
    };
    result.push(note)
  };
  return result
}

function drawMelody() {
  var n = parseInt(document.getElementById('no').value);
  if (n > 8) {
    alert("The no. of notes you entered is too large, its tooo big TOO BIG TOO BIG TONE IT DOWN BIG MAN");
    document.getElementById('no').value = "8";
    n = 8;
  };
  var rawMel = makeMelody(n);
  var mel = prepareMelody(rawMel);
  for (let i = 0; i < n; i++) {
    var xpos = (i+1)*1080/(n+1)+130;
    var ypos = 54+mel[i][0]*18;
    draw("notehead", xpos-27.6, ypos);
    if (mel[i][1] !== "") {
      draw(mel[i][1], xpos-80, ypos);
    }
  }
};

function play() {
  if ([... c.classList].includes("fa-play")) {
    c.className = "fa fa-pause";
    for (let i = 0; i < d.length; i++) {
      d[i].disabled = true;
    };
    document.getElementById('dist-button').disabled = true;
    clear();
    drawMelody();
  } else if ([... c.classList].includes("fa-pause")) {
    c.className = "fa fa-play";
    for (let i = 0; i < d.length; i++) {
      d[i].disabled = false;
    };
    document.getElementById('dist-button').disabled = false;
  }
};

function generate() {
  clear();
  drawMelody();
};

// Get the modal
var modal = document.getElementsByClassName("modal")[0];

// Get the button that opens the modal
var btn = document.getElementById("dist-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  distSettings[0].focus();
  distSettings[0].setSelectionRange(distSettings[0].value.length, distSettings[0].value.length);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
