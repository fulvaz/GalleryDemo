;(function(window) {
    var document = window.document,
        futil = window.futil,
        arrangeHandler = {
            arrange0: function() {},
            arrange1: function() {},
            arrange2: function() {},
            arrange3: function(node) {
                function resizeImgs(node) {
                    var widthContainer = node.offsetWidth,
                        heightContainer = node.offsetHeight,
                        nodeImgs = futil.toArray(node.children);
                    nodeImgs[0].style.width = widthContainer - heightContainer / 2 + 'px';
                    nodeImgs[1].style.width = heightContainer / 2 + 'px';
                    nodeImgs[2].style.width = heightContainer / 2 + 'px';
                }
                resizeImgs(node);
                window.addEventListener('resize', function() {
                    setTimeout(function() {
                        resizeImgs(node);
                    }, 30);
                });
            },
            arrange4: function() {},
            arrange5: function() {},
            arrange6: function() {}
        };

    // 获取jigsaw-*
    var galleryNodes = futil('.jigsaw-gallery');

    galleryNodes.forEach(function(node) {
        var numOfImgs;
        numOfImgs = replaceImg(node);
        arrangeHandler['arrange' + numOfImgs](node);
    });

    // replace the img tag with div tag
    // set img as div background
    function replaceImg(galleryNode) {
        var divNodes = document.createDocumentFragment(),
            nodeImgs,
            numOfImgs;

        // 隐藏元素, 加快页面速度
        galleryNode.style.display = 'none';

        // 转换成background形式
        nodeImgs = futil.toArray(galleryNode.children);
        nodeImgs = nodeImgs.filter(function(imgNode) {
            return imgNode.tagName === 'IMG';
        });

        // 判断有多少张图片
        numOfImgs = nodeImgs.length;

        nodeImgs.forEach(function(imgNode) {
            //将img转换成div
            var div = document.createElement('div');
            //将div设置背景为img图片
            div.style.backgroundImage = 'url(' + imgNode.src + ')';
            divNodes.appendChild(div);
        });

        //清空原来的img, 加上新的div
        futil.clearInnerDOM(galleryNode);
        galleryNode.appendChild(divNodes);

        // 加上标签 交给css处理
        galleryNode.classList.add('jigsaw-' + numOfImgs);

        // 显示元素
        galleryNode.style.display = 'block';

        return numOfImgs;
    }

})(window);



