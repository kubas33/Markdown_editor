class Document {
  constructor(id, title, content, userId, createdAt, modifiedAt, isDeleted) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user_id = userId;
    this.created_at = createdAt;
    this.modified_at = modifiedAt;
    this.is_deleted = isDeleted;
  }
}
module.exports = Document;
