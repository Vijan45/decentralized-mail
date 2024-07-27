const DecentralizedMail = artifacts.require("DecentralizedMail");

module.exports = function(deployer) {
    deployer.deploy(DecentralizedMail);
};
