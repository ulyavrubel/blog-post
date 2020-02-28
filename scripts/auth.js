//auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    setUpUI(user);
    db.collection("users")
      .doc(user.uid)
      .collection("posts")
      .orderBy("dateforSorting", "desc")
      .onSnapshot(
        snapshot => {
          showPosts(snapshot);
        },
        err => {
          console.log(err);
        }
      );
  } else {
    setUpUI(null);
    showPosts([]);
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

//create new post
const createPostForm = document.getElementById("createPost-form");
createPostForm.addEventListener("submit", e => {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  db.collection("users")
    .doc(user.uid)
    .collection("posts")
    .add({
      title: createPostForm["post-title"].value,
      content: createPostForm["post-text"].value,
      date: new Date().toLocaleDateString(),
      dateforSorting: new Date()
    })
    .then(cred => {
      console.log(cred);
      $("#createPost-modal").modal("hide");
      createPostForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});
