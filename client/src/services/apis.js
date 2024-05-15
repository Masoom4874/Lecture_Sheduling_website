const domain = "http://localhost:8080";

const endPoints = {
  login: "/api/v1/auth/login/",
  getInstructors: "/api/v1/instructor/fetchInstructors",
  createInstructor: "/api/v1/auth/register/",

  createCourse: "/api/v1/course/createCourse",
  fetchCourse: "/api/v1/course/fetchCourse",

  createLecture: "/api/v1/lecture/createLecture",
  fetchLectures: "/api/v1/lecture/fetchLectures",
};

function getURLbyEndPoint(endpoint) {
  return domain + endPoints[endpoint];
}

export { domain, endPoints, getURLbyEndPoint };
