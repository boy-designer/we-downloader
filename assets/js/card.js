// Saat halaman dimuat, baca jumlah download dari localStorage
document.querySelectorAll(".card-item").forEach(card => {
    let imgSrc = card.querySelector("img").src;
    let savedCount = localStorage.getItem("downloadCount_" + imgSrc) || 0;
    card.querySelector(".download-count").textContent = savedCount;
});

function toggleCards(btn) {
    let wrapper = btn.nextElementSibling;
    btn.classList.toggle("active");

    if (wrapper.style.maxHeight) {
        wrapper.style.maxHeight = null;
    } else {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
    }
}


function downloadCard(button) {
    let cardItem = button.closest(".card-item");
    let img = cardItem.querySelector("img").src;
    let countEl = cardItem.querySelector(".download-count");

    // Ambil jumlah download dari localStorage
    let count = parseInt(localStorage.getItem("downloadCount_" + img) || 0);

    // Proses download
    let a = document.createElement("a");
    a.href = img;
    a.download = img.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Tambah count dan simpan kembali
    count++;
    localStorage.setItem("downloadCount_" + img, count);
    countEl.textContent = count;
}

function saveToLibrary(button) {
    let img = button.closest(".card-item").querySelector("img").src;
    let library = JSON.parse(localStorage.getItem("libraryCards")) || [];
    library.push(img);
    localStorage.setItem("libraryCards", JSON.stringify(library));
    alert("Card saved to library!");
}



// Tambah tombol geser kiri/kanan
document.querySelectorAll(".cards-wrapper").forEach(wrapper => {
    let carousel = wrapper.querySelector(".cards-carousel");
    let prevBtn = wrapper.querySelector(".prev-btn");
    let nextBtn = wrapper.querySelector(".next-btn");

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -230, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: 230, behavior: "smooth" });
        });
    }

    // Swipe gesture untuk HP
    let startX = 0;
    let scrollLeft = 0;

    carousel.addEventListener("touchstart", e => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("touchmove", e => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5; // percepatan swipe
        carousel.scrollLeft = scrollLeft - walk;
    });
});

// === Toggle menu ===
document.querySelector(".menu-toggle").addEventListener("click", function() {
    let menu = document.querySelector(".menu-dropdown");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

// Tutup menu kalau klik di luar
document.addEventListener("click", function(e) {
    let menu = document.querySelector(".menu-dropdown");
    let toggle = document.querySelector(".menu-toggle");
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
    }
});

// Toggle menu dropdown
document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".menu-dropdown").classList.toggle("show");
});

// Logout function
document.querySelector(".logout-btn").addEventListener("click", function () {
    // Hapus data login dari localStorage (jika ada)
    localStorage.removeItem("loggedInUser");
    // Kembali ke halaman login
    window.location.href = "index.html";
});

