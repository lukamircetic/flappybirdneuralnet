const TOTAL = 1000;

var pipes = [];
let counter = 0;
let slider;
let brainJSON;
function preload() {
    brainJSON = loadJSON("bestbird.json");
}
function setup() {
    createCanvas(400, 600);
    slider = createSlider(1,100,1);
    let birdBrain = NeuralNetwork.deserialize(brainJSON);
    bird = new Bird(birdBrain);
}



function draw() {
    for (let n = 0; n < slider.value(); n++) { //
        
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter ++;
        for(var i = pipes.length-1; i >= 0; i--) {
            pipes[i].update();

            if (pipes[i].hits(bird)) {
                    console.log("Hit");
                }

            if (pipes[i].offscreen()) {
                pipes.splice(i,1);
            }
            if (bird.offScreen()) {
                console.log("offscreen");
            }
        
        }
        bird.think(pipes);
        bird.update();

    }
    background(0);
        bird.show();
    for (let pipe of pipes) {
        pipe.show();
    }
}

// function keyPressed() {
//     if (key == ' ') {
//         // console.log("space");
//         birds.up();
//     }
// }

