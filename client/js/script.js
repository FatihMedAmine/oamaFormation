const mainContent = document.querySelector("main");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const startedLink = document.querySelector(".started_link");
const navList = document.querySelector(".nav_list");
const supLinkDissp = document.querySelector(".sup_link--disp");
const logo = document.querySelector(".logo");
const navIcon = document.querySelector(".nav_icon");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector(".hero_section");
const questions = document.querySelector(".questions_container");
const form = document.querySelector(".cta_form");
const submit_btn = document.querySelector(".submit_btn");
const email = document.querySelector(".email_input");
const first_name = document.querySelector(".first_name_input");
const last_name = document.querySelector(".last_name_input");
const subject = document.querySelector(".subject_input");
const message = document.querySelector(".message_input");
const thanksPopup = document.querySelector(".thanks_popup");
const popupBtn = document.querySelector(".popup_btn");
const showElements = document.querySelectorAll(".show_el");
const mediaQuery1 = window.matchMedia("(max-width: 62rem)");
const mediaQuery2 = window.matchMedia("(max-width: 35.13rem)");
const loading = document.querySelector(".loader_content");

// Listen to media query change
if (mediaQuery1.matches) {
  navList.insertAdjacentHTML(
    "beforeend",
    `<a target="_blank" href="start" class="nav_link started_link flex"
    >Se Connecter</a>`
  );
}

// Wait promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Loading Content
const loadingContent = function () {
  wait(1).then(() => {
    loading.classList.add("hidden");
    mainContent.classList.remove("hidden");
  });
};

window.addEventListener("load",loadingContent);

// nav icon's click event
const showNavList = function () {
  overlay.classList.toggle("hidden");
  wait(0).then(() => overlay.classList.toggle("overlay--active"));
  navIcon.classList.toggle("nav_icon--active");
  navList.classList.toggle("nav_list--active");
  header.classList.toggle("header--active");
};

navIcon.addEventListener("click", showNavList);
overlay.addEventListener("click", showNavList);

navList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav_link");
  if (clicked && navList.classList.contains("nav_list--active")) {
    overlay.classList.add("hidden");
    overlay.classList.remove("overlay--active");
    navIcon.classList.remove("nav_icon--active");
    navList.classList.remove("nav_list--active");
    header.classList.remove("header--active");
  }
});

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

// FAQ
questions.addEventListener("click", function (e) {
  const activeQ = e.target.closest(".question_box");
  if (!activeQ) return;
  const icon = activeQ.querySelector(".plus");
  const txt = activeQ.querySelector(".answer");
  document.querySelectorAll(".question_box").forEach((q) => {
    if (q != activeQ) {
      q.querySelector(".answer").style.height = 0;
      q.classList.remove("question_box--active");
      q.querySelector(".plus").classList.add("fa-plus");
      q.querySelector(".plus").classList.remove("fa-minus");
    }
  });
  if (!activeQ.classList.contains("question_box--active")) {
    {
      txt.style.height = txt.scrollHeight + "px";
      activeQ.classList.add("question_box--active");
      activeQ.querySelector(".plus").classList.remove("fa-plus");
      activeQ.querySelector(".plus").classList.add("fa-minus");
    }
  } else {
    txt.style.height = 0;
    activeQ.classList.remove("question_box--active");
    activeQ.querySelector(".plus").classList.add("fa-plus");
    activeQ.querySelector(".plus").classList.remove("fa-minus");
  }
});

/* Contact Form */
const inputBorderAnimated = function (e) {
  const focused = e.target
    .closest(".input_container")
    .querySelector(".animated_border");
  if (!focused) return;
  focused.classList.toggle("animated_border--active");
};
const inputs = document.querySelectorAll(".input:not(select)");
inputs.forEach((inp) => {
  inp.addEventListener("focus", function (e) {
    inputBorderAnimated(e);
  });
  inp.addEventListener("blur", function (e) {
    inputBorderAnimated(e);
  });
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value) {
      input
        .closest(".input_container")
        .querySelector("label")
        .classList.add("has_value");
    }
  });
});

window.addEventListener("scroll", function () {
  showElements.forEach((element, index) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight)
      element.classList.add("animate__fadeInTop");
  });
});

function contactSendEmail() {

  const templateParams = {
    email: email.value,
    first_name: first_name.value,
    last_name: last_name.value,
    subject: subject.value,
    message: message.value,
  };
  emailjs.send("service_wcn6hjr", "template_lwonl8s", templateParams).then((res) => {
    thanksPopup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    overlay.classList.add("overlay--active");
    submit_btn.value = "Send Message";
  });
  first_name.value =
    last_name.value =
    email.value =
    subject.value =
    message.value =
      "";
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  submit_btn.value = "Processing...";
  submit_btn.disabled = true;
  contactSendEmail();
});
popupBtn.addEventListener("click", function () {
  thanksPopup.classList.add("hidden");
  overlay.classList.add("hidden");
  overlay.classList.remove("overlay--active");
  submit_btn.disabled = false;
});