import * as THREE from 'three';

import init from './init';
import Stats from 'stats.js';
import * as dat from 'lil-gui';

import './style.css';

const { sizes, camera, scene, canvas, controls, renderer } = init();

const parametres = {
	color: 'red',
};

camera.position.z = 3;

const gui = new dat.GUI({ closeFolders: true });

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: parametres.color,
	wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

const scaleFolder = gui.addFolder('Scale');
scaleFolder.add(mesh.scale, 'x').min(0).max(5).step(0.1).name('Box Scale x');
scaleFolder.add(mesh.scale, 'y').min(0).max(5).step(0.1).name('Box Scale y');
scaleFolder.add(mesh.scale, 'z').min(0).max(5).step(0.1).name('Box Scale z');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.addColor(parametres, 'color').onChange(() => {
	material.color.set(parametres.color);
});

scene.add(mesh);

const tick = () => {
	stats.begin();
	controls.update();
	renderer.render(scene, camera);
	stats.end();
	window.requestAnimationFrame(tick);
};
tick();

/** Базовые обпаботчики событий длы поддержки ресайза */
window.addEventListener('resize', () => {
	// Обновляем размеры
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Обновляем соотношение сторон камеры
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Обновляем renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
