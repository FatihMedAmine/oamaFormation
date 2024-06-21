// General selecors
const mainContent = document.querySelector("main");
const loading = document.querySelector(".loader_content");
const dashboards = document.querySelectorAll(".dashboard_container");
const popupBtns = document.querySelectorAll(".popup_btn");
const thanksPopups = document.querySelectorAll(".thanks_popup");
const errorPopups = document.querySelectorAll(".error_popup");
const addFormationBtn = document.querySelector(".add_formation_btn");
const formationsChoices = document.querySelector(".formation_choices");
const addFormationPopup = document.querySelector(".add_formation");
const hideFormationBtn = document.querySelector(".hide_popup_btn-1");
const hidePricenBtn = document.querySelectorAll(".hide_popup_btn-2");
const formationForm = document.querySelector(".add_formation_form");
const formationbtnBox = document.querySelector(".submit_formation");
const formationbtn = document.querySelector(".submit_formation_btn");
const pricePopup = document.querySelector(".show_price_popup");
const payBtn = document.querySelector(".pay_btn--prim");
const hidePayBtn = document.querySelector(".pay_btn--sec");
const payBtnThanks = document.querySelector(".thanks_popup--update_student").querySelector(".popup_btn");
const subsContainer = document.querySelector(".subscs_container");
const deleteStudentBtn = document.querySelector(".delete_student_btn");
const deleteStudentHide = document.querySelector(".popup_btn_del_std");
const deleteStudentVerify = document.querySelector(".show_delete_popup");
const deleteStudentConfirm = document.querySelector(".popup_btn_del_std_confirm");
const deleteStudentCancel = document.querySelectorAll(".popup_btn_del_std_cancel");
const barBtns = document.querySelector(".bar_list");
const searchStudent = document.querySelector(".bar_search--student");
const searchProf = document.querySelector(".bar_search--teacher");
const overlay = document.querySelector(".overlay");

// Dashboards displaying
const mainDashboardStudent = document.querySelector(".main_dashboard--student");
const mainDashboardTeacher = document.querySelector(".main_dashboard--teacher");
const mainDashboardGrps = document.querySelector(".main_dashboard--gprs");
const dashContentStudents = document.querySelector(".dash_content--students");
const studentsDashSelect = document.querySelector(".students_dash_select");
const dashContentProfs = document.querySelector(".dash_content--teachers");
const grpsDashSelect = document.querySelector(".grps_dash_select");
const dashContentGroups = document.querySelector(".dash_content--grps");

// Add Student Form
const addStudentForm = document.querySelector(".add_student_form");
const firstNameEtd = addStudentForm.querySelector(".first_name_input");
const lastNameEtd = addStudentForm.querySelector(".last_name_input");
const dateNaissEtd = addStudentForm.querySelector(".date_input");
const telEtd = addStudentForm.querySelector(".tel_input");
const villeEtd = addStudentForm.querySelector(".ville_input");
const quartierEtd = addStudentForm.querySelector(".quartier_input");
const levelEtd = addStudentForm.querySelector(".level_input");
const emailEtd = addStudentForm.querySelector(".email_input");
const addStudentBtn = document.querySelector(".submit_student");
const addStudentPopup = document.querySelector(".thanks_popup--student");
const deleteStudentPopup = document.querySelector(".thanks_popup--delete_student");

// Add Prof form
const addProfForm = document.querySelector(".add_prof_form");
const firstNameProf = addProfForm.querySelector(".first_name_input");
const lastNameProf = addProfForm.querySelector(".last_name_input");
const dateNaissProf = addProfForm.querySelector(".date_input");
const telProf = addProfForm.querySelector(".tel_input");
const villeProf = addProfForm.querySelector(".ville_input");
const quartierProf = addProfForm.querySelector(".quartier_input");
const emailProf = addProfForm.querySelector(".email_input");
const MatiereProf = addProfForm.querySelector(".matiere_input");
const addProftBtn = document.querySelector(".submit_prof");
const addProfPopup = document.querySelector(".thanks_popup--prof");
const logoutBtn = document.querySelector(".logout_btn");

// Student Profile
const dashboardStudentProfile = document.querySelector(".profile--student");
const firstNameEtdProfile = dashboardStudentProfile.querySelector(".first_name_input");
const lastNameEtdProfile = dashboardStudentProfile.querySelector(".last_name_input");
const dateNaissEtdProfile = dashboardStudentProfile.querySelector(".date_input");
const telEtdProfile = dashboardStudentProfile.querySelector(".tel_input");
const villeEtdProfile = dashboardStudentProfile.querySelector(".ville_input");
const quartierEtdProfile = dashboardStudentProfile.querySelector(".quartier_input");
const levelEtdProfile = dashboardStudentProfile.querySelector(".level_input");
const emailEtdProfile = dashboardStudentProfile.querySelector(".email_input");
const absEtdProfile = dashboardStudentProfile.querySelector(".abs_input");
const saveInfoStudent = document.querySelector(".save_info_btn");
const updateStudentPopup = document.querySelector(".thanks_popup--update_student");

// Prof Profile
const dashboardProfProfile = document.querySelector(".profile--teacher");
const firstNameProfProfile = dashboardProfProfile.querySelector(".first_name_input");
const lastNameProfProfile = dashboardProfProfile.querySelector(".last_name_input");
const dateNaissProfProfile = dashboardProfProfile.querySelector(".date_input");
const telProfProfile = dashboardProfProfile.querySelector(".tel_input");
const villeProfProfile = dashboardProfProfile.querySelector(".ville_input");
const quartierProfProfile = dashboardProfProfile.querySelector(".quartier_input");
const MatiereProfProfile = dashboardProfProfile.querySelector(".matiere_input");
const emailProfProfile = dashboardProfProfile.querySelector(".email_input");
const passwordProfProfile = dashboardProfProfile.querySelector(".password_input");
const saveInfoProf = dashboardProfProfile.querySelector(".save_info_btn");


// Groups details
const dashboardDispgrp = document.querySelector(".main_dashboard--display-grp");
const grpFormations = dashboardDispgrp.querySelector(".grp_formation");
const grpMatiere = dashboardDispgrp.querySelector(".grp_matiere");
const grpId = dashboardDispgrp.querySelector(".grp_id");
const grpStatus = dashboardDispgrp.querySelector(".grp_status");
const grpNbrEtd = dashboardDispgrp.querySelector(".grp_nbr_etd");
const grpProf = dashboardDispgrp.querySelector(".grp_prof");
const grpDate = dashboardDispgrp.querySelector(".grp_date");
const grpSalle = dashboardDispgrp.querySelector(".grp_salle");
const grpStudents = dashboardDispgrp.querySelector(".students_list");

let studentsData = [];
let dossiersData = [];
let profsData = [];
let matieresData = [];
let groupsData = [];
const idAdmin = localStorage.getItem("idAdmin");
if (idAdmin != 2025)
  	window.location.href = "./404.html";
const levels = ["1college", "2college", "3college", "troncCommun", "1bac", "2bac"];

// general Functions
const addStudentToDB = function(data)
{
	console.log("Student added to the database:", data);
}
const updateStudentInDB = function(id, data)
{
	console.log("Student added to the database:", data);
}

const loadingContent = function () {
	wait(1).then(() => {
	  loading.classList.add("hidden");
	  mainContent.classList.remove("hidden");
	});
};
const reloadContent = function()
{
	loading.classList.remove("hidden");
	mainContent.classList.add("hidden");
	loadingContent();
}
const wait = function (seconds) {
	return new Promise(function (resolve) {
	  setTimeout(resolve, seconds * 1000);
	});
  };

// Display Students on the dashboard
const displayStudents = async function(formation)
{
	const fetchDossiers = fetch('http://localhost:5000/getDossiers')
		.then(response => response.json())
		.then(dossiers => {
			dossiersData = [...dossiers.data];
		});

	const fetchStudents = fetch('http://localhost:5000/getStudents')
		.then(response => response.json())
		.then(students => {
			studentsData = [...students.data];
		});

	const findFormation = function(studentId)
	{
		let count = 0;
		let formation;
		dossiersData.forEach(dossier=>{
			if (dossier.IdEtudiant == studentId)
			{	
				count++;
				formation = dossier.TypeFormation;
			}
		})
		if (count == 1)
			return formation;
		else if (count > 1)
			return "Multiformation";
		else return "Nouveau";
	}

	await Promise.all([fetchDossiers, fetchStudents]);

	dashContentStudents.innerHTML = "";
	studentsData.forEach(student=>{
		const f = findFormation(student.IdEtudiant);
		let virtNiveau;
		if (formation == f || formation == "Tous")
		{
			if (student.Niveau == "1college" || student.Niveau == "2college" || student.Niveau == "3college")
				virtNiveau = student.Niveau.slice(0, 1) + "CLG";
			else if (student.Niveau == "troncCommun")
				virtNiveau = "TC";
			else if (student.Niveau == "1bac" || student.Niveau == "2bac")
				virtNiveau = student.Niveau.slice(0, 1) + "BAC";
			const htmlEl = `
			<div data-id=${student.IdEtudiant} class="dash_box formation-${f == "Multiformation" || f == "Nouveau" ? "default" : f.toLowerCase()} flex">
				<div class="box_icon flex"><i class="fa-solid fa-user"></i></div>
				<div class="box_info">
					<p class="user_name">${student.Prenom} ${student.Nom}</p>
					<p class="user_formation">${f}</p>
					<a href="#" class="user_btn student_profile_btn">Voir Profil</a>
				</div>
				<span class="student_level">${virtNiveau}</span>
			</div>`;
			dashContentStudents.insertAdjacentHTML("beforeend", htmlEl);
		}
	});
}

// Get Formations of all groups
const getFormations = fetch('http://localhost:5000/getFormations')
	.then(response => response.json())
	.then(formations => {
		return formations.data;
})

// Get Groups
const getGroups = fetch('http://localhost:5000/getGroups')
.then(response => response.json())
.then(groups => {
	return groups.data;
})

// Finf Prof for Group
const findProfForGroup = function(idMatiere, Jour, Num_seance) {
	console.log(idMatiere, Jour, Num_seance);
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:5000/getProfForGroup/${idMatiere}/${Jour}/${Num_seance}`)
			.then(response => response.json())
			.then(prof => {
				resolve(prof.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}

// Check Activated Groups
const activateGrps = async function () {
	try {
	  const groups = await getGroups;
	  for (const group of groups) {
		if (group.Statut === "Inactive" && group.nbr_Etudiant >= 4) {
		  const grpInfos = await findGrpPlace(group.Id_Group);
		  const profInfos = await findProfForGroup(
			group.Id_Matier,
			grpInfos.Jour_seance,
			grpInfos.Num_seance
		  );
  
		  const response = await fetch(`http://localhost:5000/activateGroup`, {
			method: "POST",
			headers: {
			  "Content-type": "application/json",
			},
			body: JSON.stringify({
			  Matricule: profInfos[0].Matricule,
			  Num_Salle: grpInfos.numSalle,
			  Jour_seance: grpInfos.Jour_seance,
			  Num_seance: grpInfos.Num_seance,
			  groupId: group.Id_Group,
			}),
		  });
		  const data = await response.json();
		  console.log(data);
		}
	  }
	} catch (error) {
	  console.error(error);
	}
};

// display Groups
const displayGroups = async function(formation) {
	try {
		const getGroups = fetch('http://localhost:5000/getGroups')
		.then(response => response.json())
		.then(groups => {
			return groups.data;
		})
		const [groups, formations] = await Promise.all([getGroups, getFormations]);
		dashContentGroups.innerHTML = "";
		groups.forEach(group => {
			groupsData.push(group);
			const professor = profsData.find(prof => prof.Matricule == group.Matricule);
			const f = formations.find(f => f.Id_Group == group.Id_Group);
			const matiere = matieresData.find(m => m.id_Matier == group.Id_Matier);
			if (f && matiere && (formation == f.TypeFormation || formation == "Tous")) {
				dashContentGroups.insertAdjacentHTML("beforeend", `
					<div data-id=${group.Id_Group} class="grp_box grp-${f.TypeFormation.toLowerCase()}">
						<div class="grp_box_header flex">
							<h4></h4>
							<span>${matiere.Nom_Matier}</span>
						</div>
						<ul class="grp_box_list">
							<li class="box_list_item">
								<p>ID du Groupe</p>
								<p>${group.Id_Group}</p>
							</li>
							<li class="box_list_item">
								<p>Status</p>
								<p>${group.Statut}</p>
							</li>
							<li class="box_list_item">
								<p>Nombre d'etudiants</p>
								<p>${group.nbr_Etudiant}</p>
							</li>
							<li class="box_list_item">
								<p>Professeur</p>
								<p>${professor ? professor.Prenom + ' ' + professor.Nom : 'N/A'}</p>
							</li>
						</ul>
						<a href="#" class="grp_btn">Voir Les Details</a>
					</div>
				`);
			}
		});
	} catch (error) {
		console.error(error);
	}
}

// Activate Groups
const activateAndReload = async function () {
	try {
	  await activateGrps();
	  await displayStudents("Tous");
	  await displayProfs();
	  fetch('http://localhost:5000/getGroups')
	  .then(response => response.json())
	  .then(groups => {
		  return groups.data;
	  })
	  await displayGroups("Tous");
	  loadingContent();
	} catch (error) {
	  console.error("Error during activation and reload:", error);
	}
  };
  

activateAndReload();
// Add Student To DB
addStudentForm.addEventListener("submit", function(e)
{
	e.preventDefault();
	addStudentBtn.value = "En Cours...";
	const currentDate = new Date();
	const selectedDate = new Date(dateNaissEtd.value);
	const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
	const maxDate = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());
	if (selectedDate < minDate || selectedDate > maxDate) {
		errorPopups[0].classList.remove("hidden");
		overlay.classList.remove("hidden");
		addStudentBtn.value = "Ajouter Etudiant";
		return;
	}
	const fetchToaddStudent = fetch("http://localhost:5000/insertStudent", {
		headers: {
			'Content-type' : 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			Prenom: firstNameEtd.value,
			Nom: lastNameEtd.value,
			DateNaissance: dateNaissEtd.value,
			Telephone: telEtd.value,
			Quartier: quartierEtd.value,
			Ville: villeEtd.value,
			Mail: emailEtd.value,
			Niveau: levelEtd.value
		})
	})
	.then(response => response.json())
	.then(data => addStudentToDB(data));
	fetchToaddStudent.then(()=>{
		displayStudents("Tous");
		addStudentBtn.value = "Ajouter Etudiant";
		firstNameEtd.value = lastNameEtd.value = dateNaissEtd.value = telEtd.value =  quartierEtd.value = villeEtd.value = emailEtd.value = "";
		addStudentPopup.classList.remove("hidden");
		overlay.classList.remove("hidden");
	})
})

// remove student from DB
deleteStudentBtn.addEventListener("click", function(e){
	e.preventDefault();
	deleteStudentVerify.classList.remove("hidden");
	overlay.classList.remove("hidden");
})

deleteStudentConfirm.addEventListener("click", function(e){
	e.preventDefault();
	deleteStudentConfirm.value = "En Cours...";
	const fetchToRemoveStudent = fetch(`http://localhost:5000/deleteStudent/${idStudent}`, {
		method: 'DELETE'
	})
	.then(response => response.json());
	fetchToRemoveStudent.then(()=>{
		displayStudents("Tous");
		deleteStudentVerify.classList.add("hidden");
		deleteStudentPopup.classList.remove("hidden");
		deleteStudentConfirm.value = "Supprimer";
	})
})

deleteStudentCancel.forEach(btn=>{
	btn.addEventListener("click", function(e){
		e.preventDefault();
		deleteStudentVerify.classList.add("hidden");
		overlay.classList.add("hidden");
	})
})

deleteStudentHide.addEventListener("click", function(e){
	e.preventDefault();
	deleteStudentPopup.classList.add("hidden");
	overlay.classList.add("hidden");
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	displayStudents("Tous");
	reloadContent();
	mainDashboardStudent.classList.remove("hidden");
})

// Display Subscriptions
const formationsBoxes = document.querySelectorAll(".subsc_content");
const displaySubscriptions = async function(idStudent) {
	const formations = ["Soutien", "Langue", "Developement"];

	try {
		const promises = formations.map(async (formation, i) => {
			const response = await fetch(`http://localhost:5000/getSeancesById/${idStudent}/${formation}`);
			const seances = await response.json();
			const seancesData = seances.data;

			let htmlContent = "";
			if (seancesData.length > 0) {
				seancesData.forEach(seance => {
					htmlContent += `<div class="subsc_row flex"><p>${seance.Nom_Matier}</p><div class="flex"><p>${seance.NbrSeanceRestant} Séances</p><p>#${seance.Id_Group}</p></div></div>`;
				});
				formationsBoxes[i].innerHTML = htmlContent;
			}
		});
		await Promise.all(promises);
	} catch (error) {
		console.error("Error fetching subscriptions:", error);
	}
};

// Show Student's Profile
let idStudent
const setProfileStudent = function(id)
{
	formationsBoxes.forEach(box=>box.innerHTML = "");
	const activeStudent = studentsData.find(student=>student.IdEtudiant == id);
	firstNameEtdProfile.value = activeStudent.Prenom;
	lastNameEtdProfile.value = activeStudent.Nom;
	dateNaissEtdProfile.value = activeStudent.DateNaissance.slice(0, 10);
	telEtdProfile.value = activeStudent.Telephone;
	villeEtdProfile.value = activeStudent.Ville;
	quartierEtdProfile.value = activeStudent.Quartier;
	emailEtdProfile.value = activeStudent.Mail;
	levelEtdProfile.value = levels.includes(activeStudent.Niveau) ? activeStudent.Niveau : "none";
}

dashContentStudents.addEventListener("click", function(e)
{
	const clicked = e.target.closest(".student_profile_btn");
	if (!clicked)
		return ;
	idStudent = clicked.closest(".dash_box").dataset.id;
	setProfileStudent(idStudent);
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	dashboardStudentProfile.classList.remove("hidden");
	displaySubscriptions(idStudent);
	reloadContent();
})

// Update Student infos
saveInfoStudent.addEventListener("click", function(e)
{
	e.preventDefault();
	saveInfoStudent.querySelector("span").value = "En Cours...";
	const fetchUpdateStudent = fetch(`http://localhost:5000/updateStudent/${idStudent}`, {
		headers: {
			'Content-type' : 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			Prenom: firstNameEtdProfile.value,
			Nom: lastNameEtdProfile.value,
			DateNaissance: dateNaissEtdProfile.value,
			Telephone: telEtdProfile.value,
			Quartier: quartierEtdProfile.value,
			Ville: villeEtdProfile.value,
			Mail: emailEtdProfile.value,
			Niveau: levelEtdProfile.value
		})
	})
	.then(response => response.json())
	.then(data => updateStudentInDB(idStudent, data));
	fetchUpdateStudent.then(()=>{
		displayStudents("Tous");
		saveInfoStudent.querySelector("span").value = "Sauvegarder";
		updateStudentPopup.classList.remove("hidden");
		overlay.classList.remove("hidden");
		displayStudents("Tous");
	})
})

// Display Professors on the dashboard
const displayProfs = function() {
	return new Promise((resolve, reject) => {
		const fetchProfs = fetch('http://localhost:5000/getProfesseurs')
			.then(response => response.json())
			.then(profs => {
				profsData = [...profs.data];
				resolve(profsData);
			})
			.catch(error => {
				reject(error);
			});
	});
};

displayProfs()
	.then(profsData => {
		dashContentProfs.innerHTML = "";
		profsData.forEach(prof => {
			dashContentProfs.insertAdjacentHTML("beforeend", `
				<div data-id=${prof.Matricule} class="dash_box formation-default flex">
					<div class="box_icon flex"><i class="fa-solid fa-user-tie"></i></div>
					<div class="box_info">
						<p class="user_name">${prof.Prenom} ${prof.Nom}</p>
						<a href="#" class="user_btn teacher_profile_btn">Voir Profil</a>
					</div>
				</div>
			`);
		});
	})
	.catch(error => {
		console.error(error);
	});

// get Matieres from DB
const getMatieres = function()
{
	fetch('http://localhost:5000/getMatieres')
	.then(response => response.json())
	.then(matieres => {
		matieres.data.forEach(matiere=>{
			matieresData.push(matiere);
			const htmlEl = `<option value="${matiere.id_Matier}">${matiere.Nom_Matier}</option>`;
			MatiereProf.insertAdjacentHTML("beforeend", htmlEl);
			MatiereProfProfile.insertAdjacentHTML("beforeend", htmlEl);
		})
		matieresData = [...matieres.data];
	})
}
getMatieres();

// add Prof to DB
addProfForm.addEventListener("submit", function(e) {
	e.preventDefault();
	addProftBtn.value = "En Cours...";
	const matiereValue = parseInt(MatiereProf.value);
	const currentDate = new Date();
	const selectedDate = new Date(dateNaissProf.value);
	const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
	const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
	if (isNaN(matiereValue) || matiereValue == 0 || selectedDate < minDate || selectedDate > maxDate) {
		errorPopups[0].classList.remove("hidden");
		overlay.classList.remove("hidden");
		addProftBtn.value = "Ajouter Professeur";
		return;
	}
	const fetchToAddProf = fetch(`http://localhost:5000/insertProfesseur`, {
		headers: {
			'Content-type' : 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			Prenom: firstNameProf.value,
			Nom: lastNameProf.value,
			Date_Naissance: dateNaissProf.value,
			Telephone: telProf.value,
			Ville: villeProf.value,
			Quartier: quartierProf.value,
			Email: emailProf.value,
			Matiere: matiereValue
		})
	})
	.then(response => response.json());
	
	fetchToAddProf.then(() => {
		window.location.reload();
	})
})

// Show Prof's Profile
const setProfileProf = function(id)
{
	const activeProf = profsData.find(prof=>prof.Matricule == id);
	firstNameProfProfile.value = activeProf.Prenom;
	lastNameProfProfile.value = activeProf.Nom;
	dateNaissProfProfile.value = activeProf.Date_Naissance.slice(0, 10);
	telProfProfile.value = activeProf.Telephone;
	villeProfProfile.value = activeProf.Ville;
	quartierProfProfile.value = activeProf.Quartier;
	emailProfProfile.value = activeProf.Email;
	MatiereProfProfile.value = activeProf.Matiere;
}
let idProf;

dashContentProfs.addEventListener("click", function(e)
{
	const clicked = e.target.closest(".teacher_profile_btn");
	if (!clicked)
		return ;
	idProf = clicked.closest(".dash_box").dataset.id;
	setProfileProf(idProf);
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	dashboardProfProfile.classList.remove("hidden");
	reloadContent();
})

// Update Prof infos
saveInfoProf.addEventListener("click", function(e)
{
	e.preventDefault();
	saveInfoProf.querySelector("span").value = "En Cours...";
	const fetchUpdateProf = fetch(`http://localhost:5000/updateProfesseur/${idProf}`, {
		headers: {
			'Content-type' : 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			Prenom: firstNameProfProfile.value,
			Nom: lastNameProfProfile.value,
			Date_Naissance: dateNaissProfProfile.value,
			Telephone: telProfProfile.value,
			Ville: villeProfProfile.value,
			Quartier: quartierProfProfile.value,
			Email: emailProfProfile.value,
		})
	})
	.then(response => response.json());
	fetchUpdateProf.then(()=>{
		window.location.reload();
	})
})

// Get Formation by Group
const getFormationByGroup = function(groupId) {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:5000/getFormationByGroup/${groupId}`)
			.then(response => response.json())
			.then(formation => {
				resolve(formation.data);
			})
			.catch(error => {
				console.error(error);
				reject([]);
			});
	});
};

// Fetch and display students by group
const fetchStudentsByGroup = (id) => {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:5000/getStudentsByGroup/${id}`)
			.then(response => response.json())
			.then(students => {
				resolve(students.data);
			})
			.catch(error => {
				console.error(error);
				reject([]);
			});
	});
};

// Show Group's Profile
dashContentGroups.addEventListener("click", function(e) {
	const clicked = e.target.closest(".grp_btn");
	if (!clicked) return;
	const activeGrpId = clicked.closest(".grp_box").dataset.id;

	Promise.all([getFormationByGroup(activeGrpId), fetchStudentsByGroup(activeGrpId)])
		.then(([formationData, studentsFromGrp]) => {
			const activeGroup = groupsData.find(group => group.Id_Group == activeGrpId);
			const activeProf = profsData.find(prof => prof.Matricule === activeGroup.Matricule);
			const activeMatiere = matieresData.find(matiere => matiere.id_Matier === activeGroup.Id_Matier);

			const studentsList = studentsFromGrp.map(student => `<li class="student_item">${student.Prenom} ${student.Nom}</li>`).join('');
			const grpNiveau = studentsFromGrp[0].Niveau;
			dashboardDispgrp.innerHTML = "";
			dashboardDispgrp.insertAdjacentHTML("beforeend",
				`<div class="grp_box grp-${formationData[0]?.TypeFormation ? formationData[0]?.TypeFormation.toLowerCase() : 'default'}">
					<div class="grp_box_header flex">
						<h4 class="grp_formation">${formationData[0]?.TypeFormation ? formationData[0]?.TypeFormation : 'Pas De Formation'}</h4>
						<span class="grp_matiere">${activeMatiere.Nom_Matier}</span>
					</div>
					<ul class="grp_box_list">
						<li class="box_list_item">
							<p>ID du Groupe</p>
							<p class="grp_id">${activeGroup.Id_Group}</p>
						</li>
						<li class="box_list_item">
							<p>Status</p>
							<p class="grp_status">${activeGroup.Statut}</p>
						</li>
						<li class="box_list_item">
							<p>Nombre d'etudiants</p>
							<p class="grp_nbr_etd">${activeGroup.nbr_Etudiant}</p>
						</li>
						<li class="box_list_item">
							<p>Niveau</p>
							<p class="grp_nbr_etd">${grpNiveau}</p>
						</li>
						<li class="box_list_item">
							<p>Professeur</p>
							<p class="grp_prof">${activeProf ? activeProf.Prenom + ' ' + activeProf.Nom : 'N/A'}</p>
						</li>
						<li class="box_list_item">
							<p>Date de sceance</p>
							<p class="grp_date">${activeGroup.Jour_seance ? activeGroup.Jour_seance + ' A ' + (activeGroup.Num_seance == 1 ? '17:00' : '19:00') : 'N/A'}</p>
						</li>
						<li class="box_list_item">
							<p>salle D'etude</p>
							<p class="grp_salle">${activeGroup.Num_Salle ? activeGroup.Num_Salle : 'N/A'}</p>
						</li>
						<li class="box_list_item">
							<p>Liste des etudiants</p>
							<ul class="students_list">
								${studentsList}
							</ul>
						</li>
					</ul>
				</div>`);

			dashboards.forEach(dash => dash.classList.add("hidden"));
			dashboardDispgrp.classList.remove("hidden");
			reloadContent();
		})
		.catch(error => {
			console.error(error);
		});
	});

// Create Group
const createNewGroup = function(matiereId) {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:5000/insertGroup", {
			headers: {
				'Content-type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				Id_Matier: matiereId
			})
		})
		.then(response => response.json())
		.then(data => {
			resolve(data);
		})
		.catch(error => {
			console.error("Error adding group to the database:", error);
			reject(error);
		});
	});
}
	
// Add Formation
let activeFormation;
const setUpMatieres = function(formation, id)
{
	const subjects = [];
	const activeStudent = studentsData.find(student=>student.IdEtudiant == id);
	matieresData.forEach((matiere, index)=>{
		if (formation == "Soutien")
		{
			if (index < 3)
				subjects.push(matiere.Nom_Matier);
			if (activeStudent.Niveau == "1bac" && index >= 3 && index < 7)
				subjects.push(matiere.Nom_Matier);
			if (activeStudent.Niveau == "2bac" && index >= 7 && index < 9)
				subjects.push(matiere.Nom_Matier);
		}
		else if (index >= 9 && index < 12 && formation == "Langue")
			subjects.push(matiere.Nom_Matier);
		else if (index >= 12 && index < 15 && formation == "Developement")
			subjects.push(matiere.Nom_Matier);
	})
	formationForm.innerHTML = "";
	subjects.forEach(sub => {
		formationForm.insertAdjacentHTML("beforeend", `
			<div data-formation="${formation}" data-matiere="${sub}" class="subject_row flex">
				<label for="numbSc" class="subject_name flex">
					<i class="fa-solid fa-book"></i>
					<h5>${sub}</h5>
				</label>
				<input placeholder="Sceances" type="number" class="subs_input" id="numbSc" min="0">
			</div>`);
	});
	formationForm.insertAdjacentHTML("beforeend", `
			<div class="submit_formation flex">
			<input type="submit" value="Ajouter" class="submit_formation_btn">
		</div>`);
}
addFormationBtn.addEventListener("click", function() {
	formationsChoices.classList.toggle("hidden");
})
formationsChoices.addEventListener("click", function(e) {
	const clicked = e.target.closest(".formation_choice");
	if (!clicked) return;
	activeFormation = clicked.dataset.formation;
	formationsChoices.classList.add("hidden");
	setUpMatieres(activeFormation, idStudent);
	addFormationPopup.classList.remove("hidden");
	overlay.classList.remove("hidden");
})

// Add Formation to DB
const createNewDossier = function(formation, id){
	return new Promise((resolve, reject) => {
		fetch("http://localhost:5000/insertDossier", {
			headers: {
				'Content-type' : 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				IdEtudiant: id,
				TypeFormation: formation
			})
		})
		.then(response => response.json())
		.then(dossier => {
			resolve(dossier.id);
		})
		.catch(error => {
			reject(error);
		});
	});
}

const createDossiersAndSeances = async function (formation, inputs, id) {
	try {
	  const sceances = [];
	  let dossiersStd = [];
	  let idDossier;
  
	  const response = await fetch(`http://localhost:5000/getDossierByStudent/${id}`);
	  const dossiers = await response.json();
	  dossiersStd = [...dossiers.data];
  
	  const dossierFormation = dossiersStd.find(dossier => dossier.TypeFormation === formation);
  
	  if (dossierFormation)
		idDossier = dossierFormation.numDossier;
	  else
		idDossier = await createNewDossier(formation, id);
  
	  inputs.forEach(input => {
		if (input.value !== "") {
		  const matiereName = input.closest(".subject_row").dataset.matiere;
		  const matiere = matieresData.find(matiere => matiere.Nom_Matier === matiereName).id_Matier;
		  const inputValue = Number(input.value);
		  sceances.push({
			idDossier: idDossier,
			matiere,
			inputValue
		  });
		}
	  });
  
	  return sceances;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
};

// Add Seances to DB
const addSeances = async function(sceances) {
	try {
		const areNews = [];
		const promises = sceances.map(async (sceance) => {
			const response = await fetch("http://localhost:5000/insertSeanceRestant", {
				headers: {
					'Content-type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					numDossier: sceance.idDossier,
					IdMatiere: sceance.matiere,
					NbrSeance: sceance.inputValue
				})
			});
			const result = await response.json();
			if (result.error) {
				errorPopups[1].classList.remove("hidden");
				overlay.classList.remove("hidden");
				throw new Error("Error adding seances to the database");
			} else {
				areNews.push(result.data.isNew);
			}
		});

		const results = await Promise.all(promises);
		return { results, areNews };
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Check available groups
const checkAvailableGroups = async function(IdMatiere, idDossier) {
	try {
		let filteredGroups = [];
		const allGroups = await fetch(`http://localhost:5000/checkAvailableGroup/${IdMatiere}/${idDossier}`);
		const groups = await allGroups.json();
		console.log(groups.data);
		const timeForStudent = await fetch(`http://localhost:5000/getTimeForStudent/${idDossier}`);
		const times = await timeForStudent.json();
		console.log(times);
		if (!groups.data) return [];
		filteredGroups = groups.data.filter(group => {
			return !times.data.some(time => {
				return (
					group.Jour_seance === time.Jour_seance &&
					group.Num_seance === time.Num_seance
				);
			});
		});
		if (!filteredGroups.length) filteredGroups = [];
		return filteredGroups;
	} catch (error) {
		console.error("Error checking available groups:", error);
		return [];
	}
}

//Calculate Price
const calcPrice = function(inputs)
{
	let price = 0;
	inputs.forEach(input=>{
		if (input.value === "")
			return;
		if (input.value == 1)
			price += Number(input.value) * 200;
		else
			price += Number(input.value) * 150;
	})
	pricePopup.querySelector(".price").textContent = price + " DH";
}

let inputs;
formationForm.addEventListener("click", function(e) {
	e.preventDefault();
	const clicked = e.target.closest(".submit_formation_btn");
	if (!clicked) return;
	inputs = [...document.querySelectorAll(".subs_input")];
	if (inputs.every(input => input.value === "") || inputs.some(input => {
		const sanitizedValue = input.value === '' ? 'default-value' : input.value;
		return Number(sanitizedValue) <= 0;
	})) {
		addFormationPopup.classList.add("hidden");
		errorPopups[0].classList.remove("hidden");
		overlay.classList.remove("hidden");
		return;
	}
	addFormationPopup.classList.add("hidden");
	calcPrice(inputs);
	pricePopup.classList.remove("hidden");
	overlay.classList.remove("hidden");
	displayStudents("Tous");
	displayGroups("Tous");
});

// Add to inactive groups
const addToInactiveGrp = function(idMatiere, Id_Dossier) {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:5000/addToInactiveGroup", {
			headers: {
				'Content-type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				Num_Dossier: Id_Dossier,
				Id_Matier: idMatiere
			})
		})
		.then(response => response.json())
		.then(data => {
			resolve(data);
		})
		.catch(error => {
			reject(error);
		});
	});
}

// Add Student to Group
const addStudentToGroup = function(idGroup, idDossier) {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:5000/addDossierToGroup", {
			headers: {
				'Content-type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				Id_Group: idGroup,
				Id_Dossier: idDossier
			})
		})
		.then(response => response.json())
		.then(data => {
			resolve(data);
		})
		.catch(error => {
			reject(error);
		});
	});
}
// Find Group Place
const findGrpPlace = function(idGroup) {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:5000/getInfosForGroup/${idGroup}`)
			.then(response => response.json())
			.then(infos => {
				resolve(infos.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}

// Hide Formation Popup
const hideFormationPopup = function() {
	addFormationPopup.classList.add("hidden");
	pricePopup.classList.add("hidden");
	overlay.classList.add("hidden");
};
// Pay Formation
let isDone = 0;
payBtn.addEventListener("click", function () {
	if (isDone) return;
	payBtn.textContent = ".....";
	isDone = 1;
	let index = 0;
  
	createDossiersAndSeances(activeFormation, inputs, idStudent).then((data) => {
	  const processData = async function (data, areNews) {
		for (const sceance of data) {
		  try {
			if (areNews[index] == 1) {
			  const grp = await checkAvailableGroups(
				sceance.matiere,
				sceance.idDossier
			  );
			  if (grp.length > 0) {
				console.log("Active Grp Found: ", grp[0].Id_Group);
				await addStudentToGroup(grp[0].Id_Group, sceance.idDossier);
			  } else {
				console.log("Inactive Grp Found");
				await addToInactiveGrp(sceance.matiere, sceance.idDossier);
			  }
			}
		  } catch (error) {
			console.error(error);
		  }
		  index++;
		}
	  };
  
	  addSeances(data)
		.then(({ results, areNews }) => {
		  processData(data, areNews).then(() => {
			window.location.reload();
		})
		})
		.catch((error) => {
		  console.error(error);
		});
	});
  });
  
payBtnThanks.addEventListener("click", function() {
	displaySubscriptions(idStudent);
});

// Filter Students
studentsDashSelect.addEventListener("change", function(e) {
	const selected = e.target.value;
	if (!selected) {
		return;
	}
	displayStudents(selected);
});

// Filter Groups
grpsDashSelect.addEventListener("change", function(e) {
	const selected = e.target.value;
	if (!selected)
		return ;
	displayGroups(selected);
});
// Hide Pay Popup
hidePayBtn.addEventListener("click", hideFormationPopup);

// Hide Thanks Popups
const hideThanksPopups = function() {
	thanksPopups.forEach(popup => popup.classList.add("hidden"));
	errorPopups.forEach(popup => popup.classList.add("hidden"));
	deleteStudentPopup.classList.add("hidden");
	overlay.classList.add("hidden");
	displaySubscriptions(idStudent);
	activateAndReload();
};
popupBtns.forEach(btn => {
	btn.addEventListener("click", hideThanksPopups);
});

hideFormationBtn.addEventListener("click", hideThanksPopups);
hidePricenBtn.forEach(btn => { btn.addEventListener("click", hideThanksPopups);} );
overlay.addEventListener("click", hideThanksPopups);

//Switch between Student Dashboard and teacher dashboard
barBtns.addEventListener("click", function(e)
{
	e.preventDefault();
	searchStudent.value = searchProf.value = "";
	const students = document.querySelectorAll(".dash_box");
	const profs = document.querySelectorAll(".dash_box");
	students.forEach(student=>student.classList.remove("hidden"));
	profs.forEach(prof=>prof.classList.remove("hidden"));
	const clickedBtn = e.target.closest(".bar_link");
	if (!clickedBtn)
		return ;
	document.querySelectorAll(".bar_link").forEach(
		btn => btn.classList.remove("bar_link--active")
	);
	clickedBtn.classList.add("bar_link--active");
	if (clickedBtn.classList.contains("bar_link--student"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardStudent.classList.remove("hidden");
		displayStudents("Tous");
		displayGroups("Tous");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("bar_link--teacher"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardTeacher.classList.remove("hidden");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("bar_link--grp"))
	{
		displayGroups("Tous").then(()=>{
			dashboards.forEach(dash=>dash.classList.add("hidden"));
			mainDashboardGrps.classList.remove("hidden");
			reloadContent();
		});
	}
})

// Search Student
searchStudent.addEventListener("input", function(e)
{
	e.preventDefault();
	const value = e.target.value.toLowerCase();
	const students = document.querySelectorAll(".dash_box");
	students.forEach(student=>{
		const name = student.querySelector(".user_name").textContent.toLowerCase();
		if (name.includes(value))
			student.classList.remove("hidden");
		else
			student.classList.add("hidden");
	})
})

// Search Prof
searchProf.addEventListener("input", function(e)
{
	e.preventDefault();
	const value = e.target.value.toLowerCase();
	const profs = document.querySelectorAll(".dash_box");
	profs.forEach(prof=>{
		const name = prof.querySelector(".user_name").textContent.toLowerCase();
		if (name.includes(value))
			prof.classList.remove("hidden");
		else
			prof.classList.add("hidden");
	})
})

// Logout
logoutBtn.addEventListener("click", function() {
	localStorage.removeItem("idAdmin");
	window.location.href = "./index.html";
});