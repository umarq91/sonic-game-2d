import { makeSonic } from "../entities/sonic";
import { k } from "../kaplayCtx";

export function Maingame() {
  k.setGravity(3100);
  const bgWidth = 1920;
  const bgPiece = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.1)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platformWidth = 1280;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  const sonic = makeSonic(k.vec2(100, 745));

  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed += 50;
  });

k.add([
  k.rect(1920,300),
  k.opacity(0),
  k.area(),
  k.pos(0,832),
  k.body({isStatic:true}),

])


  k.onUpdate(() => {
    if (bgPiece[1].pos.x < 0) {
      bgPiece[0].moveTo(bgPiece[1].pos.x + bgWidth * 2, 0);
      bgPiece.push(bgPiece.shift());
    }

    bgPiece[0].move(-100, 0);
    bgPiece[1].moveTo(bgPiece[0].pos.x + bgWidth * 2, 0);
    k.add([
      k.text(`${platforms[1].width}`, { font: "mania", size: 70 }),
      k.pos(k.center().x, k.center().y - 400),
      k.anchor("center"),
    ]);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
  });
}
