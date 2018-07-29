import React, { Component } from 'react';
import File from './assets/imgs/file.svg';
import Zip from './assets/imgs/file-archive.svg';
import Image from './assets/imgs/file-image.svg';
import Video from './assets/imgs/file-video.svg';
import Pdf from './assets/imgs/file-pdf.svg';
import Code from './assets/imgs/file-code.svg';
import Audio from './assets/imgs/file-audio.svg';
import Text from './assets/imgs/file-alt.svg';
import { ArtifactFile } from 'oip-index';
import filesize from 'filesize';



class DownloadFileList extends Component {
    constructor(props){
        super(props);

        this.getExtension = this.getExtension.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    getExtension(filename){
      let splitFilename = filename.split(".");
      let indexToGrab = splitFilename.length - 1;
  
      return splitFilename[indexToGrab];
    }
    onInputChange(event){
      // value is stored most likely at e.target.value
      var selected = event.target.checked;

      console.log("Checked: " + selected);

      var ind = this.props.fileIndex;
      this.props.onFileSelectChange(selected, ind)
    }
    render(){
      // console.log(this.props)
      var file;

      if (this.props.file){
        console.dir(this.props)
        file = this.props.file;
      } else {
        console.log("foo")
        file = new ArtifactFile();
        file.setFilename("???.???")
        


      }
      
      var extension;

     if (file.getFilename() === undefined) {
       
     } else { 
       extension = this.getExtension(file.getFilename())
     }
      

      var fileImage;

      if (extension === "mp4" || extension === "flv")
        fileImage = Video;
        else if(extension === "jpg" || extension === "png")
          fileImage = Image;
          else if(extension === "wav" || extension === "mp3")
          fileImage = Audio;
          else if(extension === "txt")
          fileImage = Text;
        else
          fileImage = File;
      

        var sizefile = file.getFilesize()
        var stringSize =""
        if (!sizefile) {
        stringSize = "???"
        } else {
          stringSize = filesize(sizefile)
        }


      return(
        <tr>
          <th scope="row">
            <div className="form-check">
              <input onClick={this.onInputChange} className="form-check-input position" type="checkbox" id="blankCheckbox" value="" aria-label="..."/>
              
            </div>
            </th>
            <td><img width="30" height="30" src={fileImage} alt=""/></td>
            <td>{file.getFilename()}</td>
            <td>{file.getType()}</td>
            <td>{stringSize} </td>
          </tr>
        )
    }
} 

export default DownloadFileList;