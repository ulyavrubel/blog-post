const loggedInLinks = document.querySelectorAll(".loggedIn");
const loggedOutLinks = document.querySelectorAll(".loggedOut");
const accountInfo = document.getElementById("account-info");
const postContainer = document.getElementById("postCardsContainer");

const setUpUI = user => {
  if (user) {
    const html = `${user.email} is logged in`;
    accountInfo.innerHTML = html;

    loggedInLinks.forEach(item => {
      item.style.display = "inline-block";
    });
    loggedOutLinks.forEach(item => {
      item.style.display = "none";
    });
  } else {
    accountInfo.innerHTML = "";
    loggedInLinks.forEach(item => {
      item.style.display = "none";
    });
    loggedOutLinks.forEach(item => {
      item.style.display = "inline-block";
    });
  }
};

const showPosts = data => {
  if (data.length != 0) {
    let html = "";

    data.forEach(doc => {
      const post = doc.data();

      const postCard = `
      <div class="card">
        <div class="card-header">
          ${post.title}
          <button type="button" class="btn btn-secondary btn-sm deletePost" user=${doc.np.Gm.currentUser.uid} id=${doc.id}>Delete post</button>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${post.content}</p>
            <footer class="blockquote-footer">${post.date}</footer>
          </blockquote>
        </div>
      </div>
      `;
      html += postCard;
    });
    postContainer.innerHTML = html;

    //delete buttons
    const deleteButtons = document.querySelectorAll(".deletePost");
    deleteButtons.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        db.collection("users")
          .doc(e.target.attributes.user.value)
          .collection("posts")
          .doc(e.target.id)
          .delete()
          .then(console.log("deleted!"))
          .catch(err => {
            console.log(err.message);
          });
      });
    });
  } else {
    postContainer.innerHTML = `<p id="logout-p">Login to see posts</p>`;
  }
};
