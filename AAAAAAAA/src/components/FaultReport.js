import React, { useState, useEffect } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

client.defaults.xsrfCookieName = "csrftoken";
client.defaults.xsrfHeaderName = "X-CSRFToken";
client.defaults.withCredentials = true;

const FaultReport = () => {
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
    <div>
      <h1>No siema</h1>
      {pk && <p>Primary key: {pk}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FaultReport;