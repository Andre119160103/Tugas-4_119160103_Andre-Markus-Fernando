let vs = []
function setup() {
  createCanvas(windowWidth,windowHeight);
  karakter = new Miawaug(windowWidth,windowHeight);
}

function draw() {
  background('black');
  
  karakter.display()
  karakter.edges()
  karakter.update();
  karakter.wander();
  
}

class Miawaug{
  constructor(x,y){
    this.location     = createVector(x,y);
    this.velocity     = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l            = 30.0;
    this.maxspeed     = 2;
    this.maxforce     = 0.1;
    this.wanderTheta  = 0;
  }
  
  wander(){
    
    let projVector = this.velocity.copy();
        projVector.setMag(200); // Panjang projektor
    
    let projPoint    = projVector.add(this.location);
    let wanderRadius = 50;
    let theta        = this.wanderTheta + this.velocity.heading();
    
    let xBar         = wanderRadius * cos(theta);
    let yBar         = wanderRadius * sin(theta);
    
    let wanderPoint  = p5.Vector.add(projPoint, createVector(xBar,yBar));
    
    let debug = true;
    
    if(debug){
      push()
      line(this.location.x, this.location.y, projPoint.x, projPoint.y);
      noStroke();
      fill('red');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke ('blue')
      circle(projPoint.x,projPoint.y, wanderRadius*2);
      
      line(this.location.x ,this.location.y, wanderPoint.x, wanderPoint.y);
      fill('green')
      circle(wanderPoint.x, wanderPoint.y, 16)
      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
        steeringForce.setMag(this.maxforce);
        this.applyForce(steeringForce)
        this.wanderTheta += random(-0.1, 0.1)
    
    
    
    
  }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill('white');
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
    
  // AVATAR
    
  fill(255,255,255)                  //Warna Putih
  triangle(-30,-30, -35,0, -20,-20); // Kuping Kiri
  triangle(30,-30, 20,-20, 35,0);    // Kuping Kanan
  
    beginShape();
  vertex(-20,-20)                    // Wajah
  vertex(-35,0)
  vertex(0,40)
  vertex(35,0)
  vertex(20,-20)                     // Wajah
    endShape(CLOSE);
    
  fill(0)                            // Warna Hitam
  ellipse(12, -1, 15, 15);           //mata hitam besar
  ellipse(-10, 0, 5, 5);             // mata hita kecil
    
  fill(255,255,255)                  // Warna Putih
  ellipse(10, 0, 5, 5);              // mata putih kecil
    
  strokeWeight(2)
  arc(0,14, 30, 15, radians(30), radians(150)); // senyuman mulut
    
  strokeWeight(2)
  fill(0)                            //Warna Hitam
  triangle(-2,12, 2,12, 0,14);       // Hidung
  line(0,15,0,20);                   // garis hidung
    
  strokeWeight(2)
  fill(239, 147, 147)                //Warna Merah Muda
  ellipse(0, 21, 9, 6);              // mulut
    
  pop(); }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}