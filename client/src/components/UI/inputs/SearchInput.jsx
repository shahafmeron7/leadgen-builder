import React from 'react'
import { CiSearch } from "react-icons/ci";
import styles from './SearchInput.module.css'
const SearchInput = () => {
  return (
   <div className={styles.searchWrapper}>
   <CiSearch />
   <input type="text" placeholder="search" />
 </div>
  )
}

export default SearchInput