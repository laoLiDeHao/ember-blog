export function onKeydowm(event, _this) {
  // eslint-disable-next-line
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      _this.moveForward = true;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      _this.moveLeft = true;
      break;

    case 'ArrowDown':
    case 'KeyS':
      _this.moveBackward = true;
      break;

    case 'ArrowRight':
    case 'KeyD':
      _this.moveRight = true;
      break;

    case 'Space':
      if (_this.canJump === true) _this.velocity.y += 350; //give a start speed for jump
      _this.canJump = false;
      break;

  }

}
export function onKeyup(event, _this) {
  // eslint-disable-next-line
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      _this.moveForward = false;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      _this.moveLeft = false;
      break;

    case 'ArrowDown':
    case 'KeyS':
      _this.moveBackward = false;
      break;

    case 'ArrowRight':
    case 'KeyD':
      _this.moveRight = false;
      break;

  }
}