const express = require('express');
const router = express.Router();
const { authMiddlewares  } = require ('../middlewares/authMiddlewares');
const document_controller = require('../controllers/documentController');

const ensureLoggedIn = authMiddlewares.isLoggedIn;

router.use(ensureLoggedIn);

router.get('/', document_controller.document_list);

// GET request for creating a document. NOTE This must come before routes that display document (uses id).
router.get('/create',  document_controller.document_create_get);

// POST request for creating document.
router.post('/create', document_controller.document_create_post);

// GET request to delete document.
router.get('/:id/delete', document_controller.document_delete_get);

// DELETE request to delete a specific document.
router.delete('/:id/delete', document_controller.document_delete);

// GET request to update document.
router.get('/:id/update', document_controller.document_update_get);

// PUT request to update a specific document.
router.put('/:id/update', document_controller.document_update_put);

// GET request for one document.
router.get('/:id', document_controller.document_detail);

module.exports = router;
