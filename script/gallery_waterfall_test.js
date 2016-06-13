;(function(window) {
    var document = window.document,
        futl = window.futil,
        wrapper = futil(".wf-container")[0],
        waterfall = new window["Gallery_WaterFall"](),
        JSONSrcBaseUrl = "testUtils/",
        intervalId,
        scrollTimerId,
        count = 0;

    waterfall.getItemsRemotely(JSONSrcBaseUrl + "page0.json", function() {
        waterfall.reArrange();
    });




    // intervalId = setInterval(function(e) {
    //     if(document.documentElement.scrollHeight < window.innerHeight * 3) {
    //         waterfall.getItemsRemotely(JSONSrcBaseUrl + "page" + count + ".json", function() {
    //             waterfall.reArrange();
    //         });
    //         count++;
    //     } else {
    //         window.clearInterval(intervalId);
    //     }
    //
    // }, 250); // 偷懒
    //
    // // lazy load
    // window.addEventListener("scroll", function(e) {
    //     window.clearTimeout(scrollTimerId);
    //     scrollTimerId = setTimeout(function() {
    //         if(document.documentElement.scrollHeight - window.scrollY - window.innerHeight < window.innerHeight * 5) {
    //             for(var i=0; i<5; i++) {
    //                 waterfall.getItemsRemotely(JSONSrcBaseUrl + "page" + count + ".json", function() {
    //                     waterfall.reArrange();
    //                 });
    //                 count++;
    //             }
    //         }
    //     }, 200);
    // });

    setInterval(function() {
        waterfall.getItemsRemotely(JSONSrcBaseUrl + "page" + count + ".json", function() {
            waterfall.reArrange();
        });
        count++;
    }, 500);




})(window);