document.addEventListener('DOMContentLoaded', function () {
  const delBtns = document.querySelectorAll('.confirm-del-btn');
  const confirmDelBtn = document.querySelector('#confirm-delete-modal-btn');
  const confirmDelForm = document.querySelector('#confirm-delete-form');
  // eslint-disable-next-line no-undef
  const confirmDelModal = new bootstrap.Modal(
    document.getElementById('confirmDelete')
  );

  delBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const docId = btn.getAttribute('data-document-id');

      confirmDelBtn.setAttribute(
        'data-delete-url',
        `/documents/${docId}/delete`
      );

      confirmDelModal.show();
    });
  });
  confirmDelForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const deleteUrl = confirmDelBtn.getAttribute('data-delete-url');
    console.log(deleteUrl);
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        if (data.success) {
          window.location.href = '/documents';
        } else {
          console.error('Błąd serwera:', response.status);
          alert('Wystąpił błąd podczas usuwania dokumentu.');
        }
      } else {
        alert('Wystąpił błąd podczas usuwania dokumentu.');
      }
    } catch (error) {
      console.error('Błąd podczas usuwania dokumentu:', error);
      alert('Wystąpił błąd podczas usuwania dokumentu.');
    }

    confirmDelModal.hide();
  });
});
