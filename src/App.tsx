import './App.css';
import Dropdown from './components/Dropdown';
import styled from 'styled-components';
import { useState } from 'react';

const dropdownData = [
  {id: 1, value: 'user1', label: 'user1-label'}, 
  {id: 2, value: 'user2', label: 'user1-label'}, 
  {id: 3, value: 'user3', label: 'user1-label'},
  {id: 4, value: 'user4', label: 'user1-label'},
  {id: 5, value: 'user5', label: 'user1-label'}
]

const dropdownDataSearch = [
  {id: 1, firstname: 'dhamo', label: 'user1-label'}, 
  {id: 2, firstname: 'dharan', label: 'user1-label'}, 
  {id: 3, firstname: 'baskar', label: 'user1-label'},
  {id: 4, firstname: 'mani', label: 'user1-label'},
  {id: 5, firstname: 'lokesh', label: 'user1-label'},
  {id: 6, firstname: 'adam', label: 'user1-label'}, 
  {id: 7, firstname: 'smith', label: 'user1-label'}, 
  {id: 8, firstname: 'ricky', label: 'user1-label'},
  {id: 9, firstname: 'aris', label: 'user1-label'},
  {id: 10, firstname: 'deepan', label: 'user1-label'}
]


function App() {
  // state for dropdown1
  const [list, setList] = useState<any[]>([])
  const [selectedValue, setValue] = useState<any>({})

  
  const [selectedValue4, setValue4] = useState<any>({})

  // state for dropdown2
  const [selectedValue2, setValue2] = useState<any>({})

  // state for dropdown3
  const [selectedValue3, setValue3] = useState<any>({})
  
const onChangeValue = (value: string) => {
  fetch(`https://dummyjson.com/users/search?q=${value}`)
  .then(res => res.json())
  .then(json => setList(json.users))
} 

  const onSelectOption = (option: Object, key: string) => {
    switch(key){
      case 'search':
        setValue(option);
        break;
      case 'autocomplete':
        setValue2(option);
        break;
      case 'dropdown':
        setValue3(option);
        break;
      case 'withoutClear':
        setValue4(option);
        break;
      default:
        break;
    }
  } 

  return (
    <div className="App">
      <DropdownOverview>
        Drodown with search
        <Dropdown 
          data={dropdownDataSearch}
          search
          selectedValue={selectedValue?.firstname}
          onChangeValue={(value: string) => onChangeValue(value)}
          onSelectOption={(value: object) => onSelectOption(value, 'search')}
          accessorKey={"firstname"}/>
      </DropdownOverview>
      <DropdownOverview>
        Drodown with api search
        <Dropdown 
          data={list}
          autoComplete
          selectedValue={selectedValue2?.firstName}
          onSelectOption={(value: object) => onSelectOption(value,  'autocomplete')}
          onChangeValue={(value: string) => onChangeValue(value)}
          accessorKey={"firstName"}/>
      </DropdownOverview>
      <DropdownOverview>
        Drodown without clear
        <Dropdown 
          data={list}
          search
          removeClear
          selectedValue={selectedValue4?.firstName}
          onSelectOption={(value: object) => onSelectOption(value,  'withoutClear')}
          onChangeValue={(value: string) => onChangeValue(value)}
          accessorKey={"firstName"}/>
      </DropdownOverview>
      <DropdownOverview>
        Drodown without search
        <Dropdown 
          data={dropdownData}
          selectedValue={selectedValue3?.value}
          onSelectOption={(value: object) => onSelectOption(value, 'dropdown')}
          removeClear
        />
      </DropdownOverview>
    </div>
  );
}

export default App;

const DropdownOverview = styled.div`
  width: 200px;
`
