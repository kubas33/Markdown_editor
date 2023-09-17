// Importujemy moduł fs.promises, który umożliwia korzystanie z asynchronicznych operacji na plikach
const { readFile, writeFile } = require('fs').promises;

// Klasa DataService
class DataService {
  // Konstruktor przyjmuje ścieżkę do pliku z danymi
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
    this.cachedData = null;
  }

  // Metoda asynchroniczna readJSONData wczytuje dane z pliku JSON
  async readJSONData() {
    // Jeśli dane zostały już wczytane, zwracamy je z pamięci podręcznej
    if (this.cachedData) {
      return this.cachedData;
    } else {
      // Wczytujemy dane z pliku i parsujemy je do postaci obiektu JavaScript
      const data = await readFile(this.dataFilePath, 'utf-8');
      this.cachedData = JSON.parse(data);
      return this.cachedData;
    }
  }

  // Metoda asynchroniczna writeJSONData zapisuje dane do pliku JSON
  async writeJSONData(data) {
    if (this.cachedData !== data) {
      this.cachedData = data;
      await writeFile(
        this.dataFilePath,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  }

  // Metoda asynchroniczna createDocument dodaje nowy dokument do bazy danych
  async createDocument(newDocument) {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await this.readJSONData();
      // Dodajemy nowy dokument do tablicy z danymi
      data.push(newDocument);
      // Zapisujemy zmodyfikowane dane do pliku JSON
      await this.writeJSONData(data);
      return true;
    } catch (error) {
      console.error('Błąd podczas zapisu dokumentu: ', error);
      return false;
    }
  }

  // Metoda asynchroniczna getDocumentById zwraca dokument o wybranym id
  async getDocumentById(id) {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await this.readJSONData();
      // Wyszukujemy dokument o wybranym id
      const document = data.find((doc) => doc.id === id);
      // Jeśli dokument nie został znaleziony, zwracamy null
      return !document
        ? null
        : new Document(
            document.id,
            document.title,
            document.content,
            document.user_id,
            document.created_at,
            document.modified_at,
            document.is_deleted
          );
    } catch (error) {
      console.error(
        'Błąd podczas wczytywania dokumentu o wybranym id: ',
        error
      );
      return null;
    }
  }

  // Metoda asynchroniczna updateDocumentById aktualizuje dokument o wybranym id
  async updateDocumentById(id, updatedDocument) {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await this.readJSONData();
      // Znajdujemy indeks dokumentu o wybranym id
      data[this.getIndexOfDocument(id)] = updatedDocument;
      // Zapisujemy zmodyfikowane dane do pliku JSON
      await this.writeJSONData(data);
      return {
        success: true,
        message: `Dokument o id: ${id} został zaktualizowany`,
      };
    } catch (error) {
      console.error('Błąd podczas aktualizacji dokumentu: ', error);
      return {
        success: false,
        error: `Błąd podczas aktualizacji dokumentu o id: ${id}`,
      };
    }
  }

  // Metoda asynchroniczna deleteDocumentById usuwa dokument o wybranym id
  async deleteDocumentById(id) {
    try {
      const data = await this.readJSONData();
      const documentIndex = await this.getIndexOfDocument(id);
      if (documentIndex !== -1) {
        data.splice(documentIndex, 1);
        await this.writeJSONData(data);
        return {
          success: true,
          message: `Dokument o id: ${id} został usunięty`,
        };
      } else {
        return {
          success: false,
          error: `Dokument o id: ${id} nie został znaleziony`,
        };
      }
    } catch (error) {
      console.error('Błąd podczas usuwania dokumentu: ', error);
      return {
        success: false,
        error: `Błąd podczas usuwania dokumentu o id: ${id}`,
      };
    }
  }

  // Metoda asynchroniczna getIndexOfDocument zwraca indeks dokumentu o wybranym id
  async getIndexOfDocument(id) {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await this.readJSONData();
      // Wyszukujemy indeks dokumentu o wybranym id
      const documentIndex = data.findIndex((doc) => doc.id === id);
      // Jeśli dokument nie został znaleziony, zwracamy -1
      if (documentIndex === -1) {
        return -1;
      } else return documentIndex;
    } catch (error) {
      console.error('Błąd podczas wyszukiwania indeksu dokumentu: ', error);
      return -1;
    }
  }

  // Metoda asynchroniczna generateDocumentId generuje nowe id dla dokumentu
  async generateDocumentId() {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await this.readJSONData();
      // Zwracamy ostatnie id z tablicy z danymi zwiększone o 1
      const lastId = data.length;
      return lastId + 1;
    } catch (error) {
      console.error('Błąd podczas generowania ID dokumentu: ', error);
      return -1;
    }
  }
}

// Eksportujemy klasę DataService
module.exports = DataService;
