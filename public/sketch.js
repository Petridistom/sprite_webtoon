let sprites; // initiate variable sprite
let amount_sprites = 200 // determines amount of sprites

function setup() {
  createCanvas(900, 1600);
  noStroke()
  noCursor()
  
  let posx // initiate coordinates x, y
  let posy
  
  sprites = new Group() // create a sprite group and 
                        // define sprite properties
  while (sprites.length <= amount_sprites) {
    let sprite = new sprites.Sprite(random(width), random(height), 40, 40)
    sprite.shapeColor = 'deeppink';
    sprite.acceleration = createVector()
    sprite.velocity = createVector()
    sprite.postition = createVector (posx, posy)
    sprite.maxDist = 100
    sprite.maxForce = 5
    sprite.dampening = 0.1
  }
}

function draw() { // calls each function
                  // once per frame
  // functions are 
  // defined below
  admin();
  followMouse();
  repel();
  bounce();
}

function admin() { // draws the backgrounf
                   // and the sprites
  background(0);
  drawSprites();
}

function followMouse() { // creates a circle that
                          // follows the mouse
  fill(255)
  circle(mouseX, mouseY, 30)
}

function repel() { // updates velocity values
                  // for sprites near the mouse
    for(let i = 0; i < sprites.length; i++) {
    
    sprites[i].mousePosition = createVector(mouseX, mouseY)
    
    sprites[i].acceleration = p5.Vector.sub(sprites[i].position, sprites[i].mousePosition).setMag(
    map(sprites[i].position.dist(sprites[i].mousePosition), 0, sprites[i].maxDist, sprites[i].maxForce, 0, true)
    );
    
    sprites[i].velocity.add(sprites[i].acceleration);
    
    sprites[i].position.add(sprites[i].velocity.mult(1-sprites[i].dampening));
  }
}

function bounce() { // keeps sprites bounded
                    // inside the page
  
  for (let i = 0; i < sprites.length; i++) {
   if (sprites[i].position.x - 40 / 2 < 1) {
   //keep the circle on the page
   //change its direction
    sprites[i].position.x = 40 - sprites[i].position.x; 
    sprites[i].velocity.x *= -1;
  } 
    
    else if (sprites[i].position.x + 40 / 2 > width -1) {
      //keep the circle on the page
      //change its direction
    sprites[i].position.x = 2 * (width - 1) - 40 - sprites[i].position.x;
    sprites[i].velocity.x *= -1;
  }
    
    
  if (sprites[i].position.y - 40 / 2 < 1) {
      //keep the circle on the page
      //change its direction
    sprites[i].position.y = 40 - sprites[i].position.y;
    sprites[i].velocity.y *= -1;
  } 
    
    else if (sprites[i].position.y + 40 / 2 > height - 1) {
      //keep the circle on the page
      //change its direction
    sprites[i].position.y = 2 * (height - 1) - 40 - sprites[i].position.y;
    sprites[i].velocity.y *= -1;
  }
}    
}