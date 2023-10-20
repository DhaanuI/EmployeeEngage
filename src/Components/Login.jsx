import {
    QuestLogin as Login,
    QuestProvider,
} from '@questlabs/react-sdk';
import {
    apiKey,
    apiSecret,
    entityId,
    questId,
    token,
    userId,
} from '../config.js';

export const QuestLogin = (props) => {
    const {
        questId = "", font = 'Hanken Grotesk',
        textColor = "black",
        btnTextColor = "black",
        backgroundColor = "white",
        btnColor = "skyblue",
        googleClientId = "103575086200-2gijbo8rldrv5sg60u0u1rl4cmldhm8a.apps.googleusercontent.com",
        redirectUri = "http://localhost:3000",
        redirectURL = "https://www.questlabs.ai/"

    } = props;
    return (
        <QuestProvider
            apiKey="k-0d087a04-f631-41e1-80dd-fdc9ab2abb07"
            apiSecret="s-329b70b4-cd43-472d-bd41-c2fea09490e0c7196f7b-9020-4bc1-9a11-b70214e3eb48"
            entityId="e-69882575-2d7a-43fc-9ab8-a81800e32d48"
        >
            <Login
                redirectUri={redirectUri}
                redirectURL={redirectURL}
                font={font}
                textColor={textColor}
                btnTextColor={btnTextColor}
                btnColor={btnColor}
                googleClientId={googleClientId}
                backgroundColor={backgroundColor}
                email={true}
                google={true}
            />
        </QuestProvider>
    );
};
