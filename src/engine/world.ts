import { Dolly } from "./dolly";
import { Model } from "./model";
import { Projection } from "./projection";
import * as THREE from "three";
import { io } from "socket.io-client";
import { VRBTN } from "./UI/VRBTN";
import { LoadingBar } from "./UI/loadingBar.js";
import { Vector3 } from "three";

export class World {
  server;
  worldId: string;
  models: Model[] = [];
  users: String[] = [];
  rigidBodies: any[] = [];
  projections: Projection[] = [];
  markers: /*: Marker[]*/ any[] = [[], []];
  dolly: Dolly;
  canvas;
  renderer;
  scene;
  clock = new THREE.Clock();
  up = new THREE.Vector3(0, 1, 0);
  origin = new THREE.Vector3();
  workingVec3 = new THREE.Vector3();
  workingQuaternion = new THREE.Quaternion();
  raycaster = new THREE.Raycaster();
  loading = new LoadingBar();

  constructor(canvas: any, socket: any, worldId: string) {
    this.worldId = worldId;
    this.server = socket;
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.scene = new THREE.Scene();
    const ambient = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 0.8);
    this.scene.add(ambient);
    this.dolly = new Dolly(this);
    this.server.emit("joinRoom",  {
      room: this.worldId,
      position: this.dolly.position,
      rotation: this.dolly.rotation,
    });

    this.initialize();
  }

  initialize() {
    this.socketGateway();
    const container = document.createElement("div");
    this.loading.visible = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.physicallyCorrectLights = true;
    container.appendChild(this.renderer.domElement);
    this.canvas.appendChild(container);
    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 50, 100);
    const ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(200, 200),
      new THREE.MeshPhongMaterial({
        color: 0x999999,
        depthWrite: false,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    //@ts-ignore
    grid.material.opacity = 0.2;
    //@ts-ignore
    grid.material.transparent = true;
    this.scene.add(grid);
    this.renderer.xr.enabled = true;
    const btn = new VRBTN(this.renderer, {
      vrStatus: this.dolly.buildControllers.bind(this.dolly),
    },this.canvas);
    this.renderer.setAnimationLoop(this.render.bind(this));
    this.playground();
    this.loading.visible = false;
  }

  socketGateway() {
    this.server.on("joinedRoom", (data) => {
      console.log(data.user.name, "joined room");
      if(!this.users.includes(data.user._id)){
        this.users.push(data.user._id);
        this.projections.push(
          new Projection(this, `${data.user._id}`, data.position, data.rotation)
        );        
      }
      this.server.emit("updatePlayerList", {
        room: this.worldId,
        position: this.dolly.position,
        rotation: this.dolly.rotation,
      });

    });

    this.server.on("playersList", (data) => {
      console.log(data.user.name + " in the room");
      // console.log(data);
      console.log();

      if(!this.users.includes(data.user._id)){
        this.users.push(data.user._id);
        this.projections.push(
          new Projection(this, `${data.user._id}`, data.position, data.rotation)
        );
        console.log(this.projections.length,"aaa");
        
      }
      
      console.log(this.users);
      console.log(this.projections);
      
      
    });

    this.server.on("leftRoom", (user) => {
      console.log(user.name, "left room");
      
      console.log('before');
      console.log(this.scene);
      console.log(this.projections);

      
      const index = this.users.indexOf(user._id);
      console.log('index', index);
      this.scene.remove(this.projections[index].dummy);
      
      //@ts-ignore
      this.projections[index].dummy.geometry.dispose();
      //@ts-ignore
      this.projections[index].dummy.material.dispose();
      this.projections[index].dummy = undefined; 

      

      console.log('after');
      console.log(this.scene);
      

      this.users.splice(index, 1) 
      // this.users = [...this.users.slice(index, 1)];
      // this.projections = [...this.projections.slice(index, 1)];
      this.projections.splice(index, 1);
    });
  }

  setEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
  }

  render() {
    this.dolly.render();
    this.renderer.render(this.scene, this.dolly.camera);
    this.projections.forEach((projection) => {
      projection.render();
    });
  }

  playground() {
    const house = new Model("scaled_down.gltf", this, new Vector3(0, 0, 0));
  }
}
