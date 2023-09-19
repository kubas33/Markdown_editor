document.addEventListener('DOMContentLoaded', function () {

    const saveBtn = document.querySelector('#save-btn');
    const id = saveBtn.dataset.id;
    const url = `./${id}/update`;
    const content = document.querySelector('#markdown');
    const title = document.querySelector('#title-input');
    const delBtn = document.querySelector('[data-delete-url]');
    const confirmDelBtn = document.querySelector('#confirm-delete-modal-btn');
    const confirmDelForm = document.querySelector('#confirm-delete-form');
    // eslint-disable-next-line no-undef
    const confirmDelModal = new bootstrap.Modal(
    document.getElementById('confirmDelete')
  );

    saveBtn.addEventListener('click', async () => {

      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            // eslint-disable-next-line quotes
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.value,
            content: content.value,
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
          window.location.href = '/documents';
        } else {
          console.error('Błąd serwera:', response.status);
          alert('Wystąpił błąd podczas aktualizowania dokumentu.');
        }
        }

      }catch (error) {
      console.error('Błąd podczas aktualizowania dokumentu:', error);
      alert('Wystąpił błąd podczas aktualizowania dokumentu.');
      }

    });
    
    delBtn.addEventListener('click', async () => {
      confirmDelBtn.dataset.deleteUrl = delBtn.dataset.deleteUrl; 
      confirmDelModal.show();
    });

    confirmDelForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      try {
      const response = await fetch(confirmDelBtn.dataset.deleteUrl, {
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
    });
    confirmDelModal.hide();
});