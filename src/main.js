import { k } from "./kaplayCtx";
import { MainMenu } from "./scenes/main-menu";
import { Maingame } from "./scenes/main-scene";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: true, speed: 100 },
  },  
});
k.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});
k.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});
k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");

k.scene("main-menu", MainMenu);

k.scene("game", Maingame);

k.scene("game-over", () => {
  k.add([
    k.text("GAME OVER", { font: "mania", size: 150 }),
    k.pos(k.center().x, 200),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Press space to restart", { font: "mania", size: 70 }),
    k.pos(k.center().x, k.center().y - 200),
    k.anchor("center"),
  ]);

  k.onButtonPress("jump", () => k.go("game"));
});



k.go("main-menu");
