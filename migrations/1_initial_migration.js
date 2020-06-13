const Migrations = artifacts.require('Migrations');
const DaiTokenMock = artifacts.require('DaiTokenMock');
module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiTokenMock);

  const daiToken = await DaiTokenMock.deployed();

  await daiToken.mint(
    '0x35286d4b763104F4EC9867841103dfd1F47A8b9A',
    '1000000000000000000000'
  )
};
