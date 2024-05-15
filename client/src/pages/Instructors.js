import React, { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";
import { IoPersonAddSharp } from "react-icons/io5";
import { getURLbyEndPoint } from "../services/apis";
import { HttpService } from "../services/httpservice";
import axios from "axios";

const Instructor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instructors, setInstructors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(getURLbyEndPoint("createInstructor"), {
        name,
        email,
        password,
      });

      if (res.data.status) {
        setName("");
        setEmail("");
        setPassword("");

        await fetchInstructorList();
      }

      alert(res.data.message);
      console.log("Instructor created:", res.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong when creating Instructor");
    }
  };

  const fetchInstructorList = async () => {
    try {
      const res = await axios.get(getURLbyEndPoint("getInstructors"));

      setInstructors(res.data.decryptedInstructorsList);
    } catch (error) {
      console.error(error);
      alert("Something went getting Instructor List");
    }
  };

  useEffect(() => {
    fetchInstructorList();
  }, []);

  return (
    <>
      <Layout>
        <div className="d-flex flex-column align-items-start justify-content-start">
          {/* <h1>Instructors</h1> */}
          {/* <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Instructors</h1>
        {/* Display Instructors */}
          {/* <div className="mt-5">
          <div className="row text-center">
            {instructors.map((instructor, index) => (
              <div className="card m-4 text-center" style={{ width: "18" }}>
                <div className="card-body">
                  <h5 className="card-title">Name : {instructor.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Email : {instructor.email}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    uniqueID : {instructor.uniqueID}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>  */}

          {/* form started*/}
          <form onSubmit={handleSubmit} className="d-flex flex-column mb-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <IoPersonAddSharp className="fs-3 mb-0" />
              <h3 className="mb-0">Add Instructor</h3>
            </div>
            <div className="d-flex justify-content-between gap-5">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter instructor Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Set Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter New password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                Add Instructor
              </button>
            </div>
          </form>
          {/* 
          //list of all instractors --------------------------------------------------------
          ---------------------------------------------------------------------------------- */}

          <h3 className="border-bottom border-2">Instructors List</h3>

          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Level</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {instructors.length > 0 ? (
                instructors.map((instructor, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{instructor.name}</td>
                    <td>{instructor.email}</td>
                    <td>{instructor.password}</td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="4">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Instructor;
