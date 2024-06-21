//import React from 'react';

import useApplication from "../../../Hooks/useApplication";

const MyApplications = () => {
    const [application,refetch]=useApplication()
    console.log(application)
    return (
        <div>
            
        </div>
    );
};

export default MyApplications;


// University Name,
// ● University Address,
// ● Application Feedback (feedback given by the moderator/admin)
// ● Subject Category,
// ● Applied Degree,
// ● Application Fees,
// ● Service Charge,
// ● Application Status (pending,processing,completed and if this application
// cancel by the moderator it will show “Rejected” status),
// ● Three Action button need to show Details Button, Edit Button,Cancel
// Button,
// ● Add review button
