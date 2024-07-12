// Mendapatkan data sensor terbaru
fetch('http://localhost:5000/api/v1/multisensor')
  .then(response => response.json())
  .then(data => {
    const sensorData = data.response;

    // Mengambil data paling terbaru
    const latestData = sensorData[sensorData.length - 1];

    // Memperbarui nilai-nilai di halaman HTML
    if (document.getElementById('current-am')) {
      document.getElementById('current-am').textContent = latestData.sensor_amonia.toFixed(2);
    }
    if (document.getElementById('current-do')) {
      document.getElementById('current-do').textContent = latestData.sensor_do.toFixed(2);
    }
    if (document.getElementById('current-ph')) {
      document.getElementById('current-ph').textContent = latestData.sensor_ph.toFixed(2);
    }
    if (document.getElementById('current-temp')) {
      document.getElementById('current-temp').textContent = latestData.sensor_suhu.toFixed(2);
    }
    if (document.getElementById('current-a')) {
      document.getElementById('current-a').textContent = latestData.sensor_arus.toFixed(2);
    }
    if (document.getElementById('current-v')) {
      document.getElementById('current-v').textContent = latestData.sensor_tegangan.toFixed(2);
    }
    if (document.getElementById('current-tpanel')) {
      document.getElementById('current-tpanel').textContent = latestData.sensor_suhu_baterai.toFixed(2);
    }
  })
  .catch(error => console.error('Error:', error));

// Mengambil data untuk satu hari (day)
fetch('http://localhost:5000/api/v1/multisensor/day')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Array untuk menampung data sensor dalam 1 hari beserta waktu
    var amoniaDataArray = [];
    var doDataArray = [];
    var phDataArray = [];
    var tempDataArray = [];
    var arusDataArray = [];
    var teganganDataArray = [];
    var suhuBateraiDataArray = [];
    var labelsArray = [];

    // Memfilter data untuk mengambil nilai semua sensor
    data.response.forEach(entry => {
      amoniaDataArray.push(entry.sensor_amonia);
      doDataArray.push(entry.sensor_do);
      phDataArray.push(entry.sensor_ph);
      tempDataArray.push(entry.sensor_suhu);
      arusDataArray.push(entry.sensor_arus);
      teganganDataArray.push(entry.sensor_tegangan);
      suhuBateraiDataArray.push(entry.sensor_suhu_baterai);
      labelsArray.push(entry.waktu); // Menambahkan waktu ke dalam array label
    });

    // Lakukan apa pun yang diperlukan dengan data sensor dan waktu dalam array ini
    console.log('Amonia Data:', amoniaDataArray);
    console.log('DO Data:', doDataArray);
    console.log('pH Data:', phDataArray);
    console.log('Temperature Data:', tempDataArray);
    console.log('Arus Data:', arusDataArray);
    console.log('Tegangan Data:', teganganDataArray);
    console.log('Suhu Baterai Data:', suhuBateraiDataArray);
    console.log('Labels:', labelsArray);
  })
  .catch(error => console.error('Error fetching data from day endpoint:', error));

// Mengambil data untuk satu minggu (week)
fetch('http://localhost:5000/api/v1/multisensor/week')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Lakukan sesuatu dengan data dari endpoint week
    const sensorDataArray = data.response.map(entry => ({
      amonia: entry.sensor_amonia,
      do: entry.sensor_do,
      ph: entry.sensor_ph,
      temp: entry.sensor_suhu,
      arus: entry.sensor_arus,
      tegangan: entry.sensor_tegangan,
      suhu_baterai: entry.sensor_suhu_baterai,
      waktu: new Date(entry.waktu).toLocaleTimeString('en-US', {hour12: false}) // Mendapatkan jam pengambilan data dalam format 24 jam
    }));

    console.log('Weekly Sensor Data:', sensorDataArray);
  })
  .catch(error => console.error('Error fetching data from week endpoint:', error));

// Mengambil data untuk satu bulan (month)
fetch('http://localhost:5000/api/v1/multisensor/month')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Lakukan sesuatu dengan data dari endpoint month
    const sensorDataArray = data.response.map(entry => ({
      amonia: entry.sensor_amonia,
      do: entry.sensor_do,
      ph: entry.sensor_ph,
      temp: entry.sensor_suhu,
      arus: entry.sensor_arus,
      tegangan: entry.sensor_tegangan,
      suhu_baterai: entry.sensor_suhu_baterai,
      waktu: entry.waktu
    }));

    console.log('Monthly Sensor Data:', sensorDataArray);
  })
  .catch(error => console.error('Error fetching data from month endpoint:', error));
