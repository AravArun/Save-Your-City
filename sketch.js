var scene, jet;
var scene_img, jet_img, bomb_img, cow_img, human1_img, human2_img, human3_img, human4_img, human5_img;
var building1_img, building2_img, building3_img, building4_img;
var friendsGroup;
var enemy1_img, enemy2_img, enemy3_img, enemy4_img, enemy5_img, enemy6_img;

function preload(){
  scene_img = loadImage("media/bgImage.jpg");
  jet_img = loadImage('media/jet.png');
  bomb_img = loadImage('media/bomb.png');
  cow_img = loadImage('media/cow.png');
  human1_img = loadImage('media/human1.png');
  human2_img = loadImage('media/human2.png');
  human3_img = loadImage('media/human3.png');
  human4_img = loadImage('media/human4.png');
  human5_img = loadImage('media/human5.png');
  building1_img = loadImage('media/building1.png');
  building2_img = loadImage('media/building2.png');
  building3_img = loadImage('media/building3.png');
  building4_img = loadImage('media/building4.png');
  enemy1_img = loadImage('media/enemy1.png');
  enemy2_img = loadImage('media/enemy2.png');
  enemy3_img = loadImage('media/enemy3.png');
  enemy4_img = loadImage('media/enemy4.png');
  enemy5_img = loadImage('media/enemy5.png');
  enemy6_img = loadImage('media/enemy6.png');
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 130);
  scene = createSprite(width/2, height/2 - 100, width, height);
  scene.addImage(scene_img);
  scene.scale = 4;
  scene.velocityX = -3;

  jet = createSprite(200, 200);
  jet.addImage(jet_img);
  jet.scale = 0.5;

  friendsGroup = new Group();
}

function draw() {
  background("lightBlue");  
  
  if(scene.x < width/4){
    scene.x = width/2;
  }

  if(keyWentDown('space')){
    spawnBomb();
  }
  spawnFriends();
  drawSprites();
}

function spawnBomb(){
  var bomb = createSprite(jet.x, jet.y);
  bomb.velocityY = 3;
  bomb.addImage(bomb_img);
  bomb.scale = 0.1;
}

function spawnFriends(){
  if(frameCount % 150 == 0){
    var friends = createSprite(width, 680);
    friends.velocityX = -3;

    switch(Math.round(random(1,10))){
      case 1: friends.addImage(cow_img);
        friends.scale = 0.1;
        break;
      case 2: friends.addImage(human1_img);
        friends.y = 625;
        break;
      case 3: friends.addImage(human2_img);
        friends.scale = 0.3;
        friends.y = 650
        break;
      case 4: friends.addImage(human3_img);
        friends.scale = 0.3;
        friends.y = 660
        break;
      case 5: friends.addImage(human4_img);
        friends.scale = 0.3;
        friends.y = 670
        break;
      case 6: friends.addImage(human5_img);
        friends.scale = 0.3;
        friends.y = 665;
        break;
      case 7: friends.addImage(building1_img);
        friends.y = 610;
        break;
      case 8: friends.addImage(building2_img);
        friends.scale = 0.7
        friends.y = 640;
        break;
      case 9: friends.addImage(building3_img);
        friends.scale = 0.8
        friends.y = 630;
        break;
      case 10: friends.addImage(building4_img);
        friends.y = 610;
        break;
      default: friends.addImage(cow_img);
        friends.scale = 0.1;
        break;
    }
    friends.lifetime = Math.random(width/friends.velocityX);
    console.log(friends.lifetime); 
    friendsGroup.add(friends);
  }
}