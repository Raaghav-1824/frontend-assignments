import React, { useEffect } from "react";
import {
  Table,
  TextInput,
  ScrollArea,
  Button,
  Select,
  Pagination,
  Group,
  Text,
} from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useTableStore } from "../../store/app.store";

interface TableProps<T> {
  data: T[];
  columns: { key: string; label: string }[];
  onRowClick: (payload: T) => void;
  detailLinkPrefix: string;
  withPagination?: boolean;
}

const ReusableTable = <T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  detailLinkPrefix,
  withPagination = false,
}: TableProps<T>) => {
  const {
    search,
    filterColumn,
    sortKey,
    sortDirection,
    currentPage,
    itemsPerPage,
    setSearch,
    setFilterColumn,
    setSortKey,
    toggleSortDirection,
    setCurrentPage,
  } = useTableStore();

  const filteredAndSortedData = React.useMemo(() => {
    const filteredData = data.filter((item) => {
      if (filterColumn === "All") {
        return Object.values(item).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        );
      }
      return String(item[filterColumn as keyof T] || "")
        .toLowerCase()
        .includes(search.toLowerCase());
    });

    if (sortKey) {
      return [...filteredData].sort((a, b) => {
        const valA = String(a[sortKey as keyof T] || "").toLowerCase();
        const valB = String(b[sortKey as keyof T] || "").toLowerCase();
        if (valA === valB) return 0;
        return sortDirection === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
    }

    return filteredData;
  }, [data, search, filterColumn, sortKey, sortDirection]);

  const paginatedData = React.useMemo(
    () =>
      filteredAndSortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredAndSortedData, currentPage, itemsPerPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [data, search, filterColumn]);

  return (
    <ScrollArea style={{ maxWidth: "100%" }}>
      <Group
        align="center"
        mb="md"
        position="apart"
        style={{
          gap: "1rem",
          flexDirection: "row",
        }}
        className="search-filter-container"
      >
        <TextInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          style={{
            flex: 2,
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
        <Select
          placeholder="Filter by"
          data={["All", ...columns.map((col) => col.key)]}
          value={filterColumn}
          onChange={(value) => setFilterColumn(value || "All")}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "8px",
          }}
        />
      </Group>

      <Table striped highlightOnHover className="responsive-table">
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => {
                  if (sortKey === key) {
                    toggleSortDirection();
                  } else {
                    setSortKey(key);
                  }
                }}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                className={key === "name" || key === "detail" ? "" : "hidden-mobile"}
              >
                <Group spacing="xs">
                  <Text>{label}</Text>
                  {sortKey === key &&
                    (sortDirection === "asc" ? (
                      <IconSortAscending size={14} />
                    ) : (
                      <IconSortDescending size={14} />
                    ))}
                </Group>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={String(row.id)} onClick={() => onRowClick(row)}>
              {columns.map(({ key }) => (
                <td
                  key={key}
                  style={{ padding: "12px 16px" }}
                  className={key === "name" || key === "detail" ? "" : "hidden-mobile"}
                >
                  {row[key as keyof T] !== undefined
                    ? String(row[key as keyof T])
                    : "-"}
                </td>
              ))}
              <td style={{ padding: "12px 16px" }}>
                <Link to={`${detailLinkPrefix}/${row.id}`}>
                  <Button size="xs" variant="outline">
                    Detail
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {withPagination && (
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={Math.ceil(filteredAndSortedData.length / itemsPerPage)}
          style={{ marginTop: "20px", justifyContent: "center" }}
        />
      )}
      <style>
        {`
          @media (max-width: 768px) {
            .search-filter-container {
              flex-direction: column;
            }
            .hidden-mobile {
              display: none;
            }
          }
        `}
      </style>
    </ScrollArea>
  );
};

export default ReusableTable;
