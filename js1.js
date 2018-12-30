var s;
var speed1;
var height;
var width;
var food;
var scale2;


function setup(){
  height = 400;
  width = 400;
  speed1 = 1;
  scale2 = 20;
  createCanvas(height,width);
  s = new snake();
  frameRate(10);
  pickLocation();


}

function draw(){
  background(51);
  if (s.checkDead()){
    background(255,0,100);
    return;
  }
  if (s.eat(food)){
    pickLocation();
  }
  s.update();
  s.show();
  fill(255,0,100);
  rect(food.x,food.y,scale2,scale2);
}

function keyPressed(){

  if (keyCode === 87){
    s.dir(0,-1*speed1);
  }else if(keyCode === 83){
    s.dir(0,speed1);
  }else if (keyCode === 65) {
    s.dir(-1*speed1,0);
  }else if (keyCode === 68){
    s.dir(speed1,0);
  }
}

function pickLocation(){
  var cols=floor(width/scale2);
  var rows=floor(height/scale2);
  food = createVector(floor(random(cols)),floor(random(rows)));
  food.mult(scale2);
}

function snake(){
  this.x= (floor((floor(width/2))/scale2))*scale2;
  this.y= (floor((floor(height/2))/scale2))*scale2;
  this.xSpeed=speed1;
  this.ySpeed=0;
  this.tail=[];

  this.dir=function(x,y){
    this.xSpeed=x;
    this.ySpeed=y;
  }

  this.update=function() {

    for (var i=0;i<this.tail.length-1;i=i+1){
      this.tail[i]=this.tail[i+1];
    }
    this.tail[this.tail.length-1]=createVector(this.x,this.y);

    this.x=this.x+(this.xSpeed * scale2);
    this.y=this.y+(this.ySpeed * scale2);

    if (this.x>=width){
      this.x=0;
    }else if(this.x<0){
      this.x=width;
    }else if(this.y>=height){
      this.y=0;
    }else if(this.y<0){
      this.y=height;
    }
  }

  this.eat=function(aFood){
    if (food.x === this.x && food.y===this.y){
      this.tail.unshift(createVector(food.x,food.y));
      return true;
    }else{
      return false;
    }
  }

  this.show=function(){
    for (var i=0;i<this.tail.length;i=i+1){
      fill(255);
      rect(this.tail[i].x,this.tail[i].y,scale2,scale2);
    }
    fill(255);
    rect(this.x,this.y,scale2,scale2);

  }
  this.checkDead=function(){
    for (var i=0; i<this.tail.length-1;i=i+1){
      if (this.tail[i].x===this.x && this.tail[i].y===this.y){
        return true;
      }
    }
    return false;
  }
}

var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);
