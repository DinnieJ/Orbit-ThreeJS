const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const geometry = new THREE.SphereGeometry(1, 50, 25);

const texture = new THREE.TextureLoader().load("2.jpeg");
const material = new THREE.MeshBasicMaterial({
  side: THREE.FrontSide,
  wireframe: false,
  map: texture,
});

const sun = new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), material);
scene.add(sun);

const earthTexture = new THREE.TextureLoader().load("3.jpg");
const earthMaterial = new THREE.MeshPhongMaterial({
  side: THREE.FrontSide,
  map: earthTexture,
//   wireframe:  true,
//   color: 0xffff00
});

const earth = new THREE.Mesh(geometry, earthMaterial);
const earth2 = new THREE.Mesh(geometry, earthMaterial);

earth.position.set(-3, 0, -0.6);
earth.castShadow = true;
earth.receiveShadow = true;

earth2.position.set(-10, 0, 0);
earth2.castShadow = true;
earth2.receiveShadow = true;

scene.add(earth);
scene.add(earth2);

camera.position.z = 10;
camera.position.x = 2;
sun.position.x = 3;

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const light = new THREE.PointLight(0xffffff, 5, 0, 10);
light.position.set(3, 0, 0);
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.far = 20;
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var r = 5;
var theta = 0;
var dTheta =  Math.PI / 500;

const render = () => {
  earth.rotation.y += 0.01;
  earth2.rotation.y += 0.01;
  theta += dTheta;
  earth.position.x = r * Math.cos(theta);
  earth.position.z = r * Math.sin(theta);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onWindowResize);

render();
