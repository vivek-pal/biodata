export async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text(); // or .json() for JSON responses
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function postData(url, payload) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // or .text() if expecting HTML
    return data;
  } catch (error) {
    console.error('POST error:', error);
    throw error;
  }
}
