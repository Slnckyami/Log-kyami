// Arkaplan için Three.js kurulumu

let scene, camera, renderer;

let particles = [];

let clock = new THREE.Clock();

// DOM yüklendiğinde çalış

document.addEventListener('DOMContentLoaded', () => {

    initThreeJS();

    animate();

    setupFormInteractions();

    setupLogoInteractions();

    setupRegistrationForm();

});

// Three.js başlatma

function initThreeJS() {

    // Sahne oluştur

    scene = new THREE.Scene();

    

    // Kamera ayarla

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 50;

    

    // Renderer ayarla

    renderer = new THREE.WebGLRenderer({ 

        canvas: document.getElementById('bg-canvas'),

        antialias: true,

        alpha: true

    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    

    // Işık ekle

    const ambientLight = new THREE.AmbientLight(0x404040);

    scene.add(ambientLight);

    

    const pointLight = new THREE.PointLight(0x00f7ff, 2, 300);

    pointLight.position.set(0, 0, 25);

    scene.add(pointLight);

    

    // Parçacıklar ekle

    addParticles();

    

    // Ekran boyutu değiştiğinde güncelle

    window.addEventListener('resize', onWindowResize);

}

// Parçacıklar ekle

function addParticles() {

    // Parçacık materyali

    const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8);

    

    const createParticle = (color) => {

        const material = new THREE.MeshPhongMaterial({

            color: color,

            transparent: true,

            opacity: Math.random() * 0.5 + 0.2,

            emissive: color,

            emissiveIntensity: 0.5

        });

        

        const mesh = new THREE.Mesh(particleGeometry, material);

        

        // Rastgele konum

        mesh.position.x = Math.random() * 100 - 50;

        mesh.position.y = Math.random() * 100 - 50;

        mesh.position.z = Math.random() * 50 - 25;

        

        // Rastgele hareket

        mesh.velocity = {

            x: (Math.random() - 0.5) * 0.05,

            y: (Math.random() - 0.5) * 0.05,

            z: (Math.random() - 0.5) * 0.02

        };

        

        mesh.baseScale = Math.random() * 0.8 + 0.5;

        mesh.scale.set(mesh.baseScale, mesh.baseScale, mesh.baseScale);

        

        scene.add(mesh);

        particles.push(mesh);

    };

    

    // Farklı renklerde parçacıklar

    const colors = [0x00f7ff, 0x9c27b0, 0x00ff9d];

    

    // 150 parçacık oluştur

    for (let i = 0; i < 150; i++) {

        const colorIndex = Math.floor(Math.random() * colors.length);

        createParticle(colors[colorIndex]);

    }

}

// Parçacıkları güncelle

function updateParticles() {

    const delta = clock.getDelta();

    

    particles.forEach(particle => {

        // Hareket

        particle.position.x += particle.velocity.x;

        particle.position.y += particle.velocity.y;

        particle.position.z += particle.velocity.z;

        

        // Pulsing efekti

        const pulseScale = particle.baseScale + Math.sin(Date.now() * 0.001 + Math.random() * 10) * 0.1;

        particle.scale.set(pulseScale, pulseScale, pulseScale);

        

        // Sınırlar dışına çıktığında geri döndür

        if (Math.abs(particle.position.x) > 50) {

            particle.velocity.x *= -1;

        }

        if (Math.abs(particle.position.y) > 50) {

            particle.velocity.y *= -1;

        }

        if (Math.abs(particle.position.z) > 25) {

            particle.velocity.z *= -1;

        }

    });

}

// Ekran boyutunu ayarla

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

// Animasyon döngüsü

function animate() {

    requestAnimationFrame(animate);

    

    // Kamera hafif hareket

    camera.position.x = Math.sin(Date.now() * 0.0002) * 3;

    camera.position.y = Math.cos(Date.now() * 0.0001) * 2;

    camera.lookAt(scene.position);

    

    // Parçacıkları güncelle

    updateParticles();

    

    // Render

    renderer.render(scene, camera);

}

// Form etkileşimleri

function setupFormInteractions() {

    const form = document.getElementById('https://kyamiii.raflymods.web.id');

    const inputs = document.querySelectorAll('input');

    const loginButton = document.querySelector('.login-button');

    

    // Input focus efektleri

    inputs.forEach(input => {

        input.addEventListener('focus', function() {

            this.parentElement.style.transform = 'translateZ(20px)';

        });

        

        input.addEventListener('blur', function() {

            this.parentElement.style.transform = 'translateZ(0)';

        });

    });

    

    // Buton hover efekti

    loginButton.addEventListener('mouseenter', function() {

        const buttonEffect = this.querySelector('.button-effect');

        buttonEffect.style.opacity = '1';

    });

    

    loginButton.addEventListener('mouseleave', function() {

        const buttonEffect = this.querySelector('.button-effect');

        buttonEffect.style.opacity = '0';

    });

    

    // Form gönderim efekti

    form.addEventListener('submit', function(e) {

        e.preventDefault();

        

        // Giriş animasyonu

        const username = document.getElementById('username').value;

        loginButton.innerHTML = `<span>Hoş Geldin, ${username}!</span>`;

        loginButton.disabled = true;

        

        document.querySelectorAll('.input-group').forEach(group => {

            group.style.opacity = '0.5';

            group.style.pointerEvents = 'none';

        });

        

        // Sayfayı yeniden yüklemeden önce geçiş animasyonu

        setTimeout(() => {

            // Geçiş efekti

            const transition = document.createElement('div');

            transition.style.position = 'fixed';

            transition.style.top = '0';

            transition.style.left = '0';

            transition.style.width = '100%';

            transition.style.height = '100%';

            transition.style.backgroundColor = 'var(--primary-color)';

            transition.style.opacity = '0';

            transition.style.zIndex = '9999';

            transition.style.transition = 'opacity 1s ease';

            document.body.appendChild(transition);

            

            // Geçiş animasyonu

            setTimeout(() => {

                transition.style.opacity = '0.8';

                setTimeout(() => {

                    // Burada normalde bir redirect olacaktı

                    // Şimdilik sayfayı yenileyelim

                    alert('Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...');

                    // location.reload(); // Gerçek senaryoda burası redirect olacak

                }, 1000);

            }, 100);

        }, 1500);

    });

    

    // Kayıt ol butonuna tıklandığında kayıt formunu göster

    document.getElementById('register-btn').addEventListener('click', function(e) {

        e.preventDefault();

        showRegisterForm();

    });

}

// Kayıt formunu ayarla

function setupRegistrationForm() {

    const loginContainer = document.querySelector('.login-container');

    const registerForm = document.getElementById('register-form');

    const registerBtn = document.getElementById('register-btn');

    const backToLoginBtn = document.getElementById('back-to-login');

    const signupForm = document.getElementById('signup-form');

    

    // Kayıt formunu göster

    function showRegisterForm() {

        // Login formunu kapat

        loginContainer.style.opacity = '0';

        setTimeout(() => {

            loginContainer.style.display = 'none';

            

            // Kayıt formunu göster

            registerForm.style.display = 'block';

            setTimeout(() => {

                registerForm.style.opacity = '1';

                registerForm.classList.add('active');

            }, 50);

        }, 500);

    }

    

    // Giriş formuna geri dön

    function hideRegisterForm() {

        registerForm.style.opacity = '0';

        registerForm.classList.remove('active');

        

        setTimeout(() => {

            registerForm.style.display = 'none';

            

            // Giriş formunu tekrar göster

            loginContainer.style.display = 'block';

            setTimeout(() => {

                loginContainer.style.opacity = '1';

            }, 50);

        }, 500);

    }

    

    // Geri dön butonuna tıklandığında

    backToLoginBtn.addEventListener('click', function(e) {

        e.preventDefault();

        hideRegisterForm();

    });

    

    // Kayıt formunu gönderme

    signupForm.addEventListener('submit', function(e) {

        e.preventDefault();

        

        // Şifre doğrulama

        const password = document.getElementById('new-password').value;

        const confirmPassword = document.getElementById('confirm-password').value;

        

        if (password !== confirmPassword) {

            alert('Şifreler eşleşmiyor!');

            return;

        }

        

        // Kayıt animasyonu

        const username = document.getElementById('new-username').value;

        const registerButton = this.querySelector('.register-button');

        registerButton.innerHTML = `<span>Hesabınız Oluşturuluyor...</span>`;

        registerButton.disabled = true;

        

        document.querySelectorAll('#signup-form .input-group').forEach(group => {

            group.style.opacity = '0.5';

            group.style.pointerEvents = 'none';

        });

        

        // Başarılı kayıt efekti

        setTimeout(() => {

            registerButton.innerHTML = `<span>Hoş Geldin, ${username}!</span>`;

            

            // Geçiş efekti

            setTimeout(() => {

                // Geçiş efekti

                const transition = document.createElement('div');

                transition.style.position = 'fixed';

                transition.style.top = '0';

                transition.style.left = '0';

                transition.style.width = '100%';

                transition.style.height = '100%';

                transition.style.backgroundColor = 'var(--tertiary-color)';

                transition.style.opacity = '0';

                transition.style.zIndex = '9999';

                transition.style.transition = 'opacity 1s ease';

                document.body.appendChild(transition);

                

                // Geçiş animasyonu

                setTimeout(() => {

                    transition.style.opacity = '0.8';

                    setTimeout(() => {

                        alert('Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...');

                        // location.reload(); // Gerçek senaryoda burası redirect olacak

                    }, 1000);

                }, 100);

            }, 1500);

        }, 2000);

    });

}

// Logo etkileşimleri

function setupLogoInteractions() {

    const logos = document.querySelectorAll('.logo');

    

    logos.forEach(logo => {

        logo.addEventListener('mouseenter', function() {

            const bot = this.querySelector('.bot');

            

            // 3D "float" efekti

            bot.style.transform = 'translateZ(40px) rotateY(10deg)';

            bot.style.filter = 'drop-shadow(0 0 20px currentColor)';

            

            // İçindeki robotun pulsating efekti

            bot.style.animation = 'none';

            void bot.offsetWidth; // Reflow

            bot.style.animation = 'pulse 0.6s infinite';

        });

        

        logo.addEventListener('mouseleave', function() {

            const bot = this.querySelector('.bot');

            bot.style.transform = '';

            bot.style.filter = '';

            

            // Orijinal animasyona geri dön

            if (bot.classList.contains('bot-1')) {

                bot.style.animation = 'pulse 3s ease-in-out infinite';

            } else if (bot.classList.contains('bot-2')) {

                bot.style.animation = 'float 4s ease-in-out infinite';

            } else if (bot.classList.contains('bot-3')) {

                bot.style.animation = 'rotate 5s linear infinite';

            }

        });

        

        // Tıklama efekti

        logo.addEventListener('click', function() {

            const bot = this.querySelector('.bot');

            

            // Botların hepsini döndür

            document.querySelectorAll('.bot').forEach(b => {

                b.style.transform = 'scale(0.8)';

                setTimeout(() => {

                    b.style.transform = '';

                }, 300);

            });

            

            // Random renkler belirle

            const colors = ['#00f7ff', '#9c27b0', '#00ff9d', '#ff7700', '#ff00d4'];

            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            

            // Geçici renk değişimi

            bot.style.color = randomColor;

            bot.style.filter = `drop-shadow(0 0 30px ${randomColor})`;

            

            setTimeout(() => {

                bot.style.color = '';

                bot.style.filter = '';

            }, 1000);

        });

    });

}
            