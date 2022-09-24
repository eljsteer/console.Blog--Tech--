module.exports = {
  format_date: (date) => {
    // Format date as DD/MM/YYYY
    const newDate = new Date();
    return newDate.toLocaleDateString("en-AU",{ year:"numeric", month:"numeric", day:"numeric"});
  },
}
