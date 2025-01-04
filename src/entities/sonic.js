import { k } from "../kaplayCtx";

export function makeSonic(pos) {
  const sonic = k.add([
    k.sprite("sonic", {
      anim: "run",
    }),
    k.pos(pos),
    k.scale(4),
    k.area(),
    k.anchor("center"),
    k.pos(pos),
    k.body({
      jumpForce: 1300,
    }),
    {
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.4 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);
  return sonic;
}
