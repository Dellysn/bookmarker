/**
 * @param{object} check for data in localStorage, if null, set the variable to an array
 *
 */
const bookmarkArray = localStorage.getItem("bookmarks")
  ? JSON.parse(localStorage.getItem("bookmarks"))
  : [];
function getValues(id) {
  return document.getElementById(id).value;
}
function getElementById(id) {
  return document.getElementById(id);
}
const MIN_LENGTH = "MIN_LENGTH";
const REQUIRED = "REQUIRED";
let validate = function (value, flag, validatorValue) {
  if (flag === REQUIRED) {
    return value.trim().length > 0;
  }
  if (flag === MIN_LENGTH) {
    return value.trim().length > validatorValue;
  }
};
let createBookmark = function (websiteName, websiteUrl) {
  if (!validate(websiteName, REQUIRED) || !validate(websiteUrl, REQUIRED)) {
    throw new Error("Invalid Inputs please check and try again!");
  }
  const date = new Date();
  const dateCreated = date.toLocaleString();

  return {
    websiteName: websiteName,
    websiteUrl: websiteUrl,
    savedOn: dateCreated,
  };
};
let displayBookmarks = function (output) {
  const ul = document.querySelector("ul#bookmark");
  const li = document.createElement("li");
  let list = output
    .map((bookmark) => {
      return `
     <li>
     <h4> ${bookmark.websiteName}</h4>
      <p> <a href="${bookmark.websiteUrl}" class="bookmark-link"> ${bookmark.websiteUrl}</a></p>
       <small> ${bookmark.savedOn}</small>
     </li>
          
     `;
    })
    .join("");

  ul.innerHTML = list;
};

let saveBookmarkToDatabase = function (bookmarks) {
  //   check for existing database
  bookmarkArray.push(bookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
  const data = JSON.parse(localStorage.getItem("bookmarks"));

  displayBookmarks(data);
};
let getFormInputs = function () {
  let websiteName = getValues("website-name");
  let websiteUrl = getValues("website-url");
  try {
    let newBookmark = new createBookmark(websiteName, websiteUrl);
    saveBookmarkToDatabase(newBookmark);
    websiteName = "";
    websiteUrl = "";
  } catch (err) {
    alert(err);
  }
};

let clearBookmarks = function () {
  if (localStorage.getItem("bookmarks")) {
    localStorage.removeItem("bookmarks");
  } else {
    return false;
  }
};
let eventListener = function (buttonID, eventHandler) {
  let button = getElementById(buttonID);
  button.addEventListener("click", eventHandler, false);
};
const loadBOokmarks = function () {
  let ul = document.querySelector("ul#bookmark");

  let data = JSON.parse(localStorage.getItem("bookmarks"));

  if (data) {
    let list = data
      .map((bookmark) => {
        return `
     <li>
     <h4 class="bookmark-title"> ${bookmark.websiteName}</h4>
     <p> <a href="${bookmark.websiteUrl}" class="bookmark-link"> ${bookmark.websiteUrl}</a></p>
     <small> ${bookmark.savedOn}</small>
     </li>

     `;
      })
      .join("");

    ul.innerHTML = list;
  } else {
    let list = `<li>
       <h2>No bookmarkmarks added yet! </h2>
      </li>`;

    ul.innerHTML = list;
  }
};
loadBOokmarks();
eventListener("submit", getFormInputs);
const clearBtn = document.querySelectorAll(".clear");
clearBtn.forEach(function (clear) {
  clear.addEventListener("click", clearBookmarks);
});
// eventListener("clear", clearBookmarks);
