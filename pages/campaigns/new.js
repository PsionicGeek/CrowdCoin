import React, { useState, useEffect } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";
import {Router} from '../../routes';
const CampaignNew = () => {
    const [minimumContribution, setMinimumContribution] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        try{
        console.log("minimumContribution", minimumContribution);
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .createCampaign(minimumContribution)
            .send({ from: accounts[0] });

        Router.pushRoute('/');
        }

        catch(err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    };
    return (
        <Layout>
            <h1>Create a Campaign!</h1>
            <Form onSubmit={onSubmit} error={errorMessage!=""}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="Wei"
                        labelPosition="right"
                        value={minimumContribution}
                        onChange={(event) => setMinimumContribution(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary={true} loading={loading}>Create!</Button>
            </Form>
        </Layout>
    );
};

export default CampaignNew;
