const mainContent = document.querySelector("main");
const loading = document.querySelector(".loader_content");
const form = document.querySelector(".form");
const emailInput = document.querySelector(".input_email");
const passwordInput = document.querySelector(".input_password");
const submitBtn = document.querySelector(".login_btn");
let dashbord_prof;
let dashboard_admin;

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

// Display Warning
const displsyWarning = function()
{
  const warningMsg = document.querySelector(".warning_msg");
  emailInput.value = "";
  passwordInput.value = "";
  warningMsg.classList.remove("hidden");
}

window.addEventListener("load", loadingContent);
const mediaQuery = window.matchMedia('(max-width: 1024px)');
window.addEventListener("load", loadingContent);
if (mediaQuery.matches) {
	window.location.href = "./404.html";
}
form.addEventListener("submit", function (e) {
	e.preventDefault();
	const email = emailInput.value;
	const password = passwordInput.value;
	if (email === "" || password === "") {
		displsyWarning();
	} else {
		const data = { email: email, password: password };
		fetch("http://localhost:5000/login", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result.success) {
					if (result.data === "admin") {
						window.location.href = result.page;
						localStorage.setItem("idAdmin", 2025);
					} else if (result.data === "prof") {
						window.location.href = result.page;
						localStorage.setItem("idProf", result.idProf);
					} else {
						displsyWarning();
					}
				} else {
					displsyWarning();
				}
			});
	}
});

emailInput.addEventListener("focus", function (e) {
	const warningMsg = document.querySelector(".warning_msg");
	warningMsg.classList.add("hidden");
});

