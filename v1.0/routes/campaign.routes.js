const express = require("express");
const { logger } = require("../../middlewares/logger.js");
const { Campaign } = require("../models/campaign.model.js");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .get( async (req, res) => {
    try {
      const data = await Campaign.find({});
      res.status(200).json({
        success: true,
        message: "Campaigns fetched successfully",
        campaigns: data,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: "Error while fetching Campaigns",
      });
    }
  })
  .post(async (req, res) => {
    try { 
      const NewCampaign = new Campaign(req.body);
      const savedCampaign = await NewCampaign.save();
      res.status(201).json({
        success: true,
        message: "Campaign added successfully",
        campaign: savedCampaign,
      });
    } catch (e) {
      console.error("##########",e);
      res.status(500).json({
        success: false,
        message: "Error while creating Campaign",
      });
    }
  })

module.exports = router;
