let missile;
let score = 0;
let gameScene, gameCamera, gameRenderer, gamePlanets, gameMovingObjects;

function initGame(scene, camera, renderer, planets, movingObjects) {
    gameScene = scene;
    gameCamera = camera;
    gameRenderer = renderer;
    gamePlanets = planets;
    gameMovingObjects = movingObjects;

    missile = document.getElementById('missile');
    setupEventListeners();
}

function setupEventListeners() {
    document.addEventListener('mousemove', aimMissile);
    document.addEventListener('click', shootMissile);
}

function aimMissile(event) {
    const x = event.clientX;
    const y = event.clientY;
    const missileRect = missile.getBoundingClientRect();
    const missileX = missileRect.left + missileRect.width / 2;
    const missileY = missileRect.top + missileRect.height / 2;
    
    const angle = Math.atan2(y - missileY, x - missileX);
    const degrees = angle * (180 / Math.PI);
    
    missile.style.transform = `translateX(-50%) rotate(${degrees + 90}deg)`;
}

function shootMissile(event) {
    const missileRect = missile.getBoundingClientRect();
    
    const missileCenterX = missileRect.left + missileRect.width / 2;
    const missileCenterY = missileRect.top + missileRect.height / 2;

    const shot = document.createElement('div');
    shot.className = 'missile-shot';
    document.body.appendChild(shot);

    shot.style.left = `${missileCenterX - 5}px`;
    shot.style.bottom = `${window.innerHeight - missileCenterY}px`;

    const targetX = event.clientX;
    const targetY = event.clientY;
    const angle = Math.atan2(targetY - missileCenterY, targetX - missileCenterX);
    const speed = 30;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;

    function animate() {
        const currentBottom = parseFloat(shot.style.bottom);
        const currentLeft = parseFloat(shot.style.left);

        shot.style.bottom = `${currentBottom - dy}px`;
        shot.style.left = `${currentLeft + dx}px`;

        const shotX = currentLeft + 5;
        const shotY = window.innerHeight - currentBottom;

        if (currentBottom > 0 && currentBottom < window.innerHeight &&
            currentLeft > 0 && currentLeft < window.innerWidth) {
            
            checkCollisions(shot, shotX, shotY);
            requestAnimationFrame(animate);
        } else {
            shot.remove();
        }
    }

    animate();
}

function checkCollisions(shot, shotX, shotY) {
    const shotPosition = new THREE.Vector3(
        (shotX / window.innerWidth) * 2 - 1,
        -(shotY / window.innerHeight) * 2 + 1,
        0.5
    );
    shotPosition.unproject(gameCamera);
    const raycaster = new THREE.Raycaster(gameCamera.position, shotPosition.sub(gameCamera.position).normalize());
    
    // 检查与行星的碰撞
    const planetIntersects = raycaster.intersectObjects(gamePlanets);
    if (planetIntersects.length > 0) {
        handleCollision(planetIntersects[0].object, shot, shotX, shotY);
        return;
    }
    
    // 检查与飞向屏幕物体的碰撞
    const movingObjectIntersects = raycaster.intersectObjects(gameMovingObjects);
    if (movingObjectIntersects.length > 0) {
        handleCollision(movingObjectIntersects[0].object, shot, shotX, shotY);
        return;
    }
}

function handleCollision(object, shot, shotX, shotY) {
    console.log('击中物体:', object);
    
    // 如果击中的是月球(子对象),我们需要获取其父对象(地球)
    const targetObject = object.parent && object.parent.type === "Mesh" ? object.parent : object;
    
    if (!targetObject.userData.health) {
        targetObject.userData.health = targetObject.geometry.parameters.radius * 2;
    }
    
    targetObject.userData.health--;
    if (targetObject.userData.health <= 0) {
        if (targetObject.parent) {
            targetObject.parent.remove(targetObject);
        } else {
            gameScene.remove(targetObject);
        }
        if (gamePlanets.includes(targetObject)) {
            gamePlanets = gamePlanets.filter(p => p !== targetObject);
        } else if (gameMovingObjects.includes(targetObject)) {
            gameMovingObjects = gameMovingObjects.filter(o => o !== targetObject);
        }
        score += targetObject.geometry.parameters.radius * 10;
    }
    shot.remove();
    showExplosion(shotX, shotY);
    updateScore();
}

function showExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    document.body.appendChild(explosion);

    setTimeout(() => {
        explosion.remove();
    }, 1000);
}

// 辅助函数:获取元素的旋转角度
function getRotationAngle(element) {
    const transform = window.getComputedStyle(element).getPropertyValue('transform');
    const matrix = new DOMMatrix(transform);
    return Math.atan2(matrix.b, matrix.a) - Math.PI / 2;
}

// 辅助函数:检查元素是否超出屏幕
function isOutOfScreen(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom < 0 ||
        rect.right < 0 ||
        rect.left > window.innerWidth ||
        rect.top > window.innerHeight
    );
}

function createTargets() {
    // 创建行星和移动物体的代码
    // 这部分需要与您的Three.js场景集成
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    if (!scoreElement) {
        const newScoreElement = document.createElement('div');
        newScoreElement.id = 'score';
        newScoreElement.style.position = 'fixed';
        newScoreElement.style.bottom = '10px';
        newScoreElement.style.center = '10px';
        newScoreElement.style.color = 'white';
        newScoreElement.style.fontSize = '30px';
        newScoreElement.style.zIndex = '1000';
        document.body.appendChild(newScoreElement);
    }
    document.getElementById('score').textContent = `分数: ${score}`;
}

// 其他必要的游戏函数...