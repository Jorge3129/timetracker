class ActivityAPI {
    async get() {
        try {
            const response = await fetch(`http://localhost:8000/activities`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (e) {
            return console.log(e);
        }
    }
}

export default new ActivityAPI();
