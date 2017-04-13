var app = new PIXI.Application(500, 500, { antialias: true });
document.body.appendChild(app.view);

app.stage.interactive = true;


var graphics = new PIXI.Graphics();

var value = 100 ; 
var x = 250;
var y = 250; 

graphics.lineStyle(0);                       // orange 
graphics.beginFill(0xFFA500, 1);
graphics.drawCircle(x, y,value);
graphics.endFill();

graphics.lineStyle(0);                       // bg 
graphics.beginFill(0x191919, 1);
graphics.drawCircle(x, y,value-10);
graphics.endFill();

graphics.lineStyle(0);                      // yellow 
graphics.beginFill(0xFFFF00, 1);
graphics.drawCircle(x, y,value-20);
graphics.endFill();

graphics.lineStyle(0);                       // bg 
graphics.beginFill(0x191919, 1);
graphics.drawCircle(x, y,value-30);
graphics.endFill();

graphics.lineStyle(0);                       // cyan 
graphics.beginFill(0x00FFFF, 1);
graphics.drawCircle(x, y,value-40);
graphics.endFill();

// draw a circle
graphics.lineStyle(0);                      // bg 
graphics.beginFill(0x191919, 1);
graphics.drawCircle(x, y,value-60);
graphics.endFill();

app.stage.addChild(graphics);



// let's create a moving shape
var thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = 100/2;
thing.y = 100/2;

var count = 0;

// Just click on the stage to draw random lines
app.stage.on('pointertap', onClick);

function onClick() {

    // graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1);
    // graphics.moveTo(Math.random() * 800, Math.random() * 600);
    // graphics.bezierCurveTo(
    //    Math.random() * 800, Math.random() * 600,
    //    Math.random() * 800, Math.random() * 600,
    //    Math.random() * 800, Math.random() * 600
    // );

}

app.ticker.add(function() {

    count += 0.1;

    thing.clear();
    thing.lineStyle(10, 0xff0000, 1);
    thing.beginFill(0xffFF00, 0.5);

    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);
    thing.lineTo( 120 + Math.cos(count) * 20, -100 + Math.sin(count)* 20);
    thing.lineTo( 120 + Math.sin(count) * 20, 100 + Math.cos(count)* 20);
    thing.lineTo( -120 + Math.cos(count)* 20, 100 + Math.sin(count)* 20);
    thing.lineTo( -120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);

    thing.rotation = count * 0.1;

});
