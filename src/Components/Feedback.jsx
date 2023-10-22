import React from 'react';
import './Feedback.css'
import { entityId } from "../config.js";
import { userId as uId } from "../config.js";
import { apiSecret as apiS } from "../config.js";
import { apiKey as apiK } from "../config.js";
import { token as tkn } from "../config.js";
import { QuestProvider, Feedback as SFeedBack } from '@questlabs/react-sdk';

//https://app.questapp.xyz/organizations/quests?organization_id=e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5&quest_id=q-1a12c0e1-35a8-48a3-8cde-a8616f341b88
export default function FeedBack(
    {
        bgColor = 'white',
        btnColor = '',
        heading = "Employee Engage",
        btnTextColor = '',
        textColor = 'black',
        supportUrl = 'contact-support',
        subHeading = "Enhance Workplace Productivity and Collaboration",
        questId = 'q-1a12c0e1-35a8-48a3-8cde-a8616f341b88',
        userId = uId,
        token = tkn,
        font = 'Hanken Grotesk'
    }) {
    return (
        <QuestProvider
            apiKey={apiK}
            apiSecret={apiS}
            entityId={entityId}
        >
            <div className='wrapper'>
                <SFeedBack
                    userId={userId}
                    token={token}
                    questId={questId}
                    bgColor={bgColor}
                    font={font}
                    textColor={textColor}
                    btnColor={btnColor}
                    btnTextColor={btnTextColor}
                    heading={heading}
                    subHeading={subHeading}
                    supportUrl={supportUrl}
                />
            </div>
        </QuestProvider>
    );
}
