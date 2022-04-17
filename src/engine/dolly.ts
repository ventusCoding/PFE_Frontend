import * as THREE from "three";
import { Vector3 } from "three";
import { Controller } from "./controller";
import { World } from "./world";
import { JoyStick } from "./Toon3D.js";

export class Body {
  context: World;
  dummy = new THREE.Object3D();
  player_height = 2.5;
  position;
  rotation;

  constructor(
    context: any,
    dummy: any = new THREE.Object3D(),
    postion = new THREE.Vector3(0, 1.6, 0),
    rotation = new THREE.Vector3(0, 0, 0)
  ) {
    this.context = context;
    this.dummy = dummy;
    this.position = postion;
    this.rotation = rotation;
    this.dummy.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.dummy.position.set(this.position.x, this.position.y, this.position.z);
    this.context.scene.add(this.dummy);
  }
}

export class Dolly extends Body {
  rightController: Controller | undefined;
  leftController: Controller | undefined;
  joyStick: any = undefined;
  camera;
  walk: number = 0;
  turn: number = 0;
  raycaster;

  constructor(context: World) {
    super(context);
    this.raycaster = new THREE.Raycaster();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01,
      500
    );
    this.camera.position.set(
      this.position.x,
      this.position.y + this.player_height,
      this.position.z
    );
    this.dummy.add(this.camera);
    //this.context.scene.add(this.camera)
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.context.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    console.log(this.context.server.id);
    
    const dt = this.context.clock.getDelta();
    if (this.walk != 0) {
      this.move(dt);
    }
    this.rightController?.updateGamepadState();
    this.leftController?.updateGamepadState();
    if (this.rightController) {
      this.dummy.translateX(this.turn * -dt);
    }
    if (this.joyStick) {
      this.dummy.rotateY(this.turn * -dt);
    }
    if (this.rightController?.squeezing) {
      this.mark(this.rightController);
    }
    if (this.leftController?.squeezing) {
      this.mark(this.leftController);
    }
    this.context.server.emit("updatePosition", {
      position: this.dummy.position,
      room: this.context.worldId,
      rotation:  this.dummy.rotation,
    });
  }

  onMove(forward: any, turn: any) {
    this.walk = forward;
    this.turn = turn;
  }

  move(dt: number) {
    const speed = 10;
    let pos = this.dummy.position.clone();
    pos.y += 1;

    let dir = new THREE.Vector3();

    //Store original dolly rotation
    const quaternion = this.dummy.quaternion.clone();

    if (this.joyStick === undefined) {
      //Get rotation for movement from the headset pose
      this.dummy.quaternion.copy(
        this.camera.getWorldQuaternion(this.context.workingQuaternion)
      );
      this.dummy.getWorldDirection(dir);
      if (this.walk > 0) {
        dir.negate();
      } else {
        dt = -dt;
      }
    } else {
      this.dummy.getWorldDirection(dir);
      if (this.walk > 0) {
        dir.negate();
      } else {
        dt = -dt;
      }
    }

    //this.dummy.translateZ(-dt * speed);
    //pos = this.dummy.getWorldPosition(this.context.origin);
    this.collision(dir, pos, speed, dt);
    //Restore the original rotation
    this.dummy.quaternion.copy(quaternion);
    
  }

  buildControllers(available: any) {
    if (available) {
      this.rightController = new Controller(this, 1);
      this.leftController = new Controller(this, 0);
    } else {
      this.joyStick = new JoyStick({
        onMove: this.onMove.bind(this),
      }, this.context.canvas);
    }
  }

  mark(controller: Controller) {
    const marker =
      this.context.markers[controller.index][
        this.context.markers[controller.index].length - 1
      ];
    const point = controller.grip.getWorldPosition(this.context.origin);
    point.z -= 2;
    marker.lineTo(point);
    marker.update();
  }

  collision(dir: Vector3, pos: Vector3, speed: number, dt: any) {
    const wallLimit = 1.3;

    this.raycaster.set(pos, dir);

    let blocked = false;

    let intersect = this.raycaster.intersectObjects(this.context.rigidBodies);
    if (intersect.length > 0) {
      console.log(intersect[0]);
      if (intersect[0].distance < wallLimit) blocked = true;
    }

    if (!blocked) {
      this.dummy.translateZ(-dt * speed);
      pos = this.dummy.getWorldPosition(this.context.origin);
    }

    //wall check
    dir.set(-1, 0, 0);
    dir.applyMatrix4(this.dummy.matrix);
    dir.normalize();
    this.raycaster.set(pos, dir);
    intersect = this.raycaster.intersectObjects(this.context.rigidBodies);
    if (intersect.length > 0) {
      if (intersect[0].distance < wallLimit) {
        this.dummy.translateX(wallLimit - intersect[0].distance);
      }
    }
    dir.set(1, 0, 0);
    dir.applyMatrix4(this.dummy.matrix);
    dir.normalize();
    this.raycaster.set(pos, dir);
    intersect = this.raycaster.intersectObjects(this.context.rigidBodies);
    if (intersect.length > 0) {
      if (intersect[0].distance < wallLimit) {
        this.dummy.translateX(intersect[0].distance - wallLimit);
      }
    }

    dir.set(0, -1, 0);
    pos.y += 1.5; // probably more !!!!!
    this.raycaster.set(pos, dir);
    intersect = this.raycaster.intersectObjects(this.context.rigidBodies);
    if (intersect.length > 0) {
      this.dummy.position.copy(intersect[0].point);
    }

    return blocked;
  }
}
