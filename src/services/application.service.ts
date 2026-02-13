import { baseApiCLient } from "../utils/axioClient";


/* 
* Submit
* Method to handle submit data of application page
*/
const submitData = async (data: any) => {
  try {
    // return await baseApiCLient.post(`${import.meta.env.VITE_SUBMIT_DATA}`,data);
    return new Promise((resolve) =>
      setTimeout(() => resolve("application Saved"), 5000),
    );
  } catch (err: any) {
    throw err;
  }
};

export { submitData };
