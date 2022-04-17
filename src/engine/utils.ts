import * as THREE from "three";
import { Vector3 } from "three";

export class Marker  { 

    id: string = ''
    color 
    material
    points: Vector3[] = []
    geometry = new THREE.BufferGeometry()
    line

    constructor( color = new THREE.Color('red') , points = [] ) {
        this.color = color
        this.points = points
        this.material = new THREE.LineBasicMaterial({ color: this.color , linewidth: 2 });
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points)
        this.line = new THREE.Line( this.geometry, this.material );
    }

    getLine() {
        this.geometry.setFromPoints(this.points)
        return this.line 
    }

    addPoint( v3: Vector3 ) {
        this.points.push(v3)
        //.geometry.setFromPoints(this.points)
        //this.line.geometry = this.geometry
    }

    setPoints( points: Vector3[] ) {
        this.line.geometry.attributes.position.needsUpdate = true; // required after the first render
        this.points = points
        this.geometry.setFromPoints(this.points)
        this.line.geometry = this.geometry
        this.line.geometry.setDrawRange( 0, 500 );
    }

}