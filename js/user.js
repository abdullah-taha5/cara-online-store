let userInfo = document.querySelector("#user-info"),
  userDom = document.querySelector("#user"),
  links = document.querySelector("#links"),
  logoutBtn = document.querySelector("#logout");

let username = localStorage.getItem("username");
if (username) {
  logoutBtn.style.display = "flex";
  userDom.innerHTML = username;
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1000);
});
