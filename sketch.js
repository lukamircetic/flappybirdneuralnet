var birds = [];
var savedBirds = [];
var bestbird;
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
let brainJSON;
let userplay = false;
let userplaybutton;
let stopped = false;
function keyPressed() {
    if (key === 'S') {
        let bird = birds[0];
        let json = bird.brain.serialize();
        saveJSON(bird.brain,'bird.json');
        console.log(json);
    }
    if (userplay) {
        if (key == ' ') {
            // console.log("space");
            bird.up();
        }
    }


}
function preload() {
    bg = loadImage('design/bg.png');
    birdSprite = loadImage('design/bird2.png');
    //birdup = loadImage('design/birdup');
    pipebody = loadImage('design/pipebody.png');
    pipetip = loadImage('design/pipetip.png');
    bestbirdSprite = loadImage('design/bestbirdcolor.png');
    brainJSON = loadJSON("bird.json");
    loadFont('./design/flappy-bird.ttf');

}
function setup() {
    let canvas = createCanvas(800, 600); 
    canvas.parent('canvascontainer');
    slider = select('#speedSlider');
    speedSpan = select('#speed');
    
    userplaybutton = createButton('PLAY');
    userplaybutton.position(500,650);
    userplaybutton.style('padding-left', 70 + 'px');
    userplaybutton.style('padding-right', 70 + 'px');
    userplaybutton.style('padding-top', 30 + 'px');
    userplaybutton.style('font-size', 60 + 'px');
    userplaybutton.style('padding-bottom', 30 + 'px');
    userplaybutton.style('font-family', 'flappy-bird');
    userplaybutton.mousePressed(toggleState);

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
    
    if (!userplay) {
        for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird;    
        }
    } else {
        bird = new Bird(null,userplay);
    }
    highscoreSpan = select('#hs');
    ahSpan = select('#ahs');
    // let birdBrain = NeuralNetwork.deserialize(brainJSON);
    // bird = new Bird(birdBrain);
}
function toggleState() {
    userplay = !userplay;

    if (userplay) {
        counter = 0;
        birds=[];
        savedBirds = [];
        pipes=[];
        bird = new Bird(null, userplay);
        userplaybutton.html('TRAIN');
    } else {
        counter = 0;
        birds=[];
        pipes=[];
        for (let i = 0; i<TOTAL;i++) {
            birds[i] = new Bird;
        }
        userplaybutton.html('PLAY');
        nextGeneration();
    }
}
function draw() {
    background(255);
    image(bg, bgX, 0, bg.width, height);
    
    let cycles = slider.value();
    speedSpan.html(cycles);
    stopped = false;
    if (!userplay) {
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
        highscore = floor(birds[0].score/75-5);
        
        if (highscore > ahs && birds[0] != null) {
            ahs = highscore;
            bestbird = birds[0];
        }

        birds[0].showbest();
    } else {
        for (let n = 0; n < 1; n++) { //
            
            if (counter % 75 == 0) {
                pipes.push(new Pipe());
            }
            counter ++;
            for(var i = pipes.length-1; i >= 0; i--) {
                pipes[i].update();
                if (pipes[i].offscreen()) {
                    pipes.splice(i,1);
                }
                pipes[i].show();
                if (pipes[i].hits(bird)) {
                    gamestop();
                    
                }
                
            }
            if (bird.offScreen()) {
                gamestop();
            }
            // for (let pipe of pipes) {
            //     pipe.show();
            // }
            bird.update();
            bird.show();
            // birds[0].showbest();
            if (!stopped){
                highscore = bird.score;
                if (highscore > ahs) {
                    ahs = highscore
                }
            }
        }
    }
    if (highscore >= 0){
        fill(0);
        textFont('flappy-bird');
        textSize(100);
        text(highscore, 362,80);
        fill(255);
        textSize(95);
        text(highscore, 360,80),0,0;
        highscoreSpan.html(highscore);
    } else {
        fill(0);
        textFont('flappy-bird');
        textSize(100);
        text('-', 362,80);
        fill(255);
        textSize(95);
        text('-', 360,80),0,0;
    }
    
    ahSpan.html(ahs);
}
function gamestop() {
    bird.stop();
    fill(0);
    textFont('Impact');
    textSize(60);
    text('Game Over', 270, 200);
    textSize(30);
    text('Click Train to go back to training', 200,300);
    text('Double click Train to play again', 210, 350);
    for (let i=0; i<pipes.length;i++) {
        pipes[i].pipestop();
    }
    stopped = true;

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

