import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import DataTable from "./DataTable";
import {
  getAllPeopleData,
  downloadAllPeopleData,
  getAllRoomStat,
  getAllSocketStat,
  downloadAlSocketStat,
  getAllRHData,
  downloadAllRHData,
} from "./API/ApiFetch";
function Table() {
  const ExportToExcel = (apiData: any, fileName: any) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // Format the timestamp using moment.js
    const formattedData = apiData.map((data: any) => ({
      ...data,
      updatedAt: moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const delData = async (route: string, id: string) => {
    try {
      await axios.delete(
        `https://classroom-api.vercel.app/${route}/delete/${id}`
      );
      alert("data deleted");
      getDataPeople();
      getRoomData();
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPeople = async () => {
    axios
      .get("https://classroom-api.vercel.app/class/getAll")
      .then((response) => {
        setPeopleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getRoomData = async () => {
    axios
      .get("https://classroom-api.vercel.app/roomstat/getAll")
      .then((response) => {
        setRoomData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getSocketData = async () => {
    axios
      .get("https://classroom-api.vercel.app/socketstat/getAll")
      .then((response) => {
        setSocket(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const [peopleData, setPeopleData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [socketData, setSocket] = useState([]);

  useEffect(() => {
    // getDataPeople();
    // getRoomData();
    // getSocketData();
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div className="col-md-9 content-bg setting">
            <DataTable
              getAllData={getAllPeopleData}
              downloadAllData={downloadAllPeopleData}
              route={"class"}
              desc={["Total People"]}
              title={"Table Number Of People"}
              feature={["total"]}
            />
            <div className="mt-5"></div>
            <DataTable
              getAllData={getAllRoomStat}
              downloadAllData={downloadAllPeopleData}
              route={"roomstat"}
              desc={["Temperature", "Humidity", "Current", "Power"]}
              title={"Classroom Parameter"}
              feature={["temp", "humid", "current", "power"]}
            />

            <div className="mt-5"></div>
            <DataTable
              getAllData={getAllSocketStat}
              downloadAllData={downloadAlSocketStat}
              route={"socketstat"}
              desc={["Fan", "Lamp", "Projector"]}
              title={"Classroom Power Consumption"}
              feature={["s1", "s2", "s3"]}
            />
            <div className="mt-5"></div>
            <DataTable
              getAllData={getAllRHData}
              downloadAllData={downloadAllRHData}
              route={"radian"}
              desc={[
                "Temperature",
                "Humidity",
                "Wind (MPS)",
                "Globe Temperature",
                "PMV",
              ]}
              title={"Classroom statistic"}
              feature={["stemp", "shumid", "wind", "gtemp", "pmv"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
