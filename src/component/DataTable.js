import { Button, Table } from 'antd';
import React from 'react'

function DataTable({ row, columns }) {

    return (
        <Table dataSource={row} columns={columns} />
    )
}

export default DataTable
