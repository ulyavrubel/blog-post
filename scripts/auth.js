//auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    setUpUI(user);
  } else {
    setUpUI(null);
  }
});

//signup user
const singupForm = document.getElementById("signup-form");

singupForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = singupForm["signup-email"].value;
  const password = singupForm["signup-password"].value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred.user);
      $("#signUp-Modal").modal("hide");
      singupForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});

//logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut().then(console.log("user is signed out"));
});

//login
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred);
      $("#logIn-Modal").modal("hide");
      singupForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});
