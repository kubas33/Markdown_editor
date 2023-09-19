const asyncHandler = require('../node_modules/express-async-handler');
const fs = require('fs').promises;
const path = require('path');
const MarkdownIt = require('markdown-it');
const DataService = require('../services/dataService');
const Document = require('../models/documentModel');

const md = new MarkdownIt({
  breaks: true,
});

const DATA_FILE_NAME = path.join(process.cwd(), 'public', 'data', 'data.json');
const dataService = new DataService(DATA_FILE_NAME);

exports.index = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
});

// Display list of all Documents.
exports.document_list = asyncHandler(async (req, res, next) => {
  const userId = 1;
  const userDocuments = await dataService.getUserDocuments(userId);
  const activeDocuments =  await dataService.getActiveDocuments(userDocuments);
  const page_title = 'Documents list';
  res.render('documents/index', {
    page_title,
    documents_list: activeDocuments,
  });
  //res.send("NOT IMPLEMENTED: document list");
});

// Display detail page for a specific document.
exports.document_detail = asyncHandler(async (req, res, next) => {
  const data = await fs.readFile(DATA_FILE_NAME, 'utf-8');
  const documents = JSON.parse(data);
  const document = documents.find((doc) => doc.id == req.params.id);
  //const contentMarkdown = document.content.replace(/\n/g, '<br>');
  const contentMarkdown = document.content;

  const contentHtml = md.render(document.content);
  res.render(`documents/show`, {
    document,
    contentHtml,
    contentMarkdown,
  });
  //res.send(`NOT IMPLEMENTED: document detail: ${req.params.id}`);
});

// Display document create form on GET.
exports.document_create_get = asyncHandler(async (req, res, next) => {
  res.render(`documents/create`, {});
});

// Handle document create on POST.
exports.document_create_post = asyncHandler(async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = 1;
    const now = new Date().toISOString();
    const id = await dataService.generateDocumentId();

    const newDocument = new Document(
      id,
      title,
      content,
      userId,
      now,
      now,
      false
    );
    await dataService.createDocument(newDocument);
    res.redirect('/documents');
  } catch (error) {
    console.error('Błąd podczas dodawania nowego dokumentu: ', error);
    res.status(500).json({ success: false, error: 'Wystąpił błąd serwera' });
  }

  //res.send("NOT IMPLEMENTED: document create POST");
});

// Display document delete form on GET.
exports.document_delete_get = asyncHandler(async (req, res, next) => {
  // try {
  // } catch (error) {}
  res.send('NOT IMPLEMENTED: document delete GET');
});

// Handle document delete on DELETE.
exports.document_delete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    //await dataService.deleteDocumentById(id);
    await dataService.softDeleteDocumentById(id);
    res.status(200).json({ success: true, message: 'Dokument usunięto pomyślnie' });
  } catch (e) {
    console.error('Błąd podczas usuwanie dokumentu: ', e);
    res.status(500).json({ success: false, error: 'Wystąpił błąd serwera' });
  }
});

// Display document update form on GET.
exports.document_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: document update GET');
});

// Handle document update on PUT.
exports.document_update_put = asyncHandler(async (req, res, next) => {
const { id } = req.params;
const {title, content} = req.body;
const currentDoc = await dataService.getDocumentById(id);

  try {
    if (currentDoc.title !== title || currentDoc.content !== content) {
      const userId = 1;
      const now = new Date().toISOString();
      const updatedDoc = new Document(id, title, content, userId, currentDoc.created_at, now, false);
      await dataService.updateDocumentById(id, updatedDoc);
      res.status(200).json({ success: true, message: 'Dokument zaktualizowano pomyślnie' });
    } else {
      res.status(200).json({ success: true, message: 'Dokument nie wymagał aktualizacji' });
    }
  } catch (e) {
    console.error('Błąd podczas aktualizowania dokumentu: ', e);
    res.status(500).json({ success: false, error: 'Wystąpił błąd serwera' });
  }
});
