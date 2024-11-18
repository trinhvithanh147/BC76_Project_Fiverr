import { Select } from 'antd';
import React from 'react'

const SelectCustom = ({labelContent,options,handleChange, mode}) => {
  return (
    <div>
        <label htmlFor="" className='font-medium mb-1 block'>{labelContent}</label>
      <Select
      onChange={handleChange}
      mode= {mode && mode}
        className='w-full'
        options={options}
      />
    </div>
  );
}

export default SelectCustom
