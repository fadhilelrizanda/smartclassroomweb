import Sidebar from "./Sidebar";

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
