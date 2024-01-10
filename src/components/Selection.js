import { useEffect, useState } from "react";

const Selection = (props)=>{
    const[switcher,setSwitcher]= useState('start');
    const[switchMe,setSwitchMe]= useState(false);
    useEffect(()=>{
        props.check(switchMe, props.label.toLowerCase());
    },[switcher])
    const switchme = ()=>{
        if(switcher==='start'){
            setSwitcher('end');
            setSwitchMe(true);
        }else{
            setSwitcher('start');
            setSwitchMe(false);
        }
    }
    return(
        <div onClick={switchme} className='flex justify-between px-4 py-2 bg-white'>
            <label className="text-blue-600">{props.label}</label>
            <div className='w-12 flex items-center h-6 border border-black rounded-3xl cursor-pointer p-[1px]' style={{justifyContent: switcher}}>
                <div className='bg-blue-700 rounded-full h-full w-6'></div>
            </div>
        </div>
    )
}
export default Selection;