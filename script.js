const chatform = document.getElementById('chatform');
const chatlog = document.getElementById('chatlog');

chatform.addEventListener('submit', async (e) => {
  e.preventDefault();

  const messageInput = document.getElementById('message');
  const modeSelect = document.getElementById('mode');
  const message = messageInput.value.trim();
  const mode = modeSelect.value;

  if (!message) return;

  // Affiche le message utilisateur
  appendMessage('user', message);

  // Vide l'input
  messageInput.value = '';
  messageInput.focus();

  // Envoie la requête à l'API Azopa
  try {
    const response = await fetch('http://localhost:3000/azopa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, mode })
    });

    if (!response.ok) throw new Error('Erreur API');

    const data = await response.json();
    appendMessage('bot', data.reply);

  } catch (error) {
    appendMessage('bot', "Oups, une erreur s'est produite. Essaie plus tard !");
    console.error(error);
  }
});

// Fonction pour ajouter un message dans le chatlog
function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'user-msg' : 'bot-msg';
  div.textContent = text;
  chatlog.appendChild(div);
  chatlog.scrollTop = chatlog.scrollHeight;
}
