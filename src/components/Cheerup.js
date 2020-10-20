import React, { Component } from "react";
import SoundCommandButton from "./SoundCommandButton";
import { storage } from "../firebase";
import { Button, Card } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";

export default class Cheerup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        sounds: [],
        metadata: []
    }
  }


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
    let urls = [], metadata = []
    storage.ref("sounds").listAll().then((result) => {
        result.items.forEach(sound => {
          // And finally display them
          urls.push(sound.getDownloadURL())
          this.setState({
            metadata: [...this.state.metadata, sound.name]
          })
      
        });
        Promise.all(urls).then(urlArr => {
          this.setState({
              sounds: urlArr,
          })
        })
        .catch(function(error) {
            // Handle any errors
            console.log(error);
        });
    });
  }


  render() {
    return (
      <div>
      <SoundCommandButton /><br/>
        <div className="row">
            {this.state.sounds.map((sound, i) => {
              return <div key={i} className="col col-sm col-md-4">
              
                <Card title= {"📣 " + this.state.metadata[i]} key={i}>
                          <Button
                            type="primary"
                            size="large"
                            style={{width:"100%"}}
                            icon={<PlayCircleFilled />}
                            onClick={() => document.getElementById(i).play()}
                          >
                            เล่น
                        </Button>
                        <audio id={i} src={sound} style={{ display: "none" }} controls="controls" />
                </Card>              
                  
              </div>

            })}          
        </div>
       
        

      </div>
    );
  }
}
