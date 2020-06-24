// This is how we play the game music 
const canvas = new GameCanvas();
const socket = new GameSocket(canvas);
var ambiantSound = new Audio('../sounds/music.mp3');
ambiantSound.play();
ambiantSound.volume  = 0.05; // Volume not too loud
ambiantSound.loop = true; // Loop for infinite fun ! 

// Function to resize the canvas, based on the window size.
// Sorry M. Leprêtre but we had a problem with the one that you made.
function resize() { 
    var canvas = document.getElementById('game-canvas');
    var canvasRatio = canvas.height / canvas.width;
    var windowRatio = window.innerHeight / window.innerWidth;
    var width;
    var height;
    if (windowRatio < canvasRatio) {
        height = window.innerHeight - 30;
        width = height / canvasRatio;
    } else {
        width = window.innerWidth -50;
        height = width * canvasRatio;
    }
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
};
window.addEventListener('resize', resize, false);