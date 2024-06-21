const mysql = require('mysql');
const dotenv = require('dotenv');
const emailjs = require('@emailjs/nodejs');
const nodemailer = require('nodemailer');
(function(){
	emailjs.init("2ZMh5nkPpK_3p-7ia");
 })();
let instance = null;

dotenv.config();
const connection = mysql.createConnection({
	host: process.env.HOST,
	user: 'sql8670602',
	password: process.env.PASSWORD,
	database: process.env.DATABASE
})

// Generate Password
function generatePassword(length) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
	let password = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset.charAt(randomIndex);
	}

	return password;
}

const sendemail = function(password, email, firstName, lastName) {
	const templateParams = {
	  from_name : 'OAMA' ,
	  name_prof: firstName + " " + lastName,
	  to_email : email,
	  password_prof: password,
	}
	const nodemailer = require('nodemailer');

	const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'oamaformation@gmail.com',
		pass: 'uunp liym tidv nlxw',
	},
	});

	const mailOptions = {
	from: 'oamaformation@gmail.com',
	to: email,
	subject: 'Informatoins de connection de votre compte OAMA',
	text: `
		Hello Monsieur ${firstName + " " + lastName},

		You got a new message from OAMA:

		Your account'email: ${email}

		Your account's password: ${password}

		Best wishes,
		OAMA team`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.error(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
	});

	console.log("E-mail sent successfully:");
}
  
connection.connect((err=>{
	if (err)
		console.log(err.message);
	console.log('db ' + connection.state);
}));

class DbService {
	static getDbServiceInstance(){
		return instance ? instance : new DbService();
	}
	// Get Students
	async getStudentsData() {
		try {
			const response =  await new Promise((resolve, reject)=>{
				const query = "SELECT * FROM Etudiant";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;

		} catch (error) {
			console.log(error);
		}
	}

	// Get Dossiers
	async getDossiersData() {
		try {
			const response =  await new Promise((resolve, reject)=>{
				const query = "SELECT * FROM Dossier";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;

		} catch (error) {
			console.log(error);
		}
	}

	// Insert Student
	async insertStudent(Etudiant) {
		try {
		  const insertId = await new Promise((resolve, reject) => {
			const query = "INSERT INTO Etudiant (Prenom, Nom, DateNaissance, Telephone, Quartier, Ville, Mail, Niveau) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			connection.query(query, [
			  Etudiant.Prenom,
			  Etudiant.Nom,
			  Etudiant.DateNaissance,
			  Etudiant.Telephone,
			  Etudiant.Quartier,
			  Etudiant.Ville,
			  Etudiant.Mail,
			  Etudiant.Niveau
			], (err, result) => {
			  if (err) reject(new Error(err.message));
			  if (result)
			  	resolve(result.insertId);
			});
		  });
		  return insertId;
		} catch (error) {
		  console.log(error);
		}
	}
	
	// Update Student
	async updateStudent(studentId, updatedStudent) {
		try {
		  const updateResult = await new Promise((resolve, reject) => {
			const query = "UPDATE Etudiant SET Prenom=?, Nom=?, DateNaissance=?, Telephone=?, Quartier=?, Ville=?, Mail=?, Niveau=? WHERE IdEtudiant=?";
			connection.query(query, [
			  updatedStudent.Prenom,
			  updatedStudent.Nom,
			  updatedStudent.DateNaissance,
			  updatedStudent.Telephone,
			  updatedStudent.Quartier,
			  updatedStudent.Ville,
			  updatedStudent.Mail,
			  updatedStudent.Niveau,
			  studentId
			], (err, result) => {
			  if (err) reject(new Error(err.message));
			  resolve(result);
			});
		  });
	  
		  return updateResult;
		} catch (error) {
		  console.log(error);
		}
	}

	//Delete Student
	async deleteStudent(studentId) {
		try {
			// Select the groups
			const selectGroupsQuery = "SELECT DISTINCT Groupe.Id_Group FROM Groupe INNER JOIN Seance ON Groupe.Id_Group = Seance.Id_Group INNER JOIN Dossier ON Seance.Num_Dossier = Dossier.numDossier WHERE Dossier.IdEtudiant = ?";
			const groupIds = await new Promise((resolve, reject) => {
				connection.query(selectGroupsQuery, [Number(studentId)], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results.map(result => result.Id_Group));
				});
			});
			// Delete student from Seance table
			await new Promise((resolve, reject) => {
				const deleteSeanceQuery = "DELETE FROM Seance WHERE Num_Dossier IN (SELECT numDossier FROM Dossier WHERE IdEtudiant = ?)";
				connection.query(deleteSeanceQuery, [studentId], (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});

			// Delete student from Seance_restant table
			await new Promise((resolve, reject) => {
				const deleteSeancesRestantQuery = "DELETE FROM Seance_restant WHERE numDossier IN (SELECT numDossier FROM Dossier WHERE IdEtudiant = ?)";
				connection.query(deleteSeancesRestantQuery, [studentId], (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});

			// Delete student from Dossier table
			await new Promise((resolve, reject) => {
				const deleteDossiersQuery = "DELETE FROM Dossier WHERE IdEtudiant = ?";
				connection.query(deleteDossiersQuery, [studentId], (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});
			// Update the number of students in the corresponding groups
			if (groupIds.length > 0) {
				const updateGroupStudentsQuery = "UPDATE Groupe SET nbr_Etudiant = nbr_Etudiant - 1 WHERE Id_Group IN (?)";
				await new Promise((resolve, reject) => {
					connection.query(updateGroupStudentsQuery, [groupIds], (err, result) => {
						if (err) reject(new Error(err.message));
						resolve(result);
					});
				});
			}

			// Check if nbr_Etudiant is 0 for any group and delete it
			await new Promise((resolve, reject) => {
				const deleteEmptyGroupsQuery = "DELETE FROM Groupe WHERE Id_Group IN (SELECT * FROM (SELECT Id_Group FROM Groupe WHERE nbr_Etudiant = 0) AS subquery)";
				connection.query(deleteEmptyGroupsQuery, (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});

			// Delete student from Etudiant table
			const deleteStudentResult = await new Promise((resolve, reject) => {
				const deleteStudentQuery = "DELETE FROM Etudiant WHERE IdEtudiant = ?";
				connection.query(deleteStudentQuery, [studentId], (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});

			return deleteStudentResult;
		} catch (error) {
			console.log(error);
		}
	}

	// Get Professeurs
	async getProfesseursData() {
		try {
			const response =  await new Promise((resolve, reject)=>{
				const query = "SELECT * FROM Professeur";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;

		} catch (error) {
			console.log(error);
		}
	}

	// Get Matieres
	async getMatieresData() {
		try {
			const response =  await new Promise((resolve, reject)=>{
				const query = "SELECT * FROM Matiere";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;

		} catch (error) {
			console.log(error);
		}
	}

	// Insert Professeur
	async insertProfesseur(Professeur) {
		try {
			const insertId = await new Promise((resolve, reject) => {
				const password = generatePassword(10);
				const query = "INSERT INTO Professeur (Prenom, Nom, Date_Naissance, Telephone, Email, Ville, Quartier, Matiere, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
				const values = [
					Professeur.Prenom,
					Professeur.Nom,
					Professeur.Date_Naissance,
					Professeur.Telephone,
					Professeur.Email,
					Professeur.Ville,
					Professeur.Quartier,
					Professeur.Matiere,
					password
				];
				connection.query(query, values, (err, result) => {
					sendemail(password, Professeur.Email, Professeur.Prenom, Professeur.Nom);
					if (err) reject(err);
					if (result) resolve(result.insertId);
				});
			});
			return insertId;
		} catch (error) {
			throw error;
		}
	}

	// Update Professeur
	async updateProfesseur(professeurId, updatedProfesseur) {
		try {
			const updateResult = await new Promise((resolve, reject) => {
				const query = "UPDATE Professeur SET Prenom=?, Nom=?, Date_Naissance=?, Telephone=?, Email=?, Ville=?, Quartier=? WHERE Matricule=?";
				const values = [
					updatedProfesseur.Prenom,
					updatedProfesseur.Nom,
					updatedProfesseur.Date_Naissance,
					updatedProfesseur.Telephone,
					updatedProfesseur.Email,
					updatedProfesseur.Ville,
					updatedProfesseur.Quartier,
					parseInt(professeurId)
				];
				connection.query(query, values, (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});
			return updateResult;
		} catch (error) {
			throw error;
		}
	}

	// Get Groups
	async getGroupsData() {
		try {
			const response =  await new Promise((resolve, reject)=>{
				const query = "SELECT * FROM Groupe";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;

		} catch (error) {
			console.log(error);
		}
	}

	// get Students By Group
	async getStudentsByGroup(groupId) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT Etudiant.IdEtudiant,Etudiant.Nom, Etudiant.Prenom, Etudiant.Niveau, Dossier.numDossier FROM Seance JOIN Dossier ON Dossier.numDossier = Seance.Num_Dossier JOIN Etudiant ON Dossier.IdEtudiant = Etudiant.IdEtudiant WHERE Seance.Id_Group =?;";
				connection.query(query, [groupId], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Get Formation of all groups
	async getFormationsData() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "select DISTINCT Dossier.TypeFormation, Groupe.Id_Group from Dossier,Groupe,Seance where   Dossier.`numDossier`=Seance.`Num_Dossier` AND Seance.`Id_Group`=Groupe.`Id_Group`";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Get Formation By Group
	async getFormationByGroup(groupId) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "select DISTINCT Dossier.TypeFormation, Groupe.Id_Group from Dossier,Groupe,Seance where   Dossier.`numDossier`=Seance.`Num_Dossier` AND Seance.`Id_Group`=Groupe.`Id_Group` AND Groupe.Id_Group = ?";
				connection.query(query, [groupId], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Get Dossier By Student
	async getDossierByStudent(studentId) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM Dossier WHERE IdEtudiant = ?";
				connection.query(query, [studentId], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Insert Dossier
	async insertDossier(Dossier) {
		try {
			const insertId = await new Promise((resolve, reject) => {
				const query = "INSERT INTO Dossier (IdEtudiant, TypeFormation) VALUES (?, ?)";
				const values = [
					Dossier.IdEtudiant,
					Dossier.TypeFormation
				];
				connection.query(query, values, (err, result) => {
					if (err) reject(err);
					if (result) resolve(result.insertId);
				});
			});
			return insertId;
		} catch (error) {
			throw error;
		}
	}

	// Insert Seance restant
	async insertSceanceRestant(seance) {
		try {
			let isNew = 0;
			const existingSeance = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM Seance_restant WHERE numDossier = ? AND IdMatiere = ?";
				const values = [seance.numDossier, seance.IdMatiere];
				connection.query(query, values, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});

			if (existingSeance.length > 0) {
				const updateId = await new Promise((resolve, reject) => {
					const query = "UPDATE Seance_restant SET NbrSeanceRestant = NbrSeanceRestant + ? WHERE numDossier = ? AND IdMatiere = ?";
					const values = [seance.NbrSeance, seance.numDossier, seance.IdMatiere];
					connection.query(query, values, (err, result) => {
						if (err) reject(err);
						if (result) resolve(result.insertId);
					});
				});
				return {updateId, isNew};
			} else {
				isNew = 1;
				const insertId = await new Promise((resolve, reject) => {
					const query = "INSERT INTO Seance_restant (numDossier, IdMatiere, NbrSeanceRestant) VALUES (?, ?, ?)";
					const values = [seance.numDossier, seance.IdMatiere, seance.NbrSeance];
					connection.query(query, values, (err, result) => {
						if (err) reject(err);
						if (result) resolve(result.insertId);
					});
				});
				return {insertId, isNew};
			}
		} catch (error) {
			throw error;
		}
	}

	// Check available Group
	async checkAvailableGroup(IdMatiere, Num_Dossier) {
		try {
			const niveau = await new Promise((resolve, reject) => {
				const query = "SELECT Niveau FROM Etudiant WHERE IdEtudiant = (SELECT IdEtudiant FROM Dossier WHERE numDossier = ?);";
				connection.query(query, [Num_Dossier], (err, result) => {
					if (err) reject(new Error(err.message));
					if (result.length > 0)
						resolve(result[0]?.Niveau);
				});
			});

			const response = await new Promise((resolve, reject) => {
				const query = "select distinct Groupe.Id_Group, Groupe.Jour_seance, Groupe.Num_seance from Groupe, Seance, Dossier, Etudiant where Groupe.Id_Group=Seance.Id_Group AND Seance.Num_Dossier = Dossier.numDossier and Dossier.IdEtudiant = Etudiant.IdEtudiant and Groupe.Statut= 'Active' and Groupe.Id_Matier= ? and Groupe.nbr_Etudiant > 3 and Groupe.nbr_Etudiant < 8 and Etudiant.Niveau = ?";
				const values = [IdMatiere, niveau];
				connection.query(query, values, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Get Time for student's groups
	async getTimeForStudent(NumDossier) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT Groupe.Num_seance,Groupe.Jour_seance FROM Groupe,Seance,Dossier WHERE Dossier.numDossier=Seance.Num_Dossier AND Seance.Id_Group=Groupe.Id_Group AND Dossier.numDossier = ?;";
				connection.query(query, [NumDossier], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Add dossier to group
	async addDossierToGroup(seance) {
		try {
			const updateResult = await new Promise((resolve, reject) => {
				const query = "UPDATE Groupe SET nbr_Etudiant = nbr_Etudiant + 1 WHERE Id_Group = ?";
				connection.query(query, [seance.Id_Group], async (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});
			await new Promise((resolve, reject) => {
				console.log(seance);
				const query = "INSERT INTO Seance (Id_Group, Num_Dossier, Nbr_Abscence) VALUES (?, ?, ?)";
				const values = [seance.Id_Group, seance.Id_Dossier, 0];
				connection.query(query, values, (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});

			return updateResult;
		} catch (error) {
			throw error;
		}
	}

	// Add Student to Inactive group
	async addToInactiveGroup(seance) {
		try {
			const niveau = await new Promise((resolve, reject) => {
				const query = "SELECT Niveau FROM Etudiant WHERE IdEtudiant = (SELECT IdEtudiant FROM Dossier WHERE numDossier = ?);";
				connection.query(query, [seance.Num_Dossier], (err, result) => {
					if (err) reject(new Error(err.message));
					if (result.length > 0)
						resolve(result[0]?.Niveau);
				});
			});

			let group = await new Promise((resolve, reject) => {
				const query = "Select Distinct Groupe.Id_Group FROM Groupe,Etudiant,Dossier,Seance,Seance_restant,Matiere where Dossier.IdEtudiant=Etudiant.IdEtudiant AND Dossier.numDossier = Seance_restant.numDossier AND Dossier.numDossier = Seance.Num_Dossier AND Seance.Id_Group = Groupe.Id_Group AND Seance_restant.IdMatiere=Groupe.Id_Matier AND Groupe.Statut = 'Inactive' AND Etudiant.Niveau= ? AND Groupe.id_Matier = ?";
				connection.query(query, [niveau, seance.Id_Matier], (err, result) => {
					if (err) reject(err);
					resolve(result[0]);
				});
			});

			let updateResult;
			if (group) {
				const groupId = group.Id_Group;
				updateResult = await new Promise((resolve, reject) => {
					const query = "UPDATE Groupe SET nbr_Etudiant = nbr_Etudiant + 1 WHERE Id_Group = ?";
					connection.query(query, [groupId], (err, result) => {
						if (err) reject(err);
						resolve(result);
					});
				});
			}

			else {
				const insertId = await new Promise((resolve, reject) => {
					const query = "INSERT INTO Groupe (Id_Matier, Statut, nbr_Etudiant) VALUES (?, ?, ?)";
					const values = [seance.Id_Matier, 'Inactive', 1];
					connection.query(query, values, (err, result) => {
						if (err) reject(err);
						if (result) resolve(result.insertId);
					});
				});

				group = { Id_Group: insertId };
			}

			const insertResult = await new Promise((resolve, reject) => {
				const query = "INSERT INTO Seance (Id_Group, Num_Dossier, Nbr_Abscence) VALUES (?, ?, ?)";
				const values = [group.Id_Group, seance.Num_Dossier, 0];
				connection.query(query, values, (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});

			return { updateResult, insertResult };
		} catch (error) {
			throw error;
		}
	}

	// insertGroup
	async insertGroup(group) {
		try {
			const insertId = await new Promise((resolve, reject) => {
				const query = "INSERT INTO Groupe (Id_Matier, Statut, nbr_Etudiant) VALUES (?, ?, ?)";
				const values = [
					group.Id_Matier,
					'Inactive',
					1
				];
				connection.query(query, values, (err, result) => {
					if (err) reject(err);
					if (result) resolve(result.insertId);
				});
			});
			return insertId;
		} catch (error) {
			throw error;
		}
	}

	// Get Infos for group
	async getInfosForGroup(idGroup) {
		try {
			const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
			const result = [];

			for (let i = 0; i < days.length; i++) {
				for (let j = 1; j <= 6; j++) {
					for (let k = 1; k <= 2; k++) {
						const query = "SELECT Groupe.Id_Group FROM Groupe WHERE Groupe.Jour_seance=? AND Groupe.Num_seance=? AND Groupe.Num_Salle=?";
						const values = [days[i], j, k];
						const rows = await new Promise((resolve, reject) => {
							connection.query(query, values, (err, result) => {
								if (err) reject(err);
								resolve(result);
							});
						});
						if (rows.length === 0) {
							result.push({ Jour_seance: days[i], numSalle: j, Num_seance: k });
						}
					}
				}
			}

			const studentsDates = "SELECT Groupe.Jour_seance, Groupe.Num_seance FROM Groupe, Seance, Dossier WHERE Dossier.IdEtudiant IN (SELECT Dossier.IdEtudiant FROM Dossier, Groupe, Seance WHERE Seance.Id_Group=?) AND Dossier.numDossier=Seance.Num_Dossier AND Seance.Id_Group=Groupe.Id_Group";
			const studentsResults = [idGroup];
			const studentsRows = await new Promise((resolve, reject) => {
				connection.query(studentsDates, studentsResults, (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});

			const formattedResult = result.map(row => ({ Jour_seance: row.Jour_seance, numSalle: row.numSalle, Num_seance: row.Num_seance }));
			const difference = formattedResult.filter(row => !studentsRows.some(studentRow => studentRow.Jour_seance === row.Jour_seance && studentRow.Num_seance === row.Num_seance));
			const firstDifference = difference.shift();

			return firstDifference;
		} catch (error) {
			console.log(error);
		}
	}

	// Activate Group
	async activateGroup(group) {
		try {
			const affectedRows = await new Promise((resolve, reject) => {
				const query = "UPDATE Groupe SET Statut = ?, Matricule = ?, Num_Salle = ?, Jour_seance = ?, Num_seance = ? WHERE Id_Group = ?";
				const values = [
					'Active',
					group.Matricule,
					group.Num_Salle,
					group.Jour_seance,
					group.Num_seance,
					group.groupId
				];
				connection.query(query, values, (err, result) => {
					if (err) reject(err);
					if (result) resolve(result.affectedRows);
				});
			});
			return affectedRows;
		} catch (error) {
			throw error;
		}
	}

	// Check Avaialble Time for all Students
	async checkAvailableTimeForAllStudents(idGroup) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "select Groupe.Jour_seance,Groupe.Num_seance FROM Groupe,Seance,Dossier WHERE Dossier.IdEtudiant IN (select Dossier.IdEtudiant FROM Dossier,Groupe,Seance where Seance.Id_Group= ?) AND Dossier.numDossier=Seance.Num_Dossier AND Seance.Id_Group=Groupe.Id_Group"; 
				connection.query(query, [idGroup], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Get Prof For Group
	async getProfForGroup(idMatiere, Jour, Num_Seance) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = `
					SELECT Professeur.Matricule
					FROM Professeur
					WHERE Professeur.Matiere = ? 
					AND Professeur.Matricule NOT IN (
						SELECT DISTINCT Groupe.Matricule
						FROM Groupe, Professeur
						WHERE Professeur.Matiere = ?
						AND Groupe.Jour_seance = ?
						AND Groupe.Num_seance = ?
					)
					AND (
						SELECT COUNT(*)
						FROM Groupe
						WHERE Groupe.Matricule = Professeur.Matricule
					) < 3
					LIMIT 1
				`;
				const values = [idMatiere, idMatiere, Jour, Num_Seance];
				connection.query(query, values, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	// Get All seances Of A student
	async getSeancesById(IdEtudiant, typeF) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT DISTINCT Groupe.Id_Group,Matiere.Nom_Matier,Seance_restant.NbrSeanceRestant FROM Groupe,Matiere,Seance,Dossier,Seance_restant WHERE Dossier.IdEtudiant= ? AND Dossier.numDossier = Seance.Num_Dossier AND Seance.Id_Group=Groupe.Id_Group AND Dossier.numDossier = Seance_restant.numDossier AND Seance_restant.IdMatiere = Matiere.Id_Matier AND Groupe.Id_Matier=Matiere.id_Matier AND Dossier.TypeFormation = ?;";
				connection.query(query, [IdEtudiant, typeF], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	///////////////////////////// Login /////////////////////////////

	// Login
	async login(data) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM Professeur WHERE Email = ? AND Password = ?";
				const values = [data.email, data.password];
				connection.query(query, values, (err, result) => {
					if (err) reject(err);
					if (result.length > 0) {
						resolve({ success: true, data: "prof", page: process.env.PROF_PAGE , idProf: result[0].Matricule});
					} else {
						const adminEmail = process.env.ADMIN_EMAIL;
						const adminPassword = process.env.ADMIN_PASSWORD;
	
						if (data.email === adminEmail && data.password === adminPassword) {
							resolve({ success: true, data: "admin", page: process.env.ADMIN_PAGE});
						} else {
							resolve({ success: false });
						}
					}
				});
			});
			return response;
		} catch (error) {
			throw error;
		}
	}

	//////////////////// PROF PART //////////////////////

	async getGroups(id_prof) {
		try{
			const response = await new Promise((resolve, reject)=>{
				const query = "SELECT DISTINCT Groupe.Jour_seance,Groupe.Num_seance,Groupe.Matricule,Matiere.Nom_Matier,Groupe.Jour_seance,Groupe.Num_seance,Groupe.Id_Group,Groupe.nbr_Etudiant,Groupe.Statut,Dossier.TypeFormation FROM Groupe,Matiere,Seance,Dossier WHERE Seance.Num_Dossier= Dossier.numDossier AND Groupe.Id_Matier=Matiere.Id_Matier AND Groupe.Id_Group=Seance.Id_Group AND Groupe.Matricule=?;";
				connection.query(query,id_prof, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;
		}
		catch(error){
			console.log(error);
		}
	}

	async getGroupData(id_group) {
		try{
			const response = await new Promise((resolve, reject)=>{
				const query = "SELECT Groupe.Id_Group, Etudiant.IdEtudiant, Etudiant.Nom AS nomEtudiant, Etudiant.Prenom AS prenomEtudant, Dossier.numDossier, Groupe.Id_Matier, Dossier.TypeFormation, Professeur.Nom AS nomProfesseur, Professeur.Prenom AS prenomProfesseur, Groupe.nbr_Etudiant, Groupe.Statut, Groupe.Jour_seance, Groupe.Num_seance, Groupe.Num_Salle, Seance_restant.NbrSeanceRestant FROM Seance JOIN Dossier ON Dossier.numDossier = Seance.Num_Dossier JOIN Etudiant ON Dossier.IdEtudiant = Etudiant.IdEtudiant JOIN Groupe ON Groupe.Id_Group = Seance.Id_Group JOIN Professeur ON Professeur.Matricule = Groupe.Matricule JOIN Seance_restant ON Seance_restant.numDossier = Dossier.numDossier WHERE Seance.Id_Group = ? AND Seance_restant.IdMatiere = Groupe.Id_Matier AND Seance_restant.NbrSeanceRestant > 0;";
				connection.query(query,id_group, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;
		}
		catch(error){
			console.log(error);
		}
	}

	async getProfesseur(id_prof) {
		try{
			const response = await new Promise((resolve, reject)=>{
				const query = "select * from Professeur WHERE Matricule = ?;";
				connection.query(query,id_prof, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;
		}
		catch(error){
			console.log(error);
		}
	}

	async getEtudiants(id_group) {
		try{
			const response = await new Promise((resolve, reject)=>{
				const query = "SELECT Etudiant.IdEtudiant, Etudiant.Nom, Etudiant.Prenom, Dossier.numDossier FROM Seance JOIN Dossier ON Dossier.numDossier = Seance.Num_Dossier JOIN Etudiant ON Dossier.IdEtudiant = Etudiant.IdEtudiant JOIN Seance_restant ON Seance_restant.numDossier = Dossier.numDossier WHERE Seance.Id_Group = ? AND Seance_restant.IdMatiere = (SELECT Id_Matier from Groupe WHERE Id_Group = ?) AND Seance_restant.NbrSeanceRestant > 0;";
				connection.query(query,[id_group,id_group], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;
		}
		catch(error){
			console.log(error);
		}
	}

	async checkAbsence(numDossier,idGroup) {
		try{
			const response = await new Promise((resolve, reject)=>{
				const query = "UPDATE Seance_restant SET NbrSeanceRestant = NbrSeanceRestant - 1 WHERE (SELECT Nbr_Abscence FROM `Seance` WHERE `Id_Group`= ? AND `Num_Dossier` = ?)>0 AND NbrSeanceRestant > 0  AND IdMatiere = (SELECT Id_Matier from Groupe WHERE Id_Group = ?) AND `numDossier` = ?;";
				connection.query(query,[idGroup,numDossier,idGroup,numDossier], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			const updateQuery = "UPDATE Seance SET Nbr_Abscence = Nbr_Abscence + 1 WHERE Id_Group = ? AND Num_Dossier = ?;";
			connection.query(updateQuery,[idGroup,numDossier], (err, results) => {
				if (err) console.log(err.message);
			})

			return response;
		}
		catch(error){
			console.log(error);
		}
	}

	async decreaceSeance(numDossier,idGroup) {
		try{
			const response = await new Promise((resolve, reject)=>{
				const query = "UPDATE Seance_restant SET NbrSeanceRestant = NbrSeanceRestant - 1 WHERE NbrSeanceRestant > 0  AND IdMatiere = (SELECT Id_Matier from Groupe WHERE Id_Group = ?) AND numDossier = ?;";
				connection.query(query,[idGroup,numDossier], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;
		}
		catch(error){
			console.log(error);
		}
	}

	async checkGroupEtat(idGroup) {
		try{
			const response = await new Promise((resolve, reject)=>{
				const query = "UPDATE Groupe SET Statut = 'Inactive' WHERE (SELECT COUNT(numDossier) FROM (SELECT numDossier FROM Seance_restant WHERE IdMatiere = (SELECT Id_Matier FROM Groupe WHERE Id_Group = ?) AND numDossier IN (SELECT Num_Dossier FROM Seance WHERE Id_Group = ?) AND NbrSeanceRestant > 0) AS subquery) = 0;";
				connection.query(query,[idGroup,idGroup], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			})
			return response;
		}
		catch(error){
			console.log(error);
		}
	}
}
module.exports = DbService;