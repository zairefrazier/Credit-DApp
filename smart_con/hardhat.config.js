require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/9mwSkcjtRpSTEK6HcbNJ13xqAMLVsTAl',
      accounts: [ 'c922d97b469d257d18faa3cf7b96be26bbf2592ce87e63058e49f727d928c24e' ]
    }
  }
}