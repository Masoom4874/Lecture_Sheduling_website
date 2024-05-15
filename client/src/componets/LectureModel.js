import axios from "axios";
import React, { useEffect, useState } from "react";
import { getURLbyEndPoint } from "../services/apis";

const LectureModal = ({ courseID }) => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [batchName, setBatchName] = useState("");
  const [lectureDate, setLectureDate] = useState("");
  const [lectureTime, setLectureTime] = useState("");
  const [instructorList, setInstructoList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedInstructor) {
      alert("Please select Instructor Name");
      return;
    }
    if (!batchName) {
      alert("Please add Batch Name");
      return;
    }
    if (!lectureTime) {
      alert("Please add lecture Time");
      return;
    }
    if (!lectureDate) {
      alert("Please Select Lecture Date");
      return;
    }

    try {
      const res = await axios.post(getURLbyEndPoint("createLecture"), {
        courseID,
        selectedInstructor,
        batchName,
        lectureTime,
        lectureDate,
      });

      if (res.data?.status) {
        selectedInstructor("");
        setBatchName("");
        setLectureDate("");
        setInstructoList("");
      }

      alert(res.data?.message);
      console.log("Lecture created:", res.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong when creating Lecture");
    }
  };

  const fetchInstructorList = async () => {
    try {
      const res = await axios.get(getURLbyEndPoint("getInstructors"));

      console.log("checking", res.data.decryptedInstructorsList);
      setInstructoList(res.data.decryptedInstructorsList);
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
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create Lecture
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Create Lecture
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {" "}
              <form>
                <div className="d-flex justify-content-between gap-3 text-start">
                  <div className="mb-3 w-50">
                    <label htmlFor="lectureInstructor" className="form-label">
                      Select Instructor
                    </label>
                    <select
                      className="form-select"
                      id="lectureInstructor"
                      value={selectedInstructor}
                      onChange={(e) => setSelectedInstructor(e.target.value)}
                      required
                    >
                      <option value="">Select an Instructor</option>
                      {instructorList.map((instructor) => (
                        <option key={instructor._id} value={instructor._id}>
                          {instructor.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3 w-50">
                    <label htmlFor="lectureInstructor" className="form-label">
                      Enter Batch Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="batchName"
                      value={batchName}
                      onChange={(e) => setBatchName(e.target.value)}
                      placeholder="Enter Batch Name"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between gap-3 text-start">
                  <div className="mb-3 w-50">
                    <label htmlFor="lectureTime" className="form-label">
                      Lecture Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="lectureDate"
                      value={lectureDate}
                      min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
                      onChange={(e) => setLectureDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 w-50">
                    <label htmlFor="lectureTime" className="form-label">
                      Lecture Time
                    </label>
                    <select
                      className="form-select"
                      id="lectureTime"
                      value={lectureTime}
                      onChange={(e) => setLectureTime(e.target.value)}
                      required
                    >
                      <option value="">Select Lecture Time</option>
                      {[
                        "10:00 AM to 12:00 PM",
                        "12:00 PM to 2:00 PM",
                        "2:00 PM to 4:00 PM",
                        "4:00 PM to 6:00 PM",
                      ].map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Create Lecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureModal;

// <div className="modal-overlay">
//   <div className="modal">
//     <h2>Create Lecture</h2>
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="lectureInstructor" className="form-label">
//           Select Instructor
//         </label>
//         <select
//           className="form-select"
//           id="lectureInstructor"
//           value={selectedInstructor}
//           onChange={(e) => setSelectedInstructor(e.target.value)}
//           required
//         >
//           {/* ... (options) */}
//         </select>
//       </div>
//       <div className="mb-3">
//         <label htmlFor="lectureTime" className="form-label">
//           Lecture Time
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="lectureTime"
//           value={lectureTime}
//           onChange={(e) => setLectureTime(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Create
//       </button>
//       <button
//         type="button"
//         className="btn btn-secondary"
//         onClick={handleClose}
//       >
//         Cancel
//       </button>
//     </form>
//   </div>
// </div>
