const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

const courseControllers = require("../controllers/course.controllers");

router.post(
  "/new-course",
  authenticateToken,
  courseControllers.postCreateCourseController
);

router.get(
  "/get-all-courses",
  authenticateToken,
  courseControllers.getAllCoursesController
);

router.get(
  "/get-course-item/:courseId/:part",
  authenticateToken,
  courseControllers.getCourseItemsController
);

module.exports = router;
