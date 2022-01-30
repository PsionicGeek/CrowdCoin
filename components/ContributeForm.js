import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from '../routes';


function ContributeForm(props) {
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        const campaign = Campaign(props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                value: web3.utils.toWei(value, "ether"),
                from: accounts[0],
            });

            
            Router.replaceRoute(`/campaigns/${props.address}`);

        } catch (err) { 
            setErrorMessage(err.message);
        }
        setValue("");
        setLoading(false);
    };
    return (
        <Form onSubmit={onSubmit} error={errorMessage!=""}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={value}
                    label="ether"
                    labelPosition="right"
                    type="number"
                    placeholder="0.00"
                    onChange={(event) => setValue(event.target.value)}
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary={true} loading={loading} >Contribute</Button>
        </Form>
    );
}

export default ContributeForm;
