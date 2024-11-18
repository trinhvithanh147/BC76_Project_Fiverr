
import Icon from '../../components/icon'
import { Link, useNavigate } from 'react-router-dom'
import { pathDefault } from '../../common/path'
import {ArrowLeftOutlined} from '@ant-design/icons'
import { Input } from 'antd'
import { ButtonOutline } from '../../components/button/ButtonCustom'
import Lottie from "react-lottie";
import * as animationData from "./../../assets/animation/loginAnimation.json";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authService } from '../../services/auth.service'
import { useContext } from 'react'
import { NotificationContext } from '../../App'
import { useDispatch } from 'react-redux'
import { handleUpdateUser } from '../../redux/slice/user.slice'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleNotification = useContext(NotificationContext)
  const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    onSubmit: values =>{
      // sử dụng axios để xử lí đăng nhập
      // sử dung then catch để xử lí kết quả trả về
      authService.signIn(values).then((res)=>{
        console.log(res)
        // thưc hiện khi đăng nhập thành công sẽ lưu dữ liệu dưới localStorage 
        localStorage.setItem('userInfo',JSON.stringify(res.data.content))
        // thay đổi dữ liệu cho redux
        dispatch(handleUpdateUser(res.data.content.user));
        // hiển thị thương báo thành công và đá người dùng về trang chủ
        handleNotification('success',"Đăng nhập thành công",1500) 
        setTimeout(()=>{ // gồm 2 tham số 1: hàm mà bạn muốn truyền vào, 2: thời gian chờ trước khi thực thi ví dụ như ở đây 1s5 thì sẽ chờ 1s5 rồi mới thực thi
          navigate(pathDefault.homePage);
        },1500)
      }).catch((err)=>{
        console.log(err)
        handleNotification("error", err.response.data.content);
      })
    },
    //validationSchema
    validationSchema: Yup.object({
      email: Yup.string().email("Vui lòng nhập đúng định dạng email").required("Vui lòng không bỏ trống"),
      password: Yup.string().required("Vui lòng không bỏ trống")
    })
  })
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen grid grid-cols-3 py-10">
      <div className="signIn_animation col-span-2 h-full flex items-center">
        {/* animation */}
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
      <div className="signIn_form h-full px-10 flex flex-col justify-between">
        {/* logo and back to homepage */}
        <div className="flex justify-between items-center">
          <Icon.logo />
          <Link to={pathDefault.homePage}>
            <ArrowLeftOutlined className="mr-2" />
            Go back
          </Link>
        </div>
        {/* form */}
        <div>
          <h1 className='text-4xl font-semibold mb-2'>Trang đăng nhập</h1>
          <p className='text-gray-500 mb-4'>Nhập email dể bắt đầu truy cập</p>
          <form onSubmit={handleSubmit} action="" className="space-y-4">
            <div>
              <label htmlFor="">Email</label>
              <Input name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder="Vui lòng nhập email" />
              {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p> }
            </div>
            <div>
              <label htmlFor="">Mật khẩu</label>
              <Input name='password' value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder="Vui lòng nhập mật khẩu" />
              {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p> }
            </div>
            <div>
              <ButtonOutline type='submit' content="Đăng nhập" className="w-full !py-4" />
            </div>
          </form>
        </div>
        {/* đăng kí */}
        <div className="text-center">
          <span>
            Chưa có tài khoản ?{" "}
            <Link
              to={pathDefault.signUp}
              className="font-medium hover:underline duration-200"
            >
              Đăng kí tại đây
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn
