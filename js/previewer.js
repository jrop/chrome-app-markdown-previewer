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