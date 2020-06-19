const Migrations = artifacts.require('Migrations');
const DaiTokenMock = artifacts.require('DaiTokenMock');
module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiTokenMock);

  const daiToken = await DaiTokenMock.deployed();

  await daiToken.mint(
    '0x9Cc74953633cF3675465384BF0f3Cd5B0B37c772',
    '1000000000000000000000'
  )
};
