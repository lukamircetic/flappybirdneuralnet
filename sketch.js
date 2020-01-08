var birds = [];
var savedBirds = [];
var pipes = [];
let counter = 0;
let cycles = 1;
let TOTAL = 1000;
let button100;
let button250;
let button500;
let button1000;
let slider;
let highscore = 0;
let ahs = 0;
let highscoreSpan;
let ahSpan;
let bg;
let birdSprite;
let pipebody;
let pipetip;
let bgX = 0;
let parallax = 0.8;
function keyPressed() {
    if (key === 'S') {
        let bird = birds[0];
        let json = bird.brain.serialize();
        saveJSON(bird.brain,'bird.json');
        console.log(json);
    }

}
function preload() {
    bg = loadImage('design/bg.png');
    birdSprite = loadImage('design/bird2.png');
    //birdup = loadImage('design/birdup');
    pipebody = loadImage('design/pipebody.png');
    pipetip = loadImage('design/pipetip.png');

}
function setup() {
    let canvas = createCanvas(800, 600); 
    canvas.parent('canvascontainer');
    slider = select('#speedSlider');
    speedSpan = select('#speed');
    
    button100 = createButton('100');
    button100.position(1000,200);
    button100.mousePressed(buttonone);

    button200 = createButton('200');
    button200.position(1000, 250);
    button200.mousePressed(buttontwo);

    button500 = createButton('500');
    button500.position(1000, 300);
    button500.mousePressed(buttonthree);

    button1000 = createButton('1000');
    button1000.position(1000, 350);
    button1000.mousePressed(buttonfour);
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird;    
    }
    highscoreSpan = select('#hs');
    ahSpan = select('#ahs');

}

function draw() {
    background(0);
    image(bg, bgX, 0, bg.width, height);
    let cycles = slider.value();
    speedSpan.html(cycles);
    for (let n = 0; n < cycles; n++) { //
        
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter ++;
        for(var i = pipes.length-1; i >= 0; i--) {
            pipes[i].update();

            for (let j = birds.length-1; j>=0; j--) {
                if (pipes[i].hits(birds[j])) {
                    savedBirds.push(birds.splice(j,1)[0]);
                }
            }
        if (pipes[i].offscreen()) {
            pipes.splice(i,1);
        }

        for (let i = birds.length-1; i>=0; i--) {
            if (birds[i].offScreen()) {
                savedBirds.push(birds.splice(i,1)[0]);
            }
        }


        }
        for (let bird of birds) {
            bird.think(pipes);
            bird.update();
        }

        if(birds.length === 0){
            counter = 0;
            nextGeneration();
            pipes = [];
            // pipes.push(new Pipe());
        }

    }

    for (let bird of birds) {
        bird.show();
    }
    for (let pipe of pipes) {
        pipe.show();
    }
    highscore = birds[0].score;
    if (highscore > ahs) {
        ahs = highscore;
    }
    highscoreSpan.html(highscore);
    ahSpan.html(ahs);
}

function buttonone() {
    TOTAL = 100;
    counter = 0;
    birds=[];
    for (let i = 0; i<TOTAL;i++) {
        birds[i] = new Bird;
    }
    savedBirds = [];
    pipes=[];
    console.log("Button Pressed");
    console.log(birds);
}
function buttontwo() {
    TOTAL = 200;
    counter = 0;
    birds=[];
    for (let i = 0; i<TOTAL;i++) {
        birds[i] = new Bird;
    }
    savedBirds = [];
    pipes=[];
    console.log("Button Pressed");
    console.log(birds);
}
function buttonthree() {
    TOTAL = 500;
    counter = 0;
    birds=[];
    for (let i = 0; i<TOTAL;i++) {
        birds[i] = new Bird;
    }
    savedBirds = [];
    pipes=[];
    console.log("Button Pressed");
    console.log(birds);
}
function buttonfour() {
    TOTAL = 1000;
    counter = 0;
    birds=[];
    for (let i = 0; i<TOTAL;i++) {
        birds[i] = new Bird;
    }
    savedBirds = [];
    pipes=[];
    console.log("Button Pressed");
    console.log(birds);
}
// // function keyPressed() {
//     if (key == ' ') {
//         // console.log("space");
//         birds.up();
//     }
// }

