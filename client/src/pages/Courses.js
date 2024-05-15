import React, { useState, useEffect } from "react";
import LectureModal from "../componets/LectureModel";
import axios from "axios";
import { domain, endPoints, getURLbyEndPoint } from "../services/apis";
import Layout from "../componets/Layout/Layout";
import { PiCertificateFill } from "react-icons/pi";

const Courses = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please add the name");
      return;
    }
    if (!level) {
      alert("Please add the level");
      return;
    }
    if (!description) {
      alert("Please add the description");
      return;
    }
    if (!image) {
      alert("Please upload the image");
      return;
    }

    const courseData = new FormData();
    courseData.append("name", name);
    courseData.append("level", level);
    courseData.append("description", description);
    courseData.append("image", image);

    try {
      const res = await axios.post(
        getURLbyEndPoint("createCourse"),
        courseData
      );

      if (res.data?.status) {
        setName("");
        setLevel("");
        setDescription("");
        setImage("");

        fetchCoursesList();
      }

      alert(res.data?.message);
      console.log("Instructor created:", res.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong when creating Course");
    }
  };

  //modal open
  const handleOpenModal = (courseId) => {
    setShowModal(true);
  };

  //modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLectureSubmit = (instructor, time) => {
    // Handle lecture creation here with instructor and time
    console.log("Creating lecture for instructor:", instructor);
    console.log("Lecture Time:", time);

    // Close the modal
    setShowModal(false);
  };

  const fetchCoursesList = async () => {
    try {
      const res = await axios.get(getURLbyEndPoint("fetchCourse"));

      console.log(res.data.courses);
      setCoursesList(res.data.courses);
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
        {/* form started*/}
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column mb-3  w-100"
        >
          <div className="d-flex align-items-center gap-3 mb-3">
            <PiCertificateFill className="fs-3 mb-0" />
            <h3 className="mb-0">Add Courses</h3>
          </div>
          <div>
            <div className="d-flex gap-3">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter course Name"
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
                  Course Level
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example "
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  required
                >
                  <option selected>select Level of Course</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter Description About Course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Add Image
              </label>{" "}
            </div>
            <div className="mb-3 form-check">
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div className="mb-3">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <h3 className="border-bottom border-2">Courses List</h3>
        <div className="d-flex w-100 justify-content-start align-align-items-baseline">
          {coursesList.length > 0 ? (
            <div className="d-flex flex-wrap justify-content-between">
              {coursesList.map((course, index) => (
                <div key={index} className="col-md-4">
                  <div
                    className="card my-4 text-center"
                    style={{ width: "16rem" }}
                  >
                    <img
                      src={
                        `http://localhost:8080/api/v1/course/fetchCoursePhoto/${course._id}` ||
                        "https://via.placeholder.com/150"
                      }
                      alt={course.name}
                      style={{ maxWidth: "100%", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Course Name: {course.name}</h5>
                      <h6>Level: {course.level}</h6>
                      <p className="card-text">
                        Description: {course.description}
                      </p>
                      {/* Add button to create lecture */}
                      <LectureModal
                        showModal={showModal}
                        handleClose={handleCloseModal}
                        courseID={course._id}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span>No Courses Are Avilable</span>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
