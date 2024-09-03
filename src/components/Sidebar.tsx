import andalasLogo from "../assets/andalas-univ.png";
import { BiHome } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="col-md-3 sidebar-bg sidebar">
        <h1 className="side-title">
          <img className="img-fluid andalas-logo" src={andalasLogo} />
          Dashboard Smart Classroom
        </h1>
        <div className="row">
          <ul className="list-side">
            <li className="list-item">
              <Link to="/">
                {" "}
                <BiHome /> Dashboard
              </Link>
            </li>
            <li className="list-item">
              <Link to="/setting">Setting Data</Link>
            </li>
            <li className="list-item">
              <Link to="/table">
                <BsTable /> Table
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
