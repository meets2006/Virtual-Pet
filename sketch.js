//Create variables here
var dog,dogimg,happyDog;
var database,foodS,foodStock,feed, addFood, foodObj;
var fedTime, lastFed
function preload()
{
  dogimg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
	//load images here
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(250,250);
  dog.addImage(dogimg);
  dog.scale=0.1
  database=firebase.database()
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  foodObj = new Food(720,220,70,70);
  foodS = 0;
  feed=createButton("Feed the Dog");
  feed.position(650,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFood);
}


function draw() {  
  background(46,139,87)
 fedTime=database.ref('FeedTime');
 fedTime.on("value", function(data){
   lastFed=data.val();
 })
 var input = createInput("Pet Name")
        input.position(130,160)
  fill(255,255,254)
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM", 350, 30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350, 30);
   }
  //add styles here
drawSprites();
fill("white");
stroke(3)
text("FoodStock: "+foodS,100,50);
fill("white");
stroke(3)

text("How To PLay: Press Up Arrow key To Feed the Dog",100,100)
foodObj.display();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
      x=x-1;
  }
    database.ref("/").update({
      Food:x
    })
}

 function feedDog(){
  dog.addImage(happyDog);
  var response =  fetch("http://worldtimeapi.org/api/timezone/America/Los_Angeles");
  var responseJSON =  response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour
  })
}

function addFoods(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}