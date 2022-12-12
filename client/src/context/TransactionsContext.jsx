import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const getEtheruemContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);


    console.log({
        provider,
        signer,
        transactionContract
    })
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState(" ");
    const [formData, setFormData] = useState( { addressTo: '', amount: '', keyword:'', message: ''} );

    const handleChange = (e, name) => {
        setFormData((prevstate) => ({...prevstate, [name]: e.target.value}));
    }


    const checkIfWalletIsConnected = async () => {
     
    try { 
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({method: 'eth_accounts' })
        
        if(accounts.length) {
            setCurrentAccount(accounts[0]);

        } else {
            console.log('No Account Found');
        }        
    } catch (error) {
            console.log(error);

            throw new Error("No Ethereum")
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

            getEtheruemContract();
            
        } catch (error) {

            console.log(error)

            throw new Error("No Ethereum Object") 
            
        }

    }
    useEffect(()=> {
        checkIfWalletIsConnected();
    }, []);

    return(
        <TransactionsContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionsContext.Provider>
       )
}