import react, {useContext} from "react" ;

import { TransactionsContext } from "../context/TransactionsContext";

import dummyData from "../utils/dummyData";

import { shortenAdd } from "../utils/shortenAdd";



const TransactionCard = ({ addressTo, addressFrom, timestamp,message,keyword, amount, url}) => {
    return (
        <div className="bg-[#0040ff] m-4 flex-1  2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col rounded-md hover:shadow-2xl border-2 border-grey">
            <div className="flex flex-col items-center w-full mt-3"> 
            <div className="w-full mb-6 p-2">
                <a href={"https://goerli.etherscan.io/address/"+ addressFrom} target="_blank" rel="noopener noreferrer">
                    <p className="text-white  text-base hover:text-red-400">From: {shortenAdd(addressFrom)} </p>
                </a>
                <br>
                </br>
                <a href={"https://goerli.etherscan.io/address/"+ addressTo} target="_blank" rel="noopener noreferrer">
                    <p className="text-white text-base hover:text-red-400"> To: {shortenAdd(addressTo)} </p>
                </a>
                <p className="text-white text-base">Amount: {amount} ETH</p>
                {message && (
                    <>
                    <br />
                    <p className="text-white text-base">Message: {message}
                    </p></>
                )}

                    <br>
                    </br>
                    <br>
                    </br>
                <div className="bg-black p-2 px-4 w-max rounded-3xl shadow-2xl">
                    <p className="text-white font-bold"> {timestamp}</p>
                </div>
            </div>
            </div>
        </div>
    )
}

const Transactions = () => {

    const { currentAccount } = useContext(TransactionsContext)
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">

            <div className="flex flex-col md:pd-12 py-12 px-4">
            { currentAccount ? (
                <h3 className="text-white text-3xl text-center my-2">
                    Latest Transactions
                </h3>

            ) :
            (
                <h3 className="text-white text-3xl text-center my-2">
                    Connect Accout to View Transactions
                </h3>

            )}
             <div className="flex flex-wrap justify-center items-center mt-10">

                {dummyData.reverse().map((transaction, i ) => (

                    <TransactionCard key={i} {...transaction}/>

                ))}

            </div>
            </div>
        </div>
    );
}
export default Transactions;