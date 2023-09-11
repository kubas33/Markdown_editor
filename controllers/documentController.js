const { error, log } = require("console");
const asyncHandler = require("../node_modules/express-async-handler");
const fs = require("fs").promises;
const path = require("path");

const DATA_FILE_NAME = path.join(process.cwd(), "public", "data", "data.json");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all Documents.
exports.document_list = asyncHandler(async (req, res, next) => {
  const data = await fs.readFile(DATA_FILE_NAME, "utf-8");
  const documents = JSON.parse(data);
  const page_title = "Documents list";
  //console.log(documents[0]);
  res.render("documents/index", {
    page_title,
    documents_list: documents,
  });
  //res.send("NOT IMPLEMENTED: document list");
});

// Display detail page for a specific document.
exports.document_detail = asyncHandler(async (req, res, next) => {
  res.render(`documents/show`, {});
  //res.send(`NOT IMPLEMENTED: document detail: ${req.params.id}`);
});

// Display document create form on GET.
exports.document_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: document create GET");
});

// Handle document create on POST.
exports.document_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: document create POST");
});

// Display document delete form on GET.
exports.document_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: document delete GET");
});

// Handle document delete on POST.
exports.document_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: document delete POST");
});

// Display document update form on GET.
exports.document_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: document update GET");
});

// Handle document update on POST.
exports.document_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: document update POST");
});
