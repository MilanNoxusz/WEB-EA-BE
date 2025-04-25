function saveName() {
  const name = document.getElementById('name').value.trim(); 
  if (!name) {
    alert('A név mező kitöltése kötelező!');
    return; 
  }
  localStorage.setItem('name', name);
  alert('Név elmentve!');
}

function loadName() {
  const name = localStorage.getItem('name');
  document.getElementById('output').innerText = name ? `Üdv, ${name}!` : 'Nincs mentett név.';
}