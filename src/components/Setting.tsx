import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function Setting() {
  const [acStat, setAcStat] = useState([]);
  const [dataCondition, setDataCondition] = useState(0);
  const [dataTemp, setDataTemp] = useState(0);
  //   const [relayStat, setRelayStat] = useState([]);
  const state = ["OFF", "ON"];

  const handleSubmitAc = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Data Condition : " + dataCondition);
    console.log("Data dataTemp : " + dataTemp);

    function refreshPage() {
      window.location.reload();
    }

    const post = {
      condition: dataCondition,
      temperature: dataTemp,
    };
    try {
      const res = await axios.post(
        "https://classroom-api.vercel.app/acstat/post",
        post
      );
      console.log(res.data);
      alert("data AC submitted");
      refreshPage();
    } catch (e) {
      alert(e);
    }
  };

  const handleSubmitRelay = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Data Condition : " + dataCondition);
    console.log("Data dataTemp : " + dataTemp);

    function refreshPage() {
      window.location.reload();
    }

    const post = {
      condition: dataCondition,
      temperature: dataTemp,
    };
    try {
      const res = await axios.post(
        "https://classroom-api.vercel.app/acstat/post",
        post
      );
      console.log(res.data);
      alert("data AC submitted");
      refreshPage();
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    // Fetch data from the API using Axios
    axios
      .get("https://classroom-api.vercel.app/acstat/getLatest")
      .then((response) => {
        setAcStat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("https://classroom-api.vercel.app/acstat/getLatest")
      .then((response) => {
        setAcStat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div className="col-md-9 content-bg setting">
            <h4>Setting Data</h4>
            <form onSubmit={handleSubmitAc}>
              <div className="row mt-4 justify-content-center">
                <h5>Air Conditioner Controller</h5>
                <div className="col-md-5 card">
                  <div className="col-item">
                    <h3>Air Conditioner Status</h3>

                    {acStat.map((data) => {
                      return (
                        <p key={data["_id"]}>
                          Current Status : {state[data["condition"]]}
                        </p>
                      );
                    })}

                    <div className="form-check form-switch">
                      <input
                        onChange={(e) =>
                          setDataCondition(parseInt(e.target.value))
                        }
                        value="1"
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Turn OFF/ON
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 card">
                  <div className="col-item">
                    <h3>Air Conditioner Temperature</h3>

                    {acStat.map((data) => {
                      return (
                        <p key={data["_id"]}>
                          Setpoint Temperature : {data["temperature"]} Celcius
                        </p>
                      );
                    })}
                    <select
                      onChange={(e) => setDataTemp(parseInt(e.target.value))}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-8 d-grid">
                  <button className="mt-4 btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <form onSubmit={handleSubmitRelay}>
              <div className="row mt-4 justify-content-center">
                <h5>Fan & Lamp Controller</h5>
                <div className="col-md-5 card">
                  <div className="col-item">
                    <h3>Fan Status</h3>

                    {acStat.map((data) => {
                      return (
                        <p key={data["_id"]}>
                          Current Status : {state[data["condition"]]}
                        </p>
                      );
                    })}

                    <div className="form-check form-switch">
                      <input
                        onChange={(e) =>
                          setDataCondition(parseInt(e.target.value))
                        }
                        value="1"
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Turn OFF/ON
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 card">
                  <div className="col-item">
                    <h3>Lamp Status</h3>

                    {acStat.map((data) => {
                      return (
                        <p key={data["_id"]}>
                          Current Status : {state[data["condition"]]}
                        </p>
                      );
                    })}

                    <div className="form-check form-switch">
                      <input
                        onChange={(e) =>
                          setDataCondition(parseInt(e.target.value))
                        }
                        value="1"
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Turn OFF/ON
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-8 d-grid">
                  <button className="mt-4 btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
