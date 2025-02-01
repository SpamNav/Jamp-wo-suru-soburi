// code.9leap.net default template
// based on enchant.js v0.7.1
enchant();

window.onload = function() {
    var game = new Core(500, 300);
    game.fps = 30;
    
    game.preload("effect0.png","info.png","crybaby_comp.mp3","expl.mp3","sky.png","player_sprite.png","Kanban_sprite.png","building.png","ground.png","hastur.png");
    
    game.onload = function() {
        var a = 0;
        var status = 0;
        var SCR_SPD = 5;
        var scr_m = 0;
        var score = -1;
        var lv = 1;
        var end = 0;
        
        var bg = new Sprite(500,300);
        bg.image = game.assets["sky.png"];
        bg.x = 0;
        bg.y = 0;
        game.rootScene.addChild(bg);
        
        var bdg1 = new Sprite(500,300);
        bdg1.image = game.assets["building.png"];
        bdg1.x = 0;
        bdg1.y = 0;
        game.rootScene.addChild(bdg1);
        
        var bdg2 = new Sprite(500,300);
        bdg2.image = game.assets["building.png"];
        bdg2.x = 500;
        bdg2.y = 0;
        game.rootScene.addChild(bdg2);

        var ground = new Sprite(500,300);
        ground.image = game.assets["ground.png"];
        ground.x = 0;
        ground.y = 0;
        game.rootScene.addChild(ground);
        
        var scorelabel = new Label("");
        scorelabel.x = 25;
        scorelabel.y = 15;
        scorelabel.color = "#fff";
        scorelabel.font = "Dela Gothic One";
        game.rootScene.addChild(scorelabel);
        
        var kanban = new Sprite(64,64);
        kanban.image = game.assets["Kanban_sprite.png"];
        kanban.x = 400;
        kanban.y = 210;
        kanban.frame = 0;
        game.rootScene.addChild(kanban);
        
        
        var hastur = new Sprite(113,40);
        hastur.image = game.assets["hastur.png"];
        hastur.x = -hastur.width;
        hastur.y = 100;
        game.rootScene.addChild(hastur);
      
        var player = new Sprite(64,64);
        player.image = game.assets["player_sprite.png"];
        player.x = 30;
        player.y = 210;
        game.rootScene.addChild(player);
        
        var expl = new Sprite(32,32);
        expl.image = game.assets["effect0.png"];
        expl.x = -64;
        expl.y = -64;
        expl.scaleX = 2;
        expl.scaleY = 2;
        game.rootScene.addChild(expl);
        
        var info = new Sprite(500,300);
        info.image = game.assets["info.png"];
        info.x = 0;
        info.y = 0;
        game.rootScene.addChild(info);
        
        var se = game.assets["expl.mp3"];
        var bgm = game.assets["crybaby_comp.mp3"];
        
        
        var gameover = function(){
            if (end === false){
                end = true;
                se.play();
                expl.x = player.x + 15;
                expl.y = player.y + 5;
                if (score < 0){
                    score = 0;
                }
                var result = new Label(score.toString() + "回の月末をジャンプして越した" );
                    result.x = 25;
                    result.y = 35;
                    result.color = "#fff";
                    result.font = "Dela Gothic One";
                    game.rootScene.addChild(result);
            }
        }
        
        game.addEventListener(Event.ENTER_FRAME, function(){ 
            if(end === false){
                bdg1.x -= SCR_SPD;
                bdg2.x -= SCR_SPD;
                scr_m++;
                if(scr_m % 5320 === 0 && scrm !== 0){
                bgm.play();
                }
            }
            scorelabel.text = scr_m.toString() + "m";
            if (scr_m % 100 === 0 && scr_m !== 0){
                kanban.x = 500;
                kanban.frame ++;
                if(kanban.frame > 19){
                kanban.frame = 1;
                } 
            } 
            if (kanban.x > -kanban.width){
                if(end !== 0){
                    kanban.x -= SCR_SPD * (lv+1);
                }
            }
            
            if (kanban.x === player.x - 50){
                score++;
            }
            
            if (scr_m % 370 === 0 && ((score-1) % 10) !== 0 && scr_m !== 0){
                // ((kanban.x/(SCR_SPD * (lv+1))) - 500/(SCR_SPD * (lv+2))) > 100 
                hastur.x = 500;
            } 
            if (hastur.x > -hastur.width){
                hastur.x -= SCR_SPD * (lv+2);
            }
            
            if (bdg1.x <= -500) {
                    bdg1.x = 500;              
                }
            if (bdg2.x <= -500) {              
                bdg2.x = 500;                     
            }
            
            a++;
            if (player.y > 200){
                if(end !== 0){
                    player.frame ++;
                    if(player.frame > 3){
                    player.frame = 0;
                    }
                }
            }
            
            if (player.within(kanban,50)){
                gameover();
            }
            
            if (player.intersect(hastur)){
                gameover();
            }
            
            if (expl.y > 0){
                expl.frame ++;
                if(expl.frame > 3){
                    player.rotate(-90);
                    
                    game.end()
                }        
            } 
            
            
        });
        game.rootScene.ontouchstart = function(e){
            if (end === 0){
                bgm.play();
                info.x = -500;
                end = false;
            }
            status = 1;
            player.frame = 4;
            player.tl.moveBy(0, -120, 12,enchant.Easing.CUBIC_EASEOUT)
            .moveBy(0, 120, 12,enchant.Easing.CUBIC_EASEIN);
        }
        game.rootScene.ontouchend = function(e){
            player.tl.clear()
            player.tl.moveTo(30, 210, 6,enchant.Easing.CUBIC_EASEIN)
        }
    };
    game.start();
};