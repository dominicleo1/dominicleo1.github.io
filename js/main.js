// 创建Three.js场景、相机和渲染器
let scene, camera, renderer;
let planets = [];
let starField, nebula;
let movingObjects = [];
let twinklingStars; // 新增：用于存储闪烁的星星

const textureLoader = new THREE.TextureLoader();

// 预加载所有纹理
const textures = {
    Mercury: textureLoader.load('images/mercury.jpg'),
    Venus: textureLoader.load('images/venus.jpg'),
    Earth: textureLoader.load('images/earth.jpg'),
    Mars: textureLoader.load('images/mars.jpg'),
    Jupiter: textureLoader.load('images/jupiter.jpg'),
    Saturn: textureLoader.load('images/saturn.jpg'),
    Moon: textureLoader.load('images/moon.jpg')  // 添加月球纹理
};

// 在文件顶部添加一个新的全局变量
let currentZoom = 1;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
    renderer.setPixelRatio(1); // 固定像素比
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = true; // 添加这行
    
    // 添加星空背景
    starField = createStarfield();
    scene.add(starField);
    
    // 添加彩色星云
    nebula = createNebula();
    scene.add(nebula);

    // 添加闪烁的星星
    twinklingStars = createTwinklingStars();
    scene.add(twinklingStars);

    // 添加飞向屏幕的物体
    createMovingObjects();

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // 添加平行光(模拟太阳光)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // 设置相机位置
    camera.position.z = 300;
    camera.position.y = 50;
    camera.lookAt(scene.position);
}

function createStarfield() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 2,
        sizeAttenuation: true,
        map: createCircleTexture('#FFFFFF', 256),
        transparent: true,
        vertexColors: true
    });
    
    const starsVertices = [];
    const starsColors = [];
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starsVertices.push(x, y, z);
        
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        starsColors.push(r, g, b);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    stars.renderOrder = -2; // 设置星空背景的渲染顺序
    return stars;
}

function createNebula() {
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaMaterial = new THREE.PointsMaterial({
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: createCircleTexture('#FFFFFF', 256),
        vertexColors: true
    });
    
    const nebulaVertices = [];
    const nebulaColors = [];
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(500);
        const y = THREE.MathUtils.randFloatSpread(500);
        const z = THREE.MathUtils.randFloatSpread(500);
        nebulaVertices.push(x, y, z);
        
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        nebulaColors.push(r, g, b);
    }
    
    nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
    nebulaGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nebulaColors, 3));
    
    const nebulaPoints = new THREE.Points(nebulaGeometry, nebulaMaterial);
    nebulaPoints.renderOrder = -1; // 设置星云的渲染顺序
    return nebulaPoints;
}

function createTwinklingStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 2,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: createCircleTexture('#FFFFFF', 256),
    });

    const starsVertices = [];
    const starsOpacities = [];
    const starsSizes = [];
    for (let i = 0; i < 5000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starsVertices.push(x, y, z);
        starsOpacities.push(Math.random());
        starsSizes.push(Math.random() * 2 + 0.2); // 随机大小，范围1-3
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('opacity', new THREE.Float32BufferAttribute(starsOpacities, 1));

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    stars.renderOrder = -3; // 确保闪烁的星星在最后面
    return stars;
}

function createMovingObjects() {
    const objectTypes = ['planet', 'asteroid'];
    for (let i = 0; i < 20; i++) {
        const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
        const object = createMovingObject(type);
        scene.add(object);
        movingObjects.push(object);
    }
}

function createMovingObject(type) {
    let geometry, material;
    let radius; // 在这里声明radius变量

    if (type === 'planet') {
        radius = Math.random() * 10 + 0.5;
        geometry = new THREE.SphereGeometry(radius, 32, 32);
        material = new THREE.MeshStandardMaterial({
            map: textures.Moon,  // 使用月球纹理
            metalness: 0.4,
            roughness: 0.7,
            transparent: true,
            opacity: 1
        });
    } else {
        radius = Math.random() * 0.5 + 0.2;
        geometry = new THREE.SphereGeometry(radius, 8, 8);
        material = new THREE.MeshStandardMaterial({
            map: textures.Moon,  // 使用月球纹理
            metalness: 0.4,
            roughness: 0.7,
            transparent: true,
            opacity: 0.8
        });
    }
    const object = new THREE.Mesh(geometry, material);
    object.position.set(
        THREE.MathUtils.randFloatSpread(500),
        THREE.MathUtils.randFloatSpread(500),
        Math.random() * -500 - 500
    );
    // 调整飞向屏幕物体的速度
    object.userData = {
        velocity: new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(0.4),
            THREE.MathUtils.randFloatSpread(0.4),
            Math.random() * 2 + 1
        ),
        rotationSpeed: new THREE.Vector3(
            Math.random() * 0.01,
            Math.random() * 0.01,
            Math.random() * 0.01,
        ),
        health: radius * 1 // 生命值与半径成正比
    };
    object.renderOrder = 3; // 设置飞向屏幕物体的渲染顺序，使其在行星之上
    return object;
}

function createCircleTexture(color, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

function createSolarSystem() {
    const sunGeometry = new THREE.SphereGeometry(0, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00}); // 太阳保持黄色
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.renderOrder = 2; // 设置太阳的渲染顺序
    scene.add(sun);
    planets.push(sun);

    const planetData = [
        {name: "Mercury", radius: 5, distance: 120, speed: 0.0001, rotationSpeed: 0.005},
        {name: "Venus", radius: 9.5, distance: 130, speed: 0.00007, rotationSpeed: 0.002},
        {name: "Earth", radius: 9.9, distance: 150, speed: 0.00006, rotationSpeed: 0.01},
        {name: "Mars", radius: 6.2, distance: 180, speed: 0.00005, rotationSpeed: 0.009},
        {name: "Jupiter", radius: 28, distance: 220, speed: 0.00002, rotationSpeed: 0.02},
        {name: "Saturn", radius: 20, distance: 450, speed: 0.00002, rotationSpeed: 0.018}
    ];

    // 减小行星的距离和速度
    planetData.forEach(data => {
        data.distance *= 1.5;  // 减小距离
        data.speed *= 1;     // 减小速度
    });

    planetData.forEach((data) => {
        const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({
            map: textures[data.name],
            metalness: 0.4,
            roughness: 0.7
        });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.x = data.distance;
        planet.userData = {
            distance: data.distance, 
            speed: data.speed,
            rotationSpeed: data.rotationSpeed,
            health: data.radius * 10 // 生命值与半径成正比
        };
        planet.renderOrder = 2;
        scene.add(planet);
        planets.push(planet);

        // 如果是土星,添加环
        if (data.name === "Saturn") {
            const ringGeometry = new THREE.RingGeometry(data.radius * 1.2, data.radius * 1.8, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.renderOrder = 2; // 设置土星环的渲染顺序
            planet.add(ring);
        }

        // 如果是地球，添加月球
        if (data.name === "Earth") {
            const moonRadius = 2;
            const moonDistance = 20;
            const moonGeometry = new THREE.SphereGeometry(moonRadius, 32, 32);
            const moonMaterial = new THREE.MeshStandardMaterial({
                map: textures.Moon,
                metalness: 0.4,
                roughness: 0.7
            });
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.x = moonDistance;
            moon.userData = {
                distance: moonDistance,
                speed: 0.0002,
                rotationSpeed: 0.005,
                health: moonRadius * 10 // 生命值与半径成正比
            };
            moon.renderOrder = 2;
            planet.add(moon);  // 将月球添加为地球的子对象
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    updateSceneSize(); // 添加这行

    // 更新行星位置和自转
    planets.forEach((planet, index) => {
        if (index === 0) return; // 跳过太阳
        const angle = Date.now() * planet.userData.speed * 0.5;
        const distance = planet.userData.distance;
        planet.position.x = Math.cos(angle) * distance;
        planet.position.z = Math.sin(angle) * distance;
        
        // 添加自转
        planet.rotation.y += planet.userData.rotationSpeed;

        // 如果是地球，更新月球位置和自转
        if (planet.children.length > 0 && planet.children[0].userData.distance) {
            const moon = planet.children[0];
            const moonAngle = Date.now() * moon.userData.speed;
            const moonDistance = moon.userData.distance;
            moon.position.x = Math.cos(moonAngle) * moonDistance;
            moon.position.z = Math.sin(moonAngle) * moonDistance;
            moon.rotation.y += moon.userData.rotationSpeed;
        }
    });

    // 移动所有粒子
    const speed = 0.05; // 调整这个值来改变移动速度
    
    // 移动星空背景
    const starPositions = starField.geometry.attributes.position.array;
    for (let i = 0; i < starPositions.length; i += 3) {
        starPositions[i + 2] += speed;
        if (starPositions[i + 2] > 1000) {
            starPositions[i + 2] = -1000;
        }
    }
    starField.geometry.attributes.position.needsUpdate = true;

    // 移动星云
    const nebulaPositions = nebula.geometry.attributes.position.array;
    for (let i = 0; i < nebulaPositions.length; i += 3) {
        nebulaPositions[i + 2] += speed * 0.3; // 星云移动速度更慢
        if (nebulaPositions[i + 2] > 1000) {
            nebulaPositions[i + 2] = -1000;
        }
    }
    nebula.geometry.attributes.position.needsUpdate = true;

    // 移动飞向屏幕的物体
    movingObjects.forEach(object => {
        object.position.add(object.userData.velocity);
        if (isOutOfView(object, camera)) {
            object.position.set(
                THREE.MathUtils.randFloatSpread(400),
                THREE.MathUtils.randFloatSpread(400),
                Math.random() * -500 - 500
            );
            object.userData.velocity.set(
                THREE.MathUtils.randFloatSpread(0.4),
                THREE.MathUtils.randFloatSpread(0.4),
                Math.random() * 2 + 0.3
            );
        }
    });

    // 更新闪烁的星星
    updateTwinklingStars();

    renderer.render(scene, camera);
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    if (typeof THREE === 'undefined') {
        console.error('Three.js 未加载，请检查 three.min.js 文件路径是否正确');
        return;
    }

    initThree();
    createSolarSystem();
    animate();
    onWindowResize();  // 确保在页面加载后调整二维码大小

    // 在 Three.js 场景完全加载后初始化游戏功能
    setTimeout(() => {
        initializeGame();
    }, 100);
});

// 修改onWindowResize函数
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (camera) {  // 添加这个检查
        // 更新相机宽高比，但不改变渲染器大小
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // 计算新的缩放级别
    const newZoom = window.devicePixelRatio;
    if (newZoom !== currentZoom) {
        currentZoom = newZoom;
        updateFontSize();
    }

    // 调整二维码大小的代码保持不变
    const minDimension = Math.min(width, height);
    const newSize = Math.max(40, Math.min(100, minDimension * 0.1));
    resizeQRCode(newSize);
}

// 添加新的updateFontSize函数
function updateFontSize() {
    const root = document.documentElement;
    root.style.setProperty('--font-size-multiplier', 1 / currentZoom);
}

// 在初始化时调用updateFontSize
window.addEventListener('load', () => {
    // ... 其他初始化代码 ...
    updateFontSize();
});

// 初始化时调用一次以设置初始大小
onWindowResize();

// 添加新的函数来更新场景大小，但不改变渲染器大小
function updateSceneSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // 更新场景中物体的位置或大小（如果需要）
    // 例如：
    // starField.scale.set(width / 1000, height / 1000, 1);
    // nebula.scale.set(width / 1000, height / 1000, 1);
}

// 修改window的resize事件监听器
window.addEventListener('resize', () => {
    onWindowResize();
    updateSceneSize();
});

// 添加这个函数来检查物体是否在视野外
function isOutOfView(object, camera) {
    const frustum = new THREE.Frustum();
    const cameraViewProjectionMatrix = new THREE.Matrix4();
    camera.updateMatrixWorld(); // 确保相机矩阵是最新的
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    return !frustum.containsPoint(object.position);
}

// 更新闪烁的星星
function updateTwinklingStars() {
    const time = Date.now() * 0.05;
    const opacities = twinklingStars.geometry.attributes.opacity;
    for (let i = 0; i < opacities.count; i++) {
        const opacity = 0.3 + 0.7 * Math.sin(time + i * 0.5);
        opacities.setX(i, opacity);
    }
    opacities.needsUpdate = true;
}

function resizeQRCode(size) {
    const qrCode = document.getElementById('qrCode');
    if (qrCode) {
        qrCode.style.width = size + 'px';
        qrCode.style.height = size + 'px';
    }
}

// 添加这个函数来获取3D空间中的点
function get3DPointFromScreen(x, y) {
    const vector = new THREE.Vector3(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1,
        0.5
    );
    vector.unproject(camera);
    return vector;
}

// 暴露一个函数来检查子弹是否击中行星
window.checkPlanetCollision = function(screenX, screenY) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (screenX / window.innerWidth) * 2 - 1,
        -(screenY / window.innerHeight) * 2 + 1
    );
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);
    
    if (intersects.length > 0) {
        console.log('击中行星:', intersects[0].object);
        // 这里可以添加击中行星后的效果,比如爆炸或消失
    }
};

// 添加这个函数来初始化游戏
function initializeGame() {
    if (typeof initGame === 'function') {
        initGame(scene, camera, renderer, planets, movingObjects);
    } else {
        console.error('initGame function not found. Make sure game.js is loaded correctly.');
    }
}

 