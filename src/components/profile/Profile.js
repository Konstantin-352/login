import React, {useState, useEffect} from 'react';
import ServerRequest from "../serverRequest/ServerRequest";

const Profile = ({token, setLogged}) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
// debugger;
    useEffect(() => {
        (new ServerRequest('https://tager.dev.ozitag.com/api/user/profile'))
            .addMethod('GET')
            .addAutorization(token)
            .request()
            .then((result) => {
                // console.log(data);
                setName(result.data.name);
                setEmail(result.data.email);
            });
    }, []);

    const exit = () => {
        (new ServerRequest('https://tager.dev.ozitag.com/api/user/profile/logout'))
            .addMethod('POST')
            .addAutorization(token)
            .request()
            .then((result) => {
                if(result.success) {
                    setLogged(false);
                }
            })
    };

    return (
        <div>
            <div>{name}</div>
            <div>{email}</div>
            <div onClick={exit}>Exit</div>
        </div>
    );
};

export default Profile;