//custom hook lấy thông tin về kích thước về viewport

import React, { useEffect } from 'react'

const useViewPort = () => {
    //window.innerWidth trả về chiều rộng của viewport
    const [width,setWidth] = React.useState(window.innerWidth)


    useEffect(()=>{
        const handleWindowResize = () => setWidth(window.innerWidth) //set lại chiều dài màn hình của người dùng đang sử dụng
        window.addEventListener("resize",handleWindowResize) //tự động set lại cái width
        return () => window.removeEventListener("resize",handleWindowResize) //giúp cho chúng ta xóa cái phương thức resize sao khi chúng ta đã lấy được chiều dài màn hình của người dùng
    },[]) //component didmount
    
  return {width}
}

export default useViewPort
