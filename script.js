// === Initialize EmailJS ===
emailjs.init("oyWc6zEHc2l70BhSJ");

// === Firebase Email/Password Login & Signup Toggle ===
let isSignUp = false;

document.getElementById("auth-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (isSignUp) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        Swal.fire("Success", "Account created. You are now logged in!", "success");
        window.location.href = "index.html";
      })
      .catch((error) => {
        Swal.fire("Sign Up Failed", error.message, "error");
      });
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const redirectTo = localStorage.getItem("redirectTo") || "index.html";
        window.location.href = redirectTo;
      })
      .catch((error) => {
        Swal.fire("Login Failed", error.message, "error");
      });
  }
});

// === Firebase Google Login ===
document.getElementById("google-login-btn")?.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      const redirectTo = localStorage.getItem("redirectTo") || "index.html";
      window.location.href = redirectTo;
    })
    .catch((error) => {
      Swal.fire("Google Login Failed", error.message, "error");
    });
});

// === Toggle Login/Sign Up Form ===
document.getElementById("toggle-link")?.addEventListener("click", (e) => {
  e.preventDefault();
  isSignUp = !isSignUp;
  document.getElementById("form-title").textContent = isSignUp ? "Create an account" : "Login to continue";
  document.getElementById("submit-btn").textContent = isSignUp ? "Sign Up" : "Login";
  document.getElementById("toggle-text").textContent = isSignUp ? "Already have an account?" : "Don't have an account?";
  document.getElementById("toggle-link").textContent = isSignUp ? "Login" : "Sign up";
});

// === Update Header Login Button (on index.html) ===
window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".login-btn");

  firebase.auth().onAuthStateChanged((user) => {
    if (!loginBtn) return;

    if (user) {
      const displayName = user.displayName || user.email;
      loginBtn.innerText = `${displayName} | Logout`;
      loginBtn.onclick = () => {
        firebase.auth().signOut().then(() => {
          window.location.href = "login.html";
        });
      };
    } else {
      loginBtn.innerText = "Login";
      loginBtn.onclick = () => {
        window.location.href = "login.html";
      };
    }
  });
});

// === Force Login for Protected Actions (video, view, buy) ===
document.querySelectorAll('.video-btn, .view-btn, .buy-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const user = firebase.auth().currentUser;
    const currentPage = window.location.pathname.split("/").pop();

    if (!user && currentPage !== "login.html") {
      e.preventDefault();
      localStorage.setItem("redirectTo", window.location.href);
      window.location.href = "login.html";
    }
  });
});

// === Contact Form Handling via EmailJS ===
document.getElementById("contact-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  emailjs.sendForm('service_uv8rrx7', 'template_etm58ik', this)
    .then(() => {
      Swal.fire("Success", "Message sent successfully!", "success");
      this.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      Swal.fire("Oops!", "Something went wrong. Try again later.", "error");
    });
});

// === Demo Video Modal Logic ===
const modal = document.getElementById('videoModal');
const video = document.getElementById('agentVideo');
const videoSource = document.getElementById('videoSource');
const closeBtn = document.getElementById('closeModal');

// Open modal and play video
document.querySelectorAll('.video-btn').forEach(button => {
  button.addEventListener('click', () => {
    const videoSrc = button.getAttribute('data-video') || 'demo.mp4';
    if (videoSource.src !== videoSrc) {
      videoSource.src = videoSrc;
      video.load();
    }
    modal.classList.remove('hidden');
    video.play();
  });
});

// Close modal
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    video.pause();
    video.currentTime = 0;
  });
}







