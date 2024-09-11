const tween = new TWEEN.Tween(particles.material)
    .to({ opacity: 0 }, 1000)
    .onComplete(() => {
        gameScene.remove(particles);
    })
    .start();

const tween2 = new TWEEN.Tween({ t: 0 })
    .to({ t: 1 }, 1000)
    .onUpdate(function() {
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positionAttribute.array[i3] += (Math.random() - 0.5) * 2;
            positionAttribute.array[i3 + 1] += (Math.random() - 0.5) * 2;
            positionAttribute.array[i3 + 2] += (Math.random() - 0.5) * 2;
        }
        positionAttribute.needsUpdate = true;
    })
    .start();

function gameLoop() {
    TWEEN.update();
    requestAnimationFrame(gameLoop);
}
