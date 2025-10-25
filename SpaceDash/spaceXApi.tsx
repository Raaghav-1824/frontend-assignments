type ApiResponse = any; // Replace `any` with a more specific type based on your API response structure

export const fetchApiData = async (
  endpoint: string,
  id?: string
): Promise<ApiResponse> => {
  const url = id
    ? `https://api.spacexdata.com/v4/${endpoint}/${id}` // Fetch details of a specific item by ID
    : `https://api.spacexdata.com/v4/${endpoint}`; // Fetch list of items

  console.log("Fetching URL:", url); // You can remove this in production

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  try {
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to parse JSON");
  }
};
