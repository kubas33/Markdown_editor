
class DocumentCreator {
  createDocument(title, content, userId) {
    const newDocument = {
      id: null,
      title,
      content,
      user_id: userId,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      is_deleted: false,
    };
    return newDocument;
  }
}
