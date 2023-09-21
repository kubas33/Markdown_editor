/**
 * Reprezentuje użytkownika.
 *
 * @class
 */
class User {
  /**
   * Tworzy instancję użytkownika.
   *
   * @constructor
   * @param {number} id - Identyfikator użytkownika.
   * @param {string} username - Nazwa użytkownika.
   * @param {string} password - Hasło użytkownika.
   * @param {string} salt - Sól używana do hashowania hasła.
   * @param {string} email - Adres e-mail użytkownika.
   * @param {Date} createdAt - Data utworzenia użytkownika.
   * @param {Date} modifiedAt - Data ostatniej modyfikacji użytkownika.
   * @param {boolean} isDeleted - Flaga określająca, czy użytkownik został usunięty.
   */
  constructor(id, username, password, salt, email, createdAt, modifiedAt, isDeleted) {
    this.id = Number(id);
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.email = email;
    this.created_at = createdAt;
    this.modified_at = modifiedAt;
    this.is_deleted = isDeleted;
  }
}

module.exports = User;