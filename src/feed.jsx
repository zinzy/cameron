import { useState } from "react";


const Feed = ({title, link, date,key}) => {

    let formatted = { day: "numeric", month: "long", year: "numeric" }
    let articleDate = new Date(date).toLocaleDateString("en-GB", formatted)

    return (
        <>

        
        <div id={key}>
            <div>{title}</div>
            <time className="text-secondary">{articleDate}</time>
        </div>
 
        </>
    )
}

export default Feed;