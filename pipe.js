class Pipe {

    constructor () {
        this.spacing = 125;
        this.centery = random(this.spacing, height-this.spacing);
        this.top = this.centery-this.spacing/2;
        this.bottom = height - (this.centery+this.spacing/2);
        this.x = width;
        this.w = 30;
        this.speed = 2;
        this.highlight = false;
    }
    

    
    hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x+this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    show() {
        stroke(255);
        fill(255);
        if (this.highlight) {
            fill(255,0,0);
        }
        rect(this.x,0,this.w,this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
    }
    update() {
        this.x -= this.speed;
    }
    offscreen() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}