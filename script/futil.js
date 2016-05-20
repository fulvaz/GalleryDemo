;(function (window){
    var document = window.document;
    var fq = function(selector) {
        return toArray(document.querySelectorAll(selector));
    };

    function toArray(nodes) {
        if (nodes.length) {
            return Array.prototype.slice.call(nodes); 
        } else {
            return [nodes];
        }
    }

    function toLowerDimension(nodes) {
        var lowDArray = [];
        for (var i = 0; i < nodes.length; i++) {
            lowDArray = lowDArray.concat(nodes[i]);
        }
        return lowDArray;
    }

    function clearInnerDOM(node) {
        var initialStyle= node.style.display;
        node.style.display = 'none';
        while(node.firstChild) {
            node.removeChild(node.firstChild);
        }
        node.style.display = initialStyle;
    }

    function ajax(opt) {
        var request = new XMLHttpRequest(),
            opt = opt || {};
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
               opt["callback"](request);
            }
        }
        request.open(opt.requestMethod, opt.url);
        request.send(opt.content);
    }

    function loadOneImage(root, imgSrc) {
        var img = document.createElement('img');
        img.src = imgSrc;
        root.appendChild(img);
    }
    
    function loadImgFromJSON(root, jsonSrc) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
           if(xhr.readyState == 4 && xhr.status == 200) {
               var page = JSON.parse(xhr.responseText);

               // hide root and improve performance
               var rootDisplay = root.style.display;
               root.style.display = 'none';
               page.forEach(function(src) {
                   loadOneImage(root, src);
               });

               // show root again
               root.style.display = rootDisplay;
           }
        };
        xhr.open('get', jsonSrc);
        xhr.send();
    }


    fq.ajax = ajax;
    fq.toArray = toArray;
    fq.toLowerDimension = toLowerDimension;
    fq.clearInnerDOM = clearInnerDOM;
    fq.loadImgFromJson = loadImgFromJSON;

    window['futil'] = fq;

})(window);


// futil 架构
// fq应该返回一个新的futil对象, 那个util对象里面能做很多事情
// 那个futil对象应该继承某个对象, 使得原有功能能正常使用  //时间不够了, 就先加个实例成员撑撑场面吧