"use strict";

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};

function Writer() {

    this.LINEBREAK = "\r\n";  // windows: "\r\n"  // unix: \n
    /**
     * Takes an object generated by Reader.read and returns
     * a HTML string. wraps the html into a div.
     */
    Writer.prototype.write = function(markdownObject) {
        var html = "";
        //var element = markdownObject[slideNumber][position];

        var slideCounter = 1;
        for (var key in markdownObject) {
            var slide = markdownObject[key];
            html += "<div class='slide' id='slide" + slideCounter + "'>" + this.LINEBREAK;

            for (var k in slide) {
                var element = slide[k];
                if (element.style === "header1") {
                    html += this.writeHeader1(element) + this.LINEBREAK;

                } else if (element.style === "header2") {
                    html += this.writeHeader2(element) + this.LINEBREAK;

                } else if (element.style === "header3") {
                    html += this.writeHeader3(element) + this.LINEBREAK;

                } else if (element.style === "normaltext") {
                    html += this.writeNormalText(element) + this.LINEBREAK;

                } else if (element.style === "bigtext") {
                    html += this.writeBigText(element) + this.LINEBREAK;

                } else if (element.style === "image") {
                    html += this.writeImage(element) + this.LINEBREAK;

                } else if (element.style === "listelement") {
                    html += this.writeListElement(element) + this.LINEBREAK;

                } else if (element.style === "singlelistelement") {
                    html += this.writeSingleListElement(element) + this.LINEBREAK;

                } else if (element.style === "startlistelement") {
                    html += this.writeStartListElement(element);

                } else if (element.style === "endlistelement") {
                    html += this.writeEndListElement(element) + this.LINEBREAK;

                } else if (element.style === "break") {
                    html += "<br></br>" + this.LINEBREAK;

                } else {
                    html += this.writeNormalText(element) + this.LINEBREAK;
                }
            }
            html += "</div>" + this.LINEBREAK + this.LINEBREAK;
            slideCounter++;
        }
        return html;
    };

    Writer.prototype.writeNormalText = function(element) {
        return "<p>" + element.text + "</p>";
    };

    Writer.prototype.writeListElement = function(element) {
        return "<li>" + element.text + "</li>";
    };

    Writer.prototype.writeSingleListElement = function(element) {
        var html = "";
        html += "<ul>" + this.LINEBREAK;
        html += "<li>" + element.text + "</li>" + this.LINEBREAK;
        html += "</ul>";
        return html;
    };

    Writer.prototype.writeStartListElement = function(element) {
        var html = "";
        html += "<ul>" + this.LINEBREAK;
        html += "<li>" + element.text + "</li>" + this.LINEBREAK;
        return html;
    };

    Writer.prototype.writeEndListElement = function(element) {
        var html = "";
        html += "<li>" + element.text + "</li>" + this.LINEBREAK;
        html += "</ul>";
        return html;
    };

    Writer.prototype.writeBigText = function(element) {
        return "<p class='bigtext'>" + element.text + "</p>";
    };

    Writer.prototype.writeImage = function(element) {
        var html = "";

        if (element.caption.length > 0) {
            html += "<figure>" + this.LINEBREAK;
            html += "<img src='" + element.url + "' />" + this.LINEBREAK;
            html += "<figcaption>" + element.caption + "</figcaption>" + this.LINEBREAK;
            html += "</figure>";
        } else {
            html += "<img src='" + element.url + "' />";
        }
        return html;
    };

    Writer.prototype.writeHeader1 = function(element) {
        return "<h1>" + element.text + "</h1>";
    };

    Writer.prototype.writeHeader2 = function(element) {
        return "<h2>" + element.text + "</h2>";
    };

    Writer.prototype.writeHeader3 = function(element) {
        return "<h3>" + element.text + "</h3>";
    };

    /**
     * Takes an object generated by Reader.read and
     * generates an unordered list using titles and
     * slidenumbers. returns a HTML string. wraps
     * the html into a div.
     */
    Writer.prototype.writeTableOfContent = function(markdownObject) {
        var html = "";

        html += "<div id='content'>" + this.LINEBREAK;
        html += "<ul>" + this.LINEBREAK;

        var slideCounter = 1;
        for (var key in markdownObject) {
            var slide = markdownObject[key];

            for (var k in slide) {
                var element = slide[k];
                if (element.style === "header1" || element.style === "header2" || element.style === "header3") {  // only titles
                    html += "<li><a href='#slide" + slideCounter + "'>" + element.text + " " + slideCounter + "</a></li>" + this.LINEBREAK;
                }
            }
            slideCounter++;
        }

        html += "</ul>" + this.LINEBREAK;
        html += "</div>" + this.LINEBREAK + this.LINEBREAK;

        return html;
    };

    /**
     * Takes an object generated by Reader.read and
     * generates an unordered list using images and
     * slidenumbers. returns a HTML string. wraps
     * the html into a div.
     */
    Writer.prototype.writeTableOfImages = function(markdownObject) {
        var html = "";

        html += "<div id='images'>" + this.LINEBREAK;
        html += "<ul>" + this.LINEBREAK;

        var slideCounter = 1;
        for (var key in markdownObject) {
            var slide = markdownObject[key];

            for (var k in slide) {
                var element = slide[k];
                if (element.style === "image") {  // only titles
                    html += "<li>" + this.LINEBREAK;
                    html += "<a href='#slide" + slideCounter + "'>" + element.text + " " + element.reference + " " + slideCounter + "</a>" + this.LINEBREAK;
                    html += "</li>" + this.LINEBREAK;
                }
            }
            slideCounter++;
        }

        html += "</ul>" + this.LINEBREAK;
        html += "</div>" + this.LINEBREAK + this.LINEBREAK;

        return html;
    };
}
