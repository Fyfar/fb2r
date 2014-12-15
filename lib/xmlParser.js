document.addEventListener("DOMContentLoaded", function (event) {

    function getXmlHttp() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    function getBook() {
        var xmlhttp = getXmlHttp();
        xmlhttp.open('GET', '../bla3.fb2', false);
        xmlhttp.send(null);
        if (xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    }

    function parse(txt) {
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(txt, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
        }
        return xmlDoc;
    }

    function getBookInfo(book) {
        var info = parse(book).getElementsByTagName("FictionBook")[0].childNodes[1].getElementsByTagName("title-info");
        var genre = info[0].childNodes[1].childNodes[0];
        var firstName = info[0].childNodes[3].getElementsByTagName("first-name")[0].childNodes[0];
        var lastName = info[0].childNodes[3].getElementsByTagName("last-name")[0].childNodes[0];
        var author = firstName.textContent + " " + lastName.textContent;
        var title = info[0].childNodes[5].childNodes[0];
        var lang = info[0].childNodes[9].childNodes[0];
        info = parse(book).getElementsByTagName("FictionBook")[0].childNodes[1].getElementsByTagName("publish-info");
        var year = info[0].childNodes[1].childNodes[0];
        return {
            genre: genre.textContent,
            firstName: firstName.textContent,
            lastName: lastName.textContent,
            title: title.textContent,
            lang: lang.textContent,
            year: year.textContent
        }
    }

    function getText(book) {
        return parse(book).getElementsByTagName("FictionBook")[0].childNodes[3].getElementsByTagName("section");
        //console.log(info);
        //var element = document.getElementById("myDiv");

    }

    function getNumSymbols(textSize) {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        //console.log(x + " x " + y);
        var lettersNumLine = x / textSize;
        var lettersNumVertical = y / textSize;
        return Math.round(lettersNumLine * lettersNumVertical);
    }

    function isLetter(ch) {
        if (ch != null && ch.length > 0) {
            return (ch.toUpperCase() != ch.toLowerCase());
        }
        else
            return false;
    }

    function getPage(textSize, text) {
        var symbols = getNumSymbols(textSize);
        var current = 0;
        var s = text.textContent;
        return function() {
            console.log("current" + current, "s.length" + s.length);
            if (current >= s.length) {
                return "end";
            }
            var temp = current;
            var sym;
            var index;
            console.log("current " + (current + symbols), "left " + (s.length - current));
            if (symbols > s.length - current) {
                sym = s.length - current;
                current += sym;
                index = sym + temp;
            } else {
                sym = symbols;
                var res = s.charAt(temp + sym);
                console.log("res " + res, temp + sym);
                index = sym + temp + 1;
                while (true) {
                    if (!isLetter(res)) {
                        console.log("res " + res, index);
                        break;
                    }
                    res = s.charAt(index++);
                    console.log(res)
                }
                current += index - temp;
            }
            console.log("temp " + temp, " index " + index);
            console.log("length " + s.substring(temp, index).length);
            return s.substring(temp, index);
        }
    }

    function getPages(text) {
        //console.log(text);
        var arr = [];
        var count = 0;
        for(var i = 0; i < text.length; i++) {
            var next = getPage(12, text[i]);
            while (true) {
                s = next();
                if(s === "end") {
                    break;
                }
                arr[count++] = s;
            }
        }
        return arr;

    }

    var index = 0;
    var info = getText(getBook());
    var element = document.getElementById("myDiv");
    var page = getPage(12, info[index]);
    var arr = getPages(info);
    var curPage = 0;
    element.innerHTML = arr[curPage];

    window.onkeyup = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 39) {
            if(curPage < arr.length) {
                element.innerHTML = arr[++curPage];
                console.log(arr[curPage]);
                console.log("\n");
            }

        } else if(key == 37) {
            if(curPage >= 0) {
                element.innerHTML = arr[--curPage];
                console.log(arr[curPage]);
                console.log("\n");
            }
        }
    }
});