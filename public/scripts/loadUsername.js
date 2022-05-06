$.ajax("/users").then((res) => {
  let username = res["user"][0]["name"];
  $("#login-name").html(username);
  $("#login-name").attr("href", "/profile");
});
