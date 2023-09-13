const DATA_FILE_NAME = path.join(process.cwd(), 'public', 'data', 'data.json');

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
