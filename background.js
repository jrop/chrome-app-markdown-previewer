chrome.app.runtime.onLaunched.addListener(function (launchData) {
    console.log('launch-data:' + launchData);
	chrome.app.window.create('previewer.html', {
        bounds: {
            width: 800,
            height: 600
        }
    }, function (win) {
        win.contentWindow.launchData = launchData;
    });
});