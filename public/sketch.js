// sprite group + amount
let sprites;
let amount_sprites = 110;

// ghost images
let ghost, ghost_flipped, ghostSad, openEye, shutEye;

function preload() {
  ghost = loadImage('images/ghost.png');
  ghost_flipped = loadImage('images/ghostFlipped.png');
  ghostSad = loadImage('images/ghostSad.png');
  openEye = loadImage('images/open.png');
  shutEye = loadImage('images/shut.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();

  sprites = new Group();

  // create all sprites
  for (let i = 0; i < amount_sprites; i++) {
    let s = new Sprite(random(width), random(height), 40, 40);
    s.img = openEye;
    s.rotationLock = true;

    // custom properties
    s.velocity = createVector();
    s.acceleration = createVector();
    s.maxDist = 100;
    s.maxForce = 5;
    s.dampening = 0.1;

    // flip eye function
    s.flipEye = () => {
      if (
        abs(mouseX - s.position.x) < 150 &&
        abs(mouseY - s.position.y) < 150
      ) {
        s.img = shutEye;
      } else {
        s.img = openEye;
      }
    };

    sprites.add(s);
  }
}

function draw() {
  background(0);

  changeEye();
  repel();
  bounce();
  changeCursor();
}

// 👻 draw ghost cursor depending on movement
function changeCursor() {
  let dx = mouseX - pmouseX;

  if (dx < 0) {
    image(ghost, mouseX, mouseY, 50, 50);
  } else if (dx > 0) {
    image(ghost_flipped, mouseX, mouseY, 50, 50);
  } else {
    image(ghostSad, mouseX, mouseY, 50, 50);
  }
}

// 👀 toggle eyes depending on mouse proximity
function changeEye() {
  sprites.forEach((s) => {
    s.flipEye();
  });
}

// 🌀 repel sprites away from mouse
function repel() {
  sprites.forEach((s) => {
    let mousePos = createVector(mouseX, mouseY);
    s.acceleration = p5.Vector.sub(s.position, mousePos).setMag(
      map(s.position.dist(mousePos), 0, s.maxDist, s.maxForce, 0, true)
    );

    s.velocity.add(s.acceleration);
    s.position.add(s.velocity.mult(1 - s.dampening));
  });
}

// 🔄 keep sprites inside canvas
function bounce() {
  sprites.forEach((s) => {
    // left wall
    if (s.position.x - s.w / 2 < 0) {
      s.position.x = s.w / 2;
      s.velocity.x *= -1;
    }

    // right wall
    if (s.position.x + s.w / 2 > width) {
      s.position.x = width - s.w / 2;
      s.velocity.x *= -1;
    }

    // top wall
    if (s.position.y - s.h / 2 < 0) {
      s.position.y = s.h / 2;
      s.velocity.y *= -1;
    }

    // bottom wall
    if (s.position.y + s.h / 2 > height) {
      s.position.y = height - s.h / 2;
      s.velocity.y *= -1;
    }
  });
}