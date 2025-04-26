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

      if (data.list && data.list.length > 0) {
        data.list.forEach(item => {
          output.innerHTML += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</p>`;
          totalHeight += parseInt(item.height);
          if (parseInt(item.height) > maxHeight) maxHeight = parseInt(item.height);
        });

        const averageHeight = (totalHeight / data.list.length).toFixed(2);
        statistics.innerHTML = `
          <p>Összeg: ${totalHeight}</p>
          <p>Átlag: ${averageHeight}</p>
          <p>Legnagyobb: ${maxHeight}</p>
        `;
      } else {
        output.innerHTML = "<p>Nincs megjeleníthető adat.</p>";
        statistics.innerHTML = "";
      }
    })
    .catch(error => console.error("Hiba az adatok lekérésekor:", error));
}

function createData() {
  const name = document.getElementById("create-name").value.trim();
  const height = parseInt(document.getElementById("create-height").value);
  const weight = parseInt(document.getElementById("create-weight").value);

  if (!name || name.length > 30 || isNaN(height) || isNaN(weight)) {
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

  if (!id) {
    alert("Az ID mező kitöltése kötelező!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=read&code=${USER_CODE}&id=${id}`
  })
    .then(response => response.json())
    .then(data => {
      if (data.list && data.list.length > 0) {
        const record = data.list[0];
        document.getElementById("update-name").value = record.name;
        document.getElementById("update-height").value = record.height;
        document.getElementById("update-weight").value = record.weight;
      } else {
        alert("Nem található adat az adott ID-hoz.");
      }
    })
    .catch(error => console.error("Hiba az adatok betöltésekor:", error));
}

function updateData() {
  const id = document.getElementById("update-id").value.trim();
  const name = document.getElementById("update-name").value.trim();
  const height = parseInt(document.getElementById("update-height").value);
  const weight = parseInt(document.getElementById("update-weight").value);

  if (!id || !name || name.length > 30 || isNaN(height) || isNaN(weight)) {
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

  if (!id) {
    alert("Az ID mező kitöltése kötelező!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=delete&id=${id}&code=${USER_CODE}`
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("delete-feedback").innerText = data === 1 ? "Adat sikeresen törölve!" : "Hiba az adat törlésekor.";
      readData();
    })
    .catch(error => console.error("Hiba az adat törlésekor:", error));
}