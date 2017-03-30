function displayPage(index) {
    var element = document.getElementsByClassName("container active")[0];
    element.className = "container hidden";

    var element = document.querySelectorAll('div.container[data-index="' + index + '"]')[0];
    element.className = "container active";

    document.querySelectorAll("#pagination a.active")[0].className = "";     
    document.querySelectorAll('#pagination a[data-index="'+index+'"]')[0]
        .className = "active";
}

(function() {
    document.getElementById("ring-content").onclick = function() {
        var element = document.getElementsByClassName("container active")[0];
        var index = parseInt(element.dataset.index) % 5 + 1;
        displayPage(index);
    }

    var elements = document.querySelectorAll("#pagination a");
    for (i = 0; i < elements.length; i++) { 
        elements[i].onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            displayPage(this.dataset.index);
        }
    }
})();