const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const email_ad = process.env.EMAIL_ADMIN;
const password_ad = process.env.PASSWORD_ADMIN;
const page_prof = process.env.PROF_PAGE;
const page_admin = process.env.ADMIN_PAGE;

dotenv.config();

const dbService = require('./DBservice.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//////////////////// ADMIN PART //////////////////////

// Get Students
app.get('/getStudents', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getStudentsData();
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Dossiers
app.get('/getDossiers', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getDossiersData();
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Insert Student
app.post('/insertStudent', (request, response) =>{
	const db = dbService.getDbServiceInstance();
	const result = db.insertStudent(request.body);
	result.then(data => response.json({success: true}))
	.catch(err=>console.log(err));
})

// Update Student
app.post('/updateStudent/:idStudent', (request, response) =>{
	const db = dbService.getDbServiceInstance();
	const idStudent = request.params.idStudent;
	const result = db.updateStudent(idStudent, request.body);
	result.then(data => response.json({success: true}))
	.catch(err=>console.log(err));
})

// delete Student
app.delete('/deleteStudent/:idStudent', (request, response) =>{
	const db = dbService.getDbServiceInstance();
	const idStudent = request.params.idStudent;
	const result = db.deleteStudent(idStudent);
	result.then(data => response.json({success: true}))
	.catch(err=>console.log(err));
})

// Get Professeurs
app.get('/getProfesseurs', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getProfesseursData();
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Matieres
app.get('/getMatieres', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getMatieresData();
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Insert Professeur
app.post('/insertProfesseur', (request, response) =>{
	const db = dbService.getDbServiceInstance();
	const result = db.insertProfesseur(request.body);
	result.then(data => response.json({success: true}))
	.catch(err=>console.log(err));
})

// Update Professeur
app.post('/updateProfesseur/:idProfesseur', (request, response) =>{
	const db = dbService.getDbServiceInstance();
	const idProfesseur = request.params.idProfesseur;
	const result = db.updateProfesseur(idProfesseur, request.body);
	result.then(data => response.json({success: true}))
	.catch(err=>console.log(err));
})

// get groups
app.get('/getGroups', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getGroupsData();
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Students by group
app.get('/getStudentsByGroup/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const idGroup = request.params.idGroup;
	const result = db.getStudentsByGroup(idGroup);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Formations of all groups
app.get('/getFormations', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getFormationsData();
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Formateurs by group
app.get('/getFormationByGroup/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const idGroup = request.params.idGroup;
	const result = db.getFormationByGroup(idGroup);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Dossier By Student
app.get('/getDossierByStudent/:idStudent', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const idStudent = request.params.idStudent;
	const result = db.getDossierByStudent(idStudent);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Insert Dossier
app.post('/insertDossier', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.insertDossier(request.body);
    result.then(data => response.json({ success: true, id: data }))
        .catch(err => console.log(err));
});


// Insert Sceance restant
app.post('/insertSeanceRestant', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.insertSceanceRestant(request.body);
	result.then(data => {response.json({ success: true , data: data})})
	.catch(err => {
		response.status(500).json({ success: false, error: err.message });
	  });
});

// Check available Group
app.get('/checkAvailableGroup/:idMatier/:idDossier', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const idMatier = request.params.idMatier;
	const idDossier = request.params.idDossier;
	const result = db.checkAvailableGroup(idMatier, idDossier);
	result.then(data => {
		response.json({data: data});
	})
	.catch(err => {
		response.status(500).json({ success: false, error: err.message });
	});
	
});

// Add dossier to group
app.post('/addDossierToGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.addDossierToGroup(request.body);
	result.then(data => response.json({ success: true }))
	.catch(err => {
		response.status(500).json({ success: false, error: err.message });
	  });
});

// Create new group
app.post('/createNewGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.createNewGroup(request.body);
	result.then(data => response.json({ success: true }))
	.catch(err => {
		response.status(500).json({ success: false, error: err.message });
	  });
});

// Get Infos for activated group
app.get('/getInfosForGroup/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const idGroup = request.params.idGroup;
	const result = db.getInfosForGroup(idGroup);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Prof For Group
app.get('/getProfForGroup/:idMatiere/:jour/:numSeance', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const idMatiere = request.params.idMatiere;
	const jour = request.params.jour;
	const numSeance = request.params.numSeance;
	const result = db.getProfForGroup(idMatiere, jour, numSeance);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Get Time for student's groups
app.get('/getTimeForStudent/:numDossier', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const numDossier = request.params.numDossier;
	const result = db.getTimeForStudent(numDossier);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

// Add Student to Inactive group
app.post('/addToInactiveGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.addToInactiveGroup(request.body);
	result.then(data => response.json({ success: true }))
	.catch(err => {
		response.status(500).json({ success: false, error: err.message });
	  });
});

// Insert Group
app.post('/insertGroup', (request, response) =>{
	const db = dbService.getDbServiceInstance();
	const result = db.insertGroup(request.body);
	result.then(data => response.json({success: true}))
	.catch(err=>console.log(err));
})

// Activate Group
app.post('/activateGroup', (request, response) =>{
	const db = dbService.getDbServiceInstance();
	const result = db.activateGroup(request.body);
	result.then(data => response.json({success: true}))
	.catch(err=>console.log(err));
})

// Select All Seances of a student
app.get('/getSeancesById/:idStudent/:formation', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const idStudent = request.params.idStudent;
	const formation = request.params.formation;
	const result = db.getSeancesById(idStudent, formation);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

//////////////////// LOGIN PART //////////////////////

// Login
app.post('/login', async (request, response) => {
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.login(request.body);
        if (result.success) {
            if (result.data === "admin") {
                response.json({ success: true, data: result.data, page: "./admin.html" });
            } else if (result.data === "prof") {
                response.json({ success: true, data: result.data, page: "./professeur.html", idProf: result.idProf });
            } else {
                response.json({ success: false });
            }
        } else {
            response.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


//////////////////// PROF PART //////////////////////

app.get('/getGroup/:idProf', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getGroups(request.params.idProf);
	result.then(data => response.json({data: data}))
	.catch(err=>console.log(err));
});

app.get('/getGroupData/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getGroupData(request.params.idGroup);
	result.then(data => response.json({data: data}))
	.catch(err=>console.log(err));
});

app.get('/getProfesseur/:idProf', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getProfesseur(request.params.idProf);
	result.then(data => response.json({data: data})).
	catch(err=>console.log(err));
});

app.get('/getEtudiants/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getEtudiants(request.params.idGroup);
	result.then(data => response.json({data: data}))
	.catch(err=>console.log(err));
});

app.get('/checkAbsence/:numDossier/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.checkAbsence(request.params.numDossier,request.params.idGroup);
	result.then(data => response.json({data: data}))
	.catch(err=>console.log(err));
});

app.get('/decreaceSeance/:numDossier/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.decreaceSeance(request.params.numDossier,request.params.idGroup);
	result.then(data => response.json({data: data}))
	.catch(err=>console.log(err));
});

app.get('/checkGroupEtat/:idGroup', (request, response) => {
	const db = dbService.getDbServiceInstance();
	const result = db.checkGroupEtat(request.params.idGroup);
	result.then(data => response.json({data: data}))
	.catch(err=>console.log(err));
});

app.listen(process.env.PORT, () => console.log('app is running'));