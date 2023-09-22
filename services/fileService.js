const { readFile, writeFile } = require('fs').promises;


class FileService {



  /**
   * Description placeholder
   * @date 9/21/2023 - 8:00:45 AM
   *
   * @async
   * @param {string} filePath Path to file to read
   * @returns {Object}
   */
  async readJSONData(filePath) {
    try {
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Błąd podczas wczytywania danych JSON: ', error);
      throw error; // Rzuć wyjątek, aby obsłużyć go na wyższym poziomie
    }
  }


  /**
   * Metoda asynchroniczna writeJSONData zapisuje dane do pliku JSON
   * @date 9/21/2023 - 7:59:35 AM
   *
   * @async
   * @param {string} filePath Path to file to write
   * @param {string} data Data to be written into file
   * @returns {}
   */
  async writeJSONData(filePath, data) {
    try {
      await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Błąd podczas zapisywania danych JSON: ', error);
      throw error; // Rzuć wyjątek, aby obsłużyć go na wyższym poziomie
    }
  }


}


module.exports = FileService;