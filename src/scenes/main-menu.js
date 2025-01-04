import { makeSonic } from "../entities/sonic";
import { k } from "../kaplayCtx";

export function MainMenu() {
  if (!k.getData("best-score")) k.setData("best-score", 0);

  k.onButtonPress("jump", () => k.go("game"));

  const bgWidth = 1280;
  const bgPiece = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.1)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platformWidth = 1680;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  k.add([
    k.text("SONIC RING RUN", { font: "mania", size: 150 }),
    k.pos(k.center().x, 200),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Pess space to start", { font: "mania", size: 70 }),
    k.pos(k.center().x, k.center().y - 200),
    k.anchor("center"),
  ]);

  makeSonic(k.vec2(100, 745));

  k.onUpdate(() => {
    if (bgPiece[1].pos.x < 0) {
      bgPiece[0].moveTo(bgPiece[1].pos.x + bgWidth * 2, 0);
      bgPiece.push(bgPiece.shift());
    }

    bgPiece[0].move(-100, 0);
    bgPiece[1].moveTo(bgPiece[0].pos.x + bgWidth * 2, 0);

    const gameSpeed = 4000;
    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
