import React, {Component} from 'react';
import {Icon, message, Upload} from 'antd';
import {Button, Fab, Grid, Paper, Typography} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import 'antd/dist/antd.css'
import FireBaze from "../../../constants/config/FireBaze";
import {connect} from "react-redux";
import {getUserDetails} from "../../../appRedux/actions/Register";

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class UserUploads extends Component {

  state = {
    PPicProgress: 0,
    IDFrontProgress: 0,
    IDBackProgress: 0,
    PPicURL: null,
    IDFrontURL: null,
    IDBackURL: null,
  };

  constructor(props) {
    super(props);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    var PPicProgress = 0;
  }

  handleChange = name => event => {
    console.log(name);
    console.log(event);

    console.log(event.file.originFileObj);

    var file = event.file.originFileObj;
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    console.log(url)
  };

  handlePreview = name => event => {
    console.log(name);
    console.log(event)
  };

  async handleSubmit() {
    var userPics = {
      PPic: this.state.PPicURL,
      IDFrontPic: this.state.IDFrontURL,
      IDBackPic: this.state.IDBackURL
    };
    console.log("The Pay Load")
    await this.props.getUserDetails(userPics);
    this.props.next();
  };


  makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  handlePicChange = e => {
    //getfile
    var file = e.target.files[0];
    var name = e.target.name;
    var foldername = name + "/";
    // get delimiter / image type
    var arr = file.name.split(".");
    var delimiter = arr[arr.length - 1];

    //gen new random name
    var newName = this.makeid(32) + "." + delimiter;

    //firebase Storage
    var StorageRef = FireBaze.storage().ref(foldername + newName);
    var task = StorageRef.put(file);


    task.on("state_changed", progress.bind(this), function error(err) {
        console.log(err.message)
      }, complete.bind(this)
    );

    async function complete() {
      var downloadURL = await task.snapshot.ref.getDownloadURL().then(
        (url) => {
          return url});
      var progName = name + "URL";
      switch (progName) {
        case "PPicURL": {
          this.setState({
            PPicURL: downloadURL
          })
        }
          break;
        case "IDFrontURL": {
          this.setState({
            IDFrontURL: downloadURL
          })
        }
          break;
        case "IDBackURL": {
          this.setState({
            IDBackURL: downloadURL
          })
        }
      }
    }


    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var progName = name + "Progress";
      switch (progName) {
        case "PPicProgress": {
          this.setState({
            PPicProgress: percentage
          })
        }
          break;
        case "IDFrontProgress": {
          this.setState({
            IDFrontProgress: percentage
          })
        }
          break;
        case "IDBackProgress": {
          this.setState({
            IDBackProgress: percentage
          })
        }
      }

    }

  };


  render() {

    return (
      <div >
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{zIndex: '1', }}>
          <div style={{padding: '2.1em'}}>
            <Paper style={{width: 600, padding: 30}}>
              <Typography variant="h5">Please Upload Your Avatar</Typography>
              <br/>
              {this.state.PPicURL == null ? null : <center><img src={this.state.PPicURL} height="150"/> </center>}
              <br/>
              <progress value={this.state.PPicProgress} max="100" id="PPicUploader" style={{width: 540}}>0%</progress>
              <br/>
              <input type="file" id="uploadPPic" name="PPic" onChange={this.handlePicChange}/>
            </Paper>
          </div>
          <div style={{borderLeft: '0.1em solid black', padding: '0.5em'}}>
            <Paper style={{width: 600, padding: 30, margin: 10}}>
              <Typography variant="h5">Upload the Front of your I.D</Typography>
              <br/>
              {this.state.IDFrontURL == null ? null : <center><img src={this.state.IDFrontURL} height="150"/> </center>}
              <br/>
              <progress value={this.state.IDFrontProgress} max="100" style={{width: 540}}>0%</progress>
              <br/>
              <input type="file" id="uploadPPic" name="IDFront" onChange={this.handlePicChange}/>
            </Paper>

            <Paper style={{width: 600, padding: 30, margin: 10}}>
              <Typography variant="h5">Upload the Back of your I.D</Typography>
              <br/>
              {this.state.IDBackURL == null ? null : <center><img src={this.state.IDBackURL} height="150"/> </center>}
              <br/>
              <progress value={this.state.IDBackProgress} max="100" style={{width: 540}}>0%</progress>
              <br/>
              <input type="file" id="uploadPPic" name="IDBack" onChange={this.handlePicChange}/>
            </Paper>
          </div>

          <div style={{position: "absolute", bottom: 0, right: 0, padding: 30}}>
            <Button onClick={this.handleSubmit}>
              <Fab variant="extended" aria-label="Delete">
                <ChevronRightIcon/>
                Next
              </Fab>
            </Button>
          </div>
        </Grid>

      </div>
    )

  }

}

export default connect(null,{getUserDetails})(UserUploads);

