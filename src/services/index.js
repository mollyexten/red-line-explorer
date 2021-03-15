export const stationsURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/stations`
export const recommendationsURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/recommendations`
export const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
  }
}