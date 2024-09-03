import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";

export const processChartPeople = (rawData: any[]) => {
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  );
  const total = rawData.map((item) => item.total);
  return { dates, total };
};

export const processChartSocket = (rawData: any[]) => {
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  );
  const s1 = rawData.map((item) => item.s1);
  const s2 = rawData.map((item) => item.s2);
  const s3 = rawData.map((item) => item.s3);
  return { dates, s1, s2, s3 };
};

export const processRoomStat = (rawData: any[]) => {
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

export const processRHdata = (rawData: any[]) => {
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  );
  const stemp = rawData.map((item) => item.stemp);
  const shumid = rawData.map((item) => item.shumid);
  const wind = rawData.map((item) => item.wind);
  const gtemp = rawData.map((item) => item.gtemp);
  const pmv = rawData.map((item) => item.pmv);
  // console.log(power.slice(1, 10));
  return { dates, stemp, shumid, wind, gtemp, pmv };
};

export const ExportToExcel = async (fetchData: any, fileName: any) => {
  const apiData = await fetchData();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

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

export const delData = async (route: string, id: string, API: any) => {
  try {
    await axios.delete(
      `https://classroom-api.vercel.app/${route}/delete/${id}`
    );
    alert("Data deleted");
    API();
  } catch (error) {
    console.log(error);
  }
};
