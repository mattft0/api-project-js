const { Router } = require("express");
const ForbiddenError = require("../backend/errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { Car } = require("../backend/models");

const router = new Router();

// Get collection
router.get(
  "/cars",
  checkAuth,
  checkRole({ minRole: checkRole.ROLES.ADMIN }),
  (req, res) => {
    Car.findAll({
      where: req.query,
      attributes: { exclude: ["password"] },
    }).then((data) => res.json(data));
  }
);

// Créer une annonce
router.post("/cars", (req, res, next) => {
  const car = new Car(req.body);
  car
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer une annonce
router.get("/cars/:id", async (req, res) => {
  const car = await Car.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "password" },
  });
  if (!car) {
    res.sendStatus(404);
  } else {
    res.json(car);
  }
});

// Update une annonce
router.put("/cars/:id", checkAuth, (req, res, next) => {
  if (req.car.id !== parseInt(req.params.id)) throw new ForbiddenError();

  Car.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      Car.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "password" },
      }).then((car) => res.json(car));
    })
    .catch(next);
});

// Delete un utilisateur
router.delete("/cars/:id", checkAuth, (req, res) => {
  if (req.car.id !== parseInt(req.params.id)) throw new ForbiddenError();
  Car.destroy({
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