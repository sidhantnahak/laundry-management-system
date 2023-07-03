import React, { useEffect } from 'react'
import './footer.css'
import { useSelector } from 'react-redux'
import Loder from '../Loder/Loder'

const Footer = () => {
    const { loading} = useSelector(state => state.laundries)
    let elem=document.querySelector('.PageNotFound')

    

    useEffect(() => {
    if(elem && loading===false){
        let foot=document.querySelector('.footer_div')
        foot.style.display="none"
    }
      


//     let elemm = document.querySelector(".sidebar_pro")
//     let elem3 = document.querySelector(".footer_div")


// if(elemm){
//    var  isOpen = elemm.classList.contains('active');

// }


  
//     if (elem3) {

//         if (isOpen || window.innerWidth <= 750) {
//             elem3.style.width = "100%"
//             elem3.style.position = "static"
//         } else {
//             elem3.style.width = " calc(100% - 250px)";
//             elem3.style.position = "relative"
//         }

//     }
    }, [loading,elem])
    

    return (
        <>
            {loading ? <Loder /> : <div className="footer_div">
                <p>Copyright @ Laundry Management System 2019</p>
            </div>
            } </>

    )
}

export default Footer