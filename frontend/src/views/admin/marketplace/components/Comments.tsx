import {
  Badge,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Blockies from "react-blockies";

import { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  ColumnData,
  TableData,
} from "views/admin/default/variables/columnsData";

function CommentTable(props: {
  columnsData: ColumnData;
  tableData: TableData[];
  outcome: number;
}) {
  const { columnsData, tableData, outcome } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify="space-between"
          w="100%"
          px="22px"
          pb="20px"
          mb="10px"
          boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
        >
          <Text color={textColor} fontSize="xl" fontWeight="600">
            Comments
          </Text>
          <Button variant="action">See all</Button>
        </Flex>
        <Table {...getTableProps()} variant="simple" color="gray.500">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor="transparent"
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);

              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data;
                    console.log(cell.row.allCells[2].value);
                    const shouldBlur =
                      outcome == 0 && !cell.row.allCells[2].value;
                    if (cell.column.Header === "User") {
                      data = (
                        <Flex align="center">
                          <Box
                            as={Blockies}
                            seed={cell.value.toLowerCase()}
                            borderRadius="full"
                            overflow="hidden"
                            display="inline-block"
                            mr="2"
                          />
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="600"
                          >
                            {cell.value.substring(0, 12) + "..."}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "Comment") {
                      data = (
                        <Text
                          color={textColorSecondary}
                          fontSize="sm"
                          fontWeight="500"
                        >
                          {shouldBlur ? "非公開" : cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Position") {
                      data = (
                        <Box>
                          <Badge colorScheme={cell.value ? "green" : "red"}>
                            {cell.value ? "success" : "failure"}
                          </Badge>
                        </Box>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default CommentTable;
