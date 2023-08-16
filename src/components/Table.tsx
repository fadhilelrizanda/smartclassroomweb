import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function Table() {
  const ExportToExcel = (apiData: any, fileName: string) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(apiData);
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

  const [peopleData, setPeopleData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    getDataPeople();
    getRoomData();
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div className="col-md-9 content-bg setting">
            <h4>Table of People in the class</h4>
            <button
              onClick={() => {
                ExportToExcel(peopleData, "Test");
              }}
            >
              Download Data
            </button>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Total People</th>
                      <th scope="col">Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peopleData.map((data, index) => {
                      return (
                        <tr key={data["_id"]}>
                          <th scope="row">{index + 1}</th>
                          <td>{data["total"]}</td>
                          <td>
                            {moment(data["updatedAt"]).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </td>

                          <td>
                            <button
                              onClick={() => delData("class", data["_id"])}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <h4>Table of Parameter In Classroom</h4>
            <button
              onClick={() => {
                ExportToExcel(roomData, "Data Parameter");
              }}
            >
              Download Data
            </button>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Temperature (Celcius) </th>
                      <th scope="col">Humidity (%)</th>
                      <th scope="col">Ac Current (A)</th>
                      <th scope="col">Power (W)</th>
                      <th scope="col">Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomData.map((data, index) => {
                      return (
                        <tr key={data["_id"]}>
                          <th scope="row">{index + 1}</th>
                          <td>{data["temp"]}</td>
                          <td>{data["humid"]}</td>
                          <td>{data["current"]}</td>
                          <td>{data["power"]}</td>
                          <td>
                            {moment(data["updatedAt"]).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => delData("roomstat", data["_id"])}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
