document.addEventListener('DOMContentLoaded', function () {

    const saveBtn = document.querySelector('#save-btn');
    const id = saveBtn.dataset.id;
    const url = `./${id}/update`;
    const content = document.querySelector('#markdown');
    const title = document.querySelector('#title-input');

    saveBtn.addEventListener('click', async () => {
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
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
});