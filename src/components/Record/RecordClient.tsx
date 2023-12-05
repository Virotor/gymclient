import React from "react"
import { AddNewReccord } from "./AddNewRecord"
import { ShowRecord } from "./ShowRecord"


import { Collapse, CollapseProps } from "antd"





export const RecordClient: React.FC = () => {

    
    const items:  CollapseProps['items'] = [
        {
            key : 1,
            label : "Current record",
            children :  <ShowRecord /> ,
        },
        {
            key : 2,
            label : "Add new record",
            children :  <AddNewReccord /> ,
        },
    ]

return(
    <Collapse accordion items={items}/>
)

  
}