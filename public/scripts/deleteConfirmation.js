document.addEventListener('DOMContentLoaded', function () {
  const delBtns = document.querySelectorAll('.confirm-del-btn');
  // eslint-disable-next-line no-undef
  const confirmDelModal = new bootstrap.Modal(
    document.getElementById('confirmDelete')
  );

  delBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const docId = btn.getAttribute('data-document-id');

      const confirmDelBtn = document.querySelector('#confirm-delete-modal-btn');
      confirmDelBtn.setAttribute(
        'data-delete-url',
        `/documents/${docId}/delete`
      );

      confirmDelModal.show();
    });
  });
});
