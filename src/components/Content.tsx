import { BsFillPersonFill } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { LuLampCeiling } from "react-icons/lu";
import { PiFanBold } from "react-icons/pi";
import { BiWind } from "react-icons/bi";
import { BsFillProjectorFill } from "react-icons/bs";
import { MdOutlineElectricBolt } from "react-icons/md";
import { useEffect, useState } from "react";
import moment from "moment";
import Iframe from "react-iframe";

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
import Sidebar from "./Sidebar";

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
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Total People",
      },
    },
  },
};

export const option_people = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Total People",
      },
    },
  },
};

export const options_temp = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Temperature (Celcius)",
      },
    },
  },
};

export const options_humid = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Humidity (%)",
      },
    },
  },
};

export const options_current = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Current (Amp)",
      },
    },
  },
};

export const options_power = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Power (W)",
      },
    },
  },
};

const processChartPeople = (rawData: any[]) => {
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  );
  const total = rawData.map((item) => item.total);
  return { dates, total };
};

const processChartSocket = (rawData: any[]) => {
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  );
  const s1 = rawData.map((item) => item.s1);
  const s2 = rawData.map((item) => item.s2);
  const s3 = rawData.map((item) => item.s3);
  return { dates, s1, s2, s3 };
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
  const state_devices = ["OFF", "ON"];
  const [peopleChart, setPeopleChart] = useState([]);
  const [classStat, setClassStat] = useState([]);
  const [acStat, setAcStat] = useState([]);
  const [socketStat, setSocketStat] = useState([]);

  const classGet = async () => {
    axios
      .get("https://classroom-api.vercel.app/class/getAll")
      .then((response) => {
        setPeopleChart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const roomstatGet = async () => {
    axios
      .get("https://classroom-api.vercel.app/roomstat/getAll")
      .then((response) => {
        setClassStat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const acStatGet = async () => {
    axios
      .get("https://classroom-api.vercel.app/acstat/getLatest")
      .then((response) => {
        setAcStat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const relayStatGet = async () => {
    axios
      .get("https://classroom-api.vercel.app/socketstat/getAll")
      .then((response) => {
        setSocketStat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      classGet();
      roomstatGet();
      acStatGet();
      relayStatGet();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
    // Fetch data from the API using Axios
  }, []);

  const peopleChartData = processChartPeople(peopleChart);
  let currentPeople = peopleChartData.total.slice(-1);
  currentPeople = currentPeople[0];

  let slice_param = 20;
  const data_people = {
    labels: peopleChartData.dates.slice(0, slice_param),
    datasets: [
      {
        label: "Total People",
        data: peopleChartData.total.slice(0, slice_param),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(240,255,240)",
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

  const tempGraph = {
    labels: statData.dates.slice(-slice_param),
    datasets: [
      {
        label: "Temperature Graph",
        data: statData.temp.slice(-slice_param),
        borderColor: "rgb(255,140,0)",
        backgroundColor: "rgb(240,255,240)",
        tension: 0.3,
      },
    ],
  };

  const humidGraph = {
    labels: statData.dates.slice(-slice_param),
    datasets: [
      {
        label: "Humidity Graph",
        data: statData.humid.slice(-slice_param),
        borderColor: "rgb(65,105,225)",
        backgroundColor: "rgb(240,255,240)",
        tension: 0.3,
      },
    ],
  };

  const currentGraph = {
    labels: statData.dates.slice(-slice_param),
    datasets: [
      {
        label: "AC Current Consumption",
        data: statData.current.slice(-slice_param),
        borderColor: "rgb(154,205,50)",
        backgroundColor: "rgb(240,255,240)",
        tension: 0.3,
      },
    ],
  };

  const powerGraph = {
    labels: statData.dates.slice(-slice_param),
    datasets: [
      {
        label: "AC Power Consumption",
        data: statData.power.slice(-slice_param),
        borderColor: "rgb(112,128,144)",
        backgroundColor: "rgb(240,255,240)",
        tension: 0.3,
      },
    ],
  };

  const socketData = processChartSocket(socketStat);
  const fanPowerGraph = {
    labels: socketData.dates.slice(-slice_param),
    datasets: [
      {
        label: "fan Power Consumption",
        data: socketData.s1.slice(-slice_param),
        borderColor: "rgb(112,128,144)",
        backgroundColor: "rgb(240,255,240)",
        tension: 0.3,
      },
    ],
  };

  const lampPowerGraph = {
    labels: socketData.dates.slice(-slice_param),
    datasets: [
      {
        label: "fan Power Consumption",
        data: socketData.s2.slice(-slice_param),
        borderColor: "rgb(112,128,144)",
        backgroundColor: "rgb(240,255,240)",
        tension: 0.3,
      },
    ],
  };

  const projektorPowerGraph = {
    labels: socketData.dates.slice(-slice_param),
    datasets: [
      {
        label: "fan Power Consumption",
        data: socketData.s3.slice(-slice_param),
        borderColor: "rgb(112,128,144)",
        backgroundColor: "rgb(240,255,240)",
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <div className="col-md-9 content-bg">
            <h1> Dashboard</h1>

            <div className="row justify-content-center stat1">
              <h3>Classroom Location</h3>
              <div className="col-8 card">
                <div className="col-item">
                  <Iframe
                    url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.327615384929!2d100.46348181323786!3d-0.9141914801323885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7bdd849eb0b%3A0xe44db7bc55dd4774!2sJurusan%20Teknik%20Mesin!5e0!3m2!1sid!2sid!4v1692108915606!5m2!1sid!2sid"
                    width="100%"
                    height="480px"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col card loc">
                <p>Gedung : Jurusan Teknik Mesin</p>
              </div>

              <div className="col card loc">
                <p>Ruangan : Ruangan Bersama Teknik Mesin</p>
              </div>

              <div className="col card loc">
                <p>Longitude : -0.9141365018472299 </p>
              </div>

              <div className="col card loc">
                <p>Latitude : 100.46415638877296</p>
              </div>
            </div>

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
                    <h2>{state_devices[0]}</h2>
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
                    <h2>{state_devices[0]}</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BiWind />
                      </i>
                      AC Status
                    </h3>
                    {acStat.map((data) => {
                      return (
                        <h2 key={data["_id"]}>
                          {state_devices[data["condition"]]}
                        </h2>
                      );
                    })}
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BiWind />
                      </i>
                      AC Set Point Temperature
                    </h3>
                    {acStat.map((data) => {
                      return (
                        <h2 key={data["_id"]}>{data["temperature"]} Celcius</h2>
                      );
                    })}
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
                        <FaTemperatureHigh />
                      </i>
                      Temperature Graph
                    </h3>
                    <Line options={options_temp} data={tempGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <WiHumidity />
                      </i>
                      Humidity Graph
                    </h3>
                    <Line options={options_humid} data={humidGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <MdOutlineElectricBolt />
                      </i>
                      Air Conditioner Current Graph
                    </h3>
                    <Line options={options_current} data={currentGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <MdOutlineElectricBolt />
                      </i>
                      Fan Power Graph
                    </h3>
                    <Line options={options_power} data={fanPowerGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <MdOutlineElectricBolt />
                      </i>
                      Lamp Power Graph
                    </h3>
                    <Line options={options_power} data={lampPowerGraph} />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>
                      <i>
                        <MdOutlineElectricBolt />
                      </i>
                      Projektor Power Graph
                    </h3>
                    <Line options={options_power} data={projektorPowerGraph} />
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
