import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const getEtheruemContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);


    return transactionContract
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState(" ");
    const [formData, setFormData] = useState( { addressTo: '', amount: '', keyword:'', message: ''} );

    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const [ transaction, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevstate) => ({...prevstate, [name]: e.target.value}));
    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask");
            const transactionContract = getEtheruemContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressfrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000),
                message: transaction.message,
                amount: parseInt(transaction.amount._hex) * (10 ** 18)
            }))

            console.log(structuredTransactions)
            setTransactions(structuredTransactions);

            
        } catch (error) {
            console.log(error)
            
        }
    }
    const checkIfWalletIsConnected = async () => {
     
    try { 
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({method: 'eth_accounts' })
        
        if(accounts.length) {
            setCurrentAccount(accounts[0]);

            getAllTransactions();

        } else {
            console.log('No Account Found');
        }        
    } catch (error) {
            console.log(error);

            throw new Error("No Ethereum")
        }
    }
    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEtheruemContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount)
            
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object")  
            
        }

    }
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
            
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object")   
        }
    }
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const { addressTo, amount, keyword, message } = formData;

            const transactionContract = getEtheruemContract();

            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex,
                }]
            });

            const transtionHash = transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            
            setisLoading(true);
            
            console.log('Loading - ${transactionHash.hash}');
            await transtionHash.wait();

            setisLoading(false);
            console.log('Success - ${transactionHash.hash}');

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());


            
        } catch (error) {

            console.log(error)

            throw new Error("No Ethereum Object") 
            
        }

    }
    useEffect(()=> {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return(
        <TransactionsContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionsContext.Provider>
       )
}