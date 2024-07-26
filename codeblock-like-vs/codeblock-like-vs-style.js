hljs.addPlugin({
    'after:highlightElement': ({el, result, text}) => {
        // add element to display row number.
        console.log(el.innerHTML);
        el.innerHTML = result.value.replace(/^/gm, '<span class="row-number"></span>');
         
        console.log(el.innerHTML);
        // add copy botton
        const copyButton = document.createElement('button');
        copyButton.setAttribute('class', 'hljs-copy-btn');
        copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
        el.parentElement.after(copyButton);
        copyButton.addEventListener('click', () => {
            copyToClipboard(copyButton, text);
        });

        function copyToClipboard(btn, text){
            if (!navigator.clipboard){
                alert('Sorry, can not copy');
            }
            navigator.clipboard.writeText(text).then(
                () => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i><span> Copied!</span>'
                    resetCopyBtnText(btn, 1500);
                },
                (error) => {
                    btn.textContent = 'Failed';
                    resetCopyBtnText(btn, 1500);
                    console.log(error.message);
                }
            );
        }
        function resetCopyBtnText(btn, delay) {
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            }, delay)
        }
        
        // add file name and language icon if file name exists.
        icons = {
            python: '<i class="fa-brands fa-python"></i>',
            javascript: '<i class="fa-brands fa-js"></i>',
            css: '<i class="fa-brands fa-css3"></i>',
            html: '<i class="fa-solid fa-code"></i>',
            sql: '<i class="fa-regular fa-database"></i>',
            csv: '<i class="fa-regular fa-file-csv"></i>',
            vba: '<i class="fa-regular fa-table"></i>',
            json: '<i class="fa-regular fa-file-lines"></i>',
            php: '<i class="fa-brands fa-php"></i>'
        }
    
        const code_block_wrap = document.querySelectorAll('div.hljs-wrap');
        const code_block = document.querySelectorAll('div.hljs-wrap > pre');
        const code = document.querySelectorAll('div.hljs-wrap > pre > code')

        for (let i = 0; i < code_block_wrap.length; i ++){
            if (code_block[i].hasAttribute("data-file")){
                let code_label = document.createElement("span");
                code_label.setAttribute("class", "data-file");
                let filename = code_block[i].getAttribute("data-file");
                let language = code[i].className.split(" ")[0];
                code_label.innerHTML =
                    icons[language] + 
                    ' ' +
                    filename;

                code_block_wrap[i].insertBefore(code_label, code_block_wrap[i].firstChild);
            }
        }
    }
});