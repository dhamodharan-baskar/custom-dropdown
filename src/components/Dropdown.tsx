import { AiOutlineClose, AiOutlineCaretDown } from "react-icons/ai";
import { useEffect, useRef, useState} from 'react'
import styled from "styled-components";
interface DropdownProps {
    isSearchable?: boolean;
    data?: any[];
    inputClass?: object;
    optionOverviewClass?: object;
    dropdownItemClass?: object;
    removeClear?: boolean;
    accessorKey?: string;
    selectedValue?: string;
    onChangeValue?: (value: string) => void;
    onSelectOption?: (value: object) => void;
    autoComplete?: boolean;
    search?:boolean
   }

   export default function Dropdown(props: DropdownProps){
    const [searchValue, setSearchValue] = useState<string>('')
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [dropdownOptions, setDropdownOptions] = useState<any[]>([])
    const [filterdData, setFilterdData] = useState<any[]>([])
    const dropdownRef = useRef<any>();
    const inputRef = useRef<any>();
    const {
        inputClass,
        optionOverviewClass,
        dropdownItemClass,
        removeClear,
        accessorKey,
        data,
        onChangeValue,
        onSelectOption,
        selectedValue,
        search,
        autoComplete
    } = props;
    let dropdownValue = search ? filterdData : dropdownOptions
    useEffect(() => {
        if(data){
            setDropdownOptions(data);
            setFilterdData(data);
        }
    },[data]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    useEffect(() => {
        if(selectedValue){
            setSearchValue(selectedValue)
        }
    },[selectedValue]);

    const handleClickOutside = (e: any) => {
        if (!dropdownRef?.current?.contains(e.target) ) {
            setShowOptions(false);
        } 
    };

    const onChangeInput = (value: string) => {
        if(search){
            let key = accessorKey ?? 'value'
            let filterData: any[] = dropdownOptions?.filter((child) => child[key]?.includes(value));
            setFilterdData(filterData)
        }
        setSearchValue(value)
        setShowOptions(true)
        onChangeValue && onChangeValue(value)
    }

    const clearSearch = () => {
        if(search){
            setDropdownOptions(data ?? [])
        }
        setSearchValue('')
        setShowOptions(false)
        onSelectOption && onSelectOption({})
    }

    const onSelect = (value: Object) => {
        onSelectOption && onSelectOption(value);
        setShowOptions(false); 
    }

    const highLightText = (value: string):any => {
      return(
        <span>
            {
             value?.split('').map((item: string, index: number) => {
                return(
                    <span 
                        key={item + index}
                        style={{color: searchValue?.toLowerCase().includes(item?.toLowerCase()) ? 'Highlight' : 'ActiveBorder' }}>
                        {item}
                    </span>
                )
             })
            }
        </span>
      )
    }

    return (
        <DropdownOverview>
            <DropdownInput 
                ref={inputRef}
                data-testid="dropdown-input-overview"
                onClick={() => (!autoComplete) && setShowOptions(!showOptions)}>
                <StyledInput 
                    className={`${inputClass ? inputClass : ''}`}
                    value={searchValue} 
                    data-testid="dropdown-input-box" 
                    disabled = {!search && !autoComplete}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event.target.value)}/>
                <Options>
                {!removeClear &&<AiOutlineClose 
                    data-testid="dropdown-clear-options" 
                    onClick={ () => clearSearch()} style={{cursor: 'pointer'}}/>}
                <AiOutlineCaretDown onClick={() => setShowOptions(!showOptions)} style={{cursor: 'pointer'}}/>
                </Options>
            </DropdownInput>
            {
                showOptions &&
                <DropdownOptions 
                    ref={dropdownRef}
                    data-testid="dropdown-options-overview" 
                    className={`${optionOverviewClass ? optionOverviewClass : ''}`}>
                {
                    dropdownValue?.length ?
                    <div>
                        {
                            dropdownValue?.map((item: any, index: number) => {
                                return(
                                    <DropdownItem 
                                        key={`${accessorKey ? item[accessorKey] : item?.value} + ${index}`}
                                        onClick={() => onSelect(item) }
                                        className={`${dropdownItemClass ? dropdownItemClass : ''}`}>
                                        {highLightText( accessorKey ? item[accessorKey] : item?.value)}
                                    </DropdownItem>
                                )
                            })
                        }
                    </div>
                    : 'no results found'
                }
                </DropdownOptions>
            }
        </DropdownOverview>
    )
}

const DropdownOverview = styled.div`
  width: auto;
  min-width: 200px;
`
const DropdownInput = styled.div`
    width: 100%;
    border: 1px solid #D8D8D8;
    border-radius: 4px;
    position: relative;
    padding: 4px 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    min-height: 32px;
    align-items: center;
    cursor: pointer;
`
const DropdownOptions = styled.div`
  min-width: 200px;
  max-height: 300px;
  overflow: auto;
  border: 1px solid #D8D8D8;
  border-radius: 4px;
  position: absolute;
  background-color: #fff;
  padding: 8px;
  z-index: 999;
`

const DropdownItem = styled.div`
font-size: 16px;
padding: 8px;
cursor: pointer;
border-radius: 4px;
&:hover {
    background: #f2f2f2;
}    
`
const StyledInput = styled.input`
  border: none;
  &:focus {
    outline: none;
}
`
const Options = styled.div`
display: flex;
justify-content: space-between;
gap: 4px;
`