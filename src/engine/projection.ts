import * as THREE from "three";
import { Body } from "./dolly";
import { World } from "./world";
import { Vector3 } from "three";

const createMesh = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  return cube;
};

export class Projection extends Body {
  id: string;
  commander: any;

  constructor(context: World, id: string, postion,rotation) {
    super(context, createMesh(), postion,rotation);
    this.id = id;
    this.commander = context.server;

    this.listen();
  }
  listen() {
    this.commander.on(`onUpdatePosition-${this.id}`, (data) => {
      console.log("data position : ", data.position);
      //this.quaternion = data.quaternion;
      this.rotation = data.rotation;
      this.position = data.position;
    });
    this.commander.on(`onUpdateController-${this.id}`, () => {});
  }

  render() {
    //this.dummy.quaternion.copy(this.quaternion);
    this.dummy.position.set(this.position.x, this.position.y, this.position.z);
    // this.dummy.rotateY(this.rotation.y);
    // this.dummy.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
  }
}
