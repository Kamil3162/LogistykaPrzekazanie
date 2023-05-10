import React, { useState, useEffect } from "react";
import axios from "axios";
import {TrucksContainer} from "../Trucks/TruckElements";
import {EditUserBox} from "../EditUser/UserDetailElements";
import {FormBox} from "../../LoginForm/LoginFormElements";
import {InputBox, RegisterInput, TextAreaBox, UpperInfo} from "../../RegisterForm/RegisterFormElements";
import {BtnSubmit} from "../../EquipmentTruckReport/EquipmentTruckElements";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

client.defaults.xsrfCookieName = "csrftoken";
client.defaults.xsrfHeaderName = "X-CSRFToken";
client.defaults.withCredentials = true;

const FaultReportPage = () => {
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [pk, setPk] = useState(null);

  useEffect(() => {
    client
      .get("api/vehicle-receivements")
      .then((response) => {
        setPk(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append("photo", photo);
    });
    formData.append("description", description);

    client
      .post(`api/vehicle-receivements/${pk}`, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const newPhotos = [];
    for (let i = 0; i < fileList.length; i++) {
      newPhotos.push(fileList[i]);
    }
    setPhotos([...photos, ...newPhotos]);
  };

  return (
      <EditUserBox>
        <TrucksContainer>
         <h1>FaultReport</h1>
      {pk && <p>Primary key: {pk}</p>}
          <FormBox onSubmit={handleSubmit}>
            <InputBox>
              <UpperInfo>FaultReport</UpperInfo>
              <RegisterInput
                  type="file" multiple onChange={handleFileChange}
              />
            </InputBox>
            <InputBox>
              <UpperInfo>FaultReport</UpperInfo>
              <TextAreaBox
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
            </InputBox>

            <BtnSubmit type="submit">Zatwierdz</BtnSubmit>
          </FormBox>
        </TrucksContainer>
      </EditUserBox>
  );
};

export default FaultReportPage;