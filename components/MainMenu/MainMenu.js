import { ButtonLink } from 'components/ButtonLink/ButtonLink';
import Link from 'next/link';
import {FaHouseUser, FaHeart} from 'react-icons/fa';

export const MainMenu = ({items, ctaLabel, ctaDestination}) => {
    console.log("ITEMS: ", items);
    return (<div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex">
        <div className="py-4 pl-5 flex text-pink-600">
            <FaHouseUser size={30} />
            <FaHeart size={30} />
        </div>
        <div className='flex flex-1 justify-end'>
            {(items || []).map(item => (
                <div key={item.id} className='p-5 block cursor-pointer relative group hover:bg-slate-700'>
                    <div>
                        <Link href={item.destination}>
                            {item.label}
                        </Link>
                    </div>
                    {!!item.subMenuItems?.length && (<div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                        {item.subMenuItems.map(subItem => (
                            <Link key={subItem.id} href={subItem.destination}  className='p-5 block cursor-pointer block whitespace-nowrap hover:bg-slate-700'>
                                {subItem.label}
                            </Link>
                        ))}
                    </div>)}
                </div>
            ))}
            <div className='ml-3 mt-auto'>
                <ButtonLink destination={ctaDestination} label={ctaLabel} />
            </div>
        </div>
    </div>)};