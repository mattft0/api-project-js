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
  async (req, res) => {
    const cars = await Car.findAll({
      where: req.query,
      attributes: { exclude: ["password"] },
    });
    res.json(cars);
  }
);

// Créer une annonce
router.post("/cars", checkAuth, async (req, res, next) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    next(error);
  }
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
router.put("/cars/:id", checkAuth, async (req, res, next) => {
  const user = req.user;
  const carId = parseInt(req.params.id);

  const car = await Car.findByPk(carId);
  if (!car) {
    res.sendStatus(404);
  } else if (car.userId !== user.id) {
    next(new ForbiddenError());
  } else {
    try {
      const updatedCar = await car.update(req.body, {
        individualHooks: true,
      });
      res.json(updatedCar);
    } catch (error) {
      next(error);
    }
  }
});

// Delete un utilisateur
router.delete("/cars/:id", checkAuth, async (req, res) => {
  const user = req.user;
  const carId = parseInt(req.params.id);

  const car = await Car.findByPk(carId);
  if (!car) {
    res.sendStatus(404);
  } else if (car.userId !== user.id) {
    next(new ForbiddenError());
  } else {
    const nbDeleted = await Car.destroy({
      where: {
        id: carId,
      },
    });
    if (nbDeleted) {
      res.sendStatus(204);
    } else {
      res.send 
      