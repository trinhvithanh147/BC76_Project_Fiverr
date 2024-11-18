import { Dropdown, Space } from 'antd';
import React, { useState } from 'react'
import {DownOutlined} from '@ant-design/icons'
const DropdownHeader = ({buttonContent="Fiverr Pro",items}) => {
    const [open,setOpen] = useState(false)
    console.log(open)
  return (
      <Dropdown
        menu={{ items: [{ label: "abc" }] }}
        trigger={["click"]}
        open={open}
      >
        <button
          className='font-semibold capitalize py-2 px-4 hover:bg-gray-100 duration-200 rounded-md'
          onClick={() => {
            setOpen(!open);
          }}
        >
          {buttonContent}
          <DownOutlined
            className={`${open ? "rotate-180" : "rotate-0"} duration-300`}
          />
        </button>
      </Dropdown>
  );
}

export default DropdownHeader
