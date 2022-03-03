import {useDispatch, useSelector} from "react-redux";
import {getActivities, selectActivities} from "../../../redux/activitySlice";
import {useEffect, useState} from "react";
import activityAPI from "../../../utils/activityAPI";
import './Activities.css';
import Activity from "./Activity";

const ActivityList = () => {
    // const {entities: activities, loading} = useSelector(selectActivities);
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        //dispatch(getActivities());
        (async () => {
            const acts = await activityAPI.get();
            setActivities(acts);
            setLoading(false);
        })();
    }, [])

    if (loading) return <></>;

    return (<aside className={"activity-aside"}>
        <ul className={"activity-list"}>
            {activities
                .map(a => <Activity task={a}/>)}
        </ul>
    </aside>);
}

export default ActivityList;
