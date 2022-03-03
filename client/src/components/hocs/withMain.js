import Main from "../Main";
import withAuth from "./withAuth";

function withMain(Component, title, auth) {
    return function WithMainComponent(props) {
        const ComponentWithAuth = withAuth(Component);
        return (
            <Main title={title}>
                {auth ? <ComponentWithAuth {...props}/> : <Component {...props}/>}
            </Main>
        )
    };
}

export default withMain;
