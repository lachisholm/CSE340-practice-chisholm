/**
 * Faculty controller
 * Handles request logic for faculty list and faculty detail pages
 */

const {
  getFacultyById,
  getSortedFaculty
} = require('../../models/faculty/faculty');

/**
 * Render the faculty directory list page
 * Supports optional query parameter sorting (?sort=name, department, title)
 */
const facultyListPage = (req, res) => {
  const sortBy = req.query.sort;

  const facultyList = getSortedFaculty(sortBy);

  res.render('faculty/list', {
    title: 'Faculty Directory',
    faculty: facultyList,
    sort: sortBy || 'name'
  });
};

/**
 * Render the detail page for a specific faculty member
 * Uses route parameter :facultyId
 * Returns a 404 error page if facultyId is invalid
 */
const facultyDetailPage = (req, res, next) => {
  const facultyId = req.params.facultyId;

  const facultyMember = getFacultyById(facultyId);

  if (!facultyMember) {
    const error = new Error('Faculty member not found');
    error.status = 404;
    return next(error);
  }

  res.render('faculty/detail', {
    title: facultyMember.name,
    faculty: facultyMember
  });
};

// Export controller functions
module.exports = {
  facultyListPage,
  facultyDetailPage
};
