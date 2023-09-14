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
  const data = await fs.readFile(DATA_FILE_NAME, 'utf-8');
  const documents = JSON.parse(data);
  const page_title = 'Documents list';
  //console.log(documents[0]);
  res.render('documents/index', {
    page_title,
    documents_list: documents,
  });
  //res.send("NOT IMPLEMENTED: document list");
});

// Display detail page for a specific document.
exports.document_detail = asyncHandler(async (req, res, next) => {
  const data = await fs.readFile(DATA_FILE_NAME, 'utf-8');
  const documents = JSON.parse(data);
  console.log(`ID: ${req.params.id}`);
  const document = documents.find((doc) => doc.id == req.params.id);
  const contentMarkdown = document.content.replace(/\n/g, '<br>');

  const contentHtml = md.render(document.content);
  console.log(document);
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
  res.send('NOT IMPLEMENTED: document delete GET');
});

// Handle document delete on POST.
exports.document_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: document delete POST');
});

// Display document update form on GET.
exports.document_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: document update GET');
});

// Handle document update on POST.
exports.document_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: document update POST');
});
