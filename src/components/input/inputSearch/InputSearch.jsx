import React from 'react'
import './inputSearch.scss'
import { Input } from 'antd'

const InputSearch = ({
  placeholder,
  value,
  handleChange,
  handleClick,
  handleKeyDown,
  handleSearch,
}) => {
  return (
    <Input.Search
    onSearch={handleSearch}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onChange={handleChange}
      className="input_search"
      placeholder={placeholder}
    />
  );
}; 

export default InputSearch
