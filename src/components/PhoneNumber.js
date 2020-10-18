import React, { Component } from "react";
import { Button, Space } from "antd";
import { PhoneFilled } from "@ant-design/icons";
export default class PhoneNumber extends Component {
  render() {
    const { supportName, phoneNumber } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <p>{supportName}</p>
          </div>
          <div className="col-sm-5">
            <a href={"tel:[" + phoneNumber + "]"}>
              <Button
                type="primary"
                style={{ backgroundColor: "green", border: "none", borderRadius:"5px" }}
              >
                <PhoneFilled />
                {phoneNumber}
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
