function pesan() {
  const p = document.createElement("p");
  const p2 = document.createElement("p");
  const pesan = document.getElementById("pesan").value.trim();
  p.textContent = `[Kamu] >${pesan}`;
  document.getElementById("out").appendChild(p);
  p2.textContent = "sedang mengetik....";
  document.getElementById("out").appendChild(p2);

  geminiChatAi(pesan).then((balas) => {
    p2.textContent = `[AI]>${balas}`;
  });

  document.getElementById("pesan").value = "";
}
function geminiChatAi(prompt) {
  const apiKey = "Api-Key-Anda";
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("api eror :", data);
        return "gagal!";
      }
    })
    .catch((err) => console.error(err));
}