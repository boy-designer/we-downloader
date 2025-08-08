let library = JSON.parse(localStorage.getItem("libraryCards")) || [];
let container = document.getElementById("library");

function deleteCard(index) {
    if (confirm("Hapus card ini dari library?")) {
        library.splice(index, 1); // Hapus dari array
        localStorage.setItem("libraryCards", JSON.stringify(library)); // Simpan ulang
        location.reload(); // Refresh halaman
    }
}

if (library.length === 0) {
    container.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No cards saved yet.</p>";
} else {
    library.forEach((imgSrc, index) => {
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = imgSrc;

        let delBtn = document.createElement("button");
        delBtn.classList.add("delete-btn");
        delBtn.textContent = "✕";
        delBtn.onclick = () => deleteCard(index);

        card.appendChild(img);
        card.appendChild(delBtn);
        container.appendChild(card);
    });
}
