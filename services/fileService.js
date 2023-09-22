const { readFile, writeFile } = require('fs').promises;

class FileService {
  constructor(dataFilePath) {
    this.filePath = dataFilePath;
  }

/**
 * Metoda asynchroniczna readData odczytuje dane z pliku w formacie JSON.
 * @date 21.09.2023 - 8:00:45
 *
 * @async
 * @returns {Promise<Object>} Obiekt zawierający odczytane dane z pliku JSON.
 * @throws {Error} Błąd podczas wczytywania danych JSON.
 */
async readData() {
  try {
    const data = await readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Błąd podczas wczytywania danych JSON: ', error);
    throw error; // Rzuć wyjątek, aby obsłużyć go na wyższym poziomie
  }
}

  /**
   * Metoda asynchroniczna writeData zapisuje dane do pliku JSON
   * @date 9/21/2023 - 7:59:35 AM
   *
   * @async
   * @param {string} data Data to be written into file
   * @returns {void}
   */
  async writeData(data) {
    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Błąd podczas zapisywania danych JSON: ', error);
      throw error; // Rzuć wyjątek, aby obsłużyć go na wyższym poziomie
    }
  }
}

module.exports = FileService;