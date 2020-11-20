import React from "react";
import axios from "axios";

export default function LoginAPI(ac) {
  axios.defaults.withCredentials = true;

  // function used to upload a Mock backup file on the xpress server
  // eslint-disable-next-line
  const UploadMockBackupFile = async (data) => {
    const formData = new FormData();
    const blob = new Blob(["this is\na mock file"], { type: "text/plain" });
    formData.append("backup", blob, "backup.txt");

    await fetch("/flask/upload_backupfile", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  return <div style={ac.hideLogin} className="container register"></div>;
}
