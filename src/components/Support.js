import React, { Component } from "react";
import { Space, Card } from "antd";
import PhoneNumber from "./PhoneNumber";

export default class Support extends Component {
  render() {
    return (
      <div>
        <Card title="เบอร์โทรศัพท์ฉุกเฉิน">
          <PhoneNumber
            supportName="ศูนย์ประชาบดีแจ้งคนหาย"
            phoneNumber="1300"
          />
          <br />
          <PhoneNumber
            supportName="สถาบันการแพทย์ฉุกเฉินแห่งชาติ"
            phoneNumber="1669"
          />
          <br />
          <PhoneNumber
            supportName="โรงพยาบาลศิริราช"
            phoneNumber="02-419-1000"
          />
          <br />
          <PhoneNumber supportName="โรงพยาบาลจุฬา" phoneNumber="02-649-4000" />
          <br />
          <PhoneNumber
            supportName="โรงพยาบาลราชวิถี"
            phoneNumber="02-206-2900"
          />
          <br />
          <PhoneNumber
            supportName="โรงพยาบาลวิชัยเวช แยากไฟฉาย"
            phoneNumber="02-412-0055"
          />
          <br />
        </Card>
      </div>
    );
  }
}
