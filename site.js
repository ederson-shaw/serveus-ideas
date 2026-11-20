(function () {
  var grid = document.getElementById("grid");
  if (grid) {
    var tiles = grid.querySelectorAll(".tile");
    var chips = document.querySelectorAll(".filters .chip");
    var known = Array.prototype.map.call(chips, function (c) {
      return c.getAttribute("href");
    });
    var apply = function () {
      var key = decodeURIComponent(location.hash.slice(1)) || "all";
      if (known.indexOf("#" + key) < 0) key = "all";
      tiles.forEach(function (t) {
        t.hidden = key !== "all" && t.dataset.area.toLowerCase() !== key;
      });
      chips.forEach(function (c) {
        c.classList.toggle("on", c.getAttribute("href") === "#" + key);
      });
    };
    window.addEventListener("hashchange", apply);
    apply();
  }
  var menu = document.querySelector("details.menu");
  var closeMenu = function () {
    if (menu) menu.removeAttribute("open");
  };
  document.addEventListener("click", function (e) {
    if (menu && !menu.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") return closeMenu();
    var link = e.key === "ArrowLeft" ? "prev" : e.key === "ArrowRight" ? "next" : null;
    var target = link && document.querySelector('[data-nav="' + link + '"]');
    if (target && !e.metaKey && !e.ctrlKey && !e.altKey) location.href = target.href;
  });
})();
