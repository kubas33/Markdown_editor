import {readJSONData, writeJSONData} from './fileService';

class DataHelper {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
  }

  async  generateId() {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await readJSONData(this.dataFilePath);
      // Zwracamy ostatnie id z tablicy z danymi zwiększone o 1
      const lastId = data.length;
      return lastId + 1;
    } catch (error) {
      console.error('Błąd podczas generowania ID dokumentu: ', error);
      return -1;
    }
  }

  async  createModel(model) {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await readJSONData(this.dataFilePath);
      // Dodajemy nowy dokument do tablicy z danymi
      data.push(model);
      // Zapisujemy zmodyfikowane dane do pliku JSON
      await writeJSONData(this.dataFilePath, data);
      return true;
    } catch (error) {
      console.error('Błąd podczas zapisu dokumentu: ', error);
      return false;
    }
  }
}

exports.module = DataHelper;