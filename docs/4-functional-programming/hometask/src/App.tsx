import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Table, Filters, Sort, Search } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

import type { Row } from './components';
import type { Image, User, Account, Rows } from '../types';

function App() {
  const [data, setData] = useState<Row[]>([]);
  const [filterData, setFilterData] = useState([]);
  const [orderFilter, setOrderFilter] = useState(undefined);
  const [postFilter, setPostFilter] = useState(undefined);
  const [searchFilter, setSearchFilter] = useState(undefined);
  
  const dataConverter = (
    users: User[],
    accounts: Account[],
    images: Image[]
  ): Rows[] => {
    const rows = [...users, ...accounts, ...images].reduce((accu, currentValue) => {
      if (accu.hasOwnProperty(currentValue.userID)) {
        accu[currentValue.userID] = {
          ...accu[currentValue.userID],
          ...currentValue,
        }
      } else {
        accu[currentValue.userID] = currentValue
      }

      return accu
    }, {});

    return Object.values(rows);
  };

  const filterByPosts = (filterArray) => {
    
    return filterArray.filter((i) => {
      let curentFilter = postFilter.join(' ');
      
      switch (curentFilter) {        
        case "Without posts More than 100 posts":
          return i.posts <= 0 || i.posts >= 100;
        case "Without posts":
          return i.posts <= 0;
        case "More than 100 posts":
          return i.posts >= 100;
        default:
          return i
      }
    });
  }

  const filterByOrder = (filterArray) => {
    let filterDataByOrder = filterArray;
    if (orderFilter === "desc") {
      filterDataByOrder = filterArray.sort((a: Row, b: Row) => (
        a.payments[0] !== undefined && b.payments[0] !== undefined ? a.payments[0].totalSum > b.payments[0].totalSum ? -1 : 1 : -1)
      )
    }

    if (orderFilter === "asc") {
      filterDataByOrder = filterArray.sort((a: Row, b: Row) => (
        a.payments[0] !== undefined && b.payments[0] !== undefined ? a.payments[0].totalSum > b.payments[0].totalSum ? 1 : -1 : 1)
      )
    }

    setFilterData(filterDataByOrder)
  }

  const filterBySearch = (filterArray) => {
    let userSearch = searchFilter.toLowerCase();

    return filterArray.filter(i => {
      if (userSearch !== undefined && i.username.toLowerCase().includes(userSearch) || 
        i.name.toLowerCase().includes(userSearch) || 
        i.country.toLowerCase().includes(userSearch)) {
        return i
      }
    })
  }

  useEffect(() => {
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
    ([images, users, accounts]: [Image[], User[], Account[]]) => {
      setData(dataConverter(users, accounts, images))
    })
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      let searchData = filterBySearch(filterByPosts([...data]))
      filterByOrder(filterByPosts(searchData))
    }
  }, [orderFilter, postFilter, searchFilter])

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters updateFilter={setPostFilter}/>
            <Sort updateSort={setOrderFilter}/>
          </div>
          <Search updateSearch={setSearchFilter}/>
        </div>
        <Table rows={filterData.length > 0 ? filterData : data} />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
