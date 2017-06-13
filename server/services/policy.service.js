var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('policies');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getAllForUser = getAllForUser;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(email, password) {
    var deferred = Q.defer();

    db.policies.findOne({ email: email }, function (err, policy) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (policy && bcrypt.compareSync(password, policy.hash)) {
            // authentication successful
            deferred.resolve({
                _id: policy._id,
                email: policy.email,
                firstName: policy.firstName,
                lastName: policy.lastName,
                token: jwt.sign({ sub: policy._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.policies.find().toArray(function (err, policies) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return policies (without hashed passwords)
        policies = _.map(policies, function (policy) {
            return _.omit(policy, 'hash');
        });

        deferred.resolve(policies);
    });

    return deferred.promise;
}

function getAllForUser(userId) {
    var deferred = Q.defer();
    db.policies.find({ userId: userId }).toArray(function (err, policies) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return policies (without hashed passwords)
        policies = _.map(policies, function (policy) {
            return _.omit(policy, 'hash');
        });

        deferred.resolve(policies);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.policies.findById(_id, function (err, policy) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (policy) {
            // return policy (without hashed password)
            deferred.resolve(_.omit(policy, 'hash'));
        } else {
            // policy not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(policyParam) {
    var deferred = Q.defer();

    createPolicy();
    function createPolicy() {
        // set policy object to policyParam without the cleartext password
        var policy = _.omit(policyParam, 'password');

        db.policies.insert(
            policy,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, policyParam) {
    var deferred = Q.defer();

    // validation
    db.policies.findById(_id, function (err, policy) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (policy.email !== policyParam.email) {
            // email has changed so check if the new email is already taken
            db.policies.findOne(
                { email: policyParam.email },
                function (err, policy) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (policy) {
                        // email already exists
                        deferred.reject('email "' + req.body.email + '" is already taken')
                    } else {
                        updatePolicy();
                    }
                });
        } else {
            updatePolicy();
        }
    });

    function updatePolicy() {
        // fields to update
        var set = {
            firstName: policyParam.firstName,
            lastName: policyParam.lastName,
            email: policyParam.email,
        };

        // update password if it was entered
        if (policyParam.password) {
            set.hash = bcrypt.hashSync(policyParam.password, 10);
        }

        db.policies.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                    console.log(deferred.reject(err.name + ': ' + err.message));
                }
                deferred.resolve();
            });
    }
    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.policies.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}