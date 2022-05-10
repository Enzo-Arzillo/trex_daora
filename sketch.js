var gameOverimg, restartimg, gameOver, restart
var trex_foi_de_base
var trex, trex_running, edges;
var groundImage, ground, invisibleGround;
var nuvemImagem;
var planta_com_espinho1, planta_com_espinho2, planta_com_espinho3, planta_com_espinho4, planta_com_espinho5, planta_com_espinho6
var pontos=0
var jogar = 1
var encerramento = 0
var gamestate = jogar
var gruposkypea, grupoplanta_sem_espinho
var sompulo, sommorte, somspaw
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  groundImage = loadImage("ground2.png");
  nuvemImagem = loadImage("cloud.png");
  planta_com_espinho1 = loadImage('obstacle1.png')
  planta_com_espinho2 = loadImage('obstacle2.png')
  planta_com_espinho3 = loadImage('obstacle3.png')
  planta_com_espinho4 = loadImage('obstacle4.png')
  planta_com_espinho5 = loadImage('obstacle5.png')
  planta_com_espinho6 = loadImage('obstacle6.png')
trex_foi_de_base = loadAnimation('trex_collided.png')
gameOverimg = loadImage('gameOver.png')
restartimg = loadImage('restart.png')


sompulo = loadSound('jump.mp3')
sommorte = loadSound('die.mp3')
somspaw = loadSound('checkPoint.mp3')
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation('morrido', trex_foi_de_base)
  edges = createEdgeSprites();
  
  ground = createSprite (width/2,height-20,600,20);
  ground.addImage(groundImage);

  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50;

  grupoplanta_sem_espinho = new Group ()
  gruposkypea = new Group ()

  //trex.debug = true
  trex.setCollider('circle', 0, 0, 30)
  gameOver = createSprite(width/2, height-120)
  restart = createSprite(width/2, height-80)
  gameOver.addImage(gameOverimg)
  restart.addImage(restartimg)
  gameOver.visible = false
  restart.visible = false
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");



 
  

  trex.velocityY = trex.velocityY + 0.5;
  

 //impedir que o trex caia
  trex.collide(invisibleGround);
  drawSprites();
text('pontos '+pontos, 530, 30)
if (gamestate === jogar) {
  if (touches.length>0 && trex.y >=height-50){
    trex.velocityY = -10;
    sompulo.play()
    touches = []
  }
  ground.velocityX = -(5+3*pontos/100)
  grupoplanta_sem_espinho.setVelocityXEach(-(5+3*pontos/100))
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
if(pontos >0 && pontos %100 === 0){
  somspaw.play()
}




  gerarNuvens();
  gerarplanta_com_espinho()
  pontos=pontos+Math.round(frameRate()/60)
  if(trex.isTouching(grupoplanta_sem_espinho))
  {gamestate = encerramento
  sommorte.play()
  }
} else if(gamestate === encerramento){
  ground.velocityX=0
  gruposkypea.setVelocityXEach(0)
  grupoplanta_sem_espinho.setVelocityXEach(0)
  grupoplanta_sem_espinho.setLifetimeEach(-972035478)
  gruposkypea.setLifetimeEach(-972035418)
  trex.changeAnimation('morrido', trex_foi_de_base)
  gameOver.visible = true
  restart.visible = true
  if(touches.length>0){
reset()
  }

}





} 
function reset(){
  gamestate = jogar
  grupoplanta_sem_espinho.destroyEach()       
  gruposkypea.destroyEach()
  pontos = 0
  gameOver.visible = false
  restart.visible = false
  trex.changeAnimation("running", trex_running)
}

function gerarNuvens() {
  if(frameCount % 60 ===0){
    var nuvem = createSprite(width,100,40,10);
    nuvem.velocityX = -5;
    nuvem.addImage(nuvemImagem);
    nuvem.y = Math.round(random(20,100));

    trex.depth = nuvem.depth;
    trex.depth = trex.depth +1;
nuvem.lifetime=width/5
gruposkypea.add(nuvem)





  }

  


}
function gerarplanta_com_espinho(){
if(frameCount % 60 ===0){
  var planta_com_espinho = createSprite(width, height-30, 40, 80)
  planta_com_espinho.velocityX = -5
  grupoplanta_sem_espinho.add(planta_com_espinho)
  var aleatorizado = Math.round(random(1,6));
  switch (aleatorizado) {
    case 1:planta_com_espinho.addImage(planta_com_espinho1)
      
      break;
      case 2:planta_com_espinho.addImage(planta_com_espinho2)
      
      break;
      case 3:planta_com_espinho.addImage(planta_com_espinho3)
      
      break;
      case 4:planta_com_espinho.addImage(planta_com_espinho4)
      
      break;
      case 5:planta_com_espinho.addImage(planta_com_espinho5)
      
      break;
      case 6:planta_com_espinho.addImage(planta_com_espinho6)
      
      
      
      break;
    default:
      break;
  }
 planta_com_espinho.scale = 0.5 
 planta_com_espinho.lifetime=width/5
}
}




