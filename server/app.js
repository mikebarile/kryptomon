var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var Web3 = require('web3')

var port = process.env.PORT || 8080;

// Middleware
app.use('/static', express.static(path.join(__dirname, '../build/static')))
app.use(bodyParser.json())

// Setup Web3
provider = new Web3.providers.HttpProvider("http://localhost:8545")
web3 = new Web3(provider)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.get('/web3/accounts', (req, res) => {
  var accounts = web3.eth.accounts.map(acc => ({name: acc, balance: parseInt(web3.eth.getBalance(acc))}));
  res.json(accounts);
})

app.post('/web3/transfer', (req, res) => {
  var from = req.body.from;
  var to = req.body.to;
  var value = req.body.amount;
  
  var transaction = { from: from, to: to, value: value }
  transactionHash = web3.eth.sendTransaction(transaction)
  
  res.json(transactionHash)
});

app.listen(port, () => console.log('Example app listening on port ' + port + '!'))