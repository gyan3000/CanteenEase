const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Store = require("./../models/store");

router.post("/storestatus", fetchadmin, async (req, res) => {
    try {
      const storeId = 'storeStatus';
      var store = await Store.findById(storeId);
      if (!store) {
        store = new Store({ _id: storeId });
      }
      store.isOpen = !store.isOpen;
      await store.save();
      res.status(200).json({ message: "Store status updated"});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });
  

router.get("/currentstatus", async (req, res) => {
    try {
        const storeId = 'storeStatus';
      var store = await Store.findById(storeId);
      res.status(200).json({ isOpen: store.isOpen });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;
