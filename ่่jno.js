function createBalloons() {
    const balloonsContainer = document.querySelector('.balloons');
    const balloonCount = 20; // Number of balloons to create

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        balloon.style.animationDuration = Math.random() * 3 + 3 + 's'; // Random duration for floating

        // Optionally set different sizes
        const size = Math.random() * 20 + 20; // Balloons size between 20px and 40px
        balloon.style.width = size + 'px';
        balloon.style.height = size + 'px';

        balloonsContainer.appendChild(balloon);
    }
}

// Call the function to create balloons when the page loads
window.onload = createBalloons;

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-inner img');
    const totalSlides = slides.length;

    // คำนวณตำแหน่งปัจจุบัน
    currentSlide += direction;

    // ตรวจสอบขอบเขต
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // ย้อนกลับไปที่รูปสุดท้าย
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // กลับไปที่รูปแรก
    }

    // เปลี่ยนตำแหน่งของรูปภาพ
    const offset = -currentSlide * 100; // เปลี่ยนตำแหน่งตาม slide ปัจจุบัน
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

// ฟังก์ชันสำหรับลากเพื่อเลื่อน
let startX;
let endX;

document.querySelector('.carousel-inner').addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

document.querySelector('.carousel-inner').addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
});

document.querySelector('.carousel-inner').addEventListener('touchend', () => {
    if (startX > endX + 50) {
        moveSlide(1); // เลื่อนไปขวา
    } else if (startX < endX - 50) {
        moveSlide(-1); // เลื่อนไปซ้าย
    }
});

// 🩷 คลิกเพื่อเปิด popup รูปใหญ่
const images = document.querySelectorAll('.gallery-grid img');
const popup = document.getElementById('image-popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.querySelector('.close');

images.forEach(img => {
    img.addEventListener('click', () => {
        popup.style.display = 'block';
        popupImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// ปิดเมื่อคลิกนอกภาพ
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
