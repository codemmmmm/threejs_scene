//import { VectorKeyframeTrack } from "./node_modules/three/build/three.js";
//const { AnimationClip, AnimationMixer } = require("three");


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );

//base
const cube_geometry = new THREE.BoxGeometry();
const cube_material = new THREE.MeshBasicMaterial( { color: 0xf9e4b7 } );
const cube = new THREE.Mesh( cube_geometry, cube_material );

//roof
const roof_geometry = new THREE.ConeGeometry(1, 1, 4);
const roof_material = new THREE.MeshBasicMaterial( { color: 0xA44A4A } )
const roof = new THREE.Mesh( roof_geometry, roof_material );
roof.position.y = 1;
roof.rotation.y = 0.8;

//sun
const sun_geometry = new THREE.SphereGeometry(0.5, 32, 32);
const sun_material = new THREE.MeshBasicMaterial({ color: 0xffff00 } )
const sun = new THREE.Mesh( sun_geometry, sun_material );
sun.position.z = -5;
sun.position.x = 3; // zur seite
sun.position.y = 4; // oben unten

//group them all
const house = new THREE.Group();
house.add( cube );
house.add( roof );
house.add( sun );
scene.add( house );

// camera.position.z = 5;
// camera.position.x = 3;

//animation
const times = [0.1, 2, 4, 6];
const values = [
  0, 0, 3,
  1, 0.3, 3.5, // (x, y, z) at t = 0
  0.9, 0.7, 3.5, // (x, y, z) at t = 3
  0, 0, 3,  // (x, y, z) at t = 6
];
const positionKF = new THREE.VectorKeyframeTrack('.position', times, values);

const clip = new THREE.AnimationClip('travel', -1, [positionKF]);
const mixer = new THREE.AnimationMixer(camera);
const clock = new THREE.Clock();
const action = mixer.clipAction(clip);
action.play();
//action.stop();

function animate() {
	requestAnimationFrame( animate );

    const delta = clock.getDelta();
    //camera.tick = (delta) => mixer.update(delta); ???
    mixer.update(delta);
    //camera.position.z += 0.01;
    //house.rotation.x += 0.005;
    //house.rotation.y += 0.005;
    //house.rotation.z -= 0.005;
	renderer.render( scene, camera );
}
animate();