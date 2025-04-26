
const API_URL = "http://gamf.nhely.hu/ajax2/";
const USER_CODE = "HYZ9ZMkkm930"; 

function readData() {
    fetch(`${API_URL}?op=read&code=${USER_CODE}`)
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

function createData() {
  const name = document.getElementById("create-name").value.trim();
  const height = parseInt(document.getElementById("create-height").value);

  if (!name || name.length > 30 || isNaN(height)) {
    alert("Érvénytelen adatok!");
    return;
  }

    fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${USER_CODE}`
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("create-feedback").innerText = "Adat sikeresen létrehozva!";
      readData();
    })
    .catch(error => console.error("Hiba az adat létrehozásakor:", error));
}

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

function updateData() {
  const id = document.getElementById("update-id").value.trim();
  const name = document.getElementById("update-name").value.trim();
  const height = parseInt(document.getElementById("update-height").value);

  if (!name || name.length > 30 || isNaN(height)) {
    alert("Érvénytelen adatok!");
    return;
  }

    fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${USER_CODE}`
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("update-feedback").innerText = "Adat sikeresen frissítve!";
      readData();
    })
    .catch(error => console.error("Hiba az adat frissítésekor:", error));
}

function deleteData() {
  const id = document.getElementById("delete-id").value.trim();

    fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=delete&id=${id}&code=${USER_CODE}`
  })
    .catch(error => console.error("Hiba az adat törlésekor:", error));
}