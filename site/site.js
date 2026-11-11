/* HoopThink shared chrome: light/dark toggle + menu behavior. The theme itself is
   set before first paint by the inline script in <head>; this only wires the controls. */
(function () {
  var root = document.documentElement;
  function cur() { return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function label(b) {
    var light = cur() === "light";
    b.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    b.setAttribute("title", light ? "Switch to dark mode" : "Switch to light mode");
  }
  var btns = document.querySelectorAll(".ht-theme");
  btns.forEach(function (b) {
    label(b);
    b.addEventListener("click", function () {
      var n = cur() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", n);
      try { localStorage.setItem("ht-theme", n); } catch (e) {}
      btns.forEach(label);
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute("content", n === "light" ? "#FAF7F2" : "#15100E");
    });
  });
  var nav = document.querySelector(".ht-nav");
  if (nav) {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.open) { nav.open = false; nav.querySelector("summary").focus(); }
    });
    document.addEventListener("click", function (e) { if (nav.open && !nav.contains(e.target)) nav.open = false; });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { nav.open = false; }); });
  }
})();
