export const getDataService = async () => {
  try {
    const response = await fetch('https://jsonkeeper.com/b/EVPW');
    const isSuccess = response.ok;
    const result = await response.json();
    return {
      isSuccess,
      result,
    };
  } catch (error) {
    console.log('Error');
    return {
      isSuccess: false,
      result: error,
    };
  }
};
