const formLogin = document.querySelector("form");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const data = { email, password };

  axios
    .post("/login", data)
    .then((res) => {
      console.log("voici response client");
      console.log(res.data);
      window.location.href = "/admin.html";
    })
    .catch((err) => {
        let alert = `<div class="alert alert-danger">
        <strong>Attention!</strong> votre email ou password est incorrect.
      </div>`;
        document.querySelector("#alert").innerHTML = alert;
        setTimeout(() => {
            document.querySelector("#alert").innerHTML = ""
        }, 3000)
    });
});
