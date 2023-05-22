let sprites; // initiate variable sprite
let amount_sprites = 350 // determines amount of sprites

function setup() {
  ghost = loadImage('images/ghost.png')
  ghost_flipped = loadImage('images/ghostFlipped.png')
  ghostSad = loadImage('images/ghostSad.png')
  open = loadImage('images/open.png')
  shut = loadImage('images/shut.png')

  eye = open
  
  createCanvas(windowWidth / 1.2, windowHeight / 1.2);
  noStroke()
  noCursor()
  
  let posx // initiate coordinates x, y
  let posy
  
  sprites = new Group() // create a sprite group and 
                        // define sprite properties
  while (sprites.length <= amount_sprites) {
    let sprite = new sprites.Sprite(random(width), random(height), 40, 40)
    sprite.img = eye;
    sprite.rotationLock = true;
    sprite.acceleration = createVector()
    sprite.velocity = createVector()
    sprite.postition = createVector (posx, posy)
    sprite.maxDist = 100
    sprite.maxForce = 5
    sprite.dampening = 0.1
    sprite.debug = mouse.pressing()


    sprite.flipEye = e => {

      if (mouseX > sprite.position.x - 150 && mouseX < sprite.position.x + 150 && mouseY > sprite.position.y - 150 && mouseY < sprite.position.y + 150) {
        eye = shut
        sprite.img = eye
      } else {
        eye = open
        sprite.img = eye
      }
      }
    }
}


function draw() { // calls each function
                  // once per frame
  // functions are 
  // defined below
  changeEye();  
  admin();
  repel();
  bounce();
  flipCursor();

  
}

function admin() { // draws the background
                   // and the sprites
  background(0);
  drawSprites();
}

function flipCursor() {
  //check which way the mouse is moving
  if (mouseX - pmouseX < 0) {
    image(ghost, mouseX, mouseY, 50, 50)
    setTimeout(1000)
  }
  else if (mouseX - pmouseX > 0) {
    image(ghost_flipped, mouseX, mouseY, 50, 50)
    setTimeout(1000)
  } 
  else {
    image(ghostSad, mouseX, mouseY, 50, 50)  
    setTimeout(1000)
  }
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

function changeEye () {
  sprites.forEach((s) => {
    s.flipEye()
  })
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