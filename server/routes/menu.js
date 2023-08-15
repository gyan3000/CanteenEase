const express = require("express");
const Menu = require("./../models/Menu");

const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const fetchuser = require("./../middleware/fetchuser");

router.post('/add-menu',fetchadmin, async (req, res) => {
    try {
        const { name, description, availability, modifiers, reviews, preparationTime, dietaryLabels, price, img } = req.body;
        const newMenuItem = new Menu({
            name,
            description,
            availability,
            modifiers,
            reviews,
            preparationTime,
            dietaryLabels,
            price,
            img
        });

        const savedMenuItem = await newMenuItem.save();
        return res.status(200).json(savedMenuItem);
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'An error occurred while adding the menu item' });
    }
});

router.get('/get-menu',fetchuser, async (req, res) => {
    try {
        const menuItems = await Menu.find();
        return res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'An error occurred while fetching menu items' });
    }
});


module.exports = router;