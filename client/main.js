import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const getUsername = async () => {
  const username = localStorage.getItem("username")
  if (username) {
    console.log(`User existed ${username}`);
  }

  const res = await fetch("https://random-data-api.com/api/users/random_user");
  const { username: randomUsername } = await res.json();

  localStorage.setItem('username', randomUsername)
  return randomUsername
}

const socket = io({
  auth: {  
    username: await getUsername(),
    serverOffset: 0
  }
});

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");


socket.on("chat message", (msg, serverOffset) => {
  const item = `<li><p>${msg}</p><small>${username}</small></li>`;
  messages.insertAdjacentHTML("beforeend", item);
  socket.auth.serverOffset = serverOffset
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});
