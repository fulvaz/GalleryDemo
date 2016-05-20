/**
 *
 * Created by fulvaz on 16/5/17.
 */
var fs = require('fs');

var baseUrl = "http://placehold.it/";
var baseWidth = 300;
var baseHeight = 300;


for(var i=0; i<100; i++) {
    var page = [];
    for(var j=0; j<10; j++) {
        var width = baseWidth + 400 * Math.random();
        width = Math.round(width);
        var height = baseHeight + 400 * Math.random();
        height = Math.round(height);
        page.push(baseUrl + width + 'x' + height);
    }
    fs.writeFile('./page' + i + '.json', JSON.stringify(page), 'UTF-8');
}
