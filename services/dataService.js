const FileService = require('./fileService');

class DataService {
  /**
   * Constructs a new DataService instance.
   * @param {string} dataFilePath The path to the data file.
   */
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
    this.fileService = new FileService(dataFilePath);
    this.data = [];
  }

  async loadData() {
    this.data = await this.fileService.readData();
  }

  async saveData() {
    await this.fileService.writeData(this.data);
  }

  findEntityByProperty(property, value, data) {
    return data.find(entity => entity[property] === value);
  }

  /**
   * Creates a new entity.
   * @param {Object} newEntity The new entity to be created.
   * @returns {Promise<boolean>} A promise that resolves to true if the entity was created successfully, or false otherwise.
   */
  async createEntity(newEntity) {
    try {
      const data = await this.fileService.readData();
      data.push(newEntity);
      await this.fileService.writeData(data);
      return true;
    } catch (error) {
      console.error('Error creating entity: ', error);
      return false;
    }
  }

  /**
   * Gets all entities for a given user ID.
   * @param {string} userId The ID of the user.
   * @returns {Promise<Array<Object>|null>} A promise that resolves to an array of entities for the user, or null if there was an error.
   */
  async getEntitiesByUserId(userId) {
    try {
      const id = parseInt(userId);
      const data = await this.fileService.readData();
      const userEntities = data.filter(entity => entity.user_id === id);
      return userEntities;
    } catch (error) {
      console.error('Error getting entities for user ID: ', error);
      return null;
    }
  }

  /**
   * Gets all active entities.
   * @param {Array<Object>} entities The list of entities.
   * @returns {Array<Object>|null} The list of active entities, or null if there was an error.
   */
  async getActiveEntities(entities) {
    try {
      return entities.filter(entity => !entity.is_deleted);
    } catch (error) {
      console.error('Error getting active entities: ', error);
      return null;
    }
  }

  /**
   * Gets an entity by ID.
   * @param {string} id The ID of the entity.
   * @returns {Promise<Object|null>} A promise that resolves to the entity with the given ID, or null if the entity was not found or there was an error.
   */
  async getEntityById(id) {
    try {
      const entityId = Number(id);
      const data = await this.fileService.readData();
      const entity = data.find(ent => ent.id === entityId);
      return entity ? { ...entity } : null;
    } catch (error) {
      console.error('Error getting entity by ID: ', error);
      return null;
    }
  }

  /**
   * Updates an entity by ID.
   * @param {string} id The ID of the entity to update.
   * @param {Object} updatedEntity The updated entity.
   * @returns {Promise<Object>} A promise that resolves to an object with the success status and a message.
   */
  async updateEntityById(id, updatedEntity) {
    try {
      const entityId = Number(id);
      const data = await this.fileService.readData();
      const entityIndex = this.getIndexOfEntity(entityId, data);
      if (entityIndex !== -1) {
        data[entityIndex] = updatedEntity;
        await this.fileService.writeData(data);
        return {
          success: true,
          message: `Entity with ID ${id} has been updated.`,
        };
      } else {
        return {
          success: false,
          error: `Entity with ID ${id} not found.`,
        };
      }
    } catch (error) {
      console.error('Error updating entity: ', error);
      return {
        success: false,
        error: `Error updating entity with ID ${id}.`,
      };
    }
  }

  /**
   * Deletes an entity by ID.
   * @param {string} id The ID of the entity to delete.
   * @returns {Promise<Object>} A promise that resolves to an object with the success status and a message.
   */
  async deleteEntityById(id) {
    try {
      const data = await this.fileService.readData();
      const entityIndex = this.getIndexOfEntity(id, data);
      if (entityIndex !== -1) {
        data.splice(entityIndex, 1);
        await this.fileService.writeData(data);
        return {
          success: true,
          message: `Entity with ID ${id} has been deleted.`,
        };
      } else {
        return {
          success: false,
          error: `Entity with ID ${id} not found.`,
        };
      }
    } catch (error) {
      console.error('Error deleting entity: ', error);
      return {
        success: false,
        error: `Error deleting entity with ID ${id}.`,
      };
    }
  }

  /**
   * Soft deletes an entity by ID.
   * @param {string} id The ID of the entity to soft delete.
   * @returns {Promise<Object>} A promise that resolves to an object with the success status and a message.
   */
  async softDeleteEntityById(id) {
    try {
      const entity = await this.getEntityById(id);
      entity.is_deleted = true;
      const response = await this.updateEntityById(id, entity);
      if (response.success) {
        return {
          success: true,
          message: `Entity with ID ${id} has been soft deleted.`,
        };
      }
    } catch (error) {
      console.error('Error soft deleting entity: ', error);
      return {
        success: false,
        error: `Error soft deleting entity with ID ${id}.`,
      };
    }
  }

/**
 * Gets the index of an entity by ID in the provided data array.
 * @param {string} id - The ID of the entity.
 * @param {Array} data - The data array to search in.
 * @returns {number} - The index of the entity in the data array, or -1 if the entity was not found or there was an error.
 * @throws {Error} - Throws an error if there is an issue with the provided arguments or during the execution of the method.
 */
getIndexOfEntity(id, data) {
  try {
    const entityId = Number(id);
    const entityIndex = data.findIndex(ent => ent.id === entityId);
    if (entityIndex === -1) {
      return -1;
    } else {
      return entityIndex;
    }
  } catch (error) {
    console.error('Error getting index of entity: ', error);
    return -1;
  }
}


  /**
   * Generates a new entity ID.
   * @returns {Promise<number>} A promise that resolves to the new entity ID.
   */
  async generateEntityId() {
    try {
      const data = await this.fileService.readData();
      const lastId = data.length;
      return lastId + 1;
    } catch (error) {
      console.error('Error generating entity ID: ', error);
      return -1;
    }
  }
}

module.exports = DataService;