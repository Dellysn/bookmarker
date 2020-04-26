function Bookmarker(name, url) {
  this.name = name;
  this.url = url;
}
Bookmarker.prototype.saveBookmarks = function (book) {
  //   console.log(book);

  if (localStorage.getItem("bookmarks") === null) {
    let bookmarks = [];
    bookmarks.push(book);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    bookmarks.push(book);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    window.location.href = "/";
  }
};
UI.prototype.displayBookmarks = function () {
  if (localStorage.length > 0) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    let bookmarkList = document.getElementById("bookmark");
    let ul = document.createElement("ul");

    let li = document.createElement("li");
    let bookmark = bookmarks.map(function (bookmark) {
      return `
        <li> 
     <h4 class="bookmark-title"> ${bookmark.websiteName}</h4>
     <p> <a href="${bookmark.websiteUrl}" class="bookmark-link"> ${bookmark.websiteUrl}</a></p>
     <small> ${bookmark.savedOn}</small>
     </li>
        `;
    });
    ul.innerHTML += bookmark.join(" ");
    bookmarkList.appendChild(ul);
  }

  //   li.innerHTML = `

  //         <h4>
  //         ${bookmark.name},
  //         </h4>
  //            <p> ${bookmark.url}</p>

  //           `;
  //   ul.appendChild(li);
  //   bookmarkList.appendChild(ul);
};

const bookmark = new Bookmarker();
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
