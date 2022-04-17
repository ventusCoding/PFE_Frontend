import { Mesh, Scene, Vector3 } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { World } from "./world";

export class Model {
  context: World;
  object: any | undefined;
  postion: Vector3;

  constructor(url: string, context: World, postion: Vector3) {
    this.context = context;
    this.postion = postion;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
    ); // use a full url path

    const loader = new GLTFLoader().setPath("./");
    loader.setDRACOLoader(dracoLoader);

    loader.load( url, 
    (gltf) => { 
        this.object = gltf.scene; 
        
        this.addToWorld()
        this.addToSence()        
    }, 
    (xhr) => { 
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded") }
        ,
    (error) => {  
        console.log(error);
        console.log("An error happened");
    });
  }

  addToWorld() {
    const children = this.object.children[0].children
    console.log(children.length);
    for ( let child of children ) {        
       //if ( child instanceof Mesh ) {
         console.log(child);
         
        this.context.rigidBodies.push(child)
       //}
    }
    this.context.models = [...this.context.models, this ];
  }

  addToSence() {
    this.context.scene.add(this.object)
  }


}
