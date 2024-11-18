
import Icon from '../../../components/Icon'
import { Link, useNavigate } from 'react-router-dom'
import { pathDefault } from '../../../common/path';
import DropdownHeader from '../../../components/dropdown/DropdownHeader';
import { ButtonGhost, ButtonOutline } from '../../../components/button/ButtonCustom';
import { GlobalOutlined } from "@ant-design/icons";
import InputSearch from '../../../components/input/inputSearch/InputSearch';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { congViecService } from '../../../services/congViec.service';
import { useDebounce } from 'use-debounce';
import { Dropdown } from 'antd';
import './headerTemplate.scss'
import useViewPort from '../../../hooks/useViewPort';
const HeaderTemplete = () => {
  const {width} = useViewPort()
  const [keyword, setKeyword] = useState('');
  const [value] = useDebounce(keyword, 1000);
  const [openDropdown, setOpenDropdown] = useState(false)
  const [listSearch, setListSearch] = useState([])
  const { user } = useSelector((state) => state.userSlice)
  console.log(user)
  const navigate = useNavigate();

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  }

  const handleClickInputSearch = () => {
    setOpenDropdown(true)
  }
  console.log(keyword);
  //useMemoL cứ mỗi lần setState ==> re-render ===> cập nhật chạy mới toàn bộ các biến cũng như function bên trong ==> quản lí các biến giúp kiểm tra khi nào thì nên tạo mới
  //useCallback: ==> quản lí các function
  useEffect(() => {
    if(value){
      congViecService
        .getCongViecTheoTen(keyword)
        .then((res) => {
          console.log(res);
          setListSearch(res.data.content);
          setOpenDropdown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  }, [value])
  console.log(listSearch)
  const itemListSearch = useMemo(() => {
    return listSearch.slice(0,4).map((item) => {
      return {
        key: item.id,
        label: <div className='flex items-center'>
        <img src={item.congViec.hinhAnh} className='w-10 h-10 mr-3' alt="" />
        <div>
            <h4 className='text-lg font-semibold'>{item.congViec.tenCongViec}</h4>
            <p className='mt-2'>{item.congViec.danhGia}</p>
        </div>

        </div>,
      };
    });
  },[listSearch])
  return (
    <header>
      <div className="container py-4 border-b border-b-gray-200">
        <div className="header_content flex items-center justify-between">
          <div className="flex flex-1 space-x-2 items-center">
            {/* logo */}
            <Link to={pathDefault.homePage}>
               <Icon.logo />
            </Link>
            {width > 576 && (
              <Dropdown
                trigger={["click"]}
                overlayClassName="dropdown-suggest"
                open={openDropdown}
                menu={{
                  items: itemListSearch,
                  onMouseLeave: () => {
                    setOpenDropdown(false);
                  },
                }}
              >
                <div className="w-full">
                  <InputSearch
                    handleChange={handleChangeKeyword}
                    value={keyword}
                    placeholder={"What service are you looking for today?"}
                    handleClick={handleClickInputSearch}
                  />
                </div>
              </Dropdown>
            )}
          </div>
          {/* searchInput */}
          <div className="header_action space-x-3 inline-block">
            <DropdownHeader buttonContent="Fiverr Pro" />
            <DropdownHeader buttonContent="Explore" />
            <ButtonGhost content={"English"} icon={<GlobalOutlined />} />
            <ButtonGhost content={"Become Seller"} />
            {!user ? (
              <>
                <ButtonGhost content={"Sign in"} />
                <ButtonOutline
                  onClick={() => {
                    navigate(pathDefault.signIn);
                  }}
                  content={"Join"}
                />
              </>
            ) : (
              <p className="inline-block">{user.name}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTemplete
