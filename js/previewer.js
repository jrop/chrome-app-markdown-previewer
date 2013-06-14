/*
The MIT License (MIT)

Copyright (c) 2013 http://github.com/jrop

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var entry = null;

var file = null;

window.onload = function() {
    console.log('loaded!');
    console.log(window.launchData);
    
    document.getElementById('li-refresh').onclick = reloadFile;
    document.getElementById('li-choose').onclick = chooseFile;
    
    var data = window.launchData || { };
    var files = data.items || [];
    if (files.length > 0) {
        loadEntry(files[0].entry);
    }
    
	var d = document.getElementById('target');
	d.ondragover = function() {
		return false;
	};
	
	d.ondragend = function() {
		return false;
	};
	
	d.ondrop = function(e) {
		e.preventDefault();
		
		var files = e.dataTransfer.files;
		if (files.length > 0) {
			loadFile(files[0]);
		}
		
		return false;
	};
};

function loadEntry(e) {
    entry = e;
    file = null;
    
    e.file(function (f) {
        loadFile(f, false);
    });
}

function loadFile(f, record) {
    if (record !== false) {
        file = f;
        entry = null;
    }
    
    var reader = new FileReader();
    
    reader.onload = function(evt) {
        var txt = reader.result;
        loadString(txt);
    };
    
    reader.onerror = function() {
        console.log(arguments);
    };
    
    reader.readAsText(f);
}

function reloadFile() {
    if (file)
        loadFile(file);
    else
        loadEntry(entry);
}

function chooseFile() {
    chrome.fileSystem.chooseEntry(function (entry) {
        if (entry)
            loadEntry(entry);
    });
}

function loadString(txt) {
	var conv = new Showdown.converter();
	var html = conv.makeHtml(txt);
	document.getElementById('target').innerHTML = '<div style="padding: 15px;">' + html + '</div>';
}
