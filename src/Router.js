import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import { signOutUser } from './actions';


class RouterComponent extends Component {
    onLeftButtonPress() {
        this.props.signOutUser();
    }
    render() {
        return (
            <Router sceneStyle={{ paddingTop: 60 }}>
                <Scene key="auth">
                    <Scene
                        key="login"
                        component={LoginForm}
                        title="Please Login"
                        rightTitle="SignUp"
                        onRight={() => Actions.signUp()}
                        initial />
                    <Scene key="signUp" component={SignUpForm} title="SignUp" />
                </Scene>

                <Scene key="main">
                    <Scene
                        key="employeeList"
                        component={EmployeeList}
                        title="Employees"
                        rightTitle="Hire"
                        onRight={() => Actions.employeeCreate()}
                        leftTitle="log out"
                        onLeft={this.onLeftButtonPress.bind(this)}
                        initial
                    />
                    <Scene key="employeeCreate" component={EmployeeCreate} title="Employee" />
                    <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
                </Scene>
            </Router>
        );
    }
}

export default connect(null, { signOutUser })(RouterComponent);
