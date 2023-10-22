import { QuestProvider, Payment } from '@questlabs/react-sdk';


export const Payments = (props) => {
   
    return (
        <QuestProvider
            apiKey="k-0d087a04-f631-41e1-80dd-fdc9ab2abb07"
            apiSecret="s-329b70b4-cd43-472d-bd41-c2fea09490e0c7196f7b-9020-4bc1-9a11-b70214e3eb48"
            entityId="e-69882575-2d7a-43fc-9ab8-a81800e32d48"
        >
            <Payment
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE"
                userId="u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed"
                btnTextColor='black'
                buttonBgColor='white'
                inputBgColor='white'
                fontColor='black'
                bgColor="black"
                paymentGatewayLayout={2}
                description={[
                    'Basic xxxxxx-xxxxxxost-xxxxx exploration.',
                    'Polished xxxxxx xxxxxx xxxxxxx.',
                    'Cutting-edge, xxxxxxxxxxa xxxxxxxxxxxx.',
                ]}
                paymentBanefits={['xxxxx', 'tttt', 'qqqq']}
                stripePublishableKey="pk_test_51IGxpeHv3bPcUa5dtAAgA2TZPWjga0FPxWlK3GAnWUfzRXzO8l6Kc3zF2WBpjrvFHAle0Cy3Jqxc7djZxptd9mHe00KjsN2Im7"
            />
        </QuestProvider>
    );
};
