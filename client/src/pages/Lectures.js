import React, { useState, useEffect } from "react";
import Layout from "../componets/Layout/Layout";
import axios from "axios";
import { getURLbyEndPoint } from "../services/apis";

const Lectures = () => {
  const [LecturesList, setLectureList] = useState([]);

  const fetchCoursesList = async () => {
    try {
      const res = await axios.get(getURLbyEndPoint("fetchLectures"));

      setLectureList(res.data.lectures);
    } catch (error) {
      console.error(error);
      alert("Something went getting Courses List");
    }
  };

  useEffect(() => {
    fetchCoursesList();
  }, []);
  return (
    <Layout>
      <div className="d-flex flex-column align-items-start justify-content-start w-100">
        <h3 className="border-bottom border-2">Lectures List</h3>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Sr No.</th>
              <th>Batch Name</th>
              <th>Lecture Shedule</th>
              <th>Instructor Name</th>
              <th>Course Details</th>
            </tr>
          </thead>
          <tbody>
            {LecturesList.length > 0 ? (
              LecturesList.map((lectureData, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{lectureData.batchName}</td>
                  <td>
                    {lectureData.lectureTime} <br />
                    {lectureData.lectureDate}
                  </td>
                  <td>{lectureData.instructorId.name}</td>
                  <td>
                    {" "}
                    {lectureData.courseId.name} <br />
                    {lectureData.courseId.level}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="5">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Lectures;
