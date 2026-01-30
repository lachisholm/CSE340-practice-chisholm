/**
 * Faculty routes
 * Defines URL routes for the faculty directory feature
 */

const express = require('express');
const router = express.Router();

// Import faculty controller functions
const {
  facultyListPage,
  facultyDetailPage
} = require('../controllers/faculty/faculty');

/**
 * Route: /faculty
 * Displays the faculty directory list
 * Supports optional sorting via query parameters
 */
router.get('/', facultyListPage);

/**
 * Route: /faculty/:facultyId
 * Displays details for an individual faculty member
 */
router.get('/:facultyId', facultyDetailPage);

// Export the router to be mounted in server.js
module.exports = router;
