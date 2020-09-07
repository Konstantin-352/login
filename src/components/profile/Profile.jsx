import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {logoutUserThunk, setUserThunk} from "../../redux/authorizationReducer";

const Profile = ({name, email, tokenType, accessToken, setUser, logoutUser}) => {
    useEffect(() => {
        setUser(tokenType, accessToken);
    }, [setUser, tokenType, accessToken]);

    const exit = () => {
        logoutUser(tokenType, accessToken);
    };

    if (name === null) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>{name}</div>
            <div>{email}</div>
            <div onClick={exit}>Exit</div>
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.authorization.user.name,
    email: state.authorization.user.email,
    accessToken: state.authorization.token.accessToken,
    tokenType: state.authorization.token.tokenType
});

const mapDispatchToProps = dispatch => ({
    setUser: (tokenType, token) => dispatch(setUserThunk(tokenType, token)),
    logoutUser: (tokenType, token) => dispatch(logoutUserThunk(tokenType, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);