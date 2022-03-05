import {useDispatch, useSelector} from "react-redux";
import {getActivitiesThunk, selectActivities} from "../../../redux/activitySlice";
import {useEffect} from "react";
import './Activities.css';
import Activity from "./Activity";

const ActivityList = () => {
    const {data: activities, loading, error} = useSelector(selectActivities);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActivitiesThunk());
    }, [])

    if (loading) return <></>;
    if (error) return <>error</>;

    return (<aside className={"activity-aside"}>
        <ul className={"activity-list"}>
            {activities
                .map(a => <Activity key={a.title + 'key'} task={a}/>)}
        </ul>
    </aside>);
}

export default ActivityList;
