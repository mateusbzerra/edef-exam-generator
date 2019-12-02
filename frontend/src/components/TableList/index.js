import React from 'react';
import { Table } from 'react-bootstrap';
import map from 'lodash/map';

export default function TableList({ items, headers, render }) {
  return (
    <Table striped borderless>
      <thead>
        <tr>
          {headers.map((th, index) => (
            <th key={index}>{th} </th>
          ))}
        </tr>
      </thead>
      <tbody>{map(items, render)}</tbody>
    </Table>
  );
}
