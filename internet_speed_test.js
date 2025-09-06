/**
 * Projek ini adalah untuk mengukur kecepatan internet Unduh & Upload.
 * 
 * Run:
 * $ node internet_speed_test.js
 * 
 * Example:
 * Ifandika@AUSX441B-IFANDIKA MINGW64 /d/Projects/NodeJs
 * $ node internet_speed_test.js
 * Time (seconds) : 6.854s
 * Download (Bytes) : 370453
 * Download speed: 0.43 Mbps
 * 
 * https://ifandika.github.io/
 * @ifandika
 */

const https = require("https");

/**
 * Fungsi untuk mencari / mengukur kecepatan unduh
 * @param   url
 */
function measureDownloadSpeed(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    let downloadedBytes = 0;

    https.get(url, (res) => {
      res.on("data", (chunk) => {
        downloadedBytes += chunk.length;
      });
      
      res.on("end", () => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // seconds
        const bitsDownloaded = downloadedBytes * 8;
        const mbps = (bitsDownloaded / duration) / 1_000_000; // Mbps

        console.log(`Time     : ${duration} Seconds`);
        console.log(`Download : ${downloadedBytes} Bytes`);
        resolve(mbps);
      });
    }).on("error", (err) => console.log(err));
  });
}

(async () => {
  try {
    const url = "https://ifandika.github.io/resources/all-pdf/26-3-2025-M.Ifandika-Tutorial-MySQL-Full.pdf";
    const speed = await measureDownloadSpeed(url);
    console.log(`Download speed: ${speed.toFixed(2)} Mbps`);
  }
  catch (err) {
    console.error("Error measuring speed:", err);
  }
})();