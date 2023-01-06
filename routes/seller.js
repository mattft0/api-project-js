const { Router } = require("express");
const ForbiddenError = require("../backend/errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { Seller } = require("../backend/models");

const router = new Router();

// Get collection
router.get(
    "/sellers",
    checkAuth,
    checkRole({ minRole: checkRole.ROLES.ADMIN }),
    (req, res) => {
        Seller.findAll({
            where: req.query,
            attributes: { exclude: ["password"] },
        }).then((data) => res.json(data));
    }
);

// Créer un client
router.post("/sellers", (req, res, next) => {
    const seller = new Seller(req.body);
    seller
        .save()
        .then((data) => res.status(201).json(data))
        .catch(next);
});

// Récupérer une annonce
router.get("/sellers/:id", async (req, res) => {
    const seller = await Seller.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "password" },
    });
    if (!seller) {
        res.sendStatus(404);
    } else {
        res.json(seller);
    }
});

// Update une annonce
router.put("/sellers/:id", checkAuth, (req, res, next) => {
    if (req.seller.id !== parseInt(req.params.id)) throw new ForbiddenError();

    Seller.update(req.body, {
        where: { id: parseInt(req.params.id) },
        individualHooks: true,
    })
        .then(([nbUpdated]) => {
            if (!nbUpdated) return res.sendStatus(404);
            Seller.findByPk(parseInt(req.params.id), {
                attributes: { exclude: "password" },
            }).then((seller) => res.json(seller));
        })
        .catch(next);
});

// Delete un utilisateur
router.delete("/sellers/:id", checkAuth, (req, res) => {
    if (req.seller.id !== parseInt(req.params.id)) throw new ForbiddenError();
    Seller.destroy({
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