const express = require('express');
const reviewRoutes = express.Router();
const { adminVerifyToken } = require('../../helpers/userVerifyToken');
const {
    getAllReview,
    deleteReview
} = require('../../controller/admin/review.controller');

reviewRoutes.get('/get-All-Review', adminVerifyToken, getAllReview);
reviewRoutes.delete('/delete-Review', adminVerifyToken, deleteReview);

module.exports = reviewRoutes;