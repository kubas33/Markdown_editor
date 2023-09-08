const express = require('express');
const router = express.Router();
const document_controller = require('../controllers/documentController');


router.get('/', document_controller.document_list);

// GET request for creating a document. NOTE This must come before routes that display document (uses id).
router.get("/create", document_controller.document_create_get);

// POST request for creating document.
router.post("/create", document_controller.document_create_post);

// GET request to delete document.
router.get("/:id/delete", document_controller.document_delete_get);

// POST request to delete document.
router.post("/:id/delete", document_controller.document_delete_post);

// GET request to update document.
router.get("/:id/update", document_controller.document_update_get);

// POST request to update document.
router.post("/:id/update", document_controller.document_update_post);

// GET request for one document.
router.get("/:id", document_controller.document_detail);

module.exports = router;