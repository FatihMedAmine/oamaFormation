const cityElement = document.getElementById("Ville");
const loader = document.querySelector(".loader-container");
const formAddStudent = document.querySelector("form");

// fetch moroccan cities
async function fetchMoroccanCities() {
  const username = "oamaformation"; // Replace with your Geonames username
  const url = `http://api.geonames.org/searchJSON?country=MA&featureClass=P&maxRows=1000&username=${username}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const cities = data.geonames.map((city) => city.toponymName);

    // fill cities in the select element
    cities.forEach((city) => {
      const option = document.createElement("option");
      option.textContent = city;
      cityElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}

// Call the function to fetch and display the cities
fetchMoroccanCities();

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

//add student

formAddStudent.addEventListener("submit", async function (e) {
  e.preventDefault();

  const student = {
    firstname: document.getElementById("first-name").value,
    lastname: document.getElementById("last-name").value,
    dateNaissance: document.getElementById("date-naissance").value,
    phoneNumber: document.getElementById("phone-number").value,
    city: document.querySelector("select").value,
    email: document.getElementById("email").value,
  };
  console.log(student);
  axios
    .post("/addStudent", student)
    .then((response) => {
      console.log(response);
      alert("Student added successfully");
      formAddStudent.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while adding the student");
    });
});
