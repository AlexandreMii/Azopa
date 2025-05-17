let mode = "sage";

const responses = {
  sage: [
    "La sagesse réside dans la compréhension, pas dans la réponse immédiate.",
    "Respire un instant. La réflexion apporte clarté.",
    "Je suis là pour t'aider à voir plus loin."
  ],
  dynamique: [
    "Allez, on y va ! Rien ne peut t’arrêter ! 💪",
    "C’est le moment d’explorer de nouvelles idées ! 🚀",
    "Tu vas tout déchirer ! 🔥"
  ],
  social: [
    "Trop cool de te parler 😄 ! Tu veux discuter de quoi ?",
    "On va rigoler un peu ? 😎",
    "Dis-moi tout, j’adore les potins 👀"
  ]
};

function setMode(newMode) {
  mode = newMode;
  addMessage("Azopa", `🔄 Mode changé : ${mode.toUpperCase()}`);
}

function addMessage(sender, message) {
  const chat = document.getElementById("chat");
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "Toi" ? "text-right mb-2" : "text-left mb-2";
  msgDiv.innerHTML = `<span class="font-bold">${sender}:</span> ${message}`;
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById("chatForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("Toi", text);
  input.value = "";

  const replyList = responses[mode];
  const reply = replyList[Math.floor(Math.random() * replyList.length)];
  setTimeout(() => addMessage("Azopa", reply), 600);
});

const form = document.getElementById("chatform");
const chatlog = document.getElementById("chatlog");
const typing = document.getElementById("typing");
const darkToggle = document.getElementById("darkmode");

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkToggle.checked);
});

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("bubble", sender === "user" ? "user-msg" : "bot-msg");
  div.textContent = text;
  chatlog.appendChild(div);
  chatlog.scrollTop = chatlog.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = document.getElementById("message").value;
  const mode = document.getElementById("mode").value;

  appendMessage("user", message);
  document.getElementById("message").value = "";
  typing.style.display = "block";

  try {
    const res = await fetch("http://localhost:3000/azopa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, mode }),
    });

    const data = await res.json();
    typing.style.display = "none";
    appendMessage("bot", data.reply);
  } catch (err) {
    typing.style.display = "none";
    appendMessage("bot", "Erreur : impossible de contacter Azopa.");
  }
});
// Ajout d'un événement pour le bouton "Envoyer"
document.getElementById("sendButton").addEventListener("click", function () {
  form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
});