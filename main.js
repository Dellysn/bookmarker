function Bookmarker(name, url) {
  this.name = name;
  this.url = url;
}
/**
 * @param{object} check for data in localStorage, if null, set the variable to an array
 *
 */
const bookmarkArray = localStorage.getItem("bookmarks")
  ? JSON.parse(localStorage.getItem("bookmarks"))
  : [];

Bookmarker.prototype.saveBookmarks = function (book) {
  /**
   * @param{Date} instantiate the Date constructor and called the .toLocaleString() to get the current date
   *
   */
  const date = new Date();
  const dateCreated = date.toLocaleString();
  /**
   * @param{object} created a bookmark object and set the property of book into new key
   *
   */
  let bookmark = {
    websiteName: book.name,
    websiteUrl: book.url,
    savedOn: dateCreated,
  };
  /**
   * @param{localeStorage} saved data into the LocaleStorage
   *
   */
  bookmarkArray.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
  JSON.parse(localStorage.getItem("bookmarks"));
  // reload the window
  window.location.href = "/";
};
UI.prototype.displayBookmarks = function () {
  /**
   * @param{object} retrieve data from the localeStorage and store it in a data variable
   *
   */
  const data = JSON.parse(localStorage.getItem("bookmarks"));
  let ul = document.getElementById("bookmark");
  // Mapping through the retreived data and render to the view
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
    let bookmark = `
      <li>
      <h4 class="bookmark-title"> Empty</h4>

      </li>

      `;
    ul.innerHTML = bookmark;
  }
};
/**
 * clearing the bookmarks from localStorage
 * */

UI.prototype.clearBookmarks = function () {
  const data = JSON.parse(localStorage.getItem("bookmarks"));
  if (data) {
    localStorage.removeItem("bookmarks");
    window.location.href = "/";
  } else {
    return false;
  }
};

document.addEventListener("click", function (e) {
  if (!e.target.matches("#submit")) return false;
  let $ = (selectors) => {
    return document.querySelector(selectors);
  };
  let websiteName = $("#website-name").value;
  let url = $("#website-url").value;
  const bookmark = new Bookmarker(websiteName, url);
  bookmark.saveBookmarks(bookmark);
});

function UI() {}
const ui = new UI();
ui.displayBookmarks();

const clearBtn = document.querySelectorAll(".clear");
clearBtn.forEach(function (clear) {
  clear.addEventListener("click", function () {
    ui.clearBookmarks();
  });
});
