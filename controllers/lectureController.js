import lecturesModel from "../models/lecturesModel.js";
import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";

export const createLecture = async (req, res) => {
  try {
    const {
      courseID,
      batchName,
      lectureDate,
      lectureTime,
      selectedInstructor,
    } = req.body;

    //validation
    switch (true) {
      case !batchName:
        return res.status(500).send({ error: "Batch Name is Required" });
      case !lectureDate:
        return res.status(500).send({ error: "Lecture Date is Required" });
      case !lectureTime:
        return res.status(500).send({ error: "Lecture Time is Required" });
      case !selectedInstructor:
        return res
          .status(500)
          .send({ error: "Selected Instructor is Required" });
    }

    //valistaion from cross batch setup
    const isLectureAvailable = await lecturesModel.findOne({
      instructorId: selectedInstructor,
      lectureDate,
      lectureTime,
    });

    if (isLectureAvailable) {
      return res.send({
        message: "Can not assign Same lecture to same Instructor",
      });
    }

    const lecture = new lecturesModel({
      batchName,
      lectureDate,
      lectureTime,
      instructorId: selectedInstructor,
      courseId: courseID,
    });

    await lecture.save();

    if (lecture) {
      return res.status(201).send({
        success: true,
        message: "Lecture Created Successfully",
        lecture,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "Failed to create lecture",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in creating lecture",
      error,
    });
  }
};

export const fetchLectures = async (req, res) => {
  try {
    let instructorId = req.query.instructorId;

    let lectures = await lecturesModel.find(
      instructorId ? { instructorId: instructorId } : {}
    );

    for await (const lec of lectures) {
      let instructor = await userModel.findById(lec.instructorId, {
        name: 1,
      });
      console.log(instructor);
      lec._doc.instructorId = instructor;
      let courseId = await courseModel.findById(lec.courseId, {
        name: 1,
        level: 1,
      });
      lec._doc.courseId = courseId;
    }

    if (lectures) {
      return res.status(201).send({
        success: true,
        message: "Lecture fetched Successfully",
        lectures,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "Failed to fetch lecture",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching lecture",
      error,
    });
  }
};
