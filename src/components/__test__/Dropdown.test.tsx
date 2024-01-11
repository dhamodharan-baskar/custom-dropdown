import { fireEvent, render } from "@testing-library/react";
import { Fragment } from "react";
import Dropdown from '../Dropdown'
const dropdownData = [
    {id: 1, value: 'user1', label: 'user1-label'}, 
    {id: 2, value: 'user2', label: 'user1-label'}, 
    {id: 3, value: 'user3', label: 'user1-label'},
    {id: 4, value: 'user4', label: 'user1-label'},
    {id: 5, value: 'user5', label: 'user1-label'}
  ]

describe("dropdown", () => {
    it("renders the dropdown component", () => {
      render(<Dropdown />);
      expect(Fragment).toMatchSnapshot();
    });
    it("renders the dropdown input", () => {
        const {getByTestId} = render(<Dropdown />);
        const element = getByTestId('dropdown-input-box')
        expect(element).toBeInTheDocument;
      });
      it("renders the clear option", () => {
        const {getByTestId} = render(<Dropdown />);
        const element = getByTestId('dropdown-clear-options')
        expect(element).toBeInTheDocument;
      });
      it("renders the options", () => {
        const {getByTestId} = render(<Dropdown data={dropdownData}/>);
        const element = getByTestId('dropdown-input-overview')
        fireEvent.click(element);
        expect(getByTestId('dropdown-options-overview')).toBeInTheDocument;
      });
      it("renders the input", () => {
        const {getByTestId} = render(<Dropdown data={dropdownData}/>);
        const element = getByTestId("dropdown-input-box" )
        expect(element).toBeInTheDocument;
      });
      it("renders the input to be disabled", () => {
        const {getByTestId} = render(<Dropdown data={dropdownData} />);
        const element = getByTestId("dropdown-input-box" )
        expect(element).toBeDisabled;
      });
      it("renders the input to be enabled", () => {
        const {getByTestId} = render(<Dropdown data={dropdownData} search/>);
        const element = getByTestId("dropdown-input-box" )
        expect(element).toBeEnabled;
      });
  });

  