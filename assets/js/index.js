document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "card.html";
    } else {
        alert("Masukkan username dan password!");
    }
});
