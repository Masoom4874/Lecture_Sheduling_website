import courseModel from "../models/courseModel.js";
import fs from "fs";

import lectureDateMapModel from "../models/lectureDateMap.js";
import { uploadToS3Bucket } from "../Helpers/fileUpload.js";

//POST LOGIN
export const createCourse = async (req, res) => {
  try {
    const { name, level, description, lectures } = req.body;

    const { image } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !level:
        return res.status(500).send({ error: "Level is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case image && image.size > 10000000:
        return res
          .status(500)
          .send({ error: "Image is Required and should be less than 10 mb" });
    }

    const course = new courseModel({
      name,
      level,
      description,
      image,
    });

    await course.save();

    if (course) {
      return res.status(201).send({
        success: true,
        message: "Course Created Successfully",
        course,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "Failed to create course",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

export const fetchCourse = async (req, res) => {
  try {
    let courses = await courseModel.find().select("-image");

    if (courses) {
      return res.status(201).send({
        success: true,
        message: "courses fetched Successfull",
        courses,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "Failed to fetch course",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//get photo
export const productPhotoController = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.pid).select("image");

    if (course && course.image && course.image.data) {
      // Check if course.image exists
      res.set("Content-Type", course.image.contentType);
      return res.status(200).send(course.image.data);
    } else {
      return res.status(404).send({ message: "Course photo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Error while getting course photo",
      error: error.message,
    });
  }
};

export const assignLectureToLecturer = async (req, res) => {
  try {
    const { lectureId, date, userId } = req.body;

    let existingLecture = await lectureDateMapModel.findOne({
      date: date,
      instructor: userId,
    });
    if (existingLecture) {
      return res.status(201).send({
        success: false,
        message: "Already Have lecture of this instructor on same day",
        lectures,
      });
    }

    let lectures = await lectureDateMapModel.create({
      lectureId,
      date,
      instructor: userId,
    });

    if (lectures) {
      return res.status(201).send({
        success: true,
        message: "lectures Successfull",
        lectures,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "Failed to fetch lectures",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

export const fetchLecturesTimeTable = async (req, res) => {
  try {
    let lectures = await lectureDateMap.find().populate("user");

    if (lectures) {
      return res.status(201).send({
        success: true,
        message: "lectures  Successfull",
        lectures,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "Failed to fetch lectures",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};
