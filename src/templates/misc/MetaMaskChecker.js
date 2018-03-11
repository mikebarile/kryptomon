import web3 from 'src/web3';
import ROUTES from 'constants/Routes';

export default async function MetaMaskChecker(history) {
  const checkFn = async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      history.push(ROUTES.METAMASK);
    } else {
      window.account = accounts[0];
    }
  };

  return setInterval(checkFn, 500);
}
