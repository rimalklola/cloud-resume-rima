// Three.js background animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Create animated background
const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
const material = new THREE.MeshNormalMaterial({
    wireframe: true,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Animate vertices
    const time = Date.now() * 0.001;
    for(let i = 0; i < plane.geometry.vertices.length; i++) {
        const vertex = plane.geometry.vertices[i];
        const wave = Math.sin(time + vertex.x * 0.5) * 0.2;
        vertex.z = wave;
    }
    plane.geometry.verticesNeedUpdate = true;
    plane.rotation.x = time * 0.2;
    
    renderer.render(scene, camera);
}
animate();

// Scroll animations
const scrollElements = document.querySelectorAll("[data-scroll]");

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) * (1 - offset)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("visible");
};

const hideScrollElement = (element) => {
    element.classList.remove("visible");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 0.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initial check
handleScrollAnimation(); 