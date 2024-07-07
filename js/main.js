const sections = document.querySelectorAll("section");

window.onscroll = function () {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 250;
    let height = sec.offsetHeight;

    if (top >= offset && top < offset + 300 + height) {
      sec.classList.add("show-animation");
    }
  });
};
