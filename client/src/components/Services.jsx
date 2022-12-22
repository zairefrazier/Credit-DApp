import { BsShieldFillCheck} from 'react-icons/bs';
import { BiSearchAlt} from 'react-icons/bi';
import { RiHeart2Fill} from 'react-icons/ri';

const ServiceCard = ({color, title, icon, Subtitle}) => (
    <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'>
        <div className={'w-10 h-10 rounded-full flex justify-center items-center ${color}'}>
            {icon}
        </div>
        <div className='ml-5 flex flex-col flex-1'>
            <h1 className='mt-2 text-white text-lg'>{title}</h1>
            <p className='mt-2 text-white text-sm md:w 912'>{Subtitle}</p>
        </div>
    </div>
)

const Services = () => {
    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flew-ro flew-col items-center justify-between md:pd-20 py-12">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2">
                        Imporoving 
                        <br />
                        As We Grow
                    </h1>
                </div>
                
            </div>
            <div className='flex-1 flex flex-col justify-start items-center'>
            <ServiceCard
                color="bg-[#89845F8]"
                title="Security Guaranteed"
                icon ={<BsShieldFillCheck fontSize={21} className="text-white" />}
                Subtitle = "Always maintain Privacy and Quality of Service"
                />
                <ServiceCard
                color="bg-[#ff0000]"
                title="Low Exchange Rates"
                icon ={<BsShieldFillCheck fontSize={21} className="text-white" />}
                Subtitle = "Always maintain Privacy and Quality of Service"
                />
                <ServiceCard
                color="bg-[#ff0000]"
                title="Fast Transactions"
                icon ={<BsShieldFillCheck fontSize={21} className="text-white" />}
                Subtitle = "Always maintain Privacy and Quality of Service"
                />

            </div>
        </div>
    );
}
export default Services;