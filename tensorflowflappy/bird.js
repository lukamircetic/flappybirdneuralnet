class Bird {
    constructor(brain){
        this.y = height/2;
        this.x = 50;
        
        this.icon = birdSprite;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
        this.h = 0;
        this.width = 30;
        this.score = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
        this.brain = new NeuralNetwork(5,8,2);
        }
    }
    


    
    
    think(pipes) {
        //algorithm to find closest pipe to bird//

        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = (pipes[i].x + pipes[i].w)- this.x;
            if (d < closestD && d>0){
                closest = pipes[i];
                closestD = d;
            }

        }


        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.velocity/10;
        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) { // && this.velocity >=0
            this.up();

        }
    }
    mutate() {
        this.brain.mutate(0.1);
    }
    show = function() {
        // fill(255,50);
        // stroke(255);
        // ellipse(this.x, this.y, 30, 30);
        image(this.icon, this.x-15, this.y-15, 34, 24);
    }
    up () {
        this.velocity += this.lift;
    }

    offScreen() {
        return (this.y > height || this.y < 0)
    }
    update ()  {
        this.score++;
        this.velocity += this.gravity;
        this.velocity*=0.9;
        this.y += this.velocity;
        // if (this.y > height) {
        //     this.y = height;
        //     this.velocity = 0;
        // }
        // if (this.y < 0) {
        //     this.y = 0;
        //     this.velocity = 0;
        // }


    }
}