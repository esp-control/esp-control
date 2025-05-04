// Hapus semua kode terkait Google Identity Services dari a.js
// Gunakan kode ini sebagai satu-satunya implementasi login

const firebaseConfig = {
    apiKey: "AIzaSyB8_pj7lvjfbKxY10-JWPEr7kx79j0SNKg",
    authDomain: "esp-first-bf7a1.firebaseapp.com",
    projectId: "esp-first-bf7a1",
    appId: "1:734784429393:web:2a047d08d5b3d93d1fc770",
};

firebase.initializeApp(firebaseConfig);

function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("Berhasil login:", user.email);
            
            // Update UI
            document.getElementById("login-link").style.display = "none";
            document.getElementById("greeting").style.display = "block";
            document.getElementById("user-name").textContent = user.displayName;
            document.getElementById("login-link1").style.display = "none";
            
            // Simpan ke localStorage
            localStorage.setItem("userData", JSON.stringify({
                nama: user.displayName,
                email: user.email
            }));
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert("Gagal login: " + error.message);
        });
};

// Fungsi navigasi tetap sama
function brheader() { /* ... */ }
function prheader() { /* ... */ }
function hrheader() { /* ... */ }

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  const email = data.email;
  const name = email.split('@')[0]; // Ambil nama sebelum '@'

  // Tampilkan sapaan
  document.getElementById('login-container').style.display = 'none';
  const greeting = document.getElementById('greeting');
  document.getElementById('user-name').textContent = name;
  greeting.style.display = 'block';
};

// Tambahkan Google Sign-In Button
window.onload = function () {
  google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID', // Ganti dengan Client ID Anda
      callback: handleCredentialResponse
  });

  // Pasang event listener pada link
  document.getElementById('login-link').addEventListener('click', function (e) {
      e.preventDefault(); // Mencegah reload halaman
      google.accounts.id.prompt(); // Memunculkan prompt login Google
  });
};
