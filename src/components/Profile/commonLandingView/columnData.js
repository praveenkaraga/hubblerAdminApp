export function columnData(viewType){

    let titleColumn1 = "Holiday Profile"
    let titleColumn3 = "#Holidays"
    let dataIndexColumn3 = "holiday_count"    
    let typeColumn3 = "number"

    switch(viewType){
    case "working_day":
        titleColumn1 = "Working Day Profile"
        titleColumn3 = "Working Days"
        dataIndexColumn3 = "workdays"    
        typeColumn3 = "text"   
        break;

    case "leave":
        titleColumn1 = "Leave Profile"
        titleColumn3 = "#Leaves"
        dataIndexColumn3 = "leave_count"    
        typeColumn3 = "number"   
        break;

    case "reimbursement":
        titleColumn1 = "Reimbursement Profile"
        titleColumn3 = "#Types"
        dataIndexColumn3 = "types_count"    
        typeColumn3 = "number"   
        break;

    case "tracking":
        titleColumn1 = "Tracking Profile"
        titleColumn3 = "Type"
        dataIndexColumn3 = "type"    
        typeColumn3 = "text"   
        break;

    default:
        titleColumn1 = "Holiday Profile"
        titleColumn3 = "#Holidays"
        dataIndexColumn3 = "holiday_count"    
        typeColumn3 = "number"   
    }


    return [

        {
            "dataIndex": "name", // key of each field nodes items
            "title": titleColumn1,
            "_id": "name",
            "lbl": titleColumn1,
            "type": "text",
            "isDraggable": true,
            "sorter": true,
            "sortDirections": ["descend", "ascend"],
            "ellipsis": true
        },
        {
            "dataIndex": "user_count",
            "title": "#People",
            "_id": "user_count",
            "lbl": "#People",
            "type": "number",
            "isDraggable": true,
            "sorter": true,
            "sortDirections": ["descend", "ascend"],
            "ellipsis": true
        },
        {
            "dataIndex": dataIndexColumn3,
            "title": titleColumn3,
            "_id": dataIndexColumn3,
            "lbl": titleColumn3,
            "type": typeColumn3,
            "isDraggable": true,
            "sorter": true,
            "sortDirections": ["descend", "ascend"],
            "ellipsis": true
        }
    ]
} 
