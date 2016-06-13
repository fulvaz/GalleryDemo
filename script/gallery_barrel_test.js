;(function(window) {
    var document = window.document,
        futil = window.futil,
        ajaxCallback,
        barrel = new GalleryBarrel(),
        count = 0,
        buttonMore,
        buttonRearrange,
        intervalId;

    ajaxCallback = function(request) {
        var fragment = document.createDocumentFragment(),
            img,
            imgSrcs = JSON.parse(request.responseText),
            i;
        for(i=0; i<imgSrcs.length; i++) {
            img = document.createElement("img");
            img.classList.add(barrel.imageClassName);
            img.src = imgSrcs[i];
            fragment.appendChild(img);
        }
        barrel.container.appendChild(fragment);
        barrel.appendNewImages();

    };

    futil.ajax({
        url: "testUtils/page3.json",
        requestMethod: "get",
        callback: ajaxCallback
    });

    buttonMore = document.getElementById('more');
    buttonMore.onclick = function() {
        futil.ajax({
            url: "testUtils/page" + count + ".json",
            requestMethod: "get",
            callback: ajaxCallback
        });
        count++;
    };

    buttonRearrange = document.getElementById("rearrange");
    buttonRearrange.onclick = function() {
        barrel.rearrangeAllImage();
    }



     
})(window);