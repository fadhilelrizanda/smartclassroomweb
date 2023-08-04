import andalasLogo from "../assets/andalas-univ.png";
import { BiHome } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { LuLampCeiling } from "react-icons/lu";
import { PiFanBold } from "react-icons/pi";
import { BiWind } from "react-icons/bi";
import { BsFillProjectorFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line C  ",
    // },
  },
};

const processChartPeople = (rawData: any[]) => {
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  );
  const total = rawData.map((item) => item.total);
  return { dates, total };
};

const processRoomStat = (rawData: any[]) => {
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  );
  const temp = rawData.map((item) => item.temp);
  const humid = rawData.map((item) => item.humid);
  const current = rawData.map((item) => item.current);
  const power = rawData.map((item) => item.power);
  // console.log(power.slice(1, 10));
  return { dates, temp, humid, current, power };
};

function Content() {
  const [peopleChart, setPeopleChart] = useState([]);
  const [classStat, setClassStat] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    axios
      .get("https://classroom-api.vercel.app/class/getAll")
      .then((response) => {
        setPeopleChart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("https://classroom-api.vercel.app/roomstat/getAll")
      .then((response) => {
        setClassStat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const peopleChartData = processChartPeople(peopleChart);
  let currentPeople = peopleChartData.total.slice(-1);
  currentPeople = currentPeople[0];
  console.log(currentPeople);
  const data_people = {
    labels: peopleChartData.dates,
    datasets: [
      {
        label: "Total People",
        data: peopleChartData.total,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const statData = processRoomStat(classStat);
  let currentTemp = statData.temp.slice(-1);
  currentTemp = currentTemp[0];

  let currentHumid = statData.humid.slice(-1);
  currentHumid = currentHumid[0];

  let currentCurrent = statData.current.slice(-1);
  currentCurrent = currentCurrent[0];

  let currentPower = statData.power.slice(-1);
  currentPower = currentPower[0];

  console.log(currentTemp);
  const tempGraph = {
    labels: statData.dates,
    datasets: [
      {
        label: "Temperature Graph",
        data: statData.temp,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const humidGraph = {
    labels: statData.dates,
    datasets: [
      {
        label: "Humidity Graph",
        data: statData.humid,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const currentGraph = {
    labels: statData.dates,
    datasets: [
      {
        label: "AC Current Consumption",
        data: statData.current,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const powerGraph = {
    labels: statData.dates,
    datasets: [
      {
        label: "AC Power Consumption",
        data: statData.power,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 sidebar-bg sidebar">
            <h1 className="side-title">
              <img className="img-fluid andalas-logo" src={andalasLogo} />
              Dashboard Smart Classroom
            </h1>
            <div className="row">
              <ul className="list-side">
                <li className="list-item">
                  <a href="#">
                    {" "}
                    <BiHome /> Dashboard
                  </a>
                </li>
                <li className="list-item">
                  <a href="#">
                    <AiOutlineSetting /> Setting Data
                  </a>
                </li>
                <li className="list-item">
                  <a href="#">
                    <BsTable /> Table
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-9 content-bg">
            <h1> Dashboard</h1>

            <div className="classroom-stat">
              <h3>Classroom Statistic</h3>
              <div className="row stat1">
                <div className="col card">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BsFillPersonFill />
                      </i>
                      Total People
                    </h3>
                    <h2>{currentPeople}</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <FaTemperatureHigh />
                      </i>
                      Current Temperature
                    </h3>
                    <h2>{currentTemp} Celcius</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <WiHumidity />
                      </i>
                      Current Humidity
                    </h3>
                    <h2>{currentHumid} %</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="classroom-stat">
              <h3>Classroom Status</h3>
              <div className="row stat1">
                <div className="col card">
                  <div className="col-item">
                    <h3>
                      <i>
                        <LuLampCeiling />
                      </i>
                      Lamp Status
                    </h3>
                    <h2>ON</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <PiFanBold />
                      </i>
                      Fan Status
                    </h3>
                    <h2>OFF</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="classroom-stat">
              <h3>Classroom Energy Consumption</h3>
              <div className="row stat1">
                <div className="col card">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BiWind />
                      </i>
                      Air Conditioner Power
                    </h3>
                    <h2>{currentPower} watt</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <LuLampCeiling />
                      </i>
                      Lamp Power
                    </h3>
                    <h2>23 watt</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <PiFanBold />
                      </i>
                      Fan Power
                    </h3>
                    <h2>50 watt</h2>
                  </div>
                </div>
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BsFillProjectorFill />
                      </i>
                      Projector Power
                    </h3>
                    <h2>50 watt</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="classroom-stat">
              <h3>Graph Statistic</h3>
              <div className="row mb-5">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BsFillPersonFill />
                      </i>
                      People Graph
                    </h3>
                    <Line options={options} data={data_people} />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BsFillPersonFill />
                      </i>
                      Temperature Graph
                    </h3>
                    <Line options={options} data={tempGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BsFillPersonFill />
                      </i>
                      Humidity Graph
                    </h3>
                    <Line options={options} data={humidGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BsFillPersonFill />
                      </i>
                      Air Conditioner Current Graph
                    </h3>
                    <Line options={options} data={currentGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BsFillPersonFill />
                      </i>
                      Air Conditioner Power Graph
                    </h3>
                    <Line options={options} data={powerGraph} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
