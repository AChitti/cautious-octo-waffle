//Create variables here
var dog, happyDog, dogImage, happyDogImage, database, food, foodStock;

function preload(){
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database;
  dog = createSprite(250,250,5,5);
  dog.addImage(dogImage)
  food = database.ref('food');
  food.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if (keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  //add styles here
  textSize(30);
  fill("red");
  text("FoodStock:"+foodStock,30,50);
}

function writeStock(x){
  if (x<= 0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('food').set({
    food:x
  })
}

function readStock(data){
  food = data.val(); 
}