"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../../shared");
const MockDao_mock_1 = require("../MockDb/MockDao.mock");
class UserDao extends MockDao_mock_1.MockDaoMock {
    async getAll() {
        try {
            const db = await super.openDb();
            return db.users;
        }
        catch (err) {
            throw err;
        }
    }
    async add(user) {
        try {
            const db = await super.openDb();
            user.id = shared_1.getRandomInt();
            db.users.push(user);
            await super.saveDb(db);
        }
        catch (err) {
            throw err;
        }
    }
    async update(user) {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === user.id) {
                    db.users[i] = user;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('User not found');
        }
        catch (err) {
            throw err;
        }
    }
    async delete(id) {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === id) {
                    db.users.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('User not found');
        }
        catch (err) {
            throw err;
        }
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=UserDao.mock.js.map