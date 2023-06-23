const express = require("express");
const router = express.Router();
const Advertisement = require("../models/Advertisement");
const UserModel = require("../models/UserModel");
const status = require("http-status");
const _ = require("lodash");
const path = require("path");

const filePath = path.join(__dirname, "../404.jpg");

router.get("/heartbeat", (req, res) => {
  const currentTime = new Date().toLocaleString();
  res.send(currentTime);
});

router.post("/advertisements", async (req, res) => {
  try {
    const newAdd = new Advertisement({ ...req.body });
    const savedModel = await newAdd.save();
    res.status(201).send(savedModel);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/advertisements", async (req, res) => {
  const adds = await Advertisement.find();
  res.send(adds);
});

router.get("/advertisements/:id", async (req, res) => {
  try {
    const advertisement = await Advertisement.findOne({ _id: req.params.id });

    if (advertisement) {
      res.status(200).send(advertisement);
    } else {
      res.status(404).sendFile(filePath);
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/advertisement", async (req, res) => {
  try {
    const query = {};

    const {
      title,
      description,
      createdFrom,
      createdTo,
      priceFrom,
      priceTo,
      ownerName,
    } = req.query;

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (description) {
      query.description = { $regex: description, $options: "i" };
    }

    if (ownerName) {
      query["owner.name"] = { $regex: ownerName, $options: "i" }; //case-insensitive search
    }

    if (createdFrom && createdTo) {
      const fromDate = new Date(createdFrom);
      const toDate = new Date(createdTo);

      if (!isNaN(fromDate) && !isNaN(toDate)) {
        query.createdTime = { $gte: fromDate, $lte: toDate };
      } else {
        return res.status(400).send({ error: "Invalid date parameters" });
      }
    }

    if (priceFrom && priceTo) {
      const fromPrice = parseFloat(priceFrom);
      const toPrice = parseFloat(priceTo);

      if (!isNaN(fromPrice) && !isNaN(toPrice)) {
        query.price = { $gte: fromPrice, $lte: toPrice };
      } else {
        return res.status(400).send({ error: "Invalid price parameters" });
      }
    }

    const advertisements = await Advertisement.find(query);

    if (advertisements.length > 0) {
      res.status(200).send(advertisements);
    } else {
      res.status(404).sendFile(filePath);
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/advertisements/:id", async (req, res) => {
  try {
    const { password } = req.body;

    // Find the user by password (assuming password is unique)
    const user = await UserModel.findOne({ password });

    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const advertisement = await Advertisement.findOne({ _id: req.params.id });
    if (advertisement) {
      await Advertisement.deleteOne({ _id: req.params.id });
      return res.status(204).send();
    } else {
      res.status(404).sendFile(filePath);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.patch("/advertisements/:id", async (req, res) => {
  try {
    const { password } = req.body;

    const user = await UserModel.findOne({ password });
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    if (!isValidObjectId) {
      return res.status(422).send({ error: "Invalid ID format" });
    }

    const advert = await Advertisement.findById(req.params.id);
    if (!advert) {
      res.status(404).sendFile(filePath);
    }

    if (advert.owner.email !== user.email) {
      return res.status(401).send({ error: "This is not your advertisement" });
    }

    const updatedAdvert = await Advertisement.findByIdAndUpdate(
      req.params.id,
      req.body.advert,
      { new: true }
    );

    return res.status(200).send(updatedAdvert);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
