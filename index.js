const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const conversationMemory = {}; // { ip: [ { role: 'user', content }, ... ] }

function getBotReply(message, mode) {
  const lower = message.toLowerCase();

  if (lower.includes("bonjour") || lower.includes("salut")) {
    return {
      sage: "Bonjour, je suis Azopa. Comment puis-je t’éclairer aujourd’hui ? 🧠",
      dynamique: "Hey ! Content de te revoir ! Qu’est-ce qu’on fait aujourd’hui ? 🚀",
      social: "Coucou ! On papote ? 😄",
    }[mode] || "Salut ! Comment puis-je t’aider ?";
  }

  if (lower.includes("conseil") || lower.includes("aide")) {
    return {
      sage: "Je te conseille de toujours réfléchir avant d’agir. La sagesse est la clé. 🔍",
      dynamique: "Lance-toi ! Parfois il faut juste foncer, tu verras bien ! 💥",
      social: "Tu veux en parler ? Je suis là pour t’écouter. 💬",
    }[mode] || "Je suis là pour t’aider. Dis-moi tout.";
  }

  return {
    sage: "Hmm… c’est une question intéressante. Je vais y réfléchir sérieusement. 🤔",
    dynamique: "Bam ! Voilà une réponse pleine d'énergie, même si je sais pas tout ! ⚡",
    social: "Haha ! J’aime bien discuter de ça, continue ! 😄",
  }[mode] || "Désolé, je n’ai pas compris. Tu peux reformuler ?";
}

app.post("/azopa", (req, res) => {
  const { message, mode } = req.body;
  const ip = req.ip;

  if (!conversationMemory[ip]) {
    conversationMemory[ip] = [];
  }

  conversationMemory[ip].push({ role: "user", content: message });

  // Génère une réponse basée sur le mode
  const reply = getBotReply(message, mode);

  conversationMemory[ip].push({ role: "azopa", content: reply });

  res.json({ reply });
});

app.listen(port, () => {
  console.log(`✅ Azopa API est lancée sur http://localhost:${port}`);
});
    div.textContent = text;
    chatlog.appendChild(div);
    chatlog.scrollTop = chatlog.scrollHeight;
    typing.style.display = "none";
// }
