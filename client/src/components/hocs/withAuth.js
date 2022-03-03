import {useSelector} from "react-redux";
import {selectUser} from "../../redux/userSlice";

function withAuth(Component) {
    return function WithAuthComponent(props) {
        const user = useSelector(selectUser);
        console.log(user);
        if (user) return <Component {...props} />;
        return <h2>Please log in!!!</h2>;
    };
}

export default withAuth;
