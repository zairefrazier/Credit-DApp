require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/2nQNvnDnvXejfx9DvyBxZt2fmA_zLq8r',
      accounts: [ 'c922d97b469d257d18faa3cf7b96be26bbf2592ce87e63058e49f727d928c24e' ]
    }
  }
}