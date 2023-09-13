const fs = require('fs').promises;

class FileService {
  async writeJSON(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error('Błąd zapisu danych do pliku');
    }
  }
}

module.exports = FileService;