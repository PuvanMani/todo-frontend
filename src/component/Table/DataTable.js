import { Button, Table } from 'antd';
import React from 'react'

function DataTable({ row, columns, pagination }) {

    return (
        <Table pagination={pagination} dataSource={row} columns={columns} />
    )
}

export default DataTable
