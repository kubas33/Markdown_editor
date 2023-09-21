
import {readJSONData, writeJSONData} from './fileService';
const Document = require('../models/documentModel');

// Klasa DataService
class DataService {
  // Konstruktor przyjmuje ścieżkę do pliku z danymi
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
  }

  // Metoda asynchroniczna createDocument dodaje nowy dokument do bazy danych
  async createDocument(newDocument) {
    try {
      // Wczytujemy dane z pliku JSON
      const data = await readJSONData(this.dataFilePath);
      // Dodajemy nowy dokument do tablicy z danymi
      data.push(newDocument);
      // Zapisujemy zmodyfikowane dane do pliku JSON
      await writeJSONData(this.dataFilePath, data);
      return true;
    } catch (error) {
      console.error('Błąd podczas zapisu dokumentu: ', error);
      return false;
    }
  }

  async getUserDocuments(userId) {
    try {
      const id = parseInt(userId);
      const data = await readJSONData(this.dataFilePath);
      const userDocuments = data.filter(doc => doc.user_id === id);
      return userDocuments;
    } catch(error) {
      console.error('Błąd podczas wczytywania dokumentów dla wybranego user_id', error);
      return null;
    }
  }

  async getActiveDocuments(documents) {
    try {
      return documents.filter(doc => !doc.is_deleted);
    } catch(error) {
      console.error('Błąd podczas wczytywania  aktywnych dokumentów ', error);
      return null;
    }
  }

  // Metoda asynchroniczna getDocumentById zwraca dokument o wybranym id
  async getDocumentById(id) {
    try {
      // Konwertuj id na liczbę wewnątrz funkcji
      const documentId = Number(id);
      // Wczytujemy dane z pliku JSON
      const data = await readJSONData(this.dataFilePath);
      // Wyszukujemy dokument o wybranym id
      const document = data.find((doc) => doc.id === documentId);
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
      const data = await readJSONData(this.dataFilePath);
      const documentIndex = await this.getIndexOfDocument(Number(id));
      if (documentIndex !== -1) {
        // Znajdujemy indeks dokumentu o wybranym id
        data[documentIndex] = updatedDocument;
        // Zapisujemy zmodyfikowane dane do pliku JSON
        await writeJSONData(this.dataFilePath, data);
        return {
          success: true,
          message: `Dokument o id: ${id} został zaktualizowany`,
        };
      } else {
        return {
          success: false,
          error: `Dokument o id: ${id} nie został znaleziony`,
        };
      }
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
      const data = await readJSONData(this.dataFilePath);
      const documentIndex = await this.getIndexOfDocument(id);
      if (documentIndex !== -1) {
        data.splice(documentIndex, 1);
        await writeJSONData(this.dataFilePath, data);
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

  async softDeleteDocumentById(id) {
    try {
     const document = await this.getDocumentById(id);
     document.is_deleted = true;
      const response = await this.updateDocumentById(id, document);
      if (response.success){
        return {
          success: true,
          message: `Dokument o id: ${id} został usunięty`,
        };
      }
    }catch (error) {
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
      const documentId = Number(id);
      // Wczytujemy dane z pliku JSON
      const data = await readJSONData(this.dataFilePath);
      // Wyszukujemy indeks dokumentu o wybranym id
      const documentIndex = data.findIndex((doc) => doc.id === documentId);
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
      const data = await readJSONData(this.dataFilePath);
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
