const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const pullArt = document.getElementById('Artifact')

pullArt.addEventListener('click', function() {
    ipc.send('pullArt', document.getElementById('Spawn').value)

    var window = remote.getCurrentWindow();
    window.close()
})