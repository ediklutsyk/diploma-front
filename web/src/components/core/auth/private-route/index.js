import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../../../store/actions";


export const PrivateRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);

    console.log("userData", userData, localStorage.getItem('userData'))

    if (!userData.user) {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            dispatch(allActions.user.requestLoginSuccess(JSON.parse(storedUser)));
        }
    }

    return (<Route {...rest}
                   render={props =>
                       userData.user ? (
                           <Component {...props} />
                       ) : (
                           <Redirect
                               to={{
                                   pathname: "/login",
                                   state: {from: props.location}
                               }}
                           />)
                   }
    />);
};