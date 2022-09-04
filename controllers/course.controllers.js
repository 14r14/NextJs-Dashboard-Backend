const User = require("../models/user.model");
const Course = require("../models/course.model");

exports.postCreateCourseController = (req, res) => {
  const name = req.body.courseTitle;
  const description = req.body.courseDescription;
  const language = req.body.courseLanguage;
  const courseParts = req.body.courseParts;
  Course.findOne({
    courseName: name,
  }).then((course) => {
    if (course) {
      return res.json({
        success: false,
        code: "coursealrex",
      });
    }
    const newCourse = new Course({
      courseName: name,
      description: description,
      user: req.user._id,
      language: language,
      notionPageIds: courseParts,
    });
    newCourse.save().then((result) => {
      return res.json({
        success: true,
      });
    });
  });
};

exports.getAllCoursesController = (req, res) => {
  Course.find({}, '-user -notionPageIds')
    .then((courses) => {
      return res.json({
        courses,
      });
    });
};

exports.getCourseItemsController = (req, res) => {
  console.log("Requesting course items...");
  const courseId = req.params.courseId;
  const part = req.params.part;
  const user = req.user._id;
  Course.findById(courseId).then((course) => {
    if (!course) {
      return res.json({
        success: false,
        code: "coursenotfound",
      });
    }
    const pageId = course.notionPageIds[part].notionPgId;
    const partTitle = course.notionPageIds[part].title;
    return res.json({
      success: true,
      pageId,
      partTitle,
    });
  });
};
