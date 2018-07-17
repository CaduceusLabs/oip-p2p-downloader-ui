const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const ipc = require('electron').ipcMain
const { IpfsConnector } = require('@akashaproject/ipfs-connector')
const {OIPJS, Artifact, ArtifactFile} = require('oip-js')
const {ipcMain} = require('electron')
const fs = require('fs-extra')
const ProgressBar = require('electron-progressbar')

let mainWindow;




function createWindow() {
    console.error("CreateWindow Got Called")
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 680
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  dl = new Downloader()

  download_Location = './data'

}

class Downloader {
  constructor(IPFS_config, OIPJS_config){

      this._ipfs = IpfsConnector.getInstance()
      this._oipjs = new OIPJS(OIPJS_config);


      
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


  download(artifact_ID, download_Location){
      console.log('ready')
      return new Promise((resolve, reject) => {
          var attemptDownload = () => {
              console.log('delay?')
              if (!this._ipfs_ready){
                  setTimeout(attemptDownload, 1000)
                  return
              }
              console.log('ready')

              if (!artifact_ID)
                  reject(new Error("Artifact ID is undefined!"))

              this._oipjs.Index.getArtifactFromID(artifact_ID, (artifact) => {
                  // on success
                  console.log(artifact);

                  var filesToDownload = artifact.getFiles();
                  var i = filesToDownload;
                  for ( i = 0; i < filesToDownload.length; i++) { 
                      var filePath = '/ipfs/' + (artifact.getLocation() + '/' + filesToDownload[i].getFilename());

                      this.downloadFile(filePath,download_Location + '/' + filesToDownload[i].getFilename()).then((info) => {
                          console.log(info);
                      })
                  }
                  
                  
                  console.log(download_Location)
              }, (error) => {
                  reject(error)
              })
          }

          attemptDownload()

          
      })
  }

     
  downloadFile(filePath, download_Location){
      console.log(filePath,download_Location)
      return new Promise((resolve, reject) => {
         
          var downloadedBytes = 0
          var totalBytes = 0
          this._ipfs.api.apiClient.files.stat(filePath, (err, stats) => {
              if (err){ 
              console.log(err)
              this.shutdown()
          
          return }
          totalBytes = stats.size;
          console.log(filePath)
            var stream = this._ipfs.api.apiClient.files.catReadableStream(filePath)
            
          
          
          console.log("pre stream")
         var dir = path.parse(download_Location).dir
         var value = Math.round(downloadedBytes/totalBytes*100)
         var progressBar = new ProgressBar({
            indeterminate: false,
            text:'Preparing Artifact',
            detail: 'Loading...',
        
        })
        progressBar
        .on('completed', function() {
            console.info(`completed...`)
            progressBar.detail = 'Task completed. Exiting...';
        })
        .on('aborted', function(value) {
            console.info(`aborted...`);
        })
        .on('progress', function(value) {
            progressBar.detail = `${value} out of ${progressBar.getOptions().maxValue}...`;
        });  
        // setInterval(function() {
        //     if(!progressBar.isCompleted()){
        //       progressBar.value += bounce;
        //     }
        //   }, );


          fs.ensureDir(dir).then(() => {
                 console.log('success!')
          
          var ws = fs.createWriteStream(download_Location);
     
          if (stream.readable) {
              console.log("readable")
              stream.on('error', (err) => {
                      console.error(err)
                  }).on('data', (data) => {
                  
                      var bounce = downloadedBytes += data.length;
                      progressBar.value = downloadedBytes/totalBytes*100 + '%'
     
                      // console.log(downloadedBytes + '/' + totalBytes + " - " + Math.round(downloadedBytes/totalBytes*100000)/1000 + "%")
                      ws.write(data);
                  }).on('end', () => {
                  console.log("end")
                      ws.end();
                  })
          }})
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
  }
});

  // ipc.on('downloadfile', function(event,artifact, selectedFiles) {

  
    // ipcMain.on('asynchronous-message', (event, arg) => {
    // if(arg === downloadFile)
       // event.sender.send('asynchronous-reply', 'pong');
    // else
       //  event.sender.send('asynchronous-reply', 'unrecognized arg');
// })

ipcMain.on('downloadFile', (event, artifact, selectedFiles) => {

    var newArtifact = new Artifact()
    Object.assign(newArtifact, artifact)

console.log('=========')
console.log(artifact)
console.log('=========')
console.log(selectedFiles)
console.log('=========')
  
  
  var filesToDownload = newArtifact.getFiles();
  var i = filesToDownload;
  console.log('yeee')
   for ( i = 0; i < filesToDownload.length; i++) { 
       var newFile = new ArtifactFile(undefined, newArtifact)
       Object.assign(newFile, filesToDownload[i])
       console.log('yurr')
       console.log(newFile)

   if (selectedFiles.includes(i)) {
       console.log('yao')
      var filePath = '/ipfs/' + (newArtifact.getLocation() + '/' + newFile.getFilename());
       console.log(filePath)
       console.log('jung')

      dl.downloadFile(filePath,download_Location + '/' + newFile.getFilename()).then((info) => {
       })

   }
 }
 process.on('SIGINT', function() {
    console.log(" Shutting down IPFS Node");
    dl.shutdown();
    process.exit();
});
})
                  

