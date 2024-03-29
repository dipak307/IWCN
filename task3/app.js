
const { useState } = React;
function App() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [responseData, setResponseData] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://chimpu.xyz/api/post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phonenumber: phoneNumber })
            });
              console.log(response.headers)
            // Extract data from headers
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const jsonData = await response.json();
                setResponseData(JSON.stringify(jsonData));
            } else {
                setResponseData('Data received is not in JSON format.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <label htmlFor="phoneNumber">Enter Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {/* Display the data received in headers */}
            <div>{responseData}</div>
        </div>
    );
}

// Render the component
ReactDOM.render(<App />, document.getElementById('root'));
