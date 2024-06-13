import { Select } from "antd";

const SelectSearch = (params: any) => {
  return (
    <Select
      {...params}
      allowClear
      showSearch
      filterOption={(input, option) =>
        (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
      }
    >
      {params.children}
    </Select>
  );
};

export default SelectSearch;
