// add icon to colab link card
window.onload = function(){

    icons = {
        // for colab link
        notebook: '<i class="fa-regular fa-note-sticky"></i>'
    }
    
    //add icon to colab link
    const colab_link_titles= document.querySelectorAll('div.colab-link-card > div.colab-link-title');
    
    let colab_link_icon = document.createElement("span");
    colab_link_icon.innerHTML = icons["notebook"];
    colab_link_icon.setAttribute("style", "margin-right:10px;");
    
    for (let i = 0; i < colab_link_titles.length; i ++){
        colab_link_titles[i].insertBefore(colab_link_icon, colab_link_titles[i].firstChild);
    }
}
