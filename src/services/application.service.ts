

/* 
* Submit
* Method to handle submit data of application page
*/
const submitData = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("application Saved"), 5000),
  );
};

export { submitData };
