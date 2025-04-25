// API URL
const API_URL = "https://example.com/api/data"; // Cseréld ki a megfelelő API URL-re

// Adatok lekérése
function readData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const output = document.getElementById("data-output");
      const statistics = document.getElementById("statistics");
      output.innerHTML = "";
      let totalHeight = 0;
      let maxHeight = 0;

      data.forEach(item => {
        output.innerHTML += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}</p>`;
        totalHeight += item.height;
        if (item.height > maxHeight) maxHeight = item.height;
      });

      const averageHeight = (totalHeight / data.length).toFixed(2);
      statistics.innerHTML = `
        <p>Összeg: ${totalHeight}</p>
        <p>Átlag: ${averageHeight}</p>
        <p>Legnagyobb: ${maxHeight}</p>
      `;
    })
    .catch(error => console.error("Hiba az adatok lekérésekor:", error));
}

// Adat létrehozása
function createData() {
  const name = document.getElementById("create-name").value.trim();
  const height = parseInt(document.getElementById("create-height").value);

  if (!name || name.length > 30 || isNaN(height)) {
    alert("Érvénytelen adatok!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, height })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("create-feedback").innerText = "Adat sikeresen létrehozva!";
      readData();
    })
    .catch(error => console.error("Hiba az adat létrehozásakor:", error));
}

// Adatok betöltése ID alapján
function getDataForId() {
  const id = document.getElementById("update-id").value.trim();

  fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("update-name").value = data.name;
      document.getElementById("update-height").value = data.height;
    })
    .catch(error => console.error("Hiba az adatok betöltésekor:", error));
}

// Adat frissítése
function updateData() {
  const id = document.getElementById("update-id").value.trim();
  const name = document.getElementById("update-name").value.trim();
  const height = parseInt(document.getElementById("update-height").value);

  if (!name || name.length > 30 || isNaN(height)) {
    alert("Érvénytelen adatok!");
    return;
  }

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, height })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("update-feedback").innerText = "Adat sikeresen frissítve!";
      readData();
    })
    .catch(error => console.error("Hiba az adat frissítésekor:", error));
}

// Adat törlése
function deleteData() {
  const id = document.getElementById("delete-id").value.trim();

  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        document.getElementById("delete-feedback").innerText = "Adat sikeresen törölve!";
        readData();
      } else {
        throw new Error("Hiba az adat törlésekor");
      }
    })
    .catch(error => console.error("Hiba az adat törlésekor:", error));
}