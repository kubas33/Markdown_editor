/* eslint-disable no-useless-catch */
const fs = require('fs').promises;
const Document = require('../models/documentModel');

class DataService {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
  }

  async readJSONData() {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async writeJSONData(data) {
    try {
      await fs.writeFile(
        this.dataFilePath,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    } catch (error) {
      throw error;
    }
  }

  async createDocument(newDocument) {
    try {
      const data = await this.readJSONData();
      data.push(newDocument);
      await this.writeJSONData(data);
      return true;
    } catch (error) {
      console.error('Błąd podczas zapisu dokumentu: ', error);
      return false;
    }
  }

  async getDocumentById(id) {
    try {
      const data = await this.readJSONData();
      const document = data.find((doc) => doc.id === id);
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

  async updateDocumentById(id, updatedDocument) {
    try {
      const data = await this.readJSONData();
      data[this.getIndexOfDocument(id)] = updatedDocument;

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

  async deleteDocumentById(id) {
    try {
      const data = await this.readJSONData();
      const newData = data.filter((doc) => doc.id !== Number(id));
      if (newData.length != data.length) {
        await this.writeJSONData(newData);

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
    } catch (e) {
      console.error('Błąd podczas usuwanie dokumentu: ', e);
      return {
        success: false,
        error: `Błąd podczas usuwania dokumentu o id: ${id}`,
      };
    }
  }

  async getIndexOfDocument(id) {
    try {
      const data = await this.readJSONData();
      const documentIndex = data.findIndex((doc) => doc.id === id);
      if (documentIndex === -1) {
        return {
          success: false,
          error: `Dokument o ${id} nie został znaleziony`,
        };
      } else return documentIndex;
    } catch (error) {
      console.error('Błąd podczas wyszukiwania indeksu dokumentu: ', error);
    }
  }

  async generateDocumentId() {
    const data = await this.readJSONData();
    const lastId = data.length;
    return lastId + 1;
  }
}

module.exports = DataService;
