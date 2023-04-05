// Constants
const G = 0.001;

// Elements
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create objects
const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const sphereMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphereMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphereMaterial3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial1);
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial3);
sphere1.position.set(0, 0, 0);
sphere2.position.set(10, 0, 0);
sphere3.position.set(0, 10, 0);
scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);

// Animate spheres
function animate() {
  const time = Date.now() * 0.001;
  const distance12 = sphere1.position.distanceTo(sphere2.position);
  const distance13 = sphere1.position.distanceTo(sphere3.position);
  const distance23 = sphere2.position.distanceTo(sphere3.position);
  const acceleration1 = new THREE.Vector3(
    G * (sphere2.position.x - sphere1.position.x) / Math.pow(distance12, 3) + G * (sphere3.position.x - sphere1.position.x) / Math.pow(distance13, 3),
    G * (sphere2.position.y - sphere1.position.y) / Math.pow(distance12, 3) + G * (sphere3.position.y - sphere1.position.y) / Math.pow(distance13, 3),
    G * (sphere2.position.z - sphere1.position.z) / Math.pow(distance12, 3) + G * (sphere3.position.z - sphere1.position.z) / Math.pow(distance13, 3),
  );
  const acceleration2 = new THREE.Vector3(
    G * (sphere1.position.x - sphere2.position.x) / Math.pow(distance12, 3) + G * (sphere3.position.x - sphere2.position.x) / Math.pow(distance23, 3),
    G * (sphere1.position.y - sphere2.position.y) / Math.pow(distance12, 3) + G * (sphere3.position.y - sphere2.position.y) / Math.pow(distance23, 3),
    G * (sphere1.position.z - sphere2.position.z) / Math.pow(distance12, 3) + G * (sphere3.position.z - sphere2.position.z) / Math.pow(distance23, 3),
  );
  const acceleration3 = new THREE.Vector3(
    G * (sphere1.position.x - sphere3.position.x) / Math.pow(distance13, 3) + G * (sphere2.position.x - sphere3.position.x) / Math.pow(distance23, 3),
    G * (sphere1.position.y - sphere3.position.y) / Math.pow(distance13, 3) + G * (sphere2.position.y - sphere3.position.y) / Math.pow(distance23, 3),
    G * (sphere1.position.z - sphere3.position.z) / Math.pow(distance13, 3) + G * (sphere2.position.z - sphere3.position.z) / Math.pow(distance23, 3),
  );
  sphere1.velocity = sphere1.velocity || new THREE.Vector3();
  sphere2.velocity = sphere2.velocity || new THREE.Vector3();
  sphere3.velocity = sphere3.velocity || new THREE.Vector3();
  sphere1.velocity.add(acceleration1);
  sphere2.velocity.add(acceleration2);
  sphere3.velocity.add(acceleration3);
  sphere1.position.add(sphere1.velocity);
  sphere2.position.add(sphere2.velocity);
  sphere3.position.add(sphere3.velocity);
  camera.position.set(0, 0, 30);
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();