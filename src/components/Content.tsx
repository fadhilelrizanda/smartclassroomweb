import { BsFillPersonFill } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { LuLampCeiling } from "react-icons/lu";
import { PiFanBold } from "react-icons/pi";
import { BiWind } from "react-icons/bi";
import { BsFillProjectorFill } from "react-icons/bs";
import { MdOutlineElectricBolt } from "react-icons/md";
import { useEffect, useState } from "react";
import Iframe from "react-iframe";
import LineChart from "./LineChart";
import {
  processChartPeople,
  processChartSocket,
  processRHdata,
  processRoomStat,
} from "./utils/utils";

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
import Sidebar from "./Sidebar";
import {
  getLatestACStat,
  getLatestPeopleData,
  getLatestRelayStat,
  getLatestRHdata,
  getLatestRoomStat,
  getLatestSocketStat,
} from "./API/ApiFetch";

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

function Content() {
  const state_devices = ["OFF", "ON"];
  const [relayStat, setRelayStat] = useState([]);
  const [latestPeopleData, setLatestPeople] = useState([]);
  const [classStat, setClassStat] = useState([]);
  const [acStat, setAcStat] = useState([]);
  const [socketStat, setSocketStat] = useState([]);
  const [rHData, setRHdata] = useState([]);

  const fetchData = async () => {
    try {
      const peopleLatestData = await getLatestPeopleData(20);
      setLatestPeople(peopleLatestData);
      const roomData = await getLatestRoomStat(20);
      setClassStat(roomData);
      const acStatData = await getLatestACStat(1);
      setAcStat(acStatData);
      const SocketStatData = await getLatestSocketStat(20);
      setSocketStat(SocketStatData);
      const relayData = await getLatestRelayStat(1);
      setRelayStat(relayData);
      const rhFetchData = await getLatestRHdata(20);
      setRHdata(rhFetchData);
    } catch (error) {
      // Handle errors if needed
      console.error("Error fetching people data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const peopleChartData = processChartPeople(latestPeopleData);
  const currentPeople = peopleChartData.total.slice(-1);

  const statData = processRoomStat(classStat);
  let currentTemp = statData.temp.slice(-1);
  currentTemp = currentTemp[0];

  let currentHumid = statData.humid.slice(-1);
  currentHumid = currentHumid[0];

  let currentCurrent = statData.current.slice(-1);
  currentCurrent = currentCurrent[0];

  let currentPower = statData.power.slice(-1);
  currentPower = currentPower[0];

  const socketData = processChartSocket(socketStat);
  let currentFan = socketData.s1.slice(-1);
  let currentLamp = socketData.s2.slice(-1);
  let currentProjektor = socketData.s3.slice(-1);

  const rhProcessedData = processRHdata(rHData);
  const stempData = rhProcessedData.stemp.slice(-1);
  const shumidData = rhProcessedData.shumid.slice(-1);
  const windData = rhProcessedData.wind.slice(-1);
  const globeData = rhProcessedData.gtemp.slice(-1);
  const PMVData = rhProcessedData.pmv.slice(-1);

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
              <h3>Latest Classroom Status</h3>
              <div className="row stat1">
                <div className="col card">
                  <div className="col-item">
                    <h3>
                      <i>
                        <LuLampCeiling />
                      </i>
                      Lamp Status
                    </h3>

                    {relayStat.map((data) => {
                      return (
                        <h2 key={data["_id"]}>{state_devices[data["lamp"]]}</h2>
                      );
                    })}
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

                    {relayStat.map((data) => {
                      return (
                        <h2 key={data["_id"]}>{state_devices[data["fan"]]}</h2>
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
              <h3>Latest Classroom Energy Consumption</h3>
              <div className="row stat1">
                <div className="col card">
                  <div className="col-item">
                    <h3>
                      <i>
                        <BiWind />
                      </i>
                      Air Conditioner Power
                    </h3>
                    <h2>{(Number(currentPower) * 220).toFixed(2)} watt</h2>
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
                    <h2>{(Number(currentLamp) * 220).toFixed(2)} Watt</h2>
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
                    <h2>{(Number(currentFan) * 220).toFixed(2)} Watt</h2>
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
                    <h2>{(Number(currentProjektor) * 220).toFixed(2)} Watt</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="classroom-stat">
              <h3>Latest RH Stat</h3>
              <div className="row stat1">
                <div className="col card">
                  <div className="col-item">
                    <h3>RH Temperature</h3>
                    <h2>{Number(stempData).toFixed(2)}</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>RH Humidity</h3>
                    <h2>{Number(shumidData).toFixed(2)}</h2>
                  </div>
                </div>

                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>Wind</h3>
                    <h2>{Number(windData).toFixed(2)}</h2>
                  </div>
                </div>
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>Globe Temp</h3>
                    <h2>{Number(globeData).toFixed(2)}</h2>
                  </div>
                </div>
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>PMV</h3>
                    <h2>{Number(PMVData).toFixed(2)}</h2>
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

                    <LineChart
                      data={peopleChartData.total}
                      xtitle="People"
                      title="Number of People in The Class"
                      label={peopleChartData.dates}
                    />
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
                    <LineChart
                      data={statData.temp}
                      xtitle="Celcius (C)"
                      title="Temperature"
                      label={statData.dates}
                    />
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
                    <LineChart
                      data={statData.humid}
                      xtitle="Humidity (%)"
                      title="Humidity"
                      label={statData.dates}
                    />
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

                    <LineChart
                      data={statData.current}
                      xtitle="Current (A)"
                      title="AC Current"
                      label={statData.dates}
                    />
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
                    <LineChart
                      data={socketData.s1}
                      xtitle="Watt (W)"
                      title="Power"
                      label={socketData.dates}
                    />
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

                    <LineChart
                      data={socketData.s2}
                      xtitle="Watt (W)"
                      title="Power"
                      label={socketData.dates}
                    />
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
                    <LineChart
                      data={socketData.s3}
                      xtitle="Watt (W)"
                      title="Power"
                      label={socketData.dates}
                    />
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
                      RH Temperature
                    </h3>
                    <LineChart
                      data={rhProcessedData.stemp}
                      xtitle="Temperature (Celcius)"
                      title="Temperature"
                      label={rhProcessedData.dates}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>RH Humidity</h3>
                    <LineChart
                      data={rhProcessedData.shumid}
                      xtitle="Humidity (%)"
                      title="Humidity"
                      label={rhProcessedData.dates}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>RH Wind</h3>
                    <LineChart
                      data={rhProcessedData.wind}
                      xtitle="MPS"
                      title="Wind"
                      label={rhProcessedData.dates}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>RH Globe Temperature</h3>
                    <LineChart
                      data={rhProcessedData.gtemp}
                      xtitle="Temperature(Celcius)"
                      title="Globe Temperature"
                      label={rhProcessedData.dates}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col card offset-md-1">
                  <div className="col-item">
                    <h3>RH PMV</h3>
                    <LineChart
                      data={rhProcessedData.pmv}
                      xtitle="PMV"
                      title="PMV"
                      label={rhProcessedData.dates}
                    />
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
