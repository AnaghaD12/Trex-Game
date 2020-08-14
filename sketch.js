var trex,trex_running;
var ground,ground2; 
var invisibleground;
var Score = 0; 
var PLAY = 1;
var END = 0;
var GameState = PLAY; 
var cloud1; 
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cactaigroup;
var cloudsgroup; 
var stop;
var goimage;
var rsimage;
var go;
var rs;
var die,check,jump;
localStorage["highestscore"] = 0; 
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground2 = loadImage("ground2.png")
  cloud1 = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  stop = loadAnimation("trex_collided.png")
  goimage = loadImage("gameOver.png")
  rsimage = loadImage("restart.png")
  die = loadSound("die.mp3");
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(30,180,20,20);
  trex.addAnimation("trex_running",trex_running);
  trex.addAnimation("trexstop",stop);
  trex.scale = 0.5;
  ground = createSprite(300,180,600,20);
  ground.addImage("ground2",ground2)
  invisibleground = createSprite(300,190,600,20);
  invisibleground.visible = false; 
  cactaigroup = new Group()
  cloudsgroup = new Group()
  go = createSprite(300,100,20,20);
  rs = createSprite(300,115,20,20);
  go.addImage("gameOver",goimage);
  rs.addImage("restart",rsimage);
  rs.scale = 0.5;
  go.visible = false;
  rs.visible = false;
}


function draw() {
  background(120);
  if (GameState === PLAY){
  
  
  ground.velocityX = -5; 
  if(ground.x<0) {
  ground.x = ground.width/2; 
  }
  
  if(keyDown("space") && trex.y>=151){
  trex.velocityY = -10;
  }
  trex.velocityY += 0.5 
  clouds();
  cactai();
  
  Score = Score+Math.round(getFrameRate()/60);
  if (cactaigroup.isTouching(trex)){
  GameState = END; 
  die.play();
  }
  }
  
  else if(GameState === END){
  ground.velocityX = 0;
  cactaigroup.setVelocityXEach(0);  
  cloudsgroup.setVelocityXEach(0); 
  cactaigroup.setLifetimeEach(-1);
  cloudsgroup.setLifetimeEach(-1);
  trex.changeAnimation("trexstop");
  go.visible = true;
  rs.visible = true;
  trex.velocityY = 0;
  }
  if(mousePressedOver(rs)){
  reset();
  }
  fill("white");
  text("Score :"+Score, 270,30)
  if (localStorage["highestscore"] < Score){
  localStorage["highestscore"] = Score;
  }
  fill ("white")
  text("Highscore:"+localStorage["highestscore"], 500,30);
  trex.collide(invisibleground);
  drawSprites();
  
}

function clouds(){
if(World.frameCount % 60 == 0){
  var cloud = createSprite(600,random(40,100),20,20);
  cloud.velocityX = -5;
  cloud.addImage("cloud",cloud1);
  cloudsgroup.add(cloud);
}
  
}

function cactai(){
if(World.frameCount % 60 == 0){
var cactus = createSprite(600,175,20,20)
cactus.velocityX = -5;
cactus.scale = 0.7;
  var rand = Math.round(random(1,6))
  switch (rand){
    case 1 :cactus.addImage(obstacle1)
        break;
    case 2 :cactus.addImage(obstacle2) 
      break;
    case 3 :cactus.addImage(obstacle3)
      break;
    case 4 :cactus.addImage(obstacle4)
      break;
    case 5 :cactus.addImage(obstacle5)
      break;
    case 6 :cactus.addImage(obstacle6)
      break;
      default:break;
  }
  cactaigroup.add(cactus);
  }
  
}


function reset(){
 GameState = PLAY;
 Score = 0;
 cactaigroup.destroyEach();
 cloudsgroup.destroyEach();
 go.visible = false;
 rs.visible = false;
 trex.changeAnimation("trex_running"); 
  
  
}