const fs = require("fs").promises;
const path = require("path");

const IDataService = require('../interfaces/IDataService');

const DATA_FILE_NAME = path.join(process.cwd(), "public", "data", "data.json");

class DataService extends IDataService {
  constructor(dataFilePath) {
    super();
    this.dataFilePath = dataFilePath;
  }

  async readData() {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async writeData(data) {
    try {
      await fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      throw error;
    }
  }

}
/*
exports.createDataDocument = async (newDocument) => {
  try {
    const data = await fs.readFile(DATA_FILE_NAME, "utf-8");
    const documents = JSON.parse(data);

    // Dodaj nowy obiekt do listy dokumentów
    documents.push(newDocument);

    // Zapisz zaktualizowane dane do pliku
    await fs.writeFile(DATA_FILE_NAME, JSON.stringify(documents, null, 2), "utf-8");
    
    return true; // Powodzenie
  } catch (error) {
    console.error("Błąd podczas zapisu dokumentu: ", error);
    return false;
  }
}
*/
module.exports = DataService;