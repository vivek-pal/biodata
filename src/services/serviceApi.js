
const fetchPricingData = async () => {
  const response = await fetch('data/pricing.json');
  if (!response.ok) {
    throw new Error('Failed to fetch pricing data');
  }
  return response.json();
}   



const fetchProfileData = async () => {
  const response = await fetch('data/preference.json');
  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }
  return response.json();
}   

export { fetchPricingData, fetchProfileData };