function Contribute() {
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="station">Station</label>
        <select id="station">
          <option>Select station</option>
        </select>
        <label htmlFor="recommendation">Recommendation</label>
        <input type="text" id="recommendation" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contribute;