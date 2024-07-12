const loader = document.querySelector(".loader-container");

// Wait promise
const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
  
  // Loading Content
  const loadingContent = function () {
    wait(1).then(() => {
      loader.style.display = "none";
    });
  };
  
  window.addEventListener("load", loadingContent);