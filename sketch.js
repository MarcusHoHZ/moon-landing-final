var spaceship, spaceshipImg
var bgImg,bg
var asteroid, asteroidImg, asteroidGroup
var score
var PLAY = 1
var END = 0 
var gamestate = PLAY

function preload() {
bgImg = loadImage("moon.jpeg")
spaceshipImg = loadImage("rocket1.png")
asteroidImg = loadImage("asteroid.png")
}
function setup() {
  createCanvas(800,625);
  bg = createSprite(400,370,800,625);
  bg.addImage(bgImg);
  spaceship = createSprite(400,300,50,50)
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.35
  //spaceship.debug = true
  asteroidGroup = new Group();

  score = 0;
}

function draw() {


  background(255,255,255);
  drawSprites();
  if(gamestate === PLAY) {

    if(keyDown(UP_ARROW)) {
      spaceship.y -= 10
    }
  
    if(keyDown(DOWN_ARROW)) {
      spaceship.y += 10 
    }
  
    if(keyDown(LEFT_ARROW)) {
      spaceship.x -= 10
    }
  
    if(keyDown(RIGHT_ARROW)) {
      spaceship.x += 10
    
    }
    
    spawnAsteroid();
    if(asteroidGroup.isTouching(spaceship)) {
      gamestate = END 
    }
    score = score + Math.round(getFrameRate()/60);
  }
     else if(gamestate === END) {
      asteroidGroup.setVelocityYEach(0)
      spaceship.velocityX = 0
      spaceship.velocityY = 0
 
      asteroidGroup.destroyEach()
      
      fill(255)
      textSize(35)
      text("Game Over!",300,100)
     }
  

 

    
    fill(255)
    textSize(20)
    text("Score: "+ score, 500,50);
    
}

function spawnAsteroid() {
if(frameCount % 60 === 0) {
  asteroid = createSprite(Math.round(random(50,575)),-10,50,50);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.09; 
  //asteroid.debug = true
  asteroid.velocityY = 3;
   asteroidGroup.add(asteroid)

}
}

