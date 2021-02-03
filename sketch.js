var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;
var edges;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("star.png");
	fairyImg = loadAnimation("fairyImage1.png","fairyImage2.png");
	bgImg = loadImage("starNight.png");
	fairyVoice = loadSound("JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;
	
	fairy.setCollider("rectangle",100,0,1000,1300);

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

	edges = createEdgeSprites();

}


function draw() {
  background(bgImg);
  
  star.x = starBody.position.x;
  star.y = starBody.position.y;
  keyPressed();

  if(starBody.position.y > 470 && star.y > 470 && fairy.isTouching(star)){
	  Matter.Body.setStatic(starBody,true);
  }

  //colliding Fairy with edges	
  fairy.collide(edges[0]);
  fairy.collide(edges[1]);

  drawSprites();

}

function keyPressed() {
	//write code here

	 //moving fairy left and right
	 if(keyDown("left")){
		fairy.x = fairy.x - 5;
		}
	if(keyDown("right")){
	  fairy.x = fairy.x + 5;
	  }
	
	// moving the star
	if(keyDown("down")){
		Matter.Body.setStatic(starBody, false);
	}
}
