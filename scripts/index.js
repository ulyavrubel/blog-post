const loggedInLinks = document.querySelectorAll(".loggedIn");
const loggedOutLinks = document.querySelectorAll(".loggedOut");
const accountInfo = document.getElementById("account-info");

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
