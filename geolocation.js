function getLocation() {
  const output = document.getElementById("location-output");

  if (!navigator.geolocation) {
    output.innerText = "A böngésződ nem támogatja a Geolocation API-t.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      output.innerText = `Szélesség: ${latitude}, Hosszúság: ${longitude}`;
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          output.innerText = "A helymeghatározás engedélye megtagadva.";
          break;
        case error.POSITION_UNAVAILABLE:
          output.innerText = "A helyzet nem elérhető.";
          break;
        case error.TIMEOUT:
          output.innerText = "A helymeghatározás időtúllépés miatt sikertelen.";
          break;
        default:
          output.innerText = "Ismeretlen hiba történt.";
      }
    }
  );
}