import { useEffect, useState } from "react";
import moment from "moment";

import "./PeopleTable.css";
import { delData, ExportToExcel } from "./utils/utils";

interface DataTableProps {
  getAllData: any;
  downloadAllData: any;
  route: string;
  desc: string[];
  feature: string[];
  title: string;
}

function DataTable({
  getAllData,
  downloadAllData,
  route,
  desc,
  title,
  feature,
}: DataTableProps) {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getDataPeople = async () => {
    try {
      const data = await getAllData(itemsPerPage, currentPage);
      setTableData(data.items); // Assuming your API returns data in { items: [...], total: ... }
      setTotalPages(data.totalPages); // Assuming your API returns the total number of pages
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataPeople();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // Extracting column headers dynamically
  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  const getPaginationRange = () => {
    const delta = 2; // Number of page numbers to show on either side of the current page
    const range = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <>
      <div className="wrapper-table">
        <h4 className="text-center">{title} in the class</h4>
        <div className="btn-wrapper">
          <button
            onClick={() => {
              ExportToExcel(downloadAllData, title);
            }}
            className="btn btn-success"
          >
            Download Data
          </button>
          <button className="btn btn-danger">Reset All</button>
        </div>

        <div className="row justify-content-center mt-1">
          <div className="col-md-10">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  {desc.map((value, index) => (
                    <th scope="col" key={index}>
                      {value}
                    </th>
                  ))}
                  <th scope="col">Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={data["_id"]}>
                    <th scope="row">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                      {"."}
                    </th>
                    {feature.map((val, index) => (
                      <td key={index}>{data[val]}</td>
                    ))}
                    <td>
                      {moment(data["updatedAt"]).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          delData(route, data["_id"], getDataPeople)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(1)}
              >
                First
              </button>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {currentPage > 3 && <span>...</span>}
              {getPaginationRange().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={pageNumber === currentPage ? "active" : ""}
                >
                  {pageNumber}
                </button>
              ))}
              {totalPages - currentPage > 2 && <span>...</span>}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTable;
