/**
 * Created by fulvaz on 16/5/21.
 */

/**
 * a javascript library to generate a barrel layout which keep the 
 * image ratio without cutting it. Each 
 * row of images has the same width and SIMILAR height
 * 
 * */

;(function(window) {
    var document = window.document,
        futil = window.futil;

    function Barrel(opt) {
        var opt = opt || {},
            that = this,
            timeout;

        this.containerClassName = opt.containerClassName || "ba-container";
        this.rowContainerClassName = opt.rowContainerClassName || "ba-row";
        this.imageClassName = opt.imageClassName || "ba-img";
        this.minCol = opt.minCol || 3;
        this.maxCol = opt.maxCol || 6;
        this.minHeight = opt.minHeight || 300;
        this.container = document.querySelector("." + this.containerClassName);
        this.imagesToAdd = getImagesToAdd.call(this);
        this.minAspectRatio = this.container.clientWidth / this.minHeight;


        window.addEventListener("resize", function() {
            window.clearTimeout(timeout);
            timeout = setTimeout(function() {
                that.rearrangeAllImage();
            }, 300);
        });

    }

    function calcAspectRatio(w, h) {
        return w / h;
    }

    function appendAllChildTo(root, nodes) {
        for(var i=0; i<nodes.length; i++) {
            root.appendChild(nodes[i]);
        }
    }

    function getAllImagesAdded() {
        var allAdded = document.querySelectorAll("." + this.containerClassName + " ." + this.imageClassName);
        return futil.toArray(allAdded);
    }

    function getImagesToAdd() {
        this.imagesToAdd = document.querySelectorAll("." + this.containerClassName + " > ." + this.imageClassName);
        this.imagesToAdd = futil.toArray(this.imagesToAdd);
        return this.imagesToAdd;
    }

    Barrel.prototype.rearrangeAllImage = function() {
        var allImageToAdd = getAllImagesAdded.call(this);
        futil.clearInnerDOM(this.container);
        this.appendNewImages(allImageToAdd);
    }

    Barrel.prototype.appendNewImages = function(allImageToAdd){
        // add after all images are loaded
        var allImageToAdd = allImageToAdd || getImagesToAdd.call(this),
            i,
            count = 0,
            that = this;

        // detect img loaded
        for(i=0; i<allImageToAdd.length; i++) {
            futil.imgWHDetect(allImageToAdd[i].src, function() {
                ++count;
                if(count === allImageToAdd.length) {
                    while(allImageToAdd.length !== 0) {
                        that.appendRow(allImageToAdd);
                    }
                }
            });
        }


    };

    Barrel.prototype.appendRow = function(allImageToAdd){
        // update images list first

        var i,
            image,
            currentImageToAdd = [],
            imgAspectRatio,
            sumAspectRatio = 0,
            allImageToAdd = allImageToAdd; // may not be useful
            rowContainer = document.createElement('div');


        for(i=0; i < this.maxCol; i++) {
            // 取一张图
            if(allImageToAdd.length === 0) break;
            image = allImageToAdd.shift();

            currentImageToAdd.push(image);

            // 算ar

            imgAspectRatio = calcAspectRatio(image.width, image.height);

            // 累加ar
            sumAspectRatio += imgAspectRatio;

            // 判断是否符合最小ar
            if(sumAspectRatio > this.minAspectRatio) {
                rowContainer.classList.add(this.rowContainerClassName);
                appendAllChildTo(rowContainer, currentImageToAdd);
                rowContainer.style.height = Math.floor(this.container.clientWidth / sumAspectRatio) + "px";
                this.container.appendChild(rowContainer);
                break;
            } else {
                if(allImageToAdd.length === 0) {
                    // 不合符要求则设置row为最小高度, 并指定宽度
                    rowContainer.classList.add(this.rowContainerClassName);
                    appendAllChildTo(rowContainer, currentImageToAdd);
                    rowContainer.style.height = this.minHeight + "px";
                    rowContainer.style.width = this.minHeight * sumAspectRatio + "px";
                    this.container.appendChild(rowContainer);
                    break;
                }
            }
        }
    };


    window["GalleryBarrel"] = Barrel;

})(window);



