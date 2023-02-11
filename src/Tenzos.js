

import './Tenzos.css'

export const Tenzos = ({value, picked, handleClick}) => {
    // value is the prop for the content of each box
    // picked is for adding lock class for a selected die
    // handleclick is the 
    return (
        <div 
            className={`tenzo ${picked ? 'active' : ''}`}>

            <section 
                className='tenz-holder'
                onClick={handleClick}>
                
                <button 
                // remove disabled because we want to be able to toggle it
                    // disabled={picked}
                    className='tenz'>
                    {value}
                </button>
            </section>



        </div>
    )
}