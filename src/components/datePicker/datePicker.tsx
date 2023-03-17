import { CalendarIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

const ChakraDatePicker = ({ onChange }: any) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleOnChange = (date: Date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <InputGroup>
      <DatePicker
        selected={startDate}
        onChange={handleOnChange}
        customInput={<Input placeholder="Select date" />}
      />
      <InputRightElement>
        <IconButton
          icon={<CalendarIcon />}
          onClick={() => {}}
          aria-label="Open date picker"
          h="1.75rem"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default ChakraDatePicker;
