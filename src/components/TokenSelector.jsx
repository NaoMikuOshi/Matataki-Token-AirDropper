import React, { useState } from "react";
import { useRequest } from "ahooks";
import { Dropdown } from "react-bulma-components";
import { getTokenList } from "../api/token";
import { setCookie } from "../utils/cookie";

function TokenSelector({ onChange, ...props }) {
  const { data, error, loading } = useRequest(() => getTokenList());
  const [selectedTokenName, updateSelected] = useState("");

  function handleDropdownChange(selected) {
    updateSelected(selected);
    onChange({ target: { value: selected, name: props.name } });
  }

  if (loading) {
    return <div className="loading">Loading Your Token</div>;
  } else if (error) {
    return (
      <div className="error">
        Error happened when connect to Matataki, please refresh and try again
      </div>
    );
  }
  return (
    <div className="token-select">
      <Dropdown
        {...props}
        value={selectedTokenName}
        onChange={handleDropdownChange}
      >
        <Dropdown.Item value="">Please select one</Dropdown.Item>
        {data.data.list.map((item) => (
          <Dropdown.Item value={item} key={item.token_id}>
            {item.name} - {item.amount / 10 ** item.decimals} {item.symbol}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}

export default TokenSelector;
