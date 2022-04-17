import * as THREE from "three";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
import { Dolly } from "./dolly";
import { Marker } from "./utils";
import { World } from "./world";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
import {
    Constants as MotionControllerConstants,
    fetchProfile,
    MotionController,
  } from "@webxr-input-profiles/motion-controllers";

const DEFAULT_PROFILES_PATH = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles";
const DEFAULT_PROFILE = "generic-trigger";


export class Controller {
  squeezing = false;
  selecting = false;
  XRController;
  grip;
  traceRay;
  context: World;
  index: number;
  buttonStates = {}
  gamepadIndices:any

  constructor(dolly: Dolly, index: number) {
    this.context = dolly.context;
    this.index = index;
    const controllerModelFactory = new XRControllerModelFactory();
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1),
    ]);
    this.traceRay = new THREE.Line(geometry);
    this.traceRay.scale.setZ(2);
    //console.log(this.context);
    
    this.XRController = this.context.renderer.xr.getController(index);
    this.grip = this.context.renderer.xr.getControllerGrip(index);
    this.grip.add(
      controllerModelFactory.createControllerModel(this.XRController)
    );
    this.XRController.add(this.traceRay);
    dolly.dummy.add(this.XRController);
    dolly.dummy.add(this.grip);
    this.listen();
  }

  listen() {
    this.XRController.addEventListener("connected", this.onConnected.bind(this));
    this.XRController.addEventListener("selectstart", (event: any) => {
      this.selecting = true;
    });
    this.XRController.addEventListener("selectend", (event: any) => {
      this.selecting = false;
    });
    this.XRController.addEventListener("squeezestart", (event: any) => {
      this.squeezing = true;
      this.createPainter()
    });
    this.XRController.addEventListener("squeezeend", (event: any) => {
      this.squeezing = false;
      this.screenshot()
    });
  }

  screenshot() {
    const imgData = this.context.renderer.domElement.toDataURL("image/jpeg");
    console.log(imgData);
  }

  createPainter(){
    const painter: any = new TubePainter();
    const cursor = this.grip.getWorldPosition(this.context.origin);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    painter.mesh.material = material;
    cursor.z -= 2;
    painter.moveTo(cursor);
    this.context.scene.add(painter.mesh);
    //@ts-ignore
    this.context.markers[this.index].push(painter);
  }

  onConnected(event:any) {
    const info:any = {};
    //@ts-ignore  
    fetchProfile(event.data, DEFAULT_PROFILES_PATH, DEFAULT_PROFILE).then(
      ({ profile , assetPath } : any) => {
        info.name = profile.profileId;
        info.targetRayMode = event.data.targetRayMode;

        Object.entries(profile.layouts).forEach(([key, layout]: any) => {
          const components = {};
          Object.values(layout.components).forEach((component:any) => {
            //@ts-ignore  
            components[component.rootNodeName] = component.gamepadIndices;
          });
          info[key] = components;
        });

        this.createButtonStates(info.right);
      }
    );

  }

  createButtonStates(components:any) {
    const buttonStates = {};
    this.gamepadIndices = components;

    Object.keys(components).forEach((key) => {
      if (key.indexOf("touchpad") != -1 || key.indexOf("thumbstick") != -1) {
        //@ts-ignore  
        buttonStates[key] = { button: 0, xAxis: 0, yAxis: 0 };
      } else {
        //@ts-ignore  
        buttonStates[key] = 0;
      }
    });

    this.buttonStates = buttonStates;
  }

  updateGamepadState() {
    const session = this.context.renderer.xr.getSession();

    const inputSource = session?.inputSources[0];

    if (
      inputSource &&
      inputSource.gamepad &&
      this.gamepadIndices &&
      this.buttonStates
    ) {
      const gamepad = inputSource.gamepad;
      try {
        Object.entries(this.buttonStates).forEach(([key, value]) => {
          const buttonIndex = this.gamepadIndices[key].button;
          if (
            key.indexOf("touchpad") != -1 ||
            key.indexOf("thumbstick") != -1
          ) {
            const xAxisIndex = this.gamepadIndices[key].xAxis;
            const yAxisIndex = this.gamepadIndices[key].yAxis;
            //@ts-ignore  
            this.buttonStates[key].button = gamepad.buttons[buttonIndex].value;
            //@ts-ignore  
            this.buttonStates[key].xAxis = gamepad.axes[xAxisIndex].toFixed(2);
            //@ts-ignore  
            this.buttonStates[key].yAxis = gamepad.axes[yAxisIndex].toFixed(2);
            //@ts-ignore  
            this.context.dolly.onMove( -this.buttonStates[key].yAxis , -this.buttonStates[key].xAxis )
          } else {
            //@ts-ignore  
            this.buttonStates[key] = gamepad.buttons[buttonIndex].value;
          }
        });
      } catch (e) {
        console.warn(e);
      }
    }
  }



}
