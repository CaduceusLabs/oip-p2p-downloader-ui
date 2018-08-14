
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const ipc = require('electron').ipcMain
const windowManager = require('electron-window-manager');
const {
    IpfsConnector
} = require('@akashaproject/ipfs-connector')
const {
    Index,
    Artifact,
    ArtifactFile
} = require('oip-index')
const {
    ipcMain
} = require('electron')
const fs = require('fs-extra')
const ProgressBar = require('electron-progressbar')
const {
    dialog
} = require("electron");
const {
    css
} = require('glamor')

let mainWindow;
let DlWindow;


function createWindow() {
    console.error("CreateWindow Got Called")
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 680
    });
    DlWindow = new BrowserWindow({
        width: 800,
        height: 680,
        parent: mainWindow,
        show: false
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    DlWindow.loadURL(isDev ? 'http://localhost:3000/download' : `file://${path.join(__dirname, '../build/index.html')}`);

    mainWindow.on('closed', () => mainWindow = null);
    DlWindow.on('close', (e) => {
        e.preventDefault();
        DlWindow.hide();
    })


    dl = new Downloader()


}
    // DownloadContainer = new BrowserWindow({
    //     name: 'Download Artifact',
    //     width: 1000,
    //     height: 400,
    // });
    // window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

class Downloader {
    constructor() {

        this._ipfs = IpfsConnector.getInstance()
        this.Index = new Index();



        this._ipfs.start().then((api) => {
            console.log('post start')
            var _this = this

            console.log('pre-ready')
            this._ipfs_ready = true

        })

    }

    shutdown() {
        this._ipfs.stop();
    }


    download(artifact_ID, download_Location) {

   
        return new Promise((resolve, reject) => {
            var attemptDownload = () => {
           
                if (!this._ipfs_ready) {
                    setTimeout(attemptDownload, 1000)
                    return
                }
         

                if (!artifact_ID)
                    reject(new Error("Artifact ID is undefined!"))


                this.Index.getArtifact(artifact_ID)
                    .then(artifact => {
                        

                        var filesToDownload = artifact.getFiles();
                        var i = filesToDownload;
                        for (var i = 0; i < filesToDownload.length; i++) {
                            var filePath = '/ipfs/' + (artifact.getLocation() + '/' + filesToDownload[i].getFilename());

                            this.downloadFile(filePath, download_Location + '/' + filesToDownload[i].getFilename()).then((info) => {
                
                            })
                        }
       
                    })
                    .catch(error => {
                        reject(error)
                    })

            }


            attemptDownload()


        })
    }


    downloadFile(filePath, download_Location) {
        console.log(filePath, download_Location)
        return new Promise((resolve, reject) => {

            var downloadedBytes = 0
            var totalBytes = 0
            this._ipfs.api.apiClient.files.stat(filePath, (err, stats) => {
                if (err) {
                    console.log(err)
                    this.shutdown()

                    return
                }
                totalBytes = stats.size;
                 var stream = this._ipfs.api.apiClient.files.catReadableStream(filePath)



                console.log("pre stream")
                var dir = path.parse(download_Location).dir
                var value = Math.round(downloadedBytes / totalBytes * 100)
                var progressBar = new ProgressBar({
                    indeterminate: false,
                    text: 'Preparing Artifact',
                    detail: 'Loading...',

                })
                progressBar
                    .on('completed', function () {
                        console.info(`completed...`)
                        progressBar.detail = 'Task completed. Exiting...';
                    })
                    .on('aborted', function (value) {
                        console.info(`aborted...`);
                    })
                    .on('progress', function (value) {
                        progressBar.detail = `${value}%`;
                    });
                fs.ensureDir(dir).then(() => {
                    console.log('success!')

                    var ws = fs.createWriteStream(download_Location);

                    if (stream.readable) {
                        console.log("readable")
                        stream.on('error', (err) => {
                            console.error(err)
                        }).on('data', (data) => {

                            var bounce = downloadedBytes += data.length;
                            progressBar.value = Math.round(downloadedBytes / totalBytes * 100)


                            ws.write(data);
                        }).on('end', () => {
                            console.log("end")
                            ws.end();
                        })
                    }
                })
            })
        })
    }
}



app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
        windowManager.init({
            'onLoadFailure': function(window){
                window.loadURL('/404.html');
            }
        })
    }
});
ipcMain.on('toggle-Art', (event, arg) => {
    DlWindow.show();
})

ipcMain.on('downloadFile', (event, artifact, selectedFiles) => {
   DlWindow.show();
   DlWindow.webContents.send('DL-File', (event, artifact,selectedFiles));
    var newArtifact = new Artifact()
    Object.assign(newArtifact, artifact)
      //  event.sender.send('ArtTest', this.state.selectedFiles)
    
    
    var filesToDownload = newArtifact.getFiles();
    var i = filesToDownload;
    for (i = 0; i < filesToDownload.length; i++) {

        var newFile = new ArtifactFile(undefined, newArtifact)
        Object.assign(newFile, filesToDownload[i])
     
        if (newFile.isPaid() !== false) {
            event.returnValue = {
                "success": false,
                "reason": "Cannot be downloaded, Payment required. This functionality is coming soon!"
            }
            return
        }
        


        if (selectedFiles.includes(i)) {
            selectedFolder = dialog.showOpenDialog({
                defaultPath: __dirname,
                properties: ["openDirectory"]
            })
            
            selectedFolder !== undefined ?
                download_Location = selectedFolder[0] : "./data"
    
            var filePath = '/ipfs/' + (newArtifact.getLocation() + '/' + newFile.getFilename());
            console.log(filePath)

            dl.downloadFile(filePath, download_Location + '/' + newFile.getFilename()).then((info) => {
                ipcMain.emit(artifact_ID, artifact)
            })
            event.returnValue = {
                "success": true
            }
        }
    }

    });
    process.on('SIGINT', function () {
        console.log(" Shutting down IPFS Node");
        dl.shutdown();
        process.exit();
})