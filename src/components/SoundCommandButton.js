import React, { Component } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { Button, Input, Space } from "antd";
import {
  ExclamationCircleOutlined,
  PlayCircleFilled,
  SoundFilled,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { storage } from "../firebase";
import Modal from "antd/lib/modal/Modal";
import "../style/CommandButton.css";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

var getFileBlob = function (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.addEventListener("load", function () {
    cb(xhr.response);
  });
  xhr.send();
};

export default class SoundCommandButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadName: "",
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      loading: false,
      playLoading: false,
      modalLoading: false,
      modalVisible: false,
      modalConfirmLoading: false,
      modalConfirmVisible: false,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUpload = () => {
    this.setState({ modalConfirmLoading: true });
    getFileBlob(this.state.blobURL, (blob) => {
      storage
        .ref(`sounds/${this.state.uploadName}`)
        .put(blob)
        .then(function (snapshot) {
          console.log("Uploaded a blob or file!");
        })
        .catch(function (error) {
          console.log("Error");
        })
        .finally(() => {
          this.setState({
            modalConfirmLoading: false,
            modalConfirmVisible: false,
          });
        });
    });
  };

  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false, modalVisible: true });
      })
      .catch((e) => console.log(e));
  };

  handleClick = () => {
    if (!this.state.isRecording) this.start();
    else this.stop();
  };

  handlePlay = () => {
    this.setState({ playLoading: true });
    var audioElement = document.getElementById("audio");
    audioElement.play();

    audioElement.addEventListener(
      "ended",
      function () {
        // Audio has ended when this function is executed.
      },
      false
    );
  };
  handleOk = () => {
    this.setState({
      modalLoading: true,
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false,
        modalLoading: false,
      });
    }, 3000);
  };
  componentDidMount() {
    navigator.mediaDevices.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="กรอกชื่อผู้บันทึกเสียง"
          visible={this.state.modalVisible}
          confirmLoading={this.state.modalLoading}
          onOk={this.handleOk}
        >
          <Input
            
            prefix={<UserOutlined />}
            name="uploadName"
            onChange={this.handleChange}
          />
        </Modal>
        <Modal
          title="ยืนยันการส่งเสียงขึ้นระบบ"
          visible={this.state.modalConfirmVisible}
          confirmLoading={this.state.modalConfirmLoading}
          onOk={this.handleUpload}
          onCancel={() => this.setState({ modalConfirmVisible: false })}
          okText="ตกลง"
          cancelText="ยกเลิก"
        >
          <p>ยืนยันการส่งเสียงขึ้นระบบ ?</p>
        </Modal>
        <div className="command">
          <Space align="center" direction="horizontal">
            <Button
              type="primary"
              style={{ backgroundColor: "green", border: "none" }}
              icon={<SoundFilled />}
              onClick={this.handleClick}
            >
              {!this.state.isRecording ? "อัดเสียง" : "หยุดอัด"}
            </Button>
        

            <Button
              type="primary"
              style={{ backgroundColor: "green", border: "none" }}
              icon={<PlayCircleFilled />}
              onClick={this.handlePlay}
            >
              เล่น
            </Button>
      

            <Button
              type="primary"
              style={{ border: "none" }}
              icon={<UploadOutlined />}
              loading={this.state.modalConfirmLoading}
              onClick={() => this.setState({ modalConfirmVisible: true })}
            >
              บันทึก
            </Button>
          </Space>
        </div>
        <audio
          id="audio"
          src={this.state.blobURL}
          style={{ display: "none" }}
          controls="controls"
        />
      </div>
    );
  }
}
