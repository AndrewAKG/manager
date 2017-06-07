import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View, Alert } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, signUpUser } from '../actions';

class SignUpForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.signUpUser({ email, password });
    }

    renderSpinner() {
        if (this.props.loading) {
            return <Spinner />
        }
    }

    renderAlert() {
        if (this.props.error === 'success') {
            Alert.alert(
                'Account Created Successfully',
                'You Can now Login',
                [
                    { text: 'OK', onPress: () => Actions.login({ type: 'reset' }) },
                ],
                { cancelable: false }
            );
        }
        else if (this.props.error === 'failed') {
            if (this.props.email === '' || this.props.password === '') {
                Alert.alert(
                    'InComplete Info',
                    'please Complete your Info before signing up',
                    [
                        { text: 'OK', onPress: () => { } },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Account Creation failed',
                    'UserName already taken !! or Maybe server is down',
                    [
                        { text: 'OK', onPress: () => { } },
                    ],
                    { cancelable: false }
                );
            }
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        secure={true}
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                {this.renderAlert()}
                <CardSection>
                    {this.renderSpinner()}
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}> SignUp </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
};

export default connect(mapStateToProps,
    {
        emailChanged,
        passwordChanged,
        signUpUser
    })
    (SignUpForm);
