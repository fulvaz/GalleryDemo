/**
 * Created by fulvaz on 16/5/17.
 */

;(function(window) {
    var document = window.document,
        shelterWrapper = document.querySelector('.shelter'),
        shelterContent = document.querySelector('.shelter .content'),
        futil = window.futil;

    function getMinHeightCol() {
        // TODO test performance, slow?
        var min,
            cols = this.columnList;

        min = cols[0];
        for(var i=0; i<cols.length; i++) {
            if (min.offsetHeight > cols[i].offsetHeight) {
                min = cols[i];
            }
        }
        return min;

    }



    function WaterFall(opt) {
        var opt = opt || {},
            that = this,
            resizeTimeoutId;

        this.minWidth = opt.minWidth || 200;
        this.containerSelector = opt.containerSelector || 'wf-container';
        this.columnSelector = opt.columnSelector || 'wf-column';
        this.boxSelector = opt.boxSelector || "wf-box";
        this.marginBetweenCol = opt.marginBetweenCol || 16;

        this.container = document.querySelector("." + this.containerSelector);

        this.items = [];
        this.lastAddItems = [];
        this.columnList = [];
        this.currentNumOfCol = 0;

        // init shelter
        shelterWrapper.addEventListener("click", function(e) {
            if(e.target != shelterWrapper) return;
            e.target.classList.add("hidden");
        });


        // handle resize event
        window.addEventListener('resize', function(e) {
            window.clearTimeout(resizeTimeoutId);
            resizeTimeoutId = setTimeout(function() {
                that.reArrange();
            }, 100);
        });

    }

    WaterFall.prototype.getNumOfCol = function() {
        return Math.floor(this.container.clientWidth / this.minWidth);
    };


    WaterFall.prototype.addColumns = function() {
        var numOfCol = this.getNumOfCol(),
            fragment = document.createDocumentFragment(),
            clonedNode,
            col = document.createElement('div');


        if (numOfCol != this.currentNumOfCol) {
            // repaint!
            // delete all
            futil.clearInnerDOM(this.container);
            this.columnList = [];

            // loop update DOM -> use documentFragment
            col.classList.add(this.columnSelector);
            col.style.width = "calc(" + 100 / numOfCol + "% - " + this.marginBetweenCol + "px)";
            col.style.margin = this.marginBetweenCol / 2 + 'px';
            for(var i=0; i<numOfCol; i++) {
                clonedNode = col.cloneNode(true);
                fragment.appendChild(clonedNode);
                this.columnList.push(clonedNode);
            }
            this.container.appendChild(fragment);

            // update num of column
            this.currentNumOfCol = numOfCol;
            return true;
        } else {
            return false;
        }

    };


    // add items to list
    WaterFall.prototype.getItemsRemotely = function(src, callback) {
        var that = this;
        var handleJson = function(request) {
            var items = JSON.parse(request.responseText);
            that.lastAddItems = items;
            that.items = that.items.concat(items);
            callback();
        };
        futil.ajax({
            "url": src,
            "requestMethod": "get",
            "callback": handleJson
        });
    };



    // render items in ths list
    WaterFall.prototype.addItems = function(repaintAll) {
        var items = repaintAll ? this.items : this.lastAddItems,
            box,
            img,
            minCol,
            that = this;

        for(var i=0; i<items.length; i++) {
            imgReady(items[i], function() {
                // prepare for img
                img = this;
                img.addEventListener("click", function(e) {
                    futil.clearInnerDOM(shelterContent);
                    shelterContent.appendChild(e.target.cloneNode());
                    shelterWrapper.classList.remove("hidden");
                });

                // prepare box
                box = document.createElement('div');
                box.classList.add(that.boxSelector);
                box.style.height = img.height * that.columnList[0].offsetWidth / img.width + "px";
                box.appendChild(img);

                minCol = getMinHeightCol.call(that);
                minCol.appendChild(box);
            });

            // put items into column which has the smallest height
            // browser will optimize this automatically
        }
    };

    WaterFall.prototype.reArrange = function() {
        // add cols
        var ifRepaintAll = this.addColumns();
        // for each col, add img
        this.addItems(ifRepaintAll);
    };



    window['WaterFall'] = WaterFall;
})(window);