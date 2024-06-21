const mainContent = document.querySelector("main");
const loading = document.querySelector(".loader_content");
const dashboards = document.querySelectorAll(".dashboard_container");
const mainDashboardGrps = document.querySelector(".main_dashboard--gprs");
const mainDashboardDispGrps = document.querySelector(".main_dashboard--display-grp");
const mainDashboardprofile = document.querySelector(".profile--teacher");
const mainDashboardAbs = document.querySelector(".abscence_list");
const grpBtn = document.querySelectorAll(".grp_btn_sm");
const grpBtnAbs = document.querySelector(".grp_btn_abs");
const barBtns = document.querySelector(".bar_list");


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

const reloadContent = function()
{
	loading.classList.remove("hidden");
	mainContent.classList.add("hidden");
	loadingContent();
}


// Switch between Student Dashboard and teacher dashboard
barBtns.addEventListener("click", function(e)
{
	e.preventDefault();
	const clickedBtn = e.target.closest(".bar_link");
	if (!clickedBtn)
		return ;
	document.querySelectorAll(".bar_link").forEach(
		btn => btn.classList.remove("bar_link--active")
	);
	if (!clickedBtn.classList.contains("abs_reminder"))
		clickedBtn.classList.add("bar_link--active");
	if (clickedBtn.classList.contains("bar_link--grp"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardGrps.classList.remove("hidden");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("bar_link--profil"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardprofile.classList.remove("hidden");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("abs_reminder"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardAbs.classList.remove("hidden");
		reloadContent();
	}
})
grpBtn.forEach(btn=>btn.addEventListener("click", function()
{
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	mainDashboardDispGrps.classList.remove("hidden");
	reloadContent();
}))

//added code
mainDashboardDispGrps.addEventListener("click", function(e)
{
	e.preventDefault();
	const clickedBtn = e.target.closest(".grp_btn");
	if (!clickedBtn)
		return ;
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	mainDashboardAbs.classList.remove("hidden");
})
