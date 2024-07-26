const DLbutton  = document.querySelector('.download_btn');

function download(MEDIA_URL, FILE_NAME) { 
    return fetch(MEDIA_URL, {
        method: 'GET',
        redirect: 'error'
    })
    .then((response) => {
        if (!response.ok) { throw new Error; }
        return response.blob()
    }).then((blob) => {
        return new Promise((resolve, reject) => {
            const downloadTag = document.createElement('a');
            downloadTag.href = URL.createObjectURL(blob);
            downloadTag.download = FILE_NAME;
            downloadTag.click();
            resolve();
        });
    })
}

DLbutton.addEventListener('click', () => {

    const media_url = DLbutton.getAttribute('data-url');
    const file_name = media_url.substring(media_url.lastIndexOf('/') + 1);  
    const content = DLbutton.innerHTML;

    DLbutton.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin' style = 'color:white'></i>Downloading";
    DLbutton.classList.add('_downloading');
    
    download(media_url, file_name)
    .then(() => {
        DLbutton.style.pointerEvents = 'none';
        DLbutton.classList.remove('_downloading');
        DLbutton.innerHTML = "<i class='fa-solid fa-check fa-bounce' style = 'color:white'></i>Done"
        DLbutton.classList.add('_download_complete', '_dlcomplete_effect');

        setTimeout(
            () => {
                DLbutton.classList.remove('_download_complete', '_dlcomplete_effect');
                DLbutton.innerHTML = content;
                DLbutton.style.pointerEvents = '';
            },
            4000 
        );
    })
    .catch(() => {
        DLbutton.style.pointerEvents = 'none';
        DLbutton.classList.remove('_downloading');
        DLbutton.innerHTML = "<i class='fa-solid fa-triangle-exclamation fa-fade' style = 'color:white'></i>Error!";
        DLbutton.classList.add('_download_error');

        setTimeout(
            () => {
                DLbutton.classList.remove('_download_error');
                DLbutton.innerHTML = content;
                DLbutton.style.pointerEvents = '';
            },
            4000
        );
    })
});