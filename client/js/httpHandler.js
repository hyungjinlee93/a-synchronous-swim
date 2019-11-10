(function() {

  const serverUrl = 'http://127.0.0.1:3000';
  // const bgUrl = 'http://127.0.0.1:3000/background.jpg';
  //
  // TODO: build the swim command fetcher here
  //
  const ajaxGetDir = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        SwimTeam.move(data);
      },
      complete: () => {
        setTimeout(ajaxGetDir, 1000);
      }
    });
  };
  setTimeout(ajaxGetDir, 0);

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: '/background.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        console.log('it was added to bgUrl');
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }
    ajaxFileUplaod(file);
  });

})();
