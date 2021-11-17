const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  db.favorites
    .findAll()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  res.json({ message: "Hello Favs" });
});

router.post("/add", (req, res) => {
  console.log(req.body);
  db.favorites
    .findAll({
      where: {
        chat_name: req.body.chatname,
      },
    })
    .then((favorites) => {
      console.log(favorites);
      if (favorites.length == 0) {
        db.favorites.create({
          chat_name: req.body.chatname,
        });
        res.json({ message: "Added To Favorites", Added: true });
      } else {
        res.status(409).json({ message: "Already Exists In Favorites", Added: false });
      }
    });
});

router.delete('/delete/:chat', (req, res) => {
    db.favorites.destroy({
        where: {
            chat_name: req.params.chat
        }
    })
    res.json({ deleted: true })
})

module.exports = router;
