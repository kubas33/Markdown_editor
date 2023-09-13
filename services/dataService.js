/* eslint-disable no-useless-catch */
const fs = require('fs').promises;
const path = require('path');
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
      const documentId = data.findIndex((doc) => doc.id === id);
      if (documentId === -1) {
        return {
          success: false,
          error: `Dokument o ${id} nie został znaleziony`,
        };
      }

      data[documentId] = updatedDocument;

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
}

module.exports = DataService;
