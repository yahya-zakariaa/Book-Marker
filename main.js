let nameInp = document.querySelector("#siteNameInp");
let siteUrl = document.querySelector("#siteUrlInp");
let subBtn = document.querySelector("#submiteBtn");
let table = document.querySelector(".mainTable tbody");
let urls = [];
let notvalidMsg = document.createElement("div");
notvalidMsg.setAttribute("role", "alert");
notvalidMsg.classList =
  "alert alert-danger text-nowrap urlNotValid position-absolute translate-middle-x";
notvalidMsg.innerText = "please check the URL is not valid";
if (localStorage.getItem("urls")) {
  urls.push(...JSON.parse(localStorage.getItem("urls")));
}
displayBook();

if (urls.length === 0) {
  document.querySelector("#noBookMsg").classList.replace("d-none", "d-block");
}

subBtn.addEventListener("click", function () {
  let siteData = {
    siteName: nameInp.value.toLowerCase(),
    siteUrl: siteUrl.value.toLowerCase(),
  };
  let regex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|net|org|eg){1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;
  let regexFlag = false;

  if (regex.test(siteData.siteUrl)) {
    regexFlag = true;
  } else {
    regexFlag = false;
  }
  if (regexFlag === true) {
    urls.unshift(siteData);
    localStorage.setItem("urls", JSON.stringify(urls));
  } else {
    document.querySelector("#Inputs").prepend(notvalidMsg);
    setTimeout(() => {
      document.querySelector(".urlNotValid").remove();
    }, 3000);
    return;
  }
  window.location.reload();
});

function displayBook() {
  for (let i = 0; i < urls.length; i++) {
    table.innerHTML += ` <tr>
    <td>${i + 1}</td>
    <td>${urls[i].siteName}</td>
    <td><button href="${
      urls[i].siteUrl
    }" class="btn btn-success" id="visitBtn">Visit</button></td>
    <td><button id="deleteBtn" class="btn btn-danger">Delete</button></td>
    </tr>`;
  }
}

let deleteBtn = document.querySelectorAll("#deleteBtn");
let deleteBtns = Array.from(deleteBtn);
let visitBtn = document.querySelectorAll("#visitBtn");
let visitBtns = Array.from(visitBtn);
function deleteItem() {
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", function (e) {
      let index = i;
      urls.splice(index, 1);
      localStorage.setItem("urls", JSON.stringify(urls));
      window.location.reload();
    });
  }
}
deleteItem();

(function () {
  for (let i = 0; i < visitBtns.length; i++) {
    visitBtns[i].addEventListener("click", function () {
      window.location.assign(`${urls[i].siteUrl}`);
    });
  }
})();
