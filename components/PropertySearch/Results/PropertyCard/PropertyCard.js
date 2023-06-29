import Link from "next/link"
import Image from "next/image"
import numeral from "numeral"
import {FaBath, FaBed, FaCar, FaDog} from 'react-icons/fa';

export const PropertyCard = ({key, title, destination, bedrooms, bathrooms, hasParking, petFriendly, price, image}) => {
    return (
        <div key={key}>
            <Link key={key} href={destination} className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200">
                <div className="flex w-full">
                    <Image src={image} width="300" height="200" className="object-cover" alt="house"/>
                </div>
                <div className="mt-3 text-lg font-bold">
                    {title}
                </div>
                <div className="text-lg">
                    ${numeral(price).format("0,0")}
                </div>
                <div className="flex justify-between text-sm mt-3"> 
                    <div className="flex justify-between">
                        <FaBath size={15} />
                        <span className="pl-2">{bathrooms} bathrooms</span>
                    </div>
                    <div className="flex justify-between">
                        <FaBed size={15} />
                        <span className="pl-2">{bedrooms} bedrooms</span>
                    </div>
                </div>
                {(!!hasParking || !!petFriendly) && (
                    <div className="flex justify-between text-sm mt-3"> 
                    {!!petFriendly && (
                        <div className="flex justify-between">
                            <FaDog size={15} />
                            <span className="pl-2">{petFriendly} pets allowed</span>
                        </div>
                    )}
                    {!!hasParking && (
                        <div className="flex justify-between">
                            <FaCar size={15} />
                            <span className="pl-2">{hasParking} has parking</span>
                        </div>
                    )}
                    </div>
                ) }
            </Link>
        </div>
    )
}