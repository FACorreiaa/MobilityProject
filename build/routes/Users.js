"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = require("../daos/User/UserDao");
const Logger_1 = require("../shared/Logger");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const Misc_1 = require("../shared/Misc");
// Init shared
const router = express_1.Router();
const userDao = new UserDao_1.UserDao();
/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/
router.get('/all', async (req, res) => {
    try {
        const users = await userDao.getAll();
        return res.status(http_status_codes_1.OK).json({ users });
    }
    catch (err) {
        Logger_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message
        });
    }
});
/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/
router.post('/add', async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: Misc_1.paramMissingError
            });
        }
        await userDao.add(user);
        return res.status(http_status_codes_1.CREATED).end();
    }
    catch (err) {
        Logger_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message
        });
    }
});
/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/
router.put('/update', async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: Misc_1.paramMissingError
            });
        }
        user.id = Number(user.id);
        await userDao.update(user);
        return res.status(http_status_codes_1.OK).end();
    }
    catch (err) {
        Logger_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message
        });
    }
});
/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await userDao.delete(Number(id));
        return res.status(http_status_codes_1.OK).end();
    }
    catch (err) {
        Logger_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message
        });
    }
});
/******************************************************************************
 *                                     Export
 ******************************************************************************/
exports.default = router;
//# sourceMappingURL=Users.js.map