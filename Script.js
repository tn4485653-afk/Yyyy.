// Dữ liệu mẫu
const products = [
    { id: 1, name: "Laptop ASUS ROG Strix G16 (2024)", price: 35990000, oldPrice: 39990000, img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", discount: "10%" },
    { id: 2, name: "Mainboard MSI Z790 Carbon WiFi", price: 12500000, oldPrice: 13500000, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400", discount: "8%" },
    { id: 3, name: "VGA NVIDIA RTX 4080 Super Founders", price: 32000000, oldPrice: 35000000, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400", discount: "12%" },
    { id: 4, name: "Màn hình Samsung Odyssey G7 32 inch", price: 15900000, oldPrice: 17900000, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400", discount: "15%" },
    { id: 5, name: "Bàn phím cơ Custom Keychron Q3", price: 4500000, oldPrice: 5200000, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400", discount: "5%" },
];

// Định dạng tiền tệ VNĐ
const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Render sản phẩm
function renderProducts(targetId, data) {
    const container = document.getElementById(targetId);
    if (!container) return;

    container.innerHTML = data.map(product => `
        <div class="product-card">
            <span class="tag">-${product.discount}</span>
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    <span>(124)</span>
                </div>
                <div class="price-box">
                    <span class="price">${formatVND(product.price)}</span>
                    <span class="old-price">${formatVND(product.oldPrice)}</span>
                </div>
                <button class="add-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            </div>
        </div>
    `).join('');
}

// Giỏ hàng
let cartCount = 0;
function addToCart(id) {
    cartCount++;
    document.querySelector('.badge').innerText = cartCount;
    
    // Hiệu ứng Toast đơn giản
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Đã thêm!";
    btn.style.background = "#22c55e";
    btn.style.borderColor = "#22c55e";
    btn.style.color = "white";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "transparent";
        btn.style.borderColor = "#2563eb";
        btn.style.color = "#2563eb";
    }, 1500);
}

// Countdown Timer
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) timer = duration;
    }, 1000);
}

// Khởi chạy
window.onload = () => {
    renderProducts('flash-sale-products', products);
    renderProducts('laptop-products', [...products].reverse());
    
    const fiveHours = 60 * 60 * 5;
    const display = document.querySelector('#timer');
    startTimer(fiveHours, display);
};
// ==========================================
// HỆ THỐNG ĐĂNG NHẬP / ĐĂNG KÝ
// ==========================================

const userBtn = document.querySelector('.action-item'); // Nút Tài khoản trên Header
const authModal = document.getElementById('auth-modal');
const closeBtn = document.querySelector('.close-btn');
const authForm = document.getElementById('auth-form');
let isLoginMode = true;

// Mở form khi bấm vào biểu tượng "Tài khoản"
userBtn.addEventListener('click', () => {
    const loggedInUser = localStorage.getItem('techpro_email');
    if (loggedInUser) {
        // Nếu đã đăng nhập thì hỏi xem có muốn đăng xuất không
        if (confirm(`Bạn đang đăng nhập bằng: ${loggedInUser}\nBạn có muốn đăng xuất không?`)) {
            localStorage.removeItem('techpro_email');
            checkLoginStatus();
        }
    } else {
        authModal.style.display = 'flex'; // Hiện form
    }
});

// Đóng form khi bấm dấu X hoặc bấm ra ngoài
closeBtn.addEventListener('click', () => authModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.style.display = 'none';
});

// Chuyển đổi giữa chế độ Đăng ký và Đăng nhập
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('modal-title');
    const submitBtn = document.querySelector('.form-submit');
    const toggleText = document.querySelector('.toggle-auth');

    if (isLoginMode) {
        title.innerText = "Đăng nhập";
        submitBtn.innerText = "Đăng nhập ngay";
        toggleText.innerHTML = `Chưa có tài khoản? <span id="toggle-form-btn" onclick="toggleAuthMode()">Đăng ký tại đây</span>`;
    } else {
        title.innerText = "Đăng ký tài khoản mới";
        submitBtn.innerText = "Tạo tài khoản";
        toggleText.innerHTML = `Đã có tài khoản? <span id="toggle-form-btn" onclick="toggleAuthMode()">Đăng nhập</span>`;
    }
}

// Xử lý khi ấn nút Submit Form
authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn trình duyệt load lại trang

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 1. Kiểm tra Validate cơ bản
    if (!email.includes('@gmail.com') && !email.includes('@')) {
        alert("Vui lòng nhập đúng định dạng Email (ví dụ: abc@gmail.com)!");
        return;
    }
    if (password.length < 6) {
        alert("Bảo mật yếu: Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    // 2. Tạo hiệu ứng loading giả lập gửi dữ liệu lên Server
    const submitBtn = document.querySelector('.form-submit');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Đang kết nối hệ thống...";
    submitBtn.style.opacity = "0.7";

    setTimeout(() => {
        // 3. Xử lý thành công sau 1 giây
        localStorage.setItem('techpro_email', email); // Lưu vào bộ nhớ cục bộ
        alert(`${isLoginMode ? 'Đăng nhập' : 'Đăng ký'} thành công!\nChào mừng ${email} đến với TechPro.`);
        
        // Reset giao diện form
        authModal.style.display = 'none';
        submitBtn.innerText = originalText;
        submitBtn.style.opacity = "1";
        authForm.reset();
        
        // Cập nhật tên lên Header
        checkLoginStatus();
    }, 1500); // Đợi 1.5s
});

// Hàm kiểm tra trạng thái đăng nhập (chạy khi vừa load trang)
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('techpro_email');
    // Lấy thẻ <span> chứa chữ "Tài khoản" (thẻ span thứ 2 trong .action-item đầu tiên)
    const userTextSpan = document.querySelectorAll('.action-item span')[0]; 
    
    if (loggedInUser) {
        // Cắt lấy chữ đằng trước @gmail.com
        const username = loggedInUser.split('@')[0];
        userTextSpan.innerText = `Chào, ${username}`;
        userTextSpan.style.color = "var(--primary-color)";
        userTextSpan.style.fontWeight = "bold";
    } else {
        userTextSpan.innerText = "Tài khoản";
        userTextSpan.style.color = "inherit";
        userTextSpan.style.fontWeight = "normal";
    }
}

// Kích hoạt check khi web vừa mở lên
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

