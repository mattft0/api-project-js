const { Router } = require("express");
const ForbiddenError = require("../errors/ForbiddenError"");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { Buyer } = require("../models");

const router = new Router();

// Get collection
router.get(
  "/buyers",
  checkAuth,
  checkRole({ minRole: checkRole.ROLES.ADMIN }),
  (req, res) => {
    Buyer.findAll({
      where: req.query,
      attributes: { exclude: ["password"] },
    }).then((data) => res.json(data));
  }
);

// Créer un client
router.post("/buyers", (req, res, next) => {
  const buyer = new Buyer(req.body);
  buyer
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer une annonce
router.get("/buyers/:id", async (req, res) => {
  const buyer = await Buyer.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "password" },
  });
  if (!buyer) {
    res.sendStatus(404);
  } else {
    res.json(buyer);
  }
});

// Update une annonce
router.put("/buyers/:id", checkAuth, (req, res, next) => {
  if (req.buyer.id !== parseInt(req.params.id)) throw new ForbiddenError();

  Buyer.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      Buyer.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "password" },
      }).then((buyer) => res.json(buyer));
    })
    .catch(next);
});

// Delete un utilisateur
router.delete("/buyers/:id", checkAuth, (req, res) => {
  if (req.buyer.id !== parseInt(req.params.id)) throw new ForbiddenError();
  Buyer.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  }).then((nbDeleted) => {
    if (nbDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;