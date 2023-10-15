class Game {
  constructor() {}
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // TA
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];


    fuels = new Group();
    powerCoins = new Group();

    this.addSprites(fuels,3,fuelImage,0.3);
    this.addSprites(powerCoins,1000,coinImage,0.3);
  }

  addSprites(spriteGroup,numberOfSprites,SpriteImage,Scale){
    for(var i; i<numberOfSprites,i++;){
      var x, y;
      x = random(width/2+150,width/2-150);
      y = random(-height*4.5,height-400);
      var sprite = createSprite(x,y);
      sprite.addImage(SpriteImage);
      sprite.scale = Scale;
      spriteGroup.add(sprite);
    }
  }

  handleFuels(index){
    cars[index-1].overlap(fuels,function(collector,collected)
    {
      player.fuels = 185;
      collected.remove();
    })
  }

  handlePowerCoins(index){
    cars[index-1].overlap(fuels,function(collector,collected)
    {
      player.score += 20;
      collected.remove();
    })
  }


  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();

    Player.getPlayersInfo(); //added

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 1;
      for (var plr in allPlayers) {
        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index-1].position.x = x;
        cars[index-1].position.y = y;

        if(index === player.index){
          stroke(10);
          fill ("red");
          ellipse(x, y, 60, 60);
          
          this.handleFuels(index);
          this.handlePowerCoins(index);
        }

        //add 1 to the index for every loop
        index = index + 1;

      }

      // handling keyboard events
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }
}
