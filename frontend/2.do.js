document.addEventListener("DOMContentLoaded", function() {
  // Mendapatkan elemen chart
  var dissolvedChart = document.getElementById("do-chart");

  // Mendapatkan referensi ke tombol-tombol
  var dayButton = document.getElementById("day");
  var weekButton = document.getElementById("week");
  var monthButton = document.getElementById("month");
  var downloadButton = document.querySelector(".button-download-do");

  // Mendefinisikan lineChart
  var lineChart;

  // Membuat line chart saat halaman dimuat pertama kali dengan data satu hari
  lineChart = new Chart(dissolvedChart, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dissolved Oxygen (DO)',
        data: [],
        fill: true,
        borderColor: 'rgb(106, 173, 217)',
        tension: 0.1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'ppm'
          }
        },
      }
    }
  });

  // Memperbarui grafik untuk menampilkan data satu hari saat halaman dimuat
  fetchDataAndUpdateChart('day');

  // Fungsi untuk mengambil data dari backend dan memperbarui grafik
  function fetchDataAndUpdateChart(interval) {
    var apiUrl = '';
    if (interval === 'day') {
      apiUrl = 'http://103.175.219.33:5000/api/v1/multisensor/day'; // Ganti dengan endpoint untuk data harian
    } else if (interval === 'week') {
      apiUrl = 'http://103.175.219.33:5000/api/v1/multisensor/week'; // Ganti dengan endpoint untuk data mingguan
    } else if (interval === 'month') {
      apiUrl = 'http://103.175.219.33:5000/api/v1/multisensor/month'; // Ganti dengan endpoint untuk data bulanan
    }

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Membuat array untuk menampung data dissolved oxygen  dari database
        var dissolvedDataArray = [];
        var labelsArray = [];

        // Memfilter data untuk hanya mengambil nilai dissolved oxygen saja
        data.response.forEach(entry => {
          if (interval === 'day') {
            var time = new Date(entry.waktu);
            var formattedTime = time.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
            labelsArray.push(formattedTime);
            dissolvedDataArray.push(entry.sensor_do);
          } else if (interval === 'week') {
            var time = new Date(entry.min_waktu);
            var formattedTime = time.toLocaleDateString('en-US', {day: 'numeric', month: 'short'});
            labelsArray.push(formattedTime);
            dissolvedDataArray.push(entry.sensor_do_avg);
          } else if (interval === 'month') {
            // Menggunakan tanggal bulan sebagai label
            var date = new Date(entry.min_waktu);
            var monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            labelsArray.push(monthYear);
            dissolvedDataArray.push(entry.sensor_do_avg);
          }
        });

        // Update chart dengan data dissolved oxygen 
        updateChart(dissolvedDataArray, labelsArray);
      })
      .catch(error => console.error('Error fetching data:', error.message));
  }

  // Fungsi untuk mengubah data grafik berdasarkan tombol yang ditekan
function updateChart(dissolvedData, labels) {
  // Hitung nilai minimum dan maksimum dari data dissolved oxygen
  var minValue = Math.min(...dissolvedData);
  var maxValue = Math.max(...dissolvedData);

  // Update data pada chart dengan data dissolved oxygen yang baru
  lineChart.data.datasets[0].data = dissolvedData;
  lineChart.data.labels = labels;

  // Update skala sumbu Y
  lineChart.options.scales.y.min = minValue;
  lineChart.options.scales.y.max = maxValue;

  // Update grafik
  lineChart.update();
}


  // Menambahkan event listener untuk tombol "daily"
  dayButton.addEventListener("click", function() {
    fetchDataAndUpdateChart('day');
  });

  // Menambahkan event listener untuk tombol "weekly"
  weekButton.addEventListener("click", function() {
    fetchDataAndUpdateChart('week');
  });

  // Menambahkan event listener untuk tombol "monthly"
  monthButton.addEventListener("click", function() {
    fetchDataAndUpdateChart('month');
  });

  // Fungsi untuk mengunduh data dalam format Excel
  function downloadData(data) {
    // Mendefinisikan label untuk file CSV
    var csvLabels = "Waktu,Hasil Pengukuran\n";

    // Mendefinisikan data untuk file CSV
    var csvData = data.labels.map((label, index) => {
      return label + "," + data.datasets[0].data[index];
    }).join("\n");

    // Gabungkan label dan data CSV
    var csvContent = "data:text/csv;charset=utf-8," + csvLabels + csvData;

    // Proses membuat file Excel dan mengunduhnya
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dissolved_oxygen_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  // Menambahkan event listener untuk tombol "Download"
  downloadButton.addEventListener("click", function() {
    downloadData(lineChart.data);
  });
});
