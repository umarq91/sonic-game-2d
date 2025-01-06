import { makeBug } from "../entities/bug";
import { makeRing } from "../entities/ring";
import { makeSonic } from "../entities/sonic";
import { k } from "../kaplayCtx";

export function Maingame() {
  k.setGravity(3100);

  const bgWidth = 1280;
  const bgPiece = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(4), k.opacity(0.1)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgWidth, 0),
      k.scale(4),
      k.opacity(0.8),
    ]),
  ];

  const platformWidth = 1280;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  const sonic = makeSonic(k.vec2(100, 745));
  sonic.setControls();
  sonic.setEvents();
  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: 0.4 });
      k.play("hyper-ring", { volume: 0.4 });
      k.destroy(enemy);

      // extra jump
      sonic.play("jump");
      // sonic.jump();
      // TODO: scoring and stuff
      return;
    }

    k.play("hurt", { volume: 0.4 });
    // TODO :game over
    k.go("game-over");
  });

  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed = Math.min(300);
  });

  const spawnBUg = () => {
    const bug = makeBug(k.vec2(1950, 773));

    bug.onUpdate(() => {
      if (gameSpeed < 3000) {
        bug.move(-(gameSpeed + 300), 0);
        return;
      }

      bug.move(-gameSpeed, 0);
    });

    bug.onExitScreen(() => {
      if (bug.pos.x < 0) {
        k.destroy(bug);
      }
    });

    const waitTime = k.rand(0.5, 3);
    k.wait(waitTime, () => {
      spawnBUg();
    });
  };
  spawnBUg();

  const spawnRing = () => {
    // spawn ring here
    const ring = makeRing(k.vec2(1950, 755));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    });

    const waitTIme = k.rand(0.5,3);

    k.wait(waitTIme,spawnRing)
  };
  spawnRing();

  k.add([
    k.rect(1920, 3000),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
  ]);

  k.onUpdate(() => {
    bgPiece.forEach((piece) => piece.move(-gameSpeed * 0.1, 0));
    bgPiece.forEach((piece, index) => {
      if (piece.pos.x + bgWidth * 2 < 0) {
        piece.moveTo(
          bgPiece[(index + 1) % bgPiece.length].pos.x + bgWidth * 2,
          0
        );
      }
    });
  });

  k.onUpdate(() => {
    platforms.forEach((platform) => platform.move(-gameSpeed, 0));
    platforms.forEach((platform, index) => {
      if (platform.pos.x + platformWidth * 4 < 0) {
        platform.moveTo(
          platforms[(index + 1) % platforms.length].pos.x + platformWidth * 4,
          450
        );
      }
    });
  });
}
