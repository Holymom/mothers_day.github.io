document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('who-input');
    const resultSection = document.getElementById('result-section');
    const greeting = document.getElementById('greeting');
    const message = document.getElementById('personalized-message');

    // Music Setup
    const bgMusic = document.getElementById('bg-music');
    const slideSound = document.getElementById('ribbon-slide-sound');
    const unlockSound = document.getElementById('ribbon-unlock-sound');
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = musicBtn.querySelector('i');
    let isMusicPlaying = false;

    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
        } else {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
            musicIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
        }
        isMusicPlaying = !isMusicPlaying;
    }

    musicBtn.addEventListener('click', toggleMusic);

    const messages = {
        'mamu': {
            title: "Happy Mother's Day, Mamu!",
            text: "To my wonderful mother. You gave me life and love, and I can never thank you enough for being my rock and making my days so bright.",
            images: ['mamu_1.png', 'mamu_2.png', 'mamu_3.png', 'mamu_4.png'],
            compliments: ["Love you Mom!", "My rock!", "Thank you for everything!", "You are the best!"],
            icon: 'fa-heart',
            theme: ''
        },
        'aama': {
            title: "Happy Mother's Day, Aama!",
            text: "Thank you for helping Mom raise me and for still being there for me today. I can always feel your pure intentions—and nobody cooks more deliciously than you!",
            images: ['aama_1.png', 'aama_2.png', 'aama_3.png', 'aama_4.png'],
            compliments: ["Delicious food!", "Purest intentions!", "Love you Aama!", "Thank you!"],
            icon: 'fa-bowl-food',
            theme: 'aama'
        },
        'sani': {
            title: "Happy Mother's Day, Sani!",
            text: "We may have fought like siblings, but you were such a huge part of my childhood! I'll never forget making you dance just so I would eat my food. Thank you for all the precious memories.",
            images: ['sani_1.png', 'sani_2.png', 'sani_3.png', 'sani_4.png'],
            compliments: ["Keep dancing!", "Miss our fights!", "My fun aunt!", "Love you Sani!"],
            icon: 'fa-heart',
            theme: 'sani'
        },
        'thulu': {
            title: "Happy Mother's Day, Thulu!",
            text: "You are the discipline of our family. Behind all the strictness and tough words, I know there is an ocean of pure love and right intentions. Thank you for guiding us.",
            images: ['thulu_1.png', 'thulu_2.png', 'thulu_3.png', 'thulu_4.png'],
            compliments: ["Strict but sweet!", "Right intentions!", "Our discipline!", "Love you Thulu!"],
            icon: 'fa-crown',
            theme: 'thulu'
        },
        'maiju': {
            title: "Happy Mother's Day, Maiju!",
            text: "Thank you for all the love and care you've given me, especially the sweet memories of you feeding me with your own hands. Wishing you a wonderful day.",
            images: ['maiju_1.png', 'maiju_2.png', 'maiju_3.png', 'maiju_4.png'],
            compliments: ["Thank you Maiju!", "So much love!", "Happy Mother's Day!", "You're the best!"],
            icon: 'fa-hand-holding-heart',
            theme: 'maiju'
        },
        'appu': {
            title: "Happy Mother's Day, Appu!",
            text: "My sister, my second mother. You get my humour, you read my mind, and you know me better than anyone. Thank you for always understanding me without me having to say a word.",
            images: ['appu_1.png', 'appu_2.png', 'appu_3.png', 'appu_4.png'],
            compliments: ["You get me!", "My second mom!", "Best sister ever!", "Love you Appu!"],
            icon: 'fa-star',
            theme: 'appu'
        },
        'mom': {
            title: "Happy Mother's Day, Mom!",
            text: "To my wonderful mother. You gave me life and love, and I can never thank you enough for being my rock and making my days so bright.",
            images: ['mamu_1.png', 'mamu_2.png', 'mamu_3.png', 'mamu_4.png'],
            compliments: ["Love you Mom!", "My rock!", "Thank you for everything!", "You are the best!"],
            icon: 'fa-heart',
            theme: ''
        },
        'mother': {
            title: "Happy Mother's Day!",
            text: "Cherishing the warmth and love you bring to everyone around you. You are truly appreciated today and every day.",
            images: ['aama_1.png', 'thulu_1.png', 'mamu_1.png', 'sani_1.png'],
            compliments: ["You are the best!", "Thank you for everything!", "So much love!", "Amazing!"],
            icon: 'fa-gift',
            theme: ''
        },
        'default': {
            title: "Happy Mother's Day!",
            text: "Celebrating the incredible woman you are. May your day be filled with love, laughter, and beautiful memories.",
            images: [],
            compliments: ["You are the best!", "Thank you for everything!", "So much love!", "Amazing!"],
            icon: 'fa-gift',
            theme: ''
        }
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const rawValue = input.value.toLowerCase().trim();

            let key = 'default';
            if (rawValue.includes('mamu')) key = 'mamu';
            else if (rawValue.includes('aama')) key = 'aama';
            else if (rawValue.includes('sani')) key = 'sani';
            else if (rawValue.includes('thulu')) key = 'thulu';
            else if (rawValue.includes('maiju')) key = 'maiju';
            else if (rawValue.includes('appu')) key = 'appu';
            else if (rawValue.includes('mom') || rawValue.includes('mother')) key = 'mom';

            if (rawValue === 'mother') key = 'mother';
            if (rawValue === '') return;

            // Attempt to start music if not playing (user interaction occurred)
            if (!isMusicPlaying) toggleMusic();

            // Apply theme dynamically
            document.body.setAttribute('data-theme', messages[key].theme);

            // Hide the input box and header
            const header = document.querySelector('header');
            const inputSection = document.querySelector('.input-section');
            header.style.transition = 'opacity 0.6s ease';
            inputSection.style.transition = 'opacity 0.6s ease';
            header.style.opacity = '0';
            inputSection.style.opacity = '0';
            header.style.pointerEvents = 'none';
            inputSection.style.pointerEvents = 'none';

            setTimeout(() => {
                header.style.display = 'none';
                inputSection.style.display = 'none';
            }, 600);

            input.blur();
            displayResult(messages[key]);
        }
    });

    function displayResult(content) {
        resultSection.classList.remove('active');
        document.querySelectorAll('.photo-container, .floating-text').forEach(el => el.remove());

        setTimeout(() => {
            greeting.textContent = content.title;
            message.textContent = content.text;
            resultSection.classList.add('active');

            // Set up ribbon unlock logic
            const ribbonLock项 = document.getElementById('ribbon-lock');
            const ribbonSlider = document.getElementById('ribbon-slider');
            const unlockedContent = document.getElementById('unlocked-content');
            
            // Reset state
            ribbonSlider.value = 0;
            ribbonSlider.style.background = `linear-gradient(to right, var(--ribbon-color) 0%, rgba(255, 255, 255, 0.5) 0%)`;
            ribbonSlider.style.setProperty('--thumb-rotate', '0deg');
            ribbonLock项.style.opacity = '1';
            ribbonLock项.style.transform = 'translateY(0)';
            ribbonLock项.style.pointerEvents = 'auto';
            unlockedContent.style.opacity = '0';
            unlockedContent.style.pointerEvents = 'none';

            let unlocked = false;
            let lastValue = 0;
            let lastTime = performance.now();
            let tiltTimeout;
            let isDragging = false;

            ribbonSlider.addEventListener('mousedown', () => isDragging = true);
            ribbonSlider.addEventListener('touchstart', () => isDragging = true);
            
            const stopSlideSound = () => {
                isDragging = false;
                slideSound.pause();
            };
            document.addEventListener('mouseup', stopSlideSound);
            document.addEventListener('touchend', stopSlideSound);

            ribbonSlider.addEventListener('input', () => {
                if (unlocked) return;
                
                if (isDragging && slideSound.paused) {
                    slideSound.play().catch(e => {}); 
                }
                
                const val = ribbonSlider.value;
                
                // 1. Progression bar color
                ribbonSlider.style.background = `linear-gradient(to right, var(--ribbon-color) ${val}%, rgba(255, 255, 255, 0.5) ${val}%)`;

                // 2. Velocity calculation for tilt effect
                const now = performance.now();
                const dt = now - lastTime || 1; 
                const dv = val - lastValue;
                const velocity = (dv / dt) * 100;
                
                let tilt = velocity * 4; 
                if (tilt > 50) tilt = 50;
                if (tilt < -50) tilt = -50;

                ribbonSlider.style.setProperty('--thumb-rotate', `${tilt}deg`);
                
                lastValue = val;
                lastTime = now;

                clearTimeout(tiltTimeout);
                tiltTimeout = setTimeout(() => {
                    ribbonSlider.style.setProperty('--thumb-rotate', `0deg`);
                }, 100);

                if (val > 95) {
                    ribbonSlider.value = 100;
                    ribbonSlider.style.background = `linear-gradient(to right, var(--ribbon-color) 100%, rgba(255, 255, 255, 0.5) 100%)`;
                    ribbonSlider.style.setProperty('--thumb-rotate', `0deg`);
                    unlocked = true;
                    
                    slideSound.pause();
                    unlockSound.play().catch(e => {});
                    
                    // Unlock visual changes
                    setTimeout(() => {
                        ribbonLock项.style.transform = 'scale(1.1) translateY(-50px)';
                        ribbonLock项.style.opacity = '0';
                        ribbonLock项.style.pointerEvents = 'none';
                        unlockedContent.style.opacity = '1';
                        unlockedContent.style.pointerEvents = 'auto';
                        
                        spawnCornerPhotos(content);
                    }, 200);
                }
            });
        }, 100);
    }

    function spawnCornerPhotos(content) {
        const corners = ['corner-top-left', 'corner-top-right', 'corner-bottom-left', 'corner-bottom-right'];
        const compliments = content.compliments || ["You are the best!", "Thank you!"];
        const iconClass = content.icon || 'fa-gift';

        if (content.images && content.images.length > 0) {
            corners.forEach((cornerClass, index) => {
                const imgPath = content.images[index % content.images.length];
                const container = document.createElement('div');
                container.className = `photo-container ${cornerClass}`;

                const animator = document.createElement('div');
                animator.className = `animator anim-${index % 4}`;

                const img = document.createElement('img');
                img.src = imgPath;
                img.className = 'real-photo';

                const wrapper = document.createElement('div');
                wrapper.className = 'gift-wrapper';

                const curtainLeft = document.createElement('div');
                curtainLeft.className = 'curtain curtain-left';
                const curtainRight = document.createElement('div');
                curtainRight.className = 'curtain curtain-right';

                const giftContent = document.createElement('div');
                giftContent.className = 'gift-content';
                giftContent.innerHTML = `<i class="fa-solid ${iconClass}"></i><span class="click-hint">Click me!</span>`;

                wrapper.appendChild(curtainLeft);
                wrapper.appendChild(curtainRight);
                wrapper.appendChild(giftContent);

                wrapper.addEventListener('click', () => {
                    if (wrapper.classList.contains('opened')) return;
                    wrapper.classList.add('opened');

                    const textElement = document.createElement('div');
                    textElement.className = 'floating-text';
                    textElement.textContent = compliments[index % compliments.length];
                    document.body.appendChild(textElement);

                    setTimeout(() => {
                        textElement.style.transform = 'translate(-50%, -50%) scale(1)';
                        textElement.style.opacity = '1';
                    }, 50);

                    setTimeout(() => {
                        const rect = container.getBoundingClientRect();
                        textElement.style.left = (rect.left + window.scrollX + rect.width / 2) + 'px';
                        textElement.style.top = (rect.top + window.scrollY + rect.height + 40) + 'px';
                        textElement.style.transform = 'translate(-50%, -50%) scale(0.5)';
                    }, 1800);
                });

                animator.appendChild(img);
                animator.appendChild(wrapper);
                container.appendChild(animator);
                document.body.appendChild(container);

                setTimeout(() => {
                    container.classList.add('active');
                }, 200 + index * 200);
            });
        }
    }
    // --- 3D Background Logic ---
    function init3DBackground() {
        const canvas = document.getElementById('bg-canvas');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create textures for shapes
        function createShapeTexture(type) {
            const size = 64;
            const canvasShape = document.createElement('canvas');
            canvasShape.width = size;
            canvasShape.height = size;
            const ctx = canvasShape.getContext('2d');

            ctx.fillStyle = 'white';
            ctx.beginPath();
            if (type === 'heart') {
                const x = size / 2, y = size / 2;
                const width = size * 0.6, height = size * 0.6;
                ctx.moveTo(x, y + height / 4);
                ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y - height / 4);
                ctx.bezierCurveTo(x - width / 2, y - height / 2, x, y - height / 2, x, y - height / 4);
                ctx.bezierCurveTo(x, y - height / 2, x + width / 2, y - height / 2, x + width / 2, y - height / 4);
                ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + height / 4);
            } else if (type === 'star') {
                const cx = size / 2, cy = size / 2, spikes = 5, outerRadius = size * 0.3, innerRadius = size * 0.15;
                let rot = Math.PI / 2 * 3, x = cx, y = cy, step = Math.PI / spikes;
                ctx.moveTo(cx, cy - outerRadius);
                for (let i = 0; i < spikes; i++) {
                    x = cx + Math.cos(rot) * outerRadius;
                    y = cy + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x, y);
                    rot += step;
                    x = cx + Math.cos(rot) * innerRadius;
                    y = cy + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y);
                    rot += step;
                }
                ctx.lineTo(cx, cy - outerRadius);
            } else {
                ctx.arc(size / 2, size / 2, size * 0.2, 0, Math.PI * 2);
            }
            ctx.fill();
            return new THREE.CanvasTexture(canvasShape);
        }

        const heartTexture = createShapeTexture('heart');
        const starTexture = createShapeTexture('star');

        const particleCount = 1500;
        const geometries = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];
        const textures = [heartTexture, starTexture];
        
        const sphereRadius = 3.5;
        const particles = [];
        const pMaterials = [];

        geometries.forEach((geo, gIdx) => {
            const pos = new Float32Array((particleCount / 2) * 3);
            const initialPos = new Float32Array((particleCount / 2) * 3);
            const sizes = new Float32Array(particleCount / 2);

            for (let i = 0; i < particleCount / 2; i++) {
                const i3 = i * 3;
                
                // Spherical coordinates
                const u = Math.random();
                const v = Math.random();
                const theta = 2 * Math.PI * u;
                const phi = Math.acos(2 * v - 1);
                
                const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
                const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
                const z = sphereRadius * Math.cos(phi);

                // Initial scattered position
                initialPos[i3] = (Math.random() - 0.5) * 20;
                initialPos[i3 + 1] = (Math.random() - 0.5) * 20;
                initialPos[i3 + 2] = (Math.random() - 0.5) * 20;

                // Current position starts scattered
                pos[i3] = initialPos[i3];
                pos[i3+1] = initialPos[i3+1];
                pos[i3+2] = initialPos[i3+2];

                sizes[i] = Math.random() * 0.2 + 0.1;

                particles.push({
                    target: new THREE.Vector3(x, y, z),
                    scatter: new THREE.Vector3(initialPos[i3], initialPos[i3 + 1], initialPos[i3 + 2]),
                    current: new THREE.Vector3(pos[i3], pos[i3+1], pos[i3+2]),
                    geoIdx: gIdx,
                    idx: i
                });
            }

            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            
            const material = new THREE.PointsMaterial({
                size: 0.15,
                map: textures[gIdx],
                transparent: true,
                alphaTest: 0.5,
                color: gIdx === 0 ? 0xf7cac9 : 0x92a8d1,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const points = new THREE.Points(geo, material);
            pMaterials[gIdx] = material; // Store for dynamic updates
            scene.add(points);
        });

        let mouseX = 0, mouseY = 0;
        let isHovering = false;
        let hoverTimeout;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            isHovering = true;
            
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                isHovering = false;
            }, 3000);
        });

        function animate() {
            requestAnimationFrame(animate);

            // Update colors from CSS variables
            const style = getComputedStyle(document.body);
            const color1 = style.getPropertyValue('--primary-color').trim();
            const color2 = style.getPropertyValue('--secondary-color').trim() || style.getPropertyValue('--ribbon-color').trim();
            
            if (pMaterials[0]) pMaterials[0].color.set(color1);
            if (pMaterials[1]) pMaterials[1].color.set(color2);

            const time = Date.now() * 0.001;

            particles.forEach(p => {
                const posAttr = geometries[p.geoIdx].attributes.position;
                
                // Idle drift calculation
                const driftX = Math.sin(time * 0.2 + p.idx) * 0.1;
                const driftY = Math.cos(time * 0.3 + p.idx) * 0.1;
                const driftZ = Math.sin(time * 0.5 + p.idx) * 0.1;

                let target;
                if (isHovering) {
                    // Form sphere and react to mouse
                    const rotSpeed = 0.5;
                    const cos = Math.cos(time * rotSpeed);
                    const sin = Math.sin(time * rotSpeed);
                    
                    const rotatedX = p.target.x * cos - p.target.z * sin;
                    const rotatedZ = p.target.x * sin + p.target.z * cos;
                    
                    const finalTarget = new THREE.Vector3(rotatedX, p.target.y, rotatedZ);
                    
                    // Tilt based on mouse
                    finalTarget.applyAxisAngle(new THREE.Vector3(0, 1, 0), mouseX * 0.8);
                    finalTarget.applyAxisAngle(new THREE.Vector3(1, 0, 0), -mouseY * 0.8);
                    
                    target = finalTarget;
                    p.current.lerp(target, 0.08);
                } else {
                    // Drift in scattered state
                    const scatteredTarget = p.scatter.clone().add(new THREE.Vector3(driftX, driftY, driftZ));
                    target = scatteredTarget;
                    p.current.lerp(target, 0.02);
                }

                posAttr.setXYZ(p.idx, p.current.x, p.current.y, p.current.z);
            });

            geometries.forEach(geo => geo.attributes.position.needsUpdate = true);

            // Rotate the entire scene slightly
            scene.rotation.y += 0.001;
            scene.rotation.x += 0.0005;

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    }

    init3DBackground();
});
