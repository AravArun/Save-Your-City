var scene, jet;
var scene_img,jet_img, bomb_img, cow_img, human1_img, human2_img, human3_img, human4_img, human5_img;
var building1_img, building2_img, building3_img, building4_img, score500_img, score1500_img, score2000_img;;
var peopleGroup, enemiesGroup, bombGroup;
var enemy1_img, enemy2_img, enemy3_img, enemy4_img, enemy5_img, enemy6_img, warning_img;
var ground, count, lives, gameState, intro_img, gameOver_img, heart_img,gameOver;
var explosion_sound, score_sound, die_sound;

function preload(){
  scene_img = loadImage("media/bgImage.jpg");
  jet_img = loadImage('media/jet.png');
  bomb_img = loadImage('media/bomb.png');
  //friends images
  cow_img = loadImage('media/cow.png');
  //1) humans images
  human1_img = loadImage('media/human1.png');
  human2_img = loadImage('media/human2.png');
  human3_img = loadImage('media/human3.png');
  human4_img = loadImage('media/human4.png');
  human5_img = loadImage('media/human5.png');
  //2) building images
  building1_img = loadImage('media/building_1.png');
  building2_img = loadImage('media/building2.png');
  building3_img = loadImage('media/building3.png');
  building4_img = loadImage('media/building4.png');
  // Enemy images
  enemy1_img = loadImage('media/enemy1.png');
  enemy2_img = loadImage('media/enemy2.png');
  enemy3_img = loadImage('media/enemy3.png');
  enemy4_img = loadImage('media/enemy4.png');
  enemy5_img = loadImage('media/enemy5.png');
  enemy6_img = loadImage('media/enemy6.png');
  //interaction images
  warning_img = loadImage('media/kill.png');
  score500_img = loadImage('media/points500.png');
  score1500_img = loadImage('media/points1500.png');
  score2000_img = loadImage('media/points2000.png');
  intro_img = loadImage('media/intro.png');
  gameOver_img = loadImage('media/gameOver.jpg');
  heart_img = loadImage('media/heart.png');
  //loading sounds
  explosion_sound = loadSound('media/explosion.mp3');
  score_sound = loadSound('media/score.wav');
  die_sound = loadSound('media/die.wav');
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 130);
  count = 0;
  lives = 3;
  gameState = 'play';
  scene = createSprite(width/2, height/2 - 100, width, height);
  scene.addImage(scene_img);
  scene.scale = 4;
  scene.velocityX = -3;

  jet = createSprite(200, 200);
  jet.addImage(jet_img);
  jet.scale = 0.5;

  ground = createSprite(width/2, 730, width, 20);
  ground.x = ground.width / 2;
  ground.visible = false;

  var intro = createSprite(width/2,height/2,width,height);
  intro.addImage(intro_img);
  intro.lifetime = 360;
  

  peopleGroup = new Group();
  enemiesGroup = new Group();
  bombGroup = new Group();
}

function draw() {
  background("lightBlue");  

  if(gameState == 'play'){
    if(scene.x < width/4){
      scene.x = width/2;
    }
  
    if(keyWentDown('space')){
      spawnBomb();
    }
    
    spawnPeople();
  
    if(enemiesGroup.isTouching(bombGroup)){
      enemiesGroup.destroyEach();
      bombGroup.destroyEach();
      count = count + 20;
      score_sound.play();
    }
  
    if(bombGroup.isTouching(ground)){
      bombGroup.destroyEach();
      explosion_sound.play()
    }
  
    if(bombGroup.isTouching(peopleGroup)){
      var warning = createSprite(width/2,height/2);
      warning.addImage(warning_img);
      warning.lifetime = 30;
      bombGroup.destroyEach();
      peopleGroup.destroyEach(); 
      lives--;
      die_sound.play();
    }

    if(lives == 0){
      gameState = 'end';
    }
    //scoring();
  }
  else if(gameState == 'end'){
    console.log('end')
    jet.destroy();
    enemiesGroup.destroyEach();
    peopleGroup.destroyEach();
    gameOver = createSprite(width/2,height/2,width,height)
    gameOver.addImage(gameOver_img);
  }

  drawSprites();
  fill("blue");
  textSize(30)
  text("score: "+count,width - 200, 150);

  var x = width - 200;
  for(var i = 0; i < lives; i++){
    image(heart_img,x,50,50,50);
    x += 60;
  }
}

function scoring(){
  switch(count){
    case 20: die_sound.play();
    break;

    case 40: explosion_sound.play();
    break;

    case 60: explosion_sound.play();
    break;
  }

}

function spawnBomb(){
  var bomb = createSprite(jet.x, jet.y);
  bomb.velocityY = 5;
  bomb.addImage(bomb_img);
  bomb.scale = 0.08;
  bombGroup.add(bomb);
}

function spawnPeople(){
  if(frameCount % 90 == 0){
    var people = createSprite(width, 680);
    people.velocityX = -3;
    people.setCollider('circle', 0, 0, 50);

    people.lifetime = Math.round(-width/people.velocityX);

    switch(Math.round(random(1,16))){
      case 1: people.addImage(cow_img);
        people.scale = 0.1;
        peopleGroup.add(people);
        break;
      case 2: people.addImage(human1_img);
        people.y = 625;
        peopleGroup.add(people);
        break;
      case 3: people.addImage(human2_img);
        people.scale = 0.3;
        people.y = 650
        peopleGroup.add(people);
        break;
      case 4: people.addImage(human3_img);
        people.scale = 0.3;
        people.y = 660;
        peopleGroup.add(people);
        break;
      case 5: people.addImage(human4_img);
        people.scale = 0.3;
        people.y = 670
        peopleGroup.add(people);
        break;
      case 6: people.addImage(human5_img);
        people.scale = 0.3;
        people.y = 665;
        peopleGroup.add(people);
        break;
      case 7: people.addImage(building1_img);
        people.y = 590;
        people.scale = 1.2;
        peopleGroup.add(people);
        break;
      case 8: people.addImage(building2_img);
        people.scale = 1.2
        people.y = 580;
        peopleGroup.add(people);
        break;
      case 9: people.addImage(building3_img);
        people.scale = 1.2
        people.y = 580;
        peopleGroup.add(people);
        break;
      case 10: people.addImage(building4_img);
        people.scale = 1.5
        people.y = 560;
        peopleGroup.add(people);
        break;
      case 11: people.addImage(enemy1_img);
      people.scale = 0.4;
      people.y = 650
      enemiesGroup.add(people);
      break;

      case 12: people.addImage(enemy2_img);
      people.scale = 0.4;
      people.y = 650
      enemiesGroup.add(people);
      break;

      case 13: people.addImage(enemy3_img);
      people.scale = 0.4;
      people.y = 650
      enemiesGroup.add(people);
      break;

      case 14: people.addImage(enemy4_img);
      people.scale = 0.4;
      people.y = 650
      enemiesGroup.add(people);
      break;

      case 15: people.addImage(enemy5_img);
      people.scale = 0.4;
      people.y = 650
      enemiesGroup.add(people);
      break;

      case 16: people.addImage(enemy6_img);
      people.scale = 0.4;
      people.y = 650
      enemiesGroup.add(people);
      break;

      default: people.addImage(cow_img);
        people.scale = 0.1;
        break;
    }
  }
}